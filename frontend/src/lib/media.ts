/**
 * media
 *
 * Shared media utility. Currently only provides `resolveMediaUrl` for
 * resolving Strapi relative media paths to absolute URLs.
 *
 * Exports: resolveMediaUrl
 * Tokens: none
 */

import type { Media } from '@shared/strapi'

/**
 * Resolve Strapi media URL to an absolute URL.
 * Strapi returns relative paths (e.g. /uploads/image.jpg) — prepend
 * the public Strapi origin so the client can fetch the image.
 */
export function resolveMediaUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const base = import.meta.env.PUBLIC_STRAPI_URL
  if (!base) return url
  return `${base.replace(/\/+$/, '')}${url}`
}

export interface ImageFormat {
  url: string
  width: number
  height: number
}

export interface ResolvedImage {
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats: Record<string, ImageFormat> | null
}

export function toResolvedImage(media: Media | null): ResolvedImage | null {
  if (!media) return null
  return {
    url: resolveMediaUrl(media.url),
    alternativeText: media.alternativeText,
    width: media.width,
    height: media.height,
    formats: media.formats
      ? Object.fromEntries(
          Object.entries(media.formats).map(([key, format]) => [
            key,
            {
              url: resolveMediaUrl(format.url),
              width: format.width,
              height: format.height,
            },
          ]),
        )
      : null,
  }
}

export function buildSrcSet(image: ResolvedImage): string {
  const candidates: { url: string; width: number }[] = []

  if (image.formats) {
    for (const format of Object.values(image.formats)) {
      if (format?.url && format?.width) {
        candidates.push({
          url: resolveMediaUrl(format.url),
          width: format.width,
        })
      }
    }
  }

  if (image.url && image.width) {
    candidates.push({ url: resolveMediaUrl(image.url), width: image.width })
  }

  const seen = new Set<number>()
  return candidates
    .sort((a, b) => a.width - b.width)
    .filter((c) => {
      if (seen.has(c.width)) return false
      seen.add(c.width)
      return true
    })
    .map((c) => `${c.url} ${c.width}w`)
    .join(', ')
}
