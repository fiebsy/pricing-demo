/**
 * Orders Page - Filter Toolbar Panel Configuration
 *
 * Controls for filter placement visibility.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { OrdersPageConfig } from '../../types'

// =============================================================================
// FILTER SECTION
// =============================================================================

/**
 * Creates filter panel section with placement toggles.
 */
export function createFilterSection(config: OrdersPageConfig): Section {
  return {
    id: 'filter',
    title: 'Filter',
    tabLabel: 'Filter',
    groups: [
      {
        title: 'Filter Placement',
        controls: [
          {
            id: 'filter.showToolbarFilter',
            type: 'toggle' as const,
            label: 'Show in Toolbar',
            value: config.filter.showToolbarFilter,
          },
          {
            id: 'filter.showTopFilter',
            type: 'toggle' as const,
            label: 'Show Above Metrics',
            value: config.filter.showTopFilter,
          },
        ],
      },
    ],
  }
}
