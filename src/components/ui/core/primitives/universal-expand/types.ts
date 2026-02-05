/**
 * Universal Expand - Type Definitions
 *
 * Extends the BiaxialExpand architecture to support 4-directional expansion
 * (top, bottom, left, right) while preserving the GPU-accelerated clip-path
 * animation system.
 */

import type * as React from 'react'
import type { MenuAppearance } from '@/components/ui/core/primitives/menu/types'

// ============================================================================
// SLOT POSITION & AXIS
// ============================================================================

/**
 * Extended slot positions supporting 4-directional expansion.
 */
export type ExtendedSlotPosition = 'top' | 'bottom' | 'left' | 'right'

/**
 * All slot positions including trigger.
 */
export type SlotPosition = ExtendedSlotPosition | 'trigger'

/**
 * Axis type for dimension calculations.
 */
export type Axis = 'vertical' | 'horizontal'

/**
 * Maps slot positions to their expansion axis.
 * Vertical slots expand in height, horizontal slots expand in width.
 */
export const SLOT_AXIS_MAP: Record<ExtendedSlotPosition, Axis> = {
  top: 'vertical',
  bottom: 'vertical',
  left: 'horizontal',
  right: 'horizontal',
}

/**
 * Gets the axis for a slot position.
 */
export function getSlotAxis(position: ExtendedSlotPosition): Axis {
  return SLOT_AXIS_MAP[position]
}

/**
 * Checks if a slot is on a vertical axis (expands in height).
 */
export function isVerticalSlot(position: ExtendedSlotPosition): boolean {
  return SLOT_AXIS_MAP[position] === 'vertical'
}

/**
 * Checks if a slot is on a horizontal axis (expands in width).
 */
export function isHorizontalSlot(position: ExtendedSlotPosition): boolean {
  return SLOT_AXIS_MAP[position] === 'horizontal'
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

export type ShineOption =
  | 'none'
  | 'shine-1-subtle'
  | 'shine-2-subtle'
  | 'shine-3-subtle'

// ============================================================================
// DIMENSION TYPES
// ============================================================================

/**
 * Dimension mode for slots.
 */
export type DimensionMode = 'fixed' | 'auto' | 'dynamic'

/**
 * Expansion origin for clip-path animations.
 * For vertical slots: 'start' = top, 'end' = bottom
 * For horizontal slots: 'start' = left, 'end' = right
 */
export type ExpandOrigin = 'start' | 'center' | 'end'

/**
 * Legacy expand origin for backward compatibility.
 */
export type LegacyExpandOrigin = 'top' | 'center' | 'bottom'

/**
 * Measured dimensions for all slots.
 */
export interface SlotDimensions {
  /** Top slot height when expanded */
  topHeight: number
  /** Bottom slot height when expanded */
  bottomHeight: number
  /** Left slot width when expanded */
  leftWidth: number
  /** Right slot width when expanded */
  rightWidth: number
  /** Trigger slot width */
  triggerWidth: number
  /** Trigger slot height */
  triggerHeight: number
  /** Total width of the expanded panel */
  panelWidth: number
  /** Total height of the expanded panel */
  panelHeight: number
}

// ============================================================================
// GAP CONFIGURATION
// ============================================================================

/**
 * Gap configuration for all 4 directions.
 */
export interface GapConfig {
  top: number
  bottom: number
  left: number
  right: number
}

// ============================================================================
// SLOT APPEARANCE
// ============================================================================

/**
 * Visual appearance configuration for slots.
 */
export interface SlotAppearance {
  /** Background color option */
  background: BackgroundOption
  /** Shine effect class */
  shine: ShineOption
  /** Border radius in pixels */
  borderRadius: number
  /** Inset from container edges */
  inset: number
  /** Border width */
  borderWidth: number
  /** Border color */
  borderColor: BorderColorOption
}

// ============================================================================
// SLOT ANIMATION
// ============================================================================

/**
 * Animation timing configuration for slots.
 */
export interface SlotAnimation {
  /** Animation delay offset (ms) */
  delayOffset: number
  /** Animation duration offset (ms) */
  durationOffset: number
  /** Expansion origin for clip-path animation */
  expandOrigin: ExpandOrigin
}

// ============================================================================
// SLOT SCROLL
// ============================================================================

/**
 * Scroll/overflow configuration for slots.
 */
export interface SlotScroll {
  /** Show overflow gradient */
  overflowGradient: boolean
  /** Gradient height in pixels */
  gradientHeight: number
  /** Top padding for content */
  paddingTop: number
  /** Bottom padding for content */
  paddingBottom: number
}

// ============================================================================
// UNIFIED SLOT CONFIG
// ============================================================================

/**
 * Complete configuration for a single slot.
 * Position-agnostic - works for all 4 directions.
 */
export interface UnifiedSlotConfig {
  /** Whether this slot is enabled */
  enabled: boolean

  /** Dimension mode: 'fixed', 'auto', or 'dynamic' */
  dimensionMode: DimensionMode

  /** Fixed dimension value (height for vertical, width for horizontal) */
  fixedDimension?: number

  /** Maximum dimension value */
  maxDimension?: number

  /** Minimum dimension value */
  minDimension?: number

  /** Visual appearance */
  appearance: SlotAppearance

  /** Animation timing */
  animation: SlotAnimation

  /** Scroll configuration */
  scroll: SlotScroll
}

// ============================================================================
// SLOTS CONFIGURATION
// ============================================================================

/**
 * Configuration for all slots.
 */
export interface SlotsConfig {
  top: UnifiedSlotConfig
  bottom: UnifiedSlotConfig
  left: UnifiedSlotConfig
  right: UnifiedSlotConfig
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Animation mode for the backdrop layer.
 */
export type BackdropAnimationMode = 'size' | 'clip-path'

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
  /** Backdrop animation mode */
  backdropMode: BackdropAnimationMode
  /** Backdrop delay (ms) */
  backdropDelay: number
  /** Backdrop duration offset (ms) */
  backdropDurationOffset: number
  /** Enable slot container clip-path animation */
  animateSlotContainers: boolean
  /** Slot container delay (ms) */
  slotContainerDelay: number
  /** Slot container duration offset (ms) */
  slotContainerDurationOffset: number
}

// ============================================================================
// LAYOUT CONFIGURATION
// ============================================================================

/**
 * Layout configuration for the universal expand component.
 */
export interface LayoutConfig {
  /** Width of collapsed trigger */
  triggerWidth: number
  /** Height of collapsed trigger */
  triggerHeight: number
  /** Width of expanded panel (when no horizontal slots enabled) */
  panelWidth: number
  /** Gaps between trigger and slots */
  gaps: GapConfig
  /** Border radius for the entire component */
  borderRadius: number
}

// ============================================================================
// TRIGGER SLOT CONFIG
// ============================================================================

/**
 * Simplified config for the trigger slot.
 */
export interface TriggerSlotConfig {
  /** Whether trigger slot is enabled */
  enabled: boolean
  /** Background option */
  background: BackgroundOption
  /** Inset from container edges */
  inset: number
}

// ============================================================================
// ROOT CONFIGURATION
// ============================================================================

/**
 * Complete configuration for UniversalExpand.
 */
export interface UniversalExpandConfig {
  /** Animation settings */
  animation: AnimationConfig
  /** Layout settings */
  layout: LayoutConfig
  /** Visual appearance for backdrop */
  appearance: MenuAppearance
  /** Collapsed state background override */
  collapsedBackground?: BackgroundOption
  /** Slot configurations */
  slots: SlotsConfig
  /** Trigger slot config */
  triggerSlot: TriggerSlotConfig
  /** Confidence level for visual feedback (0-1) */
  confidenceLevel?: number | null
  /** Debug mode */
  debug?: boolean
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

/**
 * Context value provided by UniversalExpand.Root.
 */
export interface UniversalExpandContextValue {
  // State
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  hovered: boolean
  setHovered: (hovered: boolean) => void
  isLocked: boolean
  setLocked: (locked: boolean) => void

  // Config
  config: UniversalExpandConfig

  // Dimensions (measured from slots)
  dimensions: SlotDimensions

  // Refs for slot measurement
  refs: {
    container: React.RefObject<HTMLDivElement | null>
    top: React.RefObject<HTMLDivElement | null>
    bottom: React.RefObject<HTMLDivElement | null>
    left: React.RefObject<HTMLDivElement | null>
    right: React.RefObject<HTMLDivElement | null>
    trigger: React.RefObject<HTMLDivElement | null>
  }

  // Dimension setters (called by slots)
  setSlotDimension: (slot: ExtendedSlotPosition, dimension: number) => void

  // Calculated values
  totalExpandedWidth: number
  totalExpandedHeight: number

  // Animation timing
  timing: {
    duration: number
    backdropDuration: number
    slotDuration: (slot: SlotPosition) => number
    slotDelay: (slot: SlotPosition) => number
  }
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface UniversalExpandRootProps {
  /** Configuration (merged with defaults) */
  config?: Partial<UniversalExpandConfig>
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Controlled lock state */
  isLocked?: boolean
  /** Called when lock state changes */
  onLockedChange?: (locked: boolean) => void
  /** Additional className */
  className?: string
  /** Children (slot components) */
  children: React.ReactNode
}

export interface UniversalSlotProps {
  /** Slot position */
  position: ExtendedSlotPosition
  /** Children to render in the slot */
  children: React.ReactNode
  /** Additional className */
  className?: string
  /** Override slot config */
  config?: Partial<UnifiedSlotConfig>
}

export interface BackdropProps {
  /** Additional className */
  className?: string
}

export interface TriggerSlotProps {
  /** Children to render in the trigger */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

export interface ContentLayerProps {
  /** Children to render */
  children: React.ReactNode
  /** Additional className */
  className?: string
}
