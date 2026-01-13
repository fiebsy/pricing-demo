"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWithAsync = void 0;
/**
 * useTableWithAsync - Generic Async Data Adapter
 *
 * For use with any async data source (fetch, axios, custom APIs).
 * Provides automatic skeleton management for tables without GraphQL.
 *
 * @module hooks/data-adapters/use-table-with-async
 *
 * @example Basic Usage with fetch
 * ```tsx
 * const { tableProps, fetchData } = useTableWithAsync<User>()
 *
 * useEffect(() => {
 *   fetchData(async () => {
 *     const response = await fetch('/api/users')
 *     return response.json()
 *   })
 * }, [])
 *
 * <StickyDataTable {...tableProps} columns={columns} />
 * ```
 *
 * @example With Filters
 * ```tsx
 * const { tableProps, fetchData, applyFilters } = useTableWithAsync<User>()
 *
 * const handleFilterChange = (newFilters) => {
 *   applyFilters(async () => {
 *     const response = await fetch(`/api/users?status=${newFilters.status}`)
 *     return response.json()
 *   })
 * }
 * ```
 *
 * @example With Pagination
 * ```tsx
 * const { tableProps, infiniteScrollProps, loadMore, setHasNextPage } = useTableWithAsync<User>()
 *
 * // After initial fetch
 * setHasNextPage(response.hasMore)
 *
 * // Configure loadMore
 * loadMore.setHandler(async () => {
 *   const response = await fetch(`/api/users?page=${nextPage}`)
 *   const newData = await response.json()
 *   setHasNextPage(response.hasMore)
 *   return newData // Will be appended to existing data
 * })
 * ```
 */
const react_1 = require("react");
const use_table_loading_state_1 = require("./use-table-loading-state");
// ============================================================================
// Hook Implementation
// ============================================================================
function useTableWithAsync({ initialData = [], skeletonRowCount = 5, loadMoreThreshold = 200, minimumLoadingDuration = 300, showSkeletonOnMount = true, loadingDebounce = 50, onError, } = {}) {
    // Data state
    const [data, setData] = (0, react_1.useState)(initialData);
    const [hasNextPage, setHasNextPage] = (0, react_1.useState)(false);
    const [isLoadingMore, setIsLoadingMore] = (0, react_1.useState)(false);
    // Load more handler ref
    const loadMoreHandlerRef = (0, react_1.useRef)(null);
    // Core loading state management
    const { state, actions } = (0, use_table_loading_state_1.useTableLoadingState)({
        minimumLoadingDuration,
        showSkeletonOnMount: showSkeletonOnMount && initialData.length === 0,
        loadingDebounce,
    });
    // -------------------------------------------------------------------------
    // Fetch initial data
    // -------------------------------------------------------------------------
    const fetchData = (0, react_1.useCallback)(async (fetcher) => {
        try {
            const result = await actions.withLoading('initial', fetcher);
            setData(result);
            if (result.length > 0) {
                actions.markInitialDataLoaded();
            }
        }
        catch (error) {
            console.error('Failed to fetch data:', error);
            onError?.(error);
            throw error;
        }
    }, [actions, onError]);
    // -------------------------------------------------------------------------
    // Apply filters (replaces data)
    // -------------------------------------------------------------------------
    const applyFilters = (0, react_1.useCallback)(async (fetcher) => {
        try {
            const result = await actions.withLoading('filter', fetcher);
            setData(result);
        }
        catch (error) {
            console.error('Failed to apply filters:', error);
            onError?.(error);
            throw error;
        }
    }, [actions, onError]);
    // -------------------------------------------------------------------------
    // Refetch data
    // -------------------------------------------------------------------------
    const refetch = (0, react_1.useCallback)(async (fetcher) => {
        try {
            const result = await actions.withLoading('refetch', fetcher);
            setData(result);
        }
        catch (error) {
            console.error('Failed to refetch:', error);
            onError?.(error);
            throw error;
        }
    }, [actions, onError]);
    // -------------------------------------------------------------------------
    // Load more handler
    // -------------------------------------------------------------------------
    const handleLoadMore = (0, react_1.useCallback)(async () => {
        if (!loadMoreHandlerRef.current || isLoadingMore)
            return;
        setIsLoadingMore(true);
        const startTime = Date.now();
        try {
            const newData = await loadMoreHandlerRef.current();
            setData((prev) => [...prev, ...newData]);
        }
        catch (error) {
            console.error('Failed to load more:', error);
            onError?.(error);
        }
        finally {
            // Ensure minimum display time for skeleton
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minimumLoadingDuration - elapsed);
            if (remaining > 0) {
                setTimeout(() => setIsLoadingMore(false), remaining);
            }
            else {
                setIsLoadingMore(false);
            }
        }
    }, [isLoadingMore, minimumLoadingDuration, onError]);
    const setLoadMoreHandler = (0, react_1.useCallback)((handler) => {
        loadMoreHandlerRef.current = handler;
    }, []);
    // -------------------------------------------------------------------------
    // Reset state
    // -------------------------------------------------------------------------
    const reset = (0, react_1.useCallback)(() => {
        setData(initialData);
        setHasNextPage(false);
        setIsLoadingMore(false);
        loadMoreHandlerRef.current = null;
        actions.reset();
    }, [initialData, actions]);
    // -------------------------------------------------------------------------
    // Build infinite scroll config
    // -------------------------------------------------------------------------
    const infiniteScrollProps = loadMoreHandlerRef.current
        ? {
            hasNextPage,
            isLoadingMore,
            onLoadMore: handleLoadMore,
            skeletonRowCount,
            threshold: loadMoreThreshold,
        }
        : undefined;
    // -------------------------------------------------------------------------
    // Compute final loading state
    // -------------------------------------------------------------------------
    const shouldShowSkeleton = state.isLoading && (!state.hasInitialData ||
        state.isFiltering ||
        (state.isRefetching && data.length === 0));
    return {
        tableProps: {
            data,
            isLoading: shouldShowSkeleton,
        },
        infiniteScrollProps,
        data,
        setData,
        fetchData,
        applyFilters,
        refetch,
        loadMore: {
            setHandler: setLoadMoreHandler,
            trigger: handleLoadMore,
        },
        setHasNextPage,
        loadingStates: {
            isLoading: state.isLoading,
            isInitialLoading: !state.hasInitialData && state.isLoading,
            isFiltering: state.isFiltering,
            isRefetching: state.isRefetching,
            isLoadingMore,
            hasInitialData: state.hasInitialData,
        },
        reset,
    };
}
exports.useTableWithAsync = useTableWithAsync;
//# sourceMappingURL=use-table-with-async.js.map