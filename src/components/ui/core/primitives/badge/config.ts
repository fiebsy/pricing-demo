import type { BadgeColor, BadgeShape, BadgeSize, BadgeGroupTheme, BadgeGroupAlign, BadgeGroupSize } from './types'

/**
 * Color styles for each badge variant
 *
 * MIGRATION NOTE: Updated to better match legacy Untitled UI badge styling
 * - Legacy uses utility-*-50 (bg), utility-*-700 (text), utility-*-200 (ring)
 * - Now using text-brand-secondary (700) and ring-brand-primary (200) for brand
 * - Status colors use text-*-primary (600) which is close to legacy 700
 *
 * Uses semantic tokens from src/styles/utilities/
 */
export const colorStyles: Record<BadgeColor, { root: string; dot: string; icon: string; removeButton: string }> = {
  gray: {
    // Legacy: bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200
    root: 'bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200',
    dot: 'bg-utility-gray-500',
    icon: 'text-utility-gray-500',
    removeButton: 'text-utility-gray-400 hover:text-utility-gray-500 hover:bg-utility-gray-100',
  },
  brand: {
    // Legacy: bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200
    root: 'bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200',
    dot: 'bg-utility-brand-500',
    icon: 'text-utility-brand-500',
    removeButton: 'text-utility-brand-400 hover:text-utility-brand-500 hover:bg-utility-brand-100',
  },
  success: {
    // Legacy: bg-utility-success-50 text-utility-success-700 ring-utility-success-200
    root: 'bg-utility-success-50 text-utility-success-700 ring-utility-success-200',
    dot: 'bg-utility-success-500',
    icon: 'text-utility-success-500',
    removeButton: 'text-utility-success-400 hover:text-utility-success-500 hover:bg-utility-success-100',
  },
  warning: {
    // Legacy: bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200
    root: 'bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200',
    dot: 'bg-utility-warning-500',
    icon: 'text-utility-warning-500',
    removeButton: 'text-utility-warning-400 hover:text-utility-warning-500 hover:bg-utility-warning-100',
  },
  error: {
    // Legacy: bg-utility-error-50 text-utility-error-700 ring-utility-error-200
    root: 'bg-utility-error-50 text-utility-error-700 ring-utility-error-200',
    dot: 'bg-utility-error-500',
    icon: 'text-utility-error-500',
    removeButton: 'text-utility-error-400 hover:text-utility-error-500 hover:bg-utility-error-100',
  },
  info: {
    // Info variant: uses brand colors on neutral background
    root: 'bg-utility-gray-50 text-utility-brand-700 ring-utility-brand-200',
    dot: 'bg-utility-brand-500',
    icon: 'text-utility-brand-500',
    removeButton: 'text-utility-brand-400 hover:text-utility-brand-500 hover:bg-utility-brand-100',
  },
}

/**
 * Size styles for badges
 *
 * Matches Untitled UI pill sizing with added xs for compact use cases.
 * Uses standard Tailwind values - no arbitrary pixel values.
 *
 * Untitled UI reference:
 * - sm: py-0.5 px-2, gap-1
 * - md: py-0.5 px-2.5, gap-1.5
 * - lg: py-1 px-3, gap-1.5
 */
export const sizeStyles: Record<BadgeSize, { root: string; dot: string; icon: string }> = {
  xs: {
    root: 'px-1 py-0.5 gap-0.5 text-[11px] leading-tight font-medium',
    dot: 'size-1',
    icon: 'size-3 stroke-[2.5]',
  },
  sm: {
    root: 'px-2 py-0.5 gap-1 text-xs font-medium',
    dot: 'size-1.5',
    icon: 'size-3 opacity-80',
  },
  md: {
    root: 'px-2.5 py-0.5 gap-1.5 text-sm font-medium',
    dot: 'size-1.5',
    icon: 'size-3.5 opacity-80',
  },
  lg: {
    root: 'px-3 py-1 gap-1.5 text-sm font-medium',
    dot: 'size-2',
    icon: 'size-4 opacity-80',
  },
}

/**
 * Padding adjustments when badge has leading content (dot or icon)
 *
 * Untitled UI uses asymmetric padding: tighter on icon side, standard on text side.
 * These override the left padding from sizeStyles.
 */
export const sizeWithLeadingStyles: Record<BadgeSize, string> = {
  xs: 'pl-[3px]',
  sm: 'pl-1.5',
  md: 'pl-2',
  lg: 'pl-2.5',
}

/**
 * Padding adjustments when badge has trailing content (icon or close button)
 *
 * These override the right padding from sizeStyles.
 */
export const sizeWithTrailingStyles: Record<BadgeSize, string> = {
  xs: 'pr-[3px]',
  sm: 'pr-1.5',
  md: 'pr-2',
  lg: 'pr-2.5',
}

/**
 * Padding and gap adjustments for badges with dot indicator
 *
 * Dots need larger gaps than icons per Untitled UI spec:
 * - sm: gap-1 (4px)
 * - md/lg: gap-1.5 (6px)
 */
export const sizeWithDotStyles: Record<BadgeSize, string> = {
  xs: 'pl-1 gap-0.5',
  sm: 'pl-1.5 gap-1',
  md: 'pl-2 gap-1.5',
  lg: 'pl-2.5 gap-1.5',
}

// Alias for backwards compatibility
export const sizeWithLeadingIconStyles = sizeWithLeadingStyles

/**
 * Shape styles
 * - pill: Standard rounded-full
 * - rounded: Rounded-lg with squircle corners
 * - squircle: Rounded-full with squircle corners (softer pill)
 */
export const shapeStyles: Record<BadgeShape, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-lg corner-squircle',
  squircle: 'rounded-full corner-squircle',
}

/**
 * Shape overrides by size
 * Matches Untitled UI behavior where lg badge uses rounded-xl instead of rounded-lg
 */
export const shapeSizeOverrides: Partial<Record<BadgeShape, Partial<Record<BadgeSize, string>>>> = {
  rounded: {
    lg: 'rounded-xl',
  },
}

/**
 * Common styles for all badges
 * Note: Using w-max to match legacy behavior (size-max = w-max h-max)
 */
export const commonStyles = [
  'inline-flex w-max items-center',
  'whitespace-nowrap',
  'ring-1 ring-inset',
  'transition-colors duration-150',
  'motion-reduce:transition-none',
].join(' ')

/**
 * Style variant styles (default vs modern)
 * Modern adds shadow-xs for elevated appearance
 */
export const styleVariantStyles = {
  default: '',
  modern: 'shadow-xs',
} as const

export type BadgeStyle = keyof typeof styleVariantStyles

/**
 * Modern style color overrides
 * Legacy "modern" type uses different colors for certain variants
 * - gray: Uses neutral bg-primary instead of colored background
 * - Other colors: Same as default style
 */
export const modernColorOverrides: Partial<Record<BadgeColor, { root: string; dot: string; icon: string; removeButton: string }>> = {
  gray: {
    // Legacy modern gray: bg-primary text-secondary ring-primary
    root: 'bg-primary text-secondary ring-primary',
    dot: 'bg-quaternary',
    icon: 'text-quaternary',
    removeButton: 'text-quaternary hover:text-tertiary hover:bg-tertiary',
  },
}

/**
 * Remove button styles
 */
export const removeButtonStyles = [
  'p-0.5 rounded-full',
  'cursor-pointer',
  'transition-colors duration-150',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
].join(' ')

// ============================================================================
// BADGE GROUP STYLES
// ============================================================================

/**
 * BadgeGroup base styles by theme
 * Uses semantic tokens from src/styles/utilities/
 * Note: corner-squircle applied universally for consistent badge styling
 */
export const badgeGroupThemeStyles: Record<BadgeGroupTheme, { root: string; addon: string; icon?: string }> = {
  light: {
    root: 'rounded-full ring-1 ring-inset corner-squircle',
    addon: 'rounded-full ring-1 ring-inset corner-squircle',
  },
  modern: {
    root: 'rounded-[10px] bg-primary text-secondary shadow-xs ring-1 ring-inset ring-primary hover:bg-secondary corner-squircle',
    addon: 'flex items-center rounded-md bg-primary shadow-xs ring-1 ring-inset ring-primary corner-squircle',
    icon: 'text-quaternary',
  },
}

/**
 * BadgeGroup color styles by theme
 *
 * MIGRATION NOTE: Updated to match legacy Untitled UI badge-groups styling
 * - Uses utility tokens for exact color matching with legacy
 *
 * Uses semantic tokens from src/styles/utilities/
 */
export const badgeGroupColorStyles: Record<
  BadgeGroupTheme,
  Partial<Record<BadgeColor, { root?: string; addon?: string; icon?: string; dot?: string }>>
> = {
  light: {
    brand: {
      // Legacy: bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200 hover:bg-utility-brand-100
      root: 'bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200 hover:bg-utility-brand-100',
      addon: 'bg-primary text-current ring-utility-brand-200',
      icon: 'text-utility-brand-500',
    },
    gray: {
      // Legacy: bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200 hover:bg-utility-gray-100
      root: 'bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200 hover:bg-utility-gray-100',
      addon: 'bg-primary text-current ring-utility-gray-200',
      icon: 'text-utility-gray-500',
    },
    error: {
      // Legacy: bg-utility-error-50 text-utility-error-700 ring-utility-error-200 hover:bg-utility-error-100
      root: 'bg-utility-error-50 text-utility-error-700 ring-utility-error-200 hover:bg-utility-error-100',
      addon: 'bg-primary text-current ring-utility-error-200',
      icon: 'text-utility-error-500',
    },
    warning: {
      // Legacy: bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200 hover:bg-utility-warning-100
      root: 'bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200 hover:bg-utility-warning-100',
      addon: 'bg-primary text-current ring-utility-warning-200',
      icon: 'text-utility-warning-500',
    },
    success: {
      // Legacy: bg-utility-success-50 text-utility-success-700 ring-utility-success-200 hover:bg-utility-success-100
      root: 'bg-utility-success-50 text-utility-success-700 ring-utility-success-200 hover:bg-utility-success-100',
      addon: 'bg-primary text-current ring-utility-success-200',
      icon: 'text-utility-success-500',
    },
    info: {
      // Info variant: neutral bg with brand text
      root: 'bg-utility-gray-50 text-utility-brand-700 ring-utility-brand-200 hover:bg-utility-gray-100',
      addon: 'bg-primary text-current ring-utility-brand-200',
      icon: 'text-utility-brand-500',
    },
  },
  modern: {
    brand: {
      // Legacy: bg-utility-brand-500 outline-3 -outline-offset-1 outline-utility-brand-100
      dot: 'bg-utility-brand-500 outline-3 -outline-offset-1 outline-utility-brand-100',
    },
    gray: {
      // Legacy: bg-utility-gray-500 outline-3 -outline-offset-1 outline-utility-gray-100
      dot: 'bg-utility-gray-500 outline-3 -outline-offset-1 outline-utility-gray-100',
    },
    error: {
      // Legacy: bg-utility-error-500 outline-3 -outline-offset-1 outline-utility-error-100
      dot: 'bg-utility-error-500 outline-3 -outline-offset-1 outline-utility-error-100',
    },
    warning: {
      // Legacy: bg-utility-warning-500 outline-3 -outline-offset-1 outline-utility-warning-100
      dot: 'bg-utility-warning-500 outline-3 -outline-offset-1 outline-utility-warning-100',
    },
    success: {
      // Legacy: bg-utility-success-500 outline-3 -outline-offset-1 outline-utility-success-100
      dot: 'bg-utility-success-500 outline-3 -outline-offset-1 outline-utility-success-100',
    },
    info: {
      // Info variant: uses brand dot colors
      dot: 'bg-utility-brand-500 outline-3 -outline-offset-1 outline-utility-brand-100',
    },
  },
}

/**
 * BadgeGroup size styles by alignment
 */
export const badgeGroupSizeStyles: Record<
  BadgeGroupAlign,
  Record<BadgeGroupSize, { root: string; addon: string; icon: string; dot?: string }>
> = {
  leading: {
    md: {
      root: 'py-1 pr-2 pl-1 text-xs font-medium',
      addon: 'px-2 py-0.5 mr-2 gap-1',
      icon: 'ml-1 size-4',
    },
    lg: {
      root: 'py-1 pr-2 pl-1 text-sm font-medium',
      addon: 'px-2.5 py-0.5 mr-2 gap-1.5',
      icon: 'ml-1 size-4',
    },
  },
  trailing: {
    md: {
      root: 'py-1 pr-1 pl-2.5 text-xs font-medium',
      addon: 'py-0.5 pr-1.5 pl-2 ml-2',
      icon: 'ml-0.5 size-3 stroke-[3px]',
      dot: 'mr-1.5',
    },
    lg: {
      root: 'py-1 pr-1 pl-3 text-sm font-medium',
      addon: 'py-0.5 pr-2 pl-2.5 ml-2',
      icon: 'ml-1 size-3 stroke-[3px]',
      dot: 'mr-2',
    },
  },
}

/**
 * BadgeGroup common styles
 * Note: 'group' class enables group-hover on child elements (icon animation)
 */
export const badgeGroupCommonStyles = [
  'group inline-flex w-max items-center',
  'cursor-pointer',
  'transition-colors duration-150',
  'motion-reduce:transition-none',
].join(' ')
