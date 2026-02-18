/**
 * Menu - Default Configuration Values
 *
 * Default values for appearance, animation, features, and dimensions.
 * Centralized here for easy adjustment and consistency.
 *
 * @module prod/base/menu/config/defaults
 */

import type {
  MenuAppearance,
  AnimationConfig,
  MenuFeatures,
} from '../types'

// ============================================================================
// Z-Index Scale
// ============================================================================

/**
 * Z-index values for menu layering.
 * Centralized here for easy adjustment of stacking contexts.
 */
export const Z_INDEX = {
  /** Menu positioner layer */
  MENU_POSITIONER: 9999,
  /** Menu popup layer */
  MENU_POPUP: 9999,
} as const

// ============================================================================
// Animation Timing Constants
// ============================================================================

/**
 * Named timing constants for animation orchestration.
 * Replaces magic numbers with documented values.
 */
export const ANIMATION_TIMING = {
  /** Delay before resetting state after menu closes (ms) */
  RESET_DELAY_MS: 200,
} as const

// ============================================================================
// Defaults
// ============================================================================

/**
 * Default animation configuration.
 *
 * Uses spring physics for panel transitions:
 * - Spring preset: 'default' (stiffness: 650, damping: 38, mass: 0.9)
 */
export const DEFAULT_ANIMATION: Required<AnimationConfig> = {
  // Spring settings
  springPreset: 'default',
  springStiffness: 650,
  springDamping: 38,
  springMass: 0.9,

  // Options
  animateHeight: true,

  // Reveal animation
  revealDuration: 200,
  revealScale: 0.4,
  revealSlideRatio: 0.5,
  animateOnClose: true,
}

/**
 * Default feature toggles.
 */
export const DEFAULT_FEATURES: Required<MenuFeatures> = {
  submenu: true,
  animateHeight: true,
  revealAnimation: true,
  unifiedHover: false,
}

/**
 * Default unified hover configuration.
 * Snappy, responsive spring for smooth indicator gliding.
 */
export const DEFAULT_UNIFIED_HOVER = {
  enabled: false,
  stiffness: 550,
  damping: 34,
  mass: 0.8,
  background: 'tertiary',
  borderRadius: 12,
} as const

/** Default appearance configuration (hardened from menu-variants playground) */
export const DEFAULT_APPEARANCE: Required<MenuAppearance> = {
  borderRadius: '2xl',
  shadow: '2xl',
  shine: 'shine-2-subtle',
  background: 'primary',
  gradient: 'subtle-depth-md',
  gradientColor: 'tertiary',
  squircle: true,
}

/** Default menu dimensions */
export const DEFAULT_MENU_WIDTH = 240
export const DEFAULT_SIDE_OFFSET = 6
