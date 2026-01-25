/**
 * Biaxial Command Menu - Type Definitions
 *
 * Core types for the BiaxialCommandMenu component.
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

export type BackgroundOption = 'none' | 'primary' | 'secondary' | 'tertiary' | 'quaternary'

// ============================================================================
// CONFIG TYPES
// ============================================================================

export interface CommandMenuConfig {
  // ---------------------------------------------------------------------------
  // Animation
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

  /** Border radius of the panel (px). Default: 16 */
  borderRadius: number

  /** Top border radius override (px). If set, overrides borderRadius for top corners. */
  topBorderRadius?: number

  /** Menu section border radius override (px). If set, overrides borderRadius for menu area bottom corners. */
  menuBorderRadius?: number

  /** Menu section top border radius (px). Controls top corners of menu area. Default: 0 */
  menuTopBorderRadius?: number

  /** Menu container bottom border radius (px). Controls bottom corners of menu container. If not set, uses menuBorderRadius or borderRadius. */
  menuContainerBottomRadius?: number

  /** Auto-sync menu container radius (top, bottom, and backdrop menu radius). Default: true */
  syncMenuContainerRadius: boolean

  /** Menu container inset from edges (px). Default: 0 */
  menuContainerInset: number

  /** Menu border width (px). Default: 0 */
  menuBorderWidth?: number

  /** Menu border color. Default: 'secondary' */
  menuBorderColor?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand'

  /** Vertical offset for content relative to input bottom (px). Default: -4 */
  contentTopOffset: number

  /** Bottom offset for content area - creates space at bottom of menu (px). Default: 0 */
  contentBottomOffset: number

  /** Additional horizontal padding for input when expanded (px). Default: 0 */
  inputPaddingExpanded: number

  /** Additional top padding for input when expanded (px). Default: 0 */
  inputTopPaddingExpanded: number

  /**
   * Extends backdrop upward when expanded without moving input position.
   * Positive values extend the backdrop above the input trigger.
   * Default: 0
   */
  backdropTopOffset: number

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
  // Appearance (aligned with core Menu component)
  // ---------------------------------------------------------------------------

  /** Menu appearance configuration (uses core menu styling system) */
  appearance: MenuAppearance

  /** Input area background when expanded. Default: 'tertiary' */
  inputBackground: BackgroundOption

  /** Menu/list area background. Default: 'primary' */
  menuBackground: BackgroundOption

  /** Shine effect for menu section. Default: 'none' */
  menuShine?: string

  /** Show overflow gradient at top/bottom of menu to fade content. Default: false */
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

  /** Bottom padding on scroll container to clear scrollbar from bottom radius (px). Default: 12 */
  scrollPaddingBottom: number

  /** Top margin on scroll container - pushes scrollbar track down (px). Default: 0 */
  scrollbarMarginTop: number

  /** Bottom margin on scroll container - pushes scrollbar track up (px). Default: 0 */
  scrollbarMarginBottom: number

  /** Auto-sync gradient insets to scrollbar margins. Default: true */
  syncGradientToScrollbar: boolean

  /** Enable debug mode to visualize container boundaries with colors. Default: false */
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
