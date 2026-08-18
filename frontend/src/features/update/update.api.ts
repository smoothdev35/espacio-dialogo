import { getUpdates, getCategories } from '@/lib/strapi'
import type { Update } from '@shared/strapi'
import { toUpdateCardProps } from './update.mapper'
import type { TimelineEntry } from './timeline.types'
import type { UpdateCardProps, UpdateDetailProps } from './update.types'
import { resolveMediaUrl, toResolvedImage } from '@/lib/media'
import { calculateReadTime } from '@/lib/read-time'
import { formatDate, formatMonthYear } from '@/lib/date'

export interface FetchUpdatesResult {
  featured: FeaturedUpdateResult | null
  grid: UpdateCardProps[]
  categories: { name: string; slug: string }[]
}

export type FeaturedUpdateResult = UpdateCardProps

const UPDATE_POPULATE = {
  featuredImage: { populate: '*' },
  category: { populate: '*' },
  tags: { populate: '*' },
}

export async function fetchUpdates(): Promise<FetchUpdatesResult> {
  const updateResponse = await getUpdates({
    populate: UPDATE_POPULATE,
    sort: 'publishedAt:desc',
    pagination: { pageSize: 100 },
  })

  const updates: Update[] = updateResponse.data
  const mapped = updates.map(toUpdateCardProps)

  const featured =
    mapped.length > 0 ? ({ ...mapped[0] } as FeaturedUpdateResult) : null

  const grid = mapped.slice(1)

  const categoryResponse = await getCategories({ fields: ['name', 'slug'] })
  const categories = categoryResponse.data.map((c) => ({
    name: c.name,
    slug: c.slug,
  }))

  return { featured, grid, categories }
}

const UPDATE_DETAIL_POPULATE = {
  featuredImage: { populate: '*' },
  category: { fields: ['name', 'slug'] },
  tags: { fields: ['name', 'slug'] },
  author: {
    populate: {
      avatar: { fields: ['url', 'alternativeText'] },
    },
    fields: ['name', 'slug', 'bio'],
  },
  body: true,
}

/**
 * Fetch all update slugs for static path generation.
 * Called at build time by getStaticPaths() on the [slug] page.
 */
export async function fetchUpdateSlugs(): Promise<{ slug: string }[]> {
  const response = await getUpdates({
    fields: ['slug'],
    pagination: { pageSize: 100 },
  })
  return response.data.map((u) => ({ slug: u.slug }))
}

export async function fetchUpdateBySlug(
  slug: string,
): Promise<UpdateDetailProps | null> {
  const response = await getUpdates({
    filters: { slug: { $eq: slug } },
    populate: UPDATE_DETAIL_POPULATE,
    pagination: { pageSize: 1 },
  })

  const update = response.data[0]
  if (!update) return null

  const rawDate = update.publishedAt ?? update.createdAt

  return {
    title: update.title,
    slug: update.slug,
    excerpt: update.excerpt,
    publishedAt: formatDate(rawDate),
    dateIso: rawDate,
    readTime: calculateReadTime(update.body),
    featuredImage: toResolvedImage(update.featuredImage),
    category: { name: update.category.name, slug: update.category.slug },
    tags: (update.tags ?? []).map((t) => ({ name: t.name, slug: t.slug })),
    author: update.author
      ? {
          name: update.author.name,
          slug: update.author.slug,
          bio: update.author.bio,
          avatar: update.author.avatar
            ? {
                url: resolveMediaUrl(update.author.avatar.url),
                alternativeText: update.author.avatar.alternativeText,
              }
            : null,
        }
      : null,
    body: update.body,
  }
}

/**
 * Fetch all updates mapped to timeline entries (month, year, title, slug).
 * Used by TimelineSection to render the horizontal scroll timeline.
 */
export async function fetchTimelineEntries(): Promise<TimelineEntry[]> {
  const response = await getUpdates({
    fields: ['title', 'slug', 'publishedAt', 'createdAt'],
    sort: 'publishedAt:desc',
    pagination: { pageSize: 200 },
  })

  return response.data.map((update: Update) => {
    const { month, year } = formatMonthYear(
      update.publishedAt ?? update.createdAt,
    )
    return {
      month,
      year,
      title: update.title,
      slug: update.slug,
    }
  })
}
