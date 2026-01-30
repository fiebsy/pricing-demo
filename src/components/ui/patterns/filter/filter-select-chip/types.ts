/**
 * FilterSelectChip - Type Definitions
 *
 * Biaxial filter chip that expands into a dropdown menu for selecting filter values.
 *
 * @module prod/base/filter/filter-select-chip/types
 */

import type { MenuAppearance } from '@/components/ui/core/primitives/menu/types'
import type { ChipSize, ChipRounded, RevealMode, IconComponent } from '../filter-chip/types'
import type { HugeIconData } from '@/components/ui/core/primitives/icon/types'

// ============================================================================
// FILTER OPTION TYPES
// ============================================================================

/** Icon type that works with HugeIcon component */
export type OptionIconType = HugeIconData | { default: HugeIconData } | unknown

export interface FilterOption {
  /** Unique identifier for the option */
  id: string
  /** Display label */
  label: string
  /** Optional icon (HugeIcons format) */
  icon?: OptionIconType
  /** Whether this option is disabled */
  disabled?: boolean
}

// ============================================================================
// CONFIG TYPES
// ============================================================================

export interface FilterSelectChipConfig {
  // ---------------------------------------------------------------------------
  // Chip Configuration (entry animation)
  // ---------------------------------------------------------------------------

  /** Size preset for the chip. Default: 'md' */
  chipSize: ChipSize

  /** Border radius for the chip. Default: 'full' */
  chipRounded: ChipRounded

  /** Icon size in pixels. Default: 14 */
  iconSize: number

  /** Animation duration for chip expand in ms. Default: 200 */
  chipDuration: number

  /** Reveal animation mode for chip. Default: 'fade' */
  revealMode: RevealMode

  /** Whether chip expands from icon or appears at full width. Default: true */
  chipExpandAnimation: boolean

  /** Left icon opacity (0-1). Default: 0.5 */
  iconOpacity: number

  /** Gap between icon and value. Default: 4 */
  iconValueGap: number

  /** Left padding. Default: 8 */
  paddingLeft: number

  /** Right padding. Default: 6 */
  paddingRight: number

  // ---------------------------------------------------------------------------
  // Menu Animation (biaxial expansion)
  // ---------------------------------------------------------------------------

  /** Duration for menu expand animation (ms). Default: 225 */
  menuDuration: number

  /** Duration for menu collapse animation (ms). Default: 125 */
  menuCollapseDuration: number

  /** Duration for content fade-in (ms). Default: 75 */
  contentFadeDuration: number

  /** Delay before content starts fading in (ms). Default: 0 */
  contentFadeDelay: number

  // ---------------------------------------------------------------------------
  // Menu Layout
  // ---------------------------------------------------------------------------

  /** Minimum panel width (px). Panel will grow to fit content. Default: 200 */
  minPanelWidth: number

  /** Maximum panel height (px). Default: 300 */
  maxPanelHeight: number

  /** Padding inside the panel (px). Default: 4 */
  innerPadding: number

  /** Height of each option item (px). Default: 32 */
  itemHeight: number

  /** Text size for menu items. Default: 'sm' */
  itemTextSize: 'xs' | 'sm' | 'md'

  /** Gap between items (px). Default: 2 */
  itemGap: number

  /** Border radius of the panel (px). Default: 16 */
  borderRadius: number

  /** Vertical offset for content relative to chip bottom (px). Default: 0 */
  contentTopOffset: number

  /** Extension above the chip when menu is expanded (px). Default: 0 */
  topExtension: number

  /** Show a separator line below the header/trigger. Default: false */
  showHeaderSeparator: boolean

  /** Apply squircle corners only when menu is open. Default: false */
  squircleOnOpen: boolean

  /** Apply squircle corners to menu items. Auto-syncs with appearance.squircle if not set. */
  itemSquircle?: boolean

  /** Show shadow only when menu is expanded (not on collapsed trigger). Default: false */
  shadowOnExpandOnly: boolean

  /** Where the menu expands from. 'center' = expands from chip center, 'left' = expands to the right. Default: 'center' */
  menuAnchor: 'left' | 'center'

  // ---------------------------------------------------------------------------
  // Appearance (visual styling)
  // ---------------------------------------------------------------------------

  /** Menu appearance configuration (uses core menu styling system) */
  appearance: MenuAppearance
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface FilterSelectChipProps {
  /** Currently selected option ID */
  value: string
  /** Available filter options */
  options: FilterOption[]
  /** Option IDs that should be shown as disabled (already selected elsewhere) */
  disabledOptions?: string[]
  /** Icon to display in the chip (takes precedence over label) */
  icon?: IconComponent
  /** Text label to display if no icon */
  label?: string
  /** Label to show when expanded (e.g., "Status" shows as "icon + Status: value") */
  expandedLabel?: string
  /** Menu configuration */
  config?: Partial<FilterSelectChipConfig>
  /** Called when an option is selected */
  onChange?: (optionId: string) => void
  /** Called when remove is clicked (if provided, shows close button) */
  onRemove?: () => void
  /** How to trigger the menu: 'click' (default) or 'hover' */
  triggerMode?: 'click' | 'hover'
  /** Delay before opening on hover (ms). Default: 0 */
  hoverOpenDelay?: number
  /** Delay before closing on hover out (ms). Default: 150 */
  hoverCloseDelay?: number
  /** Additional className for the container */
  className?: string
}

// ============================================================================
// INTERNAL COMPONENT PROPS
// ============================================================================

export interface ChipTriggerProps {
  /** Display value text */
  value: string
  /** Icon to display */
  icon?: IconComponent
  /** Text label if no icon */
  label?: string
  /** Label to show when expanded (e.g., "Status" shows as "icon + Status: value") */
  expandedLabel?: string
  /** Whether the menu is expanded */
  isExpanded: boolean
  /** Click handler */
  onClick: () => void
  /** Remove handler - if provided, shows close button */
  onRemove?: () => void
  /** Hide the close button (when it's rendered elsewhere) */
  hideCloseButton?: boolean
  /** Chip size */
  chipSize: ChipSize
  /** Chip rounded */
  chipRounded: ChipRounded
  /** Icon size */
  iconSize: number
  /** Icon opacity */
  iconOpacity: number
  /** Icon value gap */
  iconValueGap: number
  /** Padding left */
  paddingLeft: number
  /** Padding right */
  paddingRight: number
  /** Chip duration */
  chipDuration: number
  /** Reveal mode */
  revealMode: RevealMode
  /** Whether chip expands from icon or appears at full width */
  chipExpandAnimation?: boolean
}

export interface OptionListProps {
  /** Available options */
  options: FilterOption[]
  /** Currently selected option ID */
  selectedId: string
  /** Called when an option is selected */
  onSelect: (optionId: string) => void
  /** Item height in pixels */
  itemHeight: number
  /** Text size for items. Default: 'sm' */
  itemTextSize?: 'xs' | 'sm' | 'md'
  /** Gap between items */
  itemGap: number
  /** Maximum height for scrolling */
  maxHeight: number
  /** Apply squircle corners to items. Default: true */
  itemSquircle?: boolean
}

export interface OptionListRef {
  /** Move highlight to next item */
  highlightNext: () => void
  /** Move highlight to previous item */
  highlightPrev: () => void
  /** Select the currently highlighted option */
  selectHighlighted: () => void
  /** Reset highlight to selected item */
  resetHighlight: () => void
}

// ============================================================================
// RE-EXPORTS
// ============================================================================

export type { ChipSize, ChipRounded, RevealMode, IconComponent }
