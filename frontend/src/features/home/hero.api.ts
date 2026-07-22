/**
 * hero.api
 *
 * Exports: getHero() — fetches the first hero entry from Strapi
 * Tokens: none (returns data only)
 * Hardcoded literals: none
 * Context variants: not needed
 * Composed from: none
 */

import { resolveMediaUrl } from '@/lib/media'
import { fetchSingleType } from '@/lib/strapi'
import type { Hero } from '@shared/strapi'

export interface HeroResult {
  title: string
  subtitle: string | null
  heroImage: { url: string; alt: string } | null
}

export async function getHero(): Promise<HeroResult | null> {
  const params = {
    populate: { heroImage: { populate: '*' } },
  }

  const hero = await fetchSingleType<Hero>('heroes', params)
  if (!hero) return null

  return {
    title: hero.title,
    subtitle: hero.subtitle,
    heroImage: hero.heroImage
      ? {
          url: resolveMediaUrl(hero.heroImage.url),
          alt: hero.heroImage.alternativeText ?? '',
        }
      : null,
  }
}
