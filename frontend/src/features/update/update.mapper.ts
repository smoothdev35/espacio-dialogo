import { resolveMediaUrl } from '@/lib/media'
import type {
  Update,
  Block,
  Inline,
  ListItem,
} from '@shared/strapi'
import type {
  UpdateCardProps,
  UpdateCardSliderProps,
} from './update.types'

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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function toUpdateCardProps(
  update: Update,
): UpdateCardProps {
  return {
    title: update.title,
    slug: update.slug,
    excerpt: update.excerpt,
    publishedAt: formatDate(update.publishedAt ?? update.createdAt),
    readTime: calculateReadTime(update.body),
    featuredImage: update.featuredImage
      ? {
          url: resolveMediaUrl(update.featuredImage.url),
          alternativeText: update.featuredImage.alternativeText,
        }
      : null,
    category: update.category
      ? {
          name: update.category.name,
          slug: update.category.slug,
        }
      : null,
  }
}

export function toUpdateCardSliderProps(
  update: Update,
): UpdateCardSliderProps {
  return {
    ...toUpdateCardProps(update),
    author: update.author
      ? {
          name: update.author.name,
          slug: update.author.slug,
          avatar: update.author.avatar?.url
          ? resolveMediaUrl(update.author.avatar.url)
          : null,
        }
      : null,
  }
}
