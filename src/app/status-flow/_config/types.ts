/**
 * Status Flow - Type Definitions
 *
 * TypeScript interfaces for the React Flow status visualization.
 */

import type { Node, Edge } from '@xyflow/react'

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

export type BadgeColor = 'success' | 'warning' | 'error' | 'gray' | 'info'

// =============================================================================
// NODE TYPES
// =============================================================================

export interface StatusNodeData extends Record<string, unknown> {
  /** Status code (e.g., "FUNDING_IN_REPAYMENT") */
  code: string
  /** User-facing display name */
  label: string
  /** Subcategory for coloring */
  subcategory: OrderSubcategory
  /** Badge color */
  badgeColor: BadgeColor
  /** Database count */
  count: number
  /** Usage tier */
  usageTier: UsageTier
  /** Column index (0-6) */
  columnIndex: number
  /** Sequence depth: 0 = entry point, higher = later in flow */
  sequenceDepth: number
  /** Whether node is highlighted (path tracing) */
  isHighlighted?: boolean
  /** Whether node is dimmed (not in path) */
  isDimmed?: boolean
  /** Whether this is a terminal/end state */
  isEndState?: boolean
}

export type StatusFlowNode = Node<StatusNodeData, 'status'>

// =============================================================================
// EDGE TYPES
// =============================================================================

export type EndStateCategory =
  | 'PAID_IN_FULL'
  | 'CLAWBACK'
  | 'CANCELED'
  | 'DECLINED'
  | 'OTHER_CLOSED'
  | 'ACTIVE'

export interface TransitionEdgeData extends Record<string, unknown> {
  /** Unique ID */
  id: string
  /** Source status */
  fromStatus: string
  /** Target status */
  toStatus: string
  /** Frequency count */
  frequency: number
  /** Usage tier for styling */
  usageTier: UsageTier
  /** Condensed description */
  label: string
  /** Full tooltip description */
  tooltip: string
  /** Whether edge is highlighted (path tracing) */
  isHighlighted?: boolean
  /** Whether edge is dimmed (not in path) */
  isDimmed?: boolean
  /** End state category this edge leads to */
  endCategory?: EndStateCategory
  /** Computed color for the edge */
  color?: string
}

export type StatusFlowEdge = Edge<TransitionEdgeData>

// =============================================================================
// FILTER STATE
// =============================================================================

export interface FilterState {
  /** Minimum frequency threshold */
  frequencyThreshold: number
  /** Visible subcategories */
  visibleSubcategories: Set<OrderSubcategory>
  /** Show all transitions (ignore frequency filter) */
  showAll: boolean
  /** Active path preset ID */
  activePathPreset: string | null
}

// =============================================================================
// PATH PRESETS
// =============================================================================

export interface PathPreset {
  id: string
  label: string
  description: string
  /** Target status codes for path tracing */
  targetStatuses: string[]
  /** Optional source status filter */
  sourceFilter?: OrderSubcategory[]
  /** Color for highlighting */
  highlightColor: string
}

// =============================================================================
// COLUMN CONFIGURATION
// =============================================================================

export interface ColumnConfig {
  index: number
  subcategory: OrderSubcategory
  label: string
  color: BadgeColor
  x: number
  width: number
}

// =============================================================================
// LAYOUT TYPES
// =============================================================================

export interface LayoutConfig {
  /** Total canvas width */
  canvasWidth: number
  /** Canvas height */
  canvasHeight: number
  /** Node width */
  nodeWidth: number
  /** Node height */
  nodeHeight: number
  /** Vertical gap between nodes */
  nodeGap: number
  /** Horizontal gap between columns */
  columnGap: number
  /** Padding around canvas */
  padding: number
}
