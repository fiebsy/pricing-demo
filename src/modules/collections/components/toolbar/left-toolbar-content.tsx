/**
 * LeftToolbarContent Component
 *
 * Filter menu and active filter chips for the toolbar.
 * Uses prod/base/filter components with hardened styling.
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import { cn } from '@/lib/utils'

import {
  FilterMenu,
  FilterTrigger,
  FilterSelectChipMotion,
  type FilterChipData,
  type FilterOption,
} from '@/components/ui/prod/base/filter'

import {
  RISK_FILTER_ITEMS,
  FILTER_ICONS,
} from '../../config/filter-config'

import type { ActiveFilter } from '../../types'

// =============================================================================
// FILTER OPTIONS BY CATEGORY
// =============================================================================

const FILTER_OPTIONS_BY_CATEGORY: Record<ActiveFilter['category'], FilterOption[]> = {
  Status: [
    { id: 'status-collections', label: 'Collections' },
    { id: 'status-clawback', label: 'Last Chance' },
    { id: 'status-settled', label: 'Clawed back' },
  ],
  Outcome: [
    { id: 'outcome-defaulted', label: 'Defaulted' },
    { id: 'outcome-canceled', label: 'Canceled' },
    { id: 'outcome-chargeback', label: 'Chargeback' },
  ],
  Urgency: [
    { id: 'urgency-critical', label: 'Critical (0-3 days)' },
    { id: 'urgency-warning', label: 'Warning (4-7 days)' },
    { id: 'urgency-safe', label: 'Safe (8+ days)' },
  ],
  Balance: [
    { id: 'balance-high', label: '>$500' },
    { id: 'balance-medium', label: '$100-500' },
    { id: 'balance-low', label: '<$100' },
  ],
  Route: [
    { id: 'route-servicing', label: 'PAC' },
    { id: 'route-funding', label: 'Upfront' },
  ],
}

// =============================================================================
// TYPES
// =============================================================================

export interface LeftToolbarContentProps {
  /** Currently active filters */
  activeFilters: ActiveFilter[]
  /** Callback when a filter is selected from the menu */
  onFilterSelect: (filterId: string) => void
  /** Callback when a filter value is changed via the chip dropdown */
  onFilterChange: (oldFilterId: string, newFilterId: string) => void
  /** Callback when a filter chip is removed */
  onFilterRemove: (filterId: string) => void
  /** Callback to clear all filters */
  onFiltersClear: () => void
  /** Optional className */
  className?: string
}

// =============================================================================
// FILTER SELECT CHIP MOTION CONFIG
// =============================================================================

const ANIMATION_CONFIG = {
  transitionType: 'tween' as const,
  easing: 'easeOut' as const,
  duration: 0.15,
  exitDuration: 0.05,
}

const STYLE_CONFIG = {
  size: 'sm' as const,
  roundness: 'full' as const,
  gap: 'md' as const,
}

// =============================================================================
// COMPONENT
// =============================================================================

export const LeftToolbarContent: React.FC<LeftToolbarContentProps> = ({
  activeFilters,
  onFilterSelect,
  onFilterChange,
  onFilterRemove,
  onFiltersClear,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Transform activeFilters to FilterChipData format for the motion component
  // IMPORTANT: Use category as the stable ID so value changes don't trigger enter/exit animations
  const filterChipData: FilterChipData[] = activeFilters.map((filter) => ({
    id: filter.category.toLowerCase(), // Stable key based on category (e.g., 'status')
    label: filter.category, // Category name shown in dropdown header
    icon: FILTER_ICONS[filter.category],
    value: filter.id, // Currently selected option ID (e.g., 'status-collections')
    options: FILTER_OPTIONS_BY_CATEGORY[filter.category],
  }))

  // Handle filter value change (switching to a different option in same category)
  // filterId is now the category (e.g., 'status'), newValue is the new option ID
  const handleFilterChange = (categoryId: string, newValue: string) => {
    // Find the current filter for this category to get its option ID
    const currentFilter = activeFilters.find(
      (f) => f.category.toLowerCase() === categoryId
    )
    if (currentFilter) {
      onFilterChange(currentFilter.id, newValue)
    }
  }

  // Handle filter removal
  // filterId is now the category (e.g., 'status'), need to find the actual option ID
  const handleFilterRemove = (categoryId: string) => {
    const currentFilter = activeFilters.find(
      (f) => f.category.toLowerCase() === categoryId
    )
    if (currentFilter) {
      onFilterRemove(currentFilter.id)
    }
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {/* Filter Menu */}
      <FilterMenu
        trigger={
          <FilterTrigger
            isOpen={isMenuOpen}
            label="Filter"
            size="md"
            rounded="full"
            variant="default"
          />
        }
        items={RISK_FILTER_ITEMS}
        onFilterSelect={onFilterSelect}
        activeFilterIds={activeFilters.map((f) => f.id)}
        onOpenChange={setIsMenuOpen}
        align="start"
        side="bottom"
        width={240}
      />

      {/* Active Filter Chips - Using FilterSelectChipMotion */}
      {activeFilters.length > 0 && (
        <LayoutGroup>
          <FilterSelectChipMotion
            filters={filterChipData}
            onFilterChange={handleFilterChange}
            onFilterRemove={handleFilterRemove}
            animationConfig={ANIMATION_CONFIG}
            styleConfig={STYLE_CONFIG}
          />

          {/* Clear All Button - animated with LayoutGroup for smooth reflow */}
          <motion.button
            layout
            transition={{
              layout: {
                type: 'tween',
                duration: ANIMATION_CONFIG.duration,
                ease: [0.33, 1, 0.68, 1],
              },
            }}
            onClick={onFiltersClear}
            className={cn(
              'text-sm font-medium text-tertiary hover:text-secondary',
              'transition-colors whitespace-nowrap',
              'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
            )}
          >
            Clear all
          </motion.button>
        </LayoutGroup>
      )}
    </div>
  )
}

LeftToolbarContent.displayName = 'LeftToolbarContent'
