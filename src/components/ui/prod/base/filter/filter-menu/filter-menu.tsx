/**
 * Filter Menu - Main Component
 *
 * A derivative of the base Menu component specialized for filtering.
 * Adds filter-specific behavior:
 * - Default "Add a filter" trigger
 * - Default filter header
 * - Active filter tracking (selected state, activeCount badges)
 *
 * @module prod/base/filter/filter-menu/filter-menu
 */

'use client'

import React, { useMemo, useCallback } from 'react'

import { Menu } from '../../menu'
import type { MenuItemType, MenuItemAction, MenuAppearance, AnimationConfig, MenuSide, MenuAlign } from '../../menu'
import { FilterMenuHeader } from './filter-menu-header'
import { FilterTrigger } from '../filter-trigger'
import { DEFAULT_FILTER_ITEMS } from './default-items'

// ============================================================================
// Types
// ============================================================================

export interface FilterMenuProps {
  /** Menu items to display */
  items?: MenuItemType[]
  /** Callback when filter is selected */
  onFilterSelect?: (filterId: string) => void
  /** IDs of active filters (shows checkmarks/badges) */
  activeFilterIds?: string[]
  /** Custom trigger element */
  trigger?: React.ReactNode
  /** Custom header content (only shown if noHeader is false) */
  header?: React.ReactNode
  /**
   * Disable header on main menu (default: true)
   * Note: Submenu back button always shows for navigation
   */
  noHeader?: boolean
  /** Menu width in pixels */
  width?: number
  /** Position relative to trigger */
  side?: MenuSide
  /** Alignment relative to trigger */
  align?: MenuAlign
  /** Offset from trigger (pixels) */
  sideOffset?: number
  /** Offset along alignment axis (pixels) */
  alignOffset?: number
  /** Callback when menu opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Appearance overrides */
  appearance?: MenuAppearance
  /** Animation configuration */
  animation?: AnimationConfig
  /** Additional className for popup */
  className?: string
}

// ============================================================================
// Item Transformation
// ============================================================================

/**
 * Transform items to inject selected state and onClick wrappers
 * based on activeFilterIds and onFilterSelect callback
 */
function transformItemsWithFilterState(
  items: MenuItemType[],
  activeIdsSet: Set<string>,
  onFilterSelect?: (filterId: string) => void
): MenuItemType[] {
  return items.map((item) => {
    if (item.type === 'separator' || item.type === 'label' || item.type === 'checkbox') {
      return item
    }

    if (item.type === 'submenu') {
      let activeCount = 0
      const wrappedSubItems = item.items.map((subItem) => {
        if (subItem.type === 'separator' || subItem.type === 'label' || subItem.type === 'submenu' || subItem.type === 'checkbox') {
          return subItem
        }
        const isSelected = activeIdsSet.has(subItem.id)
        if (isSelected) activeCount++
        return {
          ...subItem,
          selected: isSelected,
          onClick: () => {
            subItem.onClick?.()
            onFilterSelect?.(subItem.id)
          },
        }
      })
      return { ...item, items: wrappedSubItems, activeCount }
    }

    // Action item
    const isSelected = activeIdsSet.has(item.id)
    return {
      ...item,
      selected: isSelected,
      onClick: () => {
        item.onClick?.()
        onFilterSelect?.(item.id)
      },
    }
  })
}

// ============================================================================
// Component
// ============================================================================

/**
 * FilterMenu - Filter-specific menu component
 *
 * Built on top of the base Menu component, adds:
 * - Default "Add a filter" trigger
 * - Default filter header with filter icon
 * - Active filter tracking (checkmarks, badges)
 * - onFilterSelect callback for filter toggling
 */
export const FilterMenu: React.FC<FilterMenuProps> = ({
  items = DEFAULT_FILTER_ITEMS,
  onFilterSelect,
  activeFilterIds = [],
  trigger,
  header,
  noHeader = true,  // Default: no header on main menu (submenu back button still shows)
  width,
  side,
  align,
  sideOffset,
  alignOffset,
  onOpenChange,
  appearance,
  animation,
  className,
}) => {
  // Track open state for trigger styling
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }, [onOpenChange])

  // Create set for O(1) lookup
  const activeIdsSet = useMemo(
    () => new Set(activeFilterIds),
    [activeFilterIds]
  )

  // Transform items to inject selected state and onClick wrappers
  const wrappedItems = useMemo(
    () => transformItemsWithFilterState(items, activeIdsSet, onFilterSelect),
    [items, activeIdsSet, onFilterSelect]
  )

  // Default trigger if not provided
  const resolvedTrigger = trigger ?? <FilterTrigger isOpen={isOpen} />

  // Default header if not disabled
  const resolvedHeader = noHeader ? undefined : (header ?? <FilterMenuHeader />)

  return (
    <Menu
      items={wrappedItems}
      trigger={resolvedTrigger}
      header={resolvedHeader}
      width={width}
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      onOpenChange={handleOpenChange}
      appearance={appearance}
      animation={animation}
      className={className}
    />
  )
}

FilterMenu.displayName = 'FilterMenu'
