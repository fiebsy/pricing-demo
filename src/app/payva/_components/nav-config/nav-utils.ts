/**
 * Navigation Utilities
 *
 * Helper functions for determining current navigation state based on pathname.
 */

import type { NavSection, NavItem } from './types'
import {
  navigationStructure,
  productsItem,
  moneySection,
  overviewItem,
} from './navigation-data'

export interface CurrentNavState {
  /** Current section (e.g., moneySection) or null if standalone page */
  section: NavSection | null
  /** Current nav item */
  item: NavItem | null
  /** Whether we're on a section page (has tab bar) */
  hasTabs: boolean
}

/**
 * Get the current navigation state based on pathname
 */
export function getCurrentNavState(pathname: string): CurrentNavState {
  // Check standalone items first
  for (const item of navigationStructure.standaloneItems) {
    if (pathname === item.href) {
      return {
        section: null,
        item,
        hasTabs: false,
      }
    }
  }

  // Check sections
  for (const section of navigationStructure.sections) {
    for (const item of section.items) {
      if (pathname === item.href) {
        return {
          section,
          item,
          hasTabs: true,
        }
      }
    }
  }

  // Check products (standalone, no tabs)
  if (pathname === productsItem.href) {
    return {
      section: null,
      item: productsItem,
      hasTabs: false,
    }
  }

  // Default to overview
  return {
    section: null,
    item: overviewItem,
    hasTabs: false,
  }
}

/**
 * Check if a section is currently active (any of its items match pathname)
 */
export function isSectionActive(section: NavSection, pathname: string): boolean {
  return section.items.some((item) => pathname === item.href)
}

/**
 * Check if a specific item is active
 */
export function isItemActive(item: NavItem, pathname: string): boolean {
  return pathname === item.href
}

/**
 * Get the section that contains a given item ID
 */
export function getSectionForItem(itemId: string): NavSection | null {
  for (const section of navigationStructure.sections) {
    if (section.items.some((item) => item.id === itemId)) {
      return section
    }
  }
  return null
}

/**
 * Check if we're on any money section page
 */
export function isMoneySection(pathname: string): boolean {
  return isSectionActive(moneySection, pathname)
}

/**
 * Check if we're on the products page
 */
export function isProductsPage(pathname: string): boolean {
  return pathname === productsItem.href
}

/**
 * Check if we're on the overview page
 */
export function isOverviewPage(pathname: string): boolean {
  return pathname === overviewItem.href
}
