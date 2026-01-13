"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableFilters = void 0;
const react_1 = require("react");
/**
 * Generate a unique ID for filter instances
 */
function generateFilterId() {
    return `filter-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
/**
 * Hook for managing table filter state
 *
 * Provides a complete filter management system including:
 * - Adding, removing, and updating filters
 * - Filter state with computed properties
 * - Generic data filtering function
 *
 * @example
 * ```tsx
 * const { filterState, addFilter, removeFilter, clearFilters, applyFilters } = useTableFilters({
 *   categories: filterCategories,
 *   onFiltersChange: (filters) => console.log('Filters changed:', filters)
 * })
 *
 * // Apply filters to data
 * const filteredData = applyFilters(rawData)
 * ```
 */
function useTableFilters({ categories, initialFilters = [], onFiltersChange, }) {
    // Internal filter storage
    const [filtersMap, setFiltersMap] = (0, react_1.useState)(() => {
        const map = new Map();
        initialFilters.forEach((filter) => {
            map.set(filter.id, filter);
        });
        return map;
    });
    // Computed filter state
    const filterState = (0, react_1.useMemo)(() => {
        const activeFilters = Array.from(filtersMap.values());
        return {
            filters: filtersMap,
            activeFilters,
            hasFilters: activeFilters.length > 0,
            filterCount: activeFilters.length,
        };
    }, [filtersMap]);
    // Add a new filter
    const addFilter = (0, react_1.useCallback)((filter) => {
        const id = generateFilterId();
        const newFilter = { ...filter, id };
        setFiltersMap((prev) => {
            const next = new Map(prev);
            next.set(id, newFilter);
            // Call onFiltersChange inside functional update to avoid stale closure
            onFiltersChange?.(Array.from(next.values()));
            return next;
        });
    }, [onFiltersChange]);
    // Remove a filter by ID
    const removeFilter = (0, react_1.useCallback)((filterId) => {
        setFiltersMap((prev) => {
            const next = new Map(prev);
            next.delete(filterId);
            onFiltersChange?.(Array.from(next.values()));
            return next;
        });
    }, [onFiltersChange]);
    // Update an existing filter
    const updateFilter = (0, react_1.useCallback)((filterId, value, displayValue) => {
        setFiltersMap((prev) => {
            const existingFilter = prev.get(filterId);
            if (!existingFilter)
                return prev;
            const next = new Map(prev);
            next.set(filterId, {
                ...existingFilter,
                value,
                displayValue,
            });
            onFiltersChange?.(Array.from(next.values()));
            return next;
        });
    }, [onFiltersChange]);
    // Clear all filters
    const clearFilters = (0, react_1.useCallback)(() => {
        setFiltersMap(new Map());
        onFiltersChange?.([]);
    }, [onFiltersChange]);
    // Get filters for a specific category
    const getFiltersForCategory = (0, react_1.useCallback)((categoryKey) => {
        return filterState.activeFilters.filter((f) => f.categoryKey === categoryKey);
    }, [filterState.activeFilters]);
    // Check if a category has active filters
    const hasFilterForCategory = (0, react_1.useCallback)((categoryKey) => {
        return filterState.activeFilters.some((f) => f.categoryKey === categoryKey);
    }, [filterState.activeFilters]);
    // Generic filter application function
    const applyFilters = (0, react_1.useCallback)((data) => {
        if (!filterState.hasFilters)
            return data;
        return data.filter((row) => {
            // All filters must pass (AND logic)
            return filterState.activeFilters.every((filter) => {
                const category = categories.find((c) => c.key === filter.categoryKey);
                if (!category)
                    return true;
                const rowValue = row[filter.categoryKey];
                const filterValue = filter.value;
                switch (filter.operator) {
                    case 'equals':
                        return rowValue === filterValue;
                    case 'not_equals':
                        return rowValue !== filterValue;
                    case 'contains':
                        if (typeof rowValue === 'string' && typeof filterValue === 'string') {
                            return rowValue.toLowerCase().includes(filterValue.toLowerCase());
                        }
                        return false;
                    case 'not_contains':
                        if (typeof rowValue === 'string' && typeof filterValue === 'string') {
                            return !rowValue.toLowerCase().includes(filterValue.toLowerCase());
                        }
                        return true;
                    case 'greater_than':
                        if (typeof rowValue === 'number' && typeof filterValue === 'number') {
                            return rowValue > filterValue;
                        }
                        if (rowValue instanceof Date && filterValue instanceof Date) {
                            return rowValue > filterValue;
                        }
                        // Handle timestamp strings or numbers
                        if (typeof filterValue === 'number') {
                            const rowDate = new Date(rowValue);
                            const filterDate = new Date(filterValue);
                            return rowDate > filterDate;
                        }
                        return false;
                    case 'less_than':
                        if (typeof rowValue === 'number' && typeof filterValue === 'number') {
                            return rowValue < filterValue;
                        }
                        if (rowValue instanceof Date && filterValue instanceof Date) {
                            return rowValue < filterValue;
                        }
                        // Handle timestamp strings or numbers
                        if (typeof filterValue === 'number') {
                            const rowDate = new Date(rowValue);
                            const filterDate = new Date(filterValue);
                            return rowDate < filterDate;
                        }
                        return false;
                    case 'between':
                        if (Array.isArray(filterValue) && filterValue.length === 2) {
                            const [min, max] = filterValue;
                            if (typeof rowValue === 'number' && typeof min === 'number' && typeof max === 'number') {
                                return rowValue >= min && rowValue <= max;
                            }
                        }
                        return false;
                    case 'in':
                        if (Array.isArray(filterValue)) {
                            return filterValue.includes(rowValue);
                        }
                        return false;
                    case 'not_in':
                        if (Array.isArray(filterValue)) {
                            return !filterValue.includes(rowValue);
                        }
                        return true;
                    case 'is_empty':
                        return rowValue === null || rowValue === undefined || rowValue === '';
                    case 'is_not_empty':
                        return rowValue !== null && rowValue !== undefined && rowValue !== '';
                    default:
                        return true;
                }
            });
        });
    }, [filterState, categories]);
    return {
        filterState,
        addFilter,
        removeFilter,
        updateFilter,
        clearFilters,
        getFiltersForCategory,
        hasFilterForCategory,
        applyFilters,
    };
}
exports.useTableFilters = useTableFilters;
//# sourceMappingURL=use-table-filters.js.map