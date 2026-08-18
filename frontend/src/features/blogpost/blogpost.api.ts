/**
 * blogpost.api
 *
 * Exports:
 *   fetchBlogPosts() — fetches blog posts for homepage slider (paginated: 100 items)
 *   fetchBlogPostsForListing() — fetches all published blog posts for the blog listing page
 *   fetchBlogPostSlugs() — fetches all slugs for static path generation
 *   fetchBlogPostBySlug() — fetches a single blog post detail by slug
 *   fetchBlogPostAction() — fetches the BlogPostAction single type for CTA section
 * Tokens: none (returns data only)
 * Hardcoded literals: pagination.pageSize = 100 (slider/slugs), no pagination limit (listing)
 * Context variants: not needed
 * Composed from: none
 */

import {
  getBlogPosts,
  getBlogPost,
  getBlogPostAction,
  getBlogPostSlugs,
} from '@/lib/strapi'
import type { BlogPost, BlogPostAction } from '@shared/strapi'
import { toBlogPostCardProps, toBlogPostDetailProps } from './blogpost.mapper'
import type {
  BlogPostCardProps,
  BlogPostDetailProps,
  BlogPostActionProps,
} from './blogpost.types'

const BLOG_POPULATE = {
  featuredImage: { populate: '*' },
  author: { populate: { avatar: { populate: '*' } } },
  tags: { populate: '*' },
}

const BLOG_DETAIL_POPULATE = {
  featuredImage: { populate: '*' },
  tags: { fields: ['name', 'slug'] },
  author: {
    populate: {
      avatar: { fields: ['url', 'alternativeText'] },
    },
    fields: ['name', 'slug', 'bio'],
  },
}

export async function fetchBlogPosts(): Promise<BlogPostCardProps[]> {
  const response = await getBlogPosts({
    populate: BLOG_POPULATE,
    sort: 'publishedAt:desc',
    pagination: { pageSize: 100 },
  })

  const posts: BlogPost[] = response.data
  return posts.map(toBlogPostCardProps)
}

export async function fetchBlogPostsForListing(): Promise<BlogPostCardProps[]> {
  const response = await getBlogPosts({
    populate: BLOG_POPULATE,
    sort: 'publishedAt:desc',
  })

  const posts: BlogPost[] = response.data
  return posts.map(toBlogPostCardProps)
}

export async function fetchBlogPostSlugs(): Promise<
  { slug: string; documentId: string }[]
> {
  return getBlogPostSlugs()
}

export async function fetchBlogPostByDocumentId(
  documentId: string,
): Promise<BlogPostDetailProps | null> {
  const post = await getBlogPost(documentId, {
    populate: BLOG_DETAIL_POPULATE,
  })
  if (!post) return null
  return toBlogPostDetailProps(post)
}

export async function fetchBlogPostAction(): Promise<BlogPostActionProps | null> {
  let action: BlogPostAction | null = null
  try {
    action = await getBlogPostAction({
      populate: '*',
    })
  } catch {
    return null
  }
  if (!action) return null
  return {
    heading: action.heading,
    description: action.description,
    buttonLabel: action.buttonLabel,
    buttonUrl: action.buttonUrl,
  }
}

/**
 * Fetch related blog posts by shared tag count.
 * Scores all posts by how many tags they share with the current post's tags,
 * then returns the top 3–4, excluding the current post.
 * Returns empty array if fewer than 2 related posts exist.
 */
export async function fetchRelatedBlogPosts(
  currentSlug: string,
  currentTags: { name: string; slug: string }[],
): Promise<BlogPostCardProps[]> {
  const allPosts = await fetchBlogPostsForListing()

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const sharedTags = (p.tags ?? []).filter((t) =>
        currentTags.some((ct) => ct.slug === t.slug),
      ).length
      return { post: p, score: sharedTags }
    })
    .sort((a, b) => b.score - a.score)

  // Only include posts with at least 1 shared tag
  const matched = scored.filter((s) => s.score > 0).slice(0, 4)

  if (matched.length < 2) return []

  return matched.map((m) => m.post)
}
