/**
 * FilterStatusBar Constants
 *
 * Hardcoded production defaults for the flip-corner filter status bar.
 */

import type { CornerRadius, FlipCornerCurvature, Borders } from './types'

// ============================================================================
// CORNER CONFIGURATION
// ============================================================================

/** Corner radius - bottom corners only for "attached to table" look */
export const CORNER_RADIUS: CornerRadius = {
  topLeft: 0,
  topRight: 0,
  bottomLeft: 20,
  bottomRight: 20,
}

/** Flip corner curvature - smooth S-curve bezier control points */
export const FLIP_CORNER_CURVATURE: FlipCornerCurvature = {
  cp1x: 0.74,
  cp1y: 0,
  cp2x: 0.14,
  cp2y: 0.6,
}

/** Width multiplier for flip corners */
export const FLIP_CORNER_WIDTH_MULTIPLIER = 1.6

/** Small overlap to hide sub-pixel gaps between corner and bar */
export const CORNER_OVERLAP = 1

// ============================================================================
// ADAPTIVE BEHAVIOR
// ============================================================================

/** Flip corners when switching between fixed/absolute modes */
export const FLIP_CORNERS_ON_MODE = true

/** Flip borders when switching between fixed/absolute modes */
export const FLIP_BORDERS_ON_MODE = true

// ============================================================================
// APPEARANCE
// ============================================================================

/** Background color using semantic token */
export const BACKGROUND_COLOR = 'var(--color-bg-tertiary)'

/** Border configuration */
export const BORDERS: Borders = {
  top: { width: 0, color: 'var(--color-border-primary)' },
  right: { width: 0, color: 'var(--color-border-primary)' },
  bottom: { width: 0, color: 'var(--color-border-tertiary)' },
  left: { width: 0, color: 'var(--color-border-primary)' },
}

// ============================================================================
// LAYOUT
// ============================================================================

/** Horizontal padding */
export const PADDING_X = 0

/** Vertical padding */
export const PADDING_Y = 6

/** Gap between content sections */
export const CONTENT_GAP = 0

// ============================================================================
// TEXT STYLING
// ============================================================================

/** Prefix text styling ("Showing" / "Showing all") */
export const PREFIX_STYLE = {
  color: 'text-secondary',
  weight: 'normal' as const,
  paddingRight: 4,
}

/** Numerator styling (visible count) */
export const NUMERATOR_STYLE = {
  color: 'text-primary',
  weight: 'semibold' as const,
}

/** Connector styling ("of") */
export const CONNECTOR_STYLE = {
  color: 'text-secondary',
  weight: 'normal' as const,
}

/** Denominator styling (total count) */
export const DENOMINATOR_STYLE = {
  color: 'text-tertiary',
  weight: 'normal' as const,
}

/** Suffix styling ("orders") */
export const SUFFIX_STYLE = {
  color: 'text-secondary',
  weight: 'normal' as const,
}
