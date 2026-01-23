/**
 * Question Command Menu V3 - Default Filter Options
 *
 * Fallback data for the filters content type.
 */

import type { FilterOption } from '../config/types'

export const DEFAULT_FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'pending', label: 'Pending', count: 3 },
  { id: 'approved', label: 'Approved', count: 7 },
  { id: 'flagged', label: 'Flagged', count: 2 },
]
