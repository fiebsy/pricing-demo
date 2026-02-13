/**
 * Orders Page - Filter Utilities
 *
 * Path-based filtering for hierarchical navigation.
 *
 * Navigation hierarchy:
 * - all (show everything)
 * - active → healthy | at-risk → risk-low/medium/high
 * - closed → completed | clawbacks → clawback-default/chargeback/canceled | declined
 */

import type { OrderRecord } from '../../types'
import type { ActivePath } from '@/components/ui/features/stacking-nav'

// =============================================================================
// PATH-BASED FILTERING
// =============================================================================

/**
 * Filter order records by navigation path.
 *
 * Path structure follows nav hierarchy:
 * - [] or ['all'] = All orders
 * - ['active'] = All active orders
 * - ['active', 'healthy'] = Healthy active orders
 * - ['active', 'at-risk'] = At-risk active orders
 * - ['active', 'at-risk', 'risk-high'] = High risk orders
 * - ['closed'] = All closed orders
 * - ['closed', 'clawbacks'] = All clawback orders
 * - ['closed', 'clawbacks', 'clawback-default'] = Default clawback orders
 */
export function filterByPath(
  data: OrderRecord[],
  path: ActivePath
): OrderRecord[] {
  // Empty path or 'all' = show everything
  if (path.length === 0 || path[0] === 'all') {
    return data
  }

  let filtered = [...data]

  // Level 0: Category filter (active/closed)
  const category = path[0]
  if (category === 'active' || category === 'closed') {
    filtered = filtered.filter(item => item.category === category)
  }

  // Level 1: Status filter
  if (path.length >= 2) {
    const status = path[1]
    filtered = filtered.filter(item => item.status === status)
  }

  // Level 2: Substatus filter
  if (path.length >= 3) {
    const substatus = path[2]
    filtered = filtered.filter(item => item.substatus === substatus)
  }

  return filtered
}

// =============================================================================
// SEARCH FILTERING
// =============================================================================

/**
 * Filter order records by search query.
 * Searches customer name, order ID, and route.
 */
export function filterBySearch(
  data: OrderRecord[],
  query: string
): OrderRecord[] {
  if (!query.trim()) {
    return data
  }

  const lowerQuery = query.toLowerCase()

  return data.filter(item => {
    const customer = item.customer.toLowerCase()
    const order = item.order.toLowerCase()
    const route = item.route.toLowerCase()

    return (
      customer.includes(lowerQuery) ||
      order.includes(lowerQuery) ||
      route.includes(lowerQuery)
    )
  })
}

// =============================================================================
// COMBINED FILTERING
// =============================================================================

/**
 * Apply both path and search filters to data.
 */
export function filterData(
  data: OrderRecord[],
  path: ActivePath,
  searchQuery: string
): OrderRecord[] {
  let result = filterByPath(data, path)
  result = filterBySearch(result, searchQuery)
  return result
}
