/**
 * Navigation Data Structure
 *
 * Hierarchical navigation configuration for the Uniswap-style nav pattern.
 */

import Invoice01Icon from '@hugeicons-pro/core-stroke-rounded/Invoice01Icon'
import MoneyReceiveCircleIcon from '@hugeicons-pro/core-stroke-rounded/MoneyReceiveCircleIcon'
import Alert02Icon from '@hugeicons-pro/core-stroke-rounded/Alert02Icon'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'
import ShoppingBag01Icon from '@hugeicons-pro/core-stroke-rounded/ShoppingBag01Icon'
import type { NavigationStructure, NavSection, NavItem } from './types'

// Standalone items (no sub-navigation)
export const overviewItem: NavItem = {
  id: 'overview',
  label: 'Overview',
  href: '/payva/overview',
  icon: Home01Icon,
  description: 'Dashboard overview',
}

// Money section items
export const ordersItem: NavItem = {
  id: 'orders',
  label: 'Orders',
  href: '/payva/orders',
  icon: Invoice01Icon,
  description: 'View and manage orders',
}

export const payoutsItem: NavItem = {
  id: 'payouts',
  label: 'Payouts',
  href: '/payva/payouts',
  icon: MoneyReceiveCircleIcon,
  description: 'Track payout status',
}

export const riskItem: NavItem = {
  id: 'risk',
  label: 'Risk',
  href: '/payva/risk',
  icon: Alert02Icon,
  description: 'Risk management',
}

// Money section
export const moneySection: NavSection = {
  id: 'money',
  label: 'Money',
  defaultHref: '/payva/orders', // First item in section
  items: [ordersItem, payoutsItem, riskItem],
}

// Products standalone item (no sub-tabs)
export const productsItem: NavItem = {
  id: 'products',
  label: 'Products',
  href: '/payva/products',
  icon: ShoppingBag01Icon,
  description: 'Product catalog',
}

// Full navigation structure
export const navigationStructure: NavigationStructure = {
  standaloneItems: [overviewItem],
  sections: [moneySection],
}

// Helper: Get all nav items as flat array
export function getAllNavItems(): NavItem[] {
  const items: NavItem[] = [...navigationStructure.standaloneItems]
  for (const section of navigationStructure.sections) {
    items.push(...section.items)
  }
  // Add products as standalone (not in section)
  items.push(productsItem)
  return items
}

// Helper: Get section by ID
export function getSectionById(sectionId: string): NavSection | undefined {
  return navigationStructure.sections.find((s) => s.id === sectionId)
}

// Helper: Get item by ID
export function getItemById(itemId: string): NavItem | undefined {
  return getAllNavItems().find((item) => item.id === itemId)
}
