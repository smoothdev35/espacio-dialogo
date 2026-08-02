import { resolveMediaUrl } from '@/lib/media'
import { calculateReadTime } from '@/lib/read-time'
import { formatDate } from '@/lib/date'
import type {
  Update,
} from '@shared/strapi'
import type {
  UpdateCardProps,
} from './update.types'

export function toUpdateCardProps(
  update: Update,
): UpdateCardProps {
  const rawDate = update.publishedAt ?? update.createdAt
  return {
    title: update.title,
    slug: update.slug,
    excerpt: update.excerpt,
    publishedAt: formatDate(rawDate),
    dateIso: rawDate,
    readTime: calculateReadTime(update.body),
    featuredImage: update.featuredImage
      ? {
          url: resolveMediaUrl(update.featuredImage.url),
          alternativeText: update.featuredImage.alternativeText,
        }
      : null,
    category: update.category
      ? {
          name: update.category.name,
          slug: update.category.slug,
        }
      : null,
  }
}


