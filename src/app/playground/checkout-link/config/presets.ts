/**
 * Checkout Link Presets
 *
 * Preset variations:
 * - default: Standard monthly subscription checkout
 * - annual: Annual billing with discount display
 * - enterprise: Multiple seats with quantity selector
 * - minimal: Card only, no alternative payment methods
 * - google-pay-first: Google Pay expanded by default
 */

import type { CheckoutConfig, CheckoutPresetMeta } from './types'

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_CHECKOUT_CONFIG: CheckoutConfig = {
  business: {
    name: 'Arcade Software, Inc.',
    showLogo: true,
    showBackButton: true,
  },
  product: {
    name: 'Arcade Pro',
    price: 38.0,
    billingInterval: 'month',
    quantity: 1,
    showQuantitySelector: false,
    showTierBreakdown: false,
  },
  theme: {
    primaryColor: '#0570de',
    backgroundColor: '#f2f2f3',
    cardBackgroundColor: '#ffffff',
    borderRadius: 'md',
    shadowIntensity: 'sm',
  },
  payment: {
    enableCard: true,
    enableGooglePay: true,
    enableBankAccount: true,
    defaultMethod: 'card',
    showCardBrands: true,
    showTerms: true,
    showStripeBranding: true,
    showExpressCheckout: true,
    expressCheckoutType: 'link',
    showEmailField: true,
    showLinkSignup: true,
  },
  layout: {
    compactMode: false,
    orderSummaryPosition: 'left',
    panelGap: 0,
  },
  orderSummary: {
    showPromotionCode: true,
    showUpsellToggle: true,
    annualPrice: 388.0,
    upsellSavings: 68,
  },
  footer: {
    showClimateProgram: true,
  },
}

// ============================================================================
// Presets
// ============================================================================

export const CHECKOUT_PRESETS: CheckoutPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard monthly subscription checkout',
    data: DEFAULT_CHECKOUT_CONFIG,
  },
  {
    id: 'annual',
    name: 'Annual',
    description: 'Annual billing with savings display',
    data: {
      ...DEFAULT_CHECKOUT_CONFIG,
      product: {
        ...DEFAULT_CHECKOUT_CONFIG.product,
        price: 380.0,
        billingInterval: 'year',
      },
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Multi-seat plan with quantity selector',
    data: {
      ...DEFAULT_CHECKOUT_CONFIG,
      product: {
        ...DEFAULT_CHECKOUT_CONFIG.product,
        name: 'Arcade Enterprise',
        price: 99.0,
        quantity: 5,
        showQuantitySelector: true,
        showTierBreakdown: true,
      },
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Card only, no alternative payment methods',
    data: {
      ...DEFAULT_CHECKOUT_CONFIG,
      payment: {
        ...DEFAULT_CHECKOUT_CONFIG.payment,
        enableGooglePay: false,
        enableBankAccount: false,
        showExpressCheckout: false,
        showLinkSignup: false,
      },
      business: {
        ...DEFAULT_CHECKOUT_CONFIG.business,
        showBackButton: false,
      },
      orderSummary: {
        ...DEFAULT_CHECKOUT_CONFIG.orderSummary,
        showPromotionCode: false,
        showUpsellToggle: false,
      },
      footer: {
        showClimateProgram: false,
      },
    },
  },
  {
    id: 'google-pay-first',
    name: 'Google Pay First',
    description: 'Google Pay expanded by default',
    data: {
      ...DEFAULT_CHECKOUT_CONFIG,
      payment: {
        ...DEFAULT_CHECKOUT_CONFIG.payment,
        defaultMethod: 'google_pay',
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): CheckoutPresetMeta | undefined =>
  CHECKOUT_PRESETS.find((p) => p.id === id)
