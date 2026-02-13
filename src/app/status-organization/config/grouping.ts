/**
 * Status Organization - Grouping Configuration
 *
 * Mapping between subcategories and main states.
 */

import type { OrderSubcategory, MainState, StatusEntry } from './types'
import { SUBCATEGORY_CONFIG, MAIN_STATE_CONFIG } from './badge-mapping'

// =============================================================================
// SUBCATEGORY ORDER
// =============================================================================

/** Order for displaying subcategories in detailed view */
export const SUBCATEGORY_ORDER: OrderSubcategory[] = [
  // Active subcategories first
  'HEALTHY',
  'AT_RISK',
  'OTHER_ACTIVE',
  // Then closed subcategories
  'FULLY_PAID',
  'CLAWED_BACK',
  'DECLINED',
  'OTHER_CLOSED',
]

// =============================================================================
// MAIN STATE ORDER
// =============================================================================

/** Order for displaying main states in simplified view */
export const MAIN_STATE_ORDER: MainState[] = ['HEALTHY', 'RISK', 'SETTLED']

// =============================================================================
// GROUPING HELPERS
// =============================================================================

/**
 * Group statuses by subcategory for detailed view
 */
export function groupBySubcategory(
  statuses: StatusEntry[]
): Map<OrderSubcategory, StatusEntry[]> {
  const grouped = new Map<OrderSubcategory, StatusEntry[]>()

  for (const subcategory of SUBCATEGORY_ORDER) {
    grouped.set(subcategory, [])
  }

  for (const status of statuses) {
    const group = grouped.get(status.subcategory)
    if (group) {
      group.push(status)
    }
  }

  return grouped
}

/**
 * Group statuses by main state for simplified view
 */
export function groupByMainState(
  statuses: StatusEntry[]
): Map<MainState, StatusEntry[]> {
  const grouped = new Map<MainState, StatusEntry[]>()

  for (const mainState of MAIN_STATE_ORDER) {
    grouped.set(mainState, [])
  }

  for (const status of statuses) {
    const mainState = SUBCATEGORY_CONFIG[status.subcategory].mainState
    const group = grouped.get(mainState)
    if (group) {
      group.push(status)
    }
  }

  return grouped
}

/**
 * Flatten grouped statuses back to array with group info
 */
export function flattenWithGroupHeaders<T extends 'subcategory' | 'mainState'>(
  statuses: StatusEntry[],
  groupBy: T
): Array<StatusEntry & { isFirstInGroup: boolean; groupKey: T extends 'subcategory' ? OrderSubcategory : MainState }> {
  const result: Array<StatusEntry & { isFirstInGroup: boolean; groupKey: string }> = []

  if (groupBy === 'subcategory') {
    const grouped = groupBySubcategory(statuses)
    for (const [subcategory, group] of grouped) {
      for (let i = 0; i < group.length; i++) {
        result.push({
          ...group[i],
          isFirstInGroup: i === 0,
          groupKey: subcategory,
        })
      }
    }
  } else {
    const grouped = groupByMainState(statuses)
    for (const [mainState, group] of grouped) {
      for (let i = 0; i < group.length; i++) {
        result.push({
          ...group[i],
          isFirstInGroup: i === 0,
          groupKey: mainState,
        })
      }
    }
  }

  return result as Array<StatusEntry & { isFirstInGroup: boolean; groupKey: T extends 'subcategory' ? OrderSubcategory : MainState }>
}
