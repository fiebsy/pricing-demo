/**
 * Biaxial Command Menu - Constants
 *
 * Default configuration and sample data.
 */

import type { CommandMenuConfig, CommandGroup } from './types'

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const DEFAULT_COMMAND_CONFIG: CommandMenuConfig = {
  // Animation
  duration: 500,
  collapseDuration: 125,
  contentFadeDuration: 0,
  contentFadeDelay: 0,

  // Layout
  inputHeight: 40,
  inputWidth: 240,
  panelWidth: 320,
  maxPanelHeight: 380,
  innerPaddingTop: 4,
  innerPaddingBottom: 4,
  innerPaddingLeft: 4,
  innerPaddingRight: 4,
  itemHeight: 36,
  itemGap: 2,
  borderRadius: 18,
  topBorderRadius: undefined,
  menuBorderRadius: 18,
  menuTopBorderRadius: 0,
  menuContainerBottomRadius: undefined,
  syncMenuContainerRadius: true,
  menuContainerInset: 3,
  menuBorderWidth: 1,
  menuBorderColor: 'primary',
  contentTopOffset: 6,
  contentBottomOffset: 0,
  inputPaddingExpanded: 0,
  inputTopPaddingExpanded: 0,
  backdropTopOffset: 12,

  // Features
  placeholder: 'Search...',
  showEmptyState: true,
  emptyStateMessage: 'No results found',

  // Appearance
  appearance: {
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-2-subtle',
    background: 'tertiary',
    gradient: 'subtle-depth-md',
    gradientColor: 'tertiary',
    squircle: true,
  },
  inputBackground: 'none',
  menuBackground: 'secondary',
  menuShine: 'none',
  menuOverflowGradient: true,
  menuOverflowGradientHeight: 24,
  gradientInsetTop: 0,
  gradientInsetBottom: 0,
  gradientInsetLeft: 0,
  gradientInsetRight: 9,
  scrollPaddingTop: 0,
  scrollPaddingBottom: 20,
  scrollbarMarginTop: 0,
  scrollbarMarginBottom: 4,
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
