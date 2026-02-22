/**
 * BiaxialExpand Playground Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/core/primitives/biaxial-expand
 */

import type {
  BackgroundOption,
  BorderColorOption,
  BackdropAnimationMode,
  ExpandOrigin,
  ExpandOriginX,
  PositionMode,
  VerticalAlign,
} from '@/components/ui/core/primitives/biaxial-expand'
import type {
  BorderRadius,
  Shadow,
  ShineVariant,
  GradientPattern,
  GradientColor,
} from '@/components/ui/core/primitives/menu/types'

// ============================================================================
// DEMO TYPES
// ============================================================================

export type DemoVariant = 'command-menu' | 'dashboard-metric' | 'custom' | 'pricing-select'
export type PageBackground = 'primary' | 'secondary' | 'tertiary'
export type HeightMode = 'fixed' | 'auto' | 'dynamic'

// ============================================================================
// TRIGGER CONFIGURATION
// ============================================================================

/**
 * Styling configuration for trigger in a specific state (collapsed or expanded).
 */
export interface TriggerStateStyle {
  background: BackgroundOption
  shine: string
  borderRadius: number
  borderWidth: number
  borderColor: BorderColorOption
}

/**
 * Complete trigger playground configuration with collapsed and expanded states.
 */
export interface TriggerPlaygroundConfig {
  collapsed: TriggerStateStyle
  expanded: TriggerStateStyle
}

// ============================================================================
// SLOT CONFIGURATION
// ============================================================================

export interface SlotPlaygroundConfig {
  enabled: boolean
  heightMode: HeightMode
  height: number
  /**
   * Whether this slot's height contributes to panel height calculation.
   * When true, the slot's configured height will be considered.
   * The tallest slot wins via Math.max().
   * @default true for bottom, false for top/left/right
   */
  drivesPanelHeight?: boolean
  /**
   * Enable ScrollArea wrapper when height is constrained (fixed/dynamic modes).
   * When true, content will be scrollable if it exceeds the slot height.
   * Has no effect in 'auto' mode since content drives height.
   * @default false
   */
  scrollable?: boolean
  background: BackgroundOption
  shine: string
  borderRadius: number
  inset: number
  borderWidth: number
  borderColor: BorderColorOption
}

/**
 * Extended config for horizontal slots (left/right) with height/alignment options.
 *
 * Note: Width is controlled ONLY via layout.maxLeftWidth/maxRightWidth.
 * Per-slot width controls were removed as they were never wired to the component.
 */
export interface HorizontalSlotPlaygroundConfig extends SlotPlaygroundConfig {
  /** Maximum height for the slot (null = full panel height) - kept for backward compatibility */
  maxHeight: number | null
  /** Vertical alignment within the panel height */
  verticalAlign: VerticalAlign
  /**
   * The height value to use when drivesPanelHeight is true.
   * This height will contribute to panel height calculation.
   */
  drivingHeight?: number
}

// ============================================================================
// SELECT MENU CONFIGURATION
// ============================================================================

/** Text color options using semantic tokens */
export type TextColorOption = 'primary' | 'secondary' | 'tertiary' | 'brand'

/** Font weight options */
export type FontWeightOption = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'

/** Vertical alignment for inline elements */
export type VerticalAlignOption = 'baseline' | 'center' | 'bottom'

/** Font size options */
export type FontSizeOption = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'

/** Opacity options */
export type OpacityOption = '100' | '80' | '60' | '40'

/** Display mode for text segments */
export type DisplayMode = 'text' | 'badge'

/** Badge color options */
export type BadgeColor = 'gray' | 'brand' | 'success' | 'warning' | 'error'

/** Label layout options for menu items */
export type LabelLayout = 'inline' | 'stacked'

// ============================================================================
// TEXT SEGMENT CONFIGURATION (for synced subtext and menu item labels)
// ============================================================================

/**
 * Configuration for a text segment that can be styled independently.
 * Supports both plain text and badge display modes.
 */
export interface TextSegmentConfig {
  show: boolean
  displayMode: DisplayMode
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
  badgeColor: BadgeColor  // Only used when displayMode === 'badge'
}

/**
 * Configuration for trigger subtext that syncs with selection.
 * Shows plan name and credits from the selected tier.
 */
export interface SyncedSubtextConfig {
  syncWithSelection: boolean
  separator: string            // " - " or " | "
  gap: number                  // Gap between plan name and credits (px)
  planName: TextSegmentConfig  // "Pro 2X" styling
  credits: TextSegmentConfig   // "200 credits / month" styling
}

/**
 * Configuration for menu item label styling.
 * Controls how plan name and credits are displayed in menu items.
 */
export interface MenuItemLabelConfig {
  layout: LabelLayout
  separator: string
  gap: number                  // Gap between plan name and credits (px)
  planName: TextSegmentConfig
  credits: TextSegmentConfig
}

// ============================================================================
// TRIGGER TYPOGRAPHY CONFIGURATION
// ============================================================================

/**
 * Configuration for trigger label text styling (first line).
 */
export interface TriggerLabelConfig {
  text: string                    // e.g., "Upgrade"
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
}

/**
 * Configuration for trigger price styling (e.g., "$19").
 */
export interface TriggerPriceConfig {
  prefix: string                  // e.g., "$" or "From $"
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
}

/**
 * Configuration for price suffix styling (e.g., "per month").
 */
export interface TriggerPriceSuffixConfig {
  text: string                    // e.g., "per month" or "/mo"
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
}

/**
 * Configuration for optional third line subtext.
 */
export interface TriggerSubtextConfig {
  text: string                    // e.g., "Cancel anytime"
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
}

/**
 * Complete trigger typography configuration.
 */
export interface TriggerTypographyConfig {
  label: TriggerLabelConfig
  price: TriggerPriceConfig
  priceSuffix: TriggerPriceSuffixConfig
  subtext: TriggerSubtextConfig
  priceRowAlign: VerticalAlignOption  // alignment between price and suffix
  priceRowGap: number                 // gap between price and suffix (px)
  rowGap: number                      // gap between rows (px)
}

// ============================================================================
// ITEM TYPOGRAPHY CONFIGURATION
// ============================================================================

/**
 * Configuration for menu item typography.
 */
export interface ItemTypographyConfig {
  label: {
    fontSize: FontSizeOption
    fontWeight: FontWeightOption
    textColor: TextColorOption
  }
  price: {
    fontSize: FontSizeOption
    fontWeight: FontWeightOption
    textColor: TextColorOption
    opacity: OpacityOption
  }
}

/**
 * Configuration for the pricing-select menu styling.
 * Controls trigger icon, header, container padding, item styling, and selection indicator.
 */
export interface SelectMenuConfig {
  // Trigger
  showDropdownIcon: boolean           // Chevron on trigger
  dropdownIconRotates: boolean        // Rotate 180° on expand

  // Synced Subtext (trigger third line that syncs with selection)
  syncedSubtext: SyncedSubtextConfig

  // Header
  showHeader: boolean                 // Show section header
  headerLabel: string                 // e.g., "SELECT PLAN"
  headerTextColor: TextColorOption    // Header text color
  headerFontWeight: FontWeightOption  // Header font weight
  headerFontSize: FontSizeOption      // Header font size
  headerOpacity: OpacityOption        // Header text opacity
  headerUppercase: boolean            // Whether to uppercase header text
  headerPaddingBottom: number         // Bottom padding on header

  // Container
  containerPadding: number            // Outer padding (inset from slot edges)

  // Items
  itemPaddingX: number                // Horizontal item padding
  itemPaddingY: number                // Vertical item padding
  itemBorderRadius: number            // Item corner radius
  itemGap: number                     // Gap between items
  itemHoverBackground: BackgroundOption

  // Menu Item Label Configuration
  menuItemLabel: MenuItemLabelConfig

  // Available Tiers
  availableTiers: string[]            // e.g., ['tier-100', 'tier-200', ...]

  // Selection
  showSelectedIndicator: boolean      // Show checkmark on selected

  // Typography
  triggerTypography: TriggerTypographyConfig
  itemTypography: ItemTypographyConfig
}

// ============================================================================
// CONTAINER HEADER CONFIGURATION
// ============================================================================

/**
 * Configuration for optional header text inside the debug container.
 * Simulates a modal title/label above the pricing select widget.
 */
export interface ContainerHeaderConfig {
  show: boolean                   // Toggle header visibility
  text: string                    // Header text content
  fontSize: FontSizeOption        // xs, sm, base, lg, etc.
  fontWeight: FontWeightOption    // light, normal, medium, semibold, bold
  textColor: TextColorOption      // primary, secondary, tertiary, brand
  opacity: OpacityOption          // 100, 80, 60, 40
  marginBottom: number            // Space below header (px)
}

// ============================================================================
// MAIN PLAYGROUND CONFIG
// ============================================================================

export interface BiaxialExpandPlaygroundConfig {
  // Layout
  layout: {
    triggerWidth: number          // 120-600
    triggerHeight: number         // 32-64
    panelWidth: number            // 200-800
    maxTopHeight: number          // 0-400
    maxBottomHeight: number       // 100-600
    maxLeftWidth: number          // 0-400
    maxRightWidth: number         // 0-400
    borderRadius: number          // 0-40
    topGap: number                // 0-24
    bottomGap: number             // 0-24
    leftGap: number               // 0-24
    rightGap: number              // 0-24
    backdropTopOffset: number     // 0-20
    expandOriginX: ExpandOriginX  // 'left' | 'center' | 'right'
    positionMode: PositionMode    // 'overlay' | 'push'
    syncTriggerWidth: boolean     // When true, triggerWidth = panelWidth (or container width)
  }

  // Animation
  animation: {
    duration: number              // 100-800
    collapseDuration: number      // 50-400
    contentFadeDuration: number   // 0-400
    contentFadeDelay: number      // 0-200
    backdropMode: BackdropAnimationMode
    backdropDelay: number
    backdropDurationOffset: number
    animateSlotContainers: boolean
    slotContainerDelay: number
    slotContainerDurationOffset: number
    expandOrigin: ExpandOrigin
    topExpandOrigin: ExpandOrigin
    leftExpandOrigin: ExpandOriginX
    rightExpandOrigin: ExpandOriginX
  }

  // Appearance
  appearance: {
    borderRadius: BorderRadius
    shadow: Shadow
    shine: ShineVariant
    background: BackgroundOption
    gradient: GradientPattern
    gradientColor: GradientColor
    squircle: boolean
  }

  // Slots
  topSlot: SlotPlaygroundConfig
  bottomSlot: SlotPlaygroundConfig
  leftSlot: HorizontalSlotPlaygroundConfig
  rightSlot: HorizontalSlotPlaygroundConfig

  // Trigger styling
  trigger: TriggerPlaygroundConfig

  // Demo settings
  demo: {
    variant: DemoVariant
    pageBackground: PageBackground
    showDebug: boolean
    slowMo: boolean
    debugContainer: {
      enabled: boolean             // Show red outline modal simulation container
      showLines: boolean           // Show/hide the red debug border lines
      width: number                // Container width in px (e.g., 500)
      padding: number              // Container padding in px (e.g., 10)
      header: ContainerHeaderConfig // Optional header above content
    }
  }

  // Select menu styling (for pricing-select variant)
  selectMenu: SelectMenuConfig
}

// ============================================================================
// PRESET TYPES
// ============================================================================

export interface BiaxialExpandPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'use-case' | 'minimal' | 'custom'
  data: BiaxialExpandPlaygroundConfig
}
