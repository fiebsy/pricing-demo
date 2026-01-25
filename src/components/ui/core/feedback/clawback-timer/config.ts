/**
 * ClawbackTimer Configuration
 *
 * Size presets and color configuration for the clawback timer component.
 */

import type { ClawbackTimerSize, ClawbackTimerSizeConfig, ClawbackTimerColorState } from './types'

// -----------------------------------------------------------------------------
// Size Presets
// -----------------------------------------------------------------------------

/** Size configuration for each preset (xs, sm, md, lg, xl) */
export const SIZE_CONFIGS: Record<ClawbackTimerSize, ClawbackTimerSizeConfig> = {
  // XS - 16px container
  '16': {
    containerSize: 16,
    bodyWidth: 11,
    bodyHeight: 7,
    borderRadius: 2,
    terminalWidth: 2,
    terminalHeight: 3,
    terminalRadius: 1,
    terminalGap: 0,
    fillInset: 1,
    labelSize: 'text-[10px]',
    labelGap: 3,
  },
  // SM - 24px container
  '24': {
    containerSize: 24,
    bodyWidth: 18,
    bodyHeight: 13,
    borderRadius: 4,
    terminalWidth: 2.5,
    terminalHeight: 4,
    terminalRadius: 1.5,
    terminalGap: 0,
    fillInset: 1.5,
    labelSize: 'text-xs',
    labelGap: 4,
  },
  // MD - 32px container (default)
  '32': {
    containerSize: 32,
    bodyWidth: 23,
    bodyHeight: 14,
    borderRadius: 5,
    terminalWidth: 2.5,
    terminalHeight: 5,
    terminalRadius: 3,
    terminalGap: 0,
    fillInset: 2,
    labelSize: 'text-sm',
    labelGap: 2,
  },
  // LG - 40px container
  '40': {
    containerSize: 40,
    bodyWidth: 32,
    bodyHeight: 19,
    borderRadius: 7.5,
    terminalWidth: 4,
    terminalHeight: 8,
    terminalRadius: 2.5,
    terminalGap: 0,
    fillInset: 2,
    labelSize: 'text-sm',
    labelGap: 8,
  },
  // XL - 64px container
  '64': {
    containerSize: 64,
    bodyWidth: 48,
    bodyHeight: 26,
    borderRadius: 9.5,
    terminalWidth: 5,
    terminalHeight: 9,
    terminalRadius: 5,
    terminalGap: 0,
    fillInset: 2.5,
    labelSize: 'text-base',
    labelGap: 10,
  },
}

// -----------------------------------------------------------------------------
// Color Configuration
// -----------------------------------------------------------------------------

/** Thresholds for color state determination */
export const COLOR_THRESHOLDS = {
  critical: 33,
  healthy: 66,
} as const

/** Fill colors using semantic CSS custom properties */
export const FILL_COLORS: Record<ClawbackTimerColorState, string> = {
  error: 'var(--color-utility-error-500)',
  warning: 'var(--color-utility-warning-500)',
  success: 'var(--color-utility-warning-500)',
}

/** Border colors using semantic CSS custom properties */
export const BORDER_COLORS: Record<ClawbackTimerColorState, string> = {
  error: 'var(--color-utility-error-300)',
  warning: 'var(--color-utility-gray-300)',
  success: 'var(--color-utility-gray-300)',
}

/** Label text color classes */
export const LABEL_CLASSES: Record<ClawbackTimerColorState, string> = {
  error: 'text-error-primary',
  warning: 'text-tertiary',
  success: 'text-tertiary',
}

// -----------------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------------

/** Default threshold in days for 100% battery charge */
export const DEFAULT_THRESHOLD_DAYS = 15

/** Default size preset */
export const DEFAULT_SIZE: ClawbackTimerSize = '32'
