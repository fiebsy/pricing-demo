/**
 * Hardened Preset for Collections Dashboard
 *
 * Locked table configuration adapted from Table PAYVA V2 playground.
 * Table, toolbar, and filter settings are not user-configurable.
 */

import type {
  BorderConfig,
  BackgroundConfig,
  ToolbarLayoutConfig,
} from '@/components/ui/prod/data/sticky-data-table'

// =============================================================================
// HARDENED TABLE DIMENSIONS
// =============================================================================

export const HARDENED_DIMENSIONS = {
  rowHeight: 52,
  headerHeight: 42,
  borderRadius: 16,
  headerGap: 12,
} as const

// =============================================================================
// HARDENED BORDER CONFIGURATION
// =============================================================================

export const HARDENED_BORDER_CONFIG: BorderConfig = {
  showOuter: true,
  showRows: true,
  showCells: true,
  outerColor: 'border-primary',
  rowColor: 'border-secondary',
  cellColor: 'border-tertiary',
  stickyColumnRightBorderColor: 'border-secondary',
  hideCellBordersForColumns: ['__checkbox'],
  headerBottomColor: 'border-primary',
}

// =============================================================================
// HARDENED BACKGROUND CONFIGURATION
// =============================================================================

export const HARDENED_BACKGROUND_CONFIG: BackgroundConfig = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_t1',
  headerStickyCell: 'bg-secondary_t1',
  headerStickyCellWithArrows: 'bg-secondary_t1/90',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-secondary_t1/90',
  rowHover: 'bg-tertiary',
}

// =============================================================================
// HARDENED TOOLBAR CONFIGURATION
// =============================================================================

export const HARDENED_TOOLBAR_CONFIG: ToolbarLayoutConfig = {
  position: 'integrated',
  toolbarBottomMargin: 16,
  toolbarToCountGap: 0,
  headerGap: 12,
  integratedToolbarHeight: 40,
  integratedPadding: {
    top: 0,
    bottom: 12,
    left: 0,
    right: 0,
  },
}

// =============================================================================
// HARDENED FEATURE FLAGS
// =============================================================================

export const HARDENED_FEATURES = {
  enableSelection: true, // Checkbox column to left of sticky column
  showColumnControl: true, // Column visibility toggle in toolbar
  showCount: false, // DISABLED - count not shown in toolbar
  showExport: true, // Via three-dot menu
  enableColumnReorder: true, // Enabled - allows drag-to-reorder columns
} as const

// =============================================================================
// FILTER TRIGGER CONFIGURATION (JAN2 Style)
// =============================================================================

export interface FilterTriggerConfig {
  shine: string
  shineIntensity: 'subtle' | 'normal' | 'intense'
  background: string
  backgroundHover: string
  border: boolean
  height: number
  rounded: string
  paddingX: number
  textColor: string
  textColorHover: string
  fontWeight: string
  iconSize: number
  iconStrokeWidth: number
  iconColor: string
}

export const HARDENED_FILTER_TRIGGER: FilterTriggerConfig = {
  shine: '0',
  shineIntensity: 'intense',
  background: 'primary',
  backgroundHover: 'tertiary',
  border: false,
  height: 40,
  rounded: 'full',
  paddingX: 12,
  textColor: 'secondary',
  textColorHover: 'primary',
  fontWeight: 'semibold',
  iconSize: 20,
  iconStrokeWidth: 1.5,
  iconColor: 'quaternary',
}

// =============================================================================
// FILTER MENU CONFIGURATION (JAN2 Style)
// =============================================================================

export interface FilterMenuConfig {
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  borderStyle: 'border' | 'shine'
  shineOption: string
  cornerSquircle: boolean
  menuWidth: number
  backgroundColor: string
  backgroundGradient: string
  itemRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  itemSquircle: boolean
  itemHoverColor: 'secondary' | 'tertiary' | 'quaternary' | 'brand-subtle' | 'none'
  iconOpacity: number
  panelTransitionDuration: number
  heightAnimationEnabled: boolean
  opacityCrossfadeEnabled: boolean
}

export const HARDENED_FILTER_MENU: FilterMenuConfig = {
  borderRadius: '2xl',
  shadow: '2xl',
  borderStyle: 'shine',
  shineOption: 'shine-1',
  cornerSquircle: true,
  menuWidth: 240,
  backgroundColor: 'primary',
  backgroundGradient: 'subtle-depth-sm',
  itemRadius: 'xl',
  itemSquircle: true,
  itemHoverColor: 'tertiary',
  iconOpacity: 50,
  panelTransitionDuration: 250,
  heightAnimationEnabled: true,
  opacityCrossfadeEnabled: true,
}

// =============================================================================
// FILTER CHIP CONFIGURATION (JAN2 Style)
// =============================================================================

export interface FilterChipConfig {
  shine: 'none' | '0' | '1' | '2' | '3' | 'brand'
  shineIntensity: 'subtle' | 'normal' | 'intense'
  background: string
  border: boolean
  size: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl'
  rounded: 'none' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'full'
  paddingLeft: number
  paddingRight: number
  iconValueGap: number
  itemGap: number
  iconSize: number
  closeIconSize: number
  leftIconOpacity: number
  duration: number
  revealMode: 'fade' | 'delay' | 'sync' | 'instant' | 'none'
}

export const HARDENED_FILTER_CHIP: FilterChipConfig = {
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
  revealMode: 'fade',
}

// =============================================================================
// SEARCH CONFIGURATION
// =============================================================================

export const HARDENED_SEARCH_CONFIG = {
  expandedWidth: 200,
  collapsedWidth: 40,
  height: 40,
  duration: 200,
  revealMode: 'delay' as const,
  hideMode: 'fade' as const,
  collapseOnBlur: true,
  placeholder: 'Search contracts...',
} as const

// =============================================================================
// COMBINED HARDENED CONFIG
// =============================================================================

export const HARDENED_CONFIG = {
  dimensions: HARDENED_DIMENSIONS,
  border: HARDENED_BORDER_CONFIG,
  background: HARDENED_BACKGROUND_CONFIG,
  toolbar: HARDENED_TOOLBAR_CONFIG,
  features: HARDENED_FEATURES,
  filterTrigger: HARDENED_FILTER_TRIGGER,
  filterMenu: HARDENED_FILTER_MENU,
  filterChip: HARDENED_FILTER_CHIP,
  search: HARDENED_SEARCH_CONFIG,
} as const

export type HardenedConfig = typeof HARDENED_CONFIG
