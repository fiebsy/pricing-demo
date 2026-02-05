import type { BadgeColor } from '@/components/ui/core/primitives/badge'

/**
 * Mock content card data for stacking-nav filter visualization.
 * Each card maps to the nav hierarchy: category → status → subStatus
 */

export interface ContentCard {
  id: string
  title: string // e.g., "INV-2024-0142"
  subtitle: string // e.g., "Acme Corporation"
  amount: string // e.g., "$1,250.00"
  category: string // 'invoices' | 'payments' | 'refunds'
  status: string // e.g., 'inv-pending'
  subStatus?: string // e.g., 'inv-draft'
  badgeLabel: string // e.g., "Draft"
  badgeColor: BadgeColor
}

// =============================================================================
// INVOICES (~20 cards)
// =============================================================================

const INVOICE_CARDS: ContentCard[] = [
  // Pending > Draft (3)
  {
    id: 'inv-001',
    title: 'INV-2024-0142',
    subtitle: 'Acme Corporation',
    amount: '$1,250.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-draft',
    badgeLabel: 'Draft',
    badgeColor: 'gray',
  },
  {
    id: 'inv-002',
    title: 'INV-2024-0156',
    subtitle: 'TechStart Inc',
    amount: '$3,400.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-draft',
    badgeLabel: 'Draft',
    badgeColor: 'gray',
  },
  {
    id: 'inv-003',
    title: 'INV-2024-0163',
    subtitle: 'Global Ventures',
    amount: '$890.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-draft',
    badgeLabel: 'Draft',
    badgeColor: 'gray',
  },

  // Pending > Review (2)
  {
    id: 'inv-004',
    title: 'INV-2024-0138',
    subtitle: 'Metro Solutions',
    amount: '$2,100.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-review',
    badgeLabel: 'Review',
    badgeColor: 'warning',
  },
  {
    id: 'inv-005',
    title: 'INV-2024-0144',
    subtitle: 'Bright Ideas LLC',
    amount: '$4,750.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-review',
    badgeLabel: 'Review',
    badgeColor: 'warning',
  },

  // Pending > Awaiting (2)
  {
    id: 'inv-006',
    title: 'INV-2024-0129',
    subtitle: 'Summit Partners',
    amount: '$6,200.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-awaiting',
    badgeLabel: 'Awaiting',
    badgeColor: 'info',
  },
  {
    id: 'inv-007',
    title: 'INV-2024-0131',
    subtitle: 'Pinnacle Group',
    amount: '$1,850.00',
    category: 'invoices',
    status: 'inv-pending',
    subStatus: 'inv-awaiting',
    badgeLabel: 'Awaiting',
    badgeColor: 'info',
  },

  // Active > Sent (2)
  {
    id: 'inv-008',
    title: 'INV-2024-0112',
    subtitle: 'Horizon Digital',
    amount: '$3,200.00',
    category: 'invoices',
    status: 'inv-active',
    subStatus: 'inv-sent',
    badgeLabel: 'Sent',
    badgeColor: 'brand',
  },
  {
    id: 'inv-009',
    title: 'INV-2024-0118',
    subtitle: 'Nexus Labs',
    amount: '$5,100.00',
    category: 'invoices',
    status: 'inv-active',
    subStatus: 'inv-sent',
    badgeLabel: 'Sent',
    badgeColor: 'brand',
  },

  // Active > Viewed (2)
  {
    id: 'inv-010',
    title: 'INV-2024-0098',
    subtitle: 'Delta Systems',
    amount: '$2,450.00',
    category: 'invoices',
    status: 'inv-active',
    subStatus: 'inv-viewed',
    badgeLabel: 'Viewed',
    badgeColor: 'brand',
  },
  {
    id: 'inv-011',
    title: 'INV-2024-0105',
    subtitle: 'Quantum Corp',
    amount: '$7,800.00',
    category: 'invoices',
    status: 'inv-active',
    subStatus: 'inv-viewed',
    badgeLabel: 'Viewed',
    badgeColor: 'brand',
  },

  // Active > Partial (2)
  {
    id: 'inv-012',
    title: 'INV-2024-0089',
    subtitle: 'Vector Industries',
    amount: '$4,200.00',
    category: 'invoices',
    status: 'inv-active',
    subStatus: 'inv-partial',
    badgeLabel: 'Partial',
    badgeColor: 'warning',
  },
  {
    id: 'inv-013',
    title: 'INV-2024-0092',
    subtitle: 'Atlas Consulting',
    amount: '$9,500.00',
    category: 'invoices',
    status: 'inv-active',
    subStatus: 'inv-partial',
    badgeLabel: 'Partial',
    badgeColor: 'warning',
  },

  // Paid (leaf - no subStatus) (3)
  {
    id: 'inv-014',
    title: 'INV-2024-0056',
    subtitle: 'Apex Dynamics',
    amount: '$3,800.00',
    category: 'invoices',
    status: 'inv-paid',
    badgeLabel: 'Paid',
    badgeColor: 'success',
  },
  {
    id: 'inv-015',
    title: 'INV-2024-0062',
    subtitle: 'Prime Holdings',
    amount: '$6,400.00',
    category: 'invoices',
    status: 'inv-paid',
    badgeLabel: 'Paid',
    badgeColor: 'success',
  },
  {
    id: 'inv-016',
    title: 'INV-2024-0071',
    subtitle: 'Stellar Networks',
    amount: '$2,900.00',
    category: 'invoices',
    status: 'inv-paid',
    badgeLabel: 'Paid',
    badgeColor: 'success',
  },

  // Overdue (leaf - no subStatus) (3)
  {
    id: 'inv-017',
    title: 'INV-2024-0034',
    subtitle: 'Cobalt Tech',
    amount: '$5,600.00',
    category: 'invoices',
    status: 'inv-overdue',
    badgeLabel: 'Overdue',
    badgeColor: 'error',
  },
  {
    id: 'inv-018',
    title: 'INV-2024-0041',
    subtitle: 'Fusion Media',
    amount: '$1,100.00',
    category: 'invoices',
    status: 'inv-overdue',
    badgeLabel: 'Overdue',
    badgeColor: 'error',
  },
  {
    id: 'inv-019',
    title: 'INV-2024-0048',
    subtitle: 'Omega Solutions',
    amount: '$8,200.00',
    category: 'invoices',
    status: 'inv-overdue',
    badgeLabel: 'Overdue',
    badgeColor: 'error',
  },
]

// =============================================================================
// PAYMENTS (~12 cards)
// =============================================================================

const PAYMENT_CARDS: ContentCard[] = [
  // Process > Started (2)
  {
    id: 'pay-001',
    title: 'PAY-2024-0089',
    subtitle: 'Wire Transfer',
    amount: '$12,500.00',
    category: 'payments',
    status: 'pay-process',
    subStatus: 'pay-init',
    badgeLabel: 'Started',
    badgeColor: 'info',
  },
  {
    id: 'pay-002',
    title: 'PAY-2024-0091',
    subtitle: 'ACH Payment',
    amount: '$3,200.00',
    category: 'payments',
    status: 'pay-process',
    subStatus: 'pay-init',
    badgeLabel: 'Started',
    badgeColor: 'info',
  },

  // Process > Verify (2)
  {
    id: 'pay-003',
    title: 'PAY-2024-0084',
    subtitle: 'Card Payment',
    amount: '$1,850.00',
    category: 'payments',
    status: 'pay-process',
    subStatus: 'pay-verify',
    badgeLabel: 'Verify',
    badgeColor: 'warning',
  },
  {
    id: 'pay-004',
    title: 'PAY-2024-0086',
    subtitle: 'Wire Transfer',
    amount: '$24,000.00',
    category: 'payments',
    status: 'pay-process',
    subStatus: 'pay-verify',
    badgeLabel: 'Verify',
    badgeColor: 'warning',
  },

  // Process > Confirm (1)
  {
    id: 'pay-005',
    title: 'PAY-2024-0082',
    subtitle: 'ACH Payment',
    amount: '$7,400.00',
    category: 'payments',
    status: 'pay-process',
    subStatus: 'pay-confirm',
    badgeLabel: 'Confirm',
    badgeColor: 'brand',
  },

  // Complete > Cleared (2)
  {
    id: 'pay-006',
    title: 'PAY-2024-0075',
    subtitle: 'Card Payment',
    amount: '$2,100.00',
    category: 'payments',
    status: 'pay-complete',
    subStatus: 'pay-cleared',
    badgeLabel: 'Cleared',
    badgeColor: 'success',
  },
  {
    id: 'pay-007',
    title: 'PAY-2024-0078',
    subtitle: 'Wire Transfer',
    amount: '$18,600.00',
    category: 'payments',
    status: 'pay-complete',
    subStatus: 'pay-cleared',
    badgeLabel: 'Cleared',
    badgeColor: 'success',
  },

  // Complete > Settled (2)
  {
    id: 'pay-008',
    title: 'PAY-2024-0068',
    subtitle: 'ACH Payment',
    amount: '$4,500.00',
    category: 'payments',
    status: 'pay-complete',
    subStatus: 'pay-settled',
    badgeLabel: 'Settled',
    badgeColor: 'success',
  },
  {
    id: 'pay-009',
    title: 'PAY-2024-0071',
    subtitle: 'Card Payment',
    amount: '$950.00',
    category: 'payments',
    status: 'pay-complete',
    subStatus: 'pay-settled',
    badgeLabel: 'Settled',
    badgeColor: 'success',
  },

  // Failed (leaf - no subStatus) (3)
  {
    id: 'pay-010',
    title: 'PAY-2024-0059',
    subtitle: 'Card Payment',
    amount: '$3,200.00',
    category: 'payments',
    status: 'pay-failed',
    badgeLabel: 'Failed',
    badgeColor: 'error',
  },
  {
    id: 'pay-011',
    title: 'PAY-2024-0063',
    subtitle: 'ACH Payment',
    amount: '$8,100.00',
    category: 'payments',
    status: 'pay-failed',
    badgeLabel: 'Failed',
    badgeColor: 'error',
  },
  {
    id: 'pay-012',
    title: 'PAY-2024-0067',
    subtitle: 'Wire Transfer',
    amount: '$15,000.00',
    category: 'payments',
    status: 'pay-failed',
    badgeLabel: 'Failed',
    badgeColor: 'error',
  },
]

// =============================================================================
// REFUNDS (~8 cards)
// =============================================================================

const REFUND_CARDS: ContentCard[] = [
  // Request (leaf - no subStatus) (3)
  {
    id: 'ref-001',
    title: 'REF-2024-0024',
    subtitle: 'Partial Refund',
    amount: '$450.00',
    category: 'refunds',
    status: 'ref-request',
    badgeLabel: 'Requested',
    badgeColor: 'warning',
  },
  {
    id: 'ref-002',
    title: 'REF-2024-0026',
    subtitle: 'Full Refund',
    amount: '$1,200.00',
    category: 'refunds',
    status: 'ref-request',
    badgeLabel: 'Requested',
    badgeColor: 'warning',
  },
  {
    id: 'ref-003',
    title: 'REF-2024-0028',
    subtitle: 'Partial Refund',
    amount: '$320.00',
    category: 'refunds',
    status: 'ref-request',
    badgeLabel: 'Requested',
    badgeColor: 'warning',
  },

  // Approved (leaf - no subStatus) (2)
  {
    id: 'ref-004',
    title: 'REF-2024-0019',
    subtitle: 'Full Refund',
    amount: '$2,800.00',
    category: 'refunds',
    status: 'ref-approved',
    badgeLabel: 'Approved',
    badgeColor: 'brand',
  },
  {
    id: 'ref-005',
    title: 'REF-2024-0021',
    subtitle: 'Partial Refund',
    amount: '$680.00',
    category: 'refunds',
    status: 'ref-approved',
    badgeLabel: 'Approved',
    badgeColor: 'brand',
  },

  // Issued (leaf - no subStatus) (3)
  {
    id: 'ref-006',
    title: 'REF-2024-0012',
    subtitle: 'Full Refund',
    amount: '$1,500.00',
    category: 'refunds',
    status: 'ref-issued',
    badgeLabel: 'Issued',
    badgeColor: 'success',
  },
  {
    id: 'ref-007',
    title: 'REF-2024-0015',
    subtitle: 'Partial Refund',
    amount: '$890.00',
    category: 'refunds',
    status: 'ref-issued',
    badgeLabel: 'Issued',
    badgeColor: 'success',
  },
  {
    id: 'ref-008',
    title: 'REF-2024-0017',
    subtitle: 'Full Refund',
    amount: '$3,400.00',
    category: 'refunds',
    status: 'ref-issued',
    badgeLabel: 'Issued',
    badgeColor: 'success',
  },
]

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const MOCK_CARDS: ContentCard[] = [
  ...INVOICE_CARDS,
  ...PAYMENT_CARDS,
  ...REFUND_CARDS,
]

// Total: 19 invoices + 12 payments + 8 refunds = 39 cards
