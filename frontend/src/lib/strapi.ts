import type {
  Article,
  Author,
  Category,
  StrapiMeta,
  StrapiQueryParams,
  Tag,
} from '@/types/strapi'

interface StrapiConfig {
  url: string
  token?: string
}

let config: StrapiConfig = {
  url: import.meta.env.STRAPI_URL,
}

export function configureStrapi(opts: Partial<StrapiConfig>): void {
  if (opts.url) config.url = opts.url
  if (opts.token) config.token = opts.token
}

function encodeValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return ''

  if (Array.isArray(value)) {
    return value
      .filter((v) => v !== null && v !== undefined)
      .map((v, i) => encodeValue(`${key}[${i}]`, v))
      .join('&')
  }

  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => encodeValue(`${key}[${k}]`, v))
      .filter(Boolean)
      .join('&')
  }

  return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
}

function buildQueryString(params?: StrapiQueryParams): string {
  if (!params) return ''

  const query = Object.entries(params)
    .map(([key, value]) => encodeValue(key, value))
    .filter(Boolean)
    .join('&')

  return query ? `?${query}` : ''
}

export class StrapiError extends Error {
  constructor(
    public status: number,
    message: string,
    public url: string,
  ) {
    super(message)
    this.name = 'StrapiError'
  }
}

interface StrapiCollectionResponse<T> {
  data: T[]
  meta: StrapiMeta
}

interface StrapiSingleResponse<T> {
  data: T
  meta: StrapiMeta
}

async function request<T>(
  path: string,
  params?: StrapiQueryParams,
): Promise<T> {
  const queryString = buildQueryString(params)
  const url = `${config.url}${path}${queryString}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (config.token) {
    headers['Authorization'] = `Bearer ${config.token}`
  }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new StrapiError(
      response.status,
      `Strapi API error (${response.status}${body ? `: ${body}` : ''})`,
      url,
    )
  }

  return response.json() as Promise<T>
}

export interface FetchCollectionResult<T> {
  data: T[]
  meta: StrapiMeta
}

export async function fetchCollection<T>(
  pluralApiId: string,
  params?: StrapiQueryParams,
): Promise<FetchCollectionResult<T>> {
  const response = await request<StrapiCollectionResponse<T>>(
    `/api/${pluralApiId}`,
    params,
  )
  return { data: response.data, meta: response.meta }
}

export async function fetchSingle<T>(
  pluralApiId: string,
  documentId: string,
  params?: StrapiQueryParams,
): Promise<T | null> {
  const response = await request<StrapiSingleResponse<T>>(
    `/api/${pluralApiId}/${documentId}`,
    params,
  )
  return response.data
}

export function getArticles(params?: StrapiQueryParams) {
  return fetchCollection<Article>('articles', params)
}

export function getArticle(documentId: string, params?: StrapiQueryParams) {
  return fetchSingle<Article>('articles', documentId, params)
}

export function getCategories(params?: StrapiQueryParams) {
  return fetchCollection<Category>('categories', params)
}

export function getCategory(documentId: string, params?: StrapiQueryParams) {
  return fetchSingle<Category>('categories', documentId, params)
}

export function getAuthors(params?: StrapiQueryParams) {
  return fetchCollection<Author>('authors', params)
}

export function getAuthor(documentId: string, params?: StrapiQueryParams) {
  return fetchSingle<Author>('authors', documentId, params)
}

export function getTags(params?: StrapiQueryParams) {
  return fetchCollection<Tag>('tags', params)
}

export function getTag(documentId: string, params?: StrapiQueryParams) {
  return fetchSingle<Tag>('tags', documentId, params)
}
