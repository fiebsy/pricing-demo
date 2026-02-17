/**
 * Filter Toolbar
 *
 * Controls for frequency threshold and category toggles.
 */

'use client'

import type { FilterState, OrderSubcategory } from '../_config/types'
import { COLUMNS } from '../_config/layout'
import { cn } from '@/lib/utils'

// =============================================================================
// FREQUENCY THRESHOLDS
// =============================================================================

const FREQUENCY_OPTIONS = [
  { value: 10, label: '10+' },
  { value: 100, label: '100+' },
  { value: 500, label: '500+' },
  { value: 1000, label: '1k+' },
]

// =============================================================================
// SUBCATEGORY TOGGLE COLORS
// =============================================================================

const TOGGLE_COLORS: Record<OrderSubcategory, { active: string; inactive: string }> = {
  OTHER_ACTIVE: {
    active: 'bg-brand-primary border-brand text-brand-primary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  HEALTHY: {
    active: 'bg-success-primary border-success text-success-primary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  AT_RISK: {
    active: 'bg-warning-primary border-warning text-warning-primary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  FULLY_PAID: {
    active: 'bg-success-primary border-success text-success-primary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  CLAWED_BACK: {
    active: 'bg-error-primary border-error text-error-primary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  DECLINED: {
    active: 'bg-tertiary border-secondary text-secondary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  OTHER_CLOSED: {
    active: 'bg-tertiary border-secondary text-secondary',
    inactive: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
  },
}

// =============================================================================
// PROPS
// =============================================================================

interface FilterToolbarProps {
  filterState: FilterState
  onFilterChange: (updates: Partial<FilterState>) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FilterToolbar({ filterState, onFilterChange }: FilterToolbarProps) {
  // Toggle subcategory visibility
  const toggleSubcategory = (subcategory: OrderSubcategory) => {
    const newVisible = new Set(filterState.visibleSubcategories)
    if (newVisible.has(subcategory)) {
      newVisible.delete(subcategory)
    } else {
      newVisible.add(subcategory)
    }
    onFilterChange({ visibleSubcategories: newVisible })
  }

  // Set frequency threshold
  const setFrequency = (value: number) => {
    onFilterChange({ frequencyThreshold: value, showAll: false })
  }

  // Toggle show all
  const toggleShowAll = () => {
    onFilterChange({ showAll: !filterState.showAll })
  }

  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-secondary rounded-xl border border-secondary">
      {/* Frequency Filter */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-secondary">Frequency:</span>
        <div className="flex gap-1">
          {FREQUENCY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFrequency(opt.value)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg border transition-colors',
                filterState.frequencyThreshold === opt.value && !filterState.showAll
                  ? 'bg-brand-primary border-brand text-brand-primary'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              {opt.label}
            </button>
          ))}
          <button
            onClick={toggleShowAll}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg border transition-colors',
              filterState.showAll
                ? 'bg-brand-primary border-brand text-brand-primary'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            )}
          >
            All
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Category Toggles */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-secondary">Categories:</span>
        <div className="flex flex-wrap gap-1.5">
          {COLUMNS.map(col => {
            const isActive = filterState.visibleSubcategories.has(col.subcategory)
            const colors = TOGGLE_COLORS[col.subcategory]

            return (
              <button
                key={col.subcategory}
                onClick={() => toggleSubcategory(col.subcategory)}
                className={cn(
                  'px-2.5 py-1 text-xs rounded-lg border transition-colors',
                  isActive ? colors.active : colors.inactive
                )}
              >
                {col.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
