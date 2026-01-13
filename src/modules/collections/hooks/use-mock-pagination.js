"use strict";
/**
 * Collections Module - Mock Pagination Hook
 *
 * Simulates server-side pagination with delayed loading
 * for realistic infinite scroll testing.
 */
'use client';
/**
 * Collections Module - Mock Pagination Hook
 *
 * Simulates server-side pagination with delayed loading
 * for realistic infinite scroll testing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMockPagination = void 0;
const react_1 = require("react");
const mock_data_1 = require("../mock-data");
const column_config_1 = require("../config/column-config");
// =============================================================================
// SORT COMPARATORS
// =============================================================================
const SORT_COMPARATORS = {
    ID: (a, b) => a.id - b.id,
    REMAINING_BALANCE: (a, b) => (a.remainingBalance ?? 0) - (b.remainingBalance ?? 0),
    CONTRACT_DATE: (a, b) => {
        const dateA = a.contractDate?.getTime() ?? 0;
        const dateB = b.contractDate?.getTime() ?? 0;
        return dateA - dateB;
    },
    LAST_PAYMENT_CLEARED_DATE: (a, b) => {
        const dateA = a.lastPaymentClearedDate?.getTime() ?? 0;
        const dateB = b.lastPaymentClearedDate?.getTime() ?? 0;
        return dateA - dateB;
    },
    STATUS_CHANGED_AT: (a, b) => {
        const dateA = a.statusChangedAt?.getTime() ?? 0;
        const dateB = b.statusChangedAt?.getTime() ?? 0;
        return dateA - dateB;
    },
    DAYS_IN_COLLECTIONS: (a, b) => (a.daysInCollections ?? 0) - (b.daysInCollections ?? 0),
    DAYS_UNTIL_CLAWBACK: (a, b) => (a.daysUntilClawback ?? 999) - (b.daysUntilClawback ?? 999),
    AT_RISK_FUNDED_AMOUNT: (a, b) => (a.atRiskFundedAmount ?? 0) - (b.atRiskFundedAmount ?? 0),
    SHORTFALL_AMOUNT: (a, b) => (a.shortfallAmount ?? 0) - (b.shortfallAmount ?? 0),
};
// =============================================================================
// HOOK
// =============================================================================
const useMockPagination = ({ pageSize = column_config_1.PAGE_SIZE, sortBy = 'STATUS_CHANGED_AT', sortOrder = 'DESC', searchQuery, delay = 300, } = {}) => {
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
        let data = [...mock_data_1.MOCK_DATA];
        // Apply search filter
        if (searchQuery && searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            data = data.filter((item) => item.customerName.toLowerCase().includes(query) ||
                item.customerEmail?.toLowerCase().includes(query) ||
                item.contractId.toString().includes(query));
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
        metrics: mock_data_1.MOCK_METRICS,
    };
};
exports.useMockPagination = useMockPagination;
//# sourceMappingURL=use-mock-pagination.js.map