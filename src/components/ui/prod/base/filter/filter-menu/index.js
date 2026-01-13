"use strict";
/**
 * Filter Menu
 *
 * A derivative of the base Menu component specialized for filtering.
 * Built on Base UI primitives with reveal animation and panel navigation.
 *
 * @module prod/base/filter/filter-menu
 *
 * @example Basic Usage
 * ```tsx
 * import { FilterMenu } from '@/components/ui/prod/base/filter/filter-menu'
 *
 * <FilterMenu
 *   items={filterItems}
 *   onFilterSelect={(id) => handleSelect(id)}
 *   activeFilterIds={['status-active']}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeparatorClasses = exports.getItemRadius = exports.getGradientStyles = exports.getPopupClasses = exports.MENU_ITEM_STYLES = exports.EASING_EXPO_OUT = exports.DEFAULT_SIDE_OFFSET = exports.DEFAULT_MENU_WIDTH = exports.DEFAULT_ANIMATION = exports.DEFAULT_APPEARANCE = exports.MenuBackButton = exports.MenuItemComponent = exports.DEFAULT_FILTER_ITEMS = exports.FilterMenuHeader = exports.FilterMenu = void 0;
// ============================================================================
// Components
// ============================================================================
var filter_menu_1 = require("./filter-menu");
Object.defineProperty(exports, "FilterMenu", { enumerable: true, get: function () { return filter_menu_1.FilterMenu; } });
var filter_menu_header_1 = require("./filter-menu-header");
Object.defineProperty(exports, "FilterMenuHeader", { enumerable: true, get: function () { return filter_menu_header_1.FilterMenuHeader; } });
// Default items for demos
var default_items_1 = require("./default-items");
Object.defineProperty(exports, "DEFAULT_FILTER_ITEMS", { enumerable: true, get: function () { return default_items_1.DEFAULT_FILTER_ITEMS; } });
// ============================================================================
// Re-export from base Menu
// ============================================================================
// Components (use base menu components directly)
var menu_1 = require("../../menu");
Object.defineProperty(exports, "MenuItemComponent", { enumerable: true, get: function () { return menu_1.MenuItemComponent; } });
Object.defineProperty(exports, "MenuBackButton", { enumerable: true, get: function () { return menu_1.MenuBackButton; } });
// Configuration
var menu_2 = require("../../menu");
Object.defineProperty(exports, "DEFAULT_APPEARANCE", { enumerable: true, get: function () { return menu_2.DEFAULT_APPEARANCE; } });
Object.defineProperty(exports, "DEFAULT_ANIMATION", { enumerable: true, get: function () { return menu_2.DEFAULT_ANIMATION; } });
Object.defineProperty(exports, "DEFAULT_MENU_WIDTH", { enumerable: true, get: function () { return menu_2.DEFAULT_MENU_WIDTH; } });
Object.defineProperty(exports, "DEFAULT_SIDE_OFFSET", { enumerable: true, get: function () { return menu_2.DEFAULT_SIDE_OFFSET; } });
Object.defineProperty(exports, "EASING_EXPO_OUT", { enumerable: true, get: function () { return menu_2.EASING_EXPO_OUT; } });
Object.defineProperty(exports, "MENU_ITEM_STYLES", { enumerable: true, get: function () { return menu_2.MENU_ITEM_STYLES; } });
Object.defineProperty(exports, "getPopupClasses", { enumerable: true, get: function () { return menu_2.getPopupClasses; } });
Object.defineProperty(exports, "getGradientStyles", { enumerable: true, get: function () { return menu_2.getGradientStyles; } });
Object.defineProperty(exports, "getItemRadius", { enumerable: true, get: function () { return menu_2.getItemRadius; } });
Object.defineProperty(exports, "getSeparatorClasses", { enumerable: true, get: function () { return menu_2.getSeparatorClasses; } });
//# sourceMappingURL=index.js.map