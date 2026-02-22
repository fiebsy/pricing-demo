/**
 * Checkout Page Component
 *
 * Stripe-style checkout page with two-panel layout:
 * - Left panel: Order overview (gray background)
 * - Right panel: Payment form (white background)
 */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import type { CheckoutConfig, PaymentMethodType, ExpressCheckoutType } from '../config/types'

// ============================================================================
// Helper Functions
// ============================================================================

function getBorderRadiusClass(radius: string): string {
  switch (radius) {
    case 'none':
      return 'rounded-none'
    case 'sm':
      return 'rounded'
    case 'md':
      return 'rounded-lg'
    case 'lg':
      return 'rounded-xl'
    case 'xl':
      return 'rounded-2xl'
    default:
      return 'rounded-lg'
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price)
}

function formatPriceWithInterval(price: number, interval: 'month' | 'year'): string {
  const formatted = formatPrice(price)
  return `${formatted} per ${interval}`
}

// ============================================================================
// Header Component
// ============================================================================

interface HeaderProps {
  config: CheckoutConfig
}

function Header({ config }: HeaderProps) {
  const { business } = config

  return (
    <div className="flex items-center gap-6 px-10 py-5">
      {business.showBackButton && (
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-medium text-[#0570de] hover:text-[#0366d6] transition-colors"
        >
          <HugeIcon icon={ArrowLeft01Icon} size={16} />
          <span>Back</span>
        </button>
      )}
      {business.showLogo && (
        <div className="flex items-center gap-2.5">
          {/* Placeholder logo - purple rounded square */}
          <div className="size-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600" />
          <span className="text-sm font-medium text-[#1a1f36]">{business.name}</span>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Order Overview Panel (Left Side)
// ============================================================================

interface OrderOverviewPanelProps {
  config: CheckoutConfig
  isAnnualSelected: boolean
  onToggleAnnual: () => void
}

function OrderOverviewPanel({ config, isAnnualSelected, onToggleAnnual }: OrderOverviewPanelProps) {
  const { product, orderSummary } = config
  const [promoExpanded, setPromoExpanded] = useState(false)

  const currentPrice = isAnnualSelected ? orderSummary.annualPrice : product.price
  const currentInterval = isAnnualSelected ? 'year' : product.billingInterval

  return (
    <div className="flex-1 flex flex-col min-h-full px-10 py-8">
      {/* Product Summary */}
      <div className="space-y-1.5 mb-8">
        <h1 className="text-2xl font-semibold text-[#1a1f36]">Subscribe to {product.name}</h1>
        <p className="text-lg text-[#5e6977]">{formatPriceWithInterval(currentPrice, currentInterval)}</p>
      </div>

      {/* Line Item with Upsell Toggle */}
      <div className="border-t border-[#e6e6e6] pt-6 space-y-4">
        {/* Main Line Item */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#1a1f36]">{product.name}</span>
            </div>
            {product.showQuantitySelector && (
              <div className="mt-2">
                <select className="text-sm border border-[#e6e6e6] rounded-md px-3 py-1.5 bg-white text-[#1a1f36]">
                  {[1, 2, 3, 4, 5, 10, 15, 20, 25, 50].map((qty) => (
                    <option key={qty} value={qty} selected={qty === product.quantity}>
                      Qty {qty}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-[#1a1f36]">{formatPriceWithInterval(currentPrice, currentInterval)}</span>
          </div>
        </div>

        {/* Upsell Toggle */}
        {orderSummary.showUpsellToggle && product.billingInterval === 'month' && (
          <div className="flex items-center gap-3 py-2">
            <button
              type="button"
              onClick={onToggleAnnual}
              className={cn(
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors',
                isAnnualSelected ? 'bg-[#0570de]' : 'bg-[#cdd1d8]'
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform mt-0.5',
                  isAnnualSelected ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                )}
              />
            </button>
            <span className="text-sm text-[#1a1f36]">
              Save {formatPrice(orderSummary.upsellSavings)} with annual billing
            </span>
          </div>
        )}
      </div>

      {/* Promotion Code */}
      {orderSummary.showPromotionCode && (
        <div className="border-t border-[#e6e6e6] mt-4 pt-4">
          {promoExpanded ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promotion code"
                className="flex-1 px-3 py-2 text-sm border border-[#e6e6e6] rounded-md placeholder:text-[#a3a8b0] focus:outline-none focus:ring-2 focus:ring-[#0570de]/20 focus:border-[#0570de]"
              />
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-[#0570de] border border-[#e6e6e6] rounded-md hover:bg-[#f7f7f7] transition-colors"
              >
                Apply
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPromoExpanded(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#0570de] hover:text-[#0366d6] transition-colors"
            >
              <HugeIcon icon={Add01Icon} size={14} />
              <span>Add promotion code</span>
            </button>
          )}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Order Summary Footer */}
      <div className="border-t border-[#e6e6e6] pt-4 mt-8 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#5e6977]">Subtotal</span>
          <span className="text-[#1a1f36]">{formatPrice(currentPrice)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#1a1f36]">Total due today</span>
          <span className="font-semibold text-[#1a1f36]">{formatPrice(currentPrice)}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Payment Panel (Right Side)
// ============================================================================

interface PaymentPanelProps {
  config: CheckoutConfig
  selectedMethod: PaymentMethodType
  onMethodChange: (method: PaymentMethodType) => void
}

function PaymentPanel({ config, selectedMethod, onMethodChange }: PaymentPanelProps) {
  const { payment, theme, business, footer } = config

  const inputRadius = getBorderRadiusClass(theme.borderRadius)

  const paymentMethods = [
    {
      id: 'card' as const,
      label: 'Card',
      enabled: payment.enableCard,
      icons: ['visa', 'mastercard', 'amex'],
    },
    {
      id: 'google_pay' as const,
      label: 'Google Pay',
      enabled: payment.enableGooglePay,
      icons: ['gpay'],
    },
    {
      id: 'us_bank_account' as const,
      label: 'US bank account',
      enabled: payment.enableBankAccount,
      icons: ['bank'],
    },
  ].filter((m) => m.enabled)

  return (
    <div className="flex-1 flex flex-col min-h-full bg-white px-10 py-8">
      {/* Express Checkout */}
      {payment.showExpressCheckout && (
        <>
          <ExpressCheckoutButton type={payment.expressCheckoutType} />

          {/* Or Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e6e6e6]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-sm text-[#5e6977] bg-white">Or</span>
            </div>
          </div>
        </>
      )}

      {/* Contact Information */}
      {payment.showEmailField && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#1a1f36] mb-3">Contact information</h3>
          <input
            type="email"
            placeholder="email@example.com"
            className={cn(
              'w-full px-3 py-3 text-[15px] border border-[#e6e6e6] placeholder:text-[#a3a8b0] focus:outline-none focus:ring-2 focus:ring-[#0570de]/20 focus:border-[#0570de]',
              inputRadius
            )}
          />
        </div>
      )}

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#1a1f36] mb-3">Payment method</h3>

        <div className={cn('border border-[#e6e6e6] overflow-hidden', inputRadius)}>
          {paymentMethods.map((method, index) => (
            <div key={method.id}>
              {index > 0 && <div className="h-px bg-[#e6e6e6]" />}
              <button
                type="button"
                onClick={() => onMethodChange(method.id)}
                className="w-full flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-[#f7f7f7] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'size-5 rounded-full border-2 flex items-center justify-center transition-colors',
                      selectedMethod === method.id ? 'border-[#0570de]' : 'border-[#cdd1d8]'
                    )}
                  >
                    {selectedMethod === method.id && (
                      <div className="size-2.5 rounded-full bg-[#0570de]" />
                    )}
                  </div>
                  <span className="font-medium text-[#1a1f36]">{method.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {method.icons.map((icon) => (
                    <PaymentIcon key={icon} type={icon} />
                  ))}
                </div>
              </button>

              {/* Card Form (expanded when card selected) */}
              {method.id === 'card' && selectedMethod === 'card' && (
                <div className="px-4 pb-4 space-y-4 border-t border-[#e6e6e6] pt-4 bg-[#f7f7f7]/50">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm text-[#5e6977] mb-1.5">Card number</label>
                    <div className={cn('relative border border-[#e6e6e6] bg-white overflow-hidden', inputRadius)}>
                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-3 py-3 text-[15px] placeholder:text-[#a3a8b0] focus:outline-none"
                      />
                      {payment.showCardBrands && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <PaymentIcon type="visa" size="sm" />
                          <PaymentIcon type="mastercard" size="sm" />
                          <PaymentIcon type="amex" size="sm" />
                          <PaymentIcon type="diners" size="sm" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#5e6977] mb-1.5">Expiration</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className={cn(
                          'w-full px-3 py-3 text-[15px] border border-[#e6e6e6] bg-white placeholder:text-[#a3a8b0] focus:outline-none',
                          inputRadius
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#5e6977] mb-1.5">CVC</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className={cn(
                          'w-full px-3 py-3 text-[15px] border border-[#e6e6e6] bg-white placeholder:text-[#a3a8b0] focus:outline-none',
                          inputRadius
                        )}
                      />
                    </div>
                  </div>

                  {/* Country and ZIP */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#5e6977] mb-1.5">Country</label>
                      <select
                        className={cn(
                          'w-full px-3 py-3 text-[15px] border border-[#e6e6e6] bg-white focus:outline-none appearance-none',
                          inputRadius
                        )}
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#5e6977] mb-1.5">ZIP</label>
                      <input
                        type="text"
                        placeholder="12345"
                        className={cn(
                          'w-full px-3 py-3 text-[15px] border border-[#e6e6e6] bg-white placeholder:text-[#a3a8b0] focus:outline-none',
                          inputRadius
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Google Pay button (expanded when selected) */}
              {method.id === 'google_pay' && selectedMethod === 'google_pay' && (
                <div className="px-4 pb-4 border-t border-[#e6e6e6] pt-4 bg-[#f7f7f7]/50">
                  <button
                    type="button"
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-3 bg-black text-white font-medium',
                      inputRadius
                    )}
                  >
                    <GooglePayIcon />
                  </button>
                </div>
              )}

              {/* Bank account info (expanded when selected) */}
              {method.id === 'us_bank_account' && selectedMethod === 'us_bank_account' && (
                <div className="px-4 pb-4 border-t border-[#e6e6e6] pt-4 bg-[#f7f7f7]/50">
                  <p className="text-sm text-[#5e6977]">
                    By clicking Subscribe, you authorize this payment and future payments to be debited from your bank
                    account.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Link Signup */}
      {payment.showLinkSignup && (
        <LinkSignupSection businessName={business.name} inputRadius={inputRadius} />
      )}

      {/* Subscribe Button with Shimmer */}
      <button
        type="button"
        className={cn(
          'relative w-full py-4 text-white font-semibold overflow-hidden transition-opacity hover:opacity-90',
          inputRadius
        )}
        style={{ backgroundColor: theme.primaryColor }}
      >
        <span className="relative z-10">Subscribe</span>
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </button>

      {/* Terms Text */}
      {payment.showTerms && (
        <p className="mt-4 text-xs text-[#6b7280] text-center leading-relaxed">
          By confirming your subscription, you allow {business.name} to charge you for future payments in accordance
          with their terms. You can always cancel your subscription.
        </p>
      )}

      {/* Climate Program Badge */}
      {footer.showClimateProgram && (
        <div className="mt-6 flex items-center justify-center gap-2 py-3 px-4 bg-[#f0fdf4] rounded-lg">
          <ClimateBadge />
          <span className="text-xs text-[#166534]">Stripe Climate contributes 1% of your purchase to carbon removal.</span>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      {payment.showStripeBranding && (
        <div className="flex items-center justify-center gap-3 pt-6 mt-6 border-t border-[#e6e6e6]">
          <a
            href="#"
            className="flex items-center gap-1.5 text-[11px] text-[#6b7280] hover:text-[#1a1f36] transition-colors"
          >
            Powered by <StripeLogo />
          </a>
          <span className="text-[#d1d5db]">|</span>
          <a href="#" className="text-[11px] text-[#6b7280] hover:text-[#1a1f36] transition-colors">
            Terms
          </a>
          <a href="#" className="text-[11px] text-[#6b7280] hover:text-[#1a1f36] transition-colors">
            Privacy
          </a>
          <span className="text-[#d1d5db]">|</span>
          <a href="#" className="text-[11px] text-[#6b7280] hover:text-[#1a1f36] transition-colors">
            Link Terms
          </a>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Icon Components
// ============================================================================

interface ExpressCheckoutButtonProps {
  type: ExpressCheckoutType
}

function ExpressCheckoutButton({ type }: ExpressCheckoutButtonProps) {
  switch (type) {
    case 'link':
      return (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#00d66f] text-white font-medium rounded-md hover:bg-[#00c264] transition-colors"
        >
          <span className="text-[15px]">Pay with</span>
          <LinkLogoWhite />
        </button>
      )
    case 'apple_pay':
      return (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white font-medium rounded-md hover:bg-[#1a1a1a] transition-colors"
        >
          <ApplePayIcon />
        </button>
      )
    case 'google_pay':
      return (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white font-medium rounded-md hover:bg-[#1a1a1a] transition-colors"
        >
          <GooglePayIcon />
        </button>
      )
    default:
      return null
  }
}

function ApplePayIcon() {
  return (
    <svg className="h-5" viewBox="0 0 43 18" fill="currentColor">
      <path d="M8.43 0c-.88.05-1.93.6-2.54 1.35-.55.67-1.02 1.7-.84 2.7.97.07 1.96-.53 2.54-1.3.56-.73.96-1.74.84-2.75zm.14 3.75c-1.4-.09-2.62.8-3.29.8-.68 0-1.72-.76-2.84-.74-1.46.02-2.82.86-3.57 2.17-1.52 2.65-.39 6.57 1.09 8.72.73 1.06 1.59 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.69.71 2.84.69 1.18-.02 1.91-1.08 2.64-2.14.83-1.22 1.17-2.41 1.19-2.47-.03-.01-2.28-.88-2.3-3.49-.02-2.18 1.77-3.23 1.85-3.28-1.01-1.5-2.59-1.67-3.18-1.75z" />
      <path d="M21.14 1.5c2.97 0 5.04 2.05 5.04 5.03 0 3-.1 5.06-5.1 5.06h-3.29v5.24h-2.44V1.5h5.79zm-3.35 8.05h2.73c2.07 0 3.24-1.11 3.24-3.02s-1.17-3.01-3.23-3.01h-2.74v6.03zm8.63 3.48c0-1.96 1.5-3.16 4.17-3.32l3.07-.18v-.87c0-1.24-.84-1.98-2.24-1.98-1.32 0-2.16.66-2.36 1.68h-2.23c.11-2.12 1.91-3.68 4.67-3.68 2.74 0 4.5 1.48 4.5 3.78v7.89h-2.25v-1.88h-.05c-.66 1.27-2.1 2.07-3.6 2.07-2.24 0-3.68-1.38-3.68-3.51zm7.24-1.06v-.89l-2.76.17c-1.38.09-2.16.73-2.16 1.69 0 .98.81 1.62 2.05 1.62 1.61 0 2.87-1.11 2.87-2.59zm4.84 6.39v-1.93c.17.05.57.05.75.05 1.07 0 1.65-.45 2.01-1.62 0-.02.2-.7.2-.71l-4.06-11.26h2.56l2.8 9h.04l2.8-9h2.5l-4.22 11.85c-.96 2.72-2.08 3.6-4.42 3.6-.17 0-.79-.02-.96-.05v.07z" />
    </svg>
  )
}

function GooglePayIcon() {
  return (
    <svg className="h-5" viewBox="0 0 41 17" fill="none">
      <path
        d="M19.52 8.19v4.96h-1.57V1.64h4.17c1 0 1.86.33 2.55.99.7.66 1.05 1.47 1.05 2.42 0 .98-.35 1.79-1.05 2.44-.69.65-1.54.98-2.55.98h-2.6v-.28zm0-5.13v3.71h2.63c.59 0 1.08-.19 1.47-.58.4-.39.6-.86.6-1.41 0-.54-.2-1.01-.6-1.4-.39-.4-.88-.59-1.47-.59h-2.63v.27z"
        fill="#5F6368"
      />
      <path
        d="M30.87 5.4c1.15 0 2.06.31 2.73.92.67.62 1 1.46 1 2.54v5.29h-1.5v-1.19h-.07c-.65.98-1.5 1.47-2.58 1.47-.92 0-1.69-.27-2.3-.82-.62-.54-.93-1.22-.93-2.03 0-.86.32-1.55.97-2.05.64-.5 1.5-.75 2.58-.75.92 0 1.68.17 2.27.51v-.36c0-.53-.21-.98-.63-1.35-.42-.36-.92-.54-1.49-.54-.86 0-1.54.36-2.03 1.09l-1.38-.87c.73-1.08 1.82-1.62 3.26-1.62v-.24zm-2.02 6.22c0 .4.18.73.53.99.35.26.76.4 1.23.4.65 0 1.23-.24 1.74-.72.51-.48.77-1.03.77-1.65-.48-.39-1.15-.58-2.01-.58-.62 0-1.14.15-1.55.44-.42.3-.62.66-.62 1.07l-.09.05z"
        fill="#5F6368"
      />
      <path
        d="M42.3 5.68l-5.22 12h-1.62l1.94-4.21-3.44-7.79h1.7l2.49 6.04h.03l2.42-6.04h1.7z"
        fill="#5F6368"
      />
      <path
        d="M13.59 7.26c0-.43-.04-.84-.11-1.24H6.93v2.35h3.74c-.16.87-.65 1.61-1.39 2.1v1.75h2.25c1.32-1.21 2.08-3 2.08-4.96h-.02z"
        fill="#4285F4"
      />
      <path
        d="M6.93 13.9c1.88 0 3.46-.62 4.61-1.68l-2.25-1.75c-.62.42-1.42.67-2.36.67-1.82 0-3.36-1.23-3.91-2.88H.68v1.8c1.14 2.28 3.5 3.84 6.25 3.84z"
        fill="#34A853"
      />
      <path
        d="M3.02 8.26c-.14-.42-.22-.86-.22-1.32 0-.46.08-.9.22-1.32v-1.8H.68c-.44.88-.68 1.87-.68 2.92 0 1.05.24 2.04.68 2.92l2.34-1.8v.4z"
        fill="#FBBC05"
      />
      <path
        d="M6.93 2.74c1.02 0 1.94.35 2.67 1.05l2-2c-1.21-1.13-2.79-1.82-4.67-1.82C4.18 0 1.82 1.56.68 3.84l2.34 1.8c.55-1.65 2.09-2.88 3.91-2.88v-.02z"
        fill="#EA4335"
      />
    </svg>
  )
}

function LinkLogo() {
  return (
    <svg className="h-3" viewBox="0 0 28 11" fill="none">
      <path
        d="M2.05 10.45V.96h2.16v9.49H2.05zM6.27.96h2.16v9.49H6.27V.96zm4.36 0h2.14v1.33h.03c.49-.99 1.36-1.5 2.61-1.5 1.73 0 2.77 1.06 2.77 2.91v6.75h-2.14V4.29c0-1.06-.55-1.68-1.52-1.68-.99 0-1.75.77-1.75 1.87v6h-2.14V.96zm9.24 0h2.14v1.49h.03c.38-1.07 1.26-1.66 2.38-1.66.32 0 .58.03.78.1v1.97c-.26-.1-.6-.15-.97-.15-1.26 0-2.22.99-2.22 2.56v5.18h-2.14V.96z"
        fill="#00D66F"
      />
      <path
        d="M0 10.45V.96h2.16v9.49H0z"
        fill="#00D66F"
      />
    </svg>
  )
}

function LinkLogoWhite() {
  return (
    <svg className="h-4" viewBox="0 0 28 11" fill="none">
      <path
        d="M2.05 10.45V.96h2.16v9.49H2.05zM6.27.96h2.16v9.49H6.27V.96zm4.36 0h2.14v1.33h.03c.49-.99 1.36-1.5 2.61-1.5 1.73 0 2.77 1.06 2.77 2.91v6.75h-2.14V4.29c0-1.06-.55-1.68-1.52-1.68-.99 0-1.75.77-1.75 1.87v6h-2.14V.96zm9.24 0h2.14v1.49h.03c.38-1.07 1.26-1.66 2.38-1.66.32 0 .58.03.78.1v1.97c-.26-.1-.6-.15-.97-.15-1.26 0-2.22.99-2.22 2.56v5.18h-2.14V.96z"
        fill="#ffffff"
      />
      <path
        d="M0 10.45V.96h2.16v9.49H0z"
        fill="#ffffff"
      />
    </svg>
  )
}

// Link Signup Section matching screenshot exactly
interface LinkSignupSectionProps {
  businessName: string
  inputRadius: string
}

function LinkSignupSection({ businessName, inputRadius }: LinkSignupSectionProps) {
  return (
    <div className="mb-6 border border-[#e6e6e6] rounded-lg p-4 bg-[#f7f9fc]">
      <div className="flex items-start gap-3">
        <div className="size-5 rounded bg-[#0570de] flex items-center justify-center mt-0.5 shrink-0">
          <CheckIcon />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#1a1f36] text-[15px]">Save my information for faster checkout</p>
          <p className="text-sm text-[#5e6977] mt-1">
            Pay securely at {businessName} and everywhere{' '}
            <a href="#" className="text-[#0570de] hover:underline">Link</a> is accepted.
          </p>
        </div>
      </div>

      <div className="mt-4 ml-8">
        <label className="block text-sm text-[#5e6977] mb-1.5">Phone number</label>
        <div className={cn('flex border border-[#e6e6e6] overflow-hidden bg-white', inputRadius)}>
          <div className="flex items-center gap-1.5 px-3 border-r border-[#e6e6e6] bg-[#f7f7f7]">
            <USFlagIcon />
          </div>
          <input
            type="tel"
            placeholder="(201) 555-0123"
            className="flex-1 px-3 py-3 text-[15px] focus:outline-none placeholder:text-[#a3a8b0]"
          />
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="size-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2.5 6L5 8.5L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function USFlagIcon() {
  return (
    <svg className="w-5 h-3.5" viewBox="0 0 20 14" fill="none">
      <rect width="20" height="14" fill="#B22234" />
      <rect y="1.077" width="20" height="1.077" fill="white" />
      <rect y="3.231" width="20" height="1.077" fill="white" />
      <rect y="5.385" width="20" height="1.077" fill="white" />
      <rect y="7.538" width="20" height="1.077" fill="white" />
      <rect y="9.692" width="20" height="1.077" fill="white" />
      <rect y="11.846" width="20" height="1.077" fill="white" />
      <rect width="8" height="7.538" fill="#3C3B6E" />
    </svg>
  )
}

function StripeLogo() {
  return (
    <svg className="h-3" viewBox="0 0 42 17" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.42 8.79c0-2.84-1.37-5.08-4-5.08-2.64 0-4.24 2.24-4.24 5.06 0 3.34 1.89 5.02 4.6 5.02 1.32 0 2.32-.3 3.07-.72v-2.22c-.75.37-1.61.6-2.7.6-1.07 0-2.02-.37-2.14-1.67h5.39c0-.14.02-.72.02-.99zm-5.45-1.06c0-1.24.76-1.76 1.45-1.76.67 0 1.39.52 1.39 1.76h-2.84zm-5.22-4.02c-1.08 0-1.77.5-2.16 1.13l-.14-.9h-2.42v12.96l2.76-.59.01-3.14c.4.29.98.7 1.94.7 1.96 0 3.75-1.58 3.75-5.05-.01-3.18-1.83-5.11-3.74-5.11zm-.66 7.86c-.65 0-1.03-.23-1.3-.52l-.01-4.1c.29-.32.68-.54 1.31-.54.99 0 1.68 1.12 1.68 2.58 0 1.48-.68 2.58-1.68 2.58zm-8.68-8.5l2.77-.59V.23l-2.77.59v2.25zm0 .83h2.77v9.65h-2.77V3.9zm-2.96 1.43l-.18-.59h-2.37v9.65h2.76V6.53c.65-.85 1.75-.7 2.1-.58V3.31c-.36-.13-1.68-.37-2.31.86v1.16zm-5.43-2.88c.96 0 1.56.23 1.91.4l.52-2.27c-.44-.17-1.24-.4-2.43-.4-2.58 0-4.36 1.77-4.36 4.74v.64H6.96v2.35h1.7v7.3h2.76v-7.3h2.08V5.56h-2.08v-.55c0-.88.38-1.56 1.52-1.56h-.01zM6.21 4.7l-2.38.51-.01 5.99c0 1.1.83 1.92 1.93 1.92.61 0 1.06-.11 1.31-.25V10.6c-.24.1-.72.2-1.2.2-.47 0-.89-.16-.89-.96l.01-5.14h.23zm-3.1-.8H.36l.02.72-.01 3.85v.7c0 2.15 1.09 3.05 2.67 3.05.97 0 1.7-.22 2.09-.47V9.51c-.37.2-.92.4-1.55.4-.66 0-1.13-.31-1.13-1.22V6.45l.01-.2V5.14l-.01-.25 1.68-.36V2.25L.37 2.84v1.07l2.74-.01z"
      />
    </svg>
  )
}

function ClimateBadge() {
  return (
    <svg className="size-4 text-[#166534]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.458L7.53 9.89a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

interface PaymentIconProps {
  type: string
  size?: 'sm' | 'md'
}

function PaymentIcon({ type, size = 'md' }: PaymentIconProps) {
  const sizeClass = size === 'sm' ? 'h-4' : 'h-6'

  switch (type) {
    case 'visa':
      return (
        <div
          className={cn(
            sizeClass,
            'aspect-[1.6] rounded border border-[#e6e6e6] bg-white flex items-center justify-center'
          )}
        >
          <span className="text-[10px] font-bold text-[#1a1f71]">VISA</span>
        </div>
      )
    case 'mastercard':
      return (
        <div
          className={cn(
            sizeClass,
            'aspect-[1.6] rounded border border-[#e6e6e6] bg-white flex items-center justify-center'
          )}
        >
          <div className="flex">
            <div className="size-2.5 rounded-full bg-[#eb001b] -mr-1" />
            <div className="size-2.5 rounded-full bg-[#f79e1b]" />
          </div>
        </div>
      )
    case 'amex':
      return (
        <div
          className={cn(
            sizeClass,
            'aspect-[1.6] rounded border border-[#e6e6e6] bg-[#006fcf] flex items-center justify-center'
          )}
        >
          <span className="text-[8px] font-bold text-white">AMEX</span>
        </div>
      )
    case 'diners':
      return (
        <div
          className={cn(
            sizeClass,
            'aspect-[1.6] rounded border border-[#e6e6e6] bg-white flex items-center justify-center'
          )}
        >
          <div className="flex items-center gap-px">
            <div className="size-2 rounded-full bg-[#0079be]" />
            <div className="size-2 rounded-full bg-[#0079be]" />
          </div>
        </div>
      )
    case 'gpay':
      return (
        <div
          className={cn(
            sizeClass,
            'aspect-[1.6] rounded border border-[#e6e6e6] bg-white flex items-center justify-center'
          )}
        >
          <span className="text-[8px] font-bold text-[#5f6368]">GPay</span>
        </div>
      )
    case 'bank':
      return (
        <div
          className={cn(
            sizeClass,
            'aspect-[1.6] rounded border border-[#e6e6e6] bg-white flex items-center justify-center'
          )}
        >
          <svg className="size-3 text-[#5e6977]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 10v7h3v-7H4zm6 0v7h4v-7h-4zm8 0v7h3v-7h-3zm-8-7L2 8h20L12 3z" />
            <path d="M2 19h20v2H2v-2z" />
          </svg>
        </div>
      )
    default:
      return null
  }
}

// ============================================================================
// Main Component
// ============================================================================

interface CheckoutPageProps {
  config: CheckoutConfig
}

export function CheckoutPage({ config }: CheckoutPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(config.payment.defaultMethod)
  const [isAnnualSelected, setIsAnnualSelected] = useState(false)

  const isOrderLeft = config.layout.orderSummaryPosition === 'left'

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: config.theme.backgroundColor }}>
      <Header config={config} />

      <div className="max-w-5xl mx-auto">
        <div
          className={cn(
            'flex min-h-[calc(100vh-80px)]',
            config.layout.compactMode ? 'flex-col max-w-lg mx-auto' : 'flex-row'
          )}
        >
          {isOrderLeft ? (
            <>
              <OrderOverviewPanel
                config={config}
                isAnnualSelected={isAnnualSelected}
                onToggleAnnual={() => setIsAnnualSelected(!isAnnualSelected)}
              />
              <PaymentPanel
                config={config}
                selectedMethod={selectedMethod}
                onMethodChange={setSelectedMethod}
              />
            </>
          ) : (
            <>
              <PaymentPanel
                config={config}
                selectedMethod={selectedMethod}
                onMethodChange={setSelectedMethod}
              />
              <OrderOverviewPanel
                config={config}
                isAnnualSelected={isAnnualSelected}
                onToggleAnnual={() => setIsAnnualSelected(!isAnnualSelected)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
