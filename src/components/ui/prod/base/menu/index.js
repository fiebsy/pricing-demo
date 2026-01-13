"use strict";
/**
 * Menu - Public Exports
 *
 * Base menu component with reveal animation, panel navigation,
 * and configurable appearance. Built on Base UI primitives.
 *
 * @module prod/base/menu
 *
 * @example Basic Usage
 * ```tsx
 * import { Menu } from '@/components/ui/prod/base/menu'
 *
 * <Menu
 *   items={[
 *     { id: 'edit', label: 'Edit', icon: Edit01Icon },
 *     { id: 'delete', label: 'Delete', icon: Delete01Icon },
 *   ]}
 *   trigger={<button>Actions</button>}
 *   onSelect={(item) => handleAction(item.id)}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKGROUND_CLASSES = exports.SHADOW_CLASSES = exports.BORDER_RADIUS_CLASSES = exports.getRevealAnimationClasses = exports.getSeparatorClasses = exports.getItemRadius = exports.getGradientStyles = exports.getPopupClasses = exports.INTERACTIVE_STATES = exports.SEPARATOR_STYLES = exports.MENU_ITEM_STYLES_SMALL = exports.MENU_ITEM_STYLES = exports.EASING_EXPO_OUT = exports.Z_INDEX = exports.USE_LEGACY_ANIMATION = exports.REVEAL_ANIMATION_CLASSES = exports.REVEAL_ANIMATION = exports.DEFAULT_SIDE_OFFSET = exports.DEFAULT_MENU_WIDTH = exports.DEFAULT_ANIMATION = exports.DEFAULT_APPEARANCE = exports.MenuBackButton = exports.MenuItemComponent = exports.Menu = void 0;
// ============================================================================
// Components
// ============================================================================
var menu_1 = require("./menu");
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return menu_1.Menu; } });
var menu_item_1 = require("./menu-item");
Object.defineProperty(exports, "MenuItemComponent", { enumerable: true, get: function () { return menu_item_1.MenuItem; } });
var menu_back_button_1 = require("./menu-back-button");
Object.defineProperty(exports, "MenuBackButton", { enumerable: true, get: function () { return menu_back_button_1.MenuBackButton; } });
// ============================================================================
// Configuration
// ============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "DEFAULT_APPEARANCE", { enumerable: true, get: function () { return config_1.DEFAULT_APPEARANCE; } });
Object.defineProperty(exports, "DEFAULT_ANIMATION", { enumerable: true, get: function () { return config_1.DEFAULT_ANIMATION; } });
Object.defineProperty(exports, "DEFAULT_MENU_WIDTH", { enumerable: true, get: function () { return config_1.DEFAULT_MENU_WIDTH; } });
Object.defineProperty(exports, "DEFAULT_SIDE_OFFSET", { enumerable: true, get: function () { return config_1.DEFAULT_SIDE_OFFSET; } });
Object.defineProperty(exports, "REVEAL_ANIMATION", { enumerable: true, get: function () { return config_1.REVEAL_ANIMATION; } });
Object.defineProperty(exports, "REVEAL_ANIMATION_CLASSES", { enumerable: true, get: function () { return config_1.REVEAL_ANIMATION_CLASSES; } });
Object.defineProperty(exports, "USE_LEGACY_ANIMATION", { enumerable: true, get: function () { return config_1.USE_LEGACY_ANIMATION; } });
Object.defineProperty(exports, "Z_INDEX", { enumerable: true, get: function () { return config_1.Z_INDEX; } });
Object.defineProperty(exports, "EASING_EXPO_OUT", { enumerable: true, get: function () { return config_1.EASING_EXPO_OUT; } });
Object.defineProperty(exports, "MENU_ITEM_STYLES", { enumerable: true, get: function () { return config_1.MENU_ITEM_STYLES; } });
Object.defineProperty(exports, "MENU_ITEM_STYLES_SMALL", { enumerable: true, get: function () { return config_1.MENU_ITEM_STYLES_SMALL; } });
Object.defineProperty(exports, "SEPARATOR_STYLES", { enumerable: true, get: function () { return config_1.SEPARATOR_STYLES; } });
Object.defineProperty(exports, "INTERACTIVE_STATES", { enumerable: true, get: function () { return config_1.INTERACTIVE_STATES; } });
Object.defineProperty(exports, "getPopupClasses", { enumerable: true, get: function () { return config_1.getPopupClasses; } });
Object.defineProperty(exports, "getGradientStyles", { enumerable: true, get: function () { return config_1.getGradientStyles; } });
Object.defineProperty(exports, "getItemRadius", { enumerable: true, get: function () { return config_1.getItemRadius; } });
Object.defineProperty(exports, "getSeparatorClasses", { enumerable: true, get: function () { return config_1.getSeparatorClasses; } });
Object.defineProperty(exports, "getRevealAnimationClasses", { enumerable: true, get: function () { return config_1.getRevealAnimationClasses; } });
Object.defineProperty(exports, "BORDER_RADIUS_CLASSES", { enumerable: true, get: function () { return config_1.BORDER_RADIUS_CLASSES; } });
Object.defineProperty(exports, "SHADOW_CLASSES", { enumerable: true, get: function () { return config_1.SHADOW_CLASSES; } });
Object.defineProperty(exports, "BACKGROUND_CLASSES", { enumerable: true, get: function () { return config_1.BACKGROUND_CLASSES; } });
//# sourceMappingURL=index.js.map