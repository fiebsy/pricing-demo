/**
 * Question Command Menu V4 - Default Filter Options
 */

import type { FilterOption } from '../types'

export const DEFAULT_FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'pending', label: 'Pending', count: 3 },
  { id: 'approved', label: 'Approved', count: 7 },
  { id: 'flagged', label: 'Flagged', count: 2 },
]

export const DEFAULT_TAB_OPTIONS: FilterOption[] = [
  { id: 'recent', label: 'Recent' },
  { id: 'starred', label: 'Starred' },
  { id: 'all', label: 'All' },
]
