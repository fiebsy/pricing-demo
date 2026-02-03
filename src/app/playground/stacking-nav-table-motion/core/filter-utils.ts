/**
 * Stacking Nav + Table Motion Playground - Filter Utilities
 *
 * Maps the stacking nav's active path to character filtering.
 */

import type { ActivePath } from '@/components/ui/features/experimental/stacking-nav-motion'
import type { Character } from '../config/types'
import type { CharacterEnergy } from '../config/types'

/**
 * Filter characters based on the stacking nav's active path.
 *
 * Path depth mapping:
 * - [] or ['all']                                → All characters (L0)
 * - ['marvel']                                   → Filter by realm (L1)
 * - ['marvel', 'avengers']                       → Filter by realm + faction (L2)
 * - ['marvel', 'avengers', 'main-character']     → Filter by realm + faction + energy (L3)
 */
export function filterByPath(characters: Character[], path: ActivePath): Character[] {
  if (path.length === 0 || path[0] === 'all') return characters

  let filtered = characters.filter((c) => c.realm === path[0])

  if (path.length >= 2) {
    filtered = filtered.filter((c) => c.faction === path[1])
  }

  if (path.length >= 3) {
    filtered = filtered.filter((c) => c.energy === (path[2] as CharacterEnergy))
  }

  return filtered
}
