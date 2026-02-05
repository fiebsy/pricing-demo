/**
 * Biaxial Expand - Constants
 *
 * Default configuration values for the composable expand system.
 *
 * SPACING MODEL
 * =============
 * The layout uses a unified "inset" system where each slot container has
 * uniform padding on all sides. This creates consistent visual margins
 * between the backdrop and slot content.
 */

import { DEFAULT_APPEARANCE } from '@/components/ui/core/primitives/menu/config'
import type {
  BiaxialExpandConfig,
  AnimationConfig,
  LayoutConfig,
  SlotConfig,
  CommandGroup,
} from './types'

// ============================================================================
// DEFAULT ANIMATION CONFIG
// ============================================================================

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  duration: 350,
  collapseDuration: 125,
  contentFadeDuration: 0,
  contentFadeDelay: 0,
  backdropMode: 'size',
  backdropDelay: 0,
  backdropDurationOffset: 0,
  animateSlotContainers: true,
  slotContainerDelay: 0,
  slotContainerDurationOffset: 100,
  expandOrigin: 'top',
  topExpandOrigin: 'bottom',
}

// ============================================================================
// DEFAULT LAYOUT CONFIG
// ============================================================================

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  triggerWidth: 240,
  triggerHeight: 40,
  panelWidth: 340,
  maxTopHeight: undefined,
  maxBottomHeight: 380,
  borderRadius: 18,
  topGap: 0,
  bottomGap: 12,
  leftGap: 0,
  rightGap: 0,
  maxLeftWidth: 200,
  maxRightWidth: 200,
  backdropTopOffset: 0,
  expandOriginX: 'center',
  positionMode: 'overlay',
}

// ============================================================================
// DEFAULT SLOT CONFIGS
// ============================================================================

export const DEFAULT_TOP_SLOT_CONFIG: SlotConfig = {
  enabled: false,
  height: 48,
  delayOffset: 0,
  durationOffset: -100,
  background: 'secondary',
  borderRadius: 14,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

export const DEFAULT_TRIGGER_SLOT_CONFIG: SlotConfig = {
  enabled: true,
  background: 'none',
  inset: 0,
}

export const DEFAULT_BOTTOM_SLOT_CONFIG: SlotConfig = {
  enabled: true,
  delayOffset: 0,
  durationOffset: 100,
  background: 'secondary',
  borderRadius: 14,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

export const DEFAULT_LEFT_SLOT_CONFIG: SlotConfig = {
  enabled: false,
  delayOffset: 0,
  durationOffset: -100,
  background: 'secondary',
  borderRadius: 14,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

export const DEFAULT_RIGHT_SLOT_CONFIG: SlotConfig = {
  enabled: false,
  delayOffset: 0,
  durationOffset: -100,
  background: 'secondary',
  borderRadius: 14,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

// ============================================================================
// COMPLETE DEFAULT CONFIG
// ============================================================================

export const DEFAULT_BIAXIAL_EXPAND_CONFIG: BiaxialExpandConfig = {
  animation: DEFAULT_ANIMATION_CONFIG,
  layout: DEFAULT_LAYOUT_CONFIG,
  appearance: {
    ...DEFAULT_APPEARANCE,
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-2-subtle',
    background: 'tertiary',
    gradient: 'subtle-depth-md',
    gradientColor: 'tertiary',
    squircle: true,
  },
  topSlot: DEFAULT_TOP_SLOT_CONFIG,
  triggerSlot: DEFAULT_TRIGGER_SLOT_CONFIG,
  bottomSlot: DEFAULT_BOTTOM_SLOT_CONFIG,
  leftSlot: DEFAULT_LEFT_SLOT_CONFIG,
  rightSlot: DEFAULT_RIGHT_SLOT_CONFIG,
  debug: false,
}

// ============================================================================
// EASING
// ============================================================================

export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ============================================================================
// SAMPLE DATA
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
