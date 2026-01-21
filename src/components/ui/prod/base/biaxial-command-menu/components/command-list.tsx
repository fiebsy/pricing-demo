/**
 * Command List - Filterable Command List Content
 *
 * Displays grouped command items with filtering and keyboard navigation.
 * Uses internal state for highlighting since we're not using Combobox's portal.
 */

'use client'

import * as React from 'react'
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import { cn } from '@/lib/utils'
import { SEPARATOR_STYLES } from '@/components/ui/prod/base/menu/config'
import type {
  CommandGroup,
  CommandItem as CommandItemType,
  CommandItemAction,
} from '../core/types'
import { CommandItem } from './command-item'

// ============================================================================
// TYPES
// ============================================================================

export interface CommandListProps {
  /** Grouped command items */
  groups: CommandGroup[]
  /** Search filter value */
  filter: string
  /** Called when an item is selected */
  onSelect?: (item: CommandItemAction) => void
  /** Item height in pixels */
  itemHeight?: number
  /** Gap between items */
  itemGap?: number
  /** Top gap above first item in each group (px) */
  itemsTopGap?: number
  /** Empty state message */
  emptyMessage?: string
  // Item styling props
  /** Horizontal padding for items (px) */
  itemPaddingX?: number
  /** Vertical padding for items (px) */
  itemPaddingY?: number
  /** Border radius for items (px) */
  itemBorderRadius?: number
  /** Background for highlighted item */
  itemHighlightBackground?: string
  /** Background for hovered item */
  itemHoverBackground?: string
  /** Icon size (px) */
  itemIconSize?: number
  /** Gap between icon and text (px) */
  itemIconGap?: number
  /** Icon opacity (0-100) */
  itemIconOpacity?: number
}

export interface CommandListRef {
  /** Move highlight to next item */
  highlightNext: () => void
  /** Move highlight to previous item */
  highlightPrev: () => void
  /** Select the currently highlighted item */
  selectHighlighted: () => void
  /** Reset highlight to first item */
  resetHighlight: () => void
}

// ============================================================================
// HELPERS
// ============================================================================

/** Filter items based on search string */
function filterGroups(groups: CommandGroup[], filter: string): CommandGroup[] {
  if (!filter.trim()) return groups

  const lowerFilter = filter.toLowerCase()

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.type === 'separator') return false
        const action = item as CommandItemAction
        return (
          action.label.toLowerCase().includes(lowerFilter) ||
          action.description?.toLowerCase().includes(lowerFilter)
        )
      }),
    }))
    .filter((group) => group.items.length > 0)
}

/** Get flat list of action items for keyboard navigation */
function getFlatItems(groups: CommandGroup[]): CommandItemAction[] {
  return groups.flatMap((group) =>
    group.items.filter(
      (item): item is CommandItemAction => item.type !== 'separator'
    )
  )
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CommandList = React.forwardRef<CommandListRef, CommandListProps>(
  (
    {
      groups,
      filter,
      onSelect,
      itemHeight = 36,
      itemGap = 2,
      itemsTopGap = 0,
      emptyMessage = 'No results found',
      // Item styling
      itemPaddingX,
      itemPaddingY,
      itemBorderRadius,
      itemHighlightBackground,
      itemHoverBackground,
      itemIconSize,
      itemIconGap,
      itemIconOpacity,
    },
    ref
  ) => {
    const [highlightIndex, setHighlightIndex] = useState(0)
    const listRef = useRef<HTMLDivElement>(null)

    // Filter groups based on search
    const filteredGroups = useMemo(
      () => filterGroups(groups, filter),
      [groups, filter]
    )
    const flatItems = useMemo(
      () => getFlatItems(filteredGroups),
      [filteredGroups]
    )

    // Reset highlight when filter changes
    useEffect(() => {
      setHighlightIndex(0)
    }, [filter])

    // Scroll highlighted item into view
    useEffect(() => {
      if (!listRef.current) return
      const highlighted = listRef.current.querySelector(
        '[data-highlighted="true"]'
      )
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' })
      }
    }, [highlightIndex])

    // Keyboard navigation handlers
    const highlightNext = useCallback(() => {
      setHighlightIndex((prev) => Math.min(prev + 1, flatItems.length - 1))
    }, [flatItems.length])

    const highlightPrev = useCallback(() => {
      setHighlightIndex((prev) => Math.max(prev - 1, 0))
    }, [])

    const selectHighlighted = useCallback(() => {
      const item = flatItems[highlightIndex]
      if (item && !item.disabled) {
        onSelect?.(item)
        item.onSelect?.()
      }
    }, [flatItems, highlightIndex, onSelect])

    const resetHighlight = useCallback(() => {
      setHighlightIndex(0)
    }, [])

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      highlightNext,
      highlightPrev,
      selectHighlighted,
      resetHighlight,
    }))

    // Empty state
    if (filteredGroups.length === 0) {
      return (
        <div
          className="flex items-center justify-center text-tertiary text-sm py-8"
          style={{ minHeight: 80 }}
        >
          {emptyMessage}
        </div>
      )
    }

    // Track item index across groups for highlighting
    let itemIndex = 0

    return (
      <div ref={listRef} role="listbox" className="h-full">
        {filteredGroups.map((group, groupIdx) => (
          <div key={group.id} className="flex flex-col" style={{ gap: itemGap }}>
            {/* Group Label */}
            <div
              className={cn(
                'px-2.5 pt-2 pb-1',
                'text-xs font-medium text-tertiary'
              )}
              style={groupIdx === 0 && itemsTopGap > 0 ? { marginTop: itemsTopGap } : undefined}
            >
              {group.label}
            </div>

            {/* Group Items */}
            {group.items.map((item) => {
              if (item.type === 'separator') {
                return (
                  <div
                    key={item.id}
                    className={cn(
                      SEPARATOR_STYLES.base,
                      SEPARATOR_STYLES.fullWidth
                    )}
                    role="separator"
                  />
                )
              }

              const actionItem = item as CommandItemAction
              const currentIndex = itemIndex
              itemIndex++

              return (
                <div
                  key={actionItem.id}
                  data-highlighted={currentIndex === highlightIndex}
                >
                  <CommandItem
                    item={actionItem}
                    isHighlighted={currentIndex === highlightIndex}
                    onSelect={() => {
                      onSelect?.(actionItem)
                    }}
                    itemHeight={itemHeight}
                    itemPaddingX={itemPaddingX}
                    itemPaddingY={itemPaddingY}
                    itemBorderRadius={itemBorderRadius}
                    itemHighlightBackground={itemHighlightBackground}
                    itemHoverBackground={itemHoverBackground}
                    itemIconSize={itemIconSize}
                    itemIconGap={itemIconGap}
                    itemIconOpacity={itemIconOpacity}
                  />
                </div>
              )
            })}

            {/* Group Separator (except last group) */}
            {groupIdx < filteredGroups.length - 1 && (
              <div
                className={cn(
                  SEPARATOR_STYLES.base,
                  SEPARATOR_STYLES.fullWidth,
                  'mt-1'
                )}
                role="separator"
              />
            )}
          </div>
        ))}
      </div>
    )
  }
)

CommandList.displayName = 'CommandList'
