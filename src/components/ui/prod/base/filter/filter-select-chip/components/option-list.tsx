/**
 * OptionList - Selectable Options with Checkmarks
 *
 * Displays filter options with checkmarks on selected items.
 * Provides keyboard navigation via imperative handle.
 *
 * @module prod/base/filter/filter-select-chip/components/option-list
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useMemo, useEffect, useRef, useImperativeHandle } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import {
  MENU_ITEM_STYLES,
  INTERACTIVE_STATES,
} from '@/components/ui/prod/base/menu/config'
import type { FilterOption, OptionListProps, OptionListRef } from '../types'

// ============================================================================
// TEXT SIZE CLASSES
// ============================================================================

const TEXT_SIZE_CLASSES: Record<'xs' | 'sm' | 'md', string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
}

// ============================================================================
// COMPONENT
// ============================================================================

export const OptionList = React.forwardRef<OptionListRef, OptionListProps>(
  (
    {
      options,
      selectedId,
      onSelect,
      itemHeight = 32,
      itemTextSize = 'sm',
      itemGap = 2,
      maxHeight = 260,
      itemSquircle = true,
    },
    ref
  ) => {
    // Find initial highlight index based on selected item
    const initialIndex = useMemo(() => {
      const idx = options.findIndex((o) => o.id === selectedId)
      return idx >= 0 ? idx : 0
    }, [options, selectedId])

    const [highlightIndex, setHighlightIndex] = useState(initialIndex)
    const listRef = useRef<HTMLDivElement>(null)

    // Get only non-disabled options for keyboard navigation
    const navigableOptions = useMemo(
      () => options.filter((o) => !o.disabled),
      [options]
    )

    // Scroll highlighted item into view
    useEffect(() => {
      if (!listRef.current) return
      const highlighted = listRef.current.querySelector('[data-highlighted="true"]')
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' })
      }
    }, [highlightIndex])

    // Keyboard navigation handlers
    const highlightNext = useCallback(() => {
      setHighlightIndex((prev) => Math.min(prev + 1, navigableOptions.length - 1))
    }, [navigableOptions.length])

    const highlightPrev = useCallback(() => {
      setHighlightIndex((prev) => Math.max(prev - 1, 0))
    }, [])

    const selectHighlighted = useCallback(() => {
      const option = navigableOptions[highlightIndex]
      if (option && !option.disabled) {
        onSelect(option.id)
      }
    }, [navigableOptions, highlightIndex, onSelect])

    const resetHighlight = useCallback(() => {
      const idx = navigableOptions.findIndex((o) => o.id === selectedId)
      setHighlightIndex(idx >= 0 ? idx : 0)
    }, [navigableOptions, selectedId])

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      highlightNext,
      highlightPrev,
      selectHighlighted,
      resetHighlight,
    }))

    return (
      <div
        ref={listRef}
        role="listbox"
        className="overflow-y-auto flex flex-col"
        style={{ maxHeight, gap: itemGap }}
      >
        {options.map((option) => {
          const isSelected = option.id === selectedId
          const navigableIndex = navigableOptions.findIndex((o) => o.id === option.id)
          const isHighlighted = navigableIndex === highlightIndex

          return (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={isSelected}
              aria-disabled={option.disabled}
              data-highlighted={isHighlighted}
              onClick={() => {
                if (!option.disabled) {
                  onSelect(option.id)
                }
              }}
              className={cn(
                'w-full flex items-center justify-between',
                MENU_ITEM_STYLES.paddingX,
                'transition-colors duration-150',
                'outline-none text-left',
                itemSquircle && 'corner-squircle',
                // Highlight state
                isHighlighted && 'bg-quaternary',
                // Interactive states
                !isHighlighted && INTERACTIVE_STATES.hover,
                // Disabled state
                option.disabled && 'opacity-50 pointer-events-none'
              )}
              style={{
                height: itemHeight,
                borderRadius: 'var(--menu-item-radius, 12px)',
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Option Icon (if provided) */}
                {option.icon != null ? (
                  <HugeIcon
                    icon={option.icon}
                    size={MENU_ITEM_STYLES.iconSize}
                    strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
                    className={cn(
                      MENU_ITEM_STYLES.iconColor,
                      MENU_ITEM_STYLES.iconOpacity,
                      'shrink-0'
                    )}
                  />
                ) : null}

                {/* Label */}
                <span
                  className={cn(
                    TEXT_SIZE_CLASSES[itemTextSize],
                    MENU_ITEM_STYLES.textWeight,
                    'text-primary truncate'
                  )}
                >
                  {option.label}
                </span>
              </div>

              {/* Checkmark for selected item or disabled (selected elsewhere) */}
              {(isSelected || option.disabled) && (
                <HugeIcon
                  icon={Tick02Icon}
                  size={16}
                  strokeWidth={2}
                  className={cn(
                    'shrink-0',
                    isSelected ? 'text-brand-primary' : 'text-tertiary'
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
    )
  }
)

OptionList.displayName = 'OptionList'
