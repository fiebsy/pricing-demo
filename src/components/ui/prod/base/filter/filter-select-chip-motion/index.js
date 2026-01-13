"use strict";
/**
 * FilterSelectChipMotion
 *
 * Motion-based filter chip with AnimatePresence + popLayout for fluid
 * add/remove animations. Uses Base UI Select for dropdown functionality.
 *
 * @module prod/base/filter/filter-select-chip-motion
 *
 * @example
 * ```tsx
 * import { FilterSelectChipMotion } from '@/components/ui/prod/base/filter'
 *
 * const FILTERS = [
 *   {
 *     id: 'status',
 *     label: 'Status',
 *     value: 'active',
 *     options: [
 *       { id: 'all', label: 'All' },
 *       { id: 'active', label: 'Active' },
 *       { id: 'pending', label: 'Pending' },
 *     ],
 *   },
 * ]
 *
 * <FilterSelectChipMotion
 *   filters={filters}
 *   onFilterChange={(id, value) => updateFilter(id, value)}
 *   onFilterRemove={(id) => removeFilter(id)}
 *   animationConfig={{ transitionType: 'tween', duration: 0.15 }}
 *   styleConfig={{ size: 'sm', roundness: 'full' }}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveButton = exports.OptionItem = exports.ChipPopup = exports.ChipTrigger = exports.AnimatedChip = exports.PRESET_OPTIONS = exports.ROUNDNESS_OPTIONS = exports.GAP_OPTIONS = exports.SIZE_OPTIONS = exports.EASING_OPTIONS = exports.TRANSITION_TYPE_OPTIONS = exports.getPresetConfig = exports.buildLayoutTransition = exports.getRoundnessClass = exports.getGapClass = exports.getSizeConfig = exports.mergeStyleConfig = exports.mergeAnimationConfig = exports.ANIMATION_PRESETS = exports.EASING_CURVES = exports.ROUNDNESS_MAP = exports.GAP_MAP = exports.SIZE_MAP = exports.DEFAULT_STYLE_CONFIG = exports.DEFAULT_ANIMATION_CONFIG = exports.FilterSelectChipMotion = void 0;
// ============================================================================
// COMPONENT
// ============================================================================
var filter_select_chip_motion_1 = require("./filter-select-chip-motion");
Object.defineProperty(exports, "FilterSelectChipMotion", { enumerable: true, get: function () { return filter_select_chip_motion_1.FilterSelectChipMotion; } });
// ============================================================================
// CONFIGURATION
// ============================================================================
var config_1 = require("./config");
// Defaults
Object.defineProperty(exports, "DEFAULT_ANIMATION_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_ANIMATION_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_STYLE_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_STYLE_CONFIG; } });
// Mappings
Object.defineProperty(exports, "SIZE_MAP", { enumerable: true, get: function () { return config_1.SIZE_MAP; } });
Object.defineProperty(exports, "GAP_MAP", { enumerable: true, get: function () { return config_1.GAP_MAP; } });
Object.defineProperty(exports, "ROUNDNESS_MAP", { enumerable: true, get: function () { return config_1.ROUNDNESS_MAP; } });
Object.defineProperty(exports, "EASING_CURVES", { enumerable: true, get: function () { return config_1.EASING_CURVES; } });
Object.defineProperty(exports, "ANIMATION_PRESETS", { enumerable: true, get: function () { return config_1.ANIMATION_PRESETS; } });
// Helpers
Object.defineProperty(exports, "mergeAnimationConfig", { enumerable: true, get: function () { return config_1.mergeAnimationConfig; } });
Object.defineProperty(exports, "mergeStyleConfig", { enumerable: true, get: function () { return config_1.mergeStyleConfig; } });
Object.defineProperty(exports, "getSizeConfig", { enumerable: true, get: function () { return config_1.getSizeConfig; } });
Object.defineProperty(exports, "getGapClass", { enumerable: true, get: function () { return config_1.getGapClass; } });
Object.defineProperty(exports, "getRoundnessClass", { enumerable: true, get: function () { return config_1.getRoundnessClass; } });
Object.defineProperty(exports, "buildLayoutTransition", { enumerable: true, get: function () { return config_1.buildLayoutTransition; } });
Object.defineProperty(exports, "getPresetConfig", { enumerable: true, get: function () { return config_1.getPresetConfig; } });
// Playground options (for control panels)
Object.defineProperty(exports, "TRANSITION_TYPE_OPTIONS", { enumerable: true, get: function () { return config_1.TRANSITION_TYPE_OPTIONS; } });
Object.defineProperty(exports, "EASING_OPTIONS", { enumerable: true, get: function () { return config_1.EASING_OPTIONS; } });
Object.defineProperty(exports, "SIZE_OPTIONS", { enumerable: true, get: function () { return config_1.SIZE_OPTIONS; } });
Object.defineProperty(exports, "GAP_OPTIONS", { enumerable: true, get: function () { return config_1.GAP_OPTIONS; } });
Object.defineProperty(exports, "ROUNDNESS_OPTIONS", { enumerable: true, get: function () { return config_1.ROUNDNESS_OPTIONS; } });
Object.defineProperty(exports, "PRESET_OPTIONS", { enumerable: true, get: function () { return config_1.PRESET_OPTIONS; } });
// ============================================================================
// SUBCOMPONENTS (for advanced composition)
// ============================================================================
var components_1 = require("./components");
Object.defineProperty(exports, "AnimatedChip", { enumerable: true, get: function () { return components_1.AnimatedChip; } });
Object.defineProperty(exports, "ChipTrigger", { enumerable: true, get: function () { return components_1.ChipTrigger; } });
Object.defineProperty(exports, "ChipPopup", { enumerable: true, get: function () { return components_1.ChipPopup; } });
Object.defineProperty(exports, "OptionItem", { enumerable: true, get: function () { return components_1.OptionItem; } });
Object.defineProperty(exports, "RemoveButton", { enumerable: true, get: function () { return components_1.RemoveButton; } });
//# sourceMappingURL=index.js.map