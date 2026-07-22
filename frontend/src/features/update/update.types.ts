export interface UpdateCardProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime: string
  featuredImage: { url: string; alternativeText: string | null } | null
  category: { name: string; slug: string } | null
}

export interface FeaturedUpdateCardProps extends UpdateCardProps {}

export interface UpdateCardSliderProps extends UpdateCardProps {
  author: { name: string; slug: string; avatar: string | null } | null
}

export interface UpdateGridProps {
  articles: UpdateCardProps[]
}

export interface UpdateFiltersProps {
  categories: { name: string; slug: string }[]
}
