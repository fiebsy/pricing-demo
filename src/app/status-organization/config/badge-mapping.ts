/**
 * Status Organization - Badge Mapping
 *
 * Badge color strategy for subcategories and main states.
 */

import type { OrderSubcategory, MainState, BadgeColor, SubcategoryConfig, MainStateConfig } from './types'

// =============================================================================
// SUBCATEGORY CONFIG (7 subcategories)
// =============================================================================

export const SUBCATEGORY_CONFIG: Record<OrderSubcategory, SubcategoryConfig> = {
  // ACTIVE subcategories
  HEALTHY: {
    label: 'Healthy',
    badgeColor: 'success',
    category: 'ACTIVE',
    mainState: 'HEALTHY',
  },
  AT_RISK: {
    label: 'At Risk',
    badgeColor: 'warning',
    category: 'ACTIVE',
    mainState: 'RISK',
  },
  OTHER_ACTIVE: {
    label: 'Other Active',
    badgeColor: 'info',
    category: 'ACTIVE',
    mainState: 'RISK',
  },

  // CLOSED subcategories
  FULLY_PAID: {
    label: 'Fully Paid',
    badgeColor: 'success',
    category: 'CLOSED',
    mainState: 'SETTLED',
  },
  CLAWED_BACK: {
    label: 'Clawed Back',
    badgeColor: 'error',
    category: 'CLOSED',
    mainState: 'SETTLED',
  },
  DECLINED: {
    label: 'Declined',
    badgeColor: 'gray',
    category: 'CLOSED',
    mainState: 'SETTLED',
  },
  OTHER_CLOSED: {
    label: 'Other Closed',
    badgeColor: 'gray',
    category: 'CLOSED',
    mainState: 'SETTLED',
  },
}

// =============================================================================
// MAIN STATE CONFIG (3 main states from Glossary)
// =============================================================================

export const MAIN_STATE_CONFIG: Record<MainState, MainStateConfig> = {
  HEALTHY: {
    label: 'Healthy',
    badgeColor: 'success',
    subcategories: ['HEALTHY'],
  },
  RISK: {
    label: 'Risk',
    badgeColor: 'warning',
    subcategories: ['AT_RISK', 'OTHER_ACTIVE'],
  },
  SETTLED: {
    label: 'Settled',
    badgeColor: 'gray',
    subcategories: ['FULLY_PAID', 'CLAWED_BACK', 'DECLINED', 'OTHER_CLOSED'],
  },
}

// =============================================================================
// USAGE TIER COLORS
// =============================================================================

export const USAGE_TIER_STYLES: Record<string, { dot: string; text: string }> = {
  high: {
    dot: 'bg-success',
    text: 'text-success',
  },
  medium: {
    dot: 'bg-info',
    text: 'text-info',
  },
  low: {
    dot: 'bg-tertiary',
    text: 'text-tertiary',
  },
  stale: {
    dot: 'border border-error bg-transparent',
    text: 'text-error',
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getSubcategoryLabel(subcategory: OrderSubcategory): string {
  return SUBCATEGORY_CONFIG[subcategory].label
}

export function getSubcategoryBadgeColor(subcategory: OrderSubcategory): BadgeColor {
  return SUBCATEGORY_CONFIG[subcategory].badgeColor
}

export function getMainStateLabel(mainState: MainState): string {
  return MAIN_STATE_CONFIG[mainState].label
}

export function getMainStateBadgeColor(mainState: MainState): BadgeColor {
  return MAIN_STATE_CONFIG[mainState].badgeColor
}

export function getSubcategoryMainState(subcategory: OrderSubcategory): MainState {
  return SUBCATEGORY_CONFIG[subcategory].mainState
}
