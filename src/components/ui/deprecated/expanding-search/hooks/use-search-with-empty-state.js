"use strict";
/**
 * useSearchWithEmptyState
 *
 * A hook that integrates ExpandingSearch with table empty states.
 * Provides smart empty state configuration based on search term and active filters.
 *
 * @module expanding-search/hooks/use-search-with-empty-state
 */
'use client';
/**
 * useSearchWithEmptyState
 *
 * A hook that integrates ExpandingSearch with table empty states.
 * Provides smart empty state configuration based on search term and active filters.
 *
 * @module expanding-search/hooks/use-search-with-empty-state
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchWithEmptyState = exports.DEFAULT_SEARCH_STYLE = void 0;
const react_1 = require("react");
// ============================================================================
// Default Style Configuration
// ============================================================================
/** Default style configuration - matches proper ExpandingSearch design */
exports.DEFAULT_SEARCH_STYLE = {
    placeholder: 'Search...',
    expandedWidth: 200,
    collapsedWidth: 36,
    height: 36,
    duration: 200,
    revealMode: 'immediate',
    hideMode: 'instant',
    collapseOnBlur: true,
    className: 'shine-1',
};
// ============================================================================
// Default Content
// ============================================================================
const DEFAULT_CONTENT = {
    emptyTitle: 'No results',
    emptyDescription: "There's nothing to display yet.",
    noResultsTitle: 'No results found',
};
// ============================================================================
// Hook
// ============================================================================
function useSearchWithEmptyState({ initialSearchTerm = '', initialExpanded = false, activeFilters = [], onClearFilters, emptyStateContent, itemLabel = 'items', searchStyle, } = {}) {
    // Merge search style with defaults
    const mergedStyle = (0, react_1.useMemo)(() => ({
        ...exports.DEFAULT_SEARCH_STYLE,
        ...searchStyle,
    }), [searchStyle]);
    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    const [searchTerm, setSearchTerm] = (0, react_1.useState)(initialSearchTerm);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(initialExpanded);
    // -------------------------------------------------------------------------
    // Derived State
    // -------------------------------------------------------------------------
    const hasActiveFilters = activeFilters.length > 0;
    // -------------------------------------------------------------------------
    // Clear Handlers
    // -------------------------------------------------------------------------
    const clearSearch = (0, react_1.useCallback)(() => {
        setSearchTerm('');
        setIsExpanded(false);
    }, []);
    const clearFilters = (0, react_1.useCallback)(() => {
        onClearFilters?.();
    }, [onClearFilters]);
    const clearAll = (0, react_1.useCallback)(() => {
        setSearchTerm('');
        setIsExpanded(false);
        onClearFilters?.();
    }, [onClearFilters]);
    // -------------------------------------------------------------------------
    // Expanded Change Handler
    // -------------------------------------------------------------------------
    const handleExpandedChange = (0, react_1.useCallback)((expanded) => {
        setIsExpanded(expanded);
        if (!expanded) {
            setSearchTerm('');
        }
    }, []);
    // -------------------------------------------------------------------------
    // Empty State Configuration
    // -------------------------------------------------------------------------
    const content = { ...DEFAULT_CONTENT, ...emptyStateContent };
    const emptyStateConfig = (0, react_1.useMemo)(() => {
        const hasSearch = searchTerm.length > 0;
        const hasFilters = hasActiveFilters;
        // No search or filters - show base empty state
        if (!hasSearch && !hasFilters) {
            return {
                searchTerm: '',
                hasActiveFilters: false,
                title: content.emptyTitle,
                description: content.emptyDescription,
                action: null,
            };
        }
        // Both search and filters
        if (hasSearch && hasFilters) {
            return {
                searchTerm,
                hasActiveFilters: true,
                title: content.noResultsTitle,
                description: 'Try adjusting your search or filters to find what you\'re looking for.',
                action: {
                    label: 'Clear all',
                    onClick: clearAll,
                },
            };
        }
        // Only search
        if (hasSearch) {
            return {
                searchTerm,
                hasActiveFilters: false,
                title: content.noResultsTitle,
                description: `No results found for "${searchTerm}". Try a different search term.`,
                action: {
                    label: 'Clear search',
                    onClick: clearSearch,
                },
            };
        }
        // Only filters
        return {
            searchTerm: '', // We use a marker to trigger noResultsState
            hasActiveFilters: true,
            title: content.noResultsTitle,
            description: `No ${itemLabel} match the selected filters.`,
            action: {
                label: 'Clear filters',
                onClick: clearFilters,
            },
        };
    }, [searchTerm, hasActiveFilters, content, clearAll, clearSearch, clearFilters, itemLabel]);
    // -------------------------------------------------------------------------
    // Props Bundles
    // -------------------------------------------------------------------------
    const searchProps = (0, react_1.useMemo)(() => ({
        // State props
        value: searchTerm,
        onChange: setSearchTerm,
        expanded: isExpanded,
        onExpandedChange: handleExpandedChange,
        // Style props (from merged config)
        placeholder: mergedStyle.placeholder,
        expandedWidth: mergedStyle.expandedWidth,
        collapsedWidth: mergedStyle.collapsedWidth,
        height: mergedStyle.height,
        duration: mergedStyle.duration,
        revealMode: mergedStyle.revealMode,
        hideMode: mergedStyle.hideMode,
        collapseOnBlur: mergedStyle.collapseOnBlur,
        className: mergedStyle.className,
    }), [searchTerm, isExpanded, handleExpandedChange, mergedStyle]);
    // For the table, we need to pass a truthy searchTerm when filters are active
    // to trigger the noResultsState instead of emptyState
    const tableEmptyStateProps = (0, react_1.useMemo)(() => ({
        searchTerm: searchTerm || (hasActiveFilters ? 'filters' : ''),
    }), [searchTerm, hasActiveFilters]);
    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------
    return {
        // Search state
        searchTerm,
        setSearchTerm,
        isExpanded,
        setIsExpanded,
        // Filter integration
        hasActiveFilters,
        activeFilters,
        // Clear handlers
        clearSearch,
        clearFilters,
        clearAll,
        // Empty state config
        emptyStateConfig,
        // Props bundles
        searchProps,
        tableEmptyStateProps,
    };
}
exports.useSearchWithEmptyState = useSearchWithEmptyState;
//# sourceMappingURL=use-search-with-empty-state.js.map