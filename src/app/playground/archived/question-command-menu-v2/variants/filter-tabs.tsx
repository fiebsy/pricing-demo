/**
 * Question Command Menu - Filter Tabs Variant
 *
 * Top slot content with tab-style filters.
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'

export interface FilterTabOption {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface FilterTabsProps {
  /** Tab options */
  options?: FilterTabOption[]
  /** Currently selected tab */
  value?: string
  /** Called when selection changes */
  onChange?: (tabId: string) => void
  /** Additional className */
  className?: string
}

const DEFAULT_OPTIONS: FilterTabOption[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'pending', label: 'Pending', count: 3 },
  { id: 'approved', label: 'Approved', count: 7 },
  { id: 'flagged', label: 'Flagged', count: 2 },
]

export const FilterTabs: React.FC<FilterTabsProps> = ({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(options[0]?.id ?? '')
  const selectedId = value ?? internalValue

  const handleSelect = useCallback(
    (tabId: string) => {
      setInternalValue(tabId)
      onChange?.(tabId)
    },
    [onChange]
  )

  return (
    <div
      className={cn(
        'flex items-center gap-1 w-full h-full px-2',
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
                : 'bg-transparent text-tertiary hover:text-primary hover:bg-tertiary'
            )}
          >
            {Icon && <HugeIcon icon={Icon} size={14} />}
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={cn(
                  'ml-0.5 px-1 py-0.5 rounded text-[10px]',
                  isSelected ? 'bg-tertiary' : 'bg-quaternary'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

FilterTabs.displayName = 'FilterTabs'
