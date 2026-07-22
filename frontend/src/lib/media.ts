/**
 * media
 *
 * Shared media utility. Currently only provides `resolveMediaUrl` for
 * resolving Strapi relative media paths to absolute URLs.
 *
 * Exports: resolveMediaUrl
 * Tokens: none
 */

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
