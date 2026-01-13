"use strict";
/**
 * StickyDataTable - Calculators Index
 *
 * Re-exports all calculation utilities.
 *
 * @module config/calculators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = exports.calculateSkeletonHeight = exports.calculateToolbarHeight = exports.calculateIntegratedHeaderGap = void 0;
// Toolbar calculators
var toolbar_1 = require("./toolbar");
Object.defineProperty(exports, "calculateIntegratedHeaderGap", { enumerable: true, get: function () { return toolbar_1.calculateIntegratedHeaderGap; } });
Object.defineProperty(exports, "calculateToolbarHeight", { enumerable: true, get: function () { return toolbar_1.calculateToolbarHeight; } });
// Skeleton calculators
var skeleton_1 = require("./skeleton");
Object.defineProperty(exports, "calculateSkeletonHeight", { enumerable: true, get: function () { return skeleton_1.calculateSkeletonHeight; } });
// Deep merge utility
var deep_merge_1 = require("./deep-merge");
Object.defineProperty(exports, "deepMerge", { enumerable: true, get: function () { return deep_merge_1.deepMerge; } });
//# sourceMappingURL=index.js.map