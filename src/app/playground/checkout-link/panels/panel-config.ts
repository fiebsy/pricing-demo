/**
 * Checkout Link Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { CheckoutConfig, CheckoutPresetMeta } from '../config/types'
import {
  BILLING_INTERVAL_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  ORDER_SUMMARY_POSITION_OPTIONS,
  PRIMARY_COLOR_OPTIONS,
  BACKGROUND_COLOR_OPTIONS,
  UPSELL_SAVINGS_OPTIONS,
  EXPRESS_CHECKOUT_TYPE_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildCheckoutPanelConfig(
  config: CheckoutConfig,
  presets: CheckoutPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildBusinessSection(config),
      buildProductSection(config),
      buildOrderSummarySection(config),
      buildPaymentSection(config),
      buildThemeSection(config),
      buildLayoutSection(config),
      buildFooterSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true,
    },
    showReset: true,
  }
}

// ============================================================================
// Section Builders
// ============================================================================

function buildBusinessSection(config: CheckoutConfig): Section {
  return {
    id: 'business',
    label: 'Business',
    title: 'Business Settings',
    groups: [
      {
        title: 'Branding',
        controls: [
          {
            id: 'business.name',
            type: 'text',
            label: 'Business Name',
            value: config.business.name,
            placeholder: 'Company name...',
          },
          {
            id: 'business.showLogo',
            type: 'toggle',
            label: 'Show Logo',
            value: config.business.showLogo,
          },
          {
            id: 'business.showBackButton',
            type: 'toggle',
            label: 'Show Back Button',
            value: config.business.showBackButton,
          },
        ],
      },
    ],
  }
}

function buildProductSection(config: CheckoutConfig): Section {
  return {
    id: 'product',
    label: 'Product',
    title: 'Product Settings',
    groups: [
      {
        title: 'Product Info',
        controls: [
          {
            id: 'product.name',
            type: 'text',
            label: 'Product Name',
            value: config.product.name,
            placeholder: 'Product name...',
          },
          {
            id: 'product.price',
            type: 'slider',
            label: 'Price',
            value: config.product.price,
            min: 1,
            max: 500,
            step: 1,
            formatLabel: (v: number) => `$${v}`,
          },
        ],
      },
      {
        title: 'Billing',
        controls: [
          {
            id: 'product.billingInterval',
            type: 'select',
            label: 'Billing Interval',
            value: config.product.billingInterval,
            options: [...BILLING_INTERVAL_OPTIONS],
          },
        ],
      },
      {
        title: 'Quantity',
        controls: [
          {
            id: 'product.quantity',
            type: 'slider',
            label: 'Quantity',
            value: config.product.quantity,
            min: 1,
            max: 50,
            step: 1,
          },
          {
            id: 'product.showQuantitySelector',
            type: 'toggle',
            label: 'Show Qty Selector',
            value: config.product.showQuantitySelector,
          },
          {
            id: 'product.showTierBreakdown',
            type: 'toggle',
            label: 'Show Tier Breakdown',
            value: config.product.showTierBreakdown,
          },
        ],
      },
    ],
  }
}

function buildOrderSummarySection(config: CheckoutConfig): Section {
  return {
    id: 'orderSummary',
    label: 'Order',
    title: 'Order Summary',
    groups: [
      {
        title: 'Features',
        controls: [
          {
            id: 'orderSummary.showPromotionCode',
            type: 'toggle',
            label: 'Promotion Code',
            value: config.orderSummary.showPromotionCode,
          },
          {
            id: 'orderSummary.showUpsellToggle',
            type: 'toggle',
            label: 'Annual Upsell',
            value: config.orderSummary.showUpsellToggle,
          },
        ],
      },
      {
        title: 'Annual Pricing',
        controls: [
          {
            id: 'orderSummary.annualPrice',
            type: 'slider',
            label: 'Annual Price',
            value: config.orderSummary.annualPrice,
            min: 100,
            max: 1000,
            step: 10,
            formatLabel: (v: number) => `$${v}`,
          },
          {
            id: 'orderSummary.upsellSavings',
            type: 'slider',
            label: 'Savings Amount',
            value: config.orderSummary.upsellSavings,
            min: 10,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `$${v}`,
          },
        ],
      },
    ],
  }
}

function buildPaymentSection(config: CheckoutConfig): Section {
  return {
    id: 'payment',
    label: 'Payment',
    title: 'Payment Settings',
    groups: [
      {
        title: 'Express Checkout',
        controls: [
          {
            id: 'payment.showExpressCheckout',
            type: 'toggle',
            label: 'Express Checkout',
            value: config.payment.showExpressCheckout,
          },
          {
            id: 'payment.expressCheckoutType',
            type: 'select',
            label: 'Express Type',
            value: config.payment.expressCheckoutType,
            options: [...EXPRESS_CHECKOUT_TYPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Contact',
        controls: [
          {
            id: 'payment.showEmailField',
            type: 'toggle',
            label: 'Email Field',
            value: config.payment.showEmailField,
          },
          {
            id: 'payment.showLinkSignup',
            type: 'toggle',
            label: 'Link Signup',
            value: config.payment.showLinkSignup,
          },
        ],
      },
      {
        title: 'Payment Methods',
        controls: [
          {
            id: 'payment.enableCard',
            type: 'toggle',
            label: 'Credit/Debit Card',
            value: config.payment.enableCard,
          },
          {
            id: 'payment.enableGooglePay',
            type: 'toggle',
            label: 'Google Pay',
            value: config.payment.enableGooglePay,
          },
          {
            id: 'payment.enableBankAccount',
            type: 'toggle',
            label: 'US Bank Account',
            value: config.payment.enableBankAccount,
          },
        ],
      },
      {
        title: 'Default Method',
        controls: [
          {
            id: 'payment.defaultMethod',
            type: 'select',
            label: 'Default Expanded',
            value: config.payment.defaultMethod,
            options: [...PAYMENT_METHOD_OPTIONS],
          },
        ],
      },
      {
        title: 'Display Options',
        controls: [
          {
            id: 'payment.showCardBrands',
            type: 'toggle',
            label: 'Show Card Brands',
            value: config.payment.showCardBrands,
          },
          {
            id: 'payment.showTerms',
            type: 'toggle',
            label: 'Show Terms',
            value: config.payment.showTerms,
          },
          {
            id: 'payment.showStripeBranding',
            type: 'toggle',
            label: 'Show Stripe Branding',
            value: config.payment.showStripeBranding,
          },
        ],
      },
    ],
  }
}

function buildThemeSection(config: CheckoutConfig): Section {
  return {
    id: 'theme',
    label: 'Theme',
    title: 'Visual Theme',
    groups: [
      {
        title: 'Colors',
        controls: [
          {
            id: 'theme.primaryColor',
            type: 'color-select',
            label: 'Primary Color',
            value: config.theme.primaryColor,
            options: [...PRIMARY_COLOR_OPTIONS],
          },
          {
            id: 'theme.backgroundColor',
            type: 'color-select',
            label: 'Background',
            value: config.theme.backgroundColor,
            options: [...BACKGROUND_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'theme.borderRadius',
            type: 'select',
            label: 'Border Radius',
            value: config.theme.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
          {
            id: 'theme.shadowIntensity',
            type: 'select',
            label: 'Shadow',
            value: config.theme.shadowIntensity,
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: CheckoutConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Arrangement',
        controls: [
          {
            id: 'layout.compactMode',
            type: 'toggle',
            label: 'Compact Mode',
            value: config.layout.compactMode,
          },
          {
            id: 'layout.orderSummaryPosition',
            type: 'select',
            label: 'Order Summary',
            value: config.layout.orderSummaryPosition,
            options: [...ORDER_SUMMARY_POSITION_OPTIONS],
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'layout.panelGap',
            type: 'slider',
            label: 'Panel Gap',
            value: config.layout.panelGap,
            min: 0,
            max: 64,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildFooterSection(config: CheckoutConfig): Section {
  return {
    id: 'footer',
    label: 'Footer',
    title: 'Footer Settings',
    groups: [
      {
        title: 'Badges',
        controls: [
          {
            id: 'footer.showClimateProgram',
            type: 'toggle',
            label: 'Climate Program',
            value: config.footer.showClimateProgram,
          },
        ],
      },
    ],
  }
}
