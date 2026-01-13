"use strict";
/**
 * Unified Control Panel
 *
 * Re-exports all public API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPreset = exports.createInitialPlaygroundState = exports.getMetricTileConfigFromPreset = exports.getFilterConfigsFromPreset = exports.getTableConfigFromPreset = exports.getDefaultPreset = exports.getUnifiedPreset = exports.UNIFIED_PRESETS = exports.GAN2_PRESET = exports.ControlRegistryProvider = exports.useControlRegistry = exports.getRegisteredTypes = exports.hasControl = exports.getControl = exports.unregisterControl = exports.registerControl = exports.usePanelContext = exports.usePanelActions = exports.usePanelState = exports.UnifiedControlPanel = void 0;
var unified_control_panel_1 = require("./unified-control-panel");
Object.defineProperty(exports, "UnifiedControlPanel", { enumerable: true, get: function () { return unified_control_panel_1.UnifiedControlPanel; } });
// Context hooks
var panel_context_1 = require("./context/panel-context");
Object.defineProperty(exports, "usePanelState", { enumerable: true, get: function () { return panel_context_1.usePanelState; } });
Object.defineProperty(exports, "usePanelActions", { enumerable: true, get: function () { return panel_context_1.usePanelActions; } });
Object.defineProperty(exports, "usePanelContext", { enumerable: true, get: function () { return panel_context_1.usePanelContext; } });
// Control registry
var control_registry_1 = require("./registry/control-registry");
Object.defineProperty(exports, "registerControl", { enumerable: true, get: function () { return control_registry_1.registerControl; } });
Object.defineProperty(exports, "unregisterControl", { enumerable: true, get: function () { return control_registry_1.unregisterControl; } });
Object.defineProperty(exports, "getControl", { enumerable: true, get: function () { return control_registry_1.getControl; } });
Object.defineProperty(exports, "hasControl", { enumerable: true, get: function () { return control_registry_1.hasControl; } });
Object.defineProperty(exports, "getRegisteredTypes", { enumerable: true, get: function () { return control_registry_1.getRegisteredTypes; } });
Object.defineProperty(exports, "useControlRegistry", { enumerable: true, get: function () { return control_registry_1.useControlRegistry; } });
Object.defineProperty(exports, "ControlRegistryProvider", { enumerable: true, get: function () { return control_registry_1.ControlRegistryProvider; } });
// Unified Presets (GAN2)
var presets_1 = require("./presets");
Object.defineProperty(exports, "GAN2_PRESET", { enumerable: true, get: function () { return presets_1.GAN2_PRESET; } });
Object.defineProperty(exports, "UNIFIED_PRESETS", { enumerable: true, get: function () { return presets_1.UNIFIED_PRESETS; } });
Object.defineProperty(exports, "getUnifiedPreset", { enumerable: true, get: function () { return presets_1.getUnifiedPreset; } });
Object.defineProperty(exports, "getDefaultPreset", { enumerable: true, get: function () { return presets_1.getDefaultPreset; } });
Object.defineProperty(exports, "getTableConfigFromPreset", { enumerable: true, get: function () { return presets_1.getTableConfigFromPreset; } });
Object.defineProperty(exports, "getFilterConfigsFromPreset", { enumerable: true, get: function () { return presets_1.getFilterConfigsFromPreset; } });
Object.defineProperty(exports, "getMetricTileConfigFromPreset", { enumerable: true, get: function () { return presets_1.getMetricTileConfigFromPreset; } });
Object.defineProperty(exports, "createInitialPlaygroundState", { enumerable: true, get: function () { return presets_1.createInitialPlaygroundState; } });
Object.defineProperty(exports, "applyPreset", { enumerable: true, get: function () { return presets_1.applyPreset; } });
//# sourceMappingURL=index.js.map