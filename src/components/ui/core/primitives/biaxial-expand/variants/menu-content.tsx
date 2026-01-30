/**
 * Biaxial Expand - Menu Content Variant
 *
 * Built-in bottom slot variant for command/action menus.
 * Provides scrollable list with keyboard navigation.
 */

'use client'

import * as React from 'react'
import { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import { useBiaxialExpand } from '../context'
import { filterGroups, getBackgroundClass } from '../utils'
import type {
  MenuContentProps,
  CommandGroup,
  CommandItemAction,
  BackgroundOption,
} from '../types'

// ============================================================================
// MENU CONTENT COMPONENT
// ============================================================================

export const MenuContent: React.FC<MenuContentProps> = ({
  groups,
  filter = '',
  onSelect,
  emptyMessage = 'No results found',
  className,
  itemHeight = 46,
  itemGap = 4,
  itemPaddingX = 10,
  itemPaddingY = 0,
  itemBorderRadius = 12,
  itemHighlightBackground = 'quaternary',
  itemHoverBackground = 'tertiary',
  itemIconSize = 16,
  itemIconGap = 8,
  itemIconOpacity = 60,
}) => {
  const { expanded, setExpanded, config } = useBiaxialExpand()
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const listRef = useRef<HTMLDivElement>(null)

  // Filter groups based on search
  const filteredGroups = useMemo(
    () => filterGroups(groups, filter),
    [groups, filter]
  )

  // Flatten items for keyboard navigation
  const flatItems = useMemo(() => {
    const items: CommandItemAction[] = []
    filteredGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.type !== 'separator' && !item.disabled) {
          items.push(item as CommandItemAction)
        }
      })
    })
    return items
  }, [filteredGroups])

  // Reset highlight when filter changes
  useEffect(() => {
    setHighlightedIndex(flatItems.length > 0 ? 0 : -1)
  }, [filter, flatItems.length])

  // Reset highlight when collapsed
  useEffect(() => {
    if (!expanded) {
      setHighlightedIndex(-1)
    }
  }, [expanded])

  // Keyboard navigation
  useEffect(() => {
    if (!expanded) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < flatItems.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : flatItems.length - 1
        )
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()
        const item = flatItems[highlightedIndex]
        if (item) {
          handleSelect(item)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expanded, highlightedIndex, flatItems])

  // Handle item selection
  const handleSelect = useCallback(
    (item: CommandItemAction) => {
      item.onSelect?.()
      onSelect?.(item)
      setExpanded(false)
    },
    [onSelect, setExpanded]
  )

  // Get flat index for an item
  const getFlatIndex = (groupIndex: number, itemIndex: number): number => {
    let index = 0
    for (let g = 0; g < groupIndex; g++) {
      index += filteredGroups[g].items.filter(
        (i) => i.type !== 'separator' && !('disabled' in i && i.disabled)
      ).length
    }
    // Add items within current group up to itemIndex
    for (let i = 0; i < itemIndex; i++) {
      const item = filteredGroups[groupIndex].items[i]
      if (item.type !== 'separator' && !('disabled' in item && item.disabled)) {
        index++
      }
    }
    return index
  }

  const isEmpty = filteredGroups.length === 0

  return (
    <ScrollArea.Root className={cn('relative h-full', className)}>
      <ScrollArea.Viewport className="h-full py-1">
        <ScrollArea.Content>
          <div className="px-1">
            {isEmpty ? (
              <div className="flex items-center justify-center h-20 text-sm text-tertiary">
                {emptyMessage}
              </div>
            ) : (
              filteredGroups.map((group, groupIndex) => (
                <MenuGroup
                  key={group.id}
                  group={group}
                  groupIndex={groupIndex}
                  highlightedIndex={highlightedIndex}
                  getFlatIndex={getFlatIndex}
                  onSelect={handleSelect}
                  onHighlight={setHighlightedIndex}
                  itemHeight={itemHeight}
                  itemGap={itemGap}
                  itemPaddingX={itemPaddingX}
                  itemPaddingY={itemPaddingY}
                  itemBorderRadius={itemBorderRadius}
                  itemHighlightBackground={itemHighlightBackground}
                  itemHoverBackground={itemHoverBackground}
                  itemIconSize={itemIconSize}
                  itemIconGap={itemIconGap}
                  itemIconOpacity={itemIconOpacity}
                />
              ))
            )}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>

      {/* Scrollbar */}
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="absolute top-0 right-0 bottom-0 flex w-2 touch-none select-none p-0.5 opacity-0 transition-opacity duration-150 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
      >
        <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

MenuContent.displayName = 'BiaxialExpand.MenuContent'

// ============================================================================
// MENU GROUP COMPONENT
// ============================================================================

interface MenuGroupProps {
  group: CommandGroup
  groupIndex: number
  highlightedIndex: number
  getFlatIndex: (groupIndex: number, itemIndex: number) => number
  onSelect: (item: CommandItemAction) => void
  onHighlight: (index: number) => void
  itemHeight: number
  itemGap: number
  itemPaddingX: number
  itemPaddingY: number
  itemBorderRadius: number
  itemHighlightBackground: BackgroundOption
  itemHoverBackground: BackgroundOption
  itemIconSize: number
  itemIconGap: number
  itemIconOpacity: number
}

const MenuGroup: React.FC<MenuGroupProps> = ({
  group,
  groupIndex,
  highlightedIndex,
  getFlatIndex,
  onSelect,
  onHighlight,
  itemHeight,
  itemGap,
  itemPaddingX,
  itemPaddingY,
  itemBorderRadius,
  itemHighlightBackground,
  itemHoverBackground,
  itemIconSize,
  itemIconGap,
  itemIconOpacity,
}) => {
  let itemCounter = 0

  return (
    <div className="mb-2 last:mb-0">
      {/* Group label */}
      <div className="px-3 py-2 text-xs font-medium text-tertiary uppercase tracking-wider">
        {group.label}
      </div>

      {/* Items */}
      <div className="flex flex-col" style={{ gap: itemGap }}>
        {group.items.map((item, itemIndex) => {
          if (item.type === 'separator') {
            return (
              <div
                key={item.id}
                className="h-px bg-primary mx-3 my-1"
              />
            )
          }

          const flatIndex = getFlatIndex(groupIndex, itemCounter)
          itemCounter++
          const isHighlighted = flatIndex === highlightedIndex

          return (
            <MenuItem
              key={item.id}
              item={item}
              isHighlighted={isHighlighted}
              onSelect={() => onSelect(item)}
              onMouseEnter={() => onHighlight(flatIndex)}
              height={itemHeight}
              paddingX={itemPaddingX}
              paddingY={itemPaddingY}
              borderRadius={itemBorderRadius}
              highlightBackground={itemHighlightBackground}
              hoverBackground={itemHoverBackground}
              iconSize={itemIconSize}
              iconGap={itemIconGap}
              iconOpacity={itemIconOpacity}
            />
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// MENU ITEM COMPONENT
// ============================================================================

interface MenuItemProps {
  item: CommandItemAction
  isHighlighted: boolean
  onSelect: () => void
  onMouseEnter: () => void
  height: number
  paddingX: number
  paddingY: number
  borderRadius: number
  highlightBackground: BackgroundOption
  hoverBackground: BackgroundOption
  iconSize: number
  iconGap: number
  iconOpacity: number
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isHighlighted,
  onSelect,
  onMouseEnter,
  height,
  paddingX,
  paddingY,
  borderRadius,
  highlightBackground,
  hoverBackground,
  iconSize,
  iconGap,
  iconOpacity,
}) => {
  const Icon = item.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      disabled={item.disabled}
      className={cn(
        'flex items-center w-full text-left',
        'transition-colors duration-100',
        'focus:outline-none',
        item.disabled && 'opacity-50 cursor-not-allowed',
        isHighlighted && getBackgroundClass(highlightBackground),
        !isHighlighted && `hover:${getBackgroundClass(hoverBackground)}`
      )}
      style={{
        height,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        borderRadius,
      }}
    >
      {/* Icon */}
      {Icon && (
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            marginRight: iconGap,
            opacity: iconOpacity / 100,
          }}
        >
          <HugeIcon
            icon={Icon}
            size={iconSize}
            className="text-secondary"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-primary truncate">{item.label}</div>
        {item.description && (
          <div className="text-xs text-tertiary truncate">
            {item.description}
          </div>
        )}
      </div>

      {/* Shortcut or navigation arrow */}
      {item.navigates ? (
        <HugeIcon
          icon={ArrowRight01Icon}
          size={14}
          className="shrink-0 text-tertiary ml-2"
        />
      ) : item.shortcut && item.shortcut.length > 0 ? (
        <div className="flex items-center gap-1 ml-2">
          {item.shortcut.map((key, i) => (
            <kbd
              key={i}
              className="px-1.5 py-0.5 text-[10px] font-medium text-tertiary bg-tertiary rounded"
            >
              {key}
            </kbd>
          ))}
        </div>
      ) : null}
    </button>
  )
}
