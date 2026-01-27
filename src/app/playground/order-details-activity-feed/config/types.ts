/**
 * Order Details Activity Feed Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/features/order-details-feed
 */

export type ViewVariant = 'minimal' | 'default'
export type TabId = 'activity' | 'payouts' | 'info'

export interface OrderDetailsFeedConfig {
  // View variant configuration
  variant: {
    mode: ViewVariant
  }

  // Outer container styling
  outer: {
    background: string           // Semantic: primary | secondary | tertiary
    shine: string               // shine-none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
    shineIntensity: string      // (none) | -subtle | -intense
    shadow: string              // none | xs | sm | md | lg
    depth: string               // none | depth-gradient-1 | depth-gradient-2 | depth-gradient-3
    corner: string              // round | squircle | bevel | scoop
    borderRadius: number        // 0-48 px
    padding: number             // 0-64 px
    border: boolean             // Show border
    borderColor: string         // Semantic: primary | secondary | tertiary
  }

  // Summary card configuration
  summaryCard: {
    visible: boolean            // Show/hide the large summary message
    background: string          // Semantic background color
    shine: string              // Shine effect for card
    shineIntensity: string     // Shine intensity
    gradientEffect: boolean    // Enable gradient text effect
    height: number             // Card height in px
    cornerRadius: number       // Corner radius in px
  }

  // Tab configuration
  tabs: {
    visibleTabs: TabId[]       // Which tabs to show
    defaultTab: TabId          // Default active tab
    showBorder: boolean        // Show tab border
  }

  // Header configuration
  header: {
    showOrderId: boolean       // Show order ID in header
    showHealthBadge: boolean   // Show health status badge
    showMetadata: boolean      // Show metadata badges
    showMetrics: boolean       // Show metrics section
  }

  // Typography configuration
  typography: {
    headerSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
    productSize: 'xs' | 'sm' | 'base' | 'lg'
    metricsSize: 'xs' | 'sm' | 'base'
    messageSize: 'base' | 'lg' | 'xl'
  }

  // Layout configuration
  layout: {
    maxWidth: string           // Max width of content
    spacing: 'compact' | 'default' | 'spacious'
  }
}

export interface OrderDetailsFeedPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'minimal' | 'default' | 'large' | 'custom'
  data: OrderDetailsFeedConfig
}

// Contract data types (from existing implementation)
export interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface PartnerData {
  id: string
  name: string
}

export interface ContractData {
  centrexId: string
  productName: string
  customer: CustomerData
  partner: PartnerData
  amountTotal: number
  amountToRepay: number
  contractDate: string
  planType: 'FUNDING' | 'SERVICING'
  paymentsTotal: number
}

export interface PaymentData {
  id: string
  date: string
  amount: number
  status: 'Cleared' | 'Pending' | 'Failed' | 'Scheduled'
  type?: 'payment' | 'payout'
  method?: string
  description?: string
}