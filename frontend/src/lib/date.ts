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
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Extract month name and year from a date string.
 * Uses same locale as formatDate() for consistency.
 *
 * Returns { month: "October", year: 2024 }
 */
export function formatMonthYear(dateString: string): { month: string; year: number } {
  const date = new Date(dateString)
  return {
    month: date.toLocaleDateString('es-MX', { month: 'long' }),
    year: date.getFullYear(),
  }
}
