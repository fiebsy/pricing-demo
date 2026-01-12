/**
 * FilterSelectChipMotion - Type Definitions
 *
 * Motion-based filter chip with AnimatePresence + popLayout for fluid
 * add/remove animations. Uses Base UI Select for dropdown functionality.
 *
 * @module prod/base/filter/filter-select-chip-motion/types
 */

import type * as React from 'react'

// ============================================================================
// ICON TYPES
// ============================================================================

/** Generic icon component type compatible with HugeIcons */
export type IconComponent = React.ComponentType<{ className?: string }>

// ============================================================================
// FILTER OPTION TYPES
// ============================================================================

export interface FilterOption {
  /** Unique identifier for the option */
  id: string
  /** Display label */
  label: string
  /** Whether this option is disabled */
  disabled?: boolean
}

export interface FilterChipData {
  /** Unique identifier for the filter */
  id: string
  /** Display label (shown in dropdown header) */
  label: string
  /** Optional icon for the chip */
  icon?: IconComponent
  /** Currently selected value (option ID) */
  value: string
  /** Available options for this filter */
  options: FilterOption[]
}

// ============================================================================
// ANIMATION CONFIG TYPES
// ============================================================================

/** Direction chips enter from */
export type EntryDirection = 'right' | 'left' | 'up' | 'down' | 'none'

/** Transition type for animations */
export type TransitionType = 'spring' | 'tween'

/** Easing presets for tween transitions */
export type EasingType = 'easeOut' | 'easeInOut' | 'circOut' | 'backOut' | 'anticipate' | 'expo'

export interface AnimationConfig {
  /** Transition type: 'spring' for physics-based, 'tween' for duration-based */
  transitionType: TransitionType
  /** Easing curve (for tween only) */
  easing: EasingType
  /** Animation duration in seconds (for tween, also used for opacity fade) */
  duration: number
  /** Stagger delay between chips in seconds */
  stagger: number
  /** Direction chips enter from (currently unused, reserved for future) */
  entryDirection: EntryDirection
  /** Distance chips travel in pixels (currently unused, reserved for future) */
  entryDistance: number
  /** Spring stiffness - higher = snappier (for spring only) */
  stiffness: number
  /** Spring damping - higher = less bounce (for spring only) */
  damping: number
  /** Exit animation duration in seconds */
  exitDuration: number
}

// ============================================================================
// STYLE CONFIG TYPES
// ============================================================================

/** Gap between chips */
export type ChipGap = 'sm' | 'md' | 'lg'

/** Chip border radius */
export type ChipRoundness = 'md' | 'lg' | 'xl' | 'full'

/** Chip size preset */
export type ChipSize = 'sm' | 'md' | 'lg'

export interface StyleConfig {
  /** Gap between chips */
  gap: ChipGap
  /** Chip border radius */
  roundness: ChipRoundness
  /** Chip size preset */
  size: ChipSize
}

export interface SizeConfig {
  /** Height in pixels */
  height: number
  /** Tailwind text class */
  text: string
  /** Tailwind padding class */
  padding: string
  /** Icon size in pixels */
  iconSize: number
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface FilterSelectChipMotionProps {
  /** Active filter chips to display */
  filters: FilterChipData[]
  /** Callback when a filter value changes */
  onFilterChange?: (filterId: string, value: string) => void
  /** Callback when a filter is removed */
  onFilterRemove?: (filterId: string) => void
  /** Animation configuration */
  animationConfig?: Partial<AnimationConfig>
  /** Style configuration */
  styleConfig?: Partial<StyleConfig>
  /** Show debug info (chip indices) */
  showDebug?: boolean
  /** Additional className for the container */
  className?: string
}

// ============================================================================
// INTERNAL COMPONENT PROPS
// ============================================================================

export interface AnimatedChipProps {
  /** Filter data */
  filter: FilterChipData
  /** Chip index (for debug display) */
  index: number
  /** Animation configuration */
  animationConfig: AnimationConfig
  /** Style configuration */
  styleConfig: StyleConfig
  /** Whether reduced motion is preferred */
  shouldReduceMotion: boolean | null
  /** Called when value changes */
  onValueChange: (value: string) => void
  /** Called when chip is removed */
  onRemove: () => void
  /** Show debug index */
  showDebug?: boolean
}

export interface ChipTriggerProps {
  /** Currently selected display value */
  displayValue: string
  /** Icon component */
  icon: IconComponent
  /** Size configuration */
  sizeConfig: SizeConfig
  /** Whether dropdown is open */
  isOpen: boolean
  /** Roundness class */
  roundnessClass: string
}

export interface ChipPopupProps {
  /** Filter label (shown in header) */
  label: string
  /** Available options */
  options: FilterOption[]
  /** Whether popup is open */
  isOpen: boolean
}

export interface OptionItemProps {
  /** Option data */
  option: FilterOption
}

export interface RemoveButtonProps {
  /** Filter label for aria-label */
  filterLabel: string
  /** Icon size in pixels */
  iconSize: number
  /** Height for alignment */
  height: number
  /** Called when clicked */
  onRemove: () => void
}
