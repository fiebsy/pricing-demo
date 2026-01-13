"use strict";
/**
 * Skwircle Button Component
 *
 * A pre-configured button variant of Skwircle with proper styling helpers.
 * Uses config from ./config/button.ts for size and intent presets.
 *
 * @example Basic
 * ```tsx
 * <SkwircleButton intent="primary">
 *   <span className="px-4 py-2">Click me</span>
 * </SkwircleButton>
 * ```
 *
 * @example With size config helpers
 * ```tsx
 * const sizeConfig = BUTTON_SIZE_CONFIGS.md
 * const padding = getButtonPaddingStyle('md', false, true)
 *
 * <SkwircleButton intent="primary">
 *   <span className={sizeConfig.textClass} style={padding}>
 *     Button Text
 *   </span>
 * </SkwircleButton>
 * ```
 */
'use client';
/**
 * Skwircle Button Component
 *
 * A pre-configured button variant of Skwircle with proper styling helpers.
 * Uses config from ./config/button.ts for size and intent presets.
 *
 * @example Basic
 * ```tsx
 * <SkwircleButton intent="primary">
 *   <span className="px-4 py-2">Click me</span>
 * </SkwircleButton>
 * ```
 *
 * @example With size config helpers
 * ```tsx
 * const sizeConfig = BUTTON_SIZE_CONFIGS.md
 * const padding = getButtonPaddingStyle('md', false, true)
 *
 * <SkwircleButton intent="primary">
 *   <span className={sizeConfig.textClass} style={padding}>
 *     Button Text
 *   </span>
 * </SkwircleButton>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkwircleButton = exports.getButtonPaddingStyle = exports.getButtonIconStyle = exports.getButtonIntentConfig = exports.getButtonSizeConfig = exports.BUTTON_INTENT_CONFIGS = exports.BUTTON_SIZE_CONFIGS = void 0;
const React = require("react");
// Re-export button config for easy access
var button_1 = require("../config/button");
Object.defineProperty(exports, "BUTTON_SIZE_CONFIGS", { enumerable: true, get: function () { return button_1.BUTTON_SIZE_CONFIGS; } });
Object.defineProperty(exports, "BUTTON_INTENT_CONFIGS", { enumerable: true, get: function () { return button_1.BUTTON_INTENT_CONFIGS; } });
Object.defineProperty(exports, "getButtonSizeConfig", { enumerable: true, get: function () { return button_1.getButtonSizeConfig; } });
Object.defineProperty(exports, "getButtonIntentConfig", { enumerable: true, get: function () { return button_1.getButtonIntentConfig; } });
Object.defineProperty(exports, "getButtonIconStyle", { enumerable: true, get: function () { return button_1.getButtonIconStyle; } });
Object.defineProperty(exports, "getButtonPaddingStyle", { enumerable: true, get: function () { return button_1.getButtonPaddingStyle; } });
/**
 * Internal component - gets the base Skwircle injected
 */
const createSkwircleButton = (SkwircleBase) => {
    const SkwircleButton = (props) => {
        return <SkwircleBase variant="button" {...props}/>;
    };
    SkwircleButton.displayName = 'Skwircle.Button';
    return SkwircleButton;
};
exports.createSkwircleButton = createSkwircleButton;
//# sourceMappingURL=skwircle-button.js.map