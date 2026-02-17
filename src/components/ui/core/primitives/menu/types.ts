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

/** Spring preset names */
export type SpringPreset = 'default' | 'snappy' | 'smooth' | 'bouncy' | 'custom'

/**
 * Animation configuration for spring-based panel transitions.
 */
export interface AnimationConfig {
  /**
   * Spring preset for quick selection.
   * @default 'default'
   */
  springPreset?: SpringPreset

  /**
   * Spring stiffness - higher = faster, snappier.
   * Only used when springPreset === 'custom'.
   * @default 650
   */
  springStiffness?: number

  /**
   * Spring damping - higher = less oscillation.
   * Only used when springPreset === 'custom'.
   * @default 38
   */
  springDamping?: number

  /**
   * Spring mass - higher = more momentum.
   * Only used when springPreset === 'custom'.
   * @default 0.9
   */
  springMass?: number

  /**
   * Duration of incoming panel opacity fade (ms).
   * @default 220
   */
  opacityDuration?: number

  /**
   * Duration of outgoing panel quick fade (ms).
   * @default 80
   */
  quickOutDuration?: number

  /**
   * Enable height animation between panels.
   * @default true
   */
  animateHeight?: boolean

  /**
   * Sync opacity transitions to spring timing.
   * When true, opacity uses spring physics instead of fixed duration.
   * @default false
   */
  syncOpacityToSpring?: boolean

  /**
   * Enable slow motion debug mode.
   * When true, spring animations run at 10% speed for debugging.
   * @default false
   */
  slowMoEnabled?: boolean

  /**
   * Enable blur effect during crossfade transitions.
   * Panels blur when fading out for a depth-of-field effect.
   * @default false
   */
  blurOnFade?: boolean

  /**
   * Blur radius in pixels when fading out.
   * Only used when blurOnFade is true.
   * @default 4
   */
  blurAmount?: number

  // ---- Reveal Animation Settings ----

  /**
   * Duration of reveal animation in ms.
   * @default 200
   */
  revealDuration?: number

  /**
   * Starting scale for reveal animation (0-1).
   * Lower values = more dramatic scale effect.
   * @default 0.4
   */
  revealScale?: number

  /**
   * Slide offset ratio relative to sideOffset.
   * 0 = no slide, 1 = full sideOffset distance.
   * @default 0.5
   */
  revealSlideRatio?: number

  /**
   * Enable exit animation when menu closes.
   * When false, menu disappears instantly on close.
   * @default true
   */
  animateOnClose?: boolean
}

// ============================================================================
// Feature Toggles
// ============================================================================

/**
 * Feature toggles for Menu functionality.
 */
export interface MenuFeatures {
  /**
   * Enable submenu navigation.
   * When false, only renders flat menu items.
   * @default true
   */
  submenu?: boolean

  /**
   * Enable height animation between panels.
   * @default true
   */
  animateHeight?: boolean

  /**
   * Enable reveal animation on open.
   * @default true
   */
  revealAnimation?: boolean
}

// ============================================================================
// Trigger Types
// ============================================================================

/**
 * State passed to render prop triggers.
 */
export interface TriggerState {
  /** Whether the menu is currently open */
  isOpen: boolean
  /** Toggle the menu open/closed */
  toggle: () => void
}

// ============================================================================
// Component Props
// ============================================================================

export interface MenuProps {
  /** Menu items to display */
  items: MenuItem[]
  /** Trigger element - can be a ReactNode or render prop receiving trigger state */
  trigger: ReactNode | ((state: TriggerState) => ReactNode)
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
  /** Controlled open state */
  open?: boolean
  /** Callback when menu opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Callback when an action item is selected */
  onSelect?: (item: MenuItemAction) => void
  /** Appearance overrides */
  appearance?: MenuAppearance
  /** Animation configuration */
  animation?: AnimationConfig
  /** Feature toggles */
  features?: MenuFeatures
  /** Additional className for popup */
  className?: string
}

/** Internal state for panel navigation */
export interface PanelState {
  id: string
  title: string
  items: MenuItem[]
}
