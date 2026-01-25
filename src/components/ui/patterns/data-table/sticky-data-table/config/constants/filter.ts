/**
 * StickyDataTable - Filter Constants
 *
 * Default filter menu, trigger, and pill configurations.
 * Based on JAN2 production preset.
 *
 * @module config/constants/filter
 */

import type {
  BorderRadius,
  Shadow,
  ShineVariant,
  Background,
  GradientPattern,
  GradientColor,
} from '@/components/ui/prod/base/menu'

// ============================================================================
// FILTER MENU TYPES & DEFAULTS
// ============================================================================

/**
 * Filter menu appearance and behavior configuration
 * Uses PROD base/menu types
 */
export interface FilterMenuConfig {
  /** Menu width in pixels */
  width: number
  /** Appearance overrides - optional */
  borderRadius?: BorderRadius
  shadow?: Shadow
  shine?: ShineVariant
  squircle?: boolean
  background?: Background
  gradient?: GradientPattern
  gradientColor?: GradientColor
}

/**
 * Default filter menu configuration (JAN2)
 *
 * Only specifies width - appearance and animation inherit from Menu's defaults.
 * This ensures FilterToolbar stays in sync with any updates to the core Menu component.
 */
export const DEFAULT_FILTER_MENU: FilterMenuConfig = {
  width: 240,
} as const

// ============================================================================
// FILTER TRIGGER TYPES & DEFAULTS
// ============================================================================

/**
 * "Add filter" button styling configuration
 */
export interface FilterTriggerConfig {
  /** Button height in pixels */
  height: number
  /** Shine effect level */
  shine: 'none' | '0' | '1' | '2' | '3' | 'brand'
  /** Shine intensity */
  shineIntensity: 'subtle' | 'normal' | 'intense'
  /** Background color */
  background: string
  /** Hover background color */
  backgroundHover: string
  /** Show border */
  border: boolean
  /** Border radius preset */
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Horizontal padding in pixels */
  paddingX: number
  /** Text color */
  textColor: string
  /** Hover text color */
  textColorHover: string
  /** Font weight */
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold'
  /** Icon size in pixels */
  iconSize: number
  /** Icon stroke width */
  iconStrokeWidth: number
  /** Icon color */
  iconColor: string
}

/**
 * Default filter trigger configuration (JAN2)
 */
export const DEFAULT_FILTER_TRIGGER: FilterTriggerConfig = {
  height: 40,
  shine: '0',
  shineIntensity: 'intense',
  background: 'primary',
  backgroundHover: 'tertiary',
  border: false,
  rounded: 'full',
  paddingX: 12,
  textColor: 'secondary',
  textColorHover: 'primary',
  fontWeight: 'semibold',
  iconSize: 20,
  iconStrokeWidth: 1.5,
  iconColor: 'quaternary',
} as const

// ============================================================================
// FILTER PILL TYPES & DEFAULTS
// ============================================================================

/**
 * Active filter pill/chip styling configuration
 */
export interface FilterPillConfig {
  /** Shine effect level */
  shine: 'none' | '0' | '1' | '2' | '3' | 'brand'
  /** Shine intensity */
  shineIntensity: 'subtle' | 'normal' | 'intense'
  /** Background color */
  background: string
  /** Show border */
  border: boolean
  /** Size preset */
  size: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl'
  /** Border radius preset */
  rounded: 'none' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'full'
  /** Left padding in pixels */
  paddingLeft: number
  /** Right padding in pixels */
  paddingRight: number
  /** Gap between icon and value */
  iconValueGap: number
  /** Gap between multiple pills */
  itemGap: number
  /** Icon size in pixels */
  iconSize: number
  /** Close icon size in pixels */
  closeIconSize: number
  /** Left icon opacity (0-100) */
  leftIconOpacity: number
  /** Animation duration in ms */
  duration: number
  /** Reveal animation mode */
  revealMode?: 'fade' | 'delay' | 'sync' | 'instant' | 'none'
}

/**
 * Default filter pill configuration (JAN2)
 */
export const DEFAULT_FILTER_PILL: FilterPillConfig = {
  shine: '1',
  shineIntensity: 'subtle',
  background: 'secondary',
  border: false,
  size: 'sm',
  rounded: 'full',
  paddingLeft: 8,
  paddingRight: 4,
  iconValueGap: 4,
  itemGap: 10,
  iconSize: 14,
  closeIconSize: 16,
  leftIconOpacity: 55,
  duration: 150,
} as const

// ============================================================================
// COMBINED FILTER CONFIG
// ============================================================================

/**
 * Complete filter toolbar configuration
 * Pass to FilterToolbar via `config` prop
 */
export interface FilterToolbarConfig {
  menu: FilterMenuConfig
  trigger: FilterTriggerConfig
  pill: FilterPillConfig
}

/**
 * Default combined filter configuration (JAN2)
 * Production-ready settings that work out of the box
 */
export const DEFAULT_FILTER_CONFIG: FilterToolbarConfig = {
  menu: DEFAULT_FILTER_MENU,
  trigger: DEFAULT_FILTER_TRIGGER,
  pill: DEFAULT_FILTER_PILL,
} as const
