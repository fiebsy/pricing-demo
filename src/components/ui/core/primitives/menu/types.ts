/**
 * Menu - Type Definitions
 *
 * Base types for the Menu component system.
 * FilterMenu and other derivatives extend these types.
 *
 * @module prod/base/menu/types
 */

import type { ReactNode, ComponentType } from 'react'

// ============================================================================
// Menu Item Types
// ============================================================================

/** HugeIcon data format from @hugeicons-pro imports */
export type HugeIconData = Array<[string, Record<string, unknown>]>

/** Icon type - supports both component format and HugeIcon data format */
export type IconType = ComponentType<{ className?: string }> | HugeIconData | { default: HugeIconData }

/** Base properties shared by all menu items */
export interface MenuItemBase {
  id: string
  label: string
  icon?: IconType
  disabled?: boolean
}

/** Action menu item - triggers callback on click */
export interface MenuItemAction extends MenuItemBase {
  type?: 'action'
  onClick?: () => void
  shortcut?: string
  /** Shows checkmark if true */
  selected?: boolean
}

/** Checkbox menu item - toggleable with persistent state */
export interface MenuItemCheckbox extends MenuItemBase {
  type: 'checkbox'
  /** Current checked state */
  checked: boolean
  /** Callback when checkbox is toggled */
  onCheckedChange: (checked: boolean) => void
  /** Whether to close menu after toggling (default: false) */
  closeOnClick?: boolean
}

/** Submenu item - contains nested items with slide animation */
export interface MenuItemSubmenu extends MenuItemBase {
  type: 'submenu'
  items: MenuItem[]
  description?: string
  /** Shows badge with count if > 0 */
  activeCount?: number
}

/** Visual separator between items */
export interface MenuItemSeparator {
  type: 'separator'
  id: string
}

/** Section label/header */
export interface MenuItemLabel {
  type: 'label'
  id: string
  label: string
}

/** Union of all menu item types */
export type MenuItem =
  | MenuItemAction
  | MenuItemCheckbox
  | MenuItemSubmenu
  | MenuItemSeparator
  | MenuItemLabel

// ============================================================================
// Position Types
// ============================================================================

export type MenuSide = 'top' | 'right' | 'bottom' | 'left'
export type MenuAlign = 'start' | 'center' | 'end'

// ============================================================================
// Appearance Types
// ============================================================================

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ShineVariant =
  | 'none'
  | 'shine-0' | 'shine-0-subtle' | 'shine-0-intense'
  | 'shine-1' | 'shine-1-subtle' | 'shine-1-intense'
  | 'shine-2' | 'shine-2-subtle' | 'shine-2-intense'
  | 'shine-3' | 'shine-3-subtle' | 'shine-3-intense'
  | 'shine-brand' | 'shine-brand-subtle' | 'shine-brand-intense'
export type Background = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
export type GradientPattern =
  | 'none'
  | 'subtle-depth-sm' | 'subtle-depth-md' | 'subtle-depth-lg' | 'subtle-depth-xl'
export type GradientColor =
  | 'brand' | 'primary' | 'secondary' | 'tertiary'
  | 'gray' | 'gray-light'

/** Appearance configuration for the menu popup */
export interface MenuAppearance {
  borderRadius?: BorderRadius
  shadow?: Shadow
  shine?: ShineVariant
  background?: Background
  gradient?: GradientPattern
  gradientColor?: GradientColor
  squircle?: boolean
}

// ============================================================================
// Animation Types
// ============================================================================

/**
 * Opacity animation modes for panel transitions.
 *
 * @see TRANSITION-ANIMATION.md for detailed documentation
 */
export type OpacityMode =
  | 'none'                  // Both panels visible during slide (debug)
  | 'instant'               // Opacity flips immediately
  | 'instant-out-fade-in'   // Outgoing instant, incoming fades
  | 'quick-out-fade-in'     // Outgoing quick fade, incoming fades with delay
  | 'crossfade'             // Both fade simultaneously
  | 'sequential'            // Outgoing fades first, then incoming

export interface AnimationConfig {
  /** Duration of panel slide transition (ms) */
  duration?: number
  /** CSS easing function for slide */
  easing?: string
  /** Enable height animation between panels */
  animateHeight?: boolean

  /**
   * Opacity animation mode for panel transitions.
   * @default 'quick-out-fade-in'
   */
  opacityMode?: OpacityMode
  /** Duration of incoming panel fade (ms) */
  opacityDuration?: number
  /** CSS easing function for opacity transitions */
  opacityEasing?: string
  /** Duration of outgoing panel fade for quick-out mode (ms). 0 = instant */
  quickOutDuration?: number
  /** Delay before incoming panel starts fading in (ms) */
  fadeInDelay?: number
  /** Delay for sequential mode (ms) */
  staggerDelay?: number
}

// ============================================================================
// Component Props
// ============================================================================

export interface MenuProps {
  /** Menu items to display */
  items: MenuItem[]
  /** Trigger element (required) */
  trigger: ReactNode
  /** Header content slot */
  header?: ReactNode
  /** Menu width in pixels */
  width?: number
  /** Position relative to trigger */
  side?: MenuSide
  /** Alignment relative to trigger */
  align?: MenuAlign
  /** Offset from trigger (pixels) */
  sideOffset?: number
  /** Offset along alignment axis (pixels) */
  alignOffset?: number
  /** Callback when menu opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Callback when an action item is selected */
  onSelect?: (item: MenuItemAction) => void
  /** Appearance overrides */
  appearance?: MenuAppearance
  /** Animation configuration */
  animation?: AnimationConfig
  /** Additional className for popup */
  className?: string
}

/** Internal state for panel navigation */
export interface PanelState {
  id: string
  title: string
  items: MenuItem[]
}
