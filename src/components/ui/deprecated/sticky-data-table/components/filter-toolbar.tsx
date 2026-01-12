'use client'

// =============================================================================
// Filter Toolbar
// =============================================================================
// Updated to use BaseUIMenu component for filter selection with:
// - Submenu-based category → value navigation
// - Built-in sliding animations and back button
// - Consistent with design system menu patterns
// =============================================================================

import * as React from 'react'
import { useCallback, useMemo } from 'react'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'
import { Button as AriaButton } from 'react-aria-components'
import { cx } from '@/components/utils/cx'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import { BaseUIMenu, type MenuItem, type MenuItemSubmenu, type MenuItemAction } from '@/components/ui/base/menu'

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
 * Props for FilterToolbar component
 */
interface FilterToolbarProps {
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
 * Active Filter Pill Component
 * Displays an active filter with remove button
 *
 * Styled to match Unified Control Panel V2:
 * - border-primary instead of ring-*
 * - Normal font (text-sm font-medium)
 */
const FilterPill: React.FC<{
  filter: ActiveFilter
  category?: FilterCategory
  onRemove: () => void
}> = ({ filter, category, onRemove }) => {
  const icon = category?.icon

  return (
    <div
      className={cx(
        'group inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
        'bg-primary border border-primary',
        'text-sm font-medium text-secondary',
        'transition-all duration-150 ease-out'
      )}
    >
      {icon && (
        <span className="text-quaternary">
          <HugeIcon icon={icon} size={16} strokeWidth={1.5} className="size-4" />
        </span>
      )}
      <span className="text-tertiary">{filter.displayLabel}</span>
      <span className="text-primary">{filter.displayValue}</span>
      <AriaButton
        onPress={onRemove}
        className={cx(
          'ml-0.5 -mr-0.5 rounded p-0.5',
          'text-quaternary hover:text-secondary hover:bg-secondary',
          'transition-colors duration-100',
          'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand'
        )}
      >
        <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
      </AriaButton>
    </div>
  )
}

/**
 * Convert filter categories to menu items for BaseUIMenu
 *
 * Maps FilterCategory[] to MenuItem[] with:
 * - Categories become submenu items
 * - Filter values become action items within submenus
 */
const useFilterMenuItems = (
  categories: FilterCategory[],
  onFilterAdd: (filter: Omit<ActiveFilter, 'id'>) => void
): MenuItem[] => {
  return useMemo(() => {
    return categories.map((category): MenuItemSubmenu => {
      const config = category.config
      let valueItems: MenuItemAction[] = []

      // Convert filter options to action items based on filter type
      switch (config.type) {
        case 'select': {
          const selectConfig = config as SelectFilterConfig
          valueItems = selectConfig.options.map((option): MenuItemAction => ({
            id: `${category.key}-${option.id}`,
            label: option.label,
            icon: option.icon as MenuItemAction['icon'],
            addon: option.count !== undefined ? (
              <span className="text-xs text-quaternary">{option.count}</span>
            ) : undefined,
            onClick: () => {
              onFilterAdd({
                categoryKey: category.key,
                operator: 'equals',
                value: option.id,
                displayLabel: category.label,
                displayValue: option.label,
              })
            },
          }))
          break
        }

        case 'date': {
          const dateConfig = config as DateFilterConfig
          valueItems = dateConfig.presets.map((preset): MenuItemAction => {
            const days = preset.days ?? 0
            return {
              id: `${category.key}-${preset.id}`,
              label: preset.label,
              onClick: () => {
                const filterDate = new Date()
                if (days !== 0) {
                  filterDate.setDate(filterDate.getDate() + days)
                }
                const operator: FilterOperator = days < 0 ? 'greater_than' : 'equals'
                onFilterAdd({
                  categoryKey: category.key,
                  operator,
                  value: filterDate.getTime(),
                  displayLabel: category.label,
                  displayValue: preset.label,
                })
              },
            }
          })
          break
        }

        case 'range': {
          const rangeConfig = config as RangeFilterConfig
          if (rangeConfig.presets && rangeConfig.presets.length > 0) {
            valueItems = rangeConfig.presets.map((preset): MenuItemAction => ({
              id: `${category.key}-${preset.id}`,
              label: preset.label,
              icon: preset.icon as MenuItemAction['icon'],
              onClick: () => {
                onFilterAdd({
                  categoryKey: category.key,
                  operator: 'between',
                  value: [preset.min, preset.max],
                  displayLabel: category.label,
                  displayValue: preset.label,
                })
              },
            }))
          }
          break
        }
      }

      return {
        id: category.key,
        type: 'submenu',
        label: category.label,
        description: category.description,
        icon: category.icon as MenuItemSubmenu['icon'],
        items: valueItems,
      }
    })
  }, [categories, onFilterAdd])
}

/**
 * FilterToolbar Component
 *
 * Provides a complete filter UI for the StickyDataTable including:
 * - "Add filter" button using BaseUIMenu with submenu navigation
 * - Built-in sliding animations and back button from menu component
 * - Active filter pills with remove functionality
 * - Clear all filters option
 *
 * @example
 * ```tsx
 * <FilterToolbar
 *   categories={filterCategories}
 *   filterState={filterState}
 *   onFilterAdd={addFilter}
 *   onFilterRemove={removeFilter}
 *   onFiltersClear={clearFilters}
 * />
 * ```
 */
export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  categories,
  filterState,
  onFilterAdd,
  onFilterRemove,
  onFiltersClear,
  className,
  showClearAll = true,
}) => {
  const getCategoryForFilter = useCallback(
    (filter: ActiveFilter) => categories.find((c) => c.key === filter.categoryKey),
    [categories]
  )

  // Convert filter categories to menu items
  const menuItems = useFilterMenuItems(categories, onFilterAdd)

  // Menu header styled exactly like submenu back button
  // Note: BaseUIMenu wraps header in px-1.5, so we use negative margins to span full width
  const menuHeader = (
    <>
      <div className="-mx-1.5 mb-1 flex items-center gap-2.5 rounded-xl corner-squircle px-2.5 py-1.5">
        <HugeIcon icon={FilterIcon} size={16} strokeWidth={2} className="text-tertiary shrink-0" />
        <span className="text-primary flex-1 truncate text-sm font-medium">Add a filter</span>
      </div>
      <div role="separator" className="bg-primary -mx-3 my-1 h-px opacity-50" />
    </>
  )

  // Trigger button for the menu
  const triggerButton = (
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
  )

  return (
    <div className={cx('flex flex-wrap items-center gap-3', className)}>
      {/* Add Filter Button - using BaseUIMenu (first element) */}
      <BaseUIMenu
        trigger={triggerButton}
        items={menuItems}
        align="start"
        side="bottom"
        sideOffset={8}
        width={240}
        variant="compact"
        header={menuHeader}
        appearance={{
          backgroundColor: 'primary',
          borderRadius: '2xl',
          shadow: '2xl',
          border: 'shine-1',
          cornerSquircle: true,
          gradient: 'subtle-depth-sm',
          gradientColor: 'secondary',
        }}
        slideTransition={{
          duration: 150,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        heightTransition={{
          duration: 200,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Active Filter Pills (to the right of Add button) */}
      {filterState.activeFilters.map((filter) => (
        <FilterPill
          key={filter.id}
          filter={filter}
          category={getCategoryForFilter(filter)}
          onRemove={() => onFilterRemove(filter.id)}
        />
      ))}

      {/* Clear All Button */}
      {showClearAll && filterState.hasFilters && (
        <AriaButton
          onPress={onFiltersClear}
          className={cx(
            'text-sm font-medium text-tertiary hover:text-secondary transition-colors',
            'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
          )}
        >
          Clear all
        </AriaButton>
      )}
    </div>
  )
}