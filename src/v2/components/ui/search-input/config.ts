import type { SearchInputColorConfig, SearchInputSize, SearchInputSizeConfig } from './types'

/**
 * Size configuration for SearchInput
 * Following Badge/Button pattern with scaled icons
 */
export const SEARCH_INPUT_SIZE_CONFIG: Record<SearchInputSize, SearchInputSizeConfig> = {
  sm: {
    padding: {
      left: 36, // Space for 16px icon + 10px left position + 10px gap
      right: 12,
      vertical: 8,
    },
    iconSize: 16,
    iconLeft: 10,
    textSize: 'text-sm',
    gap: 10,
  },
  md: {
    padding: {
      left: 44, // Space for 20px icon + 12px left position + 12px gap
      right: 14,
      vertical: 10,
    },
    iconSize: 20,
    iconLeft: 12,
    textSize: 'text-md',
    gap: 12,
  },
}

/**
 * Color configuration using semantic tokens
 * Follows V2 design system with proper state handling
 * Matches Untitled UI Input exactly
 */
export const SEARCH_INPUT_COLOR_CONFIG: SearchInputColorConfig = {
  default: {
    backgroundColor: 'background-primary',
    borderColor: 'border-primary',
    textColor: 'text-primary',
    placeholderColor: 'text-placeholder',
    iconColor: 'utility-gray-500', // Muted icon color
  },
  focus: {
    borderColor: 'utility-brand-300', // Subtle focus state (gray-200)
  },
  disabled: {
    backgroundColor: 'background-disabled_subtle',
    borderColor: 'border-disabled',
    textColor: 'text-disabled',
    iconColor: 'utility-gray-300',
  },
  invalid: {
    borderColor: 'border-error_subtle', // Matches Untitled UI default invalid
  },
  invalidFocus: {
    borderColor: 'border-error', // Matches Untitled UI focus invalid (ring-error)
  },
}

/**
 * Default Squircle settings for SearchInput
 * Matches Untitled UI Input ring system (no layout shift)
 */
export const SEARCH_INPUT_DEFAULTS = {
  roundness: 2 as const, // Balanced roundness
  shadow: 'xs' as const, // Extra subtle elevation
  borderWidth: 1, // Always 1px to prevent layout shift
}
