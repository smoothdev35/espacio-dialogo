import type { Block } from '@shared/strapi'

export interface UpdateCardProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime: string
  featuredImage: { url: string; alternativeText: string | null } | null
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
  readTime: string
  featuredImage: { url: string; alternativeText: string | null } | null
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
