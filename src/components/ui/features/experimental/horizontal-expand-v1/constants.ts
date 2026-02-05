/**
 * Horizontal Expand V1 - Constants
 *
 * Default configuration values for the horizontal expand system.
 *
 * LAYOUT MODEL
 * ============
 * Containers are arranged horizontally in a row:
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │ Backdrop (background, shadow)                            │
 * │ ┌─────────────┬─────────────┬─────────────┐             │
 * │ │ Left Slot   │   Trigger   │ Right Slot  │             │
 * │ │ (expands ←) │  (visible)  │ (expands →) │             │
 * │ └─────────────┴─────────────┴─────────────┘             │
 * └──────────────────────────────────────────────────────────┘
 *
 * KEY PROPERTIES:
 * - leftSlot: Content that expands leftward (clip reveals from right edge)
 * - rightSlot: Content that expands rightward (clip reveals from left edge)
 * - triggerSlot: Always visible anchor element
 */

import type {
  HorizontalExpandConfig,
  AnimationConfig,
  LayoutConfig,
  SlotConfig,
} from './types'

// ============================================================================
// DEFAULT ANIMATION CONFIG
// ============================================================================

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  duration: 350,
  collapseDuration: 200,
  contentFadeDuration: 0,
  contentFadeDelay: 0,
  animateSlotContainers: true,
  slotContainerDelay: 0,
  slotContainerDurationOffset: 50,
  leftExpandOrigin: 'right', // Left slot expands from right edge (leftward)
  rightExpandOrigin: 'left', // Right slot expands from left edge (rightward)
}

// ============================================================================
// DEFAULT LAYOUT CONFIG
// ============================================================================

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  triggerWidth: 64,
  triggerHeight: 64,
  maxLeftWidth: 120,
  maxRightWidth: 120,
  borderRadius: 16,
  leftGap: 0,
  rightGap: 0,
}

// ============================================================================
// DEFAULT SLOT CONFIGS
// ============================================================================

export const DEFAULT_LEFT_SLOT_CONFIG: SlotConfig = {
  enabled: true,
  width: 80,
  delayOffset: 0,
  durationOffset: 0,
  background: 'secondary',
  borderRadius: 12,
  inset: 4,
  borderWidth: 0,
}

export const DEFAULT_TRIGGER_SLOT_CONFIG: SlotConfig = {
  enabled: true,
  background: 'none',
  inset: 0,
}

export const DEFAULT_RIGHT_SLOT_CONFIG: SlotConfig = {
  enabled: true,
  width: 80,
  delayOffset: 0,
  durationOffset: 0,
  background: 'secondary',
  borderRadius: 12,
  inset: 4,
  borderWidth: 0,
}

// ============================================================================
// COMPLETE DEFAULT CONFIG
// ============================================================================

export const DEFAULT_HORIZONTAL_EXPAND_CONFIG: HorizontalExpandConfig = {
  animation: DEFAULT_ANIMATION_CONFIG,
  layout: DEFAULT_LAYOUT_CONFIG,
  appearance: {
    background: 'tertiary',
    borderRadius: 16,
    shadow: 'lg',
    squircle: true,
  },
  leftSlot: DEFAULT_LEFT_SLOT_CONFIG,
  triggerSlot: DEFAULT_TRIGGER_SLOT_CONFIG,
  rightSlot: DEFAULT_RIGHT_SLOT_CONFIG,
  debug: false,
}

// ============================================================================
// EASING
// ============================================================================

export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
