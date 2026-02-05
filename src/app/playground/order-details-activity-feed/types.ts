// ============================================================================
// TYPES & CONFIGURATIONS
// ============================================================================

export type StatusVariant = 'success' | 'warning' | 'error' | 'brand' | 'gray'
export type ViewMode = 'order-summary-flow' | 'order-summary-flow-large'

export interface PaymentRecord {
  id: string
  processedDate: string
  clearedDate: string | null
  status: 'Pending' | 'Cleared' | 'Failed' | 'Processing'
  amount: number
  paymentNumber: number
}

export interface ContractData {
  id: number
  centrexId: string
  status: string
  productName: string
  amountTotal: number
  amountPerPeriod: number
  amountToRepay: number
  paymentsTotal: number
  frequency: string
  contractDate: string
  planType: 'FUNDING' | 'SERVICING'
  customerTier: string
  creditInsights: string | null
  checkoutPlatformOrderId: string | null
  productCreatedByDisplayName: string
  checkout: { platformId: string }
  customer: {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    centrexId: string
    address: {
      addressLine1: string
      city: string
      state: string
      zip: string
    }
    billingAddress: null
  }
  partner: { id: string; name: string }
  contractSummary: {
    payoutToDate: number
    payoutRemaining: number
    totalPlanPayout: number
  }
}

// ============================================================================
// CONFIGURATIONS
// ============================================================================

export const STATUS_CONFIG: Record<string, { label: string; variant: StatusVariant }> = {
  'ACTIVE': { label: 'Healthy', variant: 'success' },
  'ACTIVE_MODIFIED_PAYMENT': { label: 'Healthy - Modified Payment', variant: 'brand' },
  'PENDING': { label: 'Pending', variant: 'warning' },
  'COMPLETED': { label: 'Completed', variant: 'success' },
  'CANCELLED': { label: 'Cancelled', variant: 'gray' },
  'DEFAULTED': { label: 'Defaulted', variant: 'error' },
}

export const PAYMENT_STATUS_CONFIG: Record<string, { variant: StatusVariant; color: string }> = {
  'Pending': { variant: 'warning', color: 'var(--color-fg-warning-primary)' },
  'Cleared': { variant: 'success', color: 'var(--color-fg-success-primary)' },
  'Failed': { variant: 'error', color: 'var(--color-fg-error-primary)' },
  'Processing': { variant: 'brand', color: 'var(--color-fg-brand-primary)' },
}

// ============================================================================
// MOCK DATA - Based on actual production data structure
// ============================================================================

export const MOCK_CONTRACT: ContractData = {
  id: 7805386,
  centrexId: '7805386',
  status: 'ACTIVE_MODIFIED_PAYMENT',
  productName: 'TJRs Daytrading Blueprint',
  amountTotal: 4000.0,
  amountPerPeriod: 441.78,
  amountToRepay: 5301.40,
  paymentsTotal: 12,
  frequency: 'MONTHLY',
  contractDate: '2025-06-17',
  planType: 'FUNDING',
  customerTier: 'B',
  creditInsights: null,
  checkoutPlatformOrderId: null,
  productCreatedByDisplayName: 'Payva',
  checkout: { platformId: 'payva-platform-id' },
  customer: {
    id: '123456',
    firstName: 'Diego',
    lastName: 'Herrera',
    email: 'diegotitino7@gmail.com',
    phoneNumber: '+18634091947',
    centrexId: '1108922767',
    address: {
      addressLine1: '8653 Jamestown Dr',
      city: 'Winter Haven',
      state: 'FL',
      zip: '33884',
    },
    billingAddress: null,
  },
  partner: { id: '82315', name: 'TJR Trading LLC' },
  contractSummary: {
    payoutToDate: 0,
    payoutRemaining: 0,
    totalPlanPayout: 0,
  },
}

// Customer Payments mock data (sorted by most recent first)
export const MOCK_CUSTOMER_PAYMENTS: PaymentRecord[] = [
  { id: '1', processedDate: '2025-12-28', clearedDate: null, status: 'Pending', amount: 331.00, paymentNumber: 1 },
  { id: '2', processedDate: '2025-12-03', clearedDate: '2025-12-03', status: 'Cleared', amount: 331.33, paymentNumber: 4 },
  { id: '3', processedDate: '2025-11-28', clearedDate: null, status: 'Failed', amount: 331.33, paymentNumber: 3 },
  { id: '4', processedDate: '2025-10-17', clearedDate: null, status: 'Failed', amount: 441.78, paymentNumber: 2 },
  { id: '5', processedDate: '2025-09-17', clearedDate: '2025-09-17', status: 'Cleared', amount: 441.78, paymentNumber: 5 },
  { id: '6', processedDate: '2025-08-17', clearedDate: '2025-08-17', status: 'Cleared', amount: 441.78, paymentNumber: 6 },
  { id: '7', processedDate: '2025-07-17', clearedDate: '2025-07-17', status: 'Cleared', amount: 441.78, paymentNumber: 7 },
  { id: '8', processedDate: '2025-06-17', clearedDate: '2025-06-17', status: 'Cleared', amount: 441.78, paymentNumber: 8 },
]

// Partner Payouts mock data
export const MOCK_PARTNER_PAYOUTS: PaymentRecord[] = [
  { id: '1', processedDate: '2025-06-23', clearedDate: '2025-06-23', status: 'Cleared', amount: 3800.00, paymentNumber: 1 },
]
