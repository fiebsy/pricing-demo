/**
 * FilterSelectChipStatic - Type Definitions
 *
 * Static filter chip system using Base UI Select.
 *
 * @module prod/base/filter/filter-select-chip-static/types
 */

import type * as React from 'react'

// ============================================================================
// ICON TYPES
// ============================================================================

export type IconComponent = React.ComponentType<{ className?: string }>

// ============================================================================
// FILTER DATA TYPES
// ============================================================================

export interface FilterOption {
  id: string
  label: string
  disabled?: boolean
}

export interface FilterChipData {
  id: string
  label: string
  icon?: IconComponent
  value: string
  options: FilterOption[]
}

// ============================================================================
// STYLE CONFIG
// ============================================================================

export type ChipGap = 'sm' | 'md' | 'lg'
export type ChipRoundness = 'md' | 'lg' | 'xl' | 'full'
export type ChipSize = 'sm' | 'md' | 'lg'

export interface StyleConfig {
  gap: ChipGap
  roundness: ChipRoundness
  size: ChipSize
}

export interface SizeConfig {
  height: number
  text: string
  padding: string
  iconSize: number
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface FilterSelectChipStaticProps {
  filters: FilterChipData[]
  onFilterChange?: (filterId: string, value: string) => void
  onFilterRemove?: (filterId: string) => void
  styleConfig?: Partial<StyleConfig>
  showDebug?: boolean
  className?: string
}

export interface FilterChipProps {
  filter: FilterChipData
  index: number
  styleConfig: StyleConfig
  onValueChange: (value: string) => void
  onRemove: () => void
  showDebug?: boolean
  allActiveValues?: Set<string>
}

export interface ChipTriggerProps {
  displayValue: string
  icon: IconComponent
  sizeConfig: SizeConfig
  isOpen: boolean
  roundnessClass: string
}

export interface ChipPopupProps {
  label: string
  options: FilterOption[]
  currentValue: string
  allActiveValues?: Set<string>
}

export interface OptionItemProps {
  option: FilterOption
  isSelected?: boolean
}

export interface RemoveButtonProps {
  filterLabel: string
  iconSize: number
  height: number
  onRemove: () => void
}
