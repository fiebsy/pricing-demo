/**
 * Filter Menu Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/filter-menu
 */

import type { ComponentType } from 'react'
import type { MenuAppearance, MenuSide, MenuAlign, AnimationConfig, UnifiedHoverConfig } from '@/components/ui/core/primitives/menu'

// ============================================================================
// Variant Types
// ============================================================================

/** Variant identifier for filter menu modes */
export type FilterMenuVariant = 'table-filter' | 'date-picker'

/** Selection indicator style */
export type SelectionIndicator = 'checkmark' | 'dot'

// ============================================================================
// Menu Item Types
// ============================================================================

export interface FilterMenuItemOption {
  id: string
  label: string
}

export interface FilterMenuItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  options: FilterMenuItemOption[]
}

// ============================================================================
// Date Picker Types
// ============================================================================

/** Group type for date picker periods */
export type DatePickerGroup = 'recent' | 'range' | 'all'

/** Date picker period item */
export interface DatePickerPeriod {
  id: string
  label: string
  group: DatePickerGroup
}

/** Date picker specific configuration */
export interface DatePickerConfig {
  /** Currently selected period ID */
  selectedPeriod: string
  /** Available period options */
  periods: DatePickerPeriod[]
  /** How to display selected state */
  selectionIndicator: SelectionIndicator
}

// ============================================================================
// Trigger Configuration
// ============================================================================

export type TriggerVariant = 'default' | 'ghost' | 'outline'
export type TriggerSize = 'sm' | 'md' | 'lg'
export type TriggerRounded = 'md' | 'lg' | 'xl' | 'full'
export type TriggerMode = 'icon-text' | 'icon-only'
export type TriggerIconId = 'add-01' | 'filter' | 'filter-add' | 'filter-mail-circle' | 'filter-horizontal'

export interface TriggerConfig {
  /** Display mode: icon + text or icon only */
  mode: TriggerMode
  /** Button label (shown when mode is 'icon-text') */
  label: string
  /** Visual variant */
  variant: TriggerVariant
  /** Size preset */
  size: TriggerSize
  /** Border radius */
  rounded: TriggerRounded
  /** Icon identifier */
  icon: TriggerIconId
}

// ============================================================================
// Menu Configuration
// ============================================================================

export interface MenuConfig {
  /** Menu width in pixels */
  width: number
  /** Position relative to trigger */
  side: MenuSide
  /** Alignment relative to trigger */
  align: MenuAlign
  /** Offset from trigger (pixels) */
  sideOffset: number
  /** Offset along alignment axis (pixels) */
  alignOffset: number
  /** Show header in menu */
  showHeader: boolean
  /** Menu appearance */
  appearance: MenuAppearance
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface FilterMenuConfig {
  /** Variant mode: table-filter (multi-select with submenus) or date-picker (single-select flat) */
  variant: FilterMenuVariant
  trigger: TriggerConfig
  menu: MenuConfig
  /** Filter items for table-filter variant */
  items?: FilterMenuItem[]
  /** Date picker configuration for date-picker variant */
  datePicker?: DatePickerConfig
  animation: AnimationConfig
  /** Unified hover indicator configuration */
  unifiedHover?: UnifiedHoverConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface FilterMenuPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'compact' | 'brand' | 'custom'
  data: FilterMenuConfig
}
