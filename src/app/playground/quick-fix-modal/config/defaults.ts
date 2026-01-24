/**
 * Quick Fix Modal - Default Configuration
 *
 * Default values for the modal flow framework.
 *
 * @module playground/quick-fix-modal/config
 */

import { DEFAULT_QUICK_FIX_CONFIG } from '../../quick-fix-interactions/config/presets'
import type { QuickFixModalConfig, ModalConfig, StackConfig, AnimationConfig } from './types'

// =============================================================================
// MODAL DEFAULTS
// =============================================================================

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  // Sizing
  maxWidth: 480,
  maxHeight: 720,
  borderRadius: 24,
  padding: 24,

  // Background & effects
  background: 'primary',
  shine: 'shine-2',
  shineIntensity: '-subtle',
  cornerShape: 'squircle',
  goldBorder: false,

  // Backdrop
  backdropOpacity: 60,
  backdropBlur: 8,
}

// =============================================================================
// STACK DEFAULTS
// =============================================================================

export const DEFAULT_STACK_CONFIG: StackConfig = {
  // Depth appearance
  depthScale: 0.96, // Each sheet 4% smaller
  depthOffset: -16, // -16px vertical offset
  depthOpacity: 0.6, // 60% opacity for stacked sheets
  maxVisibleSheets: 3,

  // Stack animation
  pushDirection: 'up',
  popDirection: 'down',
}

// =============================================================================
// ANIMATION DEFAULTS
// =============================================================================

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  // Clip-path reveal
  clipRevealDuration: 300,
  clipRevealDelay: 0,

  // Sheet transitions
  sheetTransition: 350,
  pushDuration: 350,
  popDuration: 300,

  // Timing
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Expo out
  staggerDelay: 50,
}

// =============================================================================
// COMBINED MODAL CONFIG
// =============================================================================

export const DEFAULT_QUICK_FIX_MODAL_CONFIG: QuickFixModalConfig = {
  // Inherit all base config
  ...DEFAULT_QUICK_FIX_CONFIG,

  // Modal-specific config
  modal: DEFAULT_MODAL_CONFIG,
  stack: DEFAULT_STACK_CONFIG,
  animation: DEFAULT_ANIMATION_CONFIG,

  // Override preview mode for modal context
  previewMode: 'full-flow',
  modalPreviewMode: 'full-flow',
}

// =============================================================================
// ANIMATION CONSTANTS
// =============================================================================

/**
 * Expo out easing - matches design system standard
 */
export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Standard easing - for subtle transitions
 */
export const EASING_STANDARD = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

/**
 * Snappy easing - for quick feedback
 */
export const EASING_SNAPPY = 'cubic-bezier(0.2, 0, 0, 1)'

// =============================================================================
// TIMING PRESETS
// =============================================================================

export const TIMING = {
  fast: 150,
  base: 300,
  slow: 500,
  sheet: 350,
} as const
