import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import { createWriteStream } from 'fs'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

import type { Core } from '@strapi/strapi'

import {
  categories,
  tags,
  authors,
  updates,
  blogPosts,
  blogPostAction,
  hero,
  presses,
  toSlug,
} from './data'

const ALLOWED_IMAGE_HOSTS = ['picsum.photos']
const FETCH_TIMEOUT_MS = 10_000
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024
const EXPECTED_COUNTS = {
  categories: 4,
  tags: 10,
  authors: 2,
  updates: 12,
  blogPosts: 8,
  blogPostAction: 1,
  hero: 1,
  press: 4,
} as const
const EXPECTED_TOTAL =
  EXPECTED_COUNTS.categories +
  EXPECTED_COUNTS.tags +
  EXPECTED_COUNTS.authors +
  EXPECTED_COUNTS.updates +
  EXPECTED_COUNTS.blogPosts +
  EXPECTED_COUNTS.blogPostAction +
  EXPECTED_COUNTS.hero +
  EXPECTED_COUNTS.press

export async function seed({ strapi }: { strapi: Core.Strapi }) {
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
  await createBlogPostAction(strapi)
  await createHero(strapi, imageMap)
  await createPresses(strapi, imageMap)

  await verifySeedCount(strapi)
  strapi.log.info('Seed completed')
}

type MediaEntry = { id: number }

async function withRetry<T>(
  fn: () => Promise<T>,
  attempts = 2,
  delayMs = 1000,
): Promise<T> {
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
  const response = await fetch(validatedUrl.href, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })

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

async function uploadFromUrl(
  strapi: Core.Strapi,
  imageUrl: string,
  fileName: string,
  altText: string,
  mimetype: string = 'image/jpeg',
): Promise<MediaEntry> {
  const safeName = path.basename(fileName)
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'seed-'))
  const filePath = path.join(tmpDir, safeName)

  try {
    await downloadToFile(imageUrl, filePath)
    const stat = await fs.stat(filePath)

    const [uploaded] = await strapi
      .plugin('upload')
      .service('upload')
      .upload({
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
            mimetype,
            size: stat.size,
          },
        ],
      })

    return uploaded
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true })
  }
}

async function uploadImages(strapi: Core.Strapi) {
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
    ...presses
      .filter((p) => p.kind === 'image' && p.imageSeed)
      .map((p) => ({
        key: p.imageSeed!,
        url: `https://picsum.photos/seed/${p.imageSeed}/1200/600`,
        fileName: `${p.imageSeed}.jpg`,
        altText: p.title,
      })),
    ...presses
      .filter((p) => p.kind === 'video' && p.posterSeed)
      .map((p) => ({
        key: p.posterSeed!,
        url: `https://picsum.photos/seed/${p.posterSeed}/1200/675`,
        fileName: `${p.posterSeed}.jpg`,
        altText: p.title,
      })),
    {
      key: 'hero',
      url: hero.heroImage,
      fileName: 'hero.jpg',
      altText: hero.title,
    },
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

async function createCategories(strapi: Core.Strapi) {
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

async function createTags(strapi: Core.Strapi) {
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

async function createAuthors(
  strapi: Core.Strapi,
  imageMap: Record<string, MediaEntry>,
) {
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
  strapi: Core.Strapi,
  imageMap: Record<string, MediaEntry>,
  categoryMap: Record<string, string>,
  tagMap: Record<string, string>,
  authorMap: Record<string, string>,
) {
  for (const update of updates) {
    if (update.authorIndex >= authors.length) {
      strapi.log.warn(
        `Update "${update.title}" has invalid authorIndex ${update.authorIndex}, skipping`,
      )
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
  strapi: Core.Strapi,
  imageMap: Record<string, MediaEntry>,
  tagMap: Record<string, string>,
  authorMap: Record<string, string>,
) {
  for (const blogPost of blogPosts) {
    if (blogPost.authorIndex >= authors.length) {
      strapi.log.warn(
        `BlogPost "${blogPost.title}" has invalid authorIndex ${blogPost.authorIndex}, skipping`,
      )
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

async function createBlogPostAction(strapi: Core.Strapi) {
  const existing = await strapi.db
    .query('api::blog-post-action.blog-post-action')
    .findOne({})
  if (existing) return

  await strapi.documents('api::blog-post-action.blog-post-action').create({
    data: blogPostAction,
    status: 'published',
  })
}

async function createHero(
  strapi: Core.Strapi,
  imageMap: Record<string, MediaEntry>,
) {
  const existing = await strapi.db.query('api::hero.hero').findOne({})
  if (existing) return

  const heroImage = imageMap['hero']
  await strapi.documents('api::hero.hero').create({
    data: {
      title: hero.title,
      subtitle: hero.subtitle,
      heroImage: heroImage ? heroImage.id : null,
    },
    status: 'published',
  })
}

async function createPresses(
  strapi: Core.Strapi,
  imageMap: Record<string, MediaEntry>,
) {
  for (const press of presses) {
    const existing = await strapi.db
      .query('api::press.press')
      .findOne({ where: { title: press.title } })

    if (existing) {
      strapi.log.info(`Press "${press.title}" already exists, skipping`)
      continue
    }

    const media =
      press.kind === 'image' && press.imageSeed
        ? imageMap[press.imageSeed]
        : undefined
    const videoPoster =
      press.kind === 'video' && press.posterSeed
        ? imageMap[press.posterSeed]
        : undefined

    if (press.kind === 'video') {
      strapi.log.warn(
        `Press video "${press.title}" seeded without media — mp4 URL pending`,
      )
    }

    try {
      await strapi.documents('api::press.press').create({
        data: {
          title: press.title,
          source: press.source,
          externalUrl: press.externalUrl,
          publicationDate: press.publicationDate,
          excerpt: press.excerpt,
          media: media ? media.id : null,
          videoPoster: videoPoster ? videoPoster.id : null,
        },
        status: 'published',
      })
    } catch (err) {
      strapi.log.warn(`Failed to seed press "${press.title}": ${err}`)
    }
  }
}

async function verifySeedCount(strapi: Core.Strapi) {
  const allCats = await strapi.db.query('api::category.category').findMany()
  const allTags = await strapi.db.query('api::tag.tag').findMany()
  const allAuthors = await strapi.db.query('api::author.author').findMany()
  const allUpdates = await strapi.db.query('api::update.update').findMany()
  const allBlogPosts = await strapi.db
    .query('api::blog-post.blog-post')
    .findMany()
  const allHeroes = await strapi.db.query('api::hero.hero').findMany()
  const allPress = await strapi.db.query('api::press.press').findMany()

  const categories = new Set(allCats.map((e: any) => e.documentId)).size
  const tags = new Set(allTags.map((e: any) => e.documentId)).size
  const authors = new Set(allAuthors.map((e: any) => e.documentId)).size
  const updates = new Set(allUpdates.map((e: any) => e.documentId)).size
  const blogPosts = new Set(allBlogPosts.map((e: any) => e.documentId)).size
  const heroes = new Set(allHeroes.map((e: any) => e.documentId)).size
  const press = new Set(allPress.map((e: any) => e.documentId)).size

  const total =
    categories + tags + authors + updates + blogPosts + heroes + press
  if (total !== EXPECTED_TOTAL) {
    strapi.log.warn(
      `Seed count mismatch: expected ${EXPECTED_TOTAL}, got ${total} (categories=${categories}, tags=${tags}, authors=${authors}, updates=${updates}, blogPosts=${blogPosts}, heroes=${heroes}, press=${press})`,
    )
  }
}
