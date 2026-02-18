/**
 * Landing Hero Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/landing-hero
 */

// ============================================================================
// Pattern Types
// ============================================================================

export type PatternType = 'dots' | 'grid' | 'diagonal' | 'none'
export type ShineType = 'none' | 'shine-0' | 'shine-1' | 'shine-2' | 'shine-3' | 'shine-brand'
export type ShineIntensity = '' | '-subtle' | '-intense'
export type ShadowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type CornerStyle = 'round' | 'squircle'
export type BackdropBlur = 'none' | 'sm' | 'md' | 'lg'
export type BlurCircleColor = 'brand-solid' | 'brand' | 'success' | 'warning' | 'error' | 'info'
export type BlurCirclePosition = 'center' | 'asset'

// ============================================================================
// Background Configuration
// ============================================================================

export interface BackgroundConfig {
  /** Show SVG pattern overlay */
  showPattern: boolean
  /** Pattern type */
  patternType: PatternType
  /** Pattern opacity (0-0.2) */
  patternOpacity: number
  /** Show blur circle in center */
  showBlurCircle: boolean
  /** Blur circle color (semantic) */
  blurCircleColor: BlurCircleColor
  /** Blur circle size in pixels */
  blurCircleSize: number
  /** Blur circle opacity (0-1) */
  blurCircleOpacity: number
  /** Blur amount in pixels */
  blurAmount: number
  /** Blur circle position: center of page or behind asset */
  blurCirclePosition: BlurCirclePosition
}

// ============================================================================
// Image Configuration
// ============================================================================

export interface ImageConfig {
  /** Shine effect type */
  shine: ShineType
  /** Shine intensity modifier */
  shineIntensity: ShineIntensity
  /** Shadow size */
  shadow: ShadowSize
  /** Corner style */
  outerCorner: CornerStyle
  /** Outer border radius in pixels */
  outerBorderRadius: number
  /** Inner border radius in pixels */
  innerBorderRadius: number
  /** Padding in pixels */
  padding: number
  /** Backdrop blur effect */
  backdropBlur: BackdropBlur
}

// ============================================================================
// Interaction Configuration
// ============================================================================

export interface InteractionConfig {
  /** Scale factor on click (0.8-1) */
  scaleOnClick: number
  /** Use intense shine on hover */
  hoverShineIntense: boolean
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface LandingHeroConfig {
  background: BackgroundConfig
  image: ImageConfig
  interaction: InteractionConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface LandingHeroPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'dramatic' | 'brand' | 'clean'
  data: LandingHeroConfig
}
