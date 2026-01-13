"use strict";
/**
 * Filter Menu - Main Component
 *
 * A derivative of the base Menu component specialized for filtering.
 * Adds filter-specific behavior:
 * - Default "Add a filter" trigger
 * - Default filter header
 * - Active filter tracking (selected state, activeCount badges)
 *
 * @module prod/base/filter/filter-menu/filter-menu
 */
'use client';
/**
 * Filter Menu - Main Component
 *
 * A derivative of the base Menu component specialized for filtering.
 * Adds filter-specific behavior:
 * - Default "Add a filter" trigger
 * - Default filter header
 * - Active filter tracking (selected state, activeCount badges)
 *
 * @module prod/base/filter/filter-menu/filter-menu
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMenu = void 0;
const react_1 = require("react");
const menu_1 = require("../../menu");
const filter_menu_header_1 = require("./filter-menu-header");
const filter_trigger_1 = require("../filter-trigger");
const default_items_1 = require("./default-items");
// ============================================================================
// Item Transformation
// ============================================================================
/**
 * Transform items to inject selected state and onClick wrappers
 * based on activeFilterIds and onFilterSelect callback
 */
function transformItemsWithFilterState(items, activeIdsSet, onFilterSelect) {
    return items.map((item) => {
        if (item.type === 'separator' || item.type === 'label' || item.type === 'checkbox') {
            return item;
        }
        if (item.type === 'submenu') {
            let activeCount = 0;
            const wrappedSubItems = item.items.map((subItem) => {
                if (subItem.type === 'separator' || subItem.type === 'label' || subItem.type === 'submenu' || subItem.type === 'checkbox') {
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
        // Action item
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
// ============================================================================
// Component
// ============================================================================
/**
 * FilterMenu - Filter-specific menu component
 *
 * Built on top of the base Menu component, adds:
 * - Default "Add a filter" trigger
 * - Default filter header with filter icon
 * - Active filter tracking (checkmarks, badges)
 * - onFilterSelect callback for filter toggling
 */
const FilterMenu = ({ items = default_items_1.DEFAULT_FILTER_ITEMS, onFilterSelect, activeFilterIds = [], trigger, header, noHeader = true, // Default: no header on main menu (submenu back button still shows)
width, side, align, sideOffset, alignOffset, onOpenChange, appearance, animation, className, }) => {
    // Track open state for trigger styling
    const [isOpen, setIsOpen] = react_1.default.useState(false);
    const handleOpenChange = (0, react_1.useCallback)((open) => {
        setIsOpen(open);
        onOpenChange?.(open);
    }, [onOpenChange]);
    // Create set for O(1) lookup
    const activeIdsSet = (0, react_1.useMemo)(() => new Set(activeFilterIds), [activeFilterIds]);
    // Transform items to inject selected state and onClick wrappers
    const wrappedItems = (0, react_1.useMemo)(() => transformItemsWithFilterState(items, activeIdsSet, onFilterSelect), [items, activeIdsSet, onFilterSelect]);
    // Default trigger if not provided
    const resolvedTrigger = trigger ?? <filter_trigger_1.FilterTrigger isOpen={isOpen}/>;
    // Default header if not disabled
    const resolvedHeader = noHeader ? undefined : (header ?? <filter_menu_header_1.FilterMenuHeader />);
    return (<menu_1.Menu items={wrappedItems} trigger={resolvedTrigger} header={resolvedHeader} width={width} side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} onOpenChange={handleOpenChange} appearance={appearance} animation={animation} className={className}/>);
};
exports.FilterMenu = FilterMenu;
exports.FilterMenu.displayName = 'FilterMenu';
//# sourceMappingURL=filter-menu.js.map