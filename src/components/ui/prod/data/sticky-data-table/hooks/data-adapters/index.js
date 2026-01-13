"use strict";
/**
 * Data Adapters for StickyDataTable
 *
 * These hooks provide automatic skeleton/loading state management
 * for different data fetching patterns.
 *
 * ## Available Adapters
 *
 * ### useTableWithGraphQL
 * For Apollo GraphQL queries. Auto-detects loading state changes and
 * filter dependency updates.
 *
 * ```tsx
 * const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
 *   data: queryData,
 *   loading: queryLoading,
 *   hasNextPage,
 *   fetchMore,
 *   filterDependencies: [statusFilter, searchTerm],
 * })
 *
 * <StickyDataTable {...tableProps} infiniteScroll={infiniteScrollProps} />
 * ```
 *
 * ### useTableWithAsync
 * For generic async data (fetch, axios, REST APIs).
 * Provides fetch wrappers that automatically manage loading states.
 *
 * ```tsx
 * const { tableProps, fetchData, applyFilters } = useTableWithAsync<User>()
 *
 * useEffect(() => {
 *   fetchData(() => api.getUsers())
 * }, [])
 *
 * const handleFilter = (filters) => {
 *   applyFilters(() => api.getUsers(filters))
 * }
 *
 * <StickyDataTable {...tableProps} />
 * ```
 *
 * ### useTableLoadingState
 * Core loading state management hook. Use this to build custom adapters
 * for other data fetching libraries (React Query, SWR, etc.)
 *
 * ```tsx
 * const { state, actions } = useTableLoadingState()
 *
 * // Manual loading management
 * const complete = actions.startLoading('filter')
 * await doSomething()
 * complete()
 *
 * // Or use the wrapper
 * await actions.withLoading('filter', () => fetchData())
 * ```
 *
 * @module hooks/data-adapters
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWithAsync = exports.useTableWithGraphQL = exports.useTableLoadingState = void 0;
// Core loading state hook
var use_table_loading_state_1 = require("./use-table-loading-state");
Object.defineProperty(exports, "useTableLoadingState", { enumerable: true, get: function () { return use_table_loading_state_1.useTableLoadingState; } });
// Apollo GraphQL adapter
var use_table_with_graphql_1 = require("./use-table-with-graphql");
Object.defineProperty(exports, "useTableWithGraphQL", { enumerable: true, get: function () { return use_table_with_graphql_1.useTableWithGraphQL; } });
// Generic async adapter
var use_table_with_async_1 = require("./use-table-with-async");
Object.defineProperty(exports, "useTableWithAsync", { enumerable: true, get: function () { return use_table_with_async_1.useTableWithAsync; } });
//# sourceMappingURL=index.js.map