# Checkout Link Playground

Stripe-style checkout page recreation for payment link flows.

## Overview

This playground recreates a Stripe checkout page interface, featuring:
- Business header with logo and back navigation
- Order summary panel with product details and pricing
- Payment method accordion (Card, Google Pay, US Bank Account)
- Configurable theme, layout, and branding options

## Directory Structure

```
checkout-link/
├── page.tsx                    # Page component with PlaygroundLayout
├── core/
│   └── checkout-page.tsx       # Main checkout page component
├── config/
│   ├── types.ts                # TypeScript interfaces
│   ├── presets.ts              # Configuration presets
│   ├── options.ts              # Control panel options
│   └── index.ts                # Re-exports
├── panels/
│   └── panel-config.ts         # UnifiedControlPanel configuration
└── README.md                   # This file
```

## Configuration Options

### Business
- `name`: Company name displayed in header
- `showLogo`: Toggle logo visibility
- `showBackButton`: Toggle back navigation

### Product
- `name`: Product name
- `price`: Price amount
- `billingInterval`: Monthly or yearly
- `quantity`: Number of units
- `showQuantitySelector`: Show quantity dropdown
- `showTierBreakdown`: Show per-seat pricing breakdown

### Payment
- `enableCard`: Enable credit/debit card
- `enableGooglePay`: Enable Google Pay
- `enableBankAccount`: Enable US bank account (ACH)
- `defaultMethod`: Which method is expanded by default
- `showCardBrands`: Show card brand icons in form
- `showTerms`: Show terms text
- `showStripeBranding`: Show "Powered by Stripe" footer

### Theme
- `primaryColor`: Brand color for buttons/accents
- `backgroundColor`: Page background color
- `cardBackgroundColor`: Panel background color
- `borderRadius`: Corner radius preset
- `shadowIntensity`: Card shadow intensity

### Layout
- `compactMode`: Single column layout
- `orderSummaryPosition`: Left or right panel
- `panelGap`: Gap between panels

## Presets

1. **Default** - Standard monthly subscription checkout
2. **Annual** - Annual billing with yearly pricing
3. **Enterprise** - Multi-seat plan with quantity selector
4. **Minimal** - Card only, no alternative payment methods
5. **Google Pay First** - Google Pay expanded by default

## Migration Path

When ready for production:

1. Extract `core/checkout-page.tsx` to `src/components/ui/patterns/checkout/`
2. Update imports for icon and utility functions
3. Add business logic for actual payment processing
4. Connect to Stripe Elements or payment SDK
5. Add form validation and submission handling

## Usage

```tsx
import { CheckoutPage } from './core/checkout-page'
import { DEFAULT_CHECKOUT_CONFIG } from './config/presets'

<CheckoutPage config={DEFAULT_CHECKOUT_CONFIG} />
```

## Customization

The checkout page is fully configurable through the `CheckoutConfig` interface.
All visual and functional aspects can be controlled via the control panel.
