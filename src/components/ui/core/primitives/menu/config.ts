/**
 * Menu - Configuration
 *
 * Default values, styling utilities, and animation configuration.
 * Shared by Menu and all derivative components (FilterMenu, etc.)
 *
 * @module prod/base/menu/config
 */

import type {
  MenuAppearance,
  AnimationConfig,
  BorderRadius,
  Shadow,
  Background,
} from './types'

// ============================================================================
// Z-Index Scale
// ============================================================================

/**
 * Z-index values for menu layering.
 * Centralized here for easy adjustment of stacking contexts.
 */
export const Z_INDEX = {
  /** Menu positioner layer */
  MENU_POSITIONER: 9999,
  /** Menu popup layer */
  MENU_POPUP: 9999,
} as const

// ============================================================================
// Animation Constants
// ============================================================================

/** Expo ease-out for smooth deceleration */
export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

/** Ease-out for opacity transitions */
export const EASING_EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)'

/** Ease-in-out for symmetric transitions */
export const EASING_EASE_IN_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)'

/**
 * Default animation configuration.
 *
 * Uses 'crossfade' mode with smooth timing:
 * - Both panels fade simultaneously
 * - 280ms slide with 220ms fade (~80% overlap)
 * - Symmetric easing for balanced feel
 *
 * @see TRANSITION-ANIMATION.md for mode documentation
 */
export const DEFAULT_ANIMATION: Required<AnimationConfig> = {
  duration: 280,
  easing: EASING_EXPO_OUT,
  animateHeight: true,
  opacityMode: 'crossfade',
  opacityDuration: 220,
  opacityEasing: EASING_EASE_IN_OUT,
  quickOutDuration: 80, // Used by crossfade for faster fade-out + pointer-events delay
  fadeInDelay: 0,
  staggerDelay: 0,
}

/**
 * Previous default - quick-out-fade-in mode.
 * Kept for easy reversion if needed.
 *
 * @deprecated Use DEFAULT_ANIMATION instead
 */
export const PREVIOUS_DEFAULT_ANIMATION: Required<AnimationConfig> = {
  duration: 250,
  easing: EASING_EXPO_OUT,
  animateHeight: true,
  opacityMode: 'quick-out-fade-in',
  opacityDuration: 140,
  opacityEasing: EASING_EASE_OUT,
  quickOutDuration: 0,
  fadeInDelay: 20,
  staggerDelay: 0,
}

// ============================================================================
// Appearance Defaults
// ============================================================================

/** Default appearance configuration (hardened from menu-variants playground) */
export const DEFAULT_APPEARANCE: Required<MenuAppearance> = {
  borderRadius: '2xl',
  shadow: '2xl',
  shine: 'shine-2-subtle',
  background: 'primary',
  gradient: 'subtle-depth-md',
  gradientColor: 'tertiary',
  squircle: true,
}

/** Default menu dimensions */
export const DEFAULT_MENU_WIDTH = 240
export const DEFAULT_SIDE_OFFSET = 6

// ============================================================================
// CSS Class Maps
// ============================================================================

export const BORDER_RADIUS_CLASSES: Record<BorderRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

export const SHADOW_CLASSES: Record<Shadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

export const BACKGROUND_CLASSES: Record<Background, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

/** Combined shine + shadow classes (both use box-shadow) */
const SHINE_SHADOW_MAP: Record<string, Record<string, string>> = {
  'shine-0': { none: 'shine-0', sm: 'shine-0-shadow-sm', md: 'shine-0-shadow-md', lg: 'shine-0-shadow-lg' },
  'shine-0-subtle': { none: 'shine-0-subtle', sm: 'shine-0-subtle-shadow-sm', md: 'shine-0-subtle-shadow-md', lg: 'shine-0-subtle-shadow-lg' },
  'shine-0-intense': { none: 'shine-0-intense', sm: 'shine-0-intense-shadow-sm', md: 'shine-0-intense-shadow-md', lg: 'shine-0-intense-shadow-lg' },
  'shine-1': { none: 'shine-1', sm: 'shine-1-shadow-sm', md: 'shine-1-shadow-md', lg: 'shine-1-shadow-lg' },
  'shine-1-subtle': { none: 'shine-1-subtle', sm: 'shine-1-subtle-shadow-sm', md: 'shine-1-subtle-shadow-md', lg: 'shine-1-subtle-shadow-lg' },
  'shine-1-intense': { none: 'shine-1-intense', sm: 'shine-1-intense-shadow-sm', md: 'shine-1-intense-shadow-md', lg: 'shine-1-intense-shadow-lg' },
  'shine-2': { none: 'shine-2', sm: 'shine-2-shadow-sm', md: 'shine-2-shadow-md', lg: 'shine-2-shadow-lg' },
  'shine-2-subtle': { none: 'shine-2-subtle', sm: 'shine-2-subtle-shadow-sm', md: 'shine-2-subtle-shadow-md', lg: 'shine-2-subtle-shadow-lg' },
  'shine-2-intense': { none: 'shine-2-intense', sm: 'shine-2-intense-shadow-sm', md: 'shine-2-intense-shadow-md', lg: 'shine-2-intense-shadow-lg' },
  'shine-3': { none: 'shine-3', sm: 'shine-3-shadow-sm', md: 'shine-3-shadow-md', lg: 'shine-3-shadow-lg' },
  'shine-3-subtle': { none: 'shine-3-subtle', sm: 'shine-3-subtle-shadow-sm', md: 'shine-3-subtle-shadow-md', lg: 'shine-3-subtle-shadow-lg' },
  'shine-3-intense': { none: 'shine-3-intense', sm: 'shine-3-intense-shadow-sm', md: 'shine-3-intense-shadow-md', lg: 'shine-3-intense-shadow-lg' },
  'shine-brand': { none: 'shine-brand', sm: 'shine-brand-shadow-sm', md: 'shine-brand-shadow-md', lg: 'shine-brand-shadow-lg' },
  'shine-brand-subtle': { none: 'shine-brand-subtle', sm: 'shine-brand-subtle-shadow-sm', md: 'shine-brand-subtle-shadow-md', lg: 'shine-brand-subtle-shadow-lg' },
  'shine-brand-intense': { none: 'shine-brand-intense', sm: 'shine-brand-intense-shadow-sm', md: 'shine-brand-intense-shadow-md', lg: 'shine-brand-intense-shadow-lg' },
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate popup classes from appearance config
 */
export function getPopupClasses(appearance: MenuAppearance): string {
  const merged = { ...DEFAULT_APPEARANCE, ...appearance }
  const classes: string[] = []

  // Background
  classes.push(BACKGROUND_CLASSES[merged.background])

  // Border radius
  classes.push(BORDER_RADIUS_CLASSES[merged.borderRadius])

  // Squircle corners
  if (merged.squircle) {
    classes.push('corner-squircle')
  }

  // Handle shine + shadow combination (both use box-shadow CSS property)
  const hasShine = merged.shine !== 'none'
  const hasShadow = merged.shadow !== 'none'

  if (hasShine && hasShadow) {
    const shineCombos = SHINE_SHADOW_MAP[merged.shine]
    // Map xl/2xl to lg since combined classes only go up to lg
    const shadowKey = merged.shadow === 'xl' || merged.shadow === '2xl' ? 'lg' : merged.shadow
    if (shineCombos?.[shadowKey]) {
      classes.push(shineCombos[shadowKey])
    } else {
      classes.push(merged.shine)
    }
  } else if (hasShine) {
    classes.push(merged.shine)
  } else if (hasShadow) {
    classes.push(SHADOW_CLASSES[merged.shadow])
  }

  return classes.filter(Boolean).join(' ')
}

/**
 * Generate inline gradient styles
 * Creates a subtle depth effect by adding a tinted gradient overlay
 */
export function getGradientStyles(
  appearance: MenuAppearance,
  options?: { confidenceLevel?: number | null }
): React.CSSProperties {
  const merged = { ...DEFAULT_APPEARANCE, ...appearance }
  const confidenceLevel = options?.confidenceLevel

  // Check for low confidence (0 or very low) - apply error gradient
  const isLowConfidence = confidenceLevel !== null && confidenceLevel !== undefined && confidenceLevel <= 0.1

  if (merged.gradient === 'none' && !isLowConfidence) {
    return {}
  }

  // Base RGB values for each gradient color
  // These create depth by adding a subtle tint at the bottom
  const colorRgbMap: Record<string, string> = {
    brand: '124, 58, 237',      // Purple brand color
    primary: '0, 0, 0',         // Black for neutral depth
    secondary: '0, 0, 0',       // Black for neutral depth
    tertiary: '100, 100, 100',  // Gray
    gray: '100, 116, 139',      // Slate gray
    'gray-light': '148, 163, 184', // Light gray
    error: '239, 68, 68',       // Red for low confidence
  }

  // Opacity values for different intensities
  const opacityMap: Record<string, number> = {
    sm: 0.03,
    md: 0.06,
    lg: 0.10,
    xl: 0.15,
  }

  // For low confidence, use error color with subtle gradient
  if (isLowConfidence) {
    const errorRgb = colorRgbMap.error
    // Subtle error gradient from top to bottom
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(${errorRgb}, 0.04) 0%, rgba(${errorRgb}, 0.12) 100%)`,
    }
  }

  const intensity = merged.gradient.replace('subtle-depth-', '')
  const endOpacity = opacityMap[intensity] ?? opacityMap.sm
  const rgb = colorRgbMap[merged.gradientColor ?? 'primary'] ?? colorRgbMap.primary

  // Gradient from transparent at top to tinted at bottom
  return {
    backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(${rgb}, ${endOpacity}) 100%)`,
  }
}

// ============================================================================
// Item Radius Calculation
// ============================================================================

const BORDER_RADIUS_PX: Record<BorderRadius, number> = {
  none: 0,
  sm: 2,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
}

const CONTAINER_PADDING = 4 // px

/**
 * Calculate item border radius based on container radius
 * Formula: item radius = container radius - padding
 */
export function getItemRadius(containerRadius: BorderRadius): number {
  const radiusPx = BORDER_RADIUS_PX[containerRadius]
  return Math.max(0, radiusPx - CONTAINER_PADDING)
}

// ============================================================================
// Reveal Animation Config
// ============================================================================

/**
 * Toggle for legacy animation system.
 *
 * Set to `true` for custom reveal animation (40% scale, dynamic slide offset)
 * via CSS keyframe injection. This matches the design spec exactly.
 *
 * Set to `false` for Tailwind's animate classes (95% scale, 8px slide) -
 * less dramatic but doesn't require runtime CSS injection.
 */
export const USE_LEGACY_ANIMATION = true

/** Reveal animation settings for menu open */
export const REVEAL_ANIMATION = {
  /** Animation duration in ms */
  duration: 200,
  /** Starting scale (0.4 = 40% of final size) */
  scaleStart: 0.4,
  /** Ending scale */
  scaleEnd: 1,
  /** Slide offset multiplier (0.5 = half of sideOffset) */
  slideOffsetRatio: 0.5,
} as const

/**
 * Tailwind animation classes for reveal effect.
 *
 * NOTE: tailwindcss-animate doesn't support our custom animation values
 * (40% scale start, dynamic slide offset based on sideOffset).
 * The standard classes use fixed values (95% scale, 8px slide).
 *
 * For now, we use the legacy CSS keyframe injection which provides
 * the exact animation matching the original design.
 *
 * To switch to legacy animation, set USE_LEGACY_ANIMATION = true above.
 * To use standard Tailwind animations (less dramatic), set it to false.
 */
export const REVEAL_ANIMATION_CLASSES = [
  // Standard Tailwind animate classes (simpler animation)
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:zoom-in-95',
  'data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=bottom]:slide-out-to-top-2',
  'data-[side=top]:slide-in-from-bottom-2',
  'data-[side=top]:slide-out-to-bottom-2',
] as const

/**
 * Get reveal animation classes as an array
 */
export function getRevealAnimationClasses(): readonly string[] {
  return REVEAL_ANIMATION_CLASSES
}

// ============================================================================
// Menu Item Styling
// ============================================================================

/**
 * Core menu item styles - used by all interactive menu items.
 * These ensure consistent alignment between header, back button, and list items.
 *
 * Hardened from menu-variants playground:
 * - iconGap: 8px (gap-2) - standardized for all menu types
 * - iconOpacity: 60% - "subtle" preset default
 */
export const MENU_ITEM_STYLES = {
  /** Horizontal padding for icon alignment (10px) */
  paddingX: 'px-2.5',
  /** Minimum height for consistent rows (36px) */
  minHeight: 'min-h-9',
  /** Gap between icon and text (8px) */
  iconGap: 'gap-2',
  /** Icon size in pixels */
  iconSize: 16,
  /** Icon stroke width */
  iconStrokeWidth: 2,
  /** Icon color class */
  iconColor: 'text-fg-tertiary',
  /** Icon opacity (60% = subtle preset) */
  iconOpacity: 'opacity-60',
  /** Text size */
  textSize: 'text-sm',
  /** Text weight */
  textWeight: 'font-medium',
} as const

/**
 * Small menu item styles - compact variant for tighter menus.
 */
export const MENU_ITEM_STYLES_SMALL = {
  /** Horizontal padding (8px) */
  paddingX: 'px-2',
  /** Minimum height for compact rows (28px) */
  minHeight: 'min-h-7',
  /** Gap between icon and text (6px) */
  iconGap: 'gap-1.5',
  /** Icon size in pixels */
  iconSize: 14,
  /** Icon stroke width */
  iconStrokeWidth: 2,
  /** Icon color class */
  iconColor: 'text-fg-tertiary',
  /** Icon opacity (60% = subtle preset) */
  iconOpacity: 'opacity-60',
  /** Text size */
  textSize: 'text-xs',
  /** Text weight */
  textWeight: 'font-medium',
} as const

// ============================================================================
// Separator Styling
// ============================================================================

/**
 * Separator styling configuration.
 *
 * IMPORTANT: There are two separator contexts:
 * 1. Header/Back separators: Include vertical margin (my-1) since they're outside gap container
 * 2. List item separators: NO vertical margin - parent gap-1 provides spacing
 */
export const SEPARATOR_STYLES = {
  /** Base separator classes (shared by all separators) */
  base: 'border-t border-primary opacity-50',
  /** Negative margin to span full width (compensates for container p-1) */
  fullWidth: '-mx-1',
  /** Vertical margin for header/back separators ONLY */
  headerMargin: 'my-1',
} as const

/**
 * Get separator classes based on context
 */
export function getSeparatorClasses(context: 'header' | 'list'): string {
  const base = `${SEPARATOR_STYLES.base} ${SEPARATOR_STYLES.fullWidth}`
  return context === 'header'
    ? `${base} ${SEPARATOR_STYLES.headerMargin}`
    : base
}

// ============================================================================
// Hover/Interactive States
// ============================================================================

export const INTERACTIVE_STATES = {
  /** Hover background - Base UI uses data-highlighted for Menu.Item hover states */
  hover: 'hover:bg-tertiary data-[highlighted]:bg-tertiary',
  /** Focus visible background */
  focusVisible: 'focus-visible:bg-tertiary',
  /** Active/pressed background */
  active: 'active:bg-quaternary',
  /** Disabled state */
  disabled: 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
} as const
