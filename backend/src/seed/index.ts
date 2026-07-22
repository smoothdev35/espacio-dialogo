import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import { createWriteStream } from 'fs'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

import { categories, tags, authors, updates, blogPosts, toSlug } from './data'

const ALLOWED_IMAGE_HOSTS = ['picsum.photos']
const FETCH_TIMEOUT_MS = 10_000
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024
const EXPECTED_COUNTS = { categories: 4, tags: 10, authors: 2, updates: 12, blogPosts: 8 } as const
const EXPECTED_TOTAL =
  EXPECTED_COUNTS.categories +
  EXPECTED_COUNTS.tags +
  EXPECTED_COUNTS.authors +
  EXPECTED_COUNTS.updates +
  EXPECTED_COUNTS.blogPosts

export async function seed({ strapi }: { strapi: any }) {
  const catsExist = await strapi.db.query('api::category.category').findOne({})
  if (catsExist) {
    strapi.log.info('Seed skipped: data already exists')
    return
  }

  strapi.log.info('Seeding data...')

  const imageMap = await uploadImages(strapi)

  const categoryMap = await createCategories(strapi)
  const tagMap = await createTags(strapi)
  const authorMap = await createAuthors(strapi, imageMap)
  await createUpdates(strapi, imageMap, categoryMap, tagMap, authorMap)
  await createBlogPosts(strapi, imageMap, tagMap, authorMap)

  await verifySeedCount(strapi)
  strapi.log.info('Seed completed')
}

async function cleanDrafts(strapi: any) {
  const uids = [
    'api::update.update',
    'api::blog-post.blog-post',
    'api::author.author',
    'api::category.category',
    'api::tag.tag',
  ] as const

  for (const uid of uids) {
    const entries = await strapi.db.query(uid).findMany()
    for (const entry of entries) {
      try {
        await strapi.documents(uid).delete({ documentId: entry.documentId })
      } catch {
        try {
          await strapi.db.query(uid).delete({ where: { id: entry.id } })
        } catch (err) {
          strapi.log.warn(`Failed to delete ${uid} entry ${entry.id}: ${err}`)
        }
      }
    }
  }

  const staleMedia = await strapi.db.query('plugin::upload.file').findMany()
  for (const file of staleMedia) {
    try {
      await strapi.plugin('upload').service('upload').remove(file)
    } catch {
      try {
        await strapi.db.query('plugin::upload.file').delete({ where: { id: file.id } })
      } catch (err) {
        strapi.log.warn(`Failed to delete media file ${file.id}: ${err}`)
      }
    }
  }
}

type MediaEntry = { id: number }

async function withRetry<T>(fn: () => Promise<T>, attempts = 2, delayMs = 1000): Promise<T> {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, delayMs))
      }
    }
  }
  throw lastError
}

function validateImageUrl(imageUrl: string): URL {
  const url = new URL(imageUrl)
  if (!ALLOWED_IMAGE_HOSTS.includes(url.hostname)) {
    throw new Error(`Disallowed image host: ${url.hostname}`)
  }
  return url
}

async function downloadToFile(url: string, filePath: string): Promise<void> {
  const validatedUrl = validateImageUrl(url)
  const response = await fetch(validatedUrl.href, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })

  if (!response.ok || !response.body) {
    throw new Error(`HTTP ${response.status}`)
  }

  const contentLength = response.headers.get('content-length')
  if (contentLength && Number(contentLength) > MAX_RESPONSE_BYTES) {
    throw new Error(`Response too large: ${contentLength} bytes`)
  }

  let totalBytes = 0
  const sizeGuard = new Transform({
    transform(chunk, _encoding, callback) {
      totalBytes += chunk.length
      if (totalBytes > MAX_RESPONSE_BYTES) {
        callback(new Error(`Response exceeded ${MAX_RESPONSE_BYTES} bytes`))
        return
      }
      callback(null, chunk)
    },
  })

  const writer = createWriteStream(filePath, { mode: 0o600 })
  await pipeline(response.body, sizeGuard, writer)
}

async function uploadFromUrl(strapi: any, imageUrl: string, fileName: string, altText: string): Promise<MediaEntry> {
  const safeName = path.basename(fileName)
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'seed-'))
  const filePath = path.join(tmpDir, safeName)

  try {
    await downloadToFile(imageUrl, filePath)
    const stat = await fs.stat(filePath)

    const [uploaded] = await strapi.plugin('upload').service('upload').upload({
      data: {
        fileInfo: {
          name: safeName,
          alternativeText: altText,
        },
      },
      files: [
        {
          filepath: filePath,
          originalFilename: safeName,
          mimetype: 'image/jpeg',
          size: stat.size,
        },
      ],
    })

    return uploaded
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true })
  }
}

async function uploadImages(strapi: any) {
  const entries = [
    ...authors.map((a) => ({
      key: a.avatarSeed,
      url: `https://picsum.photos/seed/${a.avatarSeed}/400/400`,
      fileName: `${a.slug}.jpg`,
      altText: a.name,
    })),
    ...updates.map((u) => ({
      key: u.imageSeed,
      url: `https://picsum.photos/seed/${u.imageSeed}/1200/600`,
      fileName: `${u.imageSeed}.jpg`,
      altText: u.title,
    })),
    ...blogPosts.map((b) => ({
      key: b.imageSeed,
      url: `https://picsum.photos/seed/${b.imageSeed}/1200/600`,
      fileName: `${b.imageSeed}.jpg`,
      altText: b.title,
    })),
  ]

  const results = await Promise.allSettled(
    entries.map((e) =>
      withRetry(() => uploadFromUrl(strapi, e.url, e.fileName, e.altText)).then(
        (media) => [e.key, media] as const,
      ),
    ),
  )

  const map: Record<string, MediaEntry> = {}
  for (const result of results) {
    if (result.status === 'fulfilled') {
      const [key, media] = result.value
      map[key] = media
    } else {
      strapi.log.warn(`Image upload failed: ${result.reason}`)
    }
  }

  return map
}

async function createCategories(strapi: any) {
  const map: Record<string, string> = {}

  for (const cat of categories) {
    const existing = await strapi.db
      .query('api::category.category')
      .findOne({ where: { slug: cat.slug } })

    if (existing) {
      map[cat.slug] = existing.documentId
      continue
    }

    const created = await strapi.documents('api::category.category').create({
      data: {
        name: cat.name,
        description: cat.description,
        slug: cat.slug,
      },
      status: 'published',
    })

    map[cat.slug] = created.documentId
  }

  return map
}

async function createTags(strapi: any) {
  const map: Record<string, string> = {}

  for (const name of tags) {
    const slug = toSlug(name)
    const existing = await strapi.db
      .query('api::tag.tag')
      .findOne({ where: { slug } })

    if (existing) {
      map[name] = existing.documentId
      continue
    }

    const created = await strapi.documents('api::tag.tag').create({
      data: {
        name,
        slug,
      },
      status: 'published',
    })

    map[name] = created.documentId
  }

  return map
}

async function createAuthors(strapi: any, imageMap: Record<string, MediaEntry>) {
  const map: Record<string, string> = {}

  for (const author of authors) {
    const existing = await strapi.db
      .query('api::author.author')
      .findOne({ where: { slug: author.slug } })

    if (existing) {
      map[author.slug] = existing.documentId
      continue
    }

    const avatarMedia = imageMap[author.avatarSeed]

    const created = await strapi.documents('api::author.author').create({
      data: {
        name: author.name,
        slug: author.slug,
        bio: author.bio,
        avatar: avatarMedia ? avatarMedia.id : null,
      },
      status: 'published',
    })

    map[author.slug] = created.documentId
  }

  return map
}

async function createUpdates(
  strapi: any,
  imageMap: Record<string, MediaEntry>,
  categoryMap: Record<string, string>,
  tagMap: Record<string, string>,
  authorMap: Record<string, string>,
) {
  for (const update of updates) {
    if (update.authorIndex >= authors.length) {
      strapi.log.warn(`Update "${update.title}" has invalid authorIndex ${update.authorIndex}, skipping`)
      continue
    }

    const existing = await strapi.db
      .query('api::update.update')
      .findOne({ where: { slug: update.slug } })

    if (existing) {
      strapi.log.info(`Update "${update.title}" already exists, skipping`)
      continue
    }

    const featuredImage = imageMap[update.imageSeed]
    const authorId = authorMap[authors[update.authorIndex].slug]
    const categoryId = categoryMap[update.categorySlug]
    const tagIds = update.tagNames.map((name) => tagMap[name]).filter(Boolean)

    await strapi.documents('api::update.update').create({
      data: {
        title: update.title,
        slug: update.slug,
        excerpt: update.excerpt,
        body: update.body,
        featuredImage: featuredImage ? featuredImage.id : null,
        category: categoryId,
        tags: tagIds,
        author: authorId,
      },
      status: 'published',
    })
  }
}

async function createBlogPosts(
  strapi: any,
  imageMap: Record<string, MediaEntry>,
  tagMap: Record<string, string>,
  authorMap: Record<string, string>,
) {
  for (const blogPost of blogPosts) {
    if (blogPost.authorIndex >= authors.length) {
      strapi.log.warn(`BlogPost "${blogPost.title}" has invalid authorIndex ${blogPost.authorIndex}, skipping`)
      continue
    }

    const existing = await strapi.db
      .query('api::blog-post.blog-post')
      .findOne({ where: { slug: blogPost.slug } })

    if (existing) {
      strapi.log.info(`BlogPost "${blogPost.title}" already exists, skipping`)
      continue
    }

    const featuredImage = imageMap[blogPost.imageSeed]
    const authorId = authorMap[authors[blogPost.authorIndex].slug]
    const tagIds = blogPost.tagNames.map((name) => tagMap[name]).filter(Boolean)

    await strapi.documents('api::blog-post.blog-post').create({
      data: {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        body: blogPost.body,
        featuredImage: featuredImage ? featuredImage.id : null,
        tags: tagIds,
        author: authorId,
      },
      status: 'published',
    })
  }
}

async function verifySeedCount(strapi: any) {
  const allCats = await strapi.db.query('api::category.category').findMany()
  const allTags = await strapi.db.query('api::tag.tag').findMany()
  const allAuthors = await strapi.db.query('api::author.author').findMany()
  const allUpdates = await strapi.db.query('api::update.update').findMany()
  const allBlogPosts = await strapi.db.query('api::blog-post.blog-post').findMany()

  const categories = new Set(allCats.map((e: any) => e.documentId)).size
  const tags = new Set(allTags.map((e: any) => e.documentId)).size
  const authors = new Set(allAuthors.map((e: any) => e.documentId)).size
  const updates = new Set(allUpdates.map((e: any) => e.documentId)).size
  const blogPosts = new Set(allBlogPosts.map((e: any) => e.documentId)).size

  const total = categories + tags + authors + updates + blogPosts
  if (total !== EXPECTED_TOTAL) {
    strapi.log.warn(
      `Seed count mismatch: expected ${EXPECTED_TOTAL}, got ${total} (categories=${categories}, tags=${tags}, authors=${authors}, updates=${updates}, blogPosts=${blogPosts})`,
    )
  }
}
