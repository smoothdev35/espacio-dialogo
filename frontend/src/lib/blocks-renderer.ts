/**
 * blocks-renderer
 *
 * Pure TS render functions for Strapi Blocks rich text AST.
 * Converts Strapi blocks to HTML string. No Astro dependency —
 * importable from any context (API routes, read-time, etc.).
 *
 * Exports: renderInline, renderBlocks, extractHeadings, generateHeadingId
 * Tokens: none
 * Hardcoded literals:
 *   - Inline format HTML tags (<strong>, <em>, <u>, <s>, <code>, <a>)
 *   - Block structure HTML tags (<p>, <h2-6>, <ul>/<ol>, <li>, <blockquote>, <pre><code>, <img>)
 *     These are semantic HTML — no token equivalents exist.
 * Context variants: not needed
 * Composed from: resolveMediaUrl (for image src resolution)
 */

import { resolveMediaUrl } from '@/lib/media'
import type { Block, Inline, ListItem, TextInline, LinkInline } from '@shared/strapi'

export interface TocEntry {
  level: 2 | 3
  text: string
  id: string
}

function isTextInline(node: Inline): node is TextInline {
  return node.type === 'text'
}

function isLinkInline(node: Inline): node is LinkInline {
  return node.type === 'link'
}

export function renderInline(children: Inline[]): string {
  return children
    .map((child) => {
      if (isLinkInline(child)) {
        return `<a href="${child.url}">${renderInline(child.children)}</a>`
      }
      if (isTextInline(child)) {
        let text = child.text
        if (child.bold) text = `<strong>${text}</strong>`
        if (child.italic) text = `<em>${text}</em>`
        if (child.underline) text = `<u>${text}</u>`
        if (child.strikethrough) text = `<s>${text}</s>`
        if (child.code) text = `<code>${text}</code>`
        return text
      }
      return ''
    })
    .join('')
}

function renderListItem(item: ListItem): string {
  return `<li>${renderInline(item.children)}</li>`
}

/**
 * Extract plain text from inline nodes (strips formatting tags).
 */
export function renderPlainText(children: Inline[]): string {
  return children
    .map((child) => {
      if (isLinkInline(child)) {
        return renderPlainText(child.children)
      }
      if (isTextInline(child)) {
        return child.text
      }
      return ''
    })
    .join('')
}

/**
 * Generate a kebab-case heading ID from plain text.
 * Lowercases, trims, replaces whitespace with hyphens, removes non-alphanumeric chars.
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Extract h2/h3 headings from a Block[] for table of contents.
 * Generates deduplicated kebab-case IDs that match the rendered heading id attributes.
 */
export function extractHeadings(blocks: Block[]): TocEntry[] {
  const baseCount = new Map<string, number>()
  const entries: TocEntry[] = []

  for (const block of blocks) {
    if (block.type !== 'heading') continue
    const level = block.level
    if (level !== 2 && level !== 3) continue

    const text = renderPlainText(block.children)
    const baseId = generateHeadingId(text)
    if (!baseId) continue

    // Deduplicate: track occurrences of each base ID
    const count = baseCount.get(baseId) ?? 0
    baseCount.set(baseId, count + 1)

    const id = count > 0 ? `${baseId}-${count}` : baseId
    entries.push({ level, text, id })
  }

  return entries
}

export function renderBlocks(blocks: Block[]): string {
  const headingBaseCount = new Map<string, number>()

  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return `<p>${renderInline(block.children)}</p>`
        case 'heading': {
          const level = block.level ?? 2
          const innerHtml = renderInline(block.children)
          const plainText = renderPlainText(block.children)
          const baseId = generateHeadingId(plainText)

          // Same dedup logic as extractHeadings — IDs must match
          const count = headingBaseCount.get(baseId) ?? 0
          headingBaseCount.set(baseId, count + 1)
          const id = count > 0 ? `${baseId}-${count}` : baseId

          return `<h${level} id="${id}">${innerHtml}</h${level}>`
        }
        case 'list': {
          const tag = block.format === 'ordered' ? 'ol' : 'ul'
          const items = block.children.map(renderListItem).join('')
          return `<${tag}>${items}</${tag}>`
        }
        case 'quote':
          return `<blockquote>${renderInline(block.children)}</blockquote>`
        case 'code': {
          const first = block.children[0]
          const text = first && isTextInline(first) ? first.text : ''
          return `<pre><code>${text}</code></pre>`
        }
        case 'image': {
          const img = block.image
          if (!img) return ''
          return `<img src="${resolveMediaUrl(img.url)}" alt="${img.alternativeText ?? ''}" />`
        }
        default:
          return ''
      }
    })
    .join('')
}
