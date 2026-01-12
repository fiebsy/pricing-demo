/**
 * Collections Module - Type Definitions
 *
 * Types for the demo-repo collections dashboard.
 * Mirrors front-end types without GraphQL dependencies.
 */

// =============================================================================
// ENUMS (Mirroring GraphQL enums)
// =============================================================================

export enum RiskCategory {
  ActiveClawback = 'ACTIVE_CLAWBACK',
  ClawbackRisk = 'CLAWBACK_RISK',
  Collections = 'COLLECTIONS',
  SettledClawback = 'SETTLED_CLAWBACK',
}

export enum RiskTier {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

export enum PaymentPlanType {
  Funding = 'FUNDING',
  Pending = 'PENDING',
  Servicing = 'SERVICING',
}

export enum ContractStatus {
  // Collections statuses
  FailedPayment = 'FailedPayment',
  NsfReturned = 'NsfReturned',
  PaymentPending = 'PaymentPending',
  // Clawback statuses
  DefaultedPendingClawback = 'DefaultedPendingClawback',
  DefaultedSettled = 'DefaultedSettled',
  CanceledPendingClawback = 'CanceledPendingClawback',
  CanceledSettled = 'CanceledSettled',
  ChargebackPendingClawback = 'ChargebackPendingClawback',
  ChargebackSettled = 'ChargebackSettled',
  ClawbackInProgress = 'ClawbackInProgress',
  ClawbackComplete = 'ClawbackComplete',
  // Active statuses
  Active = 'Active',
  PaidOff = 'PaidOff',
}

// =============================================================================
// PARTNER RISK ITEM TYPE
// =============================================================================

export interface PartnerRiskItem extends Record<string, unknown> {
  /** Unique identifier */
  id: number
  /** Contract ID */
  contractId: number
  /** Customer full name */
  customerName: string
  /** Customer email address */
  customerEmail?: string | null
  /** Plan type: FUNDING or SERVICING */
  planType?: PaymentPlanType | null
  /** Total plan amount (amountTotal * sellRate) */
  planTotal?: number | null
  /** Remaining balance to collect */
  remainingBalance?: number | null
  /** Amount of funded principal at risk of loss */
  atRiskFundedAmount?: number | null
  /** Amount clawed back from partner (for settled clawbacks) */
  clawbackAmount?: number | null
  /** Foregone payout amount - expected minus received */
  shortfallAmount?: number | null
  /** Risk category classification */
  riskCategory: RiskCategory
  /** Risk tier based on days in collections */
  riskTier?: RiskTier | null
  /** Current contract status */
  status: ContractStatus
  /** Previous status before current status */
  previousStatus?: string | null
  /** Date when contract entered current status */
  statusChangedAt?: Date | null
  /** User-friendly description of status transition */
  statusTransitionDescription?: string | null
  /** Detailed tooltip for status transition */
  statusTransitionTooltip?: string | null
  /** Relative time since status change (e.g., "6h ago") */
  statusChangedRelative?: string | null
  /** Days until clawback threshold (15 - daysInCollections) */
  daysUntilClawback?: number | null
  /** Days in collections (calculated from first failed payment) */
  daysInCollections?: number | null
  /** Contract start date */
  contractDate?: Date | null
  /** Date of last cleared payment */
  lastPaymentClearedDate?: Date | null
  /** Whether contract is in active clawback status */
  isInClawback: boolean
  /** Outcome type for clawbacks: Default, Canceled, or Chargeback */
  outcomeType?: string | null
  /** Number of cleared payments */
  paymentsMade?: number | null
  /** Total scheduled payments */
  paymentsTotal?: number | null
}

// =============================================================================
// METRIC TILE TYPES
// =============================================================================

export type MetricFilterId = 'atRisk' | 'clawback' | 'settled' | 'defaulted'

export type ChangeType = 'positive' | 'negative' | 'neutral'

export interface MetricData {
  id: MetricFilterId
  label: string
  getValue: (items: PartnerRiskItem[]) => number
  getChange: (items: PartnerRiskItem[]) => { value: string; type: ChangeType }
}

// =============================================================================
// FILTER TYPES
// =============================================================================

export type FilterId =
  // Status filters
  | 'status-collections'
  | 'status-clawback'
  | 'status-settled'
  // Outcome filters (type of failed order)
  | 'outcome-defaulted'
  | 'outcome-canceled'
  | 'outcome-chargeback'
  // Urgency filters
  | 'urgency-critical'
  | 'urgency-warning'
  | 'urgency-safe'
  // Balance filters
  | 'balance-high'
  | 'balance-medium'
  | 'balance-low'
  // Route filters
  | 'route-servicing'
  | 'route-funding'

export interface ActiveFilter {
  id: FilterId
  label: string
  value: string
  category: 'Status' | 'Urgency' | 'Balance' | 'Route' | 'Outcome'
}

export type FilterPredicate = (item: PartnerRiskItem) => boolean

// =============================================================================
// SORT TYPES
// =============================================================================

export type PartnerRiskSortField =
  | 'ID'
  | 'REMAINING_BALANCE'
  | 'CONTRACT_DATE'
  | 'LAST_PAYMENT_CLEARED_DATE'
  | 'STATUS_CHANGED_AT'
  | 'DAYS_IN_COLLECTIONS'
  | 'DAYS_UNTIL_CLAWBACK'
  | 'AT_RISK_FUNDED_AMOUNT'
  | 'SHORTFALL_AMOUNT'

export type PartnerRiskSortOrder = 'ASC' | 'DESC'

// =============================================================================
// PAGE STATE TYPES
// =============================================================================

export interface CollectionsDashboardState {
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Filters
  activeFilters: ActiveFilter[]
  handleFilterSelect: (filterId: string) => void
  handleFilterRemove: (filterId: string) => void
  handleFiltersClear: () => void

  // Metric filter
  activeMetric: MetricFilterId | null
  handleMetricClick: (metricId: MetricFilterId) => void

  // Sorting
  sortBy: PartnerRiskSortField
  sortOrder: PartnerRiskSortOrder
  sortColumnKey: string | null
  handleServerSort: (columnKey: string, direction: 'asc' | 'desc') => void

  // Data
  items: PartnerRiskItem[]
  filteredItems: PartnerRiskItem[]
  isLoading: boolean
  totalCount: number
  hasNextPage: boolean
  loadMore: () => Promise<void>
}

// =============================================================================
// MOCK DATA METRICS
// =============================================================================

export interface MockDataMetrics {
  totalCount: number
  defaultRateAllTime: number
  defaultRateLast30Days: number
  defaultedOrdersCount: number
  collectionsCount: number
  collectionsAmount: number
  activeClawbackCount: number
  activeClawbackAmount: number
  settledClawbackCount: number
  settledClawbackAmount: number
}
