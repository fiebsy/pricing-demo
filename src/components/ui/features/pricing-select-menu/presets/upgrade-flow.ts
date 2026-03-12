/**
 * Upgrade Flow Preset
 *
 * Complete production configuration for the pricing select menu.
 * Matches the playground config exactly for consistent styling.
 */

import type {
  TriggerTypographyConfig,
  SyncedSubtextConfig,
  ItemTypographyConfig,
  MenuItemLabelConfig,
  VariantBTriggerConfig,
  VariantBBottomSlotConfig,
  VariantTransitionConfig,
  MenuAppearance,
  DropdownIconConfig,
  AnimationConfig,
  BottomSlotConfig,
} from '../types'

// ============================================================================
// DIMENSIONS
// ============================================================================

export const UPGRADE_FLOW_DIMENSIONS = {
  variantA: {
    triggerHeight: 88,
    maxBottomHeight: 200,
  },
  variantB: {
    triggerHeight: 44,
    bottomHeight: 80,
  },
  panelWidth: 320,
  borderRadius: 16,
} as const

// ============================================================================
// ANIMATION
// ============================================================================

export const UPGRADE_FLOW_ANIMATION: AnimationConfig = {
  duration: 212,
  collapseDuration: 125,
  easing: 'expo-out',
  animateSlotContainers: false,
  slotContainerDelay: 0,
  slotContainerDurationOffset: 100,
  expandOrigin: 'top',
}

// ============================================================================
// APPEARANCE
// ============================================================================

export const UPGRADE_FLOW_APPEARANCE: Partial<MenuAppearance> = {
  borderRadius: 'xl',
  shadow: '2xl',
  shine: 'shine-2',
  background: 'tertiary',
  gradient: 'subtle-depth-md',
  gradientColor: 'tertiary',
  squircle: false,
  triggerHoverBackground: 'quaternary',
}

// ============================================================================
// BOTTOM SLOT
// ============================================================================

export const UPGRADE_FLOW_BOTTOM_SLOT: Partial<BottomSlotConfig> = {
  enabled: true,
  heightMode: 'dynamic',
  scrollable: true,
  background: 'primary',
  shine: 'none',
  borderRadius: 12,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

// ============================================================================
// DROPDOWN ICON
// ============================================================================

export const UPGRADE_FLOW_DROPDOWN_ICON: DropdownIconConfig = {
  show: true,
  size: 18,
  color: 'tertiary',
  direction: 'right',
  rotatesOnOpen: true,
}

// ============================================================================
// TRIGGER CONFIG
// ============================================================================

export const UPGRADE_FLOW_TRIGGER_PADDING = {
  x: 20,
  top: 0,
  bottom: 0,
} as const

export const UPGRADE_FLOW_TRIGGER_TYPOGRAPHY: TriggerTypographyConfig = {
  label: {
    text: '',
    show: false,
    fontSize: 'sm',
    fontWeight: 'semibold',
    textColor: 'primary',
  },
  price: {
    prefix: '$',
    show: true,
    fontSize: '3xl',
    fontWeight: 'medium',
    textColor: 'primary',
  },
  priceSuffix: {
    text: 'due today',
    show: true,
    fontSize: 'sm',
    fontWeight: 'normal',
    textColor: 'tertiary',
    opacity: '60',
  },
  subtext: {
    text: '',
    show: false,
    fontSize: 'xs',
    fontWeight: 'normal',
    textColor: 'tertiary',
    opacity: '60',
  },
  priceRowAlign: 'center',
  priceRowGap: 8,
  rowGap: 4,
}

export const UPGRADE_FLOW_SYNCED_SUBTEXT: SyncedSubtextConfig = {
  syncWithSelection: true,
  separator: '',
  gap: 4,
  planName: {
    show: true,
    displayMode: 'text',
    fontSize: 'sm',
    fontWeight: 'medium',
    textColor: 'brand',
    opacity: '100',
    badgeColor: 'brand',
    shimmer: true,
  },
  credits: {
    show: true,
    displayMode: 'text',
    fontSize: 'sm',
    fontWeight: 'normal',
    textColor: 'tertiary',
    opacity: '60',
    badgeColor: 'gray',
    shimmer: false,
  },
}

// ============================================================================
// OPTIONS LIST CONFIG
// ============================================================================

export const UPGRADE_FLOW_OPTIONS_LIST = {
  showHeader: true,
  headerLabel: 'Plans',
  headerTextColor: 'tertiary' as const,
  headerFontWeight: 'medium' as const,
  headerFontSize: 'xs' as const,
  headerOpacity: '40' as const,
  headerUppercase: false,
  headerPaddingBottom: 1,
  containerPadding: 4,
  itemPaddingX: 12,
  itemPaddingY: 10,
  itemBorderRadius: 8,
  itemGap: 4,
  itemHoverBackground: 'quaternary' as const,
  showSelectedIndicator: false,
} as const

export const UPGRADE_FLOW_ITEM_TYPOGRAPHY: ItemTypographyConfig = {
  label: {
    fontSize: 'sm',
    fontWeight: 'normal',
    textColor: 'primary',
  },
  price: {
    fontSize: 'sm',
    fontWeight: 'normal',
    textColor: 'tertiary',
    opacity: '100',
  },
}

export const UPGRADE_FLOW_MENU_ITEM_LABEL: MenuItemLabelConfig = {
  layout: 'inline',
  separator: '',
  gap: 6,
  planName: {
    show: true,
    displayMode: 'text',
    fontSize: 'sm',
    fontWeight: 'medium',
    textColor: 'primary',
    opacity: '100',
    badgeColor: 'brand',
  },
  credits: {
    show: true,
    displayMode: 'text',
    fontSize: 'sm',
    fontWeight: 'normal',
    textColor: 'tertiary',
    opacity: '60',
    badgeColor: 'gray',
  },
}

// ============================================================================
// VARIANT B CONFIGS
// ============================================================================

export const UPGRADE_FLOW_VARIANT_B_TRIGGER: VariantBTriggerConfig = {
  planRow: {
    show: true,
    leftText: '',
    rightSource: 'additionalCredits',
    leftFontSize: 'sm',
    leftFontWeight: 'medium',
    leftTextColor: 'primary',
    leftOpacity: '100',
    rightFontSize: 'sm',
    rightFontWeight: 'normal',
    rightTextColor: 'tertiary',
    rightOpacity: '60',
  },
  paddingX: 20,
  paddingTop: 16,
  paddingBottom: 12,
}

export const UPGRADE_FLOW_VARIANT_B_BOTTOM: VariantBBottomSlotConfig = {
  dueRow: {
    show: true,
    leftText: 'Due today',
    rightSource: 'upgradeFee',
    leftFontSize: 'sm',
    leftFontWeight: 'normal',
    leftTextColor: 'tertiary',
    leftOpacity: '100',
    rightFontSize: 'sm',
    rightFontWeight: 'semibold',
    rightTextColor: 'primary',
    rightOpacity: '100',
  },
  subtext: {
    show: true,
    template: 'Then {price}/mo. Cancel anytime.',
    fontSize: 'sm',
    fontWeight: 'normal',
    textColor: 'tertiary',
    opacity: '60',
  },
  rowGap: 4,
  paddingX: 16,
  paddingTop: 12,
  paddingBottom: 12,
}

export const UPGRADE_FLOW_VARIANT_B_TRANSITION: VariantTransitionConfig = {
  enabled: false,
  type: 'spring',
  duration: 0.2,
  bounce: 0.1,
  yOffset: 2,
}

// ============================================================================
// COMBINED PRESET
// ============================================================================

export const UPGRADE_FLOW_PRESET = {
  dimensions: UPGRADE_FLOW_DIMENSIONS,
  animation: UPGRADE_FLOW_ANIMATION,
  appearance: UPGRADE_FLOW_APPEARANCE,
  bottomSlot: UPGRADE_FLOW_BOTTOM_SLOT,
  dropdownIcon: UPGRADE_FLOW_DROPDOWN_ICON,
  triggerPadding: UPGRADE_FLOW_TRIGGER_PADDING,
  typography: {
    trigger: UPGRADE_FLOW_TRIGGER_TYPOGRAPHY,
    syncedSubtext: UPGRADE_FLOW_SYNCED_SUBTEXT,
    items: UPGRADE_FLOW_ITEM_TYPOGRAPHY,
    menuItemLabel: UPGRADE_FLOW_MENU_ITEM_LABEL,
  },
  optionsList: UPGRADE_FLOW_OPTIONS_LIST,
  variantB: {
    trigger: UPGRADE_FLOW_VARIANT_B_TRIGGER,
    bottom: UPGRADE_FLOW_VARIANT_B_BOTTOM,
    transition: UPGRADE_FLOW_VARIANT_B_TRANSITION,
  },
} as const
