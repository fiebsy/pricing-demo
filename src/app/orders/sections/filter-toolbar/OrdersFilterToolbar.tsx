/**
 * Orders Filter Toolbar
 *
 * Wrapper component for StackingNav and ExpandingSearch.
 * Provides the filtering UI for the orders table.
 */

import {
  StackingNav,
  DEFAULT_STYLE_CONFIG,
  type ActivePath,
} from '@/components/ui/features/stacking-nav'
import { ExpandingSearch } from '@/components/ui/deprecated/expanding-search'
import { NAV_ITEMS } from './nav-items'

// =============================================================================
// TYPES
// =============================================================================

export interface OrdersFilterToolbarProps {
  /** Current navigation path */
  currentPath: ActivePath
  /** Search query string */
  searchQuery: string
  /** Whether search is expanded */
  searchExpanded: boolean
  /** Reset key for StackingNav */
  resetKey: number
  /** Callback when navigation selection changes */
  onSelectionChange: (path: ActivePath) => void
  /** Callback to reset filters */
  onReset: () => void
  /** Callback when search query changes */
  onSearchChange: (query: string) => void
  /** Callback when search expansion state changes */
  onSearchExpandedChange: (expanded: boolean) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OrdersFilterToolbar({
  searchQuery,
  searchExpanded,
  resetKey,
  onSelectionChange,
  onReset,
  onSearchChange,
  onSearchExpandedChange,
}: OrdersFilterToolbarProps) {
  return {
    leftToolbar: (
      <StackingNav
        key={resetKey}
        items={NAV_ITEMS}
        styleConfig={{ ...DEFAULT_STYLE_CONFIG, buttonSize: 'sm', gap: 'sm' }}
        onReset={onReset}
        onSelectionChange={onSelectionChange}
        className="!min-h-0"
      />
    ),
    rightToolbar: (
      <ExpandingSearch
        value={searchQuery}
        onChange={onSearchChange}
        expanded={searchExpanded}
        onExpandedChange={onSearchExpandedChange}
        placeholder="Search orders..."
        expandedWidth={200}
        collapsedWidth={40}
        height={40}
        duration={200}
        className="shine-1"
      />
    ),
  }
}

// =============================================================================
// STANDALONE COMPONENTS (for direct use)
// =============================================================================

export interface StackingNavWrapperProps {
  resetKey: number
  onSelectionChange: (path: ActivePath) => void
  onReset: () => void
}

export function StackingNavWrapper({
  resetKey,
  onSelectionChange,
  onReset,
}: StackingNavWrapperProps) {
  return (
    <StackingNav
      key={resetKey}
      items={NAV_ITEMS}
      styleConfig={{ ...DEFAULT_STYLE_CONFIG, buttonSize: 'sm', gap: 'sm' }}
      onReset={onReset}
      onSelectionChange={onSelectionChange}
      className="!min-h-0"
    />
  )
}

export interface SearchWrapperProps {
  searchQuery: string
  searchExpanded: boolean
  onSearchChange: (query: string) => void
  onSearchExpandedChange: (expanded: boolean) => void
}

export function SearchWrapper({
  searchQuery,
  searchExpanded,
  onSearchChange,
  onSearchExpandedChange,
}: SearchWrapperProps) {
  return (
    <ExpandingSearch
      value={searchQuery}
      onChange={onSearchChange}
      expanded={searchExpanded}
      onExpandedChange={onSearchExpandedChange}
      placeholder="Search orders..."
      expandedWidth={200}
      collapsedWidth={40}
      height={40}
      duration={200}
      className="shine-1"
    />
  )
}
