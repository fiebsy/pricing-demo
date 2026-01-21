/**
 * Biaxial Command Menu V3 - Constants
 *
 * Default configuration and sample data.
 */

import { DEFAULT_APPEARANCE } from '@/components/ui/prod/base/menu/config'
import type { CommandMenuConfig, CommandGroup, AnimationSyncConfig } from './types'

// ============================================================================
// DEFAULT ANIMATION SYNC CONFIG
// ============================================================================

export const DEFAULT_ANIMATION_SYNC: AnimationSyncConfig = {
  backdropMode: 'size',
  backdropDelay: 0,
  backdropDurationOffset: 0,
  animateMenuContainer: false,
  menuContainerDelay: 0,
  menuContainerDurationOffset: 0,
  backdropScaleStart: 1,
  expandOrigin: 'center',
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const DEFAULT_COMMAND_CONFIG: CommandMenuConfig = {
  // Animation (base)
  duration: 225,
  collapseDuration: 125,
  contentFadeDuration: 75,
  contentFadeDelay: 0,

  // Animation Sync
  animationSync: DEFAULT_ANIMATION_SYNC,

  // Layout
  inputHeight: 40,
  inputWidth: 240,
  panelWidth: 320,
  maxPanelHeight: 400,
  innerPaddingTop: 4,
  innerPaddingBottom: 4,
  innerPaddingLeft: 4,
  innerPaddingRight: 4,
  itemHeight: 36,
  itemGap: 2,
  itemsTopGap: 0,
  borderRadius: 16,
  topBorderRadius: undefined,
  menuBorderRadius: undefined,
  menuTopBorderRadius: 0,
  menuContainerBottomRadius: undefined,
  syncMenuContainerRadius: true,
  menuContainerInset: 0,
  menuBorderWidth: 0,
  menuBorderColor: 'secondary',
  contentTopOffset: -4,
  contentBottomOffset: 0,
  inputPaddingExpanded: 0,
  inputTopPaddingExpanded: 0,
  backdropTopOffset: 0,

  // Features
  placeholder: 'Search...',
  showEmptyState: true,
  emptyStateMessage: 'No results found',

  // Appearance
  appearance: {
    ...DEFAULT_APPEARANCE,
  },
  inputBackground: 'tertiary',
  menuBackground: 'primary',
  menuShine: 'none',
  menuOverflowGradient: false,
  menuOverflowGradientHeight: 16,
  gradientInsetTop: 0,
  gradientInsetBottom: 0,
  gradientInsetLeft: 0,
  gradientInsetRight: 0,
  scrollPaddingTop: 0,
  scrollPaddingBottom: 12,
  scrollbarMarginTop: 0,
  scrollbarMarginBottom: 0,
  syncGradientToScrollbar: true,
  debug: false,
}

// ============================================================================
// SAMPLE COMMAND DATA
// ============================================================================

export const SAMPLE_COMMANDS: CommandGroup[] = [
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      {
        id: 'dashboard',
        label: 'Go to Dashboard',
        description: 'View your main dashboard',
        shortcut: ['G', 'D'],
      },
      {
        id: 'customers',
        label: 'Go to Customers',
        description: 'Manage customer accounts',
        shortcut: ['G', 'C'],
      },
      {
        id: 'contracts',
        label: 'Go to Contracts',
        description: 'View all contracts',
        shortcut: ['G', 'O'],
      },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      {
        id: 'new-contract',
        label: 'Create Contract',
        description: 'Start a new contract',
        shortcut: ['C'],
      },
      {
        id: 'new-customer',
        label: 'Add Customer',
        description: 'Add a new customer',
        shortcut: ['N'],
      },
      { type: 'separator', id: 'sep-1' },
      {
        id: 'export',
        label: 'Export Data',
        description: 'Export to CSV or Excel',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    items: [
      {
        id: 'preferences',
        label: 'Preferences',
        description: 'Customize your experience',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        description: 'Manage notification settings',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        description: 'Connect third-party services',
      },
    ],
  },
]
