/**
 * Status Audit - Type Definitions
 *
 * TypeScript interfaces for the status audit dashboard.
 */

// =============================================================================
// CATEGORY TYPES
// =============================================================================

export type OrderCategory = 'ACTIVE' | 'CLOSED'

export type OrderSubcategory =
  | 'HEALTHY'
  | 'AT_RISK'
  | 'OTHER_ACTIVE'
  | 'LOST_PENDING'
  | 'COMPLETED'
  | 'LOST'
  | 'SETTLED'
  | 'OTHER_CLOSED'
  | 'NEVER_STARTED'

export type LifecycleStage = 'Pre-Active' | 'Active' | 'Exiting' | 'Closed'

export type OrderType = 'FUNDING' | 'SERVICING' | 'BOTH'

export type ChangeCategory =
  | 'PROGRESSION'
  | 'ESCALATION'
  | 'RECOVERY'
  | 'SETTLEMENT'
  | 'OSCILLATION'
  | 'ADMINISTRATIVE'

export type CoverageType = 'specific' | 'semantic'

// =============================================================================
// STATUS ROW
// =============================================================================

export interface StatusRow {
  /** Record type identifier */
  record_type: 'STATUS'
  /** Unique status ID (S001, S002, etc.) */
  id: string
  /** Status code (e.g., FUNDING_IN_REPAYMENT) */
  code: string
  /** Workflow stage (e.g., Active, Collections, Underwriting) */
  stage: string
  /** Lifecycle stage for chart organization (Pre-Active, Active, Exiting, Closed) */
  lifecycle_stage: string
  /** High-level category */
  category: OrderCategory
  /** Subcategory for grouping */
  subcategory: OrderSubcategory
  /** Order type this status applies to */
  order_type: OrderType
  /** Whether this status can be ignored in audits */
  is_ignorable: boolean
  /** Reason for being ignorable */
  ignorable_reason: string
  /** Short badge label */
  badge_label: string
  /** Short descriptive label */
  short_label: string
  /** One-sentence description */
  sentence_desc: string
  /** User-facing description */
  user_facing_desc: string
  /** Technical description for developers */
  technical_desc: string
  /** Expected duration in this status */
  duration_expectation: string
  /** Next steps or actions */
  next_steps: string
  /** Who owns/manages this status */
  owner: string
}

// =============================================================================
// TRANSITION ROW
// =============================================================================

export interface TransitionRow {
  /** Record type identifier */
  record_type: 'TRANSITION'
  /** Unique transition ID (T001, T002, etc.) */
  id: string
  /** Source status ID */
  from_status_id: string
  /** Target status ID */
  to_status_id: string
  /** Source status code */
  from_code: string
  /** Target status code */
  to_code: string
  /** Number of times this transition occurred */
  frequency: number
  /** Coverage type */
  coverage: CoverageType
  /** Change category */
  change_category: ChangeCategory
  /** Whether this transition can be ignored */
  is_ignorable: boolean
  /** Short badge label */
  badge_label: string
  /** Short descriptive label */
  short_label: string
  /** One-sentence description */
  sentence_desc: string
  /** User-facing description */
  user_facing_desc: string
  /** Technical description */
  technical_desc: string
}

// =============================================================================
// VIEW TYPES
// =============================================================================

export type ViewMode = 'statuses' | 'transitions'

// =============================================================================
// HEADER TYPES
// =============================================================================

export interface LifecycleColumn {
  title: string
  subtitle?: string
  statuses: StatusRow[]
  count: number
}

export interface HeaderData {
  preActive: LifecycleColumn
  healthy: LifecycleColumn
  atRisk: LifecycleColumn
  closed: LifecycleColumn
}
