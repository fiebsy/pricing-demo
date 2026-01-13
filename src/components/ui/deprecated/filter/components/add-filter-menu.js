"use strict";
/**
 * Add Filter Menu Component
 *
 * A unified filter menu built on RevealMenu (same as ProfileMenuDemo)
 * Ensures consistent animation and interaction patterns across all menu types.
 *
 * @module base-ui/filter/components/add-filter-menu
 */
'use client';
/**
 * Add Filter Menu Component
 *
 * A unified filter menu built on RevealMenu (same as ProfileMenuDemo)
 * Ensures consistent animation and interaction patterns across all menu types.
 *
 * @module base-ui/filter/components/add-filter-menu
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFilterMenu = void 0;
const react_1 = require("react");
const menu_1 = require("@/components/ui/deprecated/base/menu");
const primitives_1 = require("../primitives");
const filter_header_1 = require("./filter-header");
const filter_menu_items_1 = require("../data/filter-menu-items");
// ============================================================================
// Component
// ============================================================================
/**
 * AddFilterMenu - Filter selection using the unified RevealMenu system
 *
 * Uses the same RevealMenu component as ProfileMenuDemo, ensuring:
 * - Identical open/close reveal animation
 * - Same sliding panel transitions (1A ↔ 1B)
 * - Consistent height animation behavior
 * - Unified opacity crossfade effects
 */
const AddFilterMenu = ({ config, appearance, items = filter_menu_items_1.DEFAULT_FILTER_MENU_ITEMS, onFilterSelect, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const handleOpenChange = (0, react_1.useCallback)((open) => {
        setIsOpen(open);
    }, []);
    const panelDuration = config.panelTransitionDuration ?? 300;
    const panelEasing = config.panelTransitionEasing ?? 'cubic-bezier(0.25, 1.2, 0.01, 1)';
    const slideTransition = {
        duration: panelDuration,
        easing: panelEasing,
    };
    const heightTransition = {
        duration: panelDuration,
        easing: panelEasing,
    };
    // Wrap items with onFilterSelect callback if provided
    const wrappedItems = onFilterSelect
        ? items.map((item) => {
            if (item.type === 'separator' || item.type === 'label') {
                return item;
            }
            if (item.type === 'submenu') {
                return {
                    ...item,
                    items: item.items.map((subItem) => {
                        if (subItem.type === 'separator' || subItem.type === 'label' || subItem.type === 'submenu') {
                            return subItem;
                        }
                        const actionItem = subItem;
                        return {
                            ...actionItem,
                            onClick: () => {
                                actionItem.onClick?.();
                                onFilterSelect(actionItem.id);
                            },
                        };
                    }),
                };
            }
            return {
                ...item,
                onClick: () => {
                    item.onClick?.();
                    onFilterSelect(item.id);
                },
            };
        })
        : items;
    return (<menu_1.RevealMenu trigger={<primitives_1.FilterTriggerButton isOpen={isOpen}/>} items={wrappedItems} side={config.side} align={config.align} sideOffset={12} alignOffset={config.alignOffset} width={config.menuWidth} appearance={appearance} slideTransition={slideTransition} heightTransition={heightTransition} onOpenChange={handleOpenChange} heightAnimationEnabled={config.heightAnimationEnabled ?? true} opacityCrossfadeEnabled={config.opacityCrossfadeEnabled ?? true} opacityDurationRatio={config.opacityDurationRatio ?? 0.8} header={<filter_header_1.FilterHeader />}/>);
};
exports.AddFilterMenu = AddFilterMenu;
//# sourceMappingURL=add-filter-menu.js.map