"use strict";
// =============================================================================
// Unified Control Panel - Public API
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlRenderer = exports.TextControlComponent = exports.ColorControlComponent = exports.ToggleControlComponent = exports.ColorSelectControlComponent = exports.SelectControlComponent = exports.SliderControlComponent = exports.ColorSwatch = exports.ControlGrid = exports.ControlGroupWrapper = exports.MinimizedHeader = exports.ActionBar = exports.ActiveSectionContent = exports.SectionRenderer = exports.MinimizeButton = exports.TabTrigger = exports.ScrollableTabList = exports.usePanelContext = exports.PanelProvider = exports.UnifiedControlPanel = void 0;
// Main component
var unified_control_panel_1 = require("./unified-control-panel");
Object.defineProperty(exports, "UnifiedControlPanel", { enumerable: true, get: function () { return unified_control_panel_1.UnifiedControlPanel; } });
// Context for advanced use cases
var context_1 = require("./context");
Object.defineProperty(exports, "PanelProvider", { enumerable: true, get: function () { return context_1.PanelProvider; } });
Object.defineProperty(exports, "usePanelContext", { enumerable: true, get: function () { return context_1.usePanelContext; } });
// Sub-components for composition
var tab_navigation_1 = require("./components/tab-navigation");
Object.defineProperty(exports, "ScrollableTabList", { enumerable: true, get: function () { return tab_navigation_1.ScrollableTabList; } });
Object.defineProperty(exports, "TabTrigger", { enumerable: true, get: function () { return tab_navigation_1.TabTrigger; } });
Object.defineProperty(exports, "MinimizeButton", { enumerable: true, get: function () { return tab_navigation_1.MinimizeButton; } });
var section_renderer_1 = require("./components/section-renderer");
Object.defineProperty(exports, "SectionRenderer", { enumerable: true, get: function () { return section_renderer_1.SectionRenderer; } });
Object.defineProperty(exports, "ActiveSectionContent", { enumerable: true, get: function () { return section_renderer_1.ActiveSectionContent; } });
var action_bar_1 = require("./components/action-bar");
Object.defineProperty(exports, "ActionBar", { enumerable: true, get: function () { return action_bar_1.ActionBar; } });
var minimized_header_1 = require("./components/minimized-header");
Object.defineProperty(exports, "MinimizedHeader", { enumerable: true, get: function () { return minimized_header_1.MinimizedHeader; } });
// Control primitives
var controls_1 = require("./components/controls");
Object.defineProperty(exports, "ControlGroupWrapper", { enumerable: true, get: function () { return controls_1.ControlGroupWrapper; } });
Object.defineProperty(exports, "ControlGrid", { enumerable: true, get: function () { return controls_1.ControlGrid; } });
Object.defineProperty(exports, "ColorSwatch", { enumerable: true, get: function () { return controls_1.ColorSwatch; } });
Object.defineProperty(exports, "SliderControlComponent", { enumerable: true, get: function () { return controls_1.SliderControl; } });
Object.defineProperty(exports, "SelectControlComponent", { enumerable: true, get: function () { return controls_1.SelectControl; } });
Object.defineProperty(exports, "ColorSelectControlComponent", { enumerable: true, get: function () { return controls_1.ColorSelectControl; } });
Object.defineProperty(exports, "ToggleControlComponent", { enumerable: true, get: function () { return controls_1.ToggleControl; } });
Object.defineProperty(exports, "ColorControlComponent", { enumerable: true, get: function () { return controls_1.ColorControl; } });
Object.defineProperty(exports, "TextControlComponent", { enumerable: true, get: function () { return controls_1.TextControl; } });
Object.defineProperty(exports, "ControlRenderer", { enumerable: true, get: function () { return controls_1.ControlRenderer; } });
//# sourceMappingURL=index.js.map