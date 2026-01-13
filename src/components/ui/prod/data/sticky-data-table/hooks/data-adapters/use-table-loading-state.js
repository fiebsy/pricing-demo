"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableLoadingState = void 0;
/**
 * useTableLoadingState - Core Loading State Management
 *
 * Framework-agnostic hook that manages table loading states for:
 * - Initial data load
 * - Filter/search changes
 * - Refetch operations
 * - Infinite scroll (via integration with useInfiniteScroll)
 *
 * This is the foundation hook used by all data adapters.
 *
 * @module hooks/data-adapters/use-table-loading-state
 */
const react_1 = require("react");
// ============================================================================
// Hook Implementation
// ============================================================================
function useTableLoadingState(options = {}) {
    const { minimumLoadingDuration = 300, showSkeletonOnMount = true, loadingDebounce = 50, } = options;
    // Core state
    const [isInitialLoading, setIsInitialLoading] = (0, react_1.useState)(showSkeletonOnMount);
    const [isFiltering, setIsFiltering] = (0, react_1.useState)(false);
    const [isRefetching, setIsRefetching] = (0, react_1.useState)(false);
    const [hasInitialData, setHasInitialData] = (0, react_1.useState)(false);
    // Track active loading operations
    const loadingStartTimeRef = (0, react_1.useRef)(null);
    const debounceTimerRef = (0, react_1.useRef)(null);
    const activeLoadingTypeRef = (0, react_1.useRef)(null);
    // Cleanup on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);
    /**
     * Set loading state based on type
     */
    const setLoadingState = (0, react_1.useCallback)((type, value) => {
        switch (type) {
            case 'initial':
                setIsInitialLoading(value);
                break;
            case 'filter':
                setIsFiltering(value);
                break;
            case 'refetch':
                setIsRefetching(value);
                break;
        }
    }, []);
    /**
     * Start a loading operation
     * Returns a function to call when complete
     */
    const startLoading = (0, react_1.useCallback)((type) => {
        // Clear any pending debounce
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        // Track when loading started
        loadingStartTimeRef.current = Date.now();
        activeLoadingTypeRef.current = type;
        // Debounce the loading state to prevent flash
        debounceTimerRef.current = setTimeout(() => {
            setLoadingState(type, true);
        }, loadingDebounce);
        // Return completion function
        return () => {
            const startTime = loadingStartTimeRef.current;
            const elapsed = startTime ? Date.now() - startTime : 0;
            const remaining = Math.max(0, minimumLoadingDuration - elapsed);
            // Clear debounce timer if still pending
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
                debounceTimerRef.current = null;
            }
            // Ensure minimum display duration
            if (remaining > 0) {
                setTimeout(() => {
                    setLoadingState(type, false);
                    activeLoadingTypeRef.current = null;
                }, remaining);
            }
            else {
                setLoadingState(type, false);
                activeLoadingTypeRef.current = null;
            }
            loadingStartTimeRef.current = null;
        };
    }, [loadingDebounce, minimumLoadingDuration, setLoadingState]);
    /**
     * Wrap an async operation with loading state management
     */
    const withLoading = (0, react_1.useCallback)(async (type, operation) => {
        const complete = startLoading(type);
        try {
            const result = await operation();
            return result;
        }
        finally {
            complete();
        }
    }, [startLoading]);
    /**
     * Mark that initial data has been loaded
     */
    const markInitialDataLoaded = (0, react_1.useCallback)(() => {
        setHasInitialData(true);
        setIsInitialLoading(false);
    }, []);
    /**
     * Reset all states
     */
    const reset = (0, react_1.useCallback)(() => {
        setIsInitialLoading(showSkeletonOnMount);
        setIsFiltering(false);
        setIsRefetching(false);
        setHasInitialData(false);
        loadingStartTimeRef.current = null;
        activeLoadingTypeRef.current = null;
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = null;
        }
    }, [showSkeletonOnMount]);
    // Compute aggregate loading state
    const isLoading = isInitialLoading || isFiltering || isRefetching;
    return {
        state: {
            isLoading,
            hasInitialData,
            isFiltering,
            isRefetching,
        },
        actions: {
            startLoading,
            withLoading,
            markInitialDataLoaded,
            reset,
        },
    };
}
exports.useTableLoadingState = useTableLoadingState;
//# sourceMappingURL=use-table-loading-state.js.map