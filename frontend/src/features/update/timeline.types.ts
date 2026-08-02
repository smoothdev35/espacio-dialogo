/**
 * Timeline types
 *
 * Props: none — data-only types
 * Tokens: none
 * Hardcoded literals: none
 * Context variants: not needed
 * Composed from: none
 */

export interface TimelineEntry {
  month: string
  year: number
  title: string
  slug: string
}

export interface TimelineSectionProps {
  entries: TimelineEntry[]
  currentSlug: string
  class?: string
}
