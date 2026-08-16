import type { Block } from '@shared/strapi'
import type { ResolvedImage } from '@/lib/media'

export interface UpdateCardProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  /** Raw ISO date for `<time datetime>` — machine-readable */
  dateIso: string
  readTime: string
  featuredImage: ResolvedImage | null
  category: { name: string; slug: string } | null
}

export interface UpdateGridProps {
  articles: UpdateCardProps[]
}

export interface UpdateFiltersProps {
  categories: { name: string; slug: string }[]
}

export interface UpdateDetailProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  /** Raw ISO date for `<time datetime>` — machine-readable */
  dateIso: string
  readTime: string
  featuredImage: ResolvedImage | null
  category: { name: string; slug: string } | null
  tags: { name: string; slug: string }[]
  author: {
    name: string
    slug: string
    avatar: { url: string; alternativeText: string | null } | null
    bio: string | null
  } | null
  body: Block[]
}
