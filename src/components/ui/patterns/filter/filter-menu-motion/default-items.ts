/**
 * FilterMenuMotion - Default Filter Items
 *
 * Example filter items for demonstration.
 *
 * @module prod/base/filter/filter-menu-motion/default-items
 */

import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'

import type { MenuItem } from './types'

/**
 * Default filter items for demonstration.
 */
export const DEFAULT_FILTER_ITEMS: MenuItem[] = [
  {
    id: 'status',
    type: 'submenu',
    label: 'Status',
    icon: CheckmarkCircle02Icon,
    items: [
      { id: 'status-active', label: 'Active' },
      { id: 'status-pending', label: 'Pending' },
      { id: 'status-completed', label: 'Completed' },
    ],
  },
  { type: 'separator', id: 'sep-1' },
  {
    id: 'category',
    type: 'submenu',
    label: 'Category',
    items: [
      { id: 'category-sales', label: 'Sales' },
      { id: 'category-support', label: 'Support' },
      { id: 'category-marketing', label: 'Marketing' },
    ],
  },
]
