/**
 * Orders Page - Type Definitions
 *
 * Consolidated types for the orders page including:
 * - OrderRecord and related order types
 * - OrdersPageConfig (page-level configuration)
 * - SummaryCardData and SummaryCardConfig
 * - Column visibility and shared enums
 */

// =============================================================================
// PAGE BACKGROUND & LAYOUT
// =============================================================================

export type PageBackground = 'primary' | 'secondary' | 'secondary_alt' | 'tertiary'

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================

export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand-primary' | 'brand-secondary'
export type BackgroundColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand-primary' | 'transparent'
export type BorderColor = 'primary' | 'secondary' | 'tertiary' | 'brand'
export type FontWeight = '300' | '400' | '500' | '600' | '700'
export type FontSize = '2xs' | 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

// =============================================================================
// STYLE EFFECT TYPES
// =============================================================================

export type StackOrder = 'value-first' | 'subtext1-first' | 'subtext2-first'
export type ShineType = 'none' | '1' | '2' | '3' | 'brand'
export type ShineIntensity = 'subtle' | 'normal' | 'intense'
export type ShadowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg'

// =============================================================================
// BADGE TYPES
// =============================================================================

export type BadgeColor = 'gray' | 'brand' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'
export type BadgeShape = 'pill' | 'rounded' | 'squircle'
export type BadgeStyle = 'default' | 'modern'

// =============================================================================
// ORDER RECORD TYPES
// =============================================================================

/** Level 1: active or closed */
export type OrderCategory = 'active' | 'closed'

/** Level 2 for active: healthy, at-risk */
export type ActiveStatus = 'healthy' | 'at-risk'

/** Level 2 for closed: completed, clawbacks, declined */
export type ClosedStatus = 'completed' | 'clawbacks' | 'declined'

/** Level 3 for at-risk: risk-low, risk-medium, risk-high */
export type RiskLevel = 'risk-low' | 'risk-medium' | 'risk-high'

/** Level 3 for clawbacks: clawback-default, clawback-chargeback, clawback-canceled */
export type ClawbackType = 'clawback-default' | 'clawback-chargeback' | 'clawback-canceled'

export interface OrderRecord {
  id: string
  customer: string
  order: string
  route: 'AutoRoute' | 'Off'
  plan: 'PAC' | 'Upfront'
  /** Hierarchical category: active | closed */
  category: OrderCategory
  /** Status within category: healthy | at-risk | completed | clawbacks | declined */
  status: string
  /** Sub-status for deeper levels: risk-low/medium/high | clawback types | null */
  substatus: string | null
  /** Display text for Type column */
  type: string
  /** Display text for Status column */
  displayStatus: string
}

// =============================================================================
// COLUMN VISIBILITY & ORDER
// =============================================================================

export interface ColumnVisibility {
  customer: boolean
  order: boolean
  route: boolean
  plan: boolean
  type: boolean
  status: boolean
}

export type ColumnKey = 'customer' | 'order' | 'route' | 'plan' | 'type' | 'status'

export const DEFAULT_COLUMN_ORDER: ColumnKey[] = ['order', 'customer', 'route', 'plan', 'type', 'status']

// =============================================================================
// SUMMARY CARD TYPES
// =============================================================================

export interface SummaryCardData {
  value: string
  subtext1: string
  subtext2: string
}

export interface SummaryCardConfig {
  // Container Sizing
  containerWidth: number
  containerHeight: number

  // Padding
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number

  // Stack Order
  stackOrder: StackOrder

  // Value Text
  valueFontWeight: FontWeight
  valueFontSize: FontSize
  valueColor: TextColor
  valueOpacity: number

  // Subtext 1
  subtext1FontWeight: FontWeight
  subtext1FontSize: FontSize
  subtext1Color: TextColor
  subtext1Opacity: number

  // Subtext 2
  subtext2FontWeight: FontWeight
  subtext2FontSize: FontSize
  subtext2Color: TextColor
  subtext2Opacity: number

  // Subtext 2 Badge
  subtext2ShowBadge: boolean
  subtext2BadgeColor: BadgeColor
  subtext2BadgeSize: BadgeSize
  subtext2BadgeShape: BadgeShape
  subtext2BadgeStyle: BadgeStyle
  subtext2BadgeBorder: boolean

  // Text Gaps
  valueToSubtext1Gap: number
  subtext1ToSubtext2Gap: number

  // Background
  backgroundColor: BackgroundColor
  backgroundOpacity: number

  // Border
  showBorder: boolean
  borderColor: BorderColor
  borderWidth: number
  borderOpacity: number

  // Corner Shape
  borderRadius: number
  cornerSquircle: boolean

  // Shine Effect
  shineType: ShineType
  shineIntensity: ShineIntensity
  shineShadow: ShadowSize

  // Shady Container (optional inner layer)
  showShadyContainer: boolean
  shadyPadding: number
  shadyBackground: BackgroundColor
  shadyOpacity: number
  shadyRadius: number
  shadyShine: ShineType
  shadyShineIntensity: ShineIntensity
}

// =============================================================================
// TABLE BORDER CONFIG
// =============================================================================

export interface TableBorderConfig {
  showOuterBorder: boolean
  showHeaderRowBorder: boolean
  showRowBorders: boolean
  showCellBorders: boolean
  outerBorderColor: BorderColor
  headerRowBorderColor: BorderColor
  rowBorderColor: BorderColor
  cellBorderColor: BorderColor
  tableBorderRadius: number
}

// =============================================================================
// ORDERS PAGE CONFIG (Full page configuration)
// =============================================================================

export interface OrdersPageConfig extends SummaryCardConfig {
  // Page
  pageBackground: PageBackground

  // Layout Gaps
  layoutTopGap: number
  metricsToTableGap: number

  // Column Visibility
  columnVisibility: ColumnVisibility

  // Column Reorder
  enableColumnReorder: boolean

  // Table Borders
  tableBorder: TableBorderConfig
}

// =============================================================================
// PRESET TYPE
// =============================================================================

export type PresetId = 'default' | 'minimal' | 'elevated' | 'brand'
