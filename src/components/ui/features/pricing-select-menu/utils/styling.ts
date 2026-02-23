/**
 * Pricing Select Menu - Styling Utilities
 *
 * CSS class mappings and utility functions for appearance.
 */

import type {
  BackgroundOption,
  BorderColorOption,
  MenuAppearance,
  BorderRadius,
  Shadow,
  Background,
} from '../types'

// ============================================================================
// BACKGROUND CLASSES
// ============================================================================

const BACKGROUND_CLASS_MAP: Record<BackgroundOption, string> = {
  none: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

export function getBackgroundClass(background: BackgroundOption): string {
  return BACKGROUND_CLASS_MAP[background]
}

// ============================================================================
// BORDER COLOR
// ============================================================================

export function getBorderColorVar(color: BorderColorOption): string {
  return `var(--color-border-${color})`
}

// ============================================================================
// POPUP CLASSES
// ============================================================================

const BORDER_RADIUS_CLASSES: Record<BorderRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

const SHADOW_CLASSES: Record<Shadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

const APPEARANCE_BACKGROUND_CLASSES: Record<Background, string> = {
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

const DEFAULT_APPEARANCE: MenuAppearance = {
  borderRadius: 'xl',
  shadow: 'lg',
  shine: 'shine-1-subtle',
  background: 'secondary',
  gradient: 'subtle-depth-sm',
  gradientColor: 'secondary',
  squircle: false,
}

/**
 * Generate popup classes from appearance config.
 */
export function getPopupClasses(appearance: MenuAppearance): string {
  const merged = { ...DEFAULT_APPEARANCE, ...appearance }
  const classes: string[] = []

  // Background
  if (merged.background) {
    classes.push(APPEARANCE_BACKGROUND_CLASSES[merged.background])
  }

  // Border radius
  if (merged.borderRadius) {
    classes.push(BORDER_RADIUS_CLASSES[merged.borderRadius])
  }

  // Squircle corners
  if (merged.squircle) {
    classes.push('corner-squircle')
  }

  // Handle shine + shadow combination (both use box-shadow CSS property)
  const hasShine = merged.shine && merged.shine !== 'none'
  const hasShadow = merged.shadow && merged.shadow !== 'none'

  if (hasShine && hasShadow && merged.shine && merged.shadow) {
    const shineCombos = SHINE_SHADOW_MAP[merged.shine]
    // Map xl/2xl to lg since combined classes only go up to lg
    const shadowKey = merged.shadow === 'xl' || merged.shadow === '2xl' ? 'lg' : merged.shadow
    if (shineCombos?.[shadowKey]) {
      classes.push(shineCombos[shadowKey])
    } else {
      classes.push(merged.shine)
    }
  } else if (hasShine && merged.shine) {
    classes.push(merged.shine)
  } else if (hasShadow && merged.shadow) {
    classes.push(SHADOW_CLASSES[merged.shadow])
  }

  return classes.filter(Boolean).join(' ')
}

/**
 * Generate inline gradient styles.
 */
export function getGradientStyles(appearance: MenuAppearance): React.CSSProperties {
  const merged = { ...DEFAULT_APPEARANCE, ...appearance }

  if (merged.gradient === 'none') {
    return {}
  }

  const colorRgbMap: Record<string, string> = {
    brand: '124, 58, 237',
    primary: '0, 0, 0',
    secondary: '0, 0, 0',
    tertiary: '100, 100, 100',
    gray: '100, 116, 139',
    'gray-light': '148, 163, 184',
  }

  const opacityMap: Record<string, number> = {
    sm: 0.03,
    md: 0.06,
    lg: 0.10,
    xl: 0.15,
  }

  const intensity = merged.gradient?.replace('subtle-depth-', '') ?? 'sm'
  const endOpacity = opacityMap[intensity] ?? opacityMap.sm
  const rgb = colorRgbMap[merged.gradientColor ?? 'primary'] ?? colorRgbMap.primary

  return {
    backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(${rgb}, ${endOpacity}) 100%)`,
  }
}
