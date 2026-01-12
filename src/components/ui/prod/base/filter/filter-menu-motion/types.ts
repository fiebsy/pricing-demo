/**
 * FilterMenuMotion - Type Definitions
 *
 * Shared types for the filter menu with Motion Dev animations.
 *
 * @module prod/base/filter/filter-menu-motion/types
 */

import type { ComponentType } from 'react'

// ============================================================================
// ICON TYPE
// ============================================================================

export type IconType = ComponentType<{ className?: string }>

// ============================================================================
// MENU ITEM TYPES
// ============================================================================

export interface MenuItemBase {
  id: string
  label: string
  icon?: IconType
  disabled?: boolean
}

export interface MenuItemAction extends MenuItemBase {
  type?: 'action'
  onClick?: () => void
  selected?: boolean
}

export interface MenuItemSubmenu extends MenuItemBase {
  type: 'submenu'
  items: MenuItem[]
  activeCount?: number
}

export interface MenuItemSeparator {
  type: 'separator'
  id: string
}

export type MenuItem = MenuItemAction | MenuItemSubmenu | MenuItemSeparator

// ============================================================================
// POSITIONING
// ============================================================================

export type MenuSide = 'top' | 'right' | 'bottom' | 'left'
export type MenuAlign = 'start' | 'center' | 'end'

// ============================================================================
// PANEL STATE
// ============================================================================

export interface PanelState {
  id: string
  title: string
  items: MenuItem[]
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Configuration for Motion Dev animations.
 *
 * Follows the Motion Dev patterns for Base UI integration:
 * - Supports spring physics and timed easing
 * - Configurable stagger for item reveals
 * - Panel slide and height animation
 */
export interface MotionAnimationConfig {
  // Reveal animation (menu open/close)
  /** Duration for reveal animation (ms) */
  revealDuration: number
  /** Starting scale for reveal animation (0-1) */
  revealScale: number
  /** Slide distance for reveal animation (px) */
  revealSlideY: number

  // Spring physics
  /** Enable spring physics for animations */
  useSpring: boolean
  /** Spring stiffness (when useSpring is true) */
  springStiffness: number
  /** Spring damping (when useSpring is true) */
  springDamping: number

  // Panel transitions
  /** Duration for panel slide animation (ms) */
  slideDuration: number
  /** Scale for exiting panel during transition (0-1) */
  panelExitScale: number
  /** Scale for entering panel during transition (0-1) */
  panelEnterScale: number
  /** Transform origin for panel scale */
  panelScaleOrigin: 'left' | 'right' | 'center'

  // Height animation
  /** Enable height animation between panels */
  animateHeight: boolean
  /** Duration for height animation (ms) */
  heightDuration: number

  // Item animations
  /** Duration for opacity transitions (ms) */
  opacityDuration: number
  /** Enable item stagger animation */
  enableItemStagger: boolean
  /** Stagger delay for menu items (ms) */
  itemStagger: number
  /** Panel crossfade duration (ms) */
  panelCrossfadeDuration: number
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface FilterMenuMotionProps {
  /** Menu items to display */
  items?: MenuItem[]
  /** Callback when filter is selected */
  onFilterSelect?: (filterId: string) => void
  /** IDs of active filters */
  activeFilterIds?: string[]
  /** Custom trigger element */
  trigger?: React.ReactNode
  /** Menu width in pixels */
  width?: number
  /** Position relative to trigger */
  side?: MenuSide
  /** Alignment relative to trigger */
  align?: MenuAlign
  /** Offset from trigger (pixels) */
  sideOffset?: number
  /** Callback when menu opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Animation configuration */
  animation?: Partial<MotionAnimationConfig>
  /** Additional className for popup */
  className?: string
}
