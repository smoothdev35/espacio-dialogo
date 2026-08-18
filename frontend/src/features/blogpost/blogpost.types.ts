/**
 * blogpost.types
 *
 * Types: BlogPostCardProps, BlogPostDetailProps, BlogPostActionProps
 * Slots: none
 * Tokens: none
 * Hardcoded literals: none
 * Context variants: not needed
 * Composed from: none
 */

import type { Block } from '@shared/strapi'
import type { ResolvedImage } from '@/lib/media'

export interface BlogPostCardProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  /** Raw ISO date for `<time datetime>` — machine-readable */
  dateIso: string
  readTime: string
  featuredImage: ResolvedImage
  tags?: { name: string; slug: string }[]
  author: { name: string; slug: string; avatar: string | null } | null
}

export interface BlogPostDetailProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  /** Raw ISO date for `<time datetime>` — machine-readable */
  dateIso: string
  readTime: string
  featuredImage: ResolvedImage
  tags: { name: string; slug: string }[]
  author: {
    name: string
    slug: string
    avatar: { url: string; alternativeText: string | null } | null
    bio: string | null
  } | null
  body: Block[]
}

export interface BlogPostActionProps {
  heading: string
  description: string
  buttonLabel: string
  buttonUrl: string
}
