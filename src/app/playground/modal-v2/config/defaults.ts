/**
 * Modal V2 Default Configuration
 *
 * All default values centralized in one place.
 */

import type { ModalV2Config } from './types'

/** Default modal configuration */
export const DEFAULT_CONFIG: ModalV2Config = {
  appearance: {
    width: 400,
    padding: 24,
    gap: 16,
    borderRadius: 16,
    background: 'secondary',
    shine: 'shine-3',
    depth: 'depth-gradient-2',
    shadow: 'lg',
  },

  animation: {
    duration: 0.2,
    bounce: 0.12,
    stagger: 0.025,
  },

  demo: {
    slowMo: false,
    autoOpen: true,
    pageBackground: 'primary',
  },

  header: {
    showAsset: true,
    asset: {
      type: 'coin-stack',
      height: 32,
      alignment: 'left',
      offsetX: -10,
      coinStackWidth: 60,
    },
    title: {
      color: 'text-primary',
      size: 'xl',
      weight: '600',
    },
    subtext: {
      show: true,
      color: 'text-quaternary',
      size: 'sm',
      weight: '400',
    },
  },

  buttons: {
    primary: {
      variant: 'primary',
      size: 'md',
    },
    secondary: {
      variant: 'secondary',
      size: 'md',
    },
    layout: 'horizontal',
    gap: 12,
    cornerSquircle: true,
    fluid: {
      enabled: true,
      timing: 'synced',
      gap: 12,
      exitBlur: false,
      checkmarkStyle: 'flip',
      textSlideDuration: 200,
      checkmarkDrawDuration: 250,
    },
  },

  proCard: {
    title: 'Pro',
    multiplier: 2,
    height: 80,
    gradient: 'arcade-blue',
    titleGradient: 'text-primary',
    multiplierGradient: 'ocean-depth',
    containerBackground: 'secondary',
    containerShine: 'shine-1-subtle',
    containerBorderRadius: 12,
    glowEnabled: true,
    glowColor: 'blue-500',
    glowBlur: 24,
    glowOpacity: 40,
  },

  pricingSelect: {
    availableTiers: ['tier-100', 'tier-200', 'tier-300', 'tier-400', 'tier-500', 'tier-600'],
    upgradeMode: true,
    variantATriggerHeight: 88,
    variantAMaxBottomHeight: 180,
    variantBTriggerHeight: 44,
    variantBBottomHeight: 80,
    panelWidth: 'fill',
    borderRadius: 12,
    shine: 'shine-0',
    background: 'secondary',
    headerShow: true,
    headerText: 'Upgrade fee',
    headerMarginBottom: 12,
  },
}

// ============================================================================
// Pricing Select Variant Defaults
// ============================================================================

/** Default trigger config for Variant B */
export const DEFAULT_VARIANT_B_TRIGGER = {
  planRow: {
    show: true,
    leftText: '',
    rightSource: 'additionalCredits' as const,
    leftFontSize: 'sm' as const,
    leftFontWeight: 'medium' as const,
    leftTextColor: 'primary' as const,
    leftOpacity: '100' as const,
    rightFontSize: 'sm' as const,
    rightFontWeight: 'normal' as const,
    rightTextColor: 'tertiary' as const,
    rightOpacity: '60' as const,
  },
  paddingX: 20,
  paddingTop: 16,
  paddingBottom: 12,
}

/** Default bottom config for Variant B */
export const DEFAULT_VARIANT_B_BOTTOM = {
  dueRow: {
    show: true,
    leftText: 'Due today',
    rightSource: 'upgradeFee' as const,
    leftFontSize: 'sm' as const,
    leftFontWeight: 'normal' as const,
    leftTextColor: 'tertiary' as const,
    leftOpacity: '100' as const,
    rightFontSize: 'sm' as const,
    rightFontWeight: 'semibold' as const,
    rightTextColor: 'primary' as const,
    rightOpacity: '100' as const,
  },
  subtext: {
    show: true,
    template: 'Then {price}/mo. Cancel anytime.',
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
  },
  rowGap: 4,
  paddingX: 16,
  paddingTop: 12,
  paddingBottom: 12,
}

/** Default trigger typography for Variant A */
export const DEFAULT_TRIGGER_TYPOGRAPHY = {
  label: {
    text: '',
    show: false,
    fontSize: 'sm' as const,
    fontWeight: 'semibold' as const,
    textColor: 'primary' as const,
  },
  price: {
    prefix: '$',
    show: true,
    fontSize: '3xl' as const,
    fontWeight: 'medium' as const,
    textColor: 'primary' as const,
  },
  priceSuffix: {
    text: 'due today',
    show: true,
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
  },
  subtext: {
    text: '',
    show: false,
    fontSize: 'xs' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
  },
  priceRowAlign: 'center' as const,
  priceRowGap: 8,
  rowGap: 4,
}

/** Default synced subtext config */
export const DEFAULT_SYNCED_SUBTEXT = {
  syncWithSelection: true,
  separator: '',
  gap: 4,
  planName: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'medium' as const,
    textColor: 'tertiary' as const,
    opacity: '100' as const,
    badgeColor: 'brand' as const,
  },
  credits: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
    badgeColor: 'gray' as const,
  },
}

/** Default item typography */
export const DEFAULT_ITEM_TYPOGRAPHY = {
  label: {
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'primary' as const,
  },
  price: {
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '100' as const,
  },
}

/** Default menu item label config */
export const DEFAULT_MENU_ITEM_LABEL = {
  layout: 'inline' as const,
  separator: '',
  gap: 6,
  planName: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'medium' as const,
    textColor: 'primary' as const,
    opacity: '100' as const,
    badgeColor: 'brand' as const,
  },
  credits: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
    badgeColor: 'gray' as const,
  },
}
