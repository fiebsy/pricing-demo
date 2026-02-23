/**
 * Pricing Select Menu Playground - Configuration Types
 */

import type {
  BackgroundOption,
  BorderColorOption,
  BorderRadius,
  Shadow,
  ShineVariant,
  GradientPattern,
  GradientColor,
  HeightMode,
  ExpandOrigin,
  TextColorOption,
  FontWeightOption,
  FontSizeOption,
  OpacityOption,
  VerticalAlignOption,
  DisplayMode,
  BadgeColor,
  LabelLayout,
  TextSegmentConfig,
  SyncedSubtextConfig,
  TriggerTypographyConfig,
  ItemTypographyConfig,
  MenuItemLabelConfig,
  TriggerStateStyle,
  VariantBTriggerConfig,
  VariantBBottomSlotConfig,
  VariantTransitionType,
  PricingVariantId,
} from '@/components/ui/features/pricing-select-menu'

// ============================================================================
// PLAYGROUND CONFIG
// ============================================================================

export type PageBackground = 'primary' | 'secondary' | 'tertiary'

export interface TriggerPlaygroundConfig {
  collapsed: TriggerStateStyle
  expanded: TriggerStateStyle
}

export interface BottomSlotPlaygroundConfig {
  enabled: boolean
  heightMode: HeightMode
  height: number
  scrollable?: boolean
  background: BackgroundOption
  shine: string
  borderRadius: number
  inset: number
  borderWidth: number
  borderColor: BorderColorOption
}

export interface ContainerHeaderConfig {
  show: boolean
  text: string
  fontSize: FontSizeOption
  fontWeight: FontWeightOption
  textColor: TextColorOption
  opacity: OpacityOption
  marginBottom: number
}

export interface SelectMenuConfig {
  showDropdownIcon: boolean
  dropdownIconRotates: boolean
  triggerPaddingX: number
  triggerPaddingTop: number
  triggerPaddingBottom: number
  syncedSubtext: SyncedSubtextConfig
  showHeader: boolean
  headerLabel: string
  headerTextColor: TextColorOption
  headerFontWeight: FontWeightOption
  headerFontSize: FontSizeOption
  headerOpacity: OpacityOption
  headerUppercase: boolean
  headerPaddingBottom: number
  containerPadding: number
  itemPaddingX: number
  itemPaddingY: number
  itemBorderRadius: number
  itemGap: number
  itemHoverBackground: BackgroundOption
  menuItemLabel: MenuItemLabelConfig
  availableTiers: string[]
  upgradeMode: boolean
  showSelectedIndicator: boolean
  triggerTypography: TriggerTypographyConfig
  itemTypography: ItemTypographyConfig
}

export interface VariantTransitionConfig {
  enabled: boolean
  type: VariantTransitionType
  duration: number
  bounce: number
  yOffset: number
}

export interface VariantBConfig {
  trigger: VariantBTriggerConfig
  bottomSlot: VariantBBottomSlotConfig
  transition: VariantTransitionConfig
}

export interface PricingSelectMenuPlaygroundConfig {
  layout: {
    triggerWidth: number
    triggerHeight: number
    triggerHeightB: number
    panelWidth: number
    maxBottomHeight: number
    maxBottomHeightB: number
    borderRadius: number
    bottomGap: number
    syncTriggerWidth: boolean
  }
  animation: {
    duration: number
    collapseDuration: number
    contentFadeDuration: number
    contentFadeDelay: number
    animateSlotContainers: boolean
    slotContainerDelay: number
    slotContainerDurationOffset: number
    expandOrigin: ExpandOrigin
  }
  appearance: {
    borderRadius: BorderRadius
    shadow: Shadow
    shine: ShineVariant
    background: BackgroundOption
    gradient: GradientPattern
    gradientColor: GradientColor
    squircle: boolean
  }
  bottomSlot: BottomSlotPlaygroundConfig
  trigger: TriggerPlaygroundConfig
  demo: {
    pageBackground: PageBackground
    showDebug: boolean
    slowMo: boolean
    debugContainer: {
      enabled: boolean
      showLines: boolean
      width: number
      padding: number
      fixedHeight: boolean
      height: number
      header: ContainerHeaderConfig
    }
  }
  selectMenu: SelectMenuConfig
  variantB: VariantBConfig
}

// ============================================================================
// PRESET TYPES
// ============================================================================

export interface PricingSelectMenuPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'use-case' | 'minimal' | 'custom'
  data: PricingSelectMenuPlaygroundConfig
}

// Re-export for convenience
export type {
  BackgroundOption,
  BorderColorOption,
  BorderRadius,
  Shadow,
  ShineVariant,
  GradientPattern,
  GradientColor,
  HeightMode,
  ExpandOrigin,
  TextColorOption,
  FontWeightOption,
  FontSizeOption,
  OpacityOption,
  VerticalAlignOption,
  DisplayMode,
  BadgeColor,
  LabelLayout,
  TextSegmentConfig,
  SyncedSubtextConfig,
  TriggerTypographyConfig,
  ItemTypographyConfig,
  MenuItemLabelConfig,
  TriggerStateStyle,
  VariantBTriggerConfig,
  VariantBBottomSlotConfig,
  PricingVariantId,
}
