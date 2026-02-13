/**
 * Orders Page - Navigation Items
 *
 * Order filtering hierarchy:
 * All → Active (Healthy, At risk) / Closed (Completed, Clawbacks, Declined)
 */

import type { StackItem } from '@/components/ui/features/stacking-nav'

// =============================================================================
// NAVIGATION HIERARCHY
// =============================================================================

/**
 * Navigation structure:
 *
 * All
 * ├── Active
 * │   ├── Healthy
 * │   └── At risk
 * │       ├── Low
 * │       ├── Medium
 * │       └── High
 * └── Closed
 *     ├── Completed
 *     ├── Clawbacks
 *     │   ├── Default
 *     │   ├── Chargeback
 *     │   └── Canceled
 *     └── Declined
 */
export const NAV_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'active',
    label: 'Active',
    children: [
      { id: 'healthy', label: 'Healthy' },
      {
        id: 'at-risk',
        label: 'At risk',
        children: [
          { id: 'risk-low', label: 'Low' },
          { id: 'risk-medium', label: 'Medium' },
          { id: 'risk-high', label: 'High' },
        ],
      },
    ],
  },
  {
    id: 'closed',
    label: 'Closed',
    children: [
      { id: 'completed', label: 'Completed' },
      {
        id: 'clawbacks',
        label: 'Clawbacks',
        children: [
          { id: 'clawback-default', label: 'Default' },
          { id: 'clawback-chargeback', label: 'Chargeback' },
          { id: 'clawback-canceled', label: 'Canceled' },
        ],
      },
      { id: 'declined', label: 'Declined' },
    ],
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get display label for a nav path
 */
export function getPathLabel(path: string[]): string {
  if (path.length === 0) return 'All Orders'
  return path.join(' / ')
}
