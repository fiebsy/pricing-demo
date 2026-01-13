"use strict";
/**
 * FilterSelectChip
 *
 * Biaxial filter chip that expands into a dropdown menu for selecting filter values.
 * Combines the FilterChip trigger styling with a two-layer animation system.
 *
 * @module prod/base/filter/filter-select-chip
 *
 * @example
 * ```tsx
 * import { FilterSelectChip } from '@/components/ui/prod/base/filter'
 *
 * const STATUS_OPTIONS = [
 *   { id: 'active', label: 'Active' },
 *   { id: 'pending', label: 'Pending' },
 *   { id: 'completed', label: 'Completed' },
 * ]
 *
 * <FilterSelectChip
 *   value={status}
 *   options={STATUS_OPTIONS}
 *   icon={CheckmarkCircle02Icon}
 *   onChange={setStatus}
 *   onRemove={() => setStatus(null)}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChipSizeConfig = exports.mergeConfig = exports.DEFAULT_SELECT_CHIP_CONFIG = exports.FilterSelectChip = void 0;
// ============================================================================
// COMPONENT
// ============================================================================
var filter_select_chip_1 = require("./filter-select-chip");
Object.defineProperty(exports, "FilterSelectChip", { enumerable: true, get: function () { return filter_select_chip_1.FilterSelectChip; } });
// ============================================================================
// CONFIGURATION
// ============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "DEFAULT_SELECT_CHIP_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_CONFIG; } });
Object.defineProperty(exports, "mergeConfig", { enumerable: true, get: function () { return config_1.mergeConfig; } });
Object.defineProperty(exports, "getChipSizeConfig", { enumerable: true, get: function () { return config_1.getChipSizeConfig; } });
//# sourceMappingURL=index.js.map