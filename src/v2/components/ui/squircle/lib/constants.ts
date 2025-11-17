import { type CustomShadowConfig, type GradientBorderConfig, type RoundnessConfig } from '../types'

// V2 Semantic Colors Map - Complete set from v2 design system
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
  // SVG fill fallback: Use direct color when CSS vars don't resolve in SVG context
  'background-color-error-solid': 'rgb(217 45 32)', // fallback from var(--background-color-error-solid)
  'background-error-solid': 'rgb(217 45 32)', // fallback from var(--background-color-error-solid)
  'background-color-error-solid_hover': 'rgb(186 38 27)', // fallback from var(--background-color-error-solid_hover)

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

  // Text colors - Button specific (Untitled UI tokens)
  'button-primary-icon': 'var(--text-color-button-primary-fg)',
  'button-primary-icon_hover': 'var(--text-color-button-primary-fg_hover)',
  'button-destructive-primary-icon': 'var(--text-color-button-destructive-primary-fg)',
  'button-destructive-primary-icon_hover': 'var(--text-color-button-destructive-primary-fg_hover)',
  'text-color-button-primary-fg': 'var(--text-color-button-primary-fg)',
  'text-color-button-primary-fg_hover': 'var(--text-color-button-primary-fg_hover)',
  'text-color-button-destructive-primary-fg': 'var(--text-color-button-destructive-primary-fg)',
  'text-color-button-destructive-primary-fg_hover': 'var(--text-color-button-destructive-primary-fg_hover)',

  // Text colors - Foreground (fg) tokens used by buttons
  'fg-quaternary': 'var(--text-color-quaternary)',
  'fg-quaternary_hover': 'var(--text-color-quaternary_hover)',
  'fg-error-secondary': 'var(--text-color-error-secondary)',
  'fg-error-primary': 'var(--text-color-error-primary)',
  'fg-brand-secondary_alt': 'var(--text-color-brand-secondary_alt)',
  'fg-brand-secondary_hover': 'var(--text-color-brand-secondary_hover)',

  // Foreground colors - Full set for border/stroke usage (darker versions)
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

  // Utility colors - Brand
  'utility-brand-50': 'var(--color-utility-brand-50)',
  'utility-brand-100': 'var(--color-utility-brand-100)',
  'utility-brand-200': 'var(--color-utility-brand-200)',
  'utility-brand-300': 'var(--color-utility-brand-300)',
  'utility-brand-400': 'var(--color-utility-brand-400)',
  'utility-brand-500': 'var(--color-utility-brand-500)',
  'utility-brand-600': 'var(--color-utility-brand-600)',
  'utility-brand-700': 'var(--color-utility-brand-700)',

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

// Enhanced Roundness configuration
export const ROUNDNESS_LEVELS: Record<0 | 1 | 2 | 3 | 4 | 5, RoundnessConfig> = {
  0: { smoothing: 10.0, borderRadius: 20, pointsPerCorner: 60, performance: 'smooth', adaptiveQuality: true }, // Custom level
  1: { smoothing: 9.5, borderRadius: 29, pointsPerCorner: 55, performance: 'balanced', adaptiveQuality: true }, // Default - optimized
  2: { smoothing: 5.0, borderRadius: 30, pointsPerCorner: 45, performance: 'balanced', adaptiveQuality: false },
  3: { smoothing: 5.5, borderRadius: 50, pointsPerCorner: 50, performance: 'balanced', adaptiveQuality: false },
  4: { smoothing: 5.0, borderRadius: 80, pointsPerCorner: 40, performance: 'high', adaptiveQuality: false },
  5: { smoothing: 3.0, borderRadius: 90, pointsPerCorner: 40, performance: 'high', adaptiveQuality: false },
}

// Shadow presets
// NOTE: Only 'xs' and 'sm' are enabled to prevent clipping issues with parent container
// Larger shadows (md, lg, xl, 2xl) get clipped and are disabled
export const SHADOW_PRESETS: Record<string, CustomShadowConfig> = {
  none: { offsetX: 0, offsetY: 0, blur: 0, spread: 0, color: 'black', opacity: 0 },
  xs: { offsetX: 0, offsetY: 2, blur: 2, spread: 0, color: 'black', opacity: 0.09 }, // Extra subtle (matches Tailwind shadow-xs)
  sm: { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: 'black', opacity: 0.08 }, // Subtle
  // Disabled due to parent container clipping - use xs or sm only
  // md: { offsetX: 0, offsetY: 4, blur: 8, spread: 0, color: 'black', opacity: 0.15 },
  // lg: { offsetX: 0, offsetY: 8, blur: 16, spread: 0, color: 'black', opacity: 0.2 },
  // xl: { offsetX: 0, offsetY: 12, blur: 24, spread: 0, color: 'black', opacity: 0.25 },
  // '2xl': { offsetX: 0, offsetY: 20, blur: 40, spread: 0, color: 'black', opacity: 0.3 },
}

// Animation classes mapping
export const ANIMATION_CLASSES = {
  none: '',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  fade: 'transition-opacity',
  scale: 'transition-transform',
}

// Animation duration classes
export const DURATION_CLASSES = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
}

// Gradient border presets
export const GRADIENT_BORDER_PRESETS: Record<string, GradientBorderConfig | null> = {
  none: null,

  // Linear gradient: Edges visible, middle invisible
  'radial-edge-glow': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 1,
    opacities: [1, 0, 0, 0, 1],
    startOpacity: 1,
    middleOpacity: 0,
    endOpacity: 1,
  },

  // Corner glow TL-BR variants (Top-left to bottom-right diagonal at 45°)
  'corner-tl-br-1': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 45,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0, 0, 0, 1.0],
  },

  'corner-tl-br-2': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 45,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.28, 0, 0.28, 1.0],
  },

  'corner-tl-br-3': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 45,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.41, 0, 0.41, 1.0],
  },

  'corner-tl-br-4': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 45,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.45, 0.15, 0.45, 1.0],
  },

  'corner-tl-br-5': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 45,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.7, 0.45, 0.7, 1.0],
  },

  // Corner glow TR-BL variants (Top-right to bottom-left diagonal at 135°)
  'corner-tr-bl-1': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0, 0, 0, 1.0],
  },

  'corner-tr-bl-2': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.28, 0, 0.28, 1.0],
  },

  'corner-tr-bl-3': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.41, 0, 0.41, 1.0],
  },

  'corner-tr-bl-4': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.45, 0.15, 0.45, 1.0],
  },

  'corner-tr-bl-5': {
    type: 'linear',
    colors: ['border-brand'],
    angle: 135,
    stops: [0, 25, 50, 75, 100],
    opacities: [1.0, 0.7, 0.45, 0.7, 1.0],
  },
}

// Background gradient presets
// NOTE: Background gradients work as OVERLAY layers on top of backgroundColor
// Use opacity to control how much of the base backgroundColor shows through
// The overlay color defaults to 'background-primary' for semantic token support
export const BACKGROUND_GRADIENT_PRESETS: Record<string, GradientBorderConfig | null> = {
  none: null,

  // Subtle depth gradient - Small (Lighter)
  // Very subtle depth effect, barely noticeable shadow-like appearance
  'subtle-depth-sm': {
    type: 'linear',
    colors: ['background-primary'], // Overlay color (configurable via backgroundGradientOverlayColor)
    angle: 238, // Diagonal direction (top-right to bottom-left)
    stops: [0, 25, 50, 75, 100],
    opacities: [0.03, 0.08, 0.15, 0.22, 0.28], // Minimal overlay intensity
  },

  // Subtle depth gradient - Medium (Balanced) - DEFAULT
  // Works with any base background color (background-brand-solid, background-error-solid, etc.)
  'subtle-depth': {
    type: 'linear',
    colors: ['background-primary'], // Overlay color (configurable via backgroundGradientOverlayColor)
    angle: 238, // Diagonal direction
    stops: [0, 25, 50, 75, 100],
    opacities: [0.09, 0.20, 0.32, 0.44, 0.54], // Balanced overlay intensity
  },

  // Subtle depth gradient - Medium (Balanced) - Explicit naming
  'subtle-depth-md': {
    type: 'linear',
    colors: ['background-primary'], // Overlay color (configurable via backgroundGradientOverlayColor)
    angle: 238, // Diagonal direction
    stops: [0, 25, 50, 75, 100],
    opacities: [0.09, 0.20, 0.32, 0.44, 0.54], // Balanced overlay intensity
  },

  // Subtle depth gradient - Large (Stronger)
  // Dramatic depth with strong shadowing, creates bold dimension
  'subtle-depth-lg': {
    type: 'linear',
    colors: ['background-primary'], // Overlay color (configurable via backgroundGradientOverlayColor)
    angle: 238, // Diagonal direction
    stops: [0, 25, 50, 75, 100],
    opacities: [0.15, 0.32, 0.48, 0.64, 0.80], // Strong overlay intensity
  },
}
