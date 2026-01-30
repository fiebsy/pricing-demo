/**
 * Stacking Nav + Table Playground - Filter Utilities
 *
 * Maps the stacking nav's active path to employee filtering.
 */

import type { ActivePath } from '@/components/ui/features/stacking-nav'
import type { Employee } from '../config/types'

/**
 * Filter employees based on the stacking nav's active path.
 *
 * Path depth mapping:
 * - [] or ['all']  → All employees (L0)
 * - ['acme']       → Filter by company (L1)
 * - ['acme', 'acme-eng']  → Filter by department (L2)
 * - ['acme', 'acme-eng', 'acme-eng-fe']  → Filter by team (L3)
 */
export function filterByPath(employees: Employee[], path: ActivePath): Employee[] {
  if (path.length === 0 || path[0] === 'all') return employees

  let filtered = employees.filter((e) => e.company === path[0])

  if (path.length >= 2) {
    filtered = filtered.filter((e) => e.department === path[1])
  }

  if (path.length >= 3) {
    filtered = filtered.filter((e) => e.team === path[2])
  }

  return filtered
}
