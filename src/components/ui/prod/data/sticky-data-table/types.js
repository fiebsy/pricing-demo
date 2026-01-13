"use strict";
/**
 * StickyDataTable V2 - Type Definitions
 *
 * Core types for the optimized sticky data table component.
 * Designed for type safety, performance, and scalability.
 *
 * This file re-exports all types from the modular types/ directory
 * for backward compatibility. New code should import directly from
 * the specific type module when possible.
 *
 * @module types
 *
 * @example
 * // Backward compatible import (from this file)
 * import type { ColumnConfig, StickyState } from './types'
 *
 * // New modular import (preferred for tree-shaking)
 * import type { ColumnConfig } from './types/core/column.types'
 * import type { StickyState } from './types/styling/sticky-state.types'
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRangeFilter = exports.createDateFilter = exports.createSelectFilter = exports.DEFAULT_DATE_PRESETS = void 0;
// Filter helpers and constants
var filter_1 = require("./types/filter");
Object.defineProperty(exports, "DEFAULT_DATE_PRESETS", { enumerable: true, get: function () { return filter_1.DEFAULT_DATE_PRESETS; } });
Object.defineProperty(exports, "createSelectFilter", { enumerable: true, get: function () { return filter_1.createSelectFilter; } });
Object.defineProperty(exports, "createDateFilter", { enumerable: true, get: function () { return filter_1.createDateFilter; } });
Object.defineProperty(exports, "createRangeFilter", { enumerable: true, get: function () { return filter_1.createRangeFilter; } });
//# sourceMappingURL=types.js.map