"use strict";
/**
 * StickyDataTable V2 - Types Index
 *
 * Central export point for all type definitions.
 * Provides organized access to types by domain.
 *
 * ## Directory Structure
 *
 * ```
 * types/
 * ├── core/           # Column, sort, selection types
 * ├── styling/        # Border, background, sticky state
 * ├── configuration/  # Table configuration system
 * ├── props/          # Component props
 * └── filter/         # Filter system types
 * ```
 *
 * @module types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRangeFilter = exports.createDateFilter = exports.createSelectFilter = exports.DEFAULT_DATE_PRESETS = void 0;
var presets_1 = require("./filter/presets");
Object.defineProperty(exports, "DEFAULT_DATE_PRESETS", { enumerable: true, get: function () { return presets_1.DEFAULT_DATE_PRESETS; } });
var helpers_1 = require("./filter/helpers");
Object.defineProperty(exports, "createSelectFilter", { enumerable: true, get: function () { return helpers_1.createSelectFilter; } });
Object.defineProperty(exports, "createDateFilter", { enumerable: true, get: function () { return helpers_1.createDateFilter; } });
Object.defineProperty(exports, "createRangeFilter", { enumerable: true, get: function () { return helpers_1.createRangeFilter; } });
//# sourceMappingURL=index.js.map