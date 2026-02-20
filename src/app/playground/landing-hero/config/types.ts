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
export type MediaType = 'image' | 'video'
export type HeroSize = 'current' | 'M' | 'L'
export type ShineType = 'none' | 'shine-0' | 'shine-1' | 'shine-2' | 'shine-3' | 'shine-brand'
export type ShineIntensity = '' | '-extra-subtle' | '-subtle' | '-intense'

export interface ShineLayer {
  type: ShineType
  intensity: ShineIntensity
}
export type ShadowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type CornerStyle = 'round' | 'squircle'
export type BackdropBlur = 'none' | 'sm' | 'md' | 'lg'
export type GlowColor = 'brand-solid' | 'brand' | 'success' | 'warning' | 'error' | 'info' | 'gray'
export type GlowPosition = 'center' | 'asset'
export type GlowShape = 'circle' | 'blob' | 'blob-2' | 'blob-3'
export type SquircleLevel = 'none' | 'subtle' | 'moderate' | 'rounded' | 'pill' | 'pill-xl' | 'ios'
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

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
  /** Show glow effect */
  showGlow: boolean
  /** Glow color (semantic) */
  glowColor: GlowColor
  /** Glow size in pixels */
  glowSize: number
  /** Glow opacity (0-0.5) */
  glowOpacity: number
  /** Glow spread - where gradient fades to transparent (30-100%) */
  glowSpread: number
  /** Glow shape */
  glowShape: GlowShape
  /** Glow position: center of page or behind asset */
  glowPosition: GlowPosition
  /** Glow blur amount in pixels */
  glowBlur: number
  /** Show secondary blob */
  showSecondaryBlob: boolean
  /** Secondary blob color */
  secondaryBlobColor: GlowColor
  /** Secondary blob size in pixels */
  secondaryBlobSize: number
  /** Secondary blob opacity */
  secondaryBlobOpacity: number
  /** Secondary blob spread (where gradient fades) */
  secondaryBlobSpread: number
  /** Secondary blob blur amount in pixels */
  secondaryBlobBlur: number
  /** Secondary blob X offset from center */
  secondaryBlobOffsetX: number
  /** Secondary blob Y offset from center */
  secondaryBlobOffsetY: number
}

// ============================================================================
// Image Configuration
// ============================================================================

export interface ImageConfig {
  /** Media type: image or video */
  mediaType: MediaType
  /** Size variant (scales asset, text, glow, spacing) */
  size: HeroSize
  /** Shine layers (multiple can be stacked) */
  shines: ShineLayer[]
  /** Shadow size */
  shadow: ShadowSize
  /** Corner style */
  outerCorner: CornerStyle
  /** Outer border radius in pixels */
  outerBorderRadius: number
  /** Inner border radius in pixels */
  innerBorderRadius: number
  /** Squircle level preset */
  squircleLevel: SquircleLevel
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
// Text Configuration
// ============================================================================

export interface TextConfig {
  /** Custom text size (overrides size preset) */
  size: TextSize
  /** Enable press animation on text */
  animateOnPress: boolean
  /** Horizontal scale on press (0.8-1.2, <1 = squish, >1 = stretch) */
  pressScaleX: number
  /** Vertical scale on press (0.8-1.2, <1 = squish, >1 = stretch) */
  pressScaleY: number
  /** Y offset on press (pull toward asset, 0-10px) */
  pressOffsetY: number
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface LandingHeroConfig {
  background: BackgroundConfig
  image: ImageConfig
  interaction: InteractionConfig
  text: TextConfig
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
