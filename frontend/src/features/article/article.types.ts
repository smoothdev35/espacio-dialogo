export interface ArticleCardProps {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime: string
  featuredImage: { url: string; alternativeText: string | null } | null
  category: { name: string; slug: string } | null
}

export interface FeaturedArticleCardProps extends ArticleCardProps {}

export interface ArticleCardSliderProps extends ArticleCardProps {
  author: { name: string; slug: string; avatar: string | null } | null
}

export interface ArticleGridProps {
  articles: ArticleCardProps[]
}

export interface ArticleFiltersProps {
  categories: { name: string; slug: string }[]
}
