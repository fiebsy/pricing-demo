/**
 * Checklist Component Configuration Types
 *
 * Focused checklist component with full styling control.
 *
 * @status incubating
 */

// ============================================================================
// Icon Configuration
// ============================================================================

/** Icon weight variants */
export type IconWeight = 'stroke' | 'solid' | 'duotone'

/** Available icon types */
export type IconType = 'checkmark' | 'sparkles' | 'circle' | 'star' | 'none'

// ============================================================================
// Checklist Item
// ============================================================================

/** Individual checklist item */
export interface ChecklistItem {
  id: string
  text: string
  icon: IconType
  date?: string // Optional date/secondary text
}

// ============================================================================
// Text Style Configuration
// ============================================================================

/** Text size options */
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

/** Text weight options */
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

/** Semantic color options */
export type SemanticColor = 'primary' | 'secondary' | 'tertiary' | 'accent'

/** Text style configuration */
export interface TextStyle {
  size: TextSize
  weight: TextWeight
  color: SemanticColor
  opacity: number // 0-100
}

// ============================================================================
// Icon Style Configuration
// ============================================================================

/** Icon size options */
export type IconSize = 'sm' | 'base' | 'lg' // 14, 16, 20

/** Icon color options (includes 'inherit' for text color matching) */
export type IconColor = SemanticColor | 'inherit'

/** Icon style configuration */
export interface IconStyle {
  size: IconSize
  weight: IconWeight
  color: IconColor
  opacity: number // 0-100
}

// ============================================================================
// Layout Configuration
// ============================================================================

/** Gap between items */
export type ItemGap = 'tight' | 'normal' | 'relaxed' | 'loose' // 8, 12, 16, 20

// ============================================================================
// Full Configuration
// ============================================================================

/** Complete checklist configuration */
export interface ChecklistConfig {
  items: ChecklistItem[]
  itemGap: ItemGap
  textStyle: TextStyle
  iconStyle: IconStyle
  dateStyle?: TextStyle // Optional styling for date/secondary text
}

// ============================================================================
// Preset Types
// ============================================================================

/** Preset metadata with configuration data */
export interface ChecklistPresetMeta {
  id: string
  name: string
  description?: string
  data: ChecklistConfig
}
