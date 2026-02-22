/**
 * Checkout Link Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/patterns/checkout
 */

// ============================================================================
// Payment Method Types
// ============================================================================

export type PaymentMethodType = 'card' | 'google_pay' | 'us_bank_account'

// ============================================================================
// Express Checkout Types
// ============================================================================

export type ExpressCheckoutType = 'link' | 'apple_pay' | 'google_pay'

export interface PaymentMethod {
  id: PaymentMethodType
  label: string
  enabled: boolean
}

// ============================================================================
// Product Configuration
// ============================================================================

export interface ProductConfig {
  /** Product name */
  name: string
  /** Price in dollars */
  price: number
  /** Billing interval */
  billingInterval: 'month' | 'year'
  /** Quantity */
  quantity: number
  /** Show quantity selector */
  showQuantitySelector: boolean
  /** Show tier breakdown for seat-based pricing */
  showTierBreakdown: boolean
}

// ============================================================================
// Business Configuration
// ============================================================================

export interface BusinessConfig {
  /** Business name */
  name: string
  /** Logo URL (optional) */
  logoUrl?: string
  /** Show logo */
  showLogo: boolean
  /** Show back button */
  showBackButton: boolean
}

// ============================================================================
// Theme Configuration
// ============================================================================

export interface ThemeConfig {
  /** Primary/brand color for buttons and accents */
  primaryColor: string
  /** Page background color */
  backgroundColor: string
  /** Card/panel background color */
  cardBackgroundColor: string
  /** Border radius for inputs and cards */
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Card shadow intensity */
  shadowIntensity: 'none' | 'sm' | 'md' | 'lg'
}

// ============================================================================
// Payment Form Configuration
// ============================================================================

export interface PaymentFormConfig {
  /** Enabled payment methods */
  enableCard: boolean
  enableGooglePay: boolean
  enableBankAccount: boolean
  /** Default expanded payment method */
  defaultMethod: PaymentMethodType
  /** Show card brand icons */
  showCardBrands: boolean
  /** Show terms text */
  showTerms: boolean
  /** Show powered by Stripe */
  showStripeBranding: boolean
  /** Show express checkout buttons (Apple Pay, etc.) */
  showExpressCheckout: boolean
  /** Express checkout type */
  expressCheckoutType: ExpressCheckoutType
  /** Show email input field */
  showEmailField: boolean
  /** Show Link signup checkbox and phone input */
  showLinkSignup: boolean
}

// ============================================================================
// Order Summary Configuration
// ============================================================================

export interface OrderSummaryConfig {
  /** Show promotion code input */
  showPromotionCode: boolean
  /** Show upsell toggle for annual billing */
  showUpsellToggle: boolean
  /** Annual price (for upsell comparison) */
  annualPrice: number
  /** Savings amount when switching to annual */
  upsellSavings: number
}

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterConfig {
  /** Show climate program badge */
  showClimateProgram: boolean
}

// ============================================================================
// Layout Configuration
// ============================================================================

export interface LayoutConfig {
  /** Compact mode (single column on desktop) */
  compactMode: boolean
  /** Order summary position */
  orderSummaryPosition: 'left' | 'right'
  /** Panel gap in pixels */
  panelGap: number
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface CheckoutConfig {
  business: BusinessConfig
  product: ProductConfig
  theme: ThemeConfig
  payment: PaymentFormConfig
  layout: LayoutConfig
  orderSummary: OrderSummaryConfig
  footer: FooterConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface CheckoutPresetMeta {
  id: string
  name: string
  description?: string
  data: CheckoutConfig
}
