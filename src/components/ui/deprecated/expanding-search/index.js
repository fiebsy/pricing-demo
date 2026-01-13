"use strict";
/**
 * Expanding Search - Public API
 *
 * @module expanding-search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PROPS = exports.OPACITY_FADE_RATIO = exports.EASING = exports.getAnimationStyles = exports.getContainerTransition = exports.getContentTransition = exports.getContentOpacity = exports.DEFAULT_SEARCH_STYLE = exports.useSearchWithEmptyState = exports.useExpandingSearch = exports.SearchInput = exports.SearchIconButton = exports.SearchContainer = exports.ClearButton = exports.ExpandingSearch = void 0;
// ============================================================================
// Main Component
// ============================================================================
var expanding_search_1 = require("./expanding-search");
Object.defineProperty(exports, "ExpandingSearch", { enumerable: true, get: function () { return expanding_search_1.ExpandingSearch; } });
// ============================================================================
// Sub-Components (for advanced composition)
// ============================================================================
var components_1 = require("./components");
Object.defineProperty(exports, "ClearButton", { enumerable: true, get: function () { return components_1.ClearButton; } });
Object.defineProperty(exports, "SearchContainer", { enumerable: true, get: function () { return components_1.SearchContainer; } });
Object.defineProperty(exports, "SearchIconButton", { enumerable: true, get: function () { return components_1.SearchIconButton; } });
Object.defineProperty(exports, "SearchInput", { enumerable: true, get: function () { return components_1.SearchInput; } });
// ============================================================================
// Hooks
// ============================================================================
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "useExpandingSearch", { enumerable: true, get: function () { return hooks_1.useExpandingSearch; } });
Object.defineProperty(exports, "useSearchWithEmptyState", { enumerable: true, get: function () { return hooks_1.useSearchWithEmptyState; } });
Object.defineProperty(exports, "DEFAULT_SEARCH_STYLE", { enumerable: true, get: function () { return hooks_1.DEFAULT_SEARCH_STYLE; } });
// ============================================================================
// Utilities
// ============================================================================
var utils_1 = require("./utils");
Object.defineProperty(exports, "getContentOpacity", { enumerable: true, get: function () { return utils_1.getContentOpacity; } });
Object.defineProperty(exports, "getContentTransition", { enumerable: true, get: function () { return utils_1.getContentTransition; } });
Object.defineProperty(exports, "getContainerTransition", { enumerable: true, get: function () { return utils_1.getContainerTransition; } });
Object.defineProperty(exports, "getAnimationStyles", { enumerable: true, get: function () { return utils_1.getAnimationStyles; } });
// ============================================================================
// Configuration
// ============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "EASING", { enumerable: true, get: function () { return config_1.EASING; } });
Object.defineProperty(exports, "OPACITY_FADE_RATIO", { enumerable: true, get: function () { return config_1.OPACITY_FADE_RATIO; } });
Object.defineProperty(exports, "DEFAULT_PROPS", { enumerable: true, get: function () { return config_1.DEFAULT_PROPS; } });
//# sourceMappingURL=index.js.map