/**
 * Status Flow - Layout Configuration
 *
 * Column positions and dagre configuration for the flow visualization.
 */

import type { ColumnConfig, LayoutConfig, OrderSubcategory, BadgeColor } from './types'

// =============================================================================
// LAYOUT CONFIGURATION
// =============================================================================

export const LAYOUT_CONFIG: LayoutConfig = {
  canvasWidth: 2000,
  canvasHeight: 1400,
  nodeWidth: 200,
  nodeHeight: 60,
  nodeGap: 20,
  columnGap: 80,
  padding: 60,
}

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

// Column order matches the plan: flow from active states → closed states
const COLUMN_ORDER: OrderSubcategory[] = [
  'OTHER_ACTIVE',  // Column 0 - Entry points
  'HEALTHY',       // Column 1 - Good states
  'AT_RISK',       // Column 2 - Warning states
  'FULLY_PAID',    // Column 3 - Success end state
  'CLAWED_BACK',   // Column 4 - Clawback states
  'DECLINED',      // Column 5 - Declined end state
  'OTHER_CLOSED',  // Column 6 - Other closed
]

const COLUMN_LABELS: Record<OrderSubcategory, string> = {
  OTHER_ACTIVE: 'Other Active',
  HEALTHY: 'Healthy',
  AT_RISK: 'At Risk',
  FULLY_PAID: 'Fully Paid',
  CLAWED_BACK: 'Clawed Back',
  DECLINED: 'Declined',
  OTHER_CLOSED: 'Other Closed',
}

const COLUMN_COLORS: Record<OrderSubcategory, BadgeColor> = {
  OTHER_ACTIVE: 'info',
  HEALTHY: 'success',
  AT_RISK: 'warning',
  FULLY_PAID: 'success',
  CLAWED_BACK: 'error',
  DECLINED: 'gray',
  OTHER_CLOSED: 'gray',
}

// =============================================================================
// COMPUTED COLUMNS
// =============================================================================

function computeColumnX(index: number): number {
  return LAYOUT_CONFIG.padding + index * (LAYOUT_CONFIG.nodeWidth + LAYOUT_CONFIG.columnGap)
}

export const COLUMNS: ColumnConfig[] = COLUMN_ORDER.map((subcategory, index) => ({
  index,
  subcategory,
  label: COLUMN_LABELS[subcategory],
  color: COLUMN_COLORS[subcategory],
  x: computeColumnX(index),
  width: LAYOUT_CONFIG.nodeWidth,
}))

export const SUBCATEGORY_TO_COLUMN = new Map<OrderSubcategory, ColumnConfig>(
  COLUMNS.map(col => [col.subcategory, col])
)

// =============================================================================
// DAGRE CONFIGURATION
// =============================================================================

export const DAGRE_CONFIG = {
  rankdir: 'TB' as const,  // Top to bottom within columns
  nodesep: LAYOUT_CONFIG.nodeGap,
  ranksep: 40,
  marginx: 0,
  marginy: 0,
}

// =============================================================================
// END STATES
// =============================================================================

/** Status codes that are terminal/end states */
export const END_STATE_STATUSES = new Set([
  'PAID_IN_FULL',
  'CLAWBACK_COMPLETE',
  'DEFAULTED_SETTLED',
  'CANCELED_SETTLED',
  'CHARGEBACK_SETTLED',
  'DECLINED',
  'DUPLICATE',
  'WENT_DARK',
  'SUBSCRIPTION_CANCELED',
  'ABANDONED_FORM',
])

// =============================================================================
// HELPERS
// =============================================================================

export function getColumnForSubcategory(subcategory: OrderSubcategory): ColumnConfig | undefined {
  return SUBCATEGORY_TO_COLUMN.get(subcategory)
}

export function getColumnIndex(subcategory: OrderSubcategory): number {
  return COLUMNS.findIndex(col => col.subcategory === subcategory)
}
