"use strict";
/**
 * StickyDataTable V2 - Utility Exports
 *
 * Central export point for all utility functions.
 *
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugValue = exports.isSkeletonDebugEnabled = exports.skeletonDebug = exports.getRightmostStickyColumn = exports.countStickyColumns = exports.hasStickyColumns = exports.createVisibleColumnKeys = exports.processColumns = exports.getCellStyle = exports.getColumnAnimationDataAttrs = exports.getColumnAnimationState = exports.getColumnAnimationClass = exports.getStickyLeft = exports.getStickyColumnBorder = exports.getCellBorder = exports.getRowBorder = exports.getBodyOuterBorderStyles = exports.getBodyOuterBorders = exports.getHeaderOuterBorderStyles = exports.getHeaderOuterBorders = exports.getRowHoverClass = exports.getRowStickyBackground = exports.getHeaderStickyBackground = exports.getCellPadding = exports.getAlignmentClasses = exports.separateColumns = exports.computeColumnOffsets = exports.calculateTotalStickyWidth = exports.generateGridTemplate = void 0;
var grid_1 = require("./grid");
Object.defineProperty(exports, "generateGridTemplate", { enumerable: true, get: function () { return grid_1.generateGridTemplate; } });
Object.defineProperty(exports, "calculateTotalStickyWidth", { enumerable: true, get: function () { return grid_1.calculateTotalStickyWidth; } });
Object.defineProperty(exports, "computeColumnOffsets", { enumerable: true, get: function () { return grid_1.computeColumnOffsets; } });
Object.defineProperty(exports, "separateColumns", { enumerable: true, get: function () { return grid_1.separateColumns; } });
var styles_1 = require("./styles");
Object.defineProperty(exports, "getAlignmentClasses", { enumerable: true, get: function () { return styles_1.getAlignmentClasses; } });
Object.defineProperty(exports, "getCellPadding", { enumerable: true, get: function () { return styles_1.getCellPadding; } });
Object.defineProperty(exports, "getHeaderStickyBackground", { enumerable: true, get: function () { return styles_1.getHeaderStickyBackground; } });
Object.defineProperty(exports, "getRowStickyBackground", { enumerable: true, get: function () { return styles_1.getRowStickyBackground; } });
Object.defineProperty(exports, "getRowHoverClass", { enumerable: true, get: function () { return styles_1.getRowHoverClass; } });
Object.defineProperty(exports, "getHeaderOuterBorders", { enumerable: true, get: function () { return styles_1.getHeaderOuterBorders; } });
Object.defineProperty(exports, "getHeaderOuterBorderStyles", { enumerable: true, get: function () { return styles_1.getHeaderOuterBorderStyles; } });
Object.defineProperty(exports, "getBodyOuterBorders", { enumerable: true, get: function () { return styles_1.getBodyOuterBorders; } });
Object.defineProperty(exports, "getBodyOuterBorderStyles", { enumerable: true, get: function () { return styles_1.getBodyOuterBorderStyles; } });
Object.defineProperty(exports, "getRowBorder", { enumerable: true, get: function () { return styles_1.getRowBorder; } });
Object.defineProperty(exports, "getCellBorder", { enumerable: true, get: function () { return styles_1.getCellBorder; } });
Object.defineProperty(exports, "getStickyColumnBorder", { enumerable: true, get: function () { return styles_1.getStickyColumnBorder; } });
Object.defineProperty(exports, "getStickyLeft", { enumerable: true, get: function () { return styles_1.getStickyLeft; } });
Object.defineProperty(exports, "getColumnAnimationClass", { enumerable: true, get: function () { return styles_1.getColumnAnimationClass; } });
Object.defineProperty(exports, "getColumnAnimationState", { enumerable: true, get: function () { return styles_1.getColumnAnimationState; } });
Object.defineProperty(exports, "getColumnAnimationDataAttrs", { enumerable: true, get: function () { return styles_1.getColumnAnimationDataAttrs; } });
Object.defineProperty(exports, "getCellStyle", { enumerable: true, get: function () { return styles_1.getCellStyle; } });
// Column processor - unified processing for table and skeleton
var column_processor_1 = require("./column-processor");
Object.defineProperty(exports, "processColumns", { enumerable: true, get: function () { return column_processor_1.processColumns; } });
Object.defineProperty(exports, "createVisibleColumnKeys", { enumerable: true, get: function () { return column_processor_1.createVisibleColumnKeys; } });
Object.defineProperty(exports, "hasStickyColumns", { enumerable: true, get: function () { return column_processor_1.hasStickyColumns; } });
Object.defineProperty(exports, "countStickyColumns", { enumerable: true, get: function () { return column_processor_1.countStickyColumns; } });
Object.defineProperty(exports, "getRightmostStickyColumn", { enumerable: true, get: function () { return column_processor_1.getRightmostStickyColumn; } });
// Skeleton debug utilities
var skeleton_debug_1 = require("./skeleton-debug");
Object.defineProperty(exports, "skeletonDebug", { enumerable: true, get: function () { return skeleton_debug_1.skeletonDebug; } });
Object.defineProperty(exports, "isSkeletonDebugEnabled", { enumerable: true, get: function () { return skeleton_debug_1.isSkeletonDebugEnabled; } });
Object.defineProperty(exports, "debugValue", { enumerable: true, get: function () { return skeleton_debug_1.debugValue; } });
//# sourceMappingURL=index.js.map