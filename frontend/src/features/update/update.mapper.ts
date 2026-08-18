import { toResolvedImage } from '@/lib/media'
import { calculateReadTime } from '@/lib/read-time'
import { formatDate } from '@/lib/date'
import type { Update } from '@shared/strapi'
import type { UpdateCardProps } from './update.types'

export function toUpdateCardProps(update: Update): UpdateCardProps {
  const rawDate = update.publishedAt ?? update.createdAt
  return {
    title: update.title,
    slug: update.slug,
    excerpt: update.excerpt,
    publishedAt: formatDate(rawDate),
    dateIso: rawDate,
    readTime: calculateReadTime(update.body),
    featuredImage: toResolvedImage(update.featuredImage),
    category: {
      name: update.category.name,
      slug: update.category.slug,
    },
  }
}
