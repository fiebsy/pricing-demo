/**
 * MetricCard Types
 *
 * Type definitions for the MetricCard component system.
 *
 * @module metric-card/types
 */

// =============================================================================
// PRIMITIVE TYPES
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

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand-primary'
  | 'brand-secondary'

export type FontFamily = 'text' | 'display'
export type FontWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
export type IconSize = 10 | 12 | 14 | 16 | 18 | 20 | 24

export type HoverAnimation = 'none' | 'lift' | 'glow' | 'fade'
export type TrendAlignment = 'baseline' | 'center'
export type SectionType = 'label' | 'value' | 'count'
export type TrendDirection = 'up' | 'down' | 'neutral'

// =============================================================================
// STYLE INTERFACES
// =============================================================================

/** Style configuration for a card layer (outer or inner) */
export interface LayerStyle {
  background: BackgroundColor
  shine: ShineType
  shineIntensity: ShineIntensity
  shineShadow: ShineShadow
  depth: DepthIntensity
  depthColor: DepthColor
  depthDirection: DepthDirection
  /** Opacity of the layer (0-100) */
  opacity: number
}

/** Text section configuration */
export interface SectionStyle {
  color: TextColor
  fontFamily: FontFamily
  fontSize: FontSize
  fontWeight: FontWeight
  /** Opacity (0-100), defaults to 100 */
  opacity?: number
}

/** Trend/percent change indicator styling */
export interface TrendStyle {
  fontSize: FontSize
  fontWeight: FontWeight
  iconSize: IconSize
  /** If true, use directional colors (green for up, red for down). If false, use specified color */
  useDirectionalColors: boolean
  /** Color to use when useDirectionalColors is false */
  color: TextColor
  /** Vertical alignment with value text */
  alignment?: TrendAlignment
}

/** Trend/percent change indicator data */
export interface TrendIndicator {
  value: number
  direction: TrendDirection
  showIcon?: boolean
}

/** Value formatting options */
export interface ValueFormatConfig {
  /** Enable compact notation (k, M, B suffixes) */
  compact: boolean
  /** Maximum digits to display (decimals fill remaining space) */
  maxDigits: number
  /** Opacity for prefix like $ (0-100) */
  prefixOpacity: number
  /** Opacity for suffix like k, M, B (0-100) */
  suffixOpacity: number
}

// =============================================================================
// CONFIGURATION INTERFACE
// =============================================================================

/** Configuration for the metric card */
export interface MetricCardConfig {
  // Layout
  sectionOrder: [SectionType, SectionType, SectionType]
  gap: number // px between sections (used if individual gaps not set)
  gap1?: number // px gap after first section (overrides gap)
  gap2?: number // px gap after second section (overrides gap)
  minWidth: number // px minimum width

  // Value formatting
  valueFormat?: ValueFormatConfig

  // Layer styles
  outer: LayerStyle
  inner: LayerStyle
  outerPadding: number
  innerPadding: number
  borderRadius: number

  // Section styles
  labelStyle: SectionStyle
  labelSuffixStyle?: Partial<SectionStyle>
  valueStyle: SectionStyle
  countStyle: SectionStyle
  trendStyle: TrendStyle

  // Animation
  hoverAnimation: HoverAnimation
  transitionDuration: number // ms

  // Hover state overrides (applied on hover)
  hoverOuter?: Partial<LayerStyle>
  hoverInner?: Partial<LayerStyle>

  // Active state overrides (applied when isActive=true)
  activeOuter?: Partial<LayerStyle>
  activeInner?: Partial<LayerStyle>

  // Active text style overrides
  activeValueStyle?: Partial<SectionStyle>
  activeLabelStyle?: Partial<SectionStyle>
  activeCountStyle?: Partial<SectionStyle>
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface MetricCardProps {
  /** Label text (e.g., "Total At Risk") */
  label: string
  /** Optional suffix label shown next to main label */
  labelSuffix?: string
  /** Main value (e.g., "$125,000") - can be string or ReactNode for animated values */
  value: string | React.ReactNode
  /** Count/subtitle (e.g., "24 orders") */
  count: string
  /** Optional trend indicator shown next to value */
  trend?: TrendIndicator
  /** Whether card is in hovered state (for controlled hover) */
  isHovered?: boolean
  /** Whether card is in active/selected state */
  isActive?: boolean
  /** Whether card is non-interactive (disables cursor pointer and focus ring) */
  nonInteractive?: boolean
  /** Card configuration */
  config: MetricCardConfig
  /** Additional className */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Mouse enter handler */
  onMouseEnter?: () => void
  /** Mouse leave handler */
  onMouseLeave?: () => void
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/** Result of formatting a value - split into parts for styling */
export interface FormattedValueParts {
  prefix: string // e.g., "$"
  number: string // e.g., "45.2"
  suffix: string // e.g., "k"
}
