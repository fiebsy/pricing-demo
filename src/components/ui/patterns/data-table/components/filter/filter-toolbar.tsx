'use client'

// =============================================================================
// Filter Toolbar V2
// =============================================================================
// Production-ready filter toolbar with built-in defaults.
// Uses the unified FilterConfig from config/filter.ts
//
// Features:
// - Submenu-based category → value navigation
// - Built-in sliding animations and back button
// - Configurable menu, trigger, and pill styling
// - Works out of the box with sensible defaults
// =============================================================================

import * as React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button as AriaButton } from 'react-aria-components'
import { cn } from '@/lib/utils'

// PROD Base UI imports (migrated from legacy-base-ui)
import {
  FilterMenu,
  FilterChip,
  FilterTrigger,
} from '@/components/ui/patterns/filter'
import type {
  MenuItemType,
  MenuItemSubmenu,
  MenuItemAction,
  ChipConfig,
} from '@/components/ui/patterns/filter'

import type {
  ActiveFilter,
  DateFilterConfig,
  FilterCategory,
  FilterConfig,
  FilterOperator,
  FilterState,
  RangeFilterConfig,
  SelectFilterConfig,
} from '../../types'

import {
  DEFAULT_FILTER_CONFIG,
  mergeFilterConfig,
  toMenuAppearanceConfig,
  type FilterToolbarConfig,
  type FilterTriggerConfig,
  type FilterPillConfig,
} from '../../config'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props for FilterToolbar component
 */
export interface FilterToolbarProps {
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
  /**
   * Optional configuration overrides
   * Merges with DEFAULT_FILTER_CONFIG - only specify what you want to change
   *
   * @example
   * ```tsx
   * // Just change menu width
   * config={{ menu: { width: 280 } }}
   *
   * // Use a preset
   * config={FILTER_PRESET_COMPACT}
   * ```
   */
  config?: Partial<FilterToolbarConfig>
  /** Custom class name */
  className?: string
  /** Show clear all button when filters are active */
  showClearAll?: boolean
}

// ============================================================================
// HELPER: Convert FilterPillConfig to PROD ChipConfig
// ============================================================================

/**
 * Maps FilterPillConfig size values to PROD ChipConfig size values
 * PROD sizes: 'xs' | 'sm' | 'md' | 'lg'
 */
function mapPillSizeToChipSize(size: FilterPillConfig['size']): ChipConfig['size'] {
  const sizeMap: Record<string, ChipConfig['size']> = {
    xs: 'xs',
    sm: 'sm',
    default: 'md',
    md: 'md',
    lg: 'lg',
    xl: 'lg',
  }
  return sizeMap[size] ?? 'md'
}

/**
 * Maps FilterPillConfig rounded values to PROD ChipConfig rounded values
 * PROD rounded: 'sm' | 'md' | 'lg' | 'full'
 */
function mapPillRoundedToChipRounded(rounded: FilterPillConfig['rounded']): ChipConfig['rounded'] {
  const roundedMap: Record<string, ChipConfig['rounded']> = {
    none: 'sm',
    sm: 'sm',
    default: 'md',
    md: 'md',
    lg: 'lg',
    xl: 'lg',
    full: 'full',
  }
  return roundedMap[rounded] ?? 'full'
}

/**
 * Convert FilterPillConfig to PROD ChipConfig
 * Includes visual styling and animation duration
 */
function toChipConfig(pill: FilterPillConfig): ChipConfig {
  return {
    size: mapPillSizeToChipSize(pill.size),
    rounded: mapPillRoundedToChipRounded(pill.rounded),
    iconSize: pill.iconSize,
    closeSize: pill.closeIconSize,
    iconOpacity: pill.leftIconOpacity / 100, // Convert 0-100 to 0-1
    iconValueGap: pill.iconValueGap,
    valueCloseGap: pill.itemGap,
    paddingLeft: pill.paddingLeft,
    paddingRight: pill.paddingRight,
    duration: pill.duration,
  }
}

// ============================================================================
// HOOK: Convert filter categories to menu items
// ============================================================================

const useFilterMenuItems = (
  categories: FilterCategory[],
  onFilterAdd: (filter: Omit<ActiveFilter, 'id'>) => void
): MenuItemType[] => {
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
            // Include count in label if available (PROD menu doesn't support addon prop)
            label: option.count !== undefined ? `${option.label} (${option.count})` : option.label,
            icon: option.icon as MenuItemAction['icon'],
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

// ============================================================================
// COMPONENT: ClearAllButton (with fade-in animation)
// ============================================================================

const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

const ClearAllButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AriaButton
      onPress={onPress}
      className={cn(
        'text-sm font-medium text-tertiary hover:text-secondary transition-colors',
        'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 200ms ${EASING_EXPO_OUT}`,
      }}
    >
      Clear all
    </AriaButton>
  )
}

// ============================================================================
// COMPONENT: FilterToolbar
// ============================================================================

/**
 * FilterToolbar Component
 *
 * Provides a complete filter UI for the StickyDataTable including:
 * - "Add filter" button using BaseUIMenu with submenu navigation
 * - Built-in sliding animations and back button from menu component
 * - Active filter pills with remove functionality
 * - Clear all filters option
 *
 * Uses DEFAULT_FILTER_CONFIG for all styling. Override via `config` prop.
 *
 * @example Basic usage (uses all defaults)
 * ```tsx
 * <FilterToolbar
 *   categories={filterCategories}
 *   filterState={filterState}
 *   onFilterAdd={addFilter}
 *   onFilterRemove={removeFilter}
 *   onFiltersClear={clearFilters}
 * />
 * ```
 *
 * @example With custom config
 * ```tsx
 * <FilterToolbar
 *   categories={filterCategories}
 *   filterState={filterState}
 *   onFilterAdd={addFilter}
 *   onFilterRemove={removeFilter}
 *   onFiltersClear={clearFilters}
 *   config={{
 *     menu: { width: 280 },
 *     pill: { shine: '2' }
 *   }}
 * />
 * ```
 *
 * @example Using a preset
 * ```tsx
 * import { FILTER_PRESET_COMPACT } from './config'
 *
 * <FilterToolbar
 *   {...props}
 *   config={FILTER_PRESET_COMPACT}
 * />
 * ```
 */
export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  categories,
  filterState,
  onFilterAdd,
  onFilterRemove,
  onFiltersClear,
  config: configOverrides,
  className,
  showClearAll = true,
}) => {
  // Track menu open state for trigger button animation
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Merge config with defaults - stable reference when configOverrides doesn't change
  const config = useMemo(
    () => mergeFilterConfig(DEFAULT_FILTER_CONFIG, configOverrides),
    [configOverrides]
  )

  // Convert to menu appearance config - stable reference
  const menuAppearance = useMemo(
    () => toMenuAppearanceConfig(config.menu),
    [config.menu]
  )

  // Convert to PROD chip config - stable reference
  const chipConfig = useMemo(
    () => toChipConfig(config.pill),
    [config.pill]
  )

  // Stable category lookup map
  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.key, c])),
    [categories]
  )

  // Convert filter categories to menu items
  const menuItems = useFilterMenuItems(categories, onFilterAdd)

  // Memoize trigger size/rounded to prevent object recreation
  const triggerSize = config.trigger.height >= 48 ? 'lg' : config.trigger.height >= 40 ? 'md' : 'sm'
  const triggerRounded = config.trigger.rounded === 'full' ? 'full' : 'lg'

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {/* Add Filter Button */}
      <FilterMenu
        trigger={
          <FilterTrigger
            isOpen={isMenuOpen}
            size={triggerSize}
            rounded={triggerRounded}
            variant="default"
          />
        }
        items={menuItems}
        align="start"
        side="bottom"
        width={config.menu.width}
        appearance={menuAppearance}
        onOpenChange={setIsMenuOpen}
      />

      {/* Active Filter Pills - inline callbacks are fine, React handles this efficiently */}
      {filterState.activeFilters.map((filter) => (
        <FilterChip
          key={filter.id}
          icon={categoryMap.get(filter.categoryKey)?.icon}
          value={filter.displayValue}
          config={chipConfig}
          onRemove={() => onFilterRemove(filter.id)}
        />
      ))}

      {/* Clear All Button */}
      {showClearAll && filterState.hasFilters && (
        <ClearAllButton onPress={onFiltersClear} />
      )}
    </div>
  )
}

FilterToolbar.displayName = 'FilterToolbar'
