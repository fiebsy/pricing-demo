/**
 * Question Command Menu V3 - Filters Content
 *
 * Tab-style filters that can render in any slot.
 * Used for both 'filters' and 'tabs' content types.
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { useV3Context } from '../core'
import type { SlotPosition, ContentTypeId } from '../config/types'
import { DEFAULT_FILTER_OPTIONS, DEFAULT_TAB_OPTIONS } from '../data'

// ============================================================================
// TYPES
// ============================================================================

export interface FiltersContentProps {
  /** Content type (filters or tabs - they use same component) */
  contentType: Extract<ContentTypeId, 'filters' | 'tabs'>
  /** Called when selection changes */
  onChange?: (tabId: string) => void
  /** Slot position this content is rendered in */
  slotPosition: SlotPosition
  /** Additional className */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const FiltersContent: React.FC<FiltersContentProps> = ({
  contentType,
  onChange,
  slotPosition,
  className,
}) => {
  const { config, activeTab, setActiveTab } = useV3Context()

  // Get config based on content type
  const filtersConfig = contentType === 'tabs'
    ? config.contentConfigs.tabs
    : config.contentConfigs.filters

  const options = filtersConfig.options.length > 0
    ? filtersConfig.options
    : (contentType === 'tabs' ? DEFAULT_TAB_OPTIONS : DEFAULT_FILTER_OPTIONS)

  const defaultValue = filtersConfig.defaultValue || options[0]?.id || ''

  // Use context state if available, otherwise local state
  const selectedId = activeTab || defaultValue

  const handleSelect = useCallback(
    (tabId: string) => {
      setActiveTab(tabId)
      onChange?.(tabId)
    },
    [onChange, setActiveTab]
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
