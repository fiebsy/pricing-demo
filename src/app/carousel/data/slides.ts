/**
 * Carousel slide data
 *
 * Add, remove, or modify slides here without touching other files.
 */

export interface GridSection {
  heading: string
  items: Array<{
    text: string
    highlight?: string
  }>
}

export interface DualImageConfig {
  legacy: {
    src: string
    alt: string
    label?: string
  }
  new: {
    src: string
    alt: string
    label?: string
    href?: string
  }
}

export interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  /** Slide type determines which variant component renders */
  type: 'text' | 'image' | 'text-grid' | 'dual-image' | 'button'
  /** Image source for 'image' type slides */
  imageSrc?: string
  /** Link URL for 'button' type slides */
  buttonHref?: string
  /** Button text for 'button' type slides */
  buttonText?: string
  /** Configuration for dual-image slides */
  dualImage?: DualImageConfig
  /** Sections for text-grid slides */
  gridSections?: GridSection[]
}

export const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    title: 'Payva',
    subtitle: 'BNPL for Digital Info Products',
    description: 'Klarna for Creators',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Payva',
        items: [
          { text: 'BNPL for Digital Info Products' },
          { text: '"Klarna for Creators"' },
        ],
      },
    ],
  },
  {
    id: 'slide-1b',
    title: 'Product → Payout',
    subtitle: 'How It Works',
    description: 'The complete payment flow from product setup to creator payout.',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Product',
        items: [
          { text: 'Set product terms' },
          { text: 'Send checkout link' },
          { text: 'Credit risk check' },
        ],
      },
      {
        heading: 'Payout',
        items: [
          { text: 'Customer pays' },
          { text: 'Creator gets paid' },
        ],
      },
    ],
  },
  {
    id: 'slide-1c',
    title: 'AutoRoute',
    subtitle: 'Simplified Routing',
    description: 'From three legacy options to one simple toggle.',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Legacy',
        items: [
          { text: 'Funding only' },
          { text: 'Servicing only' },
          { text: 'Funding and Servicing' },
        ],
      },
      {
        heading: 'New',
        items: [
          { text: 'Auto Route on' },
          { text: 'Auto Route off' },
        ],
      },
    ],
  },
  {
    id: 'slide-4',
    title: 'Legacy Products',
    subtitle: 'Products Page',
    description: 'The original products interface.',
    type: 'image',
    imageSrc: '/carousel/legacy-products.png',
  },
  {
    id: 'slide-5',
    title: 'Legacy Links',
    subtitle: 'Links Page',
    description: 'The original links page interface.',
    type: 'image',
    imageSrc: '/carousel/legacy-links-page.png',
  },
  {
    id: 'slide-5c',
    title: 'Legacy Checkout',
    subtitle: 'Checkout Link',
    description: 'The original checkout link interface.',
    type: 'image',
    imageSrc: '/carousel/legacy-checkout-link.png',
  },
  {
    id: 'slide-6',
    title: 'Checkout Redesign',
    subtitle: 'Checkout Link',
    description: 'Side-by-side comparison of the checkout experience.',
    type: 'dual-image',
    dualImage: {
      legacy: {
        src: '/carousel/legacy-checkout-link.png',
        alt: 'Legacy checkout',
        label: 'Legacy',
      },
      new: {
        src: '/carousel/checkout-link.png',
        alt: 'New checkout',
        label: 'New',
        href: 'https://app.payva.com/checkout/overview/1EUaimDbz',
      },
    },
  },
  {
    id: 'slide-5b',
    title: 'Products Redesign',
    subtitle: 'Products Page',
    description: 'Side-by-side comparison of the products interface.',
    type: 'dual-image',
    dualImage: {
      legacy: {
        src: '/carousel/legacy-products.png',
        alt: 'Legacy products page',
        label: 'Legacy',
      },
      new: {
        src: '/carousel/products-page.png',
        alt: 'New products page',
        label: 'New',
        href: 'http://localhost:3001/v2/products',
      },
    },
  },
  {
    id: 'slide-7',
    title: 'Secure by Design',
    subtitle: 'Enterprise-Grade Protection',
    description:
      'Bank-level security with end-to-end encryption and compliance built in.',
    type: 'button',
    buttonHref: 'http://localhost:3001/v2/products',
    buttonText: 'Open link',
  },
]

export const STORAGE_KEY = 'carousel-slide-index'
