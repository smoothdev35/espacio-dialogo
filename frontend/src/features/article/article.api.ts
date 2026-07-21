import { getArticles, getCategories } from '@/lib/strapi'
import type { Article } from '@shared/strapi'
import {
  toArticleCardProps,
  toArticleCardSliderProps,
} from './article.mapper'
import type { ArticleCardProps, ArticleCardSliderProps } from './article.types'

export interface FetchArticlesResult {
  featured: FeaturedArticleResult | null
  grid: ArticleCardProps[]
  slider: ArticleCardSliderProps[]
  categories: { name: string; slug: string }[]
}

export interface FeaturedArticleResult extends ArticleCardProps {}

const ARTICLE_POPULATE = {
  featuredImage: { populate: '*' },
  author: { populate: { avatar: { populate: '*' } } },
  category: { populate: '*' },
  tags: { populate: '*' },
}

export async function fetchArticles(): Promise<FetchArticlesResult> {
  const articleResponse = await getArticles({
    populate: ARTICLE_POPULATE,
    sort: 'publishedAt:desc',
    pagination: { pageSize: 100 },
  })

  const articles: Article[] = articleResponse.data
  const mapped = articles.map(toArticleCardProps)
  const mappedSlider = articles.map(toArticleCardSliderProps)

  const featured =
    mapped.length > 0
      ? ({ ...mapped[0] } as FeaturedArticleResult)
      : null

  const grid = mapped.slice(1, 5)
  const slider = mappedSlider.slice(0, 6)

  const categoryResponse = await getCategories({ fields: ['name', 'slug'] })
  const categories = categoryResponse.data.map((c) => ({
    name: c.name,
    slug: c.slug,
  }))

  return { featured, grid, slider, categories }
}
