/**
 * Expanding Search - Public API
 *
 * @module expanding-search
 */

// ============================================================================
// Main Component
// ============================================================================

export { ExpandingSearch } from './expanding-search'

// ============================================================================
// Sub-Components (for advanced composition)
// ============================================================================

export {
  ClearButton,
  SearchContainer,
  SearchIconButton,
  SearchInput,
} from './components'

// ============================================================================
// Hooks
// ============================================================================

export {
  useExpandingSearch,
  useSearchWithEmptyState,
  DEFAULT_SEARCH_STYLE,
} from './hooks'

// ============================================================================
// Utilities
// ============================================================================

export {
  getContentOpacity,
  getContentTransition,
  getContainerTransition,
  getAnimationStyles,
} from './utils'

// ============================================================================
// Configuration
// ============================================================================

export { EASING, OPACITY_FADE_RATIO, DEFAULT_PROPS } from './config'

// ============================================================================
// Types
// ============================================================================

export type {
  // Animation types
  RevealMode,
  HideMode,
  // Component props
  ExpandingSearchProps,
  SearchContainerProps,
  SearchIconButtonProps,
  SearchInputProps,
  ClearButtonProps,
  // Hook types
  UseExpandingSearchProps,
  UseExpandingSearchReturn,
  // Empty state types
  EmptyStateAction,
  EmptyStateConfig,
  SearchStyleConfig,
  UseSearchWithEmptyStateOptions,
  UseSearchWithEmptyStateReturn,
} from './types'

// Animation utility types
export type {
  AnimationState,
  AnimationConfig,
  AnimationStyles,
} from './utils'
