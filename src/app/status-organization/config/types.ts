/**
 * Status Organization - Type Definitions
 *
 * TypeScript interfaces for the status organization table.
 */

// =============================================================================
// CATEGORY TYPES
// =============================================================================

export type OrderCategory = 'ACTIVE' | 'CLOSED'

export type OrderSubcategory =
  | 'HEALTHY'
  | 'AT_RISK'
  | 'OTHER_ACTIVE'
  | 'FULLY_PAID'
  | 'CLAWED_BACK'
  | 'DECLINED'
  | 'OTHER_CLOSED'

export type MainState = 'HEALTHY' | 'RISK' | 'SETTLED'

export type BadgeColor = 'success' | 'warning' | 'error' | 'gray' | 'info'

export type UsageTier = 'high' | 'medium' | 'low' | 'stale'

// =============================================================================
// VIEW TYPES
// =============================================================================

export type ViewMode = 'detailed' | 'simplified'

// =============================================================================
// STATUS ENTRY
// =============================================================================

export interface StatusEntry {
  /** Raw database status code (e.g., "FUNDING_IN_REPAYMENT") */
  code: string
  /** User-facing display name (e.g., "Funding In Repayment") */
  displayLabel: string
  /** Top-level category: Active or Closed */
  category: OrderCategory
  /** Detailed subcategory for grouping */
  subcategory: OrderSubcategory
  /** Badge color for visual indicator */
  badgeColor: BadgeColor
  /** Current database count */
  count: number
  /** Usage tier based on count thresholds */
  usageTier: UsageTier
  /** Optional description for status log transitions */
  description?: string
}

// =============================================================================
// GROUPING CONFIG
// =============================================================================

export interface SubcategoryConfig {
  label: string
  badgeColor: BadgeColor
  category: OrderCategory
  mainState: MainState
}

export interface MainStateConfig {
  label: string
  badgeColor: BadgeColor
  subcategories: OrderSubcategory[]
}

// =============================================================================
// SUMMARY DATA
// =============================================================================

export interface GroupSummary {
  subcategory: OrderSubcategory
  count: number
  statusCount: number
}

export interface MainStateSummary {
  mainState: MainState
  count: number
  statusCount: number
}

