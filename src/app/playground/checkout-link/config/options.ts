/**
 * Checkout Link Control Panel Options
 *
 * These options populate the control panel dropdowns.
 */

// ============================================================================
// Express Checkout Type Options
// ============================================================================

export const EXPRESS_CHECKOUT_TYPE_OPTIONS = [
  { label: 'Pay with Link', value: 'link' },
  { label: 'Apple Pay', value: 'apple_pay' },
  { label: 'Google Pay', value: 'google_pay' },
] as const

// ============================================================================
// Billing Interval Options
// ============================================================================

export const BILLING_INTERVAL_OPTIONS = [
  { label: 'Monthly', value: 'month' },
  { label: 'Yearly', value: 'year' },
] as const

// ============================================================================
// Payment Method Options
// ============================================================================

export const PAYMENT_METHOD_OPTIONS = [
  { label: 'Credit/Debit Card', value: 'card' },
  { label: 'Google Pay', value: 'google_pay' },
  { label: 'US Bank Account', value: 'us_bank_account' },
] as const

// ============================================================================
// Border Radius Options
// ============================================================================

export const BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
] as const

// ============================================================================
// Shadow Intensity Options
// ============================================================================

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Prominent', value: 'lg' },
] as const

// ============================================================================
// Order Summary Position Options
// ============================================================================

export const ORDER_SUMMARY_POSITION_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
] as const

// ============================================================================
// Primary Color Options
// ============================================================================

export const PRIMARY_COLOR_OPTIONS = [
  { label: 'Stripe Blue', value: '#0570de', color: '#0570de' },
  { label: 'Indigo', value: '#635bff', color: '#635bff' },
  { label: 'Green', value: '#00a67e', color: '#00a67e' },
  { label: 'Purple', value: '#7c3aed', color: '#7c3aed' },
  { label: 'Rose', value: '#e11d48', color: '#e11d48' },
  { label: 'Orange', value: '#f97316', color: '#f97316' },
  { label: 'Slate', value: '#475569', color: '#475569' },
] as const

// ============================================================================
// Background Color Options
// ============================================================================

export const BACKGROUND_COLOR_OPTIONS = [
  { label: 'Light Gray', value: '#f2f2f3', color: '#f2f2f3' },
  { label: 'White', value: '#ffffff', color: '#ffffff' },
  { label: 'Cool Gray', value: '#f1f5f9', color: '#f1f5f9' },
  { label: 'Warm Gray', value: '#f5f5f4', color: '#f5f5f4' },
  { label: 'Blue Tint', value: '#f0f9ff', color: '#f0f9ff' },
] as const

// ============================================================================
// Upsell Savings Options
// ============================================================================

export const UPSELL_SAVINGS_OPTIONS = [
  { label: '$48', value: 48 },
  { label: '$68', value: 68 },
  { label: '$100', value: 100 },
  { label: '$120', value: 120 },
] as const
