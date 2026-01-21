/**
 * Biaxial Expand V4 - Filter Bar Variant
 *
 * Built-in top slot variant for filter/action buttons.
 * Provides quick filter toggles like "Recent", "Favorites", "All".
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'

export interface FilterOption {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface FilterBarProps {
  /** Filter options to display */
  options?: FilterOption[]
  /** Currently selected filter ID */
  value?: string
  /** Called when filter selection changes */
  onChange?: (filterId: string) => void
  /** Additional className */
  className?: string
}

const DEFAULT_OPTIONS: FilterOption[] = [
  { id: 'recent', label: 'Recent' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'all', label: 'All' },
]

export const FilterBar: React.FC<FilterBarProps> = ({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(options[0]?.id ?? '')
  const selectedId = value ?? internalValue

  const handleSelect = useCallback(
    (filterId: string) => {
      setInternalValue(filterId)
      onChange?.(filterId)
    },
    [onChange]
  )

  return (
    <div
      className={cn(
        'flex items-center gap-2 w-full h-full px-3',
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.id === selectedId
        const Icon = option.icon

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5',
              'px-3 py-1.5 rounded-lg',
              'text-xs font-medium',
              'transition-colors duration-150',
              isSelected
                ? 'bg-quaternary text-primary'
                : 'bg-tertiary text-tertiary hover:text-primary hover:bg-quaternary'
            )}
          >
            {Icon && <HugeIcon icon={Icon} size={14} />}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

FilterBar.displayName = 'BiaxialExpandV4.FilterBar'
