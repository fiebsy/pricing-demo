/**
 * Question Command Menu V4 - Filters Content
 *
 * Tab-style filters that can render in any slot.
 */

'use client'

import * as React from 'react'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { useV4Context } from '../state'
import { DEFAULT_FILTER_OPTIONS, DEFAULT_TAB_OPTIONS } from '../data'
import type { SlotPosition, ContentTypeId } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface FiltersContentProps {
  contentType: Extract<ContentTypeId, 'filters' | 'tabs'>
  onChange?: (tabId: string) => void
  slotPosition: SlotPosition
  className?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const FiltersContent: React.FC<FiltersContentProps> = ({
  contentType,
  onChange,
  slotPosition,
  className,
}) => {
  const { config, state, setTab } = useV4Context()

  // Get config based on content type
  const filtersConfig = contentType === 'tabs'
    ? config.contentConfigs.tabs
    : config.contentConfigs.filters

  const options = filtersConfig.options.length > 0
    ? filtersConfig.options
    : (contentType === 'tabs' ? DEFAULT_TAB_OPTIONS : DEFAULT_FILTER_OPTIONS)

  const defaultValue = filtersConfig.defaultValue || options[0]?.id || ''

  // Use state activeTab if available, otherwise default
  const selectedId = state.activeTab || defaultValue

  const handleSelect = useCallback(
    (tabId: string) => {
      setTab(tabId)
      onChange?.(tabId)
    },
    [onChange, setTab]
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

FiltersContent.displayName = 'FiltersContent'
