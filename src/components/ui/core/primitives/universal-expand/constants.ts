/**
 * Universal Expand - Constants
 *
 * Default configuration values for the 4-directional expand system.
 */

import { DEFAULT_APPEARANCE } from '@/components/ui/core/primitives/menu/config'
import type {
  UniversalExpandConfig,
  AnimationConfig,
  LayoutConfig,
  UnifiedSlotConfig,
  SlotsConfig,
  TriggerSlotConfig,
  SlotAppearance,
  SlotAnimation,
  SlotScroll,
  GapConfig,
} from './types'

// ============================================================================
// EASING
// ============================================================================

export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

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
}

// ============================================================================
// DEFAULT GAP CONFIG
// ============================================================================

export const DEFAULT_GAP_CONFIG: GapConfig = {
  top: 0,
  bottom: 12,
  left: 8,
  right: 8,
}

// ============================================================================
// DEFAULT LAYOUT CONFIG
// ============================================================================

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  triggerWidth: 240,
  triggerHeight: 40,
  panelWidth: 340,
  gaps: DEFAULT_GAP_CONFIG,
  borderRadius: 18,
}

// ============================================================================
// DEFAULT SLOT APPEARANCE
// ============================================================================

export const DEFAULT_SLOT_APPEARANCE: SlotAppearance = {
  background: 'secondary',
  shine: 'none',
  borderRadius: 14,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

// ============================================================================
// DEFAULT SLOT ANIMATION
// ============================================================================

export const DEFAULT_SLOT_ANIMATION: SlotAnimation = {
  delayOffset: 0,
  durationOffset: 0,
  expandOrigin: 'start',
}

// ============================================================================
// DEFAULT SLOT SCROLL
// ============================================================================

export const DEFAULT_SLOT_SCROLL: SlotScroll = {
  overflowGradient: true,
  gradientHeight: 24,
  paddingTop: 0,
  paddingBottom: 16,
}

// ============================================================================
// DEFAULT SLOT CONFIGS
// ============================================================================

export const DEFAULT_TOP_SLOT: UnifiedSlotConfig = {
  enabled: false,
  dimensionMode: 'fixed',
  fixedDimension: 48,
  maxDimension: 300,
  minDimension: 48,
  appearance: {
    ...DEFAULT_SLOT_APPEARANCE,
  },
  animation: {
    ...DEFAULT_SLOT_ANIMATION,
    durationOffset: -100,
    expandOrigin: 'end', // Expands upward
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
    paddingTop: 8,
    paddingBottom: 8,
  },
}

export const DEFAULT_BOTTOM_SLOT: UnifiedSlotConfig = {
  enabled: true,
  dimensionMode: 'dynamic',
  fixedDimension: 200,
  maxDimension: 340,
  minDimension: 100,
  appearance: {
    ...DEFAULT_SLOT_APPEARANCE,
  },
  animation: {
    ...DEFAULT_SLOT_ANIMATION,
    durationOffset: 100,
    expandOrigin: 'start', // Expands downward
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
  },
}

export const DEFAULT_LEFT_SLOT: UnifiedSlotConfig = {
  enabled: false,
  dimensionMode: 'fixed',
  fixedDimension: 200,
  maxDimension: 400,
  minDimension: 100,
  appearance: {
    ...DEFAULT_SLOT_APPEARANCE,
  },
  animation: {
    ...DEFAULT_SLOT_ANIMATION,
    durationOffset: -50,
    expandOrigin: 'end', // Expands leftward
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
  },
}

export const DEFAULT_RIGHT_SLOT: UnifiedSlotConfig = {
  enabled: false,
  dimensionMode: 'fixed',
  fixedDimension: 200,
  maxDimension: 400,
  minDimension: 100,
  appearance: {
    ...DEFAULT_SLOT_APPEARANCE,
  },
  animation: {
    ...DEFAULT_SLOT_ANIMATION,
    durationOffset: -50,
    expandOrigin: 'start', // Expands rightward
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
  },
}

// ============================================================================
// DEFAULT SLOTS CONFIG
// ============================================================================

export const DEFAULT_SLOTS_CONFIG: SlotsConfig = {
  top: DEFAULT_TOP_SLOT,
  bottom: DEFAULT_BOTTOM_SLOT,
  left: DEFAULT_LEFT_SLOT,
  right: DEFAULT_RIGHT_SLOT,
}

// ============================================================================
// DEFAULT TRIGGER SLOT CONFIG
// ============================================================================

export const DEFAULT_TRIGGER_SLOT_CONFIG: TriggerSlotConfig = {
  enabled: true,
  background: 'none',
  inset: 0,
}

// ============================================================================
// COMPLETE DEFAULT CONFIG
// ============================================================================

export const DEFAULT_UNIVERSAL_EXPAND_CONFIG: UniversalExpandConfig = {
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
  slots: DEFAULT_SLOTS_CONFIG,
  triggerSlot: DEFAULT_TRIGGER_SLOT_CONFIG,
  debug: false,
}
