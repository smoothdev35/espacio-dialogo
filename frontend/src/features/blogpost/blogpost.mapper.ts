/**
 * blogpost.mapper
 *
 * Exports: toBlogPostCardProps, toBlogPostDetailProps
 * Composed from: @/lib/read-time (calculateReadTime), @/lib/date (formatDate)
 */

import { resolveMediaUrl } from '@/lib/media'
import { calculateReadTime } from '@/lib/read-time'
import { formatDate } from '@/lib/date'
import type {
  BlogPost,
} from '@shared/strapi'
import type {
  BlogPostCardProps,
  BlogPostDetailProps,
} from './blogpost.types'

export function toBlogPostCardProps(
  post: BlogPost,
): BlogPostCardProps {
  const rawDate = post.publishedAt ?? post.createdAt
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: formatDate(rawDate),
    dateIso: rawDate,
    readTime: calculateReadTime(post.body),
    featuredImage: post.featuredImage
      ? {
          url: resolveMediaUrl(post.featuredImage.url),
          alternativeText: post.featuredImage.alternativeText,
        }
      : null,
    tags: post.tags?.map((t) => ({ name: t.name, slug: t.slug })) ?? undefined,
    author: post.author
      ? {
          name: post.author.name,
          slug: post.author.slug,
          avatar: post.author.avatar?.url
            ? resolveMediaUrl(post.author.avatar.url)
            : null,
        }
      : null,
  }
}

export function toBlogPostDetailProps(
  post: BlogPost,
): BlogPostDetailProps {
  const rawDate = post.publishedAt ?? post.createdAt
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: formatDate(rawDate),
    dateIso: rawDate,
    readTime: calculateReadTime(post.body),
    featuredImage: post.featuredImage
      ? {
          url: resolveMediaUrl(post.featuredImage.url),
          alternativeText: post.featuredImage.alternativeText,
        }
      : null,
    tags: (post.tags ?? []).map((t) => ({ name: t.name, slug: t.slug })),
    author: post.author
      ? {
          name: post.author.name,
          slug: post.author.slug,
          bio: post.author.bio,
          avatar: post.author.avatar
            ? {
                url: resolveMediaUrl(post.author.avatar.url),
                alternativeText: post.author.avatar.alternativeText,
              }
            : null,
        }
      : null,
    body: post.body,
  }
}
