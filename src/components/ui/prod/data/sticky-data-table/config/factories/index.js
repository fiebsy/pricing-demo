"use strict";
/**
 * StickyDataTable - Factories Index
 *
 * Re-exports all factory functions.
 *
 * @module config/factories
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTableProps = exports.tableConfigToProps = exports.createTableConfiguration = exports.mergeFilterConfig = exports.createFilterConfig = exports.toMenuAppearanceConfig = exports.createSkeletonConfig = exports.createSkeletonDimensionConfig = exports.inferToolbarConfigFromProps = exports.createToolbarConfig = exports.createToolbarLayoutConfig = exports.createInitialStickyState = exports.createStickyState = exports.createBackgroundConfig = exports.createBorderConfig = void 0;
// Appearance factories
var appearance_1 = require("./appearance");
Object.defineProperty(exports, "createBorderConfig", { enumerable: true, get: function () { return appearance_1.createBorderConfig; } });
Object.defineProperty(exports, "createBackgroundConfig", { enumerable: true, get: function () { return appearance_1.createBackgroundConfig; } });
Object.defineProperty(exports, "createStickyState", { enumerable: true, get: function () { return appearance_1.createStickyState; } });
Object.defineProperty(exports, "createInitialStickyState", { enumerable: true, get: function () { return appearance_1.createInitialStickyState; } });
// Toolbar factories
var toolbar_1 = require("./toolbar");
Object.defineProperty(exports, "createToolbarLayoutConfig", { enumerable: true, get: function () { return toolbar_1.createToolbarLayoutConfig; } });
Object.defineProperty(exports, "createToolbarConfig", { enumerable: true, get: function () { return toolbar_1.createToolbarConfig; } });
Object.defineProperty(exports, "inferToolbarConfigFromProps", { enumerable: true, get: function () { return toolbar_1.inferToolbarConfigFromProps; } });
// Skeleton factories
var skeleton_1 = require("./skeleton");
Object.defineProperty(exports, "createSkeletonDimensionConfig", { enumerable: true, get: function () { return skeleton_1.createSkeletonDimensionConfig; } });
Object.defineProperty(exports, "createSkeletonConfig", { enumerable: true, get: function () { return skeleton_1.createSkeletonConfig; } });
// Filter factories
var filter_1 = require("./filter");
Object.defineProperty(exports, "toMenuAppearanceConfig", { enumerable: true, get: function () { return filter_1.toMenuAppearanceConfig; } });
Object.defineProperty(exports, "createFilterConfig", { enumerable: true, get: function () { return filter_1.createFilterConfig; } });
Object.defineProperty(exports, "mergeFilterConfig", { enumerable: true, get: function () { return filter_1.mergeFilterConfig; } });
// Table configuration factories
var table_configuration_1 = require("./table-configuration");
Object.defineProperty(exports, "createTableConfiguration", { enumerable: true, get: function () { return table_configuration_1.createTableConfiguration; } });
Object.defineProperty(exports, "tableConfigToProps", { enumerable: true, get: function () { return table_configuration_1.tableConfigToProps; } });
Object.defineProperty(exports, "getDefaultTableProps", { enumerable: true, get: function () { return table_configuration_1.getDefaultTableProps; } });
//# sourceMappingURL=index.js.map