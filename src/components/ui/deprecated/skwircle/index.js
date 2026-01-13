"use strict";
/**
 * Skwircle - Unified Squircle Component
 *
 * Production-ready squircle primitive with variant-first API
 * and smart FOUC prevention.
 *
 * @example Basic
 * ```tsx
 * import { Skwircle } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
 *
 * <Skwircle variant="card" intent="default">
 *   Card content
 * </Skwircle>
 * ```
 *
 * @example Compound Components
 * ```tsx
 * <Skwircle.Card elevation="sm">Card</Skwircle.Card>
 * <Skwircle.Button intent="primary">Button</Skwircle.Button>
 * <Skwircle.Badge intent="success">Badge</Skwircle.Badge>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChangeTypeColor = exports.getMetricTileSizeConfig = exports.CHANGE_TYPE_COLORS = exports.METRIC_TILE_SIZE_CONFIGS = exports.METRIC_TILE_DEFAULTS = exports.MetricTile = exports.getButtonPaddingStyle = exports.getButtonIconStyle = exports.getButtonIntentConfig = exports.getButtonSizeConfig = exports.BUTTON_INTENT_CONFIGS = exports.BUTTON_SIZE_CONFIGS = exports.getBadgeTextStyle = exports.getBadgeIconStyle = exports.getBadgePaddingStyle = exports.getBadgeColorConfig = exports.getBadgeTypeConfig = exports.getBadgeSizeConfig = exports.BADGE_COLOR_MODERN_GRAY = exports.BADGE_COLOR_CONFIGS = exports.BADGE_TYPE_CONFIGS = exports.BADGE_SIZE_CONFIGS = exports.getVariantConfig = exports.getIntentConfig = exports.BACKGROUND_GRADIENT_PRESETS = exports.GRADIENT_BORDER_PRESETS = exports.ELEVATION_CONFIGS = exports.ROUNDNESS_CONFIGS = exports.INTENT_CONFIGS = exports.VARIANT_CONFIGS = exports.Skwircle = void 0;
// Main component
var skwircle_1 = require("./skwircle");
Object.defineProperty(exports, "Skwircle", { enumerable: true, get: function () { return skwircle_1.Skwircle; } });
// Config (for advanced customization)
var config_1 = require("./config");
Object.defineProperty(exports, "VARIANT_CONFIGS", { enumerable: true, get: function () { return config_1.VARIANT_CONFIGS; } });
Object.defineProperty(exports, "INTENT_CONFIGS", { enumerable: true, get: function () { return config_1.INTENT_CONFIGS; } });
Object.defineProperty(exports, "ROUNDNESS_CONFIGS", { enumerable: true, get: function () { return config_1.ROUNDNESS_CONFIGS; } });
Object.defineProperty(exports, "ELEVATION_CONFIGS", { enumerable: true, get: function () { return config_1.ELEVATION_CONFIGS; } });
Object.defineProperty(exports, "GRADIENT_BORDER_PRESETS", { enumerable: true, get: function () { return config_1.GRADIENT_BORDER_PRESETS; } });
Object.defineProperty(exports, "BACKGROUND_GRADIENT_PRESETS", { enumerable: true, get: function () { return config_1.BACKGROUND_GRADIENT_PRESETS; } });
Object.defineProperty(exports, "getIntentConfig", { enumerable: true, get: function () { return config_1.getIntentConfig; } });
Object.defineProperty(exports, "getVariantConfig", { enumerable: true, get: function () { return config_1.getVariantConfig; } });
// Badge-specific configuration
Object.defineProperty(exports, "BADGE_SIZE_CONFIGS", { enumerable: true, get: function () { return config_1.BADGE_SIZE_CONFIGS; } });
Object.defineProperty(exports, "BADGE_TYPE_CONFIGS", { enumerable: true, get: function () { return config_1.BADGE_TYPE_CONFIGS; } });
Object.defineProperty(exports, "BADGE_COLOR_CONFIGS", { enumerable: true, get: function () { return config_1.BADGE_COLOR_CONFIGS; } });
Object.defineProperty(exports, "BADGE_COLOR_MODERN_GRAY", { enumerable: true, get: function () { return config_1.BADGE_COLOR_MODERN_GRAY; } });
Object.defineProperty(exports, "getBadgeSizeConfig", { enumerable: true, get: function () { return config_1.getBadgeSizeConfig; } });
Object.defineProperty(exports, "getBadgeTypeConfig", { enumerable: true, get: function () { return config_1.getBadgeTypeConfig; } });
Object.defineProperty(exports, "getBadgeColorConfig", { enumerable: true, get: function () { return config_1.getBadgeColorConfig; } });
Object.defineProperty(exports, "getBadgePaddingStyle", { enumerable: true, get: function () { return config_1.getBadgePaddingStyle; } });
Object.defineProperty(exports, "getBadgeIconStyle", { enumerable: true, get: function () { return config_1.getBadgeIconStyle; } });
Object.defineProperty(exports, "getBadgeTextStyle", { enumerable: true, get: function () { return config_1.getBadgeTextStyle; } });
// Button-specific configuration
Object.defineProperty(exports, "BUTTON_SIZE_CONFIGS", { enumerable: true, get: function () { return config_1.BUTTON_SIZE_CONFIGS; } });
Object.defineProperty(exports, "BUTTON_INTENT_CONFIGS", { enumerable: true, get: function () { return config_1.BUTTON_INTENT_CONFIGS; } });
Object.defineProperty(exports, "getButtonSizeConfig", { enumerable: true, get: function () { return config_1.getButtonSizeConfig; } });
Object.defineProperty(exports, "getButtonIntentConfig", { enumerable: true, get: function () { return config_1.getButtonIntentConfig; } });
Object.defineProperty(exports, "getButtonIconStyle", { enumerable: true, get: function () { return config_1.getButtonIconStyle; } });
Object.defineProperty(exports, "getButtonPaddingStyle", { enumerable: true, get: function () { return config_1.getButtonPaddingStyle; } });
// Composed components (semantic wrappers)
var composed_1 = require("./composed");
Object.defineProperty(exports, "MetricTile", { enumerable: true, get: function () { return composed_1.MetricTile; } });
Object.defineProperty(exports, "METRIC_TILE_DEFAULTS", { enumerable: true, get: function () { return composed_1.METRIC_TILE_DEFAULTS; } });
Object.defineProperty(exports, "METRIC_TILE_SIZE_CONFIGS", { enumerable: true, get: function () { return composed_1.METRIC_TILE_SIZE_CONFIGS; } });
Object.defineProperty(exports, "CHANGE_TYPE_COLORS", { enumerable: true, get: function () { return composed_1.CHANGE_TYPE_COLORS; } });
Object.defineProperty(exports, "getMetricTileSizeConfig", { enumerable: true, get: function () { return composed_1.getMetricTileSizeConfig; } });
Object.defineProperty(exports, "getChangeTypeColor", { enumerable: true, get: function () { return composed_1.getChangeTypeColor; } });
//# sourceMappingURL=index.js.map