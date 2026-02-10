import type { StackItem } from '@/components/ui/features/stacking-nav-motion'
import type { NavVariant } from './types'

// =============================================================================
// DEMO DATA - THREE NAVIGATION VARIANTS
// =============================================================================

/**
 * Demo navigation data for playground testing.
 */

const ORDERS_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'active',
    label: 'Active',
    children: [
      { id: 'healthy', label: 'Healthy' },
      {
        id: 'at-risk',
        label: 'At risk',
        children: [
          { id: 'risk-low', label: 'Low' },
          { id: 'risk-medium', label: 'Medium' },
          { id: 'risk-high', label: 'High' },
        ],
      },
    ],
  },
  {
    id: 'closed',
    label: 'Closed',
    children: [
      { id: 'completed', label: 'Completed' },
      {
        id: 'clawbacks',
        label: 'Clawbacks',
        children: [
          { id: 'clawback-default', label: 'Default' },
          { id: 'clawback-chargeback', label: 'Chargeback' },
          { id: 'clawback-canceled', label: 'Canceled' },
        ],
      },
      { id: 'declined', label: 'Declined' },
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

export const NAV_VARIANTS: Record<
  NavVariant,
  { items: StackItem[]; description: string }
> = {
  orders: {
    items: ORDERS_ITEMS,
    description: 'Order filtering: Type → Status → Sub-status',
  },
  products: {
    items: PRODUCTS_ITEMS,
    description: 'Product catalog: Category → Type → Style',
  },
  content: {
    items: CONTENT_ITEMS,
    description: 'Content management: Section → Format → Status',
  },
}
