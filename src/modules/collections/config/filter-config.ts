/**
 * Collections Dashboard - Filter Configuration
 *
 * Risk-specific filter menu items for the RevealMenu component.
 * Filters are applied client-side after data is fetched.
 */

import type { ComponentType } from 'react'
import {
  CheckmarkCircle02Icon,
  Alert02Icon,
  Money01Icon,
  Route01Icon,
  Cancel01Icon,
} from '@hugeicons-pro/core-stroke-rounded'

import type { MenuItemType, MenuItemAction, MenuItemSubmenu } from '@/components/ui/patterns/filter'
import type { FilterId, ActiveFilter, FilterPredicate, PartnerRiskItem } from '../types'
import { ContractStatus, PaymentPlanType } from '../types'

// =============================================================================
// FILTER ICON MAPPING
// =============================================================================

type IconComponent = ComponentType<{ className?: string }>

export const FILTER_ICONS: Record<string, IconComponent> = {
  Status: CheckmarkCircle02Icon as unknown as IconComponent,
  Urgency: Alert02Icon as unknown as IconComponent,
  Balance: Money01Icon as unknown as IconComponent,
  Route: Route01Icon as unknown as IconComponent,
  Outcome: Cancel01Icon as unknown as IconComponent,
}

// =============================================================================
// FILTER MENU ITEMS
// =============================================================================

export const RISK_FILTER_ITEMS: MenuItemType[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'submenu',
    icon: CheckmarkCircle02Icon as unknown as IconComponent,
    items: [
      {
        id: 'status-collections',
        label: 'Collections',
      } as MenuItemAction,
      {
        id: 'status-clawback',
        label: 'Last Chance',
      } as MenuItemAction,
      {
        id: 'status-settled',
        label: 'Clawed back',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'outcome',
    label: 'Outcome',
    type: 'submenu',
    icon: Cancel01Icon as unknown as IconComponent,
    items: [
      {
        id: 'outcome-defaulted',
        label: 'Defaulted',
      } as MenuItemAction,
      {
        id: 'outcome-canceled',
        label: 'Canceled',
      } as MenuItemAction,
      {
        id: 'outcome-chargeback',
        label: 'Chargeback',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'urgency',
    label: 'Urgency',
    type: 'submenu',
    icon: Alert02Icon as unknown as IconComponent,
    items: [
      {
        id: 'urgency-critical',
        label: 'Critical (0-3 days)',
      } as MenuItemAction,
      {
        id: 'urgency-warning',
        label: 'Warning (4-7 days)',
      } as MenuItemAction,
      {
        id: 'urgency-safe',
        label: 'Safe (8+ days)',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'balance',
    label: 'Balance',
    type: 'submenu',
    icon: Money01Icon as unknown as IconComponent,
    items: [
      {
        id: 'balance-high',
        label: 'High (>$500)',
      } as MenuItemAction,
      {
        id: 'balance-medium',
        label: 'Medium ($100-500)',
      } as MenuItemAction,
      {
        id: 'balance-low',
        label: 'Low (<$100)',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'route',
    label: 'Route',
    type: 'submenu',
    icon: Route01Icon as unknown as IconComponent,
    items: [
      {
        id: 'route-servicing',
        label: 'PAC',
      } as MenuItemAction,
      {
        id: 'route-funding',
        label: 'Upfront',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
]

// =============================================================================
// FILTER DISPLAY LABELS
// For showing in FilterChip components
// =============================================================================

export const FILTER_DISPLAY_LABELS: Record<FilterId, { label: string; value: string; category: ActiveFilter['category'] }> = {
  'status-collections': { label: 'Status', value: 'Collections', category: 'Status' },
  'status-clawback': { label: 'Status', value: 'Last Chance', category: 'Status' },
  'status-settled': { label: 'Status', value: 'Clawed back', category: 'Status' },
  'outcome-defaulted': { label: 'Outcome', value: 'Defaulted', category: 'Outcome' },
  'outcome-canceled': { label: 'Outcome', value: 'Canceled', category: 'Outcome' },
  'outcome-chargeback': { label: 'Outcome', value: 'Chargeback', category: 'Outcome' },
  'urgency-critical': { label: 'Urgency', value: 'Critical', category: 'Urgency' },
  'urgency-warning': { label: 'Urgency', value: 'Warning', category: 'Urgency' },
  'urgency-safe': { label: 'Urgency', value: 'Safe', category: 'Urgency' },
  'balance-high': { label: 'Balance', value: '>$500', category: 'Balance' },
  'balance-medium': { label: 'Balance', value: '$100-500', category: 'Balance' },
  'balance-low': { label: 'Balance', value: '<$100', category: 'Balance' },
  'route-servicing': { label: 'Route', value: 'PAC', category: 'Route' },
  'route-funding': { label: 'Route', value: 'Upfront', category: 'Route' },
}

// =============================================================================
// FILTER PREDICATES
// Used for client-side filtering of data
// =============================================================================

export const FILTER_PREDICATES: Record<FilterId, FilterPredicate> = {
  // Status filters - use riskCategory for precise filtering
  'status-collections': (item) =>
    item.riskCategory === 'COLLECTIONS' || item.riskCategory === 'CLAWBACK_RISK',
  'status-clawback': (item) => item.riskCategory === 'ACTIVE_CLAWBACK',
  'status-settled': (item) => item.riskCategory === 'SETTLED_CLAWBACK',

  // Outcome filters - type of failed order
  'outcome-defaulted': (item) => {
    const status = String(item.status)
    return status === ContractStatus.DefaultedPendingClawback ||
           status === ContractStatus.DefaultedSettled
  },
  'outcome-canceled': (item) => {
    const status = String(item.status)
    return status === ContractStatus.CanceledPendingClawback ||
           status === ContractStatus.CanceledSettled
  },
  'outcome-chargeback': (item) => {
    const status = String(item.status)
    return status === ContractStatus.ChargebackPendingClawback ||
           status === ContractStatus.ChargebackSettled
  },

  // Urgency filters (based on daysUntilClawback)
  'urgency-critical': (item) => {
    const days = item.daysUntilClawback
    return days !== null && days !== undefined && days <= 3
  },
  'urgency-warning': (item) => {
    const days = item.daysUntilClawback
    return days !== null && days !== undefined && days >= 4 && days <= 7
  },
  'urgency-safe': (item) => {
    const days = item.daysUntilClawback
    return days !== null && days !== undefined && days >= 8
  },

  // Balance filters
  'balance-high': (item) => (item.remainingBalance ?? 0) > 500,
  'balance-medium': (item) => {
    const balance = item.remainingBalance ?? 0
    return balance >= 100 && balance <= 500
  },
  'balance-low': (item) => (item.remainingBalance ?? 0) < 100,

  // Route filters
  'route-servicing': (item) => {
    return item.planType === PaymentPlanType.Servicing
  },
  'route-funding': (item) => {
    return item.planType === PaymentPlanType.Funding
  },
}

// =============================================================================
// HELPER: Apply filters to data
// =============================================================================

export function applyFilters(
  items: PartnerRiskItem[],
  activeFilters: ActiveFilter[]
): PartnerRiskItem[] {
  if (activeFilters.length === 0) return items

  return items.filter((item) => {
    // Group filters by category
    const filtersByCategory: Record<string, FilterId[]> = {}

    for (const filter of activeFilters) {
      const category = filter.category
      if (!filtersByCategory[category]) {
        filtersByCategory[category] = []
      }
      filtersByCategory[category].push(filter.id)
    }

    // Within each category, use OR logic (match any)
    // Across categories, use AND logic (must match all)
    return Object.entries(filtersByCategory).every(([_category, filterIds]) => {
      if (!filterIds || filterIds.length === 0) return true
      return filterIds.some((filterId) => {
        const predicate = FILTER_PREDICATES[filterId]
        return predicate ? predicate(item) : true
      })
    })
  })
}
