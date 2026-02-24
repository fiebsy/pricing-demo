/**
 * Tier Utilities
 *
 * Tier filtering and sorting logic for pricing select menu.
 */

import type { PricingTier } from '../types'

// ============================================================================
// TIER ID SORTING
// ============================================================================

/**
 * Sort tier IDs numerically (tier-100, tier-200, etc.)
 */
export function sortTierIds(tierIds: string[]): string[] {
  return [...tierIds].sort((a, b) => {
    const numA = parseInt(a.replace('tier-', ''), 10)
    const numB = parseInt(b.replace('tier-', ''), 10)
    return numA - numB
  })
}

// ============================================================================
// TIER FILTERING
// ============================================================================

interface FilterTiersOptions {
  availableTierIds: string[]
  upgradeMode: boolean
}

/**
 * Filter tiers based on configuration.
 * In upgrade mode, hides the Pro base tier (tier-100).
 */
export function filterAvailableTiers(
  allTiers: PricingTier[],
  options: FilterTiersOptions
): PricingTier[] {
  const { availableTierIds, upgradeMode } = options

  return allTiers.filter((tier) => {
    // Must be in the available tier IDs list
    if (!availableTierIds.includes(tier.id)) return false

    // In upgrade mode, hide Pro base tier (tier-100)
    if (upgradeMode && tier.id === 'tier-100') return false

    return true
  })
}

/**
 * Ensure at least one tier remains when toggling.
 * Returns updated tier list with the tier added or removed.
 */
export function toggleTierInList(
  currentTiers: string[],
  tierId: string,
  enabled: boolean
): string[] {
  let newTiers: string[]

  if (enabled) {
    // Add tier if not already present
    newTiers = currentTiers.includes(tierId) ? currentTiers : [...currentTiers, tierId]
  } else {
    // Remove tier (but ensure at least one tier remains)
    newTiers = currentTiers.filter((t) => t !== tierId)
    if (newTiers.length === 0) {
      newTiers = [tierId] // Keep at least one tier
    }
  }

  // Sort tiers to maintain order
  return sortTierIds(newTiers)
}
