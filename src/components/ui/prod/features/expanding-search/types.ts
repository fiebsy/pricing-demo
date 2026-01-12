/**
 * Expanding Search - Type Definitions
 *
 * Consolidated types for the expanding search component and related hooks.
 *
 * @module expanding-search/types
 */

// ============================================================================
// Animation Types
// ============================================================================

/**
 * How content is revealed on expand:
 * - 'immediate': Fades in from the start, in parallel with width expansion
 * - 'fade': Fades in during the latter part of the width animation
 * - 'delay': Appears after timed delay matching duration
 * - 'sync': Waits for container transitionend event (true sync)
 */
export type RevealMode = 'immediate' | 'fade' | 'delay' | 'sync'

/**
 * How content is hidden on collapse:
 * - 'immediate': Fades out over collapseDuration with expo easing (matches open)
 * - 'instant': Content vanishes immediately (0ms)
 * - 'fade': Fades out over collapseDuration with ease-out
 */
export type HideMode = 'immediate' | 'instant' | 'fade'

// ============================================================================
// Component Props
// ============================================================================

export interface ExpandingSearchProps {
  /** Placeholder text for the input */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Called when search is submitted (Enter key) */
  onSubmit?: (value: string) => void
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Initial expanded state */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Width of collapsed state (icon only) in pixels */
  collapsedWidth?: number
  /** Width of expanded input in pixels */
  expandedWidth?: number
  /** Height of the component */
  height?: number
  /** Animation duration in ms (for expand) */
  duration?: number
  /** Collapse animation duration in ms (defaults to faster than expand) */
  collapseDuration?: number
  /** How content is revealed on expand */
  revealMode?: RevealMode
  /** How content is hidden on collapse */
  hideMode?: HideMode
  /** Additional className for the container */
  className?: string
  /** Whether to auto-focus input when expanded */
  autoFocus?: boolean
  /** Collapse when clicking outside */
  collapseOnBlur?: boolean
  /** Icon size in pixels */
  iconSize?: number
  /** Icon stroke width */
  iconStrokeWidth?: number
  /** Icon opacity (0-100) */
  iconOpacity?: number
}

// ============================================================================
// Sub-Component Props
// ============================================================================

export interface SearchContainerProps {
  isExpanded: boolean
  collapsedWidth: number
  expandedWidth: number
  height: number
  duration: number
  revealMode: RevealMode
  hideMode: HideMode
  collapseDuration: number
  className?: string
  onClick: () => void
  onTransitionEnd: (e: React.TransitionEvent) => void
  children: React.ReactNode
}

export interface SearchIconButtonProps {
  isExpanded: boolean
  collapsedWidth: number
  iconSize: number
  iconStrokeWidth: number
  iconOpacity: number
  onClick: () => void
}

export interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>
  isExpanded: boolean
  value: string
  placeholder: string
  collapsedWidth: number
  contentOpacity: number
  contentTransition: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

export interface ClearButtonProps {
  visible: boolean
  onClick: (e: React.MouseEvent) => void
}

// ============================================================================
// Hook Types
// ============================================================================

export interface UseExpandingSearchProps {
  value?: string
  expanded?: boolean
  defaultExpanded: boolean
  autoFocus: boolean
  collapseOnBlur: boolean
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onExpandedChange?: (expanded: boolean) => void
}

export interface UseExpandingSearchReturn {
  inputRef: React.RefObject<HTMLInputElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  isExpanded: boolean
  inputValue: string
  handleToggle: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleClear: (e: React.MouseEvent) => void
  handleContainerClick: () => void
}

// ============================================================================
// Empty State Integration Types
// ============================================================================

export interface EmptyStateAction {
  label: string
  onClick: () => void
}

export interface EmptyStateConfig {
  /** The search term to pass to the table (triggers noResultsState when truthy) */
  searchTerm: string
  /** Whether there are active filters */
  hasActiveFilters: boolean
  /** Title for the empty state */
  title: string
  /** Description for the empty state */
  description: string
  /** The action button config (adapts based on search/filter state) */
  action: EmptyStateAction | null
}

/** Style configuration for ExpandingSearch */
export interface SearchStyleConfig {
  /** Placeholder text */
  placeholder?: string
  /** Width when expanded */
  expandedWidth?: number
  /** Width when collapsed (icon only) */
  collapsedWidth?: number
  /** Height of the component */
  height?: number
  /** Animation duration in ms */
  duration?: number
  /** How content is revealed on expand */
  revealMode?: RevealMode
  /** How content is hidden on collapse */
  hideMode?: HideMode
  /** Collapse when clicking outside */
  collapseOnBlur?: boolean
  /** Additional className (e.g., 'shine-1' for glossy effect) */
  className?: string
}

export interface UseSearchWithEmptyStateOptions<TFilter = unknown> {
  /** Initial search term */
  initialSearchTerm?: string
  /** Initial expanded state */
  initialExpanded?: boolean
  /** External filter state (for integration with existing filter systems) */
  activeFilters?: TFilter[]
  /** Callback when filters should be cleared */
  onClearFilters?: () => void
  /** Custom empty state content */
  emptyStateContent?: {
    /** Title when no data exists (no search/filters applied) */
    emptyTitle?: string
    /** Description when no data exists */
    emptyDescription?: string
    /** Title when search/filters yield no results */
    noResultsTitle?: string
  }
  /** Item label for messages (e.g., "products", "orders") */
  itemLabel?: string
  /** Style configuration for ExpandingSearch (merged with defaults) */
  searchStyle?: SearchStyleConfig
}

export interface UseSearchWithEmptyStateReturn<TFilter = unknown> {
  // Search state
  searchTerm: string
  setSearchTerm: (value: string) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void

  // Filter integration
  hasActiveFilters: boolean
  activeFilters: TFilter[]

  // Clear handlers
  clearSearch: () => void
  clearFilters: () => void
  clearAll: () => void

  // Empty state config for table
  emptyStateConfig: EmptyStateConfig

  // Props to spread on ExpandingSearch (includes state + style)
  searchProps: {
    // State props
    value: string
    onChange: (value: string) => void
    expanded: boolean
    onExpandedChange: (expanded: boolean) => void
    // Style props
    placeholder: string
    expandedWidth: number
    collapsedWidth: number
    height: number
    duration: number
    revealMode: RevealMode
    hideMode: HideMode
    collapseOnBlur: boolean
    className: string
  }

  // Props to spread on StickyDataTable for empty states
  tableEmptyStateProps: {
    searchTerm: string
  }
}
