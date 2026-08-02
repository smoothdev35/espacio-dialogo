/**
 * press.types
 *
 * Types: PressMedia, PressItem
 * Slots: none
 * Tokens: none
 * Hardcoded literals: none
 * Context variants: not needed
 * Composed from: none
 */

export interface PressMedia {
  type: 'image' | 'video'
  url: string
  /** Alternative text for images (alt attribute) */
  alternativeText?: string | null
  /** Video poster/thumbnail image URL */
  posterUrl?: string | null
}

export interface PressItem {
  title: string
  slug: string
  excerpt: string
  /** Formatted display date (e.g. "June 15, 2026") */
  publishedAt: string
  /** Raw ISO date for `<time datetime>` — machine-readable */
  dateIso: string
  source: string
  externalUrl?: string
  media: PressMedia | null
}
