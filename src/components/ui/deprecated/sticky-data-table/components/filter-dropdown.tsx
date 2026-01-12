/**
 * Filter Dropdown Component
 *
 * Uses RevealMenu from base-ui/menu to provide a nested menu interface
 * for selecting filters. Replaces the FilterToolbar popover with a more
 * elegant dropdown experience.
 *
 * @module sticky-data-table/components/filter-dropdown
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import { cx } from '@/components/utils/cx'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import { RevealMenu, type MenuItem } from '@/components/ui/base/menu'

import type {
  ActiveFilter,
  DateFilterConfig,
  DateRangePreset,
  FilterCategory,
  FilterOperator,
  FilterState,
  FilterValue,
  RangeFilterConfig,
  SelectFilterConfig,
} from '../filter-types'

/**
 * Props for FilterDropdown component
 */
interface FilterDropdownProps {
  /** Available filter categories */
  categories: FilterCategory[]
  /** Current filter state */
  filterState: FilterState
  /** Callback when a filter is added */
  onFilterAdd: (filter: Omit<ActiveFilter, 'id'>) => void
  /** Callback when a filter is removed */
  onFilterRemove: (filterId: string) => void
  /** Callback when all filters are cleared */
  onFiltersClear: () => void
  /** Custom class name */
  className?: string
  /** Show clear all button when filters are active */
  showClearAll?: boolean
}

/**
 * Helper to check if a value is a Hugeicon array
 */
const isHugeIconArray = (value: unknown): boolean => {
  return (
    Array.isArray(value) && value.length > 0 && Array.isArray(value[0]) && typeof value[0][0] === 'string'
  )
}

/**
 * Render an icon - handles both Hugeicon arrays and React components
 */
const renderIcon = (icon: unknown, size: number = 16, className?: string): React.ReactNode => {
  if (!icon) return null

  // If it's a Hugeicon array, wrap with HugeIcon component
  if (isHugeIconArray(icon)) {
    return <HugeIcon icon={icon} size={size} strokeWidth={1.5} className={className} />
  }

  // If it's a React component function, render it
  if (typeof icon === 'function') {
    const IconComponent = icon as React.FC<{ className?: string }>
    return <IconComponent className={className} />
  }

  return null
}

/**
 * Active Filter Pill Component
 * Displays an active filter with remove button
 */
const FilterPill: React.FC<{
  filter: ActiveFilter
  category?: FilterCategory
  onRemove: () => void
}> = ({ filter, category, onRemove }) => {
  return (
    <div
      className={cx(
        'group inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
        'bg-primary border border-primary',
        'text-sm font-medium text-secondary',
        'transition-all duration-150 ease-out'
      )}
    >
      {category?.icon && (
        <span className="text-quaternary">
          {renderIcon(category.icon, 16, 'size-4')}
        </span>
      )}
      <span className="text-tertiary">{filter.displayLabel}</span>
      <span className="text-primary">{filter.displayValue}</span>
      <button
        onClick={onRemove}
        className={cx(
          'ml-0.5 -mr-0.5 rounded p-0.5',
          'text-quaternary hover:text-secondary hover:bg-secondary',
          'transition-colors duration-100',
          'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand'
        )}
      >
        <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

/**
 * Group categories by their group property
 */
function groupCategories(categories: FilterCategory[]): Map<string, FilterCategory[]> {
  const groups = new Map<string, FilterCategory[]>()
  categories.forEach((cat) => {
    const group = cat.group || 'Filters'
    if (!groups.has(group)) {
      groups.set(group, [])
    }
    groups.get(group)!.push(cat)
  })
  return groups
}

/**
 * Convert filter categories to menu items with nested submenus
 * Filters items based on search query
 */
function convertCategoriesToMenuItems(
  categories: FilterCategory[],
  onFilterAdd: (filter: Omit<ActiveFilter, 'id'>) => void,
  searchQuery: string = ''
): MenuItem[] {
  const items: MenuItem[] = []

  // Filter categories based on search query
  let filteredCategories = categories
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredCategories = categories.filter(
      (cat) =>
        cat.label.toLowerCase().includes(query) ||
        cat.key.toLowerCase().includes(query) ||
        cat.description?.toLowerCase().includes(query)
    )
  }

  // Convert each category to a submenu item (no grouping)
  filteredCategories.forEach((category) => {
    const submenuItems = convertCategoryToMenuSubmenuItems(category, onFilterAdd, searchQuery)

    if (submenuItems.length > 0) {
      items.push({
        id: category.key,
        type: 'submenu',
        label: category.label,
        icon: category.icon as any,
        description: category.description,
        items: submenuItems,
      })
    }
  })

  return items
}

/**
 * Convert a single filter category to submenu items based on its config type
 * Filters options based on search query
 */
function convertCategoryToMenuSubmenuItems(
  category: FilterCategory,
  onFilterAdd: (filter: Omit<ActiveFilter, 'id'>) => void,
  searchQuery: string = ''
): MenuItem[] {
  const config = category.config
  const items: MenuItem[] = []

  // Generic filter function
  const filterBySearch = <T extends { id: string; label: string }>(options: T[]): T[] => {
    if (!searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter(
      (opt) => opt.label.toLowerCase().includes(query) || opt.id.toLowerCase().includes(query)
    )
  }

  switch (config.type) {
    case 'select': {
      const selectConfig = config as SelectFilterConfig
      const filteredOptions = filterBySearch(selectConfig.options)
      filteredOptions.forEach((option) => {
        items.push({
          id: `${category.key}-${option.id}`,
          label: option.label,
          icon: option.icon as any,
          onClick: () => {
            onFilterAdd({
              categoryKey: category.key,
              operator: 'equals',
              value: option.id,
              displayLabel: category.label,
              displayValue: option.label,
            })
          },
        })
      })
      break
    }

    case 'date': {
      const dateConfig = config as DateFilterConfig
      const filteredPresets = filterBySearch(dateConfig.presets)
      filteredPresets.forEach((preset) => {
        const days = preset.days ?? 0
        const filterDate = new Date()
        if (days !== 0) {
          filterDate.setDate(filterDate.getDate() + days)
        }

        items.push({
          id: `${category.key}-${preset.id}`,
          label: preset.label,
          icon: preset.icon as any,
          onClick: () => {
            const operator: FilterOperator = days < 0 ? 'greater_than' : 'equals'
            onFilterAdd({
              categoryKey: category.key,
              operator,
              value: filterDate.getTime(),
              displayLabel: category.label,
              displayValue: preset.label,
            })
          },
        })
      })
      break
    }

    case 'range': {
      const rangeConfig = config as RangeFilterConfig
      if (rangeConfig.presets && rangeConfig.presets.length > 0) {
        const filteredPresets = filterBySearch(rangeConfig.presets)
        filteredPresets.forEach((preset) => {
          items.push({
            id: `${category.key}-${preset.id}`,
            label: preset.label,
            onClick: () => {
              onFilterAdd({
                categoryKey: category.key,
                operator: 'between',
                value: [preset.min, preset.max],
                displayLabel: category.label,
                displayValue: preset.label,
              })
            },
          })
        })
      }
      break
    }

    default:
      // Unsupported filter types
      break
  }

  return items
}

/**
 * Filter Dropdown Component
 *
 * Provides a dropdown-based filter UI using RevealMenu:
 * - "Add filter" button with nested menu
 * - Active filter pills with remove functionality
 * - Clear all filters option
 */
export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  categories,
  filterState,
  onFilterAdd,
  onFilterRemove,
  onFiltersClear,
  className,
  showClearAll = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const getCategoryForFilter = useCallback(
    (filter: ActiveFilter) => categories.find((c) => c.key === filter.categoryKey),
    [categories]
  )

  // Convert categories to menu items with search filtering
  const menuItems = useMemo(() => {
    return convertCategoriesToMenuItems(categories, onFilterAdd, searchQuery)
  }, [categories, onFilterAdd, searchQuery])

  // Search input header
  const searchHeader = useMemo(
    () => (
      <div className="px-1.5 pb-2 border-b border-secondary">
        <div className="flex items-center gap-2 rounded-lg bg-secondary border border-secondary px-2.5 py-1.5">
          <HugeIcon icon={Search01Icon} size={14} strokeWidth={1.5} className="text-quaternary shrink-0" />
          <input
            type="text"
            placeholder="Search filters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-normal text-primary placeholder:text-quaternary outline-hidden"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>
      </div>
    ),
    [searchQuery]
  )

  // Handle dropdown close to reset search
  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSearchQuery('')
    }
  }, [])

  return (
    <div className={cx('flex flex-wrap items-center gap-2', className)}>
      {/* Active Filter Pills */}
      {filterState.activeFilters.map((filter) => (
        <FilterPill
          key={filter.id}
          filter={filter}
          category={getCategoryForFilter(filter)}
          onRemove={() => onFilterRemove(filter.id)}
        />
      ))}

      {/* Add Filter Menu */}
      <RevealMenu
        trigger={
          <button
            className={cx(
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
              'bg-primary border border-primary',
              'text-sm font-medium text-tertiary',
              'hover:bg-secondary hover:text-secondary transition-all duration-150',
              'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
            )}
          >
            <HugeIcon icon={Add01Icon} size={16} strokeWidth={2} />
            <span>Add a filter</span>
          </button>
        }
        items={menuItems}
        header={searchHeader}
        width={280}
        variant="default"
        side="bottom"
        align="start"
        onOpenChange={handleOpenChange}
        revealConfig={{
          duration: 300,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          direction: 'bottom',
          scaleStart: 0.15,
          scaleEnd: 1,
          contentAnimation: 'fade',
          contentDelay: 0,
        }}
      />

      {/* Clear All Button */}
      {showClearAll && filterState.hasFilters && (
        <button
          onClick={onFiltersClear}
          className={cx(
            'text-sm font-medium text-tertiary hover:text-secondary transition-colors',
            'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
          )}
        >
          Clear all
        </button>
      )}
    </div>
  )
}

