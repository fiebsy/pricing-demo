/**
 * Pricing Select Menu - Type Definitions
 *
 * Simplified types for the pricing select dropdown menu.
 * Isolated from biaxial-expand for single-purpose use.
 */

import type * as React from 'react'

// ============================================================================
// PRICING TIER TYPES
// ============================================================================

/**
 * Pricing tier data structure.
 */
export interface PricingTier {
  id: string
  credits: number
  price: number
  label: string
  priceLabel: string
  multiplier: number
  planName: string
  creditsLabel: string
  eventsPerMonth: number
  eventsLabel: string
  planNameShort: string
  priceFormatted: string
  monthlyPrice: number
  recurringText: string
  additionalCredits: number
  additionalCreditsLabel: string
  upgradeFee: number
  upgradeFeeFormatted: string
  upgradeFeeLabel: string
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

// ============================================================================
// APPEARANCE CONFIG
// ============================================================================

export interface MenuAppearance {
  borderRadius?: BorderRadius
  shadow?: Shadow
  shine?: ShineVariant
  background?: Background
  gradient?: GradientPattern
  gradientColor?: GradientColor
  squircle?: boolean
  /** Hover background for collapsed panel */
  triggerHoverBackground?: BackgroundOption
}

// ============================================================================
// SLOT CONFIG
// ============================================================================

export type HeightMode = 'fixed' | 'auto' | 'dynamic'
export type ExpandOrigin = 'top' | 'center' | 'bottom'

/**
 * Configuration for the trigger slot.
 */
export interface TriggerSlotConfig {
  background?: BackgroundOption
  inset?: number
}

/**
 * Configuration for the bottom (menu) slot.
 */
export interface BottomSlotConfig {
  enabled?: boolean
  heightMode?: HeightMode
  height?: number
  scrollable?: boolean
  background?: BackgroundOption
  shine?: string
  borderRadius?: number
  inset?: number
  borderWidth?: number
  borderColor?: BorderColorOption
}

// ============================================================================
// ANIMATION CONFIG
// ============================================================================

export type EasingOption = 'expo-out' | 'ease-out' | 'ease-in-out' | 'cubic-out' | 'quart-out' | 'back-out' | 'linear'

export interface AnimationConfig {
  /** Duration for expand animation (ms) */
  duration: number
  /** Duration for collapse animation (ms) */
  collapseDuration: number
  /** Easing function for animations */
  easing: EasingOption
  /** Enable menu container animation */
  animateSlotContainers: boolean
  /** Slot container delay (ms) */
  slotContainerDelay: number
  /** Slot container duration offset (ms) */
  slotContainerDurationOffset: number
  /** Expansion origin for bottom slot content */
  expandOrigin: ExpandOrigin
}

// ============================================================================
// LAYOUT CONFIG
// ============================================================================

export interface LayoutConfig {
  /** Width of collapsed trigger */
  triggerWidth: number
  /** Height of collapsed trigger */
  triggerHeight: number
  /** Width of expanded panel */
  panelWidth: number
  /** Maximum height for bottom content */
  maxBottomHeight: number
  /** Border radius for the entire component */
  borderRadius: number
  /** Gap between trigger and bottom slot */
  bottomGap: number
}

// ============================================================================
// DIMENSION TYPES
// ============================================================================

export interface SlotDimensions {
  triggerHeight: number
  bottomHeight: number
  panelWidth: number
}

// ============================================================================
// ROOT CONFIG
// ============================================================================

export interface PricingSelectMenuConfig {
  animation: AnimationConfig
  layout: LayoutConfig
  appearance: MenuAppearance
  triggerSlot: TriggerSlotConfig
  bottomSlot: BottomSlotConfig
  debug?: boolean
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface PricingSelectMenuContextValue {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  config: PricingSelectMenuConfig
  dimensions: SlotDimensions
  timing: {
    duration: number
    backdropDuration: number
    slotDuration: () => number
    slotDelay: () => number
  }
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface PricingSelectMenuRootProps {
  config?: Partial<PricingSelectMenuConfig>
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  className?: string
  children: React.ReactNode
}

export interface BackdropProps {
  className?: string
}

export interface ContentLayerProps {
  children: React.ReactNode
  className?: string
}

export interface ContentWrapperProps {
  children: React.ReactNode
  className?: string
}

export interface TriggerSlotProps {
  children: React.ReactNode
  className?: string
}

export interface BottomSlotProps {
  children: React.ReactNode
  className?: string
}

// ============================================================================
// TYPOGRAPHY CONFIG TYPES
// ============================================================================

export type TextColorOption = 'primary' | 'secondary' | 'tertiary' | 'brand'
export type FontWeightOption = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
export type FontSizeOption = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
export type OpacityOption = '100' | '80' | '60' | '40'
export type VerticalAlignOption = 'baseline' | 'center' | 'bottom'
export type DisplayMode = 'text' | 'badge'
export type BadgeColor = 'gray' | 'brand' | 'success' | 'warning' | 'error'
export type LabelLayout = 'inline' | 'stacked'

/**
 * Configuration for a text segment that can be styled independently.
 */
export interface TextSegmentConfig {
  show: boolean
  displayMode: DisplayMode
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
  badgeColor: BadgeColor
  /** Enable subtle shimmer animation on text */
  shimmer?: boolean
}

/**
 * Configuration for trigger subtext that syncs with selection.
 */
export interface SyncedSubtextConfig {
  syncWithSelection: boolean
  separator: string
  gap: number
  planName: TextSegmentConfig
  credits: TextSegmentConfig
}

/**
 * Trigger label configuration.
 */
export interface TriggerLabelConfig {
  text: string
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
}

/**
 * Trigger price configuration.
 */
export interface TriggerPriceConfig {
  prefix: string
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
}

/**
 * Price suffix configuration.
 */
export interface TriggerPriceSuffixConfig {
  text: string
  show: boolean
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
}

/**
 * Trigger subtext configuration.
 */
export interface TriggerSubtextConfig {
  text: string
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
  priceRowAlign: VerticalAlignOption
  priceRowGap: number
  rowGap: number
}

/**
 * Configuration for trigger styling in a specific state.
 */
export interface TriggerStateStyle {
  background: BackgroundOption
  shine: string
  borderRadius: number
  borderWidth: number
  borderColor: BorderColorOption
}

/**
 * Menu item label configuration.
 */
export interface MenuItemLabelConfig {
  layout: LabelLayout
  separator: string
  gap: number
  planName: TextSegmentConfig
  credits: TextSegmentConfig
}

/**
 * Item typography configuration.
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

// ============================================================================
// VARIANT B CONFIG TYPES
// ============================================================================

export type VariantBRightSource =
  | 'planName'
  | 'events'
  | 'price'
  | 'recurringPrice'
  | 'additionalCredits'
  | 'upgradeFee'

export interface VariantBRowConfig {
  show: boolean
  leftText: string
  rightSource: VariantBRightSource
  leftFontSize: FontSizeOption
  leftFontWeight: FontWeightOption
  leftTextColor: TextColorOption
  leftOpacity: OpacityOption
  rightFontSize: FontSizeOption
  rightFontWeight: FontWeightOption
  rightTextColor: TextColorOption
  rightOpacity: OpacityOption
}

export interface VariantBSubtextConfig {
  show: boolean
  template: string
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
}

export interface VariantBTriggerConfig {
  planRow: VariantBRowConfig
  paddingX: number
  paddingTop: number
  paddingBottom: number
}

export interface VariantBBottomSlotConfig {
  dueRow: VariantBRowConfig
  subtext: VariantBSubtextConfig
  rowGap: number
  paddingX: number
  paddingTop: number
  paddingBottom: number
}

export type VariantTransitionType = 'spring' | 'tween'

export interface VariantTransitionConfig {
  enabled: boolean
  type: VariantTransitionType
  duration: number
  bounce: number
  yOffset: number
}

// ============================================================================
// PRICING VARIANT TYPE
// ============================================================================

export type PricingVariantId = 'A' | 'B'

// ============================================================================
// DROPDOWN ICON CONFIG
// ============================================================================

export type CaretDirection = 'down' | 'right'

export interface DropdownIconConfig {
  show: boolean
  size: number
  color: TextColorOption
  direction: CaretDirection
  rotatesOnOpen: boolean
}
