"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWithGraphQL = void 0;
/**
 * useTableWithGraphQL - Apollo GraphQL Data Adapter
 *
 * Integrates Apollo GraphQL queries with StickyDataTable, providing:
 * - Auto-skeleton on initial load
 * - Auto-skeleton on filter/variable changes
 * - Auto-skeleton on refetch
 * - Infinite scroll integration
 * - Minimum loading duration to prevent skeleton flash
 *
 * @module hooks/data-adapters/use-table-with-graphql
 *
 * @example Basic Usage
 * ```tsx
 * const { data, loading } = useGetPartnersQuery({ variables: { first: 50 } })
 *
 * const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
 *   data: data?.partners?.edges?.map(e => e.node) ?? [],
 *   loading,
 *   hasNextPage: data?.partners?.hasNextPage ?? false,
 *   fetchMore: () => fetchMore({ variables: { after: lastCursor } }),
 * })
 *
 * <StickyDataTable
 *   {...tableProps}
 *   columns={columns}
 *   renderCell={renderCell}
 *   infiniteScroll={infiniteScrollProps}
 * />
 * ```
 *
 * @example With Filters
 * ```tsx
 * const [filters, setFilters] = useState({ status: 'active' })
 *
 * const { tableProps } = useTableWithGraphQL({
 *   data: items,
 *   loading,
 *   filterDependencies: [filters], // Triggers skeleton when filters change
 * })
 * ```
 */
const react_1 = require("react");
const use_table_loading_state_1 = require("./use-table-loading-state");
// ============================================================================
// Hook Implementation
// ============================================================================
function useTableWithGraphQL({ data, loading, hasNextPage = false, fetchMore, filterDependencies = [], skeletonRowCount = 5, loadMoreThreshold = 200, minimumLoadingDuration = 300, showSkeletonOnMount = true, loadingDebounce = 50, onFetchMoreError, clearDataOnLoading = true, }) {
    // Core loading state management
    const { state, actions } = (0, use_table_loading_state_1.useTableLoadingState)({
        minimumLoadingDuration,
        showSkeletonOnMount,
        loadingDebounce,
    });
    // Infinite scroll state - simplified for reliable skeleton display
    const [isLoadingMore, setIsLoadingMore] = (0, react_1.useState)(false);
    const isLoadingMoreRef = (0, react_1.useRef)(false);
    // Track current hasNextPage value (ref avoids stale closure issues)
    const hasNextPageRef = (0, react_1.useRef)(hasNextPage);
    hasNextPageRef.current = hasNextPage;
    // Track previous values for change detection
    const prevLoadingRef = (0, react_1.useRef)(loading);
    const prevFilterDepsRef = (0, react_1.useRef)(filterDependencies);
    const isFirstRenderRef = (0, react_1.useRef)(true);
    const loadingCompleteRef = (0, react_1.useRef)(null);
    // Ref for handleLoadMore to enable recursive calls without stale closure
    const handleLoadMoreRef = (0, react_1.useRef)(() => { });
    // Track settle timer for preventing premature skeleton hide
    const loadingSettleTimerRef = (0, react_1.useRef)(null);
    // -------------------------------------------------------------------------
    // Handle Apollo loading state changes
    // -------------------------------------------------------------------------
    (0, react_1.useEffect)(() => {
        const wasLoading = prevLoadingRef.current;
        const isNowLoading = loading;
        // Detect loading started
        if (!wasLoading && isNowLoading) {
            // Don't trigger loading states for:
            // 1. Infinite scroll (handled separately)
            // 2. Background refetches when we already have data (prevents flash)
            // Note: Use ref instead of state to avoid race condition where Apollo's
            // loading state changes before React state update completes
            if (isLoadingMoreRef.current) {
                prevLoadingRef.current = loading;
                return;
            }
            // Only trigger loading for INITIAL load (no data yet)
            // Filter changes are handled by the filter dependency effect
            // This prevents Apollo background refetches from causing skeleton flash
            const hasData = data.length > 0;
            if (!hasData) {
                loadingCompleteRef.current = actions.startLoading('initial');
            }
            // Note: We intentionally don't trigger 'refetch' loading here
            // to avoid flashing on Apollo cache updates / background refetches
        }
        // Detect loading completed
        if (wasLoading && !isNowLoading) {
            // Mark initial data as loaded on first successful fetch
            if (!state.hasInitialData && data.length > 0) {
                actions.markInitialDataLoaded();
            }
            // Complete the loading state
            if (loadingCompleteRef.current) {
                loadingCompleteRef.current();
                loadingCompleteRef.current = null;
            }
        }
        prevLoadingRef.current = loading;
    }, [loading, data.length, state.hasInitialData, state.isFiltering, actions]);
    // -------------------------------------------------------------------------
    // Handle filter dependency changes
    // -------------------------------------------------------------------------
    (0, react_1.useEffect)(() => {
        // Skip first render
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            prevFilterDepsRef.current = filterDependencies;
            return;
        }
        // Check if filter dependencies changed
        const prevDeps = prevFilterDepsRef.current;
        const hasChanged = filterDependencies.some((dep, index) => dep !== prevDeps[index]);
        if (hasChanged && state.hasInitialData) {
            // Filter changed after initial load - show filter skeleton
            loadingCompleteRef.current = actions.startLoading('filter');
        }
        prevFilterDepsRef.current = filterDependencies;
    }, [filterDependencies, state.hasInitialData, actions]);
    // Cleanup loading complete callback when loading stops
    // Uses settle delay to prevent flash if loading restarts quickly
    (0, react_1.useEffect)(() => {
        // Clear any pending settle timer when loading state changes
        if (loadingSettleTimerRef.current) {
            clearTimeout(loadingSettleTimerRef.current);
            loadingSettleTimerRef.current = null;
        }
        if (!loading && loadingCompleteRef.current) {
            const callback = loadingCompleteRef.current;
            loadingCompleteRef.current = null;
            // Add small settle delay before completing loading
            // This prevents skeleton flash if loading restarts immediately
            const SETTLE_DELAY = 50; // ms
            loadingSettleTimerRef.current = setTimeout(() => {
                loadingSettleTimerRef.current = null;
                callback();
            }, SETTLE_DELAY);
        }
    }, [loading]);
    // Cleanup timer on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (loadingSettleTimerRef.current) {
                clearTimeout(loadingSettleTimerRef.current);
            }
        };
    }, []);
    // -------------------------------------------------------------------------
    // Infinite scroll handler - skeleton stays until hasNextPage=false
    // Auto-continues pagination when hasNextPage remains true after fetch
    // -------------------------------------------------------------------------
    const handleLoadMore = (0, react_1.useCallback)(async () => {
        // Guard: prevent concurrent loads
        if (!fetchMore || isLoadingMoreRef.current) {
            return;
        }
        // Set loading state
        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
        try {
            await fetchMore();
        }
        catch (error) {
            onFetchMoreError?.(error);
            // On error, release guard and stop loading
            isLoadingMoreRef.current = false;
            setIsLoadingMore(false);
            return;
        }
        // Release guard
        isLoadingMoreRef.current = false;
        // Auto-continue: if hasNextPage is still true, schedule next load
        // This handles rapid pagination when observer doesn't re-fire
        // Use setTimeout to allow React to render and update hasNextPageRef
        setTimeout(() => {
            if (hasNextPageRef.current && !isLoadingMoreRef.current) {
                // Use ref to call latest version (avoids stale closure)
                handleLoadMoreRef.current();
            }
            else if (!hasNextPageRef.current) {
                setIsLoadingMore(false);
            }
        }, 50);
    }, [fetchMore, onFetchMoreError]);
    // Keep ref updated with latest handleLoadMore
    handleLoadMoreRef.current = handleLoadMore;
    // Hide skeleton when pagination completes (hasNextPage becomes false)
    (0, react_1.useEffect)(() => {
        if (!hasNextPage && isLoadingMore) {
            setIsLoadingMore(false);
        }
    }, [hasNextPage, isLoadingMore]);
    // -------------------------------------------------------------------------
    // Manual refetch with skeleton
    // -------------------------------------------------------------------------
    const refetchWithSkeleton = (0, react_1.useCallback)(async (refetchFn) => {
        await actions.withLoading('refetch', refetchFn);
    }, [actions]);
    // -------------------------------------------------------------------------
    // Build infinite scroll config
    // -------------------------------------------------------------------------
    const infiniteScrollProps = fetchMore && hasNextPage !== undefined
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
    // Show FULL skeleton when:
    // 1. Initial loading (no data yet)
    // 2. Filter change in progress
    // 3. Refetch in progress with no data
    // Note: We no longer show full skeleton for batch loading - LoadMoreSkeleton handles that smoothly now
    const shouldShowSkeleton = (state.isLoading && (!state.hasInitialData || // Initial load
        state.isFiltering || // Filter change
        (state.isRefetching && data.length === 0) // Refetch with no data
    ));
    // When clearDataOnLoading is true (default), automatically clear data
    // during loading so skeleton rows appear. This makes the pattern foolproof.
    const effectiveData = clearDataOnLoading && shouldShowSkeleton ? [] : data;
    return {
        tableProps: {
            data: effectiveData,
            isLoading: shouldShowSkeleton,
        },
        // Expose original data for counts, exports, etc.
        rawData: data,
        infiniteScrollProps,
        loadingStates: {
            isLoading: state.isLoading,
            isInitialLoading: !state.hasInitialData && state.isLoading,
            isFiltering: state.isFiltering,
            isRefetching: state.isRefetching,
            isLoadingMore,
            isBatchLoading: isLoadingMore && hasNextPage, // True when actively paginating
            hasInitialData: state.hasInitialData,
        },
        refetchWithSkeleton,
    };
}
exports.useTableWithGraphQL = useTableWithGraphQL;
//# sourceMappingURL=use-table-with-graphql.js.map