"use strict";
/**
 * Unified Presets
 *
 * Centralized preset system for all component configurations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPreset = exports.createInitialPlaygroundState = exports.getMetricTileConfigFromPreset = exports.getFilterConfigsFromPreset = exports.getTableConfigFromPreset = exports.getDefaultPreset = exports.getUnifiedPreset = exports.UNIFIED_PRESETS = exports.GAN2_PRESET = void 0;
var gan2_preset_1 = require("./gan2-preset");
// Constants
Object.defineProperty(exports, "GAN2_PRESET", { enumerable: true, get: function () { return gan2_preset_1.GAN2_PRESET; } });
Object.defineProperty(exports, "UNIFIED_PRESETS", { enumerable: true, get: function () { return gan2_preset_1.UNIFIED_PRESETS; } });
// Functions
Object.defineProperty(exports, "getUnifiedPreset", { enumerable: true, get: function () { return gan2_preset_1.getUnifiedPreset; } });
Object.defineProperty(exports, "getDefaultPreset", { enumerable: true, get: function () { return gan2_preset_1.getDefaultPreset; } });
Object.defineProperty(exports, "getTableConfigFromPreset", { enumerable: true, get: function () { return gan2_preset_1.getTableConfigFromPreset; } });
Object.defineProperty(exports, "getFilterConfigsFromPreset", { enumerable: true, get: function () { return gan2_preset_1.getFilterConfigsFromPreset; } });
Object.defineProperty(exports, "getMetricTileConfigFromPreset", { enumerable: true, get: function () { return gan2_preset_1.getMetricTileConfigFromPreset; } });
Object.defineProperty(exports, "createInitialPlaygroundState", { enumerable: true, get: function () { return gan2_preset_1.createInitialPlaygroundState; } });
Object.defineProperty(exports, "applyPreset", { enumerable: true, get: function () { return gan2_preset_1.applyPreset; } });
//# sourceMappingURL=index.js.map