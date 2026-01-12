/**
 * Skwircle Intent Configuration
 *
 * Color mappings for semantic intents.
 */

import type { SkwircleIntent, SkwircleVariant, IntentConfig } from '../types'

/**
 * Base intent color configurations.
 */
export const INTENT_CONFIGS: Record<SkwircleIntent, IntentConfig> = {
  default: {
    backgroundColor: 'background-primary',
    backgroundColorHover: 'background-primary_hover',
    borderColor: 'border-primary',
    borderColorHover: 'border-primary',
  },
  primary: {
    backgroundColor: 'background-brand-solid',
    backgroundColorHover: 'background-brand-solid_hover',
    borderColor: 'transparent',
    borderColorHover: 'transparent',
  },
  secondary: {
    backgroundColor: 'background-primary',
    backgroundColorHover: 'background-secondary',
    borderColor: 'border-primary',
    borderColorHover: 'border-primary',
  },
  ghost: {
    backgroundColor: 'transparent',
    backgroundColorHover: 'background-secondary',
    borderColor: 'transparent',
    borderColorHover: 'border-primary',
  },
  error: {
    backgroundColor: 'background-error-primary',
    backgroundColorHover: 'background-error-secondary',
    borderColor: 'border-error',
    borderColorHover: 'border-error',
  },
  success: {
    backgroundColor: 'background-success-primary',
    backgroundColorHover: 'background-success-secondary',
    borderColor: 'utility-success-300',
    borderColorHover: 'utility-success-300',
  },
  warning: {
    backgroundColor: 'background-warning-primary',
    backgroundColorHover: 'background-warning-secondary',
    borderColor: 'utility-warning-300',
    borderColorHover: 'utility-warning-300',
  },
}

/**
 * Variant-specific intent overrides.
 * Some variants need different colors for the same intent.
 */
export const VARIANT_INTENT_OVERRIDES: Partial<
  Record<SkwircleVariant, Partial<Record<SkwircleIntent, Partial<IntentConfig>>>>
> = {
  // Cards use neutral backgrounds, NO hover effects by default (use interactive prop to enable)
  card: {
    default: {
      backgroundColor: 'background-primary',
      backgroundColorHover: 'background-primary', // Same as base - no hover change
      borderColor: 'border-secondary',
      borderColorHover: 'border-secondary',
    },
    primary: {
      backgroundColor: 'background-primary',
      backgroundColorHover: 'background-primary', // Same as base - no hover change
      borderColor: 'border-brand',
      borderColorHover: 'border-brand',
    },
    secondary: {
      backgroundColor: 'background-secondary',
      backgroundColorHover: 'background-secondary', // Same as base - no hover change
      borderColor: 'border-secondary',
      borderColorHover: 'border-secondary',
    },
    error: {
      backgroundColor: 'background-error-primary',
      backgroundColorHover: 'background-error-primary', // Same as base - no hover change
      borderColor: 'border-error',
      borderColorHover: 'border-error',
    },
    success: {
      backgroundColor: 'background-success-primary',
      backgroundColorHover: 'background-success-primary', // Same as base - no hover change
      borderColor: 'utility-success-300',
      borderColorHover: 'utility-success-300',
    },
    warning: {
      backgroundColor: 'background-warning-primary',
      backgroundColorHover: 'background-warning-primary', // Same as base - no hover change
      borderColor: 'utility-warning-300',
      borderColorHover: 'utility-warning-300',
    },
  },
  // Buttons with primary use solid brand colors
  button: {
    secondary: {
      backgroundColor: 'background-primary',
      backgroundColorHover: 'background-secondary',
      borderColor: 'border-primary',
      borderColorHover: 'border-primary',
    },
    ghost: {
      // Ghost buttons have no shadow (matches button.tsx tertiary style)
      elevation: 'none',
    },
    error: {
      backgroundColor: 'background-error-solid',
      backgroundColorHover: 'background-color-error-solid_hover',
      borderColor: 'transparent',
      borderColorHover: 'transparent',
    },
  },
  // Badges use utility color scales (matching legacy Squircle badge and Untitled UI)
  // Pattern: bg: utility-{color}-50, border: utility-{color}-200, text: utility-{color}-700, icon: utility-{color}-500
  badge: {
    default: {
      backgroundColor: 'utility-gray-50',
      backgroundColorHover: 'utility-gray-100',
      borderColor: 'utility-gray-200',
      borderColorHover: 'utility-gray-200',
    },
    primary: {
      backgroundColor: 'utility-brand-50',
      backgroundColorHover: 'utility-brand-100',
      borderColor: 'utility-brand-200',
      borderColorHover: 'utility-brand-200',
    },
    secondary: {
      // Modern gray style - uses semantic tokens
      backgroundColor: 'background-primary',
      backgroundColorHover: 'background-secondary',
      borderColor: 'border-primary',
      borderColorHover: 'border-primary',
      elevation: 'xs', // Modern badges have subtle shadow
    },
    error: {
      backgroundColor: 'utility-error-50',
      backgroundColorHover: 'utility-error-100',
      borderColor: 'utility-error-200',
      borderColorHover: 'utility-error-200',
    },
    success: {
      backgroundColor: 'utility-success-50',
      backgroundColorHover: 'utility-success-100',
      borderColor: 'utility-success-200',
      borderColorHover: 'utility-success-200',
    },
    warning: {
      backgroundColor: 'utility-warning-50',
      backgroundColorHover: 'utility-warning-100',
      borderColor: 'utility-warning-200',
      borderColorHover: 'utility-warning-200',
    },
  },
  // Inputs always use primary background
  input: {
    default: {
      backgroundColor: 'background-primary',
      borderColor: 'border-primary',
    },
    primary: {
      backgroundColor: 'background-primary',
      borderColor: 'border-brand',
    },
    error: {
      backgroundColor: 'background-primary',
      borderColor: 'border-error',
    },
  },
}

/**
 * Get effective intent configuration for a variant.
 */
export const getIntentConfig = (variant: SkwircleVariant, intent: SkwircleIntent): IntentConfig => {
  const base = INTENT_CONFIGS[intent]
  const override = VARIANT_INTENT_OVERRIDES[variant]?.[intent]

  if (override) {
    return { ...base, ...override }
  }

  return base
}

/**
 * Input state configurations for focused/error/disabled states.
 */
export const INPUT_STATE_CONFIGS = {
  default: {
    borderColor: undefined,
    ringWidth: 0,
    ringColor: undefined,
  },
  hover: {
    borderColor: 'border-primary',
    ringWidth: 0,
    ringColor: undefined,
  },
  focused: {
    borderColor: 'border-brand',
    ringWidth: 2,
    ringColor: 'border-brand',
  },
  disabled: {
    borderColor: 'border-disabled',
    ringWidth: 0,
    ringColor: undefined,
  },
  error: {
    borderColor: 'border-error',
    ringWidth: 2,
    ringColor: 'border-error',
  },
}

/**
 * Get input state configuration.
 */
export const getInputStateConfig = (state: keyof typeof INPUT_STATE_CONFIGS) => {
  return INPUT_STATE_CONFIGS[state]
}
