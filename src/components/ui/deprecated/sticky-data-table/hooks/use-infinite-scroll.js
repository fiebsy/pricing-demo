"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInfiniteScroll = void 0;
/**
 * useInfiniteScroll Hook
 *
 * Universal hook for infinite scroll with automatic skeleton delay.
 * Handles loading state management and ensures skeleton is visible for a minimum duration.
 *
 * @module hooks/use-infinite-scroll
 *
 * @example
 * ```tsx
 * const { infiniteScrollProps, isLoadingMore } = useInfiniteScroll({
 *   hasNextPage,
 *   loadMore,
 *   skeletonRowCount: 10,
 *   minimumDelay: 250, // Default
 * })
 *
 * <StickyDataTable
 *   data={items}
 *   infiniteScroll={infiniteScrollProps}
 * />
 * ```
 */
const react_1 = require("react");
/**
 * Universal infinite scroll hook with automatic skeleton delay
 *
 * This hook abstracts the loading state management and delay logic,
 * making infinite scroll consistent across all tables.
 *
 * @example Basic usage
 * ```tsx
 * const { infiniteScrollProps } = useInfiniteScroll({
 *   hasNextPage,
 *   loadMore: fetchNextPage,
 * })
 *
 * <StickyDataTable
 *   data={items}
 *   columns={columns}
 *   infiniteScroll={infiniteScrollProps}
 * />
 * ```
 *
 * @example With custom delay and error handling
 * ```tsx
 * const { infiniteScrollProps, isLoadingMore } = useInfiniteScroll({
 *   hasNextPage,
 *   loadMore: fetchNextPage,
 *   skeletonRowCount: 10,
 *   minimumDelay: 300,
 *   onError: (err) => toast.error('Failed to load more'),
 * })
 * ```
 */
function useInfiniteScroll({ hasNextPage, loadMore, skeletonRowCount = 5, threshold = 200, minimumDelay = 250, onError, }) {
    const [isLoadingMore, setIsLoadingMore] = (0, react_1.useState)(false);
    const handleLoadMore = (0, react_1.useCallback)(async () => {
        // Guard: Don't load if already loading
        if (isLoadingMore)
            return;
        setIsLoadingMore(true);
        try {
            // Run minimum delay and loadMore in parallel
            // Skeleton stays visible for at least minimumDelay ms
            const loadPromise = Promise.resolve(loadMore());
            const delayPromise = minimumDelay > 0
                ? new Promise((resolve) => setTimeout(resolve, minimumDelay))
                : Promise.resolve();
            // Wait for both to complete
            await Promise.all([loadPromise, delayPromise]);
        }
        catch (error) {
            console.error('Failed to load more:', error);
            onError?.(error);
        }
        finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, loadMore, minimumDelay, onError]);
    const infiniteScrollProps = {
        hasNextPage,
        isLoadingMore,
        onLoadMore: handleLoadMore,
        skeletonRowCount,
        threshold,
    };
    return {
        infiniteScrollProps,
        isLoadingMore,
        triggerLoadMore: handleLoadMore,
    };
}
exports.useInfiniteScroll = useInfiniteScroll;
//# sourceMappingURL=use-infinite-scroll.js.map