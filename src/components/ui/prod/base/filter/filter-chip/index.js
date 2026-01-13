"use strict";
/**
 * Filter Chip
 *
 * Expanding filter chip that animates from icon to full value display.
 *
 * @module prod/base/filter/filter-chip
 *
 * @example Basic Usage
 * ```tsx
 * import { FilterChip } from '@/components/ui/prod/base/filter/filter-chip'
 * import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
 *
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter('status-active')}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSizeConfig = exports.mergeConfig = exports.DURATION_COLLAPSE = exports.DURATION_EXPAND = exports.EASING_EXPO_OUT = exports.ROUNDED_CLASSES = exports.SIZE_CONFIGS = exports.DEFAULT_CONFIG = exports.useChipAnimation = exports.FilterChip = void 0;
var filter_chip_1 = require("./filter-chip");
Object.defineProperty(exports, "FilterChip", { enumerable: true, get: function () { return filter_chip_1.FilterChip; } });
var use_chip_animation_1 = require("./use-chip-animation");
Object.defineProperty(exports, "useChipAnimation", { enumerable: true, get: function () { return use_chip_animation_1.useChipAnimation; } });
var config_1 = require("./config");
Object.defineProperty(exports, "DEFAULT_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_CONFIG; } });
Object.defineProperty(exports, "SIZE_CONFIGS", { enumerable: true, get: function () { return config_1.SIZE_CONFIGS; } });
Object.defineProperty(exports, "ROUNDED_CLASSES", { enumerable: true, get: function () { return config_1.ROUNDED_CLASSES; } });
Object.defineProperty(exports, "EASING_EXPO_OUT", { enumerable: true, get: function () { return config_1.EASING_EXPO_OUT; } });
Object.defineProperty(exports, "DURATION_EXPAND", { enumerable: true, get: function () { return config_1.DURATION_EXPAND; } });
Object.defineProperty(exports, "DURATION_COLLAPSE", { enumerable: true, get: function () { return config_1.DURATION_COLLAPSE; } });
Object.defineProperty(exports, "mergeConfig", { enumerable: true, get: function () { return config_1.mergeConfig; } });
Object.defineProperty(exports, "getSizeConfig", { enumerable: true, get: function () { return config_1.getSizeConfig; } });
//# sourceMappingURL=index.js.map