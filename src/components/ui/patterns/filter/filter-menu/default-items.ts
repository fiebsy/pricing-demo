/**
 * Filter Menu - Default Menu Items
 *
 * Example filter menu structure for demonstration.
 *
 * @module prod/base/filter/filter-menu/default-items
 */

import type { MenuItemType as MenuItem } from '@/components/ui/core'

// Import icons
import Calendar03Icon from '@hugeicons-pro/core-stroke-rounded/Calendar03Icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import UserIcon from '@hugeicons-pro/core-stroke-rounded/UserIcon'
import Folder01Icon from '@hugeicons-pro/core-duotone-rounded/Folder01Icon'
import Tag01Icon from '@hugeicons-pro/core-stroke-rounded/Tag01Icon'

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
      { id: 'status-archived', label: 'Archived' },
    ],
  },
  {
    id: 'date',
    type: 'submenu',
    label: 'Date',
    icon: Calendar03Icon,
    items: [
      { id: 'date-today', label: 'Today' },
      { id: 'date-week', label: 'This Week' },
      { id: 'date-month', label: 'This Month' },
      { id: 'date-year', label: 'This Year' },
      { type: 'separator', id: 'date-sep' },
      { id: 'date-custom', label: 'Custom Range...' },
    ],
  },
  {
    id: 'assignee',
    type: 'submenu',
    label: 'Assignee',
    icon: UserIcon,
    items: [
      { id: 'assignee-me', label: 'Assigned to Me' },
      { id: 'assignee-unassigned', label: 'Unassigned' },
      { type: 'separator', id: 'assignee-sep' },
      { id: 'assignee-team', label: 'Team Members...' },
    ],
  },
  { type: 'separator', id: 'sep-1' },
  {
    id: 'category',
    type: 'submenu',
    label: 'Category',
    icon: Folder01Icon,
    items: [
      { id: 'category-sales', label: 'Sales' },
      { id: 'category-support', label: 'Support' },
      { id: 'category-marketing', label: 'Marketing' },
      { id: 'category-engineering', label: 'Engineering' },
    ],
  },
  {
    id: 'tags',
    type: 'submenu',
    label: 'Tags',
    icon: Tag01Icon,
    items: [
      { id: 'tag-urgent', label: 'Urgent' },
      { id: 'tag-important', label: 'Important' },
      { id: 'tag-review', label: 'Needs Review' },
      { id: 'tag-bug', label: 'Bug' },
    ],
  },
]
