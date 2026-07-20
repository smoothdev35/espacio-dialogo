import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import { createWriteStream } from 'fs'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

import { categories, tags, authors, articles, toSlug } from './data'

const ALLOWED_IMAGE_HOSTS = ['picsum.photos']
const FETCH_TIMEOUT_MS = 10_000
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024
const EXPECTED_COUNTS = { categories: 4, tags: 10, authors: 2, articles: 8 } as const
const EXPECTED_TOTAL =
  EXPECTED_COUNTS.categories + EXPECTED_COUNTS.tags + EXPECTED_COUNTS.authors + EXPECTED_COUNTS.articles

export async function seed({ strapi }: { strapi: any }) {
  const publishedCount = await strapi.db
    .query('api::article.article')
    .count({ where: { publishedAt: { $ne: null } } })

  if (publishedCount > 0) {
    strapi.log.info('Seed skipped: published articles already exist')
    return
  }

  const totalCount = await strapi.db.query('api::article.article').count()
  if (totalCount > 0) {
    strapi.log.info('Cleaning stale draft data before re-seed...')
    await cleanDrafts(strapi)
  }

  strapi.log.info('Seeding data...')

  const imageMap = await uploadImages(strapi)

  await strapi.db.transaction(async () => {
    const categoryMap = await createCategories(strapi)
    const tagMap = await createTags(strapi)
    const authorMap = await createAuthors(strapi, imageMap)
    await createArticles(strapi, imageMap, categoryMap, tagMap, authorMap)
  })

  await verifySeedCount(strapi)
  strapi.log.info('Seed completed')
}

async function cleanDrafts(strapi: any) {
  const uids = ['api::article.article', 'api::author.author', 'api::category.category', 'api::tag.tag'] as const

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
    ...articles.map((a) => ({
      key: a.imageSeed,
      url: `https://picsum.photos/seed/${a.imageSeed}/1200/600`,
      fileName: `${a.imageSeed}.jpg`,
      altText: a.title,
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
    const created = await strapi.documents('api::tag.tag').create({
      data: {
        name,
        slug: toSlug(name),
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

async function createArticles(
  strapi: any,
  imageMap: Record<string, MediaEntry>,
  categoryMap: Record<string, string>,
  tagMap: Record<string, string>,
  authorMap: Record<string, string>,
) {
  for (const article of articles) {
    if (article.authorIndex >= authors.length) {
      strapi.log.warn(`Article "${article.title}" has invalid authorIndex ${article.authorIndex}, skipping`)
      continue
    }

    const featuredImage = imageMap[article.imageSeed]
    const authorId = authorMap[authors[article.authorIndex].slug]
    const categoryId = categoryMap[article.categorySlug]
    const tagIds = article.tagNames.map((name) => tagMap[name]).filter(Boolean)

    await strapi.documents('api::article.article').create({
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        body: article.body,
        featuredImage: featuredImage ? featuredImage.id : null,
        category: categoryId,
        tags: tagIds,
        author: authorId,
      },
      status: 'published',
    })
  }
}

async function verifySeedCount(strapi: any) {
  const [categories, tags, authors, articles] = await Promise.all([
    strapi.db.query('api::category.category').count(),
    strapi.db.query('api::tag.tag').count(),
    strapi.db.query('api::author.author').count(),
    strapi.db.query('api::article.article').count(),
  ])

  const total = categories + tags + authors + articles
  if (total !== EXPECTED_TOTAL) {
    strapi.log.warn(`Seed count mismatch: expected ${EXPECTED_TOTAL}, got ${total} (categories=${categories}, tags=${tags}, authors=${authors}, articles=${articles})`)
  }
}
