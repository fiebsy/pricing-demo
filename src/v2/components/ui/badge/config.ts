import type { BadgeColor, BadgeColorConfig, BadgeSize, BadgeType } from './types'

/**
 * Size configuration for badges
 * Based on working example with perfect alignment (4px icon side / 6px text side)
 */
export const BADGE_SIZE_CONFIG: Record<
  BadgeSize,
  {
    padding: {
      icon: number // Icon side padding (left for leading, right for trailing)
      text: number // Text side padding (right for leading, left for trailing)
      vertical: number // Top and bottom padding
    }
    gap: number // Space between icon and text
    textSize: string // Tailwind text size class
    iconSize: number // Icon size in pixels (consistent 12px across all sizes per Untitled UI)
    iconStroke: number // Icon stroke width
    iconColor: string // Muted icon color (text-secondary)
  }
> = {
  sm: {
    padding: { icon: 4, text: 6, vertical: 2 },
    gap: 4,
    textSize: 'text-xs',
    iconSize: 12, // Consistent icon size (Untitled UI pattern)
    iconStroke: 2,
    iconColor: 'text-secondary', // Muted icon color vs text
  },
  md: {
    padding: { icon: 6, text: 8, vertical: 2 },
    gap: 4,
    textSize: 'text-sm',
    iconSize: 12, // Same icon size as sm (Untitled UI pattern)
    iconStroke: 2,
    iconColor: 'text-secondary',
  },
  lg: {
    padding: { icon: 8, text: 10, vertical: 4 },
    gap: 4,
    textSize: 'text-sm',
    iconSize: 12, // Same icon size as sm/md (Untitled UI pattern)
    iconStroke: 2,
    iconColor: 'text-secondary',
  },
}

/**
 * Type configuration for badge visual styles
 */
export const BADGE_TYPE_CONFIG: Record<
  BadgeType,
  {
    roundness: 0 | 1 | 2 | 3 | 4 | 5
    shadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    borderWidth: number
  }
> = {
  pill: {
    roundness: 5, // Fully circular
    shadow: 'none',
    borderWidth: 1,
  },
  badge: {
    roundness: 3, // Rounded corners
    shadow: 'none',
    borderWidth: 1,
  },
  modern: {
    roundness: 2, // Subtle rounding
    shadow: 'xs',
    borderWidth: 1,
  },
}

/**
 * Color configuration using semantic tokens
 * Maps to utility color scales for consistent theming
 * Icons use -500, text uses -700 (Untitled UI pattern)
 */
export const BADGE_COLOR_CONFIG: Record<BadgeColor, BadgeColorConfig> = {
  gray: {
    backgroundColor: 'utility-gray-50',
    borderColor: 'utility-gray-200',
    textColor: 'utility-gray-700',
    iconColor: 'utility-gray-500', // Muted vs text (Untitled UI)
  },
  brand: {
    backgroundColor: 'utility-brand-50',
    borderColor: 'utility-brand-200',
    textColor: 'utility-brand-700',
    iconColor: 'utility-brand-500',
  },
  error: {
    backgroundColor: 'utility-error-50',
    borderColor: 'utility-error-200',
    textColor: 'utility-error-700',
    iconColor: 'utility-error-500',
  },
  warning: {
    backgroundColor: 'utility-warning-50',
    borderColor: 'utility-warning-200',
    textColor: 'utility-warning-700',
    iconColor: 'utility-warning-500',
  },
  success: {
    backgroundColor: 'utility-success-50',
    borderColor: 'utility-success-200',
    textColor: 'utility-success-700',
    iconColor: 'utility-success-500',
  },
  blue: {
    backgroundColor: 'utility-blue-50',
    borderColor: 'utility-blue-200',
    textColor: 'utility-blue-700',
    iconColor: 'utility-blue-500',
  },
  indigo: {
    backgroundColor: 'utility-indigo-50',
    borderColor: 'utility-indigo-200',
    textColor: 'utility-indigo-700',
    iconColor: 'utility-indigo-500',
  },
  purple: {
    backgroundColor: 'utility-purple-50',
    borderColor: 'utility-purple-200',
    textColor: 'utility-purple-700',
    iconColor: 'utility-purple-500',
  },
  orange: {
    backgroundColor: 'utility-orange-50',
    borderColor: 'utility-orange-200',
    textColor: 'utility-orange-700',
    iconColor: 'utility-orange-500',
  },
}

/**
 * Get effective roundness for a badge
 */
export const getBadgeRoundness = (type: BadgeType, override?: 0 | 1 | 2 | 3 | 4 | 5): 0 | 1 | 2 | 3 | 4 | 5 => {
  return override !== undefined ? override : BADGE_TYPE_CONFIG[type].roundness
}

/**
 * Get effective shadow for a badge
 * Maps shadow values to Squircle's supported values (only 'none', 'xs', 'sm' supported)
 */
export const getBadgeShadow = (
  type: BadgeType,
  override?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): 'none' | 'xs' | 'sm' => {
  const shadow = override !== undefined ? override : BADGE_TYPE_CONFIG[type].shadow
  // Map unsupported shadow values to 'sm' (Squircle only supports none/xs/sm)
  if (shadow === 'md' || shadow === 'lg' || shadow === 'xl' || shadow === '2xl') {
    return 'sm'
  }
  return shadow as 'none' | 'xs' | 'sm'
}

/**
 * Get effective badge colors based on type and color
 * Modern type with gray color uses semantic tokens instead of utility tokens
 */
export const getBadgeColors = (type: BadgeType, color: BadgeColor): BadgeColorConfig => {
  // Modern gray badges use semantic tokens (bg-primary, text-secondary, ring-primary)
  if (type === 'modern' && color === 'gray') {
    return {
      backgroundColor: 'background-primary',
      borderColor: 'border-primary',
      textColor: 'text-secondary',
      iconColor: 'utility-gray-500', // Icon still uses utility for consistency
    }
  }

  // All other combinations use standard utility tokens
  return BADGE_COLOR_CONFIG[color]
}
