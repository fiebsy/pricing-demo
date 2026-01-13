"use strict";
/**
 * StickyDataTable V2 - Configuration
 *
 * Re-exports from the config/ module for backward compatibility.
 * All defaults are based on JAN2 preset - the production source of truth.
 *
 * @module config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TABLE_CONFIGURATION = exports.getDefaultTableProps = exports.tableConfigToProps = exports.createTableConfiguration = exports.mergeFilterConfig = exports.createFilterConfig = exports.toMenuAppearanceConfig = exports.createSkeletonConfig = exports.createSkeletonDimensionConfig = exports.inferToolbarConfigFromProps = exports.createToolbarConfig = exports.createToolbarLayoutConfig = exports.createInitialStickyState = exports.createStickyState = exports.createBackgroundConfig = exports.createBorderConfig = exports.deepMerge = exports.calculateSkeletonHeight = exports.calculateToolbarHeight = exports.calculateIntegratedHeaderGap = exports.DEFAULT_SKELETON_CONFIG = exports.DEFAULT_SKELETON_CELL = exports.DEFAULT_FILTER_CONFIG = exports.DEFAULT_FILTER_PILL = exports.DEFAULT_FILTER_TRIGGER = exports.DEFAULT_FILTER_MENU = exports.DEFAULT_TOOLBAR_LAYOUT = exports.DEFAULT_BACKGROUND_CONFIG = exports.DEFAULT_BORDER_CONFIG = exports.ANIMATION_CONFIG = exports.ARROW_CONFIG = exports.CELL_CONFIG = exports.TABLE_CONFIG = void 0;
// ============================================================================
// RE-EXPORTS FROM CONFIG MODULE
// All exports are now organized in config/
// ============================================================================
var index_1 = require("./config/index");
// Dimensions
Object.defineProperty(exports, "TABLE_CONFIG", { enumerable: true, get: function () { return index_1.TABLE_CONFIG; } });
Object.defineProperty(exports, "CELL_CONFIG", { enumerable: true, get: function () { return index_1.CELL_CONFIG; } });
Object.defineProperty(exports, "ARROW_CONFIG", { enumerable: true, get: function () { return index_1.ARROW_CONFIG; } });
Object.defineProperty(exports, "ANIMATION_CONFIG", { enumerable: true, get: function () { return index_1.ANIMATION_CONFIG; } });
// Appearance defaults
Object.defineProperty(exports, "DEFAULT_BORDER_CONFIG", { enumerable: true, get: function () { return index_1.DEFAULT_BORDER_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_BACKGROUND_CONFIG", { enumerable: true, get: function () { return index_1.DEFAULT_BACKGROUND_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_TOOLBAR_LAYOUT", { enumerable: true, get: function () { return index_1.DEFAULT_TOOLBAR_LAYOUT; } });
Object.defineProperty(exports, "DEFAULT_FILTER_MENU", { enumerable: true, get: function () { return index_1.DEFAULT_FILTER_MENU; } });
Object.defineProperty(exports, "DEFAULT_FILTER_TRIGGER", { enumerable: true, get: function () { return index_1.DEFAULT_FILTER_TRIGGER; } });
Object.defineProperty(exports, "DEFAULT_FILTER_PILL", { enumerable: true, get: function () { return index_1.DEFAULT_FILTER_PILL; } });
Object.defineProperty(exports, "DEFAULT_FILTER_CONFIG", { enumerable: true, get: function () { return index_1.DEFAULT_FILTER_CONFIG; } });
// Skeleton defaults
Object.defineProperty(exports, "DEFAULT_SKELETON_CELL", { enumerable: true, get: function () { return index_1.DEFAULT_SKELETON_CELL; } });
Object.defineProperty(exports, "DEFAULT_SKELETON_CONFIG", { enumerable: true, get: function () { return index_1.DEFAULT_SKELETON_CONFIG; } });
// Calculators
Object.defineProperty(exports, "calculateIntegratedHeaderGap", { enumerable: true, get: function () { return index_1.calculateIntegratedHeaderGap; } });
Object.defineProperty(exports, "calculateToolbarHeight", { enumerable: true, get: function () { return index_1.calculateToolbarHeight; } });
Object.defineProperty(exports, "calculateSkeletonHeight", { enumerable: true, get: function () { return index_1.calculateSkeletonHeight; } });
Object.defineProperty(exports, "deepMerge", { enumerable: true, get: function () { return index_1.deepMerge; } });
// Factories
Object.defineProperty(exports, "createBorderConfig", { enumerable: true, get: function () { return index_1.createBorderConfig; } });
Object.defineProperty(exports, "createBackgroundConfig", { enumerable: true, get: function () { return index_1.createBackgroundConfig; } });
Object.defineProperty(exports, "createStickyState", { enumerable: true, get: function () { return index_1.createStickyState; } });
Object.defineProperty(exports, "createInitialStickyState", { enumerable: true, get: function () { return index_1.createInitialStickyState; } });
Object.defineProperty(exports, "createToolbarLayoutConfig", { enumerable: true, get: function () { return index_1.createToolbarLayoutConfig; } });
Object.defineProperty(exports, "createToolbarConfig", { enumerable: true, get: function () { return index_1.createToolbarConfig; } });
Object.defineProperty(exports, "inferToolbarConfigFromProps", { enumerable: true, get: function () { return index_1.inferToolbarConfigFromProps; } });
Object.defineProperty(exports, "createSkeletonDimensionConfig", { enumerable: true, get: function () { return index_1.createSkeletonDimensionConfig; } });
Object.defineProperty(exports, "createSkeletonConfig", { enumerable: true, get: function () { return index_1.createSkeletonConfig; } });
Object.defineProperty(exports, "toMenuAppearanceConfig", { enumerable: true, get: function () { return index_1.toMenuAppearanceConfig; } });
Object.defineProperty(exports, "createFilterConfig", { enumerable: true, get: function () { return index_1.createFilterConfig; } });
Object.defineProperty(exports, "mergeFilterConfig", { enumerable: true, get: function () { return index_1.mergeFilterConfig; } });
Object.defineProperty(exports, "createTableConfiguration", { enumerable: true, get: function () { return index_1.createTableConfiguration; } });
Object.defineProperty(exports, "tableConfigToProps", { enumerable: true, get: function () { return index_1.tableConfigToProps; } });
Object.defineProperty(exports, "getDefaultTableProps", { enumerable: true, get: function () { return index_1.getDefaultTableProps; } });
// Preset
Object.defineProperty(exports, "DEFAULT_TABLE_CONFIGURATION", { enumerable: true, get: function () { return index_1.DEFAULT_TABLE_CONFIGURATION; } });
//# sourceMappingURL=config.js.map