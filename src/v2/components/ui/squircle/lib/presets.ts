/**
 * High-Quality Squircle Presets
 *
 * Collection of carefully curated squircle configurations for common use cases.
 * Copy these configurations directly into your components or use as inspiration.
 *
 * Generated from: http://localhost:3001/v2/playground/ui/gallery/squircle-v2
 */

import type { SquircleProps } from '../types'

// ============================================================================
// BUTTON PRESETS
// ============================================================================

export const SQUIRCLE_BUTTON_PRIMARY: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 0,
  shadow: 'sm',
  backgroundColor: 'background-brand-solid',
  backgroundColorHover: 'background-brand-solid_hover',
}

export const SQUIRCLE_BUTTON_SECONDARY: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-primary',
  shadow: 'xs',
  backgroundColor: 'background-primary',
  backgroundColorHover: 'background-secondary',
}

export const SQUIRCLE_BUTTON_GHOST: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 0,
  shadow: 'none',
  backgroundColor: 'transparent',
  backgroundColorHover: 'background-secondary',
}

export const SQUIRCLE_BUTTON_DESTRUCTIVE: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 0,
  shadow: 'sm',
  backgroundColor: 'background-error-solid',
  backgroundColorHover: 'background-error-solid_hover',
}

// ============================================================================
// CARD PRESETS
// ============================================================================

export const SQUIRCLE_CARD_DEFAULT: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-secondary',
  shadow: 'sm',
  backgroundColor: 'background-primary',
}

export const SQUIRCLE_CARD_ELEVATED: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 0,
  shadow: 'sm',
  backgroundColor: 'background-primary',
}

export const SQUIRCLE_CARD_BRAND: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-brand',
  borderGradient: 'corner-tl-br-2',
  shadow: 'sm',
  backgroundColor: 'background-brand-primary',
  backgroundGradient: 'subtle-depth',
  backgroundGradientOverlayColor: 'fg-brand-primary',
}

export const SQUIRCLE_CARD_GLASS: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-secondary',
  shadow: 'sm',
  backgroundColor: 'background-secondary',
  backgroundGradient: 'subtle-depth',
  backgroundGradientOverlayColor: 'background-primary',
}

// ============================================================================
// INPUT PRESETS
// ============================================================================

export const SQUIRCLE_INPUT_DEFAULT: Partial<SquircleProps> = {
  roundness: 2,
  borderWidth: 1,
  borderColor: 'border-primary',
  shadow: 'none',
  backgroundColor: 'background-primary',
}

export const SQUIRCLE_INPUT_FOCUS: Partial<SquircleProps> = {
  roundness: 2,
  borderWidth: 1,
  borderColor: 'border-brand',
  outerBorderWidth: 2,
  outerBorderColor: 'border-brand',
  shadow: 'none',
  backgroundColor: 'background-primary',
}

export const SQUIRCLE_INPUT_ERROR: Partial<SquircleProps> = {
  roundness: 2,
  borderWidth: 1,
  borderColor: 'border-error',
  shadow: 'none',
  backgroundColor: 'background-error-primary',
}

// ============================================================================
// BADGE PRESETS
// ============================================================================

export const SQUIRCLE_BADGE_BRAND: Partial<SquircleProps> = {
  roundness: 1,
  borderWidth: 0,
  shadow: 'none',
  backgroundColor: 'background-brand-primary',
}

export const SQUIRCLE_BADGE_SUCCESS: Partial<SquircleProps> = {
  roundness: 1,
  borderWidth: 0,
  shadow: 'none',
  backgroundColor: 'background-success-primary',
}

export const SQUIRCLE_BADGE_WARNING: Partial<SquircleProps> = {
  roundness: 1,
  borderWidth: 0,
  shadow: 'none',
  backgroundColor: 'background-warning-primary',
}

export const SQUIRCLE_BADGE_ERROR: Partial<SquircleProps> = {
  roundness: 1,
  borderWidth: 0,
  shadow: 'none',
  backgroundColor: 'background-error-primary',
}

export const SQUIRCLE_BADGE_OUTLINED: Partial<SquircleProps> = {
  roundness: 1,
  borderWidth: 1,
  borderColor: 'border-brand',
  shadow: 'none',
  backgroundColor: 'background-primary',
}

// ============================================================================
// SPECIALTY PRESETS
// ============================================================================

export const SQUIRCLE_GLOW_BRAND: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-brand',
  borderGradient: 'radial-edge-glow',
  shadow: 'sm',
  backgroundColor: 'background-brand-solid',
  backgroundGradient: 'subtle-depth',
  backgroundGradientOverlayColor: 'fg-brand-primary',
}

export const SQUIRCLE_DOUBLE_BORDER: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-brand',
  outerBorderWidth: 2,
  outerBorderColor: 'fg-brand-tertiary',
  shadow: 'sm',
  backgroundColor: 'background-primary',
}

export const SQUIRCLE_GRADIENT_CORNER_EMPHASIS: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-brand',
  borderGradient: 'corner-tr-bl-3',
  shadow: 'sm',
  backgroundColor: 'background-primary',
}

/**
 * Sophisticated double-border with corner gradient emphasis
 * Perfect for buttons, cards, and interactive elements
 * Features:
 * - Primary border with corner-to-corner gradient fade (TL-BR)
 * - Subtle outer border for depth
 * - Clean background with soft shadow
 */
export const SQUIRCLE_GRADIENT_DOUBLE_BORDER: Partial<SquircleProps> = {
  roundness: 3,
  borderWidth: 1,
  borderColor: 'border-primary',
  borderGradient: 'corner-tl-br-3',
  outerBorderWidth: 1,
  outerBorderColor: 'border-tertiary',
  shadow: 'sm',
  backgroundColor: 'background-primary',
}

export const SQUIRCLE_MINIMAL: Partial<SquircleProps> = {
  roundness: 2,
  borderWidth: 1,
  borderColor: 'border-secondary',
  shadow: 'none',
  backgroundColor: 'background-secondary',
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example: Using presets in your components
 *
 * @example
 * import { Squircle } from '@/modules/design-system/v2/components/ui/custom/base/squircle'
 * import { SQUIRCLE_BUTTON_PRIMARY } from '@/modules/design-system/v2/components/ui/custom/base/squircle/presets'
 *
 * export function MyButton() {
 *   return (
 *     <Squircle {...SQUIRCLE_BUTTON_PRIMARY}>
 *       <div className="px-4 py-2">
 *         <span className="text-primary_on-brand text-sm font-medium">
 *           Click me
 *         </span>
 *       </div>
 *     </Squircle>
 *   )
 * }
 *
 * @example
 * // Overriding preset values
 * <Squircle
 *   {...SQUIRCLE_CARD_DEFAULT}
 *   roundness={4}
 *   backgroundColor="background-brand-primary"
 * >
 *   Content here
 * </Squircle>
 *
 * @example
 * // Combining presets
 * <Squircle
 *   {...SQUIRCLE_CARD_DEFAULT}
 *   borderGradient="corner-tl-br-2"
 *   backgroundGradient="subtle-depth"
 * >
 *   Content here
 * </Squircle>
 */

// ============================================================================
// PRESET CATEGORIES MAP (for documentation)
// ============================================================================

export const SQUIRCLE_PRESET_CATEGORIES = {
  buttons: {
    primary: SQUIRCLE_BUTTON_PRIMARY,
    secondary: SQUIRCLE_BUTTON_SECONDARY,
    ghost: SQUIRCLE_BUTTON_GHOST,
    destructive: SQUIRCLE_BUTTON_DESTRUCTIVE,
  },
  cards: {
    default: SQUIRCLE_CARD_DEFAULT,
    elevated: SQUIRCLE_CARD_ELEVATED,
    brand: SQUIRCLE_CARD_BRAND,
    glass: SQUIRCLE_CARD_GLASS,
  },
  inputs: {
    default: SQUIRCLE_INPUT_DEFAULT,
    focus: SQUIRCLE_INPUT_FOCUS,
    error: SQUIRCLE_INPUT_ERROR,
  },
  badges: {
    brand: SQUIRCLE_BADGE_BRAND,
    success: SQUIRCLE_BADGE_SUCCESS,
    warning: SQUIRCLE_BADGE_WARNING,
    error: SQUIRCLE_BADGE_ERROR,
    outlined: SQUIRCLE_BADGE_OUTLINED,
  },
  specialty: {
    glow: SQUIRCLE_GLOW_BRAND,
    doubleBorder: SQUIRCLE_DOUBLE_BORDER,
    gradientCorner: SQUIRCLE_GRADIENT_CORNER_EMPHASIS,
    gradientDoubleBorder: SQUIRCLE_GRADIENT_DOUBLE_BORDER,
    minimal: SQUIRCLE_MINIMAL,
  },
} as const
