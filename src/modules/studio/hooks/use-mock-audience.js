"use strict";
/**
 * Studio Module - Mock Audience Pagination Hook
 *
 * Simulates server-side pagination with delayed loading
 * for realistic infinite scroll testing.
 */
'use client';
/**
 * Studio Module - Mock Audience Pagination Hook
 *
 * Simulates server-side pagination with delayed loading
 * for realistic infinite scroll testing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMockAudience = void 0;
const react_1 = require("react");
const mock_users_1 = require("../data/mock-users");
const column_config_1 = require("../config/column-config");
// =============================================================================
// SORT COMPARATORS
// =============================================================================
const SORT_COMPARATORS = {
    NAME: (a, b) => a.name.localeCompare(b.name),
    MESSAGES: (a, b) => a.messageCount - b.messageCount,
    LAST_INTERACTED: (a, b) => {
        const dateA = a.lastInteracted.getTime();
        const dateB = b.lastInteracted.getTime();
        return dateA - dateB;
    },
};
// =============================================================================
// HOOK
// =============================================================================
const useMockAudience = ({ pageSize = column_config_1.PAGE_SIZE, sortBy = 'LAST_INTERACTED', sortOrder = 'DESC', searchQuery, delay = 300, } = {}) => {
    const [loadedCount, setLoadedCount] = (0, react_1.useState)(pageSize);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isLoadingMore, setIsLoadingMore] = (0, react_1.useState)(false);
    const loadMoreRef = (0, react_1.useRef)(false);
    // Simulate initial load
    (0, react_1.useEffect)(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);
    // Reset when search/sort changes
    (0, react_1.useEffect)(() => {
        setLoadedCount(pageSize);
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);
        return () => clearTimeout(timer);
    }, [searchQuery, sortBy, sortOrder, pageSize, delay]);
    // Get sorted and filtered data
    const processedData = (0, react_1.useMemo)(() => {
        let data = [...mock_users_1.MOCK_USERS];
        // Apply search filter
        if (searchQuery && searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            data = data.filter((item) => item.name.toLowerCase().includes(query) ||
                item.email.toLowerCase().includes(query));
        }
        // Apply sort
        const comparator = SORT_COMPARATORS[sortBy];
        if (comparator) {
            data.sort((a, b) => {
                const result = comparator(a, b);
                return sortOrder === 'ASC' ? result : -result;
            });
        }
        return data;
    }, [searchQuery, sortBy, sortOrder]);
    // Calculate metrics from all users (not just loaded)
    const metrics = (0, react_1.useMemo)(() => (0, mock_users_1.calculateMetrics)(mock_users_1.MOCK_USERS), []);
    // Get current page of items
    const items = (0, react_1.useMemo)(() => {
        if (isLoading)
            return [];
        return processedData.slice(0, loadedCount);
    }, [processedData, loadedCount, isLoading]);
    const totalCount = processedData.length;
    const hasNextPage = loadedCount < totalCount;
    // Load more callback
    const loadMore = (0, react_1.useCallback)(async () => {
        if (loadMoreRef.current || !hasNextPage)
            return;
        loadMoreRef.current = true;
        setIsLoadingMore(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, delay));
        setLoadedCount((prev) => Math.min(prev + 25, totalCount));
        setIsLoadingMore(false);
        loadMoreRef.current = false;
    }, [hasNextPage, totalCount, delay]);
    // Reset pagination
    const reset = (0, react_1.useCallback)(() => {
        setLoadedCount(pageSize);
    }, [pageSize]);
    return {
        items,
        isLoading,
        isLoadingMore,
        totalCount,
        hasNextPage,
        loadMore,
        reset,
        metrics,
    };
};
exports.useMockAudience = useMockAudience;
//# sourceMappingURL=use-mock-audience.js.map