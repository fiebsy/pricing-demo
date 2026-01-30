/**
 * FilterSelectChipStatic - Main Component
 *
 * Filter chip system using Base UI Select for dropdown functionality.
 * Static (no animation) for performance.
 *
 * @module prod/base/filter/filter-select-chip-static
 *
 * @example
 * ```tsx
 * import { FilterSelectChipStatic } from '@/modules/design-system/v2/components/ui/prod/base/filter'
 *
 * <FilterSelectChipStatic
 *   filters={activeFilters}
 *   onFilterChange={(id, value) => updateFilter(id, value)}
 *   onFilterRemove={(id) => removeFilter(id)}
 * />
 * ```
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

import { FilterChip } from './components'
import { mergeStyleConfig, getGapClass } from './config'
import type { FilterSelectChipStaticProps } from './types'

// ============================================================================
// Component
// ============================================================================

export function FilterSelectChipStatic({
  filters,
  onFilterChange,
  onFilterRemove,
  styleConfig: styleConfigProp,
  showDebug = false,
  className,
}: FilterSelectChipStaticProps) {
  // Merge style config with defaults
  const styleConfig = mergeStyleConfig(styleConfigProp)

  // Collect all active filter values to disable in dropdowns
  const allActiveValues = React.useMemo(
    () => new Set(filters.map((f) => f.value)),
    [filters]
  )

  return (
    <div
      className={cn(
        'flex flex-wrap items-center',
        getGapClass(styleConfig.gap),
        className
      )}
    >
      {filters.map((filter, index) => (
        <FilterChip
          key={filter.id}
          filter={filter}
          index={index}
          styleConfig={styleConfig}
          onValueChange={(value) => onFilterChange?.(filter.id, value)}
          onRemove={() => onFilterRemove?.(filter.id)}
          showDebug={showDebug}
          allActiveValues={allActiveValues}
        />
      ))}
    </div>
  )
}

FilterSelectChipStatic.displayName = 'FilterSelectChipStatic'
