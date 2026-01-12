/**
 * Base UI Menu - Configuration & Constants
 *
 * Default values, animation presets, and styling configuration.
 *
 * @module base-ui/menu/config
 */

import React from 'react'

import type {
  MenuVariant,
  MenuSide,
  MenuAlign,
  RevealAnimationConfig,
  HeightTransitionConfig,
  SlideTransitionConfig,
  MenuAppearanceConfig,
  MenuGradientPattern,
  MenuGradientColor,
  MenuBackgroundColor,
  MenuBorderRadius,
  MenuShadow,
  MenuBorderStyle,
} from './types'

// Gradient utilities - inlined for demo-repo
const GRADIENT_COLORS: Record<string, string> = {
  brand: 'var(--color-brand-primary)',
  primary: 'var(--text-color-primary)',
  secondary: 'var(--text-color-secondary)',
  tertiary: 'var(--text-color-tertiary)',
  gray: 'var(--color-gray-500)',
  'gray-light': 'var(--color-gray-300)',
  'inverted-primary': 'var(--text-color-inverted-primary)',
  'inverted-secondary': 'var(--text-color-inverted-secondary)',
  'inverted-tertiary': 'var(--text-color-inverted-tertiary)',
  'inverted-quaternary': 'var(--text-color-inverted-quaternary)',
  success: 'var(--color-success-500)',
  error: 'var(--color-error-500)',
  warning: 'var(--color-warning-500)',
  'chart-1': 'var(--color-chart-1)',
  'chart-2': 'var(--color-chart-2)',
  'chart-3': 'var(--color-chart-3)',
  'chart-4': 'var(--color-chart-4)',
}

type GradientColorKey = keyof typeof GRADIENT_COLORS
type GradientPatternKey = MenuGradientPattern

function getGradientStyles(pattern: GradientPatternKey, color: GradientColorKey): React.CSSProperties {
  if (pattern === 'none') return {}
  const colorValue = GRADIENT_COLORS[color as string] || GRADIENT_COLORS.secondary
  const isInverse = pattern.includes('inverse')
  const direction = isInverse ? 'to top' : 'to bottom'
  return {
    backgroundImage: `linear-gradient(${direction}, transparent, ${colorValue}10)`,
  }
}

// ============================================================================
// Easing Presets
// ============================================================================

/**
 * Common easing functions for menu animations
 */
export const EASING_PRESETS = {
  /** Linear - no acceleration */
  linear: 'linear',
  /** Standard ease-out */
  easeOut: 'ease-out',
  /** Standard ease-in-out */
  easeInOut: 'ease-in-out',
  /** Expo ease-out - smooth, premium feel */
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Back ease-out - slight overshoot, playful */
  backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Material Design standard */
  materialStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Quad ease-in-out - gentle */
  quadInOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  /** Slide overshoot - smooth slide with subtle overshoot for panel navigation */
  slideOvershoot: 'cubic-bezier(0.22, 1.2, 0.01, 1)',
  /** Height overshoot - smooth height transition with subtle overshoot for menu level changes */
  heightOvershoot: 'cubic-bezier(0.28, 1.2, 0.1, 1)',
} as const

// ============================================================================
// Animation Defaults
// ============================================================================

/**
 * Default reveal animation configuration
 */
export const DEFAULT_REVEAL_CONFIG: RevealAnimationConfig = {
  duration: 300,
  easing: EASING_PRESETS.expoOut,
  direction: 'bottom',
  scaleStart: 0.15,
  scaleEnd: 1,
  contentAnimation: 'fade',
  contentDelay: 0,
  loop: false,
}

/**
 * Default height transition configuration
 * Matches old dropdown timing for snappy feel
 */
export const DEFAULT_HEIGHT_TRANSITION: HeightTransitionConfig = {
  duration: 300,
  easing: 'cubic-bezier(0.2, 1.2, 0.1, 1)', // heightOvershoot from old dropdown
}

/**
 * Alternative height transitions for different use cases
 */
export const HEIGHT_TRANSITION_PRESETS = {
  fast: { duration: 150, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  default: { duration: 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  smooth: { duration: 280, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  bouncy: { duration: 350, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
} as const

/**
 * Default slide transition configuration
 * Matches old dropdown timing for snappy feel
 */
export const DEFAULT_SLIDE_TRANSITION: SlideTransitionConfig = {
  duration: 300,
  easing: 'cubic-bezier(0.25, 1.2, 0.01, 1)', // slideOvershoot from old dropdown
}

/**
 * Duration for the close animation
 */
export const CLOSE_ANIMATION_DURATION = 200

/**
 * Buffer time after close animation before resetting state
 */
export const STATE_RESET_DELAY = 250

// ============================================================================
// Variant Configuration
// ============================================================================

/**
 * Item height classes by variant
 */
export const ITEM_HEIGHT_CLASSES: Record<MenuVariant, string> = {
  compact: 'min-h-8 text-sm',
  default: 'min-h-9 text-sm',
  spacious: 'min-h-10 text-base',
}

// ============================================================================
// Dynamic Border Radius Calculation
// ============================================================================

/**
 * Border radius values in pixels
 * Used to calculate item radius: container radius - padding
 */
export const BORDER_RADIUS_PX: Record<MenuBorderRadius, number> = {
  none: 0,
  sm: 2,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 24,
}

/**
 * Padding values in pixels by variant
 * Used to calculate item radius: container radius - padding
 */
export const PADDING_PX: Record<MenuVariant, number> = {
  compact: 4,
  default: 4,
  spacious: 8,
}

/**
 * Calculate the item border radius based on container radius and padding
 * Formula: item radius = container radius - padding
 * Ensures minimum of 0 to prevent negative values
 */
export function calculateItemRadius(
  containerRadius: MenuBorderRadius,
  variant: MenuVariant
): number {
  const radiusPx = BORDER_RADIUS_PX[containerRadius]
  const paddingPx = PADDING_PX[variant]
  return Math.max(0, radiusPx - paddingPx)
}

/**
 * Icon sizes by variant (in pixels)
 */
export const ICON_SIZES: Record<MenuVariant, number> = {
  compact: 14,
  default: 16,
  spacious: 20,
}

/**
 * Content padding by variant
 */
export const CONTENT_PADDING: Record<MenuVariant, string> = {
  compact: 'p-1',
  default: 'p-1.5',
  spacious: 'p-2',
}

// ============================================================================
// Transform Origin Configuration
// ============================================================================

/**
 * Transform origin mapping based on side and align
 */
export const TRANSFORM_ORIGINS: Record<MenuSide, Record<MenuAlign, string>> = {
  top: {
    start: 'bottom left',
    center: 'bottom center',
    end: 'bottom right',
  },
  bottom: {
    start: 'top left',
    center: 'top center',
    end: 'top right',
  },
  left: {
    start: 'top right',
    center: 'center right',
    end: 'bottom right',
  },
  right: {
    start: 'top left',
    center: 'center left',
    end: 'bottom left',
  },
}

/**
 * Get transform origin for a given side and align combination
 */
export function getTransformOrigin(side: MenuSide, align: MenuAlign): string {
  return TRANSFORM_ORIGINS[side][align]
}

// ============================================================================
// Default Props
// ============================================================================

/**
 * Default menu props
 */
export const DEFAULT_MENU_PROPS = {
  align: 'start' as MenuAlign,
  side: 'bottom' as MenuSide,
  width: 200,
  variant: 'default' as MenuVariant,
  sideOffset: 8,
  collisionPadding: 8,
} as const

// ============================================================================
// Appearance Configuration
// ============================================================================

/**
 * Default appearance configuration
 * These values match the playground defaults (Preset 1)
 */
export const DEFAULT_APPEARANCE: Required<MenuAppearanceConfig> = {
  backgroundColor: 'primary',
  gradient: 'subtle-depth-md',
  gradientColor: 'secondary',
  borderRadius: '2xl',
  shadow: 'lg',
  border: 'shine-1',
  cornerSquircle: true,
}

/**
 * CSS class mappings for appearance props
 */
export const APPEARANCE_CLASS_MAP = {
  backgroundColor: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    quaternary: 'bg-quaternary',
    white: 'bg-white',
    black: 'bg-black',
  } as Record<MenuBackgroundColor, string>,

  gradient: {
    none: '',
    'subtle-depth-sm': 'bg-gradient-subtle-depth-sm',
    'subtle-depth-md': 'bg-gradient-subtle-depth-md',
    'subtle-depth-lg': 'bg-gradient-subtle-depth-lg',
    'subtle-depth-xl': 'bg-gradient-subtle-depth-xl',
    'subtle-depth-sm-inverse': 'bg-gradient-subtle-depth-sm-inverse',
    'subtle-depth-md-inverse': 'bg-gradient-subtle-depth-md-inverse',
    'subtle-depth-lg-inverse': 'bg-gradient-subtle-depth-lg-inverse',
    'subtle-depth-xl-inverse': 'bg-gradient-subtle-depth-xl-inverse',
  } as Record<MenuGradientPattern, string>,

  gradientColor: {
    brand: 'gradient-color-brand',
    primary: 'gradient-color-primary',
    secondary: 'gradient-color-secondary',
    tertiary: 'gradient-color-tertiary',
    gray: 'gradient-color-gray',
    'gray-light': 'gradient-color-gray-light',
    'inverted-primary': 'gradient-color-inverted-primary',
    'inverted-secondary': 'gradient-color-inverted-secondary',
    'inverted-tertiary': 'gradient-color-inverted-tertiary',
    'inverted-quaternary': 'gradient-color-inverted-quaternary',
    success: 'gradient-color-success',
    error: 'gradient-color-error',
    warning: 'gradient-color-warning',
    'chart-1': 'gradient-color-chart-1',
    'chart-2': 'gradient-color-chart-2',
    'chart-3': 'gradient-color-chart-3',
    'chart-4': 'gradient-color-chart-4',
  } as Record<MenuGradientColor, string>,

  borderRadius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-3xl',
  } as Record<MenuBorderRadius, string>,

  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  } as Record<MenuShadow, string>,

  border: {
    none: '',
    default: 'ring-1 ring-primary',
    // Shine 0 variants
    'shine-0': 'shine-0',
    'shine-0-subtle': 'shine-0-subtle',
    'shine-0-intense': 'shine-0-intense',
    // Shine 1 variants
    'shine-1': 'shine-1',
    'shine-1-subtle': 'shine-1-subtle',
    'shine-1-intense': 'shine-1-intense',
    // Shine 2 variants
    'shine-2': 'shine-2',
    'shine-2-subtle': 'shine-2-subtle',
    'shine-2-intense': 'shine-2-intense',
    // Shine 3 variants
    'shine-3': 'shine-3',
    'shine-3-subtle': 'shine-3-subtle',
    'shine-3-intense': 'shine-3-intense',
    // Brand variants
    'shine-brand': 'shine-brand',
    'shine-brand-subtle': 'shine-brand-subtle',
    'shine-brand-intense': 'shine-brand-intense',
  } as Record<MenuBorderStyle, string>,
} as const

/**
 * CSS variable mappings for inline style fallbacks
 */
export const BACKGROUND_COLOR_CSS_VAR_MAP: Record<MenuBackgroundColor, string> = {
  primary: 'var(--background-color-primary)',
  secondary: 'var(--background-color-secondary)',
  tertiary: 'var(--background-color-tertiary)',
  quaternary: 'var(--background-color-quaternary)',
  white: '#ffffff',
  black: '#000000',
}

// ============================================================================
// Inline Gradient Generation (re-exports from shared utility)
// ============================================================================

// Re-export for backwards compatibility
export const GRADIENT_COLOR_CSS_VAR_MAP = GRADIENT_COLORS as Record<MenuGradientColor, string>

/**
 * Combined shine + shadow classes
 * Shine uses box-shadow, so we need combined utilities to have both
 * Available shadow sizes: xs, sm, md, lg (xl/2xl fall back to lg)
 */
const SHINE_SHADOW_COMBINED: Record<string, Record<string, string>> = {
  'shine-0': { xs: 'shine-0-shadow-xs', sm: 'shine-0-shadow-sm', md: 'shine-0-shadow-md', lg: 'shine-0-shadow-lg' },
  'shine-0-subtle': { xs: 'shine-0-subtle-shadow-xs', sm: 'shine-0-subtle-shadow-sm', md: 'shine-0-subtle-shadow-md', lg: 'shine-0-subtle-shadow-lg' },
  'shine-0-intense': { xs: 'shine-0-intense-shadow-xs', sm: 'shine-0-intense-shadow-sm', md: 'shine-0-intense-shadow-md', lg: 'shine-0-intense-shadow-lg' },
  'shine-1': { xs: 'shine-1-shadow-xs', sm: 'shine-1-shadow-sm', md: 'shine-1-shadow-md', lg: 'shine-1-shadow-lg' },
  'shine-1-subtle': { xs: 'shine-1-subtle-shadow-xs', sm: 'shine-1-subtle-shadow-sm', md: 'shine-1-subtle-shadow-md', lg: 'shine-1-subtle-shadow-lg' },
  'shine-1-intense': { xs: 'shine-1-intense-shadow-xs', sm: 'shine-1-intense-shadow-sm', md: 'shine-1-intense-shadow-md', lg: 'shine-1-intense-shadow-lg' },
  'shine-2': { xs: 'shine-2-shadow-xs', sm: 'shine-2-shadow-sm', md: 'shine-2-shadow-md', lg: 'shine-2-shadow-lg' },
  'shine-2-subtle': { xs: 'shine-2-subtle-shadow-xs', sm: 'shine-2-subtle-shadow-sm', md: 'shine-2-subtle-shadow-md', lg: 'shine-2-subtle-shadow-lg' },
  'shine-2-intense': { xs: 'shine-2-intense-shadow-xs', sm: 'shine-2-intense-shadow-sm', md: 'shine-2-intense-shadow-md', lg: 'shine-2-intense-shadow-lg' },
  'shine-3': { xs: 'shine-3-shadow-xs', sm: 'shine-3-shadow-sm', md: 'shine-3-shadow-md', lg: 'shine-3-shadow-lg' },
  'shine-3-subtle': { xs: 'shine-3-subtle-shadow-xs', sm: 'shine-3-subtle-shadow-sm', md: 'shine-3-subtle-shadow-md', lg: 'shine-3-subtle-shadow-lg' },
  'shine-3-intense': { xs: 'shine-3-intense-shadow-xs', sm: 'shine-3-intense-shadow-sm', md: 'shine-3-intense-shadow-md', lg: 'shine-3-intense-shadow-lg' },
  'shine-brand': { xs: 'shine-brand-shadow-xs', sm: 'shine-brand-shadow-sm', md: 'shine-brand-shadow-md', lg: 'shine-brand-shadow-lg' },
  'shine-brand-subtle': { xs: 'shine-brand-subtle-shadow-xs', sm: 'shine-brand-subtle-shadow-sm', md: 'shine-brand-subtle-shadow-md', lg: 'shine-brand-subtle-shadow-lg' },
  'shine-brand-intense': { xs: 'shine-brand-intense-shadow-xs', sm: 'shine-brand-intense-shadow-sm', md: 'shine-brand-intense-shadow-md', lg: 'shine-brand-intense-shadow-lg' },
}

/**
 * Generate appearance classes from config
 * Merges provided config with defaults
 *
 * Note: Gradient classes are NOT added here because CSS custom properties
 * don't work correctly with nested var() references. Gradients are generated
 * inline via getAppearanceStyle() instead.
 */
export function getAppearanceClasses(config?: MenuAppearanceConfig): string {
  const merged = { ...DEFAULT_APPEARANCE, ...config }

  const classes: string[] = []

  // Background color
  classes.push(APPEARANCE_CLASS_MAP.backgroundColor[merged.backgroundColor])

  // Note: Gradient classes removed - handled via inline styles in getAppearanceStyle()
  // This is required because CSS custom property scoping doesn't work with nested var()

  // Border radius
  classes.push(APPEARANCE_CLASS_MAP.borderRadius[merged.borderRadius])

  // Handle shine + shadow combination (both use box-shadow, so need combined class)
  const isShine = merged.border.startsWith('shine-')
  const hasShadow = merged.shadow !== 'none'

  if (isShine && hasShadow) {
    // Use combined shine-shadow class
    const shineCombined = SHINE_SHADOW_COMBINED[merged.border]
    // Map xl/2xl to lg since combined classes only go up to lg
    const shadowSize = merged.shadow === 'xl' || merged.shadow === '2xl' ? 'lg' : merged.shadow
    if (shineCombined && shineCombined[shadowSize]) {
      classes.push(shineCombined[shadowSize])
    } else {
      // Fallback: just use shine (no shadow)
      classes.push(APPEARANCE_CLASS_MAP.border[merged.border])
    }
  } else {
    // No conflict - add separately
    if (hasShadow) {
      classes.push(APPEARANCE_CLASS_MAP.shadow[merged.shadow])
    }
    if (merged.border !== 'none') {
      classes.push(APPEARANCE_CLASS_MAP.border[merged.border])
    }
  }

  // Corner squircle
  if (merged.cornerSquircle) {
    classes.push('corner-squircle')
  }

  return classes.filter(Boolean).join(' ')
}

/**
 * Get inline style for appearance
 * Generates gradient inline to work around CSS custom property scoping issues
 */
export function getAppearanceStyle(config?: MenuAppearanceConfig): React.CSSProperties {
  const merged = { ...DEFAULT_APPEARANCE, ...config }

  const styles: React.CSSProperties = {}

  // Always set background color when gradient is enabled
  if (merged.gradient !== 'none') {
    styles.backgroundColor = BACKGROUND_COLOR_CSS_VAR_MAP[merged.backgroundColor]

    // Use shared gradient utility to generate inline gradient
    // This bypasses CSS custom property scoping issues
    const gradientStyles = getGradientStyles(
      merged.gradient as GradientPatternKey,
      merged.gradientColor as GradientColorKey
    )
    Object.assign(styles, gradientStyles)
  }

  return styles
}
