import type {
  Article,
  Block,
  Inline,
  ListItem,
} from '@shared/strapi'
import type {
  ArticleCardProps,
  ArticleCardSliderProps,
} from './article.types'

function countWordsInInline(node: Inline): number {
  if (node.type === 'text') {
    return node.text.trim().split(/\s+/).filter(Boolean).length
  }
  return node.children.reduce(
    (sum, child) => sum + countWordsInInline(child),
    0,
  )
}

function countWordsInChildren(children: Inline[]): number {
  return children.reduce(
    (sum, child) => sum + countWordsInInline(child),
    0,
  )
}

function countWordsInBlock(block: Block | ListItem): number {
  if (block.type === 'list') {
    return block.children.reduce(
      (sum, item) => sum + countWordsInBlock(item),
      0,
    )
  }
  if (block.type === 'list-item') {
    return countWordsInChildren(block.children)
  }
  return countWordsInChildren(block.children)
}

function calculateReadTime(body: Block[]): string {
  const wordCount = body.reduce(
    (sum, block) => sum + countWordsInBlock(block),
    0,
  )
  const minutes = Math.max(1, Math.round(wordCount / 200))
  return `${minutes} min read`
}

/**
 * Resolve Strapi media URL to an absolute URL.
 * Strapi returns relative paths (e.g. /uploads/image.jpg) — prepend
 * the public Strapi origin so the client can fetch the image.
 */
function resolveMediaUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const base = import.meta.env.PUBLIC_STRAPI_URL
  if (!base) return url
  return `${base.replace(/\/+$/, '')}${url}`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function toArticleCardProps(
  article: Article,
): ArticleCardProps {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publishedAt: formatDate(article.publishedAt ?? article.createdAt),
    readTime: calculateReadTime(article.body),
    featuredImage: article.featuredImage
      ? {
          url: resolveMediaUrl(article.featuredImage.url),
          alternativeText: article.featuredImage.alternativeText,
        }
      : null,
    category: article.category
      ? {
          name: article.category.name,
          slug: article.category.slug,
        }
      : null,
  }
}

export function toArticleCardSliderProps(
  article: Article,
): ArticleCardSliderProps {
  return {
    ...toArticleCardProps(article),
    author: article.author
      ? {
          name: article.author.name,
          slug: article.author.slug,
          avatar: article.author.avatar?.url
          ? resolveMediaUrl(article.author.avatar.url)
          : null,
        }
      : null,
  }
}
