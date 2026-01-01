/**
 * Skwircle Badge Configuration
 *
 * Size, icon, and extended color configurations for the badge variant.
 * Matches legacy Squircle badge and Untitled UI badge patterns.
 */

import type { SkwircleRoundness, SkwircleElevation } from '../types'

// =============================================================================
// BADGE SIZE CONFIGURATION
// =============================================================================

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export interface BadgeSizeConfig {
  /** Icon side padding (left for leading, right for trailing) */
  paddingIcon: number
  /** Text side padding (right for leading, left for trailing) */
  paddingText: number
  /** Top and bottom padding (compensates for leading-none) */
  paddingVertical: number
  /** Space between icon and text */
  gap: number
  /** Tailwind text size class (always includes leading-none for tight text bounds) */
  textClass: string
  /** Icon size in pixels */
  iconSize: number
  /** Icon stroke width */
  iconStroke: number
}

/**
 * Size configuration for badges.
 *
 * Uses leading-none to ensure text container wraps tightly around text,
 * then compensates with vertical padding for proper visual spacing.
 * This guarantees pixel-perfect text alignment regardless of font metrics.
 */
export const BADGE_SIZE_CONFIGS: Record<BadgeSize, BadgeSizeConfig> = {
  xs: {
    // Extra small - for command keys, keyboard shortcuts
    paddingIcon: 3,
    paddingText: 5,
    paddingVertical: 2,
    gap: 3,
    textClass: 'text-[10px] leading-none',
    iconSize: 10,
    iconStroke: 2,
  },
  sm: {
    paddingIcon: 4,
    paddingText: 6,
    paddingVertical: 3,
    gap: 4,
    textClass: 'text-xs leading-none',
    iconSize: 12,
    iconStroke: 2,
  },
  md: {
    paddingIcon: 6,
    paddingText: 8,
    paddingVertical: 4,
    gap: 4,
    textClass: 'text-sm leading-none',
    iconSize: 12,
    iconStroke: 2,
  },
  lg: {
    paddingIcon: 8,
    paddingText: 10,
    paddingVertical: 5,
    gap: 4,
    textClass: 'text-sm leading-none',
    iconSize: 14,
    iconStroke: 2,
  },
}

// =============================================================================
// BADGE TYPE CONFIGURATION
// =============================================================================

export type BadgeType = 'pill' | 'badge' | 'modern'

export interface BadgeTypeConfig {
  /** Roundness preset */
  roundness: SkwircleRoundness
  /** Shadow/elevation level */
  elevation: SkwircleElevation
  /** Border width */
  borderWidth: number
}

/**
 * Type configuration for badge visual styles.
 * Maps legacy Squircle roundness levels to Skwircle presets.
 */
export const BADGE_TYPE_CONFIGS: Record<BadgeType, BadgeTypeConfig> = {
  pill: {
    roundness: 'pill', // Fully circular
    elevation: 'none',
    borderWidth: 1,
  },
  badge: {
    roundness: 'rounded', // Rounded corners (softer, more iOS-like)
    elevation: 'none',
    borderWidth: 1,
  },
  modern: {
    roundness: 'rounded', // Same rounded corners as badge
    elevation: 'xs', // Modern has shadow
    borderWidth: 1,
  },
}

// =============================================================================
// BADGE COLOR CONFIGURATION
// =============================================================================

export type BadgeColor =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'orange'

export interface BadgeColorConfig {
  /** Background color token */
  backgroundColor: string
  /** Border color token */
  borderColor: string
  /** Text color token (utility-{color}-700) */
  textColor: string
  /** Icon color token - uses same as text but with opacity */
  iconColor: string
  /** Icon opacity (0.5-0.6 for muted appearance) */
  iconOpacity: number
}

/**
 * Color configuration using semantic utility tokens.
 * Icons use the same color as text but with reduced opacity (55%) for muted appearance.
 */
export const BADGE_COLOR_CONFIGS: Record<BadgeColor, BadgeColorConfig> = {
  gray: {
    backgroundColor: 'utility-gray-50',
    borderColor: 'utility-gray-200',
    textColor: 'utility-gray-700',
    iconColor: 'utility-gray-700',
    iconOpacity: 0.55,
  },
  brand: {
    backgroundColor: 'utility-brand-50',
    borderColor: 'utility-brand-200',
    textColor: 'utility-brand-700',
    iconColor: 'utility-brand-700',
    iconOpacity: 0.55,
  },
  error: {
    backgroundColor: 'utility-error-50',
    borderColor: 'utility-error-200',
    textColor: 'utility-error-700',
    iconColor: 'utility-error-700',
    iconOpacity: 0.55,
  },
  warning: {
    backgroundColor: 'utility-warning-50',
    borderColor: 'utility-warning-200',
    textColor: 'utility-warning-700',
    iconColor: 'utility-warning-700',
    iconOpacity: 0.55,
  },
  success: {
    backgroundColor: 'utility-success-50',
    borderColor: 'utility-success-200',
    textColor: 'utility-success-700',
    iconColor: 'utility-success-700',
    iconOpacity: 0.55,
  },
  blue: {
    backgroundColor: 'utility-blue-50',
    borderColor: 'utility-blue-200',
    textColor: 'utility-blue-700',
    iconColor: 'utility-blue-700',
    iconOpacity: 0.55,
  },
  indigo: {
    backgroundColor: 'utility-indigo-50',
    borderColor: 'utility-indigo-200',
    textColor: 'utility-indigo-700',
    iconColor: 'utility-indigo-700',
    iconOpacity: 0.55,
  },
  purple: {
    backgroundColor: 'utility-purple-50',
    borderColor: 'utility-purple-200',
    textColor: 'utility-purple-700',
    iconColor: 'utility-purple-700',
    iconOpacity: 0.55,
  },
  orange: {
    backgroundColor: 'utility-orange-50',
    borderColor: 'utility-orange-200',
    textColor: 'utility-orange-700',
    iconColor: 'utility-orange-700',
    iconOpacity: 0.55,
  },
}

/**
 * Modern gray badge uses semantic tokens instead of utility tokens.
 */
export const BADGE_COLOR_MODERN_GRAY: BadgeColorConfig = {
  backgroundColor: 'background-primary',
  borderColor: 'border-primary',
  textColor: 'text-secondary',
  iconColor: 'text-secondary',
  iconOpacity: 0.55,
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get size configuration for a badge.
 */
export const getBadgeSizeConfig = (size: BadgeSize): BadgeSizeConfig => {
  return BADGE_SIZE_CONFIGS[size]
}

/**
 * Get type configuration for a badge.
 */
export const getBadgeTypeConfig = (type: BadgeType): BadgeTypeConfig => {
  return BADGE_TYPE_CONFIGS[type]
}

/**
 * Get color configuration for a badge.
 * Modern type with gray color uses semantic tokens.
 */
export const getBadgeColorConfig = (type: BadgeType, color: BadgeColor): BadgeColorConfig => {
  if (type === 'modern' && color === 'gray') {
    return BADGE_COLOR_MODERN_GRAY
  }
  return BADGE_COLOR_CONFIGS[color]
}

/**
 * Calculate padding style for a badge based on icon position.
 */
export const getBadgePaddingStyle = (
  size: BadgeSize,
  iconPosition: 'leading' | 'trailing' | 'none'
): React.CSSProperties => {
  const config = BADGE_SIZE_CONFIGS[size]

  return {
    paddingLeft: `${iconPosition === 'leading' ? config.paddingIcon : config.paddingText}px`,
    paddingRight: `${iconPosition === 'trailing' ? config.paddingIcon : config.paddingText}px`,
    paddingTop: `${config.paddingVertical}px`,
    paddingBottom: `${config.paddingVertical}px`,
    gap: iconPosition !== 'none' ? `${config.gap}px` : undefined,
  }
}

/**
 * Get icon style with color and opacity for muted appearance.
 */
export const getBadgeIconStyle = (colorConfig: BadgeColorConfig): React.CSSProperties => {
  return {
    color: `var(--color-${colorConfig.iconColor})`,
    opacity: colorConfig.iconOpacity,
  }
}

/**
 * Get text style with color.
 */
export const getBadgeTextStyle = (colorConfig: BadgeColorConfig): React.CSSProperties => {
  return {
    color: `var(--color-${colorConfig.textColor})`,
  }
}
