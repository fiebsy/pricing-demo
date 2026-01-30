/**
 * StickyDataTable V2 - Hooks Exports
 *
 * Central export point for all hooks.
 * Organized by responsibility:
 *
 * - core/     Main orchestration hook
 * - column/   Column visibility, configuration, FLIP animations
 * - scroll/   Scroll sync, wheel events, infinite scroll
 * - state/    Sort, selection, filters
 * - config/   Configuration persistence
 * - utils/    Arrow position, CSV export
 * - data-adapters/  Loading state adapters (GraphQL, async)
 *
 * @module hooks
 */

// Core - Main orchestration hook
export {
  useStickyDataTable,
  type UseStickyDataTableProps,
  type UseStickyDataTableReturn,
} from './core'

// Column - Column management hooks
export {
  useColumns,
  useColumnConfiguration,
  useColumnFlip,
  useAutoColumnFlip,
  supportsWAAPI,
  prefersReducedMotion,
  type UseColumnConfigurationOptions,
  type ColumnConfigurationState,
  type ColumnConfigurationActions,
  type UseColumnConfigurationReturn,
} from './column'

// Scroll - Scroll and viewport hooks
export {
  useScrollSync,
  useWheelRedirect,
  useInfiniteScroll,
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollReturn,
} from './scroll'

// State - Row data state hooks
export {
  useSort,
  useSelection,
  useTableFilters,
  type UseTableFiltersProps,
  type UseTableFiltersReturn,
} from './state'

// Config - Configuration persistence
export {
  useTableConfiguration,
  type UseTableConfigurationOptions,
  type UseTableConfigurationReturn,
} from './config'

// Utils - Utility hooks
export {
  useArrowPosition,
  useFilterBarPosition,
  useExportCsvSticky,
  type CsvExportableData,
  type FilterBarPosition,
} from './utils'

// Data adapters - Loading state management
export {
  useTableLoadingState,
  useTableWithGraphQL,
  useTableWithAsync,
  type TableLoadingStateOptions,
  type TableLoadingState,
  type TableLoadingActions,
  type UseTableLoadingStateReturn,
  type UseTableWithGraphQLOptions,
  type UseTableWithGraphQLReturn,
  type UseTableWithAsyncOptions,
  type UseTableWithAsyncReturn,
} from './data-adapters'
