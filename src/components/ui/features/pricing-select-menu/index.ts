/**
 * Pricing Select Menu
 *
 * A composable pricing tier selection dropdown with expand/collapse animation.
 * Supports both select menu (Variant A) and card display (Variant B) modes.
 *
 * @example Basic usage
 * ```tsx
 * <PricingSelectMenu.Root config={config} expanded={expanded} onExpandedChange={setExpanded}>
 *   <PricingSelectMenu.Backdrop />
 *   <PricingSelectMenu.Content>
 *     <PricingSelectMenu.Trigger>
 *       <PricingSelectMenu.TriggerContentA
 *         selectedTier={selectedTier}
 *         triggerTypography={triggerTypography}
 *         syncedSubtext={syncedSubtext}
 *       />
 *     </PricingSelectMenu.Trigger>
 *     <PricingSelectMenu.ContentWrapper>
 *       <PricingSelectMenu.BottomSlot>
 *         <PricingSelectMenu.OptionsList
 *           tiers={tiers}
 *           selectedId={selectedTier.id}
 *           onSelect={setSelectedTier}
 *           itemTypography={itemTypography}
 *           menuItemLabel={menuItemLabel}
 *         />
 *       </PricingSelectMenu.BottomSlot>
 *     </PricingSelectMenu.ContentWrapper>
 *   </PricingSelectMenu.Content>
 * </PricingSelectMenu.Root>
 * ```
 */

// Core component
import { PricingSelectMenuRoot } from './pricing-select-menu'

// Components
import {
  Backdrop,
  ContentLayer,
  ContentWrapper,
  TriggerSlot,
  BottomSlot,
  TextSegment,
  AnimatedSlotContent,
  TriggerContentA,
  TriggerContentB,
  OptionsList,
  BottomContentB,
} from './components'

// Export compound component
export const PricingSelectMenu = {
  Root: PricingSelectMenuRoot,
  Backdrop,
  Content: ContentLayer,
  ContentWrapper,
  Trigger: TriggerSlot,
  BottomSlot,
  TextSegment,
  AnimatedSlotContent,
  TriggerContentA,
  TriggerContentB,
  OptionsList,
  BottomContentB,
}

// Export individual components for tree-shaking
export {
  PricingSelectMenuRoot,
  Backdrop,
  ContentLayer,
  ContentWrapper,
  TriggerSlot,
  BottomSlot,
  TextSegment,
  AnimatedSlotContent,
  TriggerContentA,
  TriggerContentB,
  OptionsList,
  BottomContentB,
}

// Export hooks
export { usePricingSelectMenu, usePricingSelectMenuOptional } from './context'

// Export types
export type {
  // Core types
  PricingSelectMenuConfig,
  PricingSelectMenuRootProps,
  PricingSelectMenuContextValue,
  SlotDimensions,
  AnimationConfig,
  LayoutConfig,
  // Appearance types
  BackgroundOption,
  BorderColorOption,
  BorderRadius,
  Shadow,
  ShineVariant,
  Background,
  GradientPattern,
  GradientColor,
  MenuAppearance,
  // Slot types
  HeightMode,
  ExpandOrigin,
  TriggerSlotConfig,
  BottomSlotConfig,
  // Component props
  BackdropProps,
  ContentLayerProps,
  ContentWrapperProps,
  TriggerSlotProps,
  BottomSlotProps,
  // Typography types
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
  TriggerLabelConfig,
  TriggerPriceConfig,
  TriggerPriceSuffixConfig,
  TriggerSubtextConfig,
  TriggerTypographyConfig,
  TriggerStateStyle,
  MenuItemLabelConfig,
  ItemTypographyConfig,
  // Variant B types
  VariantBRightSource,
  VariantBRowConfig,
  VariantBSubtextConfig,
  VariantBTriggerConfig,
  VariantBBottomSlotConfig,
  VariantTransitionType,
  VariantTransitionConfig,
  // Pricing types
  PricingTier,
  PricingVariantId,
} from './types'

// Export constants
export {
  DEFAULT_PRICING_SELECT_MENU_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LAYOUT_CONFIG,
  DEFAULT_TRIGGER_SLOT_CONFIG,
  DEFAULT_BOTTOM_SLOT_CONFIG,
  EASING_EXPO_OUT,
  TEXT_COLOR_CLASSES,
  FONT_WEIGHT_CLASSES,
  FONT_SIZE_CLASSES,
  OPACITY_VALUES,
  VERTICAL_ALIGN_CLASSES,
  BADGE_COLOR_CLASSES,
  HOVER_BACKGROUND_CLASSES,
  BACKGROUND_CLASSES,
} from './constants'

// Export utils
export {
  deepMerge,
  getSlotContainerClipPath,
  getContentClipPath,
  getBackgroundClass,
  getBorderColorVar,
  getPopupClasses,
  getGradientStyles,
} from './utils'
