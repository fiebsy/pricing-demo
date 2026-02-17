/**
 * Filter Menu Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/filter-menu
 */

import type { ComponentType } from 'react'
import type { MenuAppearance, MenuSide, MenuAlign, AnimationConfig, UnifiedHoverConfig } from '@/components/ui/core/primitives/menu'

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
  trigger: TriggerConfig
  menu: MenuConfig
  items: FilterMenuItem[]
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
