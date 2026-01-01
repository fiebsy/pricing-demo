/**
 * Skwircle Constants
 *
 * Semantic color mappings and gradient presets.
 * Migrated from deprecated-squircle for self-contained skwircle module.
 */

import type { GradientConfig } from '../types'

// =============================================================================
// V2 SEMANTIC COLORS
// =============================================================================

/**
 * Maps semantic color tokens to CSS variable values.
 * Used by color-resolver.ts to translate token names to actual colors.
 */
export const V2_SEMANTIC_COLORS: Record<string, string> = {
  // Background colors - Primary
  'background-color-primary': 'var(--background-color-primary)',
  'background-primary': 'var(--background-color-primary)',
  'background-color-secondary': 'var(--background-color-secondary)',
  'background-secondary': 'var(--background-color-secondary)',
  'background-color-tertiary': 'var(--background-color-tertiary)',
  'background-tertiary': 'var(--background-color-tertiary)',
  'background-color-quaternary': 'var(--background-color-quaternary)',
  'background-quaternary': 'var(--background-color-quaternary)',
  'background-color-active': 'var(--background-color-active)',
  'background-active': 'var(--background-color-active)',
  'background-color-disabled': 'var(--background-color-disabled)',
  'background-disabled': 'var(--background-color-disabled)',

  // Background colors - Alt/Subtle
  'background-primary_alt': 'var(--background-color-primary_alt)',
  'background-secondary_alt': 'var(--background-color-secondary_alt)',
  'background-secondary_subtle': 'var(--background-color-secondary_subtle)',
  'background-disabled_subtle': 'var(--background-color-disabled_subtle)',

  // Background colors - Hover
  'background-color-primary_hover': 'var(--background-color-primary_hover)',
  'background-primary_hover': 'var(--background-color-primary_hover)',
  'background-color-secondary_hover': 'var(--background-color-secondary_hover)',
  'background-secondary_hover': 'var(--background-color-secondary_hover)',

  // Background colors - Brand
  'background-brand-primary': 'var(--background-color-brand-primary)',
  'background-brand-primary_alt': 'var(--background-color-brand-primary_alt)',
  'background-brand-secondary': 'var(--background-color-brand-secondary)',
  'background-brand-section': 'var(--background-color-brand-section)',
  'background-brand-section_subtle': 'var(--background-color-brand-section_subtle)',

  // Background colors - Solid
  'background-primary-solid': 'var(--background-color-primary-solid)',
  'background-secondary-solid': 'var(--background-color-secondary-solid)',
  'background-color-brand-solid': 'var(--background-color-brand-solid)',
  'background-brand-solid': 'var(--background-color-brand-solid)',
  'background-color-brand-solid_hover': 'var(--background-color-brand-solid_hover)',
  'background-brand-solid_hover': 'var(--background-color-brand-solid_hover)',

  // Background colors - Error
  'background-color-error-primary': 'var(--background-color-error-primary)',
  'background-error-primary': 'var(--background-color-error-primary)',
  'background-error-secondary': 'var(--background-color-error-secondary)',
  'background-color-error-solid': 'rgb(217 45 32)',
  'background-error-solid': 'rgb(217 45 32)',
  'background-color-error-solid_hover': 'rgb(186 38 27)',

  // Background colors - Warning
  'background-warning-primary': 'var(--background-color-warning-primary)',
  'background-warning-secondary': 'var(--background-color-warning-secondary)',
  'background-warning-solid': 'var(--background-color-warning-solid)',

  // Background colors - Success
  'background-success-primary': 'var(--background-color-success-primary)',
  'background-success-secondary': 'var(--background-color-success-secondary)',
  'background-success-solid': 'var(--background-color-success-solid)',

  // Border colors - Primary
  'border-color-primary': 'var(--border-color-primary)',
  'border-primary': 'var(--border-color-primary)',
  'border-color-secondary': 'var(--border-color-secondary)',
  'border-secondary': 'var(--border-color-secondary)',
  'border-color-tertiary': 'var(--border-color-tertiary)',
  'border-tertiary': 'var(--border-color-tertiary)',
  'border-color-disabled': 'var(--border-color-disabled)',
  'border-disabled': 'var(--border-color-disabled)',
  'border-color-disabled_subtle': 'var(--border-color-disabled_subtle)',
  'border-disabled_subtle': 'var(--border-color-disabled_subtle)',

  // Border colors - Alt
  'border-secondary_alt': 'var(--border-color-secondary_alt)',
  'border-brand_alt': 'var(--border-color-brand_alt)',

  // Border colors - Brand
  'border-color-brand': 'var(--border-color-brand)',
  'border-brand': 'var(--border-color-brand)',
  'border-brand-solid': 'var(--border-color-brand-solid)',
  'border-brand-solid_hover': 'var(--border-color-brand-solid_hover)',

  // Border colors - Error
  'border-color-error': 'var(--border-color-error)',
  'border-error': 'var(--border-color-error)',
  'border-color-error_subtle': 'var(--border-color-error_subtle)',
  'border-error_subtle': 'var(--border-color-error_subtle)',

  // Text colors - Primary
  'text-color-primary': 'var(--text-color-primary)',
  'text-primary': 'var(--text-color-primary)',
  'text-color-secondary': 'var(--text-color-secondary)',
  'text-secondary': 'var(--text-color-secondary)',
  'text-color-tertiary': 'var(--text-color-tertiary)',
  'text-tertiary': 'var(--text-color-tertiary)',
  'text-color-quaternary': 'var(--text-color-quaternary)',
  'text-quaternary': 'var(--text-color-quaternary)',
  'text-color-disabled': 'var(--text-color-disabled)',
  'text-disabled': 'var(--text-color-disabled)',
  'text-color-placeholder': 'var(--text-color-placeholder)',
  'text-placeholder': 'var(--text-color-placeholder)',
  'text-color-white': 'var(--text-color-white)',

  // Text colors - Hover
  'text-color-secondary_hover': 'var(--text-color-secondary_hover)',
  'text-secondary_hover': 'var(--text-color-secondary_hover)',
  'text-color-tertiary_hover': 'var(--text-color-tertiary_hover)',
  'text-tertiary_hover': 'var(--text-color-tertiary_hover)',
  'text-color-quaternary_hover': 'var(--text-color-quaternary_hover)',

  // Text colors - Brand
  'text-color-brand-primary': 'var(--text-color-brand-primary)',
  'text-brand-primary': 'var(--text-color-brand-primary)',
  'text-color-brand-secondary': 'var(--text-color-brand-secondary)',
  'text-brand-secondary': 'var(--text-color-brand-secondary)',
  'text-color-brand-secondary_hover': 'var(--text-color-brand-secondary_hover)',
  'text-brand-secondary_hover': 'var(--text-color-brand-secondary_hover)',
  'text-color-brand-secondary_alt': 'var(--text-color-brand-secondary_alt)',
  'text-color-brand-tertiary': 'var(--text-color-brand-tertiary)',
  'text-brand-tertiary': 'var(--text-color-brand-tertiary)',
  'text-brand-tertiary_alt': 'var(--text-color-brand-tertiary_alt)',

  // Text colors - On Brand
  'text-color-primary_on-brand': 'var(--text-color-primary_on-brand)',
  'text-primary_on-brand': 'var(--text-color-primary_on-brand)',
  'text-secondary_on-brand': 'var(--text-color-secondary_on-brand)',
  'text-tertiary_on-brand': 'var(--text-color-tertiary_on-brand)',
  'text-quaternary_on-brand': 'var(--text-color-quaternary_on-brand)',

  // Text colors - Button specific
  'button-primary-icon': 'var(--text-color-button-primary-fg)',
  'button-primary-icon_hover': 'var(--text-color-button-primary-fg_hover)',
  'button-destructive-primary-icon': 'var(--text-color-button-destructive-primary-fg)',
  'button-destructive-primary-icon_hover': 'var(--text-color-button-destructive-primary-fg_hover)',
  'text-color-button-primary-fg': 'var(--text-color-button-primary-fg)',
  'text-color-button-primary-fg_hover': 'var(--text-color-button-primary-fg_hover)',
  'text-color-button-destructive-primary-fg': 'var(--text-color-button-destructive-primary-fg)',
  'text-color-button-destructive-primary-fg_hover': 'var(--text-color-button-destructive-primary-fg_hover)',

  // Foreground colors
  'fg-quaternary': 'var(--text-color-quaternary)',
  'fg-quaternary_hover': 'var(--text-color-quaternary_hover)',
  'fg-error-secondary': 'var(--text-color-error-secondary)',
  'fg-error-primary': 'var(--text-color-error-primary)',
  'fg-brand-secondary_alt': 'var(--text-color-brand-secondary_alt)',
  'fg-brand-secondary_hover': 'var(--text-color-brand-secondary_hover)',
  'fg-primary': 'var(--text-color-primary)',
  'fg-secondary': 'var(--text-color-secondary)',
  'fg-tertiary': 'var(--text-color-tertiary)',
  'fg-disabled': 'var(--text-color-disabled)',
  'fg-placeholder': 'var(--text-color-placeholder)',
  'fg-white': 'var(--text-color-white)',
  'fg-brand-primary': 'var(--text-color-brand-primary)',
  'fg-brand-secondary': 'var(--text-color-brand-secondary)',
  'fg-brand-tertiary': 'var(--text-color-brand-tertiary)',
  'fg-primary_on-brand': 'var(--text-color-primary_on-brand)',
  'fg-secondary_on-brand': 'var(--text-color-secondary_on-brand)',
  'fg-tertiary_on-brand': 'var(--text-color-tertiary_on-brand)',
  'fg-quaternary_on-brand': 'var(--text-color-quaternary_on-brand)',
  'fg-success-primary': 'var(--text-color-success-primary)',
  'fg-warning-primary': 'var(--text-color-warning-primary)',

  // Text colors - Status
  'text-color-error-primary': 'var(--text-color-error-primary)',
  'text-error-primary': 'var(--text-color-error-primary)',
  'text-color-error-primary_hover': 'var(--text-color-error-primary_hover)',
  'text-error-primary_hover': 'var(--text-color-error-primary_hover)',
  'text-color-error-secondary': 'var(--text-color-error-secondary)',
  'text-color-warning-primary': 'var(--text-color-warning-primary)',
  'text-warning-primary': 'var(--text-color-warning-primary)',
  'text-color-success-primary': 'var(--text-color-success-primary)',
  'text-success-primary': 'var(--text-color-success-primary)',

  // Outline colors
  'outline-color-brand': 'var(--outline-color-brand)',
  'outline-color-primary': 'var(--outline-color-primary)',
  'outline-color-error': 'var(--outline-color-error)',

  // Utility colors - Gray
  'utility-gray-50': 'var(--color-utility-gray-50)',
  'utility-gray-100': 'var(--color-utility-gray-100)',
  'utility-gray-200': 'var(--color-utility-gray-200)',
  'utility-gray-300': 'var(--color-utility-gray-300)',
  'utility-gray-400': 'var(--color-utility-gray-400)',
  'utility-gray-500': 'var(--color-utility-gray-500)',
  'utility-gray-600': 'var(--color-utility-gray-600)',
  'utility-gray-700': 'var(--color-utility-gray-700)',
  'utility-gray-800': 'var(--color-utility-gray-800)',
  'utility-gray-900': 'var(--color-utility-gray-900)',

  // Utility colors - Brand
  'utility-brand-50': 'var(--color-utility-brand-50)',
  'utility-brand-100': 'var(--color-utility-brand-100)',
  'utility-brand-200': 'var(--color-utility-brand-200)',
  'utility-brand-300': 'var(--color-utility-brand-300)',
  'utility-brand-400': 'var(--color-utility-brand-400)',
  'utility-brand-500': 'var(--color-utility-brand-500)',
  'utility-brand-600': 'var(--color-utility-brand-600)',
  'utility-brand-700': 'var(--color-utility-brand-700)',
  'utility-brand-800': 'var(--color-utility-brand-800)',
  'utility-brand-900': 'var(--color-utility-brand-900)',

  // Utility colors - Blue
  'utility-blue-50': 'var(--color-utility-blue-50)',
  'utility-blue-100': 'var(--color-utility-blue-100)',
  'utility-blue-200': 'var(--color-utility-blue-200)',
  'utility-blue-300': 'var(--color-utility-blue-300)',
  'utility-blue-400': 'var(--color-utility-blue-400)',
  'utility-blue-500': 'var(--color-utility-blue-500)',
  'utility-blue-600': 'var(--color-utility-blue-600)',
  'utility-blue-700': 'var(--color-utility-blue-700)',

  // Utility colors - Success
  'utility-success-50': 'var(--color-utility-success-50)',
  'utility-success-100': 'var(--color-utility-success-100)',
  'utility-success-200': 'var(--color-utility-success-200)',
  'utility-success-300': 'var(--color-utility-success-300)',
  'utility-success-400': 'var(--color-utility-success-400)',
  'utility-success-500': 'var(--color-utility-success-500)',
  'utility-success-600': 'var(--color-utility-success-600)',
  'utility-success-700': 'var(--color-utility-success-700)',

  // Utility colors - Warning
  'utility-warning-50': 'var(--color-utility-warning-50)',
  'utility-warning-100': 'var(--color-utility-warning-100)',
  'utility-warning-200': 'var(--color-utility-warning-200)',
  'utility-warning-300': 'var(--color-utility-warning-300)',
  'utility-warning-400': 'var(--color-utility-warning-400)',
  'utility-warning-500': 'var(--color-utility-warning-500)',
  'utility-warning-600': 'var(--color-utility-warning-600)',
  'utility-warning-700': 'var(--color-utility-warning-700)',

  // Utility colors - Error
  'utility-error-50': 'var(--color-utility-error-50)',
  'utility-error-100': 'var(--color-utility-error-100)',
  'utility-error-200': 'var(--color-utility-error-200)',
  'utility-error-300': 'var(--color-utility-error-300)',
  'utility-error-400': 'var(--color-utility-error-400)',
  'utility-error-500': 'var(--color-utility-error-500)',
  'utility-error-600': 'var(--color-utility-error-600)',
  'utility-error-700': 'var(--color-utility-error-700)',

  // Utility colors - Indigo
  'utility-indigo-50': 'var(--color-utility-indigo-50)',
  'utility-indigo-100': 'var(--color-utility-indigo-100)',
  'utility-indigo-200': 'var(--color-utility-indigo-200)',
  'utility-indigo-300': 'var(--color-utility-indigo-300)',
  'utility-indigo-400': 'var(--color-utility-indigo-400)',
  'utility-indigo-500': 'var(--color-utility-indigo-500)',
  'utility-indigo-600': 'var(--color-utility-indigo-600)',
  'utility-indigo-700': 'var(--color-utility-indigo-700)',

  // Utility colors - Purple
  'utility-purple-50': 'var(--color-utility-purple-50)',
  'utility-purple-100': 'var(--color-utility-purple-100)',
  'utility-purple-200': 'var(--color-utility-purple-200)',
  'utility-purple-300': 'var(--color-utility-purple-300)',
  'utility-purple-400': 'var(--color-utility-purple-400)',
  'utility-purple-500': 'var(--color-utility-purple-500)',
  'utility-purple-600': 'var(--color-utility-purple-600)',
  'utility-purple-700': 'var(--color-utility-purple-700)',

  // Utility colors - Orange
  'utility-orange-50': 'var(--color-utility-orange-50)',
  'utility-orange-100': 'var(--color-utility-orange-100)',
  'utility-orange-200': 'var(--color-utility-orange-200)',
  'utility-orange-300': 'var(--color-utility-orange-300)',
  'utility-orange-400': 'var(--color-utility-orange-400)',
  'utility-orange-500': 'var(--color-utility-orange-500)',
  'utility-orange-600': 'var(--color-utility-orange-600)',
  'utility-orange-700': 'var(--color-utility-orange-700)',

  // Special values
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
}

// =============================================================================
// GRADIENT BORDER PRESETS
// =============================================================================

export const GRADIENT_BORDER_PRESETS: Record<string, GradientConfig | null> = {
  none: null,

  // Shine effect on diagonal corners
  'shine-corners': {
    type: 'linear',
    colors: ['border-primary'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.7, 0.45, 0.7, 1.0],
  },

  // Glow on edges, fade in middle
  'edge-glow': {
    type: 'linear',
    colors: ['border-primary'],
    angle: 1,
    stops: [0, 25, 50, 75, 100],
    opacities: [1, 0.3, 0, 0.3, 1],
  },

  // Corner glow variants
  'corner-tl-br-5': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 45,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.7, 0.45, 0.7, 1.0],
  },

  'corner-tr-bl-5': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.7, 0.45, 0.7, 1.0],
  },
}

// =============================================================================
// BACKGROUND GRADIENT PRESETS
// =============================================================================

export const BACKGROUND_GRADIENT_PRESETS: Record<string, GradientConfig | null> = {
  none: null,

  // Theme-adaptive depth presets (fg-secondary)
  'depth-3': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-5': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-8': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-10': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-12': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-15': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-20': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-25': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-30': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },

  // Directional depth presets - 3% intensity
  'depth-3-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },
  'depth-3-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.015, 0.03] },

  // Directional depth presets - 5% intensity
  'depth-5-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },
  'depth-5-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.025, 0.05] },

  // Directional depth presets - 8% intensity
  'depth-8-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },
  'depth-8-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.04, 0.08] },

  // Directional depth presets - 10% intensity
  'depth-10-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },
  'depth-10-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.05, 0.10] },

  // Directional depth presets - 12% intensity
  'depth-12-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },
  'depth-12-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.06, 0.12] },

  // Directional depth presets - 15% intensity
  'depth-15-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },
  'depth-15-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.075, 0.15] },

  // Directional depth presets - 20% intensity
  'depth-20-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },
  'depth-20-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.10, 0.20] },

  // Directional depth presets - 25% intensity
  'depth-25-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },
  'depth-25-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.125, 0.25] },

  // Directional depth presets - 30% intensity
  'depth-30-top-left': { type: 'linear', colors: ['fg-secondary'], angle: 238, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-bottom-right': { type: 'linear', colors: ['fg-secondary'], angle: 58, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-top-right': { type: 'linear', colors: ['fg-secondary'], angle: 315, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-bottom-left': { type: 'linear', colors: ['fg-secondary'], angle: 135, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-top': { type: 'linear', colors: ['fg-secondary'], angle: 270, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-bottom': { type: 'linear', colors: ['fg-secondary'], angle: 90, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-left': { type: 'linear', colors: ['fg-secondary'], angle: 180, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
  'depth-30-right': { type: 'linear', colors: ['fg-secondary'], angle: 0, stops: [0, 50, 100], opacities: [0.0, 0.15, 0.30] },
}
