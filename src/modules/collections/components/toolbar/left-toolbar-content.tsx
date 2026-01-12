/**
 * LeftToolbarContent Component
 *
 * Filter menu and active filter chips for the toolbar.
 * Uses prod/base/filter components with hardened styling.
 */

'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button as AriaButton } from 'react-aria-components'
import { cn } from '@/lib/utils'

import {
  FilterMenu,
  FilterTrigger,
  FilterSelectChip,
  type FilterOption,
} from '@/components/ui/prod/base/filter'

import {
  RISK_FILTER_ITEMS,
  FILTER_ICONS,
} from '../../config/filter-config'

import type { ActiveFilter } from '../../types'

// =============================================================================
// FILTER OPTIONS BY CATEGORY
// =============================================================================

const FILTER_OPTIONS_BY_CATEGORY: Record<ActiveFilter['category'], FilterOption[]> = {
  Status: [
    { id: 'status-collections', label: 'Collections' },
    { id: 'status-clawback', label: 'Last Chance' },
    { id: 'status-settled', label: 'Clawed back' },
  ],
  Outcome: [
    { id: 'outcome-defaulted', label: 'Defaulted' },
    { id: 'outcome-canceled', label: 'Canceled' },
    { id: 'outcome-chargeback', label: 'Chargeback' },
  ],
  Urgency: [
    { id: 'urgency-critical', label: 'Critical (0-3 days)' },
    { id: 'urgency-warning', label: 'Warning (4-7 days)' },
    { id: 'urgency-safe', label: 'Safe (8+ days)' },
  ],
  Balance: [
    { id: 'balance-high', label: '>$500' },
    { id: 'balance-medium', label: '$100-500' },
    { id: 'balance-low', label: '<$100' },
  ],
  Route: [
    { id: 'route-servicing', label: 'PAC' },
    { id: 'route-funding', label: 'Upfront' },
  ],
}

// =============================================================================
// CONSTANTS
// =============================================================================

const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

// =============================================================================
// TYPES
// =============================================================================

export interface LeftToolbarContentProps {
  /** Currently active filters */
  activeFilters: ActiveFilter[]
  /** Callback when a filter is selected from the menu */
  onFilterSelect: (filterId: string) => void
  /** Callback when a filter value is changed via the chip dropdown */
  onFilterChange: (oldFilterId: string, newFilterId: string) => void
  /** Callback when a filter chip is removed */
  onFilterRemove: (filterId: string) => void
  /** Callback to clear all filters */
  onFiltersClear: () => void
  /** Optional className */
  className?: string
}

// =============================================================================
// CLEAR ALL BUTTON CONFIG
// =============================================================================

interface ClearAllConfig {
  /** Duration of the opacity fade in (ms). Default: 150 */
  fadeDuration: number
  /** Delay before starting the fade when filters appear (ms). Default: 200 */
  appearDelay: number
}

const DEFAULT_CLEAR_ALL_CONFIG: ClearAllConfig = {
  fadeDuration: 150,
  appearDelay: 20,
}

// =============================================================================
// CLEAR ALL BUTTON (with delayed fade-in animation)
// =============================================================================

interface ClearAllButtonProps {
  onPress: () => void
  config?: Partial<ClearAllConfig>
}

const ClearAllButton: React.FC<ClearAllButtonProps> = ({ onPress, config }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { fadeDuration, appearDelay } = { ...DEFAULT_CLEAR_ALL_CONFIG, ...config }

  useEffect(() => {
    // Delay the appearance to coordinate with filter chip animation
    const timer = setTimeout(() => setIsVisible(true), appearDelay)
    return () => clearTimeout(timer)
  }, [appearDelay])

  return (
    <AriaButton
      onPress={onPress}
      className={cn(
        'text-sm font-medium text-tertiary hover:text-secondary transition-colors',
        'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${fadeDuration}ms ${EASING_EXPO_OUT}`,
      }}
    >
      Clear all
    </AriaButton>
  )
}

// =============================================================================
// FILTER SELECT CHIP CONFIG
// =============================================================================

const FILTER_SELECT_CHIP_CONFIG = {
  chipSize: 'sm' as const,
  chipRounded: 'full' as const,
  iconSize: 14,
  chipDuration: 175,
  revealMode: 'fade' as const,
  chipExpandAnimation: false,
  iconOpacity: 0.5,
  iconValueGap: 4,
  paddingLeft: 8,
  paddingRight: 6,
  menuDuration: 225,
  menuCollapseDuration: 125,
  contentFadeDuration: 75,
  contentFadeDelay: 0,
  minPanelWidth: 200,
  maxPanelHeight: 300,
  innerPadding: 4,
  itemHeight: 32,
  itemTextSize: 'xs' as const,
  itemGap: 2,
  borderRadius: 16,
  contentTopOffset: 0,
  topExtension: 6,
  showHeaderSeparator: true,
  squircleOnOpen: false,
  shadowOnExpandOnly: true,
  menuAnchor: 'left' as const,
  appearance: {
    borderRadius: '2xl' as const,
    shadow: '2xl' as const,
    shine: 'shine-3' as const,
    background: 'primary' as const,
    gradient: 'subtle-depth-lg' as const,
    gradientColor: 'tertiary' as const,
    squircle: false,
  },
}

// Hover trigger settings
const TRIGGER_MODE: 'click' | 'hover' = 'hover'
const HOVER_OPEN_DELAY = 100
const HOVER_CLOSE_DELAY = 75

// =============================================================================
// COMPONENT
// =============================================================================

export const LeftToolbarContent: React.FC<LeftToolbarContentProps> = ({
  activeFilters,
  onFilterSelect,
  onFilterChange,
  onFilterRemove,
  onFiltersClear,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Get disabled options for a filter (other filters in same category that are active)
  const getDisabledOptions = (filter: ActiveFilter): string[] => {
    return activeFilters
      .filter((f) => f.category === filter.category && f.id !== filter.id)
      .map((f) => f.id)
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {/* Filter Menu */}
      <FilterMenu
        trigger={
          <FilterTrigger
            isOpen={isMenuOpen}
            label="Filter"
            size="md"
            rounded="full"
            variant="default"
          />
        }
        items={RISK_FILTER_ITEMS}
        onFilterSelect={onFilterSelect}
        activeFilterIds={activeFilters.map((f) => f.id)}
        onOpenChange={setIsMenuOpen}
        align="start"
        side="bottom"
        width={240}
      />

      {/* Active Filter Chips - Now using FilterSelectChip */}
      {activeFilters.map((filter, index) => {
        const IconComponent = FILTER_ICONS[filter.category]
        const options = FILTER_OPTIONS_BY_CATEGORY[filter.category]
        const disabledOptions = getDisabledOptions(filter)

        return (
          <FilterSelectChip
            key={`filter-${index}-${filter.category}`}
            value={filter.id}
            options={options}
            disabledOptions={disabledOptions}
            icon={IconComponent}
            expandedLabel={filter.category}
            config={FILTER_SELECT_CHIP_CONFIG}
            onChange={(newFilterId) => onFilterChange(filter.id, newFilterId)}
            onRemove={() => onFilterRemove(filter.id)}
            triggerMode={TRIGGER_MODE}
            hoverOpenDelay={HOVER_OPEN_DELAY}
            hoverCloseDelay={HOVER_CLOSE_DELAY}
          />
        )
      })}

      {/* Clear All Button */}
      {activeFilters.length > 0 && (
        <ClearAllButton onPress={onFiltersClear} />
      )}
    </div>
  )
}

LeftToolbarContent.displayName = 'LeftToolbarContent'
