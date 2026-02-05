/**
 * Horizontal Expand V1 - Type Definitions
 *
 * Composable slot-based architecture for horizontal expansion.
 * Containers expand left/right using clip-path animations.
 */

import type * as React from 'react'

// ============================================================================
// SLOT TYPES
// ============================================================================

/**
 * Available slot positions in the horizontal expand system.
 * - 'left': Expands leftward from the trigger
 * - 'trigger': The anchor element (always visible)
 * - 'right': Expands rightward from the trigger
 */
export type SlotPosition = 'left' | 'trigger' | 'right'

/**
 * Expansion direction for content.
 * - 'left': Clip from right, expands leftward
 * - 'right': Clip from left, expands rightward
 * - 'center': Expand from middle both ways
 */
export type HorizontalExpandOrigin = 'left' | 'right' | 'center'

/**
 * Configuration for individual slots.
 */
export interface SlotConfig {
  /** Whether this slot is enabled */
  enabled?: boolean
  /** Fixed width for this slot (px) */
  width?: number
  /** Animation delay offset (ms) */
  delayOffset?: number
  /** Animation duration offset (ms) */
  durationOffset?: number
  /** Background option */
  background?: BackgroundOption
  /** Border radius override */
  borderRadius?: number
  /** Inset from container edges */
  inset?: number
  /** Border width */
  borderWidth?: number
  /** Border color */
  borderColor?: BorderColorOption
}

// ============================================================================
// BACKGROUND & APPEARANCE TYPES
// ============================================================================

export type BackgroundOption =
  | 'none'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'

export type BorderColorOption =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand'

// ============================================================================
// ANIMATION TYPES
// ============================================================================

/**
 * Core animation configuration.
 */
export interface AnimationConfig {
  /** Duration for expand animation (ms) */
  duration: number
  /** Duration for collapse animation (ms) */
  collapseDuration: number
  /** Content fade duration (ms) */
  contentFadeDuration: number
  /** Content fade delay (ms) */
  contentFadeDelay: number
  /** Enable slot container clip-path animation */
  animateSlotContainers: boolean
  /** Slot container delay (ms) */
  slotContainerDelay: number
  /** Slot container duration offset (ms) */
  slotContainerDurationOffset: number
  /** Expansion origin for left slot (from which edge content reveals) */
  leftExpandOrigin: HorizontalExpandOrigin
  /** Expansion origin for right slot */
  rightExpandOrigin: HorizontalExpandOrigin
}

// ============================================================================
// DIMENSION TYPES
// ============================================================================

/**
 * Measured dimensions for all slots.
 */
export interface SlotDimensions {
  /** Left slot width when expanded */
  leftWidth: number
  /** Trigger slot width */
  triggerWidth: number
  /** Right slot width when expanded */
  rightWidth: number
  /** Total height of the component */
  height: number
}

/**
 * Calculated layout values.
 */
export interface LayoutConfig {
  /** Width of trigger element */
  triggerWidth: number
  /** Height of trigger element */
  triggerHeight: number
  /** Maximum width for left content */
  maxLeftWidth: number
  /** Maximum width for right content */
  maxRightWidth: number
  /** Border radius for the entire component */
  borderRadius: number
  /** Gap between left slot and trigger */
  leftGap: number
  /** Gap between trigger and right slot */
  rightGap: number
}

// ============================================================================
// ROOT CONFIG
// ============================================================================

/**
 * Complete configuration for HorizontalExpandV1.
 */
export interface HorizontalExpandConfig {
  // Animation
  animation: AnimationConfig

  // Layout
  layout: LayoutConfig

  // Appearance
  appearance: {
    background: BackgroundOption
    borderRadius: number
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    shine?: string
    squircle?: boolean
  }

  // Collapsed state appearance override (optional)
  collapsedBackground?: BackgroundOption

  // Slot-specific configs
  leftSlot: SlotConfig
  triggerSlot: SlotConfig
  rightSlot: SlotConfig

  // Debug
  debug?: boolean
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

/**
 * Context value provided by HorizontalExpandV1.Root.
 */
export interface HorizontalExpandContextValue {
  // State
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  hovered: boolean
  setHovered: (hovered: boolean) => void

  // Config
  config: HorizontalExpandConfig

  // Dimensions (measured from slots)
  dimensions: SlotDimensions

  // Refs for slot measurement
  refs: {
    container: React.RefObject<HTMLDivElement | null>
    left: React.RefObject<HTMLDivElement | null>
    trigger: React.RefObject<HTMLDivElement | null>
    right: React.RefObject<HTMLDivElement | null>
  }

  // Dimension setters (called by slots)
  setSlotWidth: (slot: SlotPosition, width: number) => void

  // Calculated values
  totalExpandedWidth: number

  // Animation timing
  timing: {
    duration: number
    slotDuration: (slot: SlotPosition) => number
    slotDelay: (slot: SlotPosition) => number
  }
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface HorizontalExpandRootProps {
  /** Configuration (merged with defaults) */
  config?: Partial<HorizontalExpandConfig>
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Additional className */
  className?: string
  /** Children (slot components) */
  children: React.ReactNode
}

export interface SlotProps {
  /** Children to render in the slot */
  children: React.ReactNode
  /** Additional className */
  className?: string
  /** Override slot config */
  config?: Partial<SlotConfig>
}

export interface BackdropProps {
  /** Additional className */
  className?: string
}
