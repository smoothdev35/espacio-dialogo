/**
 * press.api
 *
 * Exports:
 *   fetchPressItems() — fetches press coverage items for the blog page slider
 * Tokens: none (returns data only)
 * Hardcoded literals: none
 * Context variants: not needed
 * Composed from: none
 */

import { getPressItems } from '@/lib/strapi'
import type { Press } from '@shared/strapi'
import { toPressItem } from './press.mapper'
import type { PressItem } from './press.types'

export async function fetchPressItems(): Promise<PressItem[]> {
  try {
    const response = await getPressItems()
    const items: Press[] = response.data
    return items.map(toPressItem)
  } catch {
    return []
  }
}
