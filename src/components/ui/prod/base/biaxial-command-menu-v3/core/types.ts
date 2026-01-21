/**
 * Biaxial Command Menu V3 - Type Definitions
 *
 * Reorganized version with better modularity.
 * Extends core types with backdrop/content synchronization options.
 */

import type * as React from 'react'
import type { MenuAppearance } from '@/components/ui/prod/base/menu/types'

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
  /** Show right arrow instead of shortcut - indicates drill-down navigation */
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

// ============================================================================
// BACKGROUND TYPES
// ============================================================================

export type BackgroundOption =
  | 'none'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'

// ============================================================================
// ANIMATION SYNC TYPES
// ============================================================================

/**
 * Animation mode for the backdrop layer.
 *
 * - 'size': Animate actual width/height (original behavior)
 * - 'clip-path': Use clip-path like content layer (perfect sync)
 */
export type BackdropAnimationMode = 'size' | 'clip-path'

/**
 * Animation sync configuration for coordinating backdrop and content layers.
 */
export interface AnimationSyncConfig {
  /**
   * Animation mode for backdrop layer.
   * - 'size': Backdrop animates actual dimensions (width, height)
   * - 'clip-path': Backdrop uses clip-path reveal (matches content)
   * @default 'size'
   */
  backdropMode: BackdropAnimationMode

  /**
   * Delay before backdrop animation starts (ms).
   * Positive values = backdrop starts after content.
   * Negative values = backdrop starts before content.
   * @default 0
   */
  backdropDelay: number

  /**
   * Duration offset for backdrop relative to main duration (ms).
   * Positive = slower backdrop, Negative = faster backdrop.
   * @default 0
   */
  backdropDurationOffset: number

  /**
   * Enable menu container animation (grows from collapsed to expanded).
   * Creates a "card growing" effect for the menu area.
   * @default false
   */
  animateMenuContainer: boolean

  /**
   * Delay before menu container animation starts (ms).
   * Only applies when animateMenuContainer is true.
   * @default 0
   */
  menuContainerDelay: number

  /**
   * Duration offset for menu container animation (ms).
   * Only applies when animateMenuContainer is true.
   * @default 0
   */
  menuContainerDurationOffset: number

  /**
   * Scale factor for backdrop when collapsed (0-1).
   * Only applies when backdropMode is 'clip-path'.
   * 1 = no scale change, 0.8 = starts at 80% size.
   * @default 1
   */
  backdropScaleStart: number

  /**
   * Enable origin-based expansion (expand from center vs top).
   * @default 'center'
   */
  expandOrigin: 'center' | 'top' | 'bottom'
}

// ============================================================================
// CONFIG TYPES
// ============================================================================

export interface CommandMenuConfig {
  // ---------------------------------------------------------------------------
  // Animation (base)
  // ---------------------------------------------------------------------------

  /** Duration for expand animation (ms). Default: 225 */
  duration: number

  /** Duration for collapse animation (ms). Default: 125 */
  collapseDuration: number

  /** Duration for content fade-in (ms). Default: 75 */
  contentFadeDuration: number

  /** Delay before content starts fading in (ms). Default: 0 */
  contentFadeDelay: number

  // ---------------------------------------------------------------------------
  // Animation Sync
  // ---------------------------------------------------------------------------

  /** Animation synchronization configuration */
  animationSync: AnimationSyncConfig

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  /** Input trigger height (px). Default: 40 */
  inputHeight: number

  /** Input trigger width (px). Default: 240 */
  inputWidth: number

  /** Expanded panel width (px). Default: 320 */
  panelWidth: number

  /** Maximum panel height (px). Default: 400 */
  maxPanelHeight: number

  /** Top padding inside the panel (px). Default: 4 */
  innerPaddingTop: number

  /** Bottom padding inside the panel (px). Default: 4 */
  innerPaddingBottom: number

  /** Left padding inside the panel (px). Default: 4 */
  innerPaddingLeft: number

  /** Right padding inside the panel (px). Default: 4 */
  innerPaddingRight: number

  /** Height of each command item (px). Default: 36 */
  itemHeight: number

  /** Gap between items (px). Default: 2 */
  itemGap: number

  /** Top gap above first item in each group (px). Default: 0 */
  itemsTopGap?: number

  /** Horizontal padding for items (px). Default: 10 */
  itemPaddingX?: number

  /** Vertical padding for items (px). Default: 0 */
  itemPaddingY?: number

  /** Border radius for items (px). Default: 12 */
  itemBorderRadius?: number

  /** Background color for highlighted item. Default: 'quaternary' */
  itemHighlightBackground?: BackgroundOption

  /** Background color for hovered item. Default: 'tertiary' */
  itemHoverBackground?: BackgroundOption

  /** Icon size in items (px). Default: 16 */
  itemIconSize?: number

  /** Gap between icon and text (px). Default: 8 */
  itemIconGap?: number

  /** Icon opacity percentage (0-100). Default: 60 */
  itemIconOpacity?: number

  /** Border radius of the panel (px). Default: 16 */
  borderRadius: number

  /** Top border radius override (px). */
  topBorderRadius?: number

  /** Menu section border radius override (px). */
  menuBorderRadius?: number

  /** Menu section top border radius (px). Default: 0 */
  menuTopBorderRadius?: number

  /** Menu container bottom border radius (px). */
  menuContainerBottomRadius?: number

  /** Auto-sync menu container radius. Default: true */
  syncMenuContainerRadius: boolean

  /** Menu container inset from edges (px). Default: 0 */
  menuContainerInset: number

  /** Menu border width (px). Default: 0 */
  menuBorderWidth?: number

  /** Menu border color. Default: 'secondary' */
  menuBorderColor?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand'

  /** Vertical offset for content relative to input bottom (px). Default: -4 */
  contentTopOffset: number

  /** Bottom offset for content area (px). Default: 0 */
  contentBottomOffset: number

  /** Base horizontal padding for input (px). Default: 12 */
  inputPaddingX?: number

  /** Additional horizontal padding for input when expanded (px). Default: 0 */
  inputPaddingExpanded: number

  /** Additional top padding for input when expanded (px). Default: 0 */
  inputTopPaddingExpanded: number

  /** Extends backdrop upward when expanded (px). Default: 0 */
  backdropTopOffset: number

  // ---------------------------------------------------------------------------
  // Experimental Top Section (expands upward)
  // ---------------------------------------------------------------------------

  /** Enable experimental top section that expands upward. Default: false */
  experimentalTopSection?: boolean

  /** Height of the top section when expanded (px). Default: 48 */
  topSectionHeight?: number

  // Top Section Animation Sync
  /** Animation delay for top section (ms). Default: 0 */
  topSectionDelay?: number

  /** Duration offset for top section animation (ms). Default: 0 */
  topSectionDurationOffset?: number

  // Top Section Appearance
  /** Background for the top section. Default: matches menuBackground */
  topSectionBackground?: BackgroundOption

  /** Content for top section (e.g., 'actions', 'breadcrumbs'). Default: 'actions' */
  topSectionContent?: 'actions' | 'breadcrumbs' | 'custom'

  /** Override inset for top section (px). Default: matches menuContainerInset */
  topSectionInset?: number

  /** Override border width for top section (px). Default: matches menuBorderWidth */
  topSectionBorderWidth?: number

  /** Override border radius for top section (px). Default: matches menu radius */
  topSectionBorderRadius?: number

  /** Bottom offset - gap between top section and search input (px). Default: 0 */
  topSectionBottomOffset?: number

  /** Shine effect for top section. Default: 'none' */
  topSectionShine?: string

  /** Border color for top section. Default: matches menuBorderColor */
  topSectionBorderColor?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand'

  // ---------------------------------------------------------------------------
  // Features
  // ---------------------------------------------------------------------------

  /** Placeholder text for input. Default: "Search..." */
  placeholder: string

  /** Show empty state when no results. Default: true */
  showEmptyState: boolean

  /** Empty state message. Default: "No results found" */
  emptyStateMessage: string

  // ---------------------------------------------------------------------------
  // Input Customization
  // ---------------------------------------------------------------------------

  /** Cursor style for collapsed input. Default: 'text' */
  inputCursor?: 'text' | 'pointer'

  /** Custom icon component for the input. Default: Search01Icon */
  inputIcon?: React.ComponentType<{ className?: string }>

  /** Show the input icon. Default: true */
  showInputIcon?: boolean

  /** Show the keyboard shortcut hint (e.g., "/"). Default: true */
  showKeyboardHint?: boolean

  /** Custom keyboard hint text. Default: "/" */
  keyboardHintText?: string

  /** Right icon component (replaces keyboard hint when provided) */
  rightIcon?: React.ComponentType<{ className?: string }>

  /** Show right icon. Default: false */
  showRightIcon?: boolean

  // ---------------------------------------------------------------------------
  // Appearance
  // ---------------------------------------------------------------------------

  /** Menu appearance configuration */
  appearance: MenuAppearance

  /** Input area background when expanded. Default: 'tertiary' */
  inputBackground: BackgroundOption

  /** Menu/list area background. Default: 'primary' */
  menuBackground: BackgroundOption

  /** Shine effect for menu section. Default: 'none' */
  menuShine?: string

  /** Show overflow gradient at top/bottom of menu. Default: false */
  menuOverflowGradient: boolean

  /** Height of overflow gradient in px. Default: 16 */
  menuOverflowGradientHeight: number

  /** Top inset for gradient (px). Default: 0 */
  gradientInsetTop?: number

  /** Bottom inset for gradient (px). Default: 0 */
  gradientInsetBottom?: number

  /** Left inset for gradient (px). Default: 0 */
  gradientInsetLeft?: number

  /** Right inset for gradient (px). Default: 0 */
  gradientInsetRight?: number

  /** Top padding on scroll container (px). Default: 0 */
  scrollPaddingTop: number

  /** Bottom padding on scroll container (px). Default: 12 */
  scrollPaddingBottom: number

  /** Top margin on scroll container (px). Default: 0 */
  scrollbarMarginTop: number

  /** Bottom margin on scroll container (px). Default: 0 */
  scrollbarMarginBottom: number

  /** Auto-sync gradient insets to scrollbar margins. Default: true */
  syncGradientToScrollbar: boolean

  /** Enable debug mode. Default: false */
  debug?: boolean
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface CommandMenuProps {
  /** Grouped command items */
  groups: CommandGroup[]
  /** Menu configuration */
  config: CommandMenuConfig
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Called when an item is selected */
  onSelect?: (item: CommandItemAction) => void
  /** Additional className for the container */
  className?: string
}

// ============================================================================
// CALCULATED TYPES (for internal use)
// ============================================================================

export interface CalculatedRadii {
  backdrop: string
  menuContainer: string
  clipExpanded: string
  clipCollapsed: string
  raw: {
    base: number
    top: number
    menuBottom: number
    menuTop: number
    containerBottom: number
    syncedRadius: number
  }
}

export interface GradientInsets {
  top: number
  bottom: number
  left: number
  right: number
}
