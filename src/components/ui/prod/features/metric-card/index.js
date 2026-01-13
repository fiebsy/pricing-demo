"use strict";
/**
 * MetricCard
 *
 * A composable metric display card with configurable layout, animations, and styling.
 *
 * @module metric-card
 *
 * @example
 * ```tsx
 * import {
 *   MetricCard,
 *   DEFAULT_METRIC_CARD_CONFIG,
 *   METRIC_CARD_PRESETS,
 * } from '@/components/ui/prod/features/metric-card'
 *
 * <MetricCard
 *   label="Total Revenue"
 *   value="$125,000"
 *   count="24 orders"
 *   trend={{ value: 12, direction: 'up', showIcon: true }}
 *   config={METRIC_CARD_PRESETS.flat}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCompactValue = exports.mergeSectionStyles = exports.mergeLayerStyles = exports.getHoverAnimationClasses = exports.buildSectionClasses = exports.buildLayerClasses = exports.buildDepthClass = exports.buildShineClass = exports.METRIC_CARD_PRESETS = exports.METRIC_CARD_PRESET_FLAT = exports.DEFAULT_METRIC_CARD_CONFIG = exports.DEFAULT_VALUE_FORMAT = exports.DEFAULT_TREND_STYLE = exports.DEFAULT_INNER_LAYER_STYLE = exports.DEFAULT_LAYER_STYLE = exports.TREND_COLORS = exports.FONT_WEIGHT_CLASSES = exports.FONT_SIZE_CLASSES = exports.FONT_FAMILY_CLASSES = exports.TEXT_COLOR_CLASSES = exports.BACKGROUND_CLASSES = exports.ICON_SIZE_OPTIONS = exports.BORDER_RADIUS_DEFAULT = exports.TrendBadge = exports.MetricCard = void 0;
// =============================================================================
// MAIN COMPONENT
// =============================================================================
var metric_card_1 = require("./metric-card");
Object.defineProperty(exports, "MetricCard", { enumerable: true, get: function () { return metric_card_1.MetricCard; } });
// =============================================================================
// SUB-COMPONENTS
// =============================================================================
var components_1 = require("./components");
Object.defineProperty(exports, "TrendBadge", { enumerable: true, get: function () { return components_1.TrendBadge; } });
// =============================================================================
// CONFIGURATION
// =============================================================================
var config_1 = require("./config");
// Constants
Object.defineProperty(exports, "BORDER_RADIUS_DEFAULT", { enumerable: true, get: function () { return config_1.BORDER_RADIUS_DEFAULT; } });
Object.defineProperty(exports, "ICON_SIZE_OPTIONS", { enumerable: true, get: function () { return config_1.ICON_SIZE_OPTIONS; } });
// Style mappings
Object.defineProperty(exports, "BACKGROUND_CLASSES", { enumerable: true, get: function () { return config_1.BACKGROUND_CLASSES; } });
Object.defineProperty(exports, "TEXT_COLOR_CLASSES", { enumerable: true, get: function () { return config_1.TEXT_COLOR_CLASSES; } });
Object.defineProperty(exports, "FONT_FAMILY_CLASSES", { enumerable: true, get: function () { return config_1.FONT_FAMILY_CLASSES; } });
Object.defineProperty(exports, "FONT_SIZE_CLASSES", { enumerable: true, get: function () { return config_1.FONT_SIZE_CLASSES; } });
Object.defineProperty(exports, "FONT_WEIGHT_CLASSES", { enumerable: true, get: function () { return config_1.FONT_WEIGHT_CLASSES; } });
Object.defineProperty(exports, "TREND_COLORS", { enumerable: true, get: function () { return config_1.TREND_COLORS; } });
// Default styles
Object.defineProperty(exports, "DEFAULT_LAYER_STYLE", { enumerable: true, get: function () { return config_1.DEFAULT_LAYER_STYLE; } });
Object.defineProperty(exports, "DEFAULT_INNER_LAYER_STYLE", { enumerable: true, get: function () { return config_1.DEFAULT_INNER_LAYER_STYLE; } });
Object.defineProperty(exports, "DEFAULT_TREND_STYLE", { enumerable: true, get: function () { return config_1.DEFAULT_TREND_STYLE; } });
Object.defineProperty(exports, "DEFAULT_VALUE_FORMAT", { enumerable: true, get: function () { return config_1.DEFAULT_VALUE_FORMAT; } });
Object.defineProperty(exports, "DEFAULT_METRIC_CARD_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_METRIC_CARD_CONFIG; } });
// Presets
Object.defineProperty(exports, "METRIC_CARD_PRESET_FLAT", { enumerable: true, get: function () { return config_1.METRIC_CARD_PRESET_FLAT; } });
Object.defineProperty(exports, "METRIC_CARD_PRESETS", { enumerable: true, get: function () { return config_1.METRIC_CARD_PRESETS; } });
// =============================================================================
// UTILITIES
// =============================================================================
var utils_1 = require("./utils");
Object.defineProperty(exports, "buildShineClass", { enumerable: true, get: function () { return utils_1.buildShineClass; } });
Object.defineProperty(exports, "buildDepthClass", { enumerable: true, get: function () { return utils_1.buildDepthClass; } });
Object.defineProperty(exports, "buildLayerClasses", { enumerable: true, get: function () { return utils_1.buildLayerClasses; } });
Object.defineProperty(exports, "buildSectionClasses", { enumerable: true, get: function () { return utils_1.buildSectionClasses; } });
Object.defineProperty(exports, "getHoverAnimationClasses", { enumerable: true, get: function () { return utils_1.getHoverAnimationClasses; } });
Object.defineProperty(exports, "mergeLayerStyles", { enumerable: true, get: function () { return utils_1.mergeLayerStyles; } });
Object.defineProperty(exports, "mergeSectionStyles", { enumerable: true, get: function () { return utils_1.mergeSectionStyles; } });
Object.defineProperty(exports, "formatCompactValue", { enumerable: true, get: function () { return utils_1.formatCompactValue; } });
//# sourceMappingURL=index.js.map