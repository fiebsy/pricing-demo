/**
 * StickyDataTable V2 - Hooks Exports
 *
 * Central export point for all hooks.
 *
 * @module hooks
 */

// Core functionality hooks
export { useScrollSync } from './use-scroll-sync'
export { useColumns } from './use-columns'
export { useSort } from './use-sort'
export { useSelection } from './use-selection'
export { useWheelRedirect } from './use-wheel-redirect'
export { useArrowPosition } from './use-arrow-position'
export {
  useInfiniteScroll,
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollReturn,
} from './use-infinite-scroll'

// Column configuration hook (centralized state management)
export {
  useColumnConfiguration,
  type UseColumnConfigurationOptions,
  type ColumnConfigurationState,
  type ColumnConfigurationActions,
  type UseColumnConfigurationReturn,
} from './use-column-configuration'

// Main orchestration hook (tsx for JSX support in loading indicator)
export {
  useStickyDataTable,
  type UseStickyDataTableProps,
  type UseStickyDataTableReturn,
} from './use-sticky-data-table'

// FLIP animation hook for smooth column transitions
export {
  useColumnFlip,
  supportsWAAPI,
  prefersReducedMotion,
} from './use-column-flip'

// Auto-FLIP hook (automatic detection and animation)
export { useAutoColumnFlip } from './use-auto-column-flip'

// Table configuration hook (unified config management)
export {
  useTableConfiguration,
  type UseTableConfigurationOptions,
  type UseTableConfigurationReturn,
} from './use-table-configuration'

// Data adapters for automatic skeleton/loading management
export {
  // Core loading state hook (for building custom adapters)
  useTableLoadingState,
  type TableLoadingStateOptions,
  type TableLoadingState,
  type TableLoadingActions,
  type UseTableLoadingStateReturn,
  // Apollo GraphQL adapter
  useTableWithGraphQL,
  type UseTableWithGraphQLOptions,
  type UseTableWithGraphQLReturn,
  // Generic async adapter (fetch, axios, etc.)
  useTableWithAsync,
  type UseTableWithAsyncOptions,
  type UseTableWithAsyncReturn,
} from './data-adapters'
