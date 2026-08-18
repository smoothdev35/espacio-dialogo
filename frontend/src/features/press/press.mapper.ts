import { resolveMediaUrl } from '@/lib/media'
import { formatDate } from '@/lib/date'
import type { Press } from '@shared/strapi'
import type { PressItem, PressMedia } from './press.types'

export function toPressItem(press: Press): PressItem {
  const media: PressMedia | null = press.media
    ? {
        type: press.media.mime.startsWith('video/') ? 'video' : 'image',
        url: resolveMediaUrl(press.media.url),
        alternativeText: press.media.alternativeText,
        posterUrl: press.videoPoster
          ? resolveMediaUrl(press.videoPoster.url)
          : null,
      }
    : press.videoPoster
      ? {
          type: 'image',
          url: resolveMediaUrl(press.videoPoster.url),
          alternativeText: press.videoPoster.alternativeText,
          posterUrl: null,
        }
      : null

  return {
    title: press.title,
    excerpt: press.excerpt ?? '',
    publicationDate: formatDate(press.publicationDate),
    dateIso: press.publicationDate,
    source: press.source,
    externalUrl: press.externalUrl,
    media,
  }
}
