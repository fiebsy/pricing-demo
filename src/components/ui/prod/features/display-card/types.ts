import type { ReactNode } from 'react'

/**
 * DisplayCard Type Definitions
 *
 * A double-layer card component with shine effects and subtle depth.
 * Fixed 16px border radius for consistent visual identity.
 */

// =============================================================================
// STYLE OPTIONS
// =============================================================================

export type ShineType = 'none' | '0' | '1' | '2' | '3' | 'brand'
export type ShineIntensity = 'subtle' | 'normal' | 'intense'
export type ShineShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg'
export type DepthIntensity = 'none' | '10' | '20' | '30' | '40' | '50'
export type DepthColor = 'primary' | 'brand' | 'secondary'
export type DepthDirection = 'bottom' | 'left' | 'right' | 'top'
export type BackgroundColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand-primary'
  | 'brand-secondary'

// =============================================================================
// VARIANT CONFIGURATION
// =============================================================================

/** Style configuration for outer or inner card layer */
export interface LayerStyle {
  background: BackgroundColor
  shine: ShineType
  shineIntensity: ShineIntensity
  shineShadow: ShineShadow
  depth: DepthIntensity
  depthColor: DepthColor
  depthDirection: DepthDirection
}

/** Complete variant configuration */
export interface DisplayCardVariant {
  id: string
  name: string
  outer: LayerStyle
  inner: LayerStyle
  /** Outer padding (creates the "border" effect) */
  padding: number
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface DisplayCardProps {
  /** Pre-configured variant */
  variant?: string
  /** Card width - number (px), 'auto', or 'full' */
  width?: number | 'auto' | 'full'
  /** Override outer layer styles */
  outerStyle?: Partial<LayerStyle>
  /** Override inner layer styles */
  innerStyle?: Partial<LayerStyle>
  /** Override outer padding */
  padding?: number
  /** Additional className for outer card */
  className?: string
  children: ReactNode
}

export interface DisplayCardHeaderProps {
  /** Additional className */
  className?: string
  children: ReactNode
}

export interface DisplayCardContentProps {
  /** Additional className */
  className?: string
  /** Content padding override */
  padding?: number
  children: ReactNode
}

// =============================================================================
// METRIC COMPONENT PROPS
// =============================================================================

export interface TrendIndicator {
  value: number
  direction: 'up' | 'down' | 'neutral'
}

export type MetricSize = 'sm' | 'md' | 'lg'
export type MetricFormat = 'currency' | 'number' | 'percent' | 'none'
export type LabelPosition = 'above' | 'below'

export interface DisplayCardMetricProps {
  /** The main metric value */
  value: string | number
  /** Optional label above/below the value */
  label?: string
  /** Label position */
  labelPosition?: LabelPosition
  /** Trend indicator */
  trend?: TrendIndicator
  /** Format for the value */
  format?: MetricFormat
  /** Size variant */
  size?: MetricSize
  /** Additional className */
  className?: string
}

export interface DisplayCardStatProps {
  /** Stat label */
  label: string
  /** Stat value */
  value: string | number
  /** Value format */
  format?: MetricFormat
  /** Additional className */
  className?: string
}
