import { getUpdates, getCategories } from '@/lib/strapi'
import type { Update } from '@shared/strapi'
import {
  toUpdateCardProps,
} from './update.mapper'
import type { UpdateCardProps } from './update.types'

export interface FetchUpdatesResult {
  featured: FeaturedUpdateResult | null
  grid: UpdateCardProps[]
  categories: { name: string; slug: string }[]
}

export interface FeaturedUpdateResult extends UpdateCardProps {}

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
    mapped.length > 0
      ? ({ ...mapped[0] } as FeaturedUpdateResult)
      : null

  const grid = mapped.slice(1)

  const categoryResponse = await getCategories({ fields: ['name', 'slug'] })
  const categories = categoryResponse.data.map((c) => ({
    name: c.name,
    slug: c.slug,
  }))

  return { featured, grid, categories }
}
