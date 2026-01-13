"use strict";
/**
 * FilterMenuMotion - Utility Functions
 *
 * Helper functions for menu item transformation and state management.
 *
 * @module prod/base/filter/filter-menu-motion/utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformItemsWithFilterState = void 0;
/**
 * Transform items to inject selected state based on activeFilterIds.
 *
 * This function:
 * 1. Marks items as selected if their ID is in activeIdsSet
 * 2. Wraps onClick handlers to call onFilterSelect
 * 3. Calculates activeCount for submenu badges
 */
function transformItemsWithFilterState(items, activeIdsSet, onFilterSelect) {
    return items.map((item) => {
        // Separators pass through unchanged
        if (item.type === 'separator')
            return item;
        // Submenu items - recursively process children and calculate badge count
        if (item.type === 'submenu') {
            let activeCount = 0;
            const wrappedSubItems = item.items.map((subItem) => {
                if (subItem.type === 'separator' || subItem.type === 'submenu') {
                    return subItem;
                }
                const isSelected = activeIdsSet.has(subItem.id);
                if (isSelected)
                    activeCount++;
                return {
                    ...subItem,
                    selected: isSelected,
                    onClick: () => {
                        subItem.onClick?.();
                        onFilterSelect?.(subItem.id);
                    },
                };
            });
            return { ...item, items: wrappedSubItems, activeCount };
        }
        // Action items - mark selected and wrap onClick
        const isSelected = activeIdsSet.has(item.id);
        return {
            ...item,
            selected: isSelected,
            onClick: () => {
                item.onClick?.();
                onFilterSelect?.(item.id);
            },
        };
    });
}
exports.transformItemsWithFilterState = transformItemsWithFilterState;
//# sourceMappingURL=utils.js.map