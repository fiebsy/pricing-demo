/**
 * Status Transitions - Type Definitions
 *
 * TypeScript interfaces for the status transition dashboard.
 */

// =============================================================================
// CATEGORY TYPES (from status-organization)
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

export type UsageTier = 'high' | 'medium' | 'low' | 'stale'

// =============================================================================
// TRANSLATION TYPES
// =============================================================================

export type CoverageType = 'specific' | 'semantic' | 'fallback'

export interface StatusTransitionDescription {
  condensed: string
  tooltip: string
}

// =============================================================================
// TRANSITION ENTRY
// =============================================================================

export interface TransitionEntry {
  /** Unique ID for the transition */
  id: string
  /** Source status code */
  fromStatus: string
  /** Target status code */
  toStatus: string
  /** Number of times this transition occurred */
  frequency: number
  /** When this transition last occurred */
  lastOccurred: string
  /** Condensed user-facing description */
  condensed: string
  /** Full tooltip explanation */
  tooltip: string
  /** Whether translation is specific, semantic, or fallback */
  coverage: CoverageType
  /** Source status category */
  fromCategory: OrderSubcategory | null
  /** Target status category */
  toCategory: OrderSubcategory | null
  /** Usage tier based on frequency */
  usageTier: UsageTier
}

// =============================================================================
// FILTER TYPES
// =============================================================================

export type CoverageFilter = 'all' | CoverageType

export type UsageTierFilter = 'all' | UsageTier

export type CategoryFilter = 'all' | OrderSubcategory

// =============================================================================
// SUMMARY TYPES
// =============================================================================

export interface CoverageSummary {
  specific: number
  semantic: number
  fallback: number
  total: number
}

export interface UsageTierSummary {
  high: number
  medium: number
  low: number
  stale: number
}
