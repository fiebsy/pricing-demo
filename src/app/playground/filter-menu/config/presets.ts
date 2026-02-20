/**
 * Filter Menu Presets
 *
 * Preset categories:
 * - default: Standard starting point
 * - minimal: Clean, understated
 * - compact: Space-efficient icon-only mode
 * - brand: Uses brand colors and effects
 * - custom: User-defined variations
 */

import {
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Alert02Icon,
  Money01Icon,
  Route01Icon,
} from '@hugeicons-pro/core-stroke-rounded'
import type { ComponentType } from 'react'

import type {
  FilterMenuConfig,
  FilterMenuPresetMeta,
  FilterMenuItem,
  DatePickerPeriod,
  DatePickerConfig,
} from './types'
import type { UnifiedHoverConfig } from '@/components/ui/core/primitives/menu'

// ============================================================================
// Default Menu Items (matching dashboard filters)
// ============================================================================

type IconComponent = ComponentType<{ className?: string }>

export const DEFAULT_FILTER_ITEMS: FilterMenuItem[] = [
  {
    id: 'status',
    label: 'Status',
    icon: CheckmarkCircle02Icon as unknown as IconComponent,
    options: [
      { id: 'status-collections', label: 'Collections' },
      { id: 'status-clawback', label: 'Last Chance' },
      { id: 'status-settled', label: 'Clawed back' },
    ],
  },
  {
    id: 'outcome',
    label: 'Outcome',
    icon: Cancel01Icon as unknown as IconComponent,
    options: [
      { id: 'outcome-defaulted', label: 'Defaulted' },
      { id: 'outcome-canceled', label: 'Canceled' },
      { id: 'outcome-chargeback', label: 'Chargeback' },
    ],
  },
  {
    id: 'urgency',
    label: 'Urgency',
    icon: Alert02Icon as unknown as IconComponent,
    options: [
      { id: 'urgency-critical', label: 'Critical (0-3 days)' },
      { id: 'urgency-warning', label: 'Warning (4-7 days)' },
      { id: 'urgency-safe', label: 'Safe (8+ days)' },
    ],
  },
  {
    id: 'balance',
    label: 'Balance',
    icon: Money01Icon as unknown as IconComponent,
    options: [
      { id: 'balance-high', label: 'High (>$500)' },
      { id: 'balance-medium', label: 'Medium ($100-500)' },
      { id: 'balance-low', label: 'Low (<$100)' },
    ],
  },
  {
    id: 'route',
    label: 'Route',
    icon: Route01Icon as unknown as IconComponent,
    options: [
      { id: 'route-servicing', label: 'PAC' },
      { id: 'route-funding', label: 'Upfront' },
    ],
  },
]

// ============================================================================
// Unified Hover Defaults
// ============================================================================

export const DEFAULT_UNIFIED_HOVER: UnifiedHoverConfig = {
  enabled: true,
  stiffness: 550,
  damping: 34,
  mass: 0.8,
  background: 'quaternary',
  borderRadius: 12,
}

// ============================================================================
// Date Picker Periods
// ============================================================================

export const DEFAULT_DATE_PICKER_PERIODS: DatePickerPeriod[] = [
  { id: 'today', label: 'Today', group: 'recent' },
  { id: 'yesterday', label: 'Yesterday', group: 'recent' },
  { id: 'this-week', label: 'This week', group: 'recent' },
  { id: 'this-month', label: 'This month', group: 'recent' },
  { id: 'this-year', label: 'This year', group: 'recent' },
  { id: '30-days', label: '30 days', group: 'range' },
  { id: '6-months', label: '6 months', group: 'range' },
  { id: '12-months', label: '12 months', group: 'range' },
  { id: 'all-time', label: 'All time', group: 'all' },
]

export const DEFAULT_DATE_PICKER_CONFIG: DatePickerConfig = {
  selectedPeriod: 'today',
  periods: DEFAULT_DATE_PICKER_PERIODS,
  selectionIndicator: 'dot',
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_FILTER_MENU_CONFIG: FilterMenuConfig = {
  variant: 'table-filter',
  trigger: {
    mode: 'icon-only',
    label: 'Filter',
    variant: 'default',
    size: 'md',
    rounded: 'full',
    icon: 'add-01',
  },
  menu: {
    width: 240,
    side: 'bottom',
    align: 'end',
    sideOffset: 8,
    alignOffset: 0,
    showHeader: false,
    appearance: {
      borderRadius: 'xl',
      shadow: 'lg',
      shine: 'shine-1-subtle',
      background: 'secondary',
      gradient: 'none',
      squircle: false,
    },
  },
  items: DEFAULT_FILTER_ITEMS,
  animation: {
    springPreset: 'default',
    animateHeight: true,
    animateOnClose: false,
  },
  unifiedHover: DEFAULT_UNIFIED_HOVER,
}

// ============================================================================
// Date Picker Default Configuration
// ============================================================================

export const DEFAULT_DATE_PICKER_MENU_CONFIG: FilterMenuConfig = {
  variant: 'date-picker',
  trigger: {
    mode: 'icon-text',
    label: 'Today',
    variant: 'ghost',
    size: 'sm',
    rounded: 'full',
    icon: 'add-01', // Not displayed for date-picker, uses chevron instead
  },
  menu: {
    width: 200,
    side: 'bottom',
    align: 'start',
    sideOffset: 8,
    alignOffset: 0,
    showHeader: true,
    appearance: {
      borderRadius: 'xl',
      shadow: 'lg',
      shine: 'shine-1-subtle',
      background: 'secondary',
      gradient: 'none',
      squircle: false,
    },
  },
  datePicker: DEFAULT_DATE_PICKER_CONFIG,
  animation: {
    springPreset: 'snappy',
    animateHeight: false,
    animateOnClose: false,
  },
  unifiedHover: DEFAULT_UNIFIED_HOVER,
}

// ============================================================================
// Presets
// ============================================================================

export const FILTER_MENU_PRESETS: FilterMenuPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard filter button with shine variant',
    data: DEFAULT_FILTER_MENU_CONFIG,
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'default',
    description: 'Single-select time period picker with flat structure',
    data: DEFAULT_DATE_PICKER_MENU_CONFIG,
  },
  {
    id: 'icon-only',
    name: 'Icon Only',
    category: 'compact',
    description: 'Compact icon-only trigger',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      trigger: {
        ...DEFAULT_FILTER_MENU_CONFIG.trigger,
        mode: 'icon-only',
        rounded: 'full',
      },
    },
  },
  {
    id: 'ghost',
    name: 'Ghost',
    category: 'minimal',
    description: 'Subtle ghost variant',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      trigger: {
        ...DEFAULT_FILTER_MENU_CONFIG.trigger,
        variant: 'ghost',
        rounded: 'lg',
      },
    },
  },
  {
    id: 'outline',
    name: 'Outline',
    category: 'minimal',
    description: 'Bordered outline variant',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      trigger: {
        ...DEFAULT_FILTER_MENU_CONFIG.trigger,
        variant: 'outline',
        rounded: 'lg',
      },
    },
  },
  {
    id: 'compact-ghost',
    name: 'Compact Ghost',
    category: 'compact',
    description: 'Icon-only with ghost styling',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      trigger: {
        ...DEFAULT_FILTER_MENU_CONFIG.trigger,
        mode: 'icon-only',
        variant: 'ghost',
        size: 'sm',
        rounded: 'lg',
      },
    },
  },
  {
    id: 'with-header',
    name: 'With Header',
    category: 'custom',
    description: 'Menu with header section',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      menu: {
        ...DEFAULT_FILTER_MENU_CONFIG.menu,
        showHeader: true,
      },
    },
  },
  {
    id: 'large-rounded',
    name: 'Large Rounded',
    category: 'brand',
    description: 'Larger trigger with extra shine',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      trigger: {
        ...DEFAULT_FILTER_MENU_CONFIG.trigger,
        mode: 'icon-text',
        label: 'Add Filter',
        size: 'lg',
        rounded: 'full',
      },
      menu: {
        ...DEFAULT_FILTER_MENU_CONFIG.menu,
        width: 280,
        appearance: {
          borderRadius: '2xl',
          shadow: 'xl',
          shine: 'shine-2',
          background: 'secondary',
          gradient: 'subtle-depth-sm',
          squircle: true,
        },
      },
    },
  },
  {
    id: 'snappy',
    name: 'Snappy Spring',
    category: 'custom',
    description: 'Fast, responsive spring animation',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      animation: {
        springPreset: 'snappy',
        animateHeight: true,
      },
    },
  },
  {
    id: 'bouncy',
    name: 'Bouncy Spring',
    category: 'custom',
    description: 'Playful spring with bounce',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      animation: {
        springPreset: 'bouncy',
        animateHeight: true,
      },
    },
  },
  {
    id: 'unified-hover',
    name: 'Unified Hover',
    category: 'custom',
    description: 'Gliding hover indicator with spring physics',
    data: {
      ...DEFAULT_FILTER_MENU_CONFIG,
      unifiedHover: {
        ...DEFAULT_UNIFIED_HOVER,
        enabled: true,
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): FilterMenuPresetMeta | undefined =>
  FILTER_MENU_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): FilterMenuPresetMeta[] =>
  FILTER_MENU_PRESETS.filter((p) => p.category === category)
