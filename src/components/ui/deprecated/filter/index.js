"use strict";
/**
 * Base UI Filter - Filter Components
 *
 * Production-ready filter components for adding and displaying active filters.
 *
 * ## Quick Start (Recommended)
 *
 * Use `FilterChip` for the simplest experience - it includes all defaults:
 *
 * ```tsx
 * import { FilterChip, AddFilterMenu } from '@/components/ui/filter'
 * import { CheckmarkCircle02Icon } from '@hugeicons-pro/core-stroke-rounded'
 *
 * // Simple filter chip with icon
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter(id)}
 * />
 *
 * // Filter chip with label instead of icon
 * <FilterChip
 *   label="Status"
 *   value="Active"
 *   onRemove={() => removeFilter(id)}
 * />
 *
 * // Small preset
 * <FilterChip
 *   preset="small"
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter(id)}
 * />
 *
 * // Add filter menu (trigger + dropdown)
 * <AddFilterMenu
 *   onFilterSelect={(filterId) => handleSelect(filterId)}
 *   activeFilterIds={activeFilters.map(f => f.id)}
 * />
 * ```
 *
 * ## Components
 *
 * | Component | Description |
 * |-----------|-------------|
 * | `FilterChip` | **Recommended** - Simple wrapper with all defaults |
 * | `AddFilterMenu` | Trigger button + dropdown menu |
 * | `ExpandingFilterChip` | Low-level chip (use FilterChip instead) |
 * | `AnimatedChipWrapper` | Fade-in animation (built into FilterChip) |
 *
 * ## Presets
 *
 * | Preset | Height | Description |
 * |--------|--------|-------------|
 * | `'default'` | 32px | Standard size, fully rounded |
 * | `'small'` | 28px | Compact size, tighter spacing |
 *
 * ## Advanced Usage
 *
 * For custom configurations, pass `chipConfig`:
 *
 * ```tsx
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   chipConfig={{
 *     size: 'lg',
 *     rounded: 'md',
 *     background: 'tertiary',
 *   }}
 *   onRemove={() => removeFilter(id)}
 * />
 * ```
 *
 * @module base-ui/filter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTER_MENU_ITEMS = exports.getChipStylePreset = exports.CHIP_STYLE_PRESETS = exports.DEFAULT_CHIP_STYLE = exports.stylingToAppearance = exports.getFilterPreset = exports.FILTER_MENU_PRESETS = exports.DEFAULT_FILTER_APPEARANCE = exports.DEFAULT_FILTER_STYLING_CONFIG = exports.TOUCH_TARGET_SIZE = exports.GAP_CONFIG = exports.ROUNDING_CONFIG = exports.SIZE_CONFIG = exports.OPACITY_CROSSFADE_RATIO = exports.OPACITY_FADE_RATIO = exports.DURATION_PANEL_TRANSITION = exports.DURATION_FADE_IN = exports.DURATION_COLLAPSE = exports.DURATION_EXPAND = exports.EASING_EASE_OUT = exports.EASING_EXPO_OUT = exports.FilterTriggerButton = exports.CloseButton = exports.ChipBase = exports.buildChipClassFromConfig = exports.useChipMeasurement = exports.useChipAnimation = exports.AnimatedChipWrapper = exports.FilterHeader = exports.ExpandingFilterChip = exports.AddFilterMenu = exports.FilterChip = void 0;
// =============================================================================
// COMPONENTS (Recommended)
// =============================================================================
/**
 * FilterChip - The recommended way to use filter chips
 * Includes all defaults, animation wrapper, and className generation
 */
var filter_chip_1 = require("./components/filter-chip");
Object.defineProperty(exports, "FilterChip", { enumerable: true, get: function () { return filter_chip_1.FilterChip; } });
/**
 * AddFilterMenu - Trigger button + dropdown for adding filters
 */
var add_filter_menu_1 = require("./components/add-filter-menu");
Object.defineProperty(exports, "AddFilterMenu", { enumerable: true, get: function () { return add_filter_menu_1.AddFilterMenu; } });
// =============================================================================
// COMPONENTS (Advanced/Low-level)
// =============================================================================
/**
 * ExpandingFilterChip - Low-level chip component
 * Use FilterChip instead for simpler usage
 */
var expanding_filter_chip_1 = require("./components/expanding-filter-chip");
Object.defineProperty(exports, "ExpandingFilterChip", { enumerable: true, get: function () { return expanding_filter_chip_1.ExpandingFilterChip; } });
var filter_header_1 = require("./components/filter-header");
Object.defineProperty(exports, "FilterHeader", { enumerable: true, get: function () { return filter_header_1.FilterHeader; } });
var animated_chip_wrapper_1 = require("./components/animated-chip-wrapper");
Object.defineProperty(exports, "AnimatedChipWrapper", { enumerable: true, get: function () { return animated_chip_wrapper_1.AnimatedChipWrapper; } });
// Hooks (for advanced/custom implementations)
var expanding_filter_chip_2 = require("./components/expanding-filter-chip");
Object.defineProperty(exports, "useChipAnimation", { enumerable: true, get: function () { return expanding_filter_chip_2.useChipAnimation; } });
Object.defineProperty(exports, "useChipMeasurement", { enumerable: true, get: function () { return expanding_filter_chip_2.useChipMeasurement; } });
// =============================================================================
// UTILITIES
// =============================================================================
/**
 * Build className from ChipStyleConfig
 * Used internally by FilterChip, exported for advanced use
 */
var utils_1 = require("./utils");
Object.defineProperty(exports, "buildChipClassFromConfig", { enumerable: true, get: function () { return utils_1.buildChipClassFromConfig; } });
// =============================================================================
// PRIMITIVES
// =============================================================================
var primitives_1 = require("./primitives");
Object.defineProperty(exports, "ChipBase", { enumerable: true, get: function () { return primitives_1.ChipBase; } });
Object.defineProperty(exports, "CloseButton", { enumerable: true, get: function () { return primitives_1.CloseButton; } });
Object.defineProperty(exports, "FilterTriggerButton", { enumerable: true, get: function () { return primitives_1.FilterTriggerButton; } });
// =============================================================================
// CONSTANTS
// =============================================================================
var constants_1 = require("./constants");
// Animation
Object.defineProperty(exports, "EASING_EXPO_OUT", { enumerable: true, get: function () { return constants_1.EASING_EXPO_OUT; } });
Object.defineProperty(exports, "EASING_EASE_OUT", { enumerable: true, get: function () { return constants_1.EASING_EASE_OUT; } });
Object.defineProperty(exports, "DURATION_EXPAND", { enumerable: true, get: function () { return constants_1.DURATION_EXPAND; } });
Object.defineProperty(exports, "DURATION_COLLAPSE", { enumerable: true, get: function () { return constants_1.DURATION_COLLAPSE; } });
Object.defineProperty(exports, "DURATION_FADE_IN", { enumerable: true, get: function () { return constants_1.DURATION_FADE_IN; } });
Object.defineProperty(exports, "DURATION_PANEL_TRANSITION", { enumerable: true, get: function () { return constants_1.DURATION_PANEL_TRANSITION; } });
Object.defineProperty(exports, "OPACITY_FADE_RATIO", { enumerable: true, get: function () { return constants_1.OPACITY_FADE_RATIO; } });
Object.defineProperty(exports, "OPACITY_CROSSFADE_RATIO", { enumerable: true, get: function () { return constants_1.OPACITY_CROSSFADE_RATIO; } });
// Sizing
Object.defineProperty(exports, "SIZE_CONFIG", { enumerable: true, get: function () { return constants_1.SIZE_CONFIG; } });
Object.defineProperty(exports, "ROUNDING_CONFIG", { enumerable: true, get: function () { return constants_1.ROUNDING_CONFIG; } });
Object.defineProperty(exports, "GAP_CONFIG", { enumerable: true, get: function () { return constants_1.GAP_CONFIG; } });
Object.defineProperty(exports, "TOUCH_TARGET_SIZE", { enumerable: true, get: function () { return constants_1.TOUCH_TARGET_SIZE; } });
// =============================================================================
// CONFIGURATION
// =============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "DEFAULT_FILTER_STYLING_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_FILTER_STYLING_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_FILTER_APPEARANCE", { enumerable: true, get: function () { return config_1.DEFAULT_FILTER_APPEARANCE; } });
Object.defineProperty(exports, "FILTER_MENU_PRESETS", { enumerable: true, get: function () { return config_1.FILTER_MENU_PRESETS; } });
Object.defineProperty(exports, "getFilterPreset", { enumerable: true, get: function () { return config_1.getFilterPreset; } });
Object.defineProperty(exports, "stylingToAppearance", { enumerable: true, get: function () { return config_1.stylingToAppearance; } });
// Chip style presets
Object.defineProperty(exports, "DEFAULT_CHIP_STYLE", { enumerable: true, get: function () { return config_1.DEFAULT_CHIP_STYLE; } });
Object.defineProperty(exports, "CHIP_STYLE_PRESETS", { enumerable: true, get: function () { return config_1.CHIP_STYLE_PRESETS; } });
Object.defineProperty(exports, "getChipStylePreset", { enumerable: true, get: function () { return config_1.getChipStylePreset; } });
// =============================================================================
// DATA
// =============================================================================
var filter_menu_items_1 = require("./data/filter-menu-items");
Object.defineProperty(exports, "DEFAULT_FILTER_MENU_ITEMS", { enumerable: true, get: function () { return filter_menu_items_1.DEFAULT_FILTER_MENU_ITEMS; } });
//# sourceMappingURL=index.js.map