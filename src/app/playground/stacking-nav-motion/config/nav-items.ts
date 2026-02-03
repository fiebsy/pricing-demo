import type { StackItem } from '@/components/ui/features/experimental/stacking-nav-motion'
import type { NavVariant } from './types'

// =============================================================================
// DEMO DATA - THREE NAVIGATION VARIANTS
// =============================================================================

/**
 * Same demo data as the current stacking-nav playground.
 * Shared so comparisons use identical data.
 */

const ORDERS_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'invoices',
    label: 'Invoices',
    children: [
      {
        id: 'inv-pending',
        label: 'Pending',
        children: [
          { id: 'inv-draft', label: 'Draft' },
          { id: 'inv-review', label: 'Review' },
          { id: 'inv-awaiting', label: 'Awaiting' },
        ],
      },
      {
        id: 'inv-active',
        label: 'Active',
        children: [
          { id: 'inv-sent', label: 'Sent' },
          { id: 'inv-viewed', label: 'Viewed' },
          { id: 'inv-partial', label: 'Partial' },
        ],
      },
      { id: 'inv-paid', label: 'Paid' },
      { id: 'inv-overdue', label: 'Overdue' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    children: [
      {
        id: 'pay-process',
        label: 'Process',
        children: [
          { id: 'pay-init', label: 'Started' },
          { id: 'pay-verify', label: 'Verify' },
          { id: 'pay-confirm', label: 'Confirm' },
        ],
      },
      {
        id: 'pay-complete',
        label: 'Complete',
        children: [
          { id: 'pay-cleared', label: 'Cleared' },
          { id: 'pay-settled', label: 'Settled' },
        ],
      },
      { id: 'pay-failed', label: 'Failed' },
    ],
  },
  {
    id: 'refunds',
    label: 'Refunds',
    children: [
      { id: 'ref-request', label: 'Request' },
      { id: 'ref-approved', label: 'Approved' },
      { id: 'ref-issued', label: 'Issued' },
    ],
  },
]

const PRODUCTS_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'apparel',
    label: 'Apparel',
    children: [
      {
        id: 'tops',
        label: 'Tops',
        children: [
          { id: 't-shirts', label: 'T-Shirts' },
          { id: 'blouses', label: 'Blouses' },
          { id: 'sweaters', label: 'Sweaters' },
        ],
      },
      {
        id: 'bottoms',
        label: 'Bottoms',
        children: [
          { id: 'jeans', label: 'Jeans' },
          { id: 'trousers', label: 'Trousers' },
          { id: 'shorts', label: 'Shorts' },
        ],
      },
      { id: 'dresses', label: 'Dresses' },
      { id: 'jackets', label: 'Jackets' },
    ],
  },
  {
    id: 'footwear',
    label: 'Footwear',
    children: [
      {
        id: 'sneakers',
        label: 'Sneakers',
        children: [
          { id: 'running', label: 'Running' },
          { id: 'casual', label: 'Casual' },
          { id: 'training', label: 'Training' },
        ],
      },
      {
        id: 'boots',
        label: 'Boots',
        children: [
          { id: 'ankle', label: 'Ankle' },
          { id: 'chelsea', label: 'Chelsea' },
          { id: 'combat', label: 'Combat' },
        ],
      },
      { id: 'sandals', label: 'Sandals' },
    ],
  },
  {
    id: 'accessor',
    label: 'Accessor',
    children: [
      { id: 'bags', label: 'Bags' },
      { id: 'watches', label: 'Watches' },
      { id: 'jewelry', label: 'Jewelry' },
    ],
  },
]

const CONTENT_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'articles',
    label: 'Articles',
    children: [
      {
        id: 'guides',
        label: 'Guides',
        children: [
          { id: 'getting', label: 'Getting' },
          { id: 'advanced', label: 'Advanced' },
          { id: 'reference', label: 'Ref' },
        ],
      },
      {
        id: 'tutorials',
        label: 'Tutorial',
        children: [
          { id: 'beginner', label: 'Beginner' },
          { id: 'intermed', label: 'Intermed' },
          { id: 'expert', label: 'Expert' },
        ],
      },
      { id: 'updates', label: 'Updates' },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    children: [
      {
        id: 'images',
        label: 'Images',
        children: [
          { id: 'photos', label: 'Photos' },
          { id: 'graphics', label: 'Graphics' },
          { id: 'icons', label: 'Icons' },
        ],
      },
      {
        id: 'videos',
        label: 'Videos',
        children: [
          { id: 'demos', label: 'Demos' },
          { id: 'webinars', label: 'Webinars' },
          { id: 'shorts', label: 'Shorts' },
        ],
      },
      { id: 'audio', label: 'Audio' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    children: [
      { id: 'landing', label: 'Landing' },
      { id: 'product', label: 'Product' },
      { id: 'support', label: 'Support' },
    ],
  },
]

export const NAV_VARIANTS: Record<NavVariant, { items: StackItem[]; description: string }> = {
  orders: {
    items: ORDERS_ITEMS,
    description: 'Order filtering: Type \u2192 Status \u2192 Sub-status',
  },
  products: {
    items: PRODUCTS_ITEMS,
    description: 'Product catalog: Category \u2192 Type \u2192 Style',
  },
  content: {
    items: CONTENT_ITEMS,
    description: 'Content management: Section \u2192 Format \u2192 Status',
  },
}
