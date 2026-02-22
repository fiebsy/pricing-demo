/**
 * Status Icon Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/status-icon
 */

// ============================================================================
// Fill Types
// ============================================================================

export interface PieFillConfig {
  type: 'pie'
  /** Fill percentage (0-100) */
  percentage: number
  /** Fill color (semantic token) */
  color: string
}

export interface SolidFillConfig {
  type: 'solid'
  /** Fill color (semantic token) */
  color: string
}

export interface FullFillConfig {
  type: 'full'
  /** Fill color (semantic token) */
  color: string
}

export interface NoneFillConfig {
  type: 'none'
}

export type FillConfig = PieFillConfig | SolidFillConfig | FullFillConfig | NoneFillConfig

// ============================================================================
// Icon Overlay Configuration
// ============================================================================

export interface IconConfig {
  /** Show icon overlay */
  show: boolean
  /** Icon name from Hugeicons */
  iconName: string
  /** Icon variant (stroke, bulk, solid) */
  variant: 'stroke' | 'bulk' | 'solid'
  /** Icon color (semantic token) */
  color: string
  /** Icon size in pixels */
  size: number
  /** Icon stroke width (only applies to stroke variant) */
  strokeWidth: number
}

// ============================================================================
// Stroke Configuration
// ============================================================================

export interface StrokeConfig {
  /** Stroke width in pixels */
  width: number
  /** Stroke color (semantic token) */
  color: string
  /** Whether stroke is dashed */
  dashed: boolean
  /** SVG dash array pattern (e.g., '4 2') or 'custom' for custom values */
  dashArray: string
  /** Line cap style */
  lineCap: 'round' | 'square' | 'butt'
  /** Custom dash length (when dashArray is 'custom') */
  customDash?: number
  /** Custom gap length (when dashArray is 'custom') */
  customGap?: number
}

// ============================================================================
// Text Configuration
// ============================================================================

export interface TextConfig {
  /** Show companion text */
  show: boolean
  /** Text content */
  content: string
  /** Text size */
  size: 'xs' | 'sm' | 'md'
  /** Font weight */
  weight: '400' | '500' | '600' | '700'
  /** Text color (semantic token) */
  color: string
  /** Text position relative to icon */
  position: 'left' | 'right'
  /** Gap between icon and text in pixels */
  gap: number
}

// ============================================================================
// Size Configuration
// ============================================================================

export interface SizeConfig {
  /** Diameter in pixels */
  diameter: number
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface StatusIconConfig {
  size: SizeConfig
  stroke: StrokeConfig
  fill: FillConfig
  icon: IconConfig
  text: TextConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export type OrderStatus =
  | 'healthy'
  | 'at-risk-low'
  | 'at-risk-medium'
  | 'at-risk-high'
  | 'completed'
  | 'clawback'
  | 'declined'
  | 'canceled'
  | 'defaulted'
  | 'chargeback'
  | 'refunded'

export interface StatusIconPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'active' | 'closed'
  data: StatusIconConfig
}
