/**
 * Biaxial Expand - Type Definitions
 *
 * Composable slot-based architecture with flexible content areas.
 * Designed for maximum flexibility while maintaining beautiful
 * biaxial animation.
 */

import type * as React from 'react'
import type { MenuAppearance } from '@/components/ui/core/primitives/menu/types'

// ============================================================================
// SLOT TYPES
// ============================================================================

/**
 * Available slot positions in the biaxial expand system.
 * - 'top': Expands upward from the trigger
 * - 'trigger': The anchor element (input, button, etc.)
 * - 'bottom': Expands downward from the trigger
 * - 'left': Expands leftward from the trigger
 * - 'right': Expands rightward from the trigger
 */
export type SlotPosition = 'top' | 'trigger' | 'bottom' | 'left' | 'right'

/**
 * Configuration for individual slots.
 */
export interface SlotConfig {
  /** Whether this slot is enabled */
  enabled?: boolean
  /** Height mode: 'fixed' uses height prop, 'auto' sizes to content, 'dynamic' uses maxHeight */
  heightMode?: 'fixed' | 'auto' | 'dynamic'
  /** Fixed height for this slot (px). If not set, auto-measures content */
  height?: number
  /** Animation delay offset (ms) */
  delayOffset?: number
  /** Animation duration offset (ms) */
  durationOffset?: number
  /** Background option */
  background?: BackgroundOption
  /** Shine effect class (e.g., 'shine-2-subtle', 'none') */
  shine?: string
  /** Border radius override */
  borderRadius?: number
  /** Inset from container edges */
  inset?: number
  /** Border width */
  borderWidth?: number
  /** Border color */
  borderColor?: BorderColorOption
  /** Appearance config (for nested inset) */
  appearance?: { inset?: number }
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
 * Animation mode for the backdrop layer.
 */
export type BackdropAnimationMode = 'size' | 'clip-path'

/**
 * Expansion direction for content (vertical).
 */
export type ExpandOrigin = 'top' | 'center' | 'bottom'

/**
 * Horizontal expansion origin.
 */
export type ExpandOriginX = 'left' | 'center' | 'right'

/**
 * Position mode for expanded panel.
 * - 'overlay': Panel floats above page content (default)
 * - 'push': Expanding panel pushes content below it
 */
export type PositionMode = 'overlay' | 'push'

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
  /** Enable menu container animation */
  animateSlotContainers: boolean
  /** Slot container delay (ms) */
  slotContainerDelay: number
  /** Slot container duration offset (ms) */
  slotContainerDurationOffset: number
  /** Expansion origin for bottom slot content */
  expandOrigin: ExpandOrigin
  /** Expansion origin for top slot content (default: 'bottom' = expands upward) */
  topExpandOrigin?: ExpandOrigin
}

// ============================================================================
// DIMENSION TYPES
// ============================================================================

/**
 * Measured dimensions for all slots.
 */
export interface SlotDimensions {
  /** Top slot height when expanded */
  topHeight: number
  /** Trigger slot height */
  triggerHeight: number
  /** Bottom slot height when expanded */
  bottomHeight: number
  /** Total width of the expanded panel */
  panelWidth: number
  /** Collapsed trigger width */
  triggerWidth: number
  /** Left slot width when expanded */
  leftWidth: number
  /** Right slot width when expanded */
  rightWidth: number
}

/**
 * Calculated layout values.
 */
export interface LayoutConfig {
  /** Width of collapsed trigger */
  triggerWidth: number
  /** Height of collapsed trigger */
  triggerHeight: number
  /** Width of expanded panel */
  panelWidth: number
  /** Maximum height for top content (enables scrollable content in top slot) */
  maxTopHeight?: number
  /** Maximum height for bottom content */
  maxBottomHeight: number
  /** Border radius for the entire component */
  borderRadius: number
  /**
   * Gap between top slot and trigger
   * @deprecated Use topSlot.inset instead for uniform spacing on all sides
   */
  topGap: number
  /** Gap between trigger and bottom slot */
  bottomGap: number
  /** Gap between left slot and trigger */
  leftGap?: number
  /** Gap between trigger and right slot */
  rightGap?: number
  /** Maximum width for left slot */
  maxLeftWidth?: number
  /** Maximum width for right slot */
  maxRightWidth?: number
  /** Backdrop top offset */
  backdropTopOffset: number
  /** Horizontal expansion origin @default 'center' */
  expandOriginX?: ExpandOriginX
  /** Position mode @default 'overlay' */
  positionMode?: PositionMode
}

// ============================================================================
// ROOT CONFIG
// ============================================================================

/**
 * Complete configuration for BiaxialExpand.
 */
export interface BiaxialExpandConfig {
  // Animation
  animation: AnimationConfig

  // Layout
  layout: LayoutConfig

  // Appearance
  appearance: MenuAppearance

  // Collapsed state appearance override (optional)
  collapsedBackground?: BackgroundOption

  // Slot-specific configs
  topSlot: SlotConfig
  triggerSlot: SlotConfig
  bottomSlot: SlotConfig
  leftSlot: SlotConfig
  rightSlot: SlotConfig

  // Confidence level for visual feedback (0-1, null/undefined = no feedback)
  confidenceLevel?: number | null

  // Debug
  debug?: boolean
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

/**
 * Context value provided by BiaxialExpand.Root.
 */
export interface BiaxialExpandContextValue {
  // State
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  hovered: boolean
  setHovered: (hovered: boolean) => void
  /** Lock state - when locked, menu won't collapse on blur/click outside */
  isLocked: boolean
  /** Toggle or set the lock state */
  setLocked: (locked: boolean) => void

  // Config
  config: BiaxialExpandConfig

  // Dimensions (measured from slots)
  dimensions: SlotDimensions

  // Refs for slot measurement
  refs: {
    container: React.RefObject<HTMLDivElement | null>
    top: React.RefObject<HTMLDivElement | null>
    trigger: React.RefObject<HTMLDivElement | null>
    bottom: React.RefObject<HTMLDivElement | null>
    left: React.RefObject<HTMLDivElement | null>
    right: React.RefObject<HTMLDivElement | null>
  }

  // Dimension setters (called by slots)
  setSlotHeight: (slot: SlotPosition, height: number) => void
  setSlotWidth: (slot: 'left' | 'right', width: number) => void

  // Calculated values
  totalExpandedHeight: number
  totalExpandedWidth: number

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

export interface BiaxialExpandRootProps {
  /** Configuration (merged with defaults) */
  config?: Partial<BiaxialExpandConfig>
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Controlled lock state - prevents collapse on blur/click outside */
  isLocked?: boolean
  /** Called when lock state changes (via Cmd+Shift+L) */
  onLockedChange?: (locked: boolean) => void
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

// ============================================================================
// VARIANT TYPES (for built-in components)
// ============================================================================

/**
 * Props for the built-in SearchInput trigger variant.
 */
export interface SearchInputProps {
  /** Placeholder text */
  placeholder?: string
  /** Current value */
  value?: string
  /** Value change handler */
  onValueChange?: (value: string) => void
  /** Called when escape is pressed */
  onEscape?: () => void
  /** Called when arrow down is pressed */
  onArrowDown?: () => void
  /** Additional className */
  className?: string
}

/**
 * Props for the built-in MenuContent variant.
 */
export interface MenuContentProps {
  /** Command groups to display */
  groups: CommandGroup[]
  /** Filter value for searching */
  filter?: string
  /** Called when item is selected */
  onSelect?: (item: CommandItemAction) => void
  /** Empty state message */
  emptyMessage?: string
  /** Additional className */
  className?: string
  /** Item height */
  itemHeight?: number
  /** Gap between items */
  itemGap?: number
  /** Item styling */
  itemPaddingX?: number
  itemPaddingY?: number
  itemBorderRadius?: number
  itemHighlightBackground?: BackgroundOption
  itemHoverBackground?: BackgroundOption
  itemIconSize?: number
  itemIconGap?: number
  itemIconOpacity?: number
}

// ============================================================================
// COMMAND ITEM TYPES
// ============================================================================

export interface CommandItemBase {
  id: string
  label: string
  description?: string
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
  shortcut?: string[]
  navigates?: boolean
}

export interface CommandItemAction extends CommandItemBase {
  type?: 'action'
  onSelect?: () => void
}

export interface CommandItemSeparator {
  type: 'separator'
  id: string
}

export type CommandItem = CommandItemAction | CommandItemSeparator

export interface CommandGroup {
  id: string
  label: string
  items: CommandItem[]
}
