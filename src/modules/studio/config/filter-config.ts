/**
 * Studio Dashboard - Filter Configuration
 *
 * Audience-specific filter menu items for the FilterMenu component.
 * Filters are applied client-side after data is fetched.
 */

import type { ComponentType } from 'react'
import {
  CheckmarkCircle02Icon,
  Clock01Icon,
  Message01Icon,
  Tag01Icon,
} from '@hugeicons-pro/core-stroke-rounded'

import type { MenuItemType, MenuItemAction, MenuItemSubmenu } from '@/components/ui/patterns/filter'
import type { AudienceFilterId, ActiveFilter, FilterPredicate, AudienceUser, FilterCategory } from '../types'

// =============================================================================
// FILTER ICON MAPPING
// =============================================================================

type IconComponent = ComponentType<{ className?: string }>

export const FILTER_ICONS: Record<string, IconComponent> = {
  Status: CheckmarkCircle02Icon as unknown as IconComponent,
  'Last Interacted': Clock01Icon as unknown as IconComponent,
  Messages: Message01Icon as unknown as IconComponent,
  Tags: Tag01Icon as unknown as IconComponent,
}

// =============================================================================
// FILTER MENU ITEMS
// =============================================================================

export const AUDIENCE_FILTER_ITEMS: MenuItemType[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'submenu',
    icon: CheckmarkCircle02Icon as unknown as IconComponent,
    items: [
      {
        id: 'status-active',
        label: 'Active',
      } as MenuItemAction,
      {
        id: 'status-invited',
        label: 'Invited',
      } as MenuItemAction,
      {
        id: 'status-revoked',
        label: 'Revoked',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'lastInteracted',
    label: 'Last Interacted',
    type: 'submenu',
    icon: Clock01Icon as unknown as IconComponent,
    items: [
      {
        id: 'last-7d',
        label: 'Last 7 days',
      } as MenuItemAction,
      {
        id: 'last-30d',
        label: 'Last 30 days',
      } as MenuItemAction,
      {
        id: 'last-90d',
        label: 'Last 90 days',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'messages',
    label: 'Messages',
    type: 'submenu',
    icon: Message01Icon as unknown as IconComponent,
    items: [
      {
        id: 'messages-0-10',
        label: '0-10',
      } as MenuItemAction,
      {
        id: 'messages-11-50',
        label: '11-50',
      } as MenuItemAction,
      {
        id: 'messages-51-100',
        label: '51-100',
      } as MenuItemAction,
      {
        id: 'messages-101-500',
        label: '101-500',
      } as MenuItemAction,
      {
        id: 'messages-500+',
        label: '500+',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'tags',
    label: 'Tags',
    type: 'submenu',
    icon: Tag01Icon as unknown as IconComponent,
    items: [
      {
        id: 'tag-vip',
        label: 'VIP',
      } as MenuItemAction,
      {
        id: 'tag-lead',
        label: 'Lead-Coaching',
      } as MenuItemAction,
      {
        id: 'tag-client',
        label: 'Client',
      } as MenuItemAction,
      {
        id: 'tag-cohort',
        label: 'Cohort-Jan-2025',
      } as MenuItemAction,
      {
        id: 'tag-inactive',
        label: 'Inactive',
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
]

// =============================================================================
// FILTER DISPLAY LABELS
// For showing in FilterChip components
// =============================================================================

export const FILTER_DISPLAY_LABELS: Record<AudienceFilterId, { label: string; value: string; category: FilterCategory }> = {
  // Status filters
  'status-active': { label: 'Status', value: 'Active', category: 'Status' },
  'status-invited': { label: 'Status', value: 'Invited', category: 'Status' },
  'status-revoked': { label: 'Status', value: 'Revoked', category: 'Status' },
  // Last Interacted filters
  'last-7d': { label: 'Last Interacted', value: '7 days', category: 'Last Interacted' },
  'last-30d': { label: 'Last Interacted', value: '30 days', category: 'Last Interacted' },
  'last-90d': { label: 'Last Interacted', value: '90 days', category: 'Last Interacted' },
  // Messages filters
  'messages-0-10': { label: 'Messages', value: '0-10', category: 'Messages' },
  'messages-11-50': { label: 'Messages', value: '11-50', category: 'Messages' },
  'messages-51-100': { label: 'Messages', value: '51-100', category: 'Messages' },
  'messages-101-500': { label: 'Messages', value: '101-500', category: 'Messages' },
  'messages-500+': { label: 'Messages', value: '500+', category: 'Messages' },
  'messages-51+': { label: 'Messages', value: '51+', category: 'Messages' }, // Combined filter for Most Engaged
  // Tag filters
  'tag-vip': { label: 'Tags', value: 'VIP', category: 'Tags' },
  'tag-lead': { label: 'Tags', value: 'Lead-Coaching', category: 'Tags' },
  'tag-client': { label: 'Tags', value: 'Client', category: 'Tags' },
  'tag-cohort': { label: 'Tags', value: 'Cohort-Jan-2025', category: 'Tags' },
  'tag-inactive': { label: 'Tags', value: 'Inactive', category: 'Tags' },
}

// =============================================================================
// FILTER PREDICATES
// =============================================================================

// Helper to check days since interaction
const daysSince = (date: Date): number => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export const FILTER_PREDICATES: Record<AudienceFilterId, FilterPredicate> = {
  // Status filters
  'status-active': (item) => item.status === 'Active',
  'status-invited': (item) => item.status === 'Invited',
  'status-revoked': (item) => item.status === 'Revoked',

  // Last Interacted filters
  'last-7d': (item) => daysSince(item.lastInteracted) <= 7,
  'last-30d': (item) => daysSince(item.lastInteracted) <= 30,
  'last-90d': (item) => daysSince(item.lastInteracted) <= 90,

  // Messages filters
  'messages-0-10': (item) => item.messageCount >= 0 && item.messageCount <= 10,
  'messages-11-50': (item) => item.messageCount >= 11 && item.messageCount <= 50,
  'messages-51-100': (item) => item.messageCount >= 51 && item.messageCount <= 100,
  'messages-101-500': (item) => item.messageCount >= 101 && item.messageCount <= 500,
  'messages-500+': (item) => item.messageCount > 500,
  'messages-51+': (item) => item.messageCount > 50, // Combined: 51+ messages (for Most Engaged)

  // Tag filters
  'tag-vip': (item) => item.tags.includes('VIP'),
  'tag-lead': (item) => item.tags.includes('Lead-Coaching'),
  'tag-client': (item) => item.tags.includes('Client'),
  'tag-cohort': (item) => item.tags.includes('Cohort-Jan-2025'),
  'tag-inactive': (item) => item.tags.includes('Inactive'),
}

// =============================================================================
// HELPER: Apply filters to data
// =============================================================================

export function applyFilters(
  items: AudienceUser[],
  activeFilters: ActiveFilter[]
): AudienceUser[] {
  if (activeFilters.length === 0) return items

  return items.filter((item) => {
    // Group filters by category
    const filtersByCategory: Record<string, AudienceFilterId[]> = {}

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
