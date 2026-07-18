export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiMeta {
  pagination?: StrapiPagination
}

export interface StrapiDocument {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  locale: string | null
}

export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, unknown>
  fields?: string[]
  filters?: Record<string, unknown>
  sort?: string | string[]
  pagination?: {
    page?: number
    pageSize?: number
    start?: number
    limit?: number
    withCount?: boolean
  }
  locale?: string
  status?: 'published' | 'draft'
}

export interface Media {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
  name: string
  caption: string | null
  width: number
  height: number
  mime: string
  size: number
  formats: Record<
    string,
    {
      url: string
      width: number
      height: number
      mime: string
      size: number
    }
  > | null
}

export interface TextInline {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  strikethrough?: boolean
  underline?: boolean
  code?: boolean
}

export interface LinkInline {
  type: 'link'
  url: string
  children: Inline[]
}

export interface ParagraphBlock {
  type: 'paragraph'
  children: Inline[]
}

export interface HeadingBlock {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: Inline[]
}

export interface ListItem {
  type: 'list-item'
  children: Inline[]
}

export interface ListBlock {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: ListItem[]
}

export interface QuoteBlock {
  type: 'quote'
  children: Inline[]
}

export interface CodeBlock {
  type: 'code'
  children: Inline[]
  language?: string
}

export interface ImageBlock {
  type: 'image'
  image: Media
  children: Inline[]
}

export type Inline = TextInline | LinkInline

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | ImageBlock

export interface Category extends StrapiDocument {
  name: string
  slug: string
  description: string | null
}

export interface Tag extends StrapiDocument {
  name: string
  slug: string
}

export interface Author extends StrapiDocument {
  name: string
  slug: string
  avatar: Media | null
  bio: string | null
}

export interface Article extends StrapiDocument {
  title: string
  slug: string
  excerpt: string
  body: Block[]
  featuredImage: Media | null
  author: Author | null
  category: Category | null
  tags: Tag[]
}
