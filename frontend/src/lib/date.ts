/**
 * date
 *
 * Shared date formatting for any Strapi content type.
 *
 * Usage:
 *   import { formatDate } from '@/lib/date'
 *   const formatted = formatDate(post.publishedAt) // "January 15, 2026"
 */

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
