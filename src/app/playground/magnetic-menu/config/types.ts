/**
 * Magnetic Menu Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/menu
 * @package motion-plus
 */

// ============================================================================
// Pull Mode & Direction
// ============================================================================

export type PullMode = 'none' | 'text' | 'background' | 'both'

export type PullDirection = 'both' | 'horizontal' | 'vertical'

// ============================================================================
// Animation Configuration
// ============================================================================

export interface PullAnimationConfig {
  /** Spring stiffness - higher = snappier response (50-500) */
  stiffness: number
  /** Spring damping - higher = less oscillation (5-50) */
  damping: number
  /** Spring mass - higher = more momentum/inertia (0.5-3) */
  mass: number
  /** Delay before pull starts responding (0-200ms) */
  delay: number
}

// ============================================================================
// Hover Indicator Mode
// ============================================================================

export type HoverIndicatorMode = 'per-item' | 'unified'

// ============================================================================
// Unified Hover Indicator Configuration
// ============================================================================

export interface UnifiedHoverConfig {
  /** Spring stiffness - higher = snappier response (100-600) */
  stiffness: number
  /** Spring damping - higher = less oscillation (10-50) */
  damping: number
  /** Spring mass - higher = more momentum/inertia (0.5-2) */
  mass: number
}

// ============================================================================
// Hover Configuration
// ============================================================================

export interface HoverConfig {
  /** Background color (semantic token value) */
  background: string
  /** Background opacity (0.5 - 1.0) */
  backgroundOpacity: number
  /** Border radius in pixels */
  borderRadius: number
}

// ============================================================================
// Hover Indicator Configuration
// ============================================================================

export interface HoverIndicatorConfig {
  /** Mode: per-item (default CSS hover) or unified (animated indicator) */
  mode: HoverIndicatorMode
  /** Unified indicator spring settings */
  unified: UnifiedHoverConfig
}

// ============================================================================
// Background Decoration Configuration
// ============================================================================

export interface BackgroundConfig {
  /** Show blurred circle behind menu */
  showBlurCircle: boolean
  /** Blur circle color (semantic token) */
  blurCircleColor: string
  /** Blur circle opacity (0-1) */
  blurCircleOpacity: number
  /** Blur circle size in pixels */
  blurCircleSize: number
  /** Blur amount in pixels */
  blurAmount: number
  /** Show SVG pattern overlay */
  showPattern: boolean
  /** Pattern type */
  patternType: 'dots' | 'grid' | 'diagonal' | 'none'
  /** Pattern opacity (0-1) */
  patternOpacity: number
}

// ============================================================================
// Shadow Configuration
// ============================================================================

export type ShadowIntensity = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface ShadowConfig {
  /** Shadow intensity */
  intensity: ShadowIntensity
}

// ============================================================================
// Icon Configuration
// ============================================================================

export interface IconConfig {
  /** Show icons */
  show: boolean
  /** Icon size in pixels */
  size: number
  /** Icon opacity (0-1) */
  opacity: number
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface MagneticMenuConfig {
  /** Pull mode: none, text, background, or both */
  pullMode: PullMode
  /** Pull strength (0.005 - 0.3, i.e. 0.5% - 30%) */
  pullStrength: number
  /** Pull direction constraint */
  pullDirection: PullDirection
  /** Clamp pull to stay within parent container */
  clampToParent: boolean
  /** Animation spring settings */
  animation: PullAnimationConfig
  /** Hover styling */
  hover: HoverConfig
  /** Hover indicator configuration */
  hoverIndicator: HoverIndicatorConfig
  /** Background decoration */
  background: BackgroundConfig
  /** Shadow settings */
  shadow: ShadowConfig
  /** Icon settings */
  icons: IconConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface MagneticMenuPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'subtle' | 'interactive' | 'custom'
  data: MagneticMenuConfig
}
