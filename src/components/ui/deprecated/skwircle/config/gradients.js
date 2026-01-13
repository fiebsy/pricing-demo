"use strict";
/**
 * Skwircle Gradient Configuration
 *
 * Border and background gradient presets.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackgroundGradientConfig = exports.getBorderGradientConfig = exports.BACKGROUND_GRADIENT_PRESETS = exports.GRADIENT_BORDER_PRESETS = void 0;
const constants_1 = require("./constants");
Object.defineProperty(exports, "GRADIENT_BORDER_PRESETS", { enumerable: true, get: function () { return constants_1.GRADIENT_BORDER_PRESETS; } });
Object.defineProperty(exports, "BACKGROUND_GRADIENT_PRESETS", { enumerable: true, get: function () { return constants_1.BACKGROUND_GRADIENT_PRESETS; } });
/**
 * Get border gradient configuration.
 */
const getBorderGradientConfig = (preset, customConfig) => {
    if (preset === 'none')
        return null;
    if (preset === 'custom' && customConfig)
        return customConfig;
    return constants_1.GRADIENT_BORDER_PRESETS[preset] ?? null;
};
exports.getBorderGradientConfig = getBorderGradientConfig;
/**
 * Get background gradient configuration.
 */
const getBackgroundGradientConfig = (preset, customConfig) => {
    if (preset === 'none')
        return null;
    if (preset === 'custom' && customConfig)
        return customConfig;
    return constants_1.BACKGROUND_GRADIENT_PRESETS[preset] ?? null;
};
exports.getBackgroundGradientConfig = getBackgroundGradientConfig;
//# sourceMappingURL=gradients.js.map