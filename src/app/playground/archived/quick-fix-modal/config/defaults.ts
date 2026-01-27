/**
 * Quick Fix Modal - Default Configuration
 *
 * Default values for the modal flow framework.
 *
 * @module playground/quick-fix-modal/config
 */

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
// BASE QUICK FIX CONFIG
// =============================================================================

const BASE_QUICK_FIX_CONFIG = {
  // Preview mode
  previewMode: 'full-flow' as const,
  modalPreviewMode: 'full-flow' as const,
  
  // Card configuration
  card: {
    width: 320,
    height: 400,
    borderRadius: 24,
    background: 'secondary' as const,
    shine: 'shine-1' as const,
    shineIntensity: '-subtle' as const,
    cornerShape: 'squircle' as const,
    textSize: 'text-base' as const,
    textWeight: 'font-medium' as const,
    textColor: 'primary' as const,
    stackOffset: 12,
    stackScale: 0.04,
    maxVisibleCards: 3,
  },
  
  // Swipe configuration
  swipe: {
    dragThreshold: 100,
    velocityThreshold: 0.5,
    rotationFactor: 0.05,
    scaleOnDrag: 1.05,
    animationDuration: 300,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  
  // Action buttons
  actionButtons: {
    size: 56,
    gap: 24,
    background: 'secondary' as const,
    shine: 'shine-1' as const,
    shineIntensity: '-subtle' as const,
    cornerShape: 'squircle' as const,
    borderRadius: 20,
    iconSize: 24,
    hoverScale: 1.1,
    pressScale: 0.95,
  },
  
  // Progress bar
  progress: {
    height: 4,
    width: 200,
    background: 'tertiary/20',
    fillColor: 'brand-primary',
    borderRadius: 2,
    animationDuration: 300,
  },
  
  // Flow options
  flowOptions: {
    cardGap: 16,
    cardBorderRadius: 16,
    cardBackground: 'secondary' as const,
    shine: 'shine-1' as const,
    shineIntensity: '-subtle' as const,
    cornerShape: 'squircle' as const,
    iconCircleSize: 56,
  },
  
  // Completion state
  completion: {
    bulletSpacing: 8,
    bulletSize: 'text-sm' as const,
    bulletColor: 'secondary' as const,
    buttonVariant: 'primary' as const,
    buttonSize: 'lg' as const,
    buttonRoundness: 'squircle' as const,
  },
  
  // Status island
  island: {
    showUpload: false,
    showScore: true,
    showConfidence: true,
    showNotifications: true,
    shine: 'shine-2' as const,
    shineIntensity: '-subtle' as const,
    cornerShape: 'squircle' as const,
    borderRadius: 32,
    padding: 16,
    gap: 12,
    wheelSize: 44,
    wheelStrokeWidth: 2.5,
    scoreSize: 'text-2xl' as const,
    scoreWeight: 'font-bold' as const,
  },
  
  // Toast configuration
  toast: {
    animationDuration: 250,
    animationDirection: 'right' as const,
    shine: 'shine-1' as const,
    shineIntensity: '-subtle' as const,
    cornerShape: 'squircle' as const,
  },
}

// =============================================================================
// COMBINED MODAL CONFIG
// =============================================================================

export const DEFAULT_QUICK_FIX_MODAL_CONFIG: QuickFixModalConfig = {
  // Inherit all base config
  ...BASE_QUICK_FIX_CONFIG,

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
