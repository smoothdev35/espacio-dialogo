/**
 * read-time
 *
 * Shared read-time computation for any Strapi content type backed by
 * rich text `Block[]` bodies (Update, BlogPost, etc.).
 *
 * Usage:
 *   import { calculateReadTime } from '@/lib/read-time'
 *   const readTime = calculateReadTime(post.body) // "3 min read"
 */

import type { Block, Inline, ListItem } from '@shared/strapi'

const WORDS_PER_MINUTE = 200

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

export function calculateReadTime(body: Block[]): string {
  const wordCount = body.reduce(
    (sum, block) => sum + countWordsInBlock(block),
    0,
  )
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
  return `${minutes} min read`
}
