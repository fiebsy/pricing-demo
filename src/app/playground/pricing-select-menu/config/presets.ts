/**
 * Pricing Select Menu Playground - Presets
 */

import type { PricingSelectMenuPresetMeta, PricingSelectMenuPlaygroundConfig, VariantBConfig } from './types'

// ============================================================================
// DEFAULT VARIANT B CONFIG
// ============================================================================

export const DEFAULT_VARIANT_B_CONFIG: VariantBConfig = {
  trigger: {
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
  },
  bottomSlot: {
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
  },
  transition: {
    enabled: false,
    type: 'spring',
    duration: 0.2,
    bounce: 0.1,
    yOffset: 2,
  },
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG: PricingSelectMenuPlaygroundConfig = {
  layout: {
    triggerWidth: 320,
    triggerHeight: 88,
    triggerHeightB: 44,
    panelWidth: 320,
    maxBottomHeight: 220,
    maxBottomHeightB: 80,
    borderRadius: 16,
    bottomGap: 0,
    syncTriggerWidth: true,
  },
  animation: {
    duration: 300,
    collapseDuration: 150,
    contentFadeDuration: 0,
    contentFadeDelay: 0,
    animateSlotContainers: false,
    slotContainerDelay: 0,
    slotContainerDurationOffset: 100,
    expandOrigin: 'top',
  },
  appearance: {
    borderRadius: 'xl',
    shadow: 'none',
    shine: 'shine-0',
    background: 'secondary',
    gradient: 'subtle-depth-md',
    gradientColor: 'tertiary',
    squircle: false,
  },
  bottomSlot: {
    enabled: true,
    heightMode: 'dynamic',
    height: 160,
    scrollable: true,
    background: 'primary',
    shine: 'none',
    borderRadius: 12,
    inset: 4,
    borderWidth: 1,
    borderColor: 'primary',
  },
  trigger: {
    collapsed: {
      background: 'none',
      shine: 'none',
      borderRadius: 14,
      borderWidth: 0,
      borderColor: 'primary',
    },
    expanded: {
      background: 'none',
      shine: 'none',
      borderRadius: 14,
      borderWidth: 0,
      borderColor: 'primary',
    },
  },
  demo: {
    pageBackground: 'primary',
    showDebug: false,
    slowMo: false,
    debugContainer: {
      enabled: true,
      showLines: false,
      width: 420,
      padding: 0,
      fixedHeight: true,
      height: 360,
      header: {
        show: true,
        text: 'Upgrade fee',
        fontSize: 'sm',
        fontWeight: 'medium',
        textColor: 'tertiary',
        opacity: '80',
        marginBottom: 12,
      },
    },
  },
  selectMenu: {
    showDropdownIcon: true,
    dropdownIconRotates: true,
    triggerPaddingX: 20,
    triggerPaddingTop: 0,
    triggerPaddingBottom: 0,
    syncedSubtext: {
      syncWithSelection: true,
      separator: '',
      gap: 4,
      planName: {
        show: true,
        displayMode: 'text',
        fontSize: 'sm',
        fontWeight: 'medium',
        textColor: 'tertiary',
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
    },
    showHeader: true,
    headerLabel: 'Plans',
    headerTextColor: 'tertiary',
    headerFontWeight: 'medium',
    headerFontSize: 'xs',
    headerOpacity: '40',
    headerUppercase: false,
    headerPaddingBottom: 0,
    containerPadding: 4,
    itemPaddingX: 12,
    itemPaddingY: 12,
    itemBorderRadius: 8,
    itemGap: 0,
    itemHoverBackground: 'tertiary',
    triggerHoverBackground: 'tertiary',
    menuItemLabel: {
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
    },
    availableTiers: ['tier-100', 'tier-200', 'tier-300', 'tier-400', 'tier-500', 'tier-600'],
    upgradeMode: true,
    showSelectedIndicator: false,
    triggerTypography: {
      label: {
        text: '200 credits',
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
    },
    itemTypography: {
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
    },
  },
  variantB: DEFAULT_VARIANT_B_CONFIG,
}

// ============================================================================
// PRESETS
// ============================================================================

export const PRICING_SELECT_MENU_PRESETS: PricingSelectMenuPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Upgrade selector with pricing tiers',
    data: DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG,
  },
  {
    id: 'compact',
    name: 'Compact',
    category: 'minimal',
    description: 'Smaller trigger with condensed menu',
    data: {
      ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG,
      layout: {
        ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG.layout,
        triggerWidth: 280,
        triggerHeight: 72,
        panelWidth: 280,
        maxBottomHeight: 180,
      },
      selectMenu: {
        ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG.selectMenu,
        triggerTypography: {
          ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG.selectMenu.triggerTypography,
          price: {
            ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG.selectMenu.triggerTypography.price,
            fontSize: '2xl',
          },
        },
      },
    },
  },
  {
    id: 'full-featured',
    name: 'Full Featured',
    category: 'use-case',
    description: 'All features enabled with selection indicator',
    data: {
      ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG,
      selectMenu: {
        ...DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG.selectMenu,
        showSelectedIndicator: true,
        showHeader: true,
        headerUppercase: true,
      },
    },
  },
]

// ============================================================================
// HELPERS
// ============================================================================

export const getPresetById = (id: string): PricingSelectMenuPresetMeta | undefined =>
  PRICING_SELECT_MENU_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): PricingSelectMenuPresetMeta[] =>
  PRICING_SELECT_MENU_PRESETS.filter((p) => p.category === category)
