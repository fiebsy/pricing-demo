/**
 * Skwircle Types
 *
 * Unified type system for a production-ready squircle primitive.
 * Combines the best of legacy Squircle (rendering) and SquircleV2 (API).
 */

import type * as React from 'react'

// =============================================================================
// VARIANT SYSTEM
// =============================================================================

/**
 * Semantic variants that auto-configure the skwircle for common use cases.
 */
export type SkwircleVariant =
  | 'base' // Base squircle with no presets
  | 'card' // Cards, containers, panels
  | 'button' // Buttons, clickable elements
  | 'input' // Form inputs, text areas
  | 'badge' // Labels, tags, status indicators
  | 'avatar' // Profile images, user icons

/**
 * Intent determines the visual emphasis and semantic colors.
 */
export type SkwircleIntent =
  | 'default' // Neutral styling
  | 'primary' // Brand emphasis (solid background)
  | 'secondary' // Subtle emphasis (border + light bg)
  | 'ghost' // Minimal styling (transparent bg)
  | 'error' // Destructive/error state
  | 'success' // Success/positive state
  | 'warning' // Warning/caution state

/**
 * Size presets for consistent sizing across variants.
 */
export type SkwircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Interactive state for inputs.
 */
export type SkwircleState = 'default' | 'hover' | 'focused' | 'disabled' | 'error'

// =============================================================================
// SHAPE SYSTEM
// =============================================================================

/**
 * Roundness presets - human-readable names.
 */
export type SkwircleRoundness =
  | 'none' // No rounding (sharp corners)
  | 'subtle' // Small radius (inputs, badges)
  | 'moderate' // Medium radius (cards)
  | 'rounded' // Large radius (buttons)
  | 'pill' // Maximum radius (full pill)

/**
 * Elevation presets - simplified shadow system.
 */
export type SkwircleElevation = 'none' | 'xs' | 'sm'

// =============================================================================
// GRADIENT SYSTEM
// =============================================================================

/**
 * Border gradient presets for shine-like effects.
 */
export type SkwircleBorderGradient =
  | 'none'
  | 'shine-corners' // Shine on diagonal corners
  | 'edge-glow' // Glow on edges
  | 'custom'

/**
 * Background gradient presets for depth effects.
 */
export type SkwircleBackgroundGradient =
  | 'none'
  // Legacy black depth (sm/md/lg)
  | 'depth-sm'
  | 'depth-md'
  | 'depth-lg'
  | `depth-${'sm' | 'md' | 'lg'}-${'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right'}`
  // Theme-adaptive depth (fg-primary) - numbered by max opacity %
  | `depth-${'3' | '5' | '8' | '10' | '12' | '15' | '20' | '25' | '30'}`
  | `depth-${'3' | '5' | '8' | '10' | '12' | '15' | '20' | '25' | '30'}-${'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right'}`
  | 'custom'

// =============================================================================
// MOUNT STRATEGY (FOUC Prevention)
// =============================================================================

/**
 * Mount strategy for preventing Flash of Unstyled Content.
 *
 * - 'auto': Smart detection (fade for uncertain layouts, immediate for stable)
 * - 'fade': Always fade in after measurement
 * - 'immediate': No fade, show immediately (use with initialDimensions for SSR)
 */
export type SkwircleMountStrategy = 'auto' | 'fade' | 'immediate'

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Internal roundness configuration.
 */
export interface RoundnessConfig {
  smoothing: number
  borderRadius: number
  pointsPerCorner: number
}

/**
 * Custom shadow configuration (escape hatch).
 */
export interface CustomShadowConfig {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  opacity: number
}

/**
 * Gradient configuration for custom gradients.
 */
export interface GradientConfig {
  type: 'linear' | 'radial' | 'conic' | 'corner-emphasis'
  colors: string[]
  stops?: number[]
  angle?: number
  opacity?: number
  opacities?: number[]
  startOpacity?: number
  middleOpacity?: number
  endOpacity?: number
}

/**
 * Variant default configuration.
 */
export interface VariantConfig {
  roundness: SkwircleRoundness
  borderWidth: number
  elevation: SkwircleElevation
  fillMode: boolean
  interactive: boolean
  ring?: boolean
  ringWidth?: number
  contentWrapperClassName?: string
}

/**
 * Intent color configuration.
 */
export interface IntentConfig {
  backgroundColor: string
  backgroundColorHover?: string
  borderColor: string
  borderColorHover?: string
  /** Override elevation for specific intents (e.g., ghost buttons have no shadow) */
  elevation?: SkwircleElevation
}

// =============================================================================
// MAIN PROPS INTERFACE
// =============================================================================

export interface SkwircleProps {
  // ─────────────────────────────────────────────────────────────────────────
  // CORE
  // ─────────────────────────────────────────────────────────────────────────

  /** Children content */
  children?: React.ReactNode

  /** Additional CSS classes */
  className?: string

  /** Inline styles */
  style?: React.CSSProperties

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANT SYSTEM
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Semantic variant that auto-configures roundness, border, and shadow.
   * @default 'base'
   */
  variant?: SkwircleVariant

  /**
   * Intent determines colors. Works with variant for full configuration.
   * @default 'default'
   */
  intent?: SkwircleIntent

  /**
   * Size preset. Interpretation depends on variant.
   * @default 'md'
   */
  size?: SkwircleSize

  /**
   * Input state for form elements. Only applies when variant="input".
   * @default 'default'
   */
  state?: SkwircleState

  // ─────────────────────────────────────────────────────────────────────────
  // SHAPE OVERRIDES
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Override the auto-calculated roundness.
   */
  roundness?: SkwircleRoundness

  /**
   * Override the auto-calculated elevation (shadow).
   */
  elevation?: SkwircleElevation

  // ─────────────────────────────────────────────────────────────────────────
  // BORDER
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Border width in pixels. Set to 0 to remove border.
   */
  borderWidth?: number

  /**
   * Border color (semantic token or CSS color).
   */
  borderColor?: string

  /**
   * Border color on hover.
   */
  borderColorHover?: string

  // ─────────────────────────────────────────────────────────────────────────
  // RING (Double Border)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Enable double border effect (ring).
   * @default false
   */
  ring?: boolean

  /**
   * Ring color (semantic token or CSS color).
   * @default 'border-brand'
   */
  ringColor?: string

  /**
   * Ring width in pixels.
   * @default 2
   */
  ringWidth?: number

  /**
   * Ring opacity (0-100).
   * @default 100
   */
  ringOpacity?: number

  // ─────────────────────────────────────────────────────────────────────────
  // BACKGROUND
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Background color (semantic token or CSS color).
   */
  backgroundColor?: string

  /**
   * Background color on hover.
   */
  backgroundColorHover?: string

  // ─────────────────────────────────────────────────────────────────────────
  // GRADIENTS (Advanced)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Border gradient preset for shine-like effects.
   * Requires borderWidth > 0 to be visible.
   * @default 'none'
   */
  borderGradient?: SkwircleBorderGradient

  /**
   * Custom border gradient config (when borderGradient='custom').
   */
  customBorderGradient?: GradientConfig

  /**
   * Background gradient preset for depth effects.
   * @default 'none'
   */
  backgroundGradient?: SkwircleBackgroundGradient

  /**
   * Custom background gradient config (when backgroundGradient='custom').
   */
  customBackgroundGradient?: GradientConfig

  /**
   * Color for the depth shadow overlay.
   * Use semantic tokens like 'utility-gray-600' for theme-aware shadows.
   */
  backgroundGradientOverlayColor?: string

  // ─────────────────────────────────────────────────────────────────────────
  // SHADOW (Escape Hatch)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Custom shadow configuration (overrides elevation preset).
   */
  customShadow?: CustomShadowConfig

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUT
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Overflow handling.
   * @default 'hidden'
   */
  overflow?: 'visible' | 'hidden' | 'clip'

  /**
   * Fill mode - content expands to fill container.
   * @default varies by variant
   */
  fillMode?: boolean

  /**
   * Content wrapper class name (for centering, padding, etc.).
   */
  contentWrapperClassName?: string

  /**
   * Content wrapper inline styles.
   */
  contentWrapperStyle?: React.CSSProperties

  // ─────────────────────────────────────────────────────────────────────────
  // MOUNT STRATEGY (FOUC Prevention)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Mount strategy for preventing Flash of Unstyled Content.
   * @default 'auto'
   */
  mountStrategy?: SkwircleMountStrategy

  /**
   * Initial dimensions for SSR or when mountStrategy='immediate'.
   * Provides estimated size to prevent flash.
   */
  initialDimensions?: { width: number; height: number }

  // ─────────────────────────────────────────────────────────────────────────
  // INTERACTIVITY
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Enable hover color transitions.
   * @default varies by variant (true for button, false for card)
   */
  interactive?: boolean

  // ─────────────────────────────────────────────────────────────────────────
  // ACCESSIBILITY & HTML ATTRIBUTES
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Disables the element (applies visual styling and prevents interaction).
   * @default false
   */
  disabled?: boolean

  /**
   * Tab index for keyboard navigation.
   * Button variants default to 0.
   */
  tabIndex?: number

  /**
   * ARIA role override. Button variants default to 'button'.
   */
  role?: string

  /**
   * ARIA label for accessibility.
   */
  'aria-label'?: string

  /**
   * ARIA labelledby for accessibility.
   */
  'aria-labelledby'?: string

  /**
   * ARIA describedby for accessibility.
   */
  'aria-describedby'?: string

  /**
   * ARIA disabled state.
   */
  'aria-disabled'?: boolean

  /**
   * ARIA pressed state for toggle buttons.
   */
  'aria-pressed'?: boolean | 'mixed'

  /**
   * ARIA expanded state for disclosure buttons.
   */
  'aria-expanded'?: boolean

  /**
   * Data attributes to pass through.
   */
  'data-testid'?: string

  // ─────────────────────────────────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────────────────────────────────

  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
  onDimensionsChange?: (width: number, height: number) => void
}

// =============================================================================
// COMPOUND COMPONENT PROPS
// =============================================================================

export type SkwircleCardProps = Omit<SkwircleProps, 'variant'>
export type SkwircleButtonProps = Omit<SkwircleProps, 'variant'>
export type SkwircleBadgeProps = Omit<SkwircleProps, 'variant'>
export type SkwircleInputProps = Omit<SkwircleProps, 'variant'>
export type SkwircleAvatarProps = Omit<SkwircleProps, 'variant'>

// =============================================================================
// COMPOUND COMPONENT TYPE
// =============================================================================

/**
 * Skwircle component with compound sub-components.
 */
export interface SkwircleComponent extends React.FC<SkwircleProps> {
  Card: React.FC<SkwircleCardProps>
  Button: React.FC<SkwircleButtonProps>
  Badge: React.FC<SkwircleBadgeProps>
  Input: React.FC<SkwircleInputProps>
  Avatar: React.FC<SkwircleAvatarProps>
}
