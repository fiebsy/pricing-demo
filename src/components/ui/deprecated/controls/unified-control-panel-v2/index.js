"use strict";
/**
 * Unified Control Panel V2
 *
 * Exports all public API for the V2 control panel.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePanel = exports.usePanelActions = exports.usePanelState = exports.PanelProvider = exports.UnifiedControlPanelV2 = void 0;
// Main component
var unified_control_panel_v2_1 = require("./unified-control-panel-v2");
Object.defineProperty(exports, "UnifiedControlPanelV2", { enumerable: true, get: function () { return unified_control_panel_v2_1.UnifiedControlPanelV2; } });
// Context hooks
var context_1 = require("./context");
Object.defineProperty(exports, "PanelProvider", { enumerable: true, get: function () { return context_1.PanelProvider; } });
Object.defineProperty(exports, "usePanelState", { enumerable: true, get: function () { return context_1.usePanelState; } });
Object.defineProperty(exports, "usePanelActions", { enumerable: true, get: function () { return context_1.usePanelActions; } });
Object.defineProperty(exports, "usePanel", { enumerable: true, get: function () { return context_1.usePanel; } });
//# sourceMappingURL=index.js.map