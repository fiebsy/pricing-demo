"use strict";
/**
 * FilterMenuMotion - Module Export
 *
 * A filter menu component with Motion Dev animations.
 * Built on Base UI Menu primitives with integrated motion/react.
 *
 * @module prod/base/filter/filter-menu-motion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTrigger = exports.BackButton = exports.FilterMenuHeader = exports.SlidingPanelContainer = exports.AnimatedPanel = exports.AnimatedMenuItem = exports.transformItemsWithFilterState = exports.DEFAULT_FILTER_ITEMS = exports.createItemVariants = exports.createPopupVariants = exports.getSlideTransition = exports.getHeightTransition = exports.getTimedTransition = exports.getMotionTransition = exports.EASE_OUT_EXPO = exports.DEFAULT_SIDE_OFFSET = exports.DEFAULT_WIDTH = exports.DEFAULT_MOTION_ANIMATION = exports.FilterMenuMotion = void 0;
// Main component
var filter_menu_motion_1 = require("./filter-menu-motion");
Object.defineProperty(exports, "FilterMenuMotion", { enumerable: true, get: function () { return filter_menu_motion_1.FilterMenuMotion; } });
// Animation config
var animation_config_1 = require("./animation-config");
Object.defineProperty(exports, "DEFAULT_MOTION_ANIMATION", { enumerable: true, get: function () { return animation_config_1.DEFAULT_MOTION_ANIMATION; } });
Object.defineProperty(exports, "DEFAULT_WIDTH", { enumerable: true, get: function () { return animation_config_1.DEFAULT_WIDTH; } });
Object.defineProperty(exports, "DEFAULT_SIDE_OFFSET", { enumerable: true, get: function () { return animation_config_1.DEFAULT_SIDE_OFFSET; } });
Object.defineProperty(exports, "EASE_OUT_EXPO", { enumerable: true, get: function () { return animation_config_1.EASE_OUT_EXPO; } });
Object.defineProperty(exports, "getMotionTransition", { enumerable: true, get: function () { return animation_config_1.getMotionTransition; } });
Object.defineProperty(exports, "getTimedTransition", { enumerable: true, get: function () { return animation_config_1.getTimedTransition; } });
Object.defineProperty(exports, "getHeightTransition", { enumerable: true, get: function () { return animation_config_1.getHeightTransition; } });
Object.defineProperty(exports, "getSlideTransition", { enumerable: true, get: function () { return animation_config_1.getSlideTransition; } });
Object.defineProperty(exports, "createPopupVariants", { enumerable: true, get: function () { return animation_config_1.createPopupVariants; } });
Object.defineProperty(exports, "createItemVariants", { enumerable: true, get: function () { return animation_config_1.createItemVariants; } });
// Default items
var default_items_1 = require("./default-items");
Object.defineProperty(exports, "DEFAULT_FILTER_ITEMS", { enumerable: true, get: function () { return default_items_1.DEFAULT_FILTER_ITEMS; } });
// Utilities
var utils_1 = require("./utils");
Object.defineProperty(exports, "transformItemsWithFilterState", { enumerable: true, get: function () { return utils_1.transformItemsWithFilterState; } });
// Sub-components (for advanced customization)
var components_1 = require("./components");
Object.defineProperty(exports, "AnimatedMenuItem", { enumerable: true, get: function () { return components_1.AnimatedMenuItem; } });
Object.defineProperty(exports, "AnimatedPanel", { enumerable: true, get: function () { return components_1.AnimatedPanel; } });
Object.defineProperty(exports, "SlidingPanelContainer", { enumerable: true, get: function () { return components_1.SlidingPanelContainer; } });
Object.defineProperty(exports, "FilterMenuHeader", { enumerable: true, get: function () { return components_1.FilterMenuHeader; } });
Object.defineProperty(exports, "BackButton", { enumerable: true, get: function () { return components_1.BackButton; } });
Object.defineProperty(exports, "FilterTrigger", { enumerable: true, get: function () { return components_1.FilterTrigger; } });
//# sourceMappingURL=index.js.map