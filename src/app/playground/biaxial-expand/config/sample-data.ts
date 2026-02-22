/**
 * Sample Data for BiaxialExpand Playground
 *
 * Demo content for command menus, metrics, and custom demos.
 */

import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'
import UserIcon from '@hugeicons-pro/core-stroke-rounded/UserIcon'
import File01Icon from '@hugeicons-pro/core-stroke-rounded/File01Icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import Calendar01Icon from '@hugeicons-pro/core-stroke-rounded/Calendar01Icon'
import Mail01Icon from '@hugeicons-pro/core-stroke-rounded/Mail01Icon'
import AnalyticsUp01Icon from '@hugeicons-pro/core-stroke-rounded/AnalyticsUp01Icon'
import Dollar01Icon from '@hugeicons-pro/core-stroke-rounded/Dollar01Icon'
import Award01Icon from '@hugeicons-pro/core-stroke-rounded/Award01Icon'
import InboxIcon from '@hugeicons-pro/core-stroke-rounded/InboxIcon'

import type { CommandGroup } from '@/components/ui/core/primitives/biaxial-expand'

// ============================================================================
// COMMAND MENU DATA
// ============================================================================

export const SAMPLE_COMMANDS: CommandGroup[] = [
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      {
        id: 'dashboard',
        label: 'Go to Dashboard',
        description: 'View your main dashboard',
        shortcut: ['G', 'D'],
        icon: Home01Icon,
      },
      {
        id: 'customers',
        label: 'Go to Customers',
        description: 'Manage customer accounts',
        shortcut: ['G', 'C'],
        icon: UserIcon,
      },
      {
        id: 'contracts',
        label: 'Go to Contracts',
        description: 'View all contracts',
        shortcut: ['G', 'O'],
        icon: File01Icon,
      },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      {
        id: 'new-contract',
        label: 'Create Contract',
        description: 'Start a new contract',
        shortcut: ['C'],
        icon: Add01Icon,
      },
      {
        id: 'settings',
        label: 'Settings',
        description: 'Configure your preferences',
        icon: Settings01Icon,
        navigates: true,
      },
    ],
  },
]

export const EXTENDED_COMMANDS: CommandGroup[] = [
  ...SAMPLE_COMMANDS,
  {
    id: 'recent',
    label: 'Recent',
    items: [
      {
        id: 'search',
        label: 'Search',
        description: 'Search across all items',
        shortcut: ['/', 'S'],
        icon: Search01Icon,
      },
      {
        id: 'calendar',
        label: 'Calendar',
        description: 'View your schedule',
        shortcut: ['G', 'A'],
        icon: Calendar01Icon,
      },
      {
        id: 'messages',
        label: 'Messages',
        description: 'View inbox',
        shortcut: ['G', 'M'],
        icon: Mail01Icon,
      },
    ],
  },
]

// ============================================================================
// FILTER OPTIONS
// ============================================================================

export const SAMPLE_FILTER_OPTIONS = [
  { id: 'recent', label: 'Recent' },
  { id: 'starred', label: 'Starred' },
  { id: 'all', label: 'All' },
]

// ============================================================================
// DASHBOARD METRIC DATA
// ============================================================================

export interface MetricData {
  id: string
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: typeof AnalyticsUp01Icon
  details: MetricDetail[]
}

export interface MetricDetail {
  label: string
  value: string
}

export const SAMPLE_METRICS: MetricData[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    changeType: 'positive',
    icon: Dollar01Icon,
    details: [
      { label: 'This Week', value: '$12,450' },
      { label: 'Last Week', value: '$10,200' },
      { label: 'Month to Date', value: '$45,231' },
      { label: 'Projected', value: '$58,000' },
    ],
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: '2,345',
    change: '+8.2%',
    changeType: 'positive',
    icon: Award01Icon,
    details: [
      { label: 'New this month', value: '189' },
      { label: 'Churned', value: '12' },
      { label: 'Engagement Rate', value: '78%' },
    ],
  },
  {
    id: 'orders',
    label: 'Pending Orders',
    value: '156',
    change: '-3.1%',
    changeType: 'negative',
    icon: InboxIcon,
    details: [
      { label: 'Processing', value: '89' },
      { label: 'Awaiting Payment', value: '45' },
      { label: 'Ready to Ship', value: '22' },
    ],
  },
]

// ============================================================================
// CUSTOM DEMO DATA
// ============================================================================

export interface ProfileOption {
  id: string
  label: string
  description: string
  icon: typeof UserIcon
}

export const SAMPLE_PROFILE_OPTIONS: ProfileOption[] = [
  {
    id: 'profile',
    label: 'View Profile',
    description: 'See your account details',
    icon: UserIcon,
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Manage preferences',
    icon: Settings01Icon,
  },
]

// ============================================================================
// PRICING TIER DATA
// ============================================================================

export interface PricingTier {
  id: string
  credits: number
  price: number
  label: string           // Legacy: full label for compatibility
  priceLabel: string      // Legacy: price label for compatibility
  multiplier: number      // 1, 2, 3, 4, 5, 6
  planName: string        // "Pro", "Pro 2X", etc.
  creditsLabel: string    // "200 credits / month"
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-100',
    credits: 100,
    price: 19,
    multiplier: 1,
    planName: 'Pro',
    creditsLabel: '100 credits / month',
    label: '100 credits / month',
    priceLabel: '$19/mo',
  },
  {
    id: 'tier-200',
    credits: 200,
    price: 39,
    multiplier: 2,
    planName: 'Pro 2x',
    creditsLabel: '200 credits / month',
    label: '200 credits / month',
    priceLabel: '$39/mo',
  },
  {
    id: 'tier-300',
    credits: 300,
    price: 59,
    multiplier: 3,
    planName: 'Pro 3x',
    creditsLabel: '300 credits / month',
    label: '300 credits / month',
    priceLabel: '$59/mo',
  },
  {
    id: 'tier-400',
    credits: 400,
    price: 79,
    multiplier: 4,
    planName: 'Pro 4x',
    creditsLabel: '400 credits / month',
    label: '400 credits / month',
    priceLabel: '$79/mo',
  },
  {
    id: 'tier-500',
    credits: 500,
    price: 99,
    multiplier: 5,
    planName: 'Pro 5x',
    creditsLabel: '500 credits / month',
    label: '500 credits / month',
    priceLabel: '$99/mo',
  },
  {
    id: 'tier-600',
    credits: 600,
    price: 119,
    multiplier: 6,
    planName: 'Pro 6x',
    creditsLabel: '600 credits / month',
    label: '600 credits / month',
    priceLabel: '$119/mo',
  },
]
