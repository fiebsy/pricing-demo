"use strict";
/**
 * Filter System
 *
 * Complete filter component system including menu, chips, and triggers.
 * Built on Base UI primitives with PAYVA styling.
 *
 * @module prod/base/filter
 *
 * @example FilterMenu Usage
 * ```tsx
 * import { FilterMenu, FilterChip, FilterTrigger, FilterSelectChip } from '@/components/ui/prod/base/filter'
 *
 * <FilterMenu
 *   items={filterItems}
 *   onFilterSelect={(id) => handleSelect(id)}
 *   activeFilterIds={['status-active']}
 * />
 *
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter('status-active')}
 * />
 *
 * // Biaxial chip with value switching
 * <FilterSelectChip
 *   value={status}
 *   options={statusOptions}
 *   icon={CheckmarkCircle02Icon}
 *   onChange={setStatus}
 *   onRemove={() => setStatus(null)}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EASING_CURVES = exports.DEFAULT_STYLE_CONFIG = exports.DEFAULT_ANIMATION_CONFIG = exports.FilterSelectChipMotion = exports.DEFAULT_SELECT_CHIP_CONFIG = exports.FilterSelectChip = exports.FilterTrigger = exports.DEFAULT_CHIP_CONFIG = exports.useChipAnimation = exports.FilterChip = exports.DEFAULT_FILTER_ITEMS = exports.FilterMenuHeader = exports.FilterMenu = void 0;
// ============================================================================
// Filter Menu
// ============================================================================
var filter_menu_1 = require("./filter-menu");
Object.defineProperty(exports, "FilterMenu", { enumerable: true, get: function () { return filter_menu_1.FilterMenu; } });
Object.defineProperty(exports, "FilterMenuHeader", { enumerable: true, get: function () { return filter_menu_1.FilterMenuHeader; } });
Object.defineProperty(exports, "DEFAULT_FILTER_ITEMS", { enumerable: true, get: function () { return filter_menu_1.DEFAULT_FILTER_ITEMS; } });
// ============================================================================
// Filter Chip
// ============================================================================
var filter_chip_1 = require("./filter-chip");
Object.defineProperty(exports, "FilterChip", { enumerable: true, get: function () { return filter_chip_1.FilterChip; } });
Object.defineProperty(exports, "useChipAnimation", { enumerable: true, get: function () { return filter_chip_1.useChipAnimation; } });
Object.defineProperty(exports, "DEFAULT_CHIP_CONFIG", { enumerable: true, get: function () { return filter_chip_1.DEFAULT_CONFIG; } });
// ============================================================================
// Filter Trigger
// ============================================================================
var filter_trigger_1 = require("./filter-trigger");
Object.defineProperty(exports, "FilterTrigger", { enumerable: true, get: function () { return filter_trigger_1.FilterTrigger; } });
// ============================================================================
// Filter Select Chip (Biaxial)
// ============================================================================
var filter_select_chip_1 = require("./filter-select-chip");
Object.defineProperty(exports, "FilterSelectChip", { enumerable: true, get: function () { return filter_select_chip_1.FilterSelectChip; } });
Object.defineProperty(exports, "DEFAULT_SELECT_CHIP_CONFIG", { enumerable: true, get: function () { return filter_select_chip_1.DEFAULT_SELECT_CHIP_CONFIG; } });
// ============================================================================
// Filter Select Chip Motion (Motion-based with AnimatePresence)
// ============================================================================
var filter_select_chip_motion_1 = require("./filter-select-chip-motion");
Object.defineProperty(exports, "FilterSelectChipMotion", { enumerable: true, get: function () { return filter_select_chip_motion_1.FilterSelectChipMotion; } });
Object.defineProperty(exports, "DEFAULT_ANIMATION_CONFIG", { enumerable: true, get: function () { return filter_select_chip_motion_1.DEFAULT_ANIMATION_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_STYLE_CONFIG", { enumerable: true, get: function () { return filter_select_chip_motion_1.DEFAULT_STYLE_CONFIG; } });
Object.defineProperty(exports, "EASING_CURVES", { enumerable: true, get: function () { return filter_select_chip_motion_1.EASING_CURVES; } });
//# sourceMappingURL=index.js.map