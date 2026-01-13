"use strict";
/**
 * Skwircle Components
 *
 * Pre-configured compound components for common use cases.
 * Each component is a thin wrapper around the base Skwircle with variant preset.
 *
 * Usage: Import from the main skwircle index for compound component pattern:
 * ```tsx
 * import { Skwircle } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
 *
 * <Skwircle.Button intent="primary">...</Skwircle.Button>
 * <Skwircle.Card elevation="sm">...</Skwircle.Card>
 * ```
 *
 * Or import config helpers directly:
 * ```tsx
 * import {
 *   BUTTON_SIZE_CONFIGS,
 *   getButtonPaddingStyle,
 *   getBadgeColorConfig,
 * } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkwircleAvatar = exports.createSkwircleInput = exports.createSkwircleCard = exports.getBadgeTextStyle = exports.getBadgeIconStyle = exports.getBadgePaddingStyle = exports.getBadgeColorConfig = exports.getBadgeTypeConfig = exports.getBadgeSizeConfig = exports.BADGE_COLOR_MODERN_GRAY = exports.BADGE_COLOR_CONFIGS = exports.BADGE_TYPE_CONFIGS = exports.BADGE_SIZE_CONFIGS = exports.createSkwircleBadge = exports.getButtonPaddingStyle = exports.getButtonIconStyle = exports.getButtonIntentConfig = exports.getButtonSizeConfig = exports.BUTTON_INTENT_CONFIGS = exports.BUTTON_SIZE_CONFIGS = exports.createSkwircleButton = void 0;
// Button component and config
var skwircle_button_1 = require("./skwircle-button");
Object.defineProperty(exports, "createSkwircleButton", { enumerable: true, get: function () { return skwircle_button_1.createSkwircleButton; } });
// Re-exported config
Object.defineProperty(exports, "BUTTON_SIZE_CONFIGS", { enumerable: true, get: function () { return skwircle_button_1.BUTTON_SIZE_CONFIGS; } });
Object.defineProperty(exports, "BUTTON_INTENT_CONFIGS", { enumerable: true, get: function () { return skwircle_button_1.BUTTON_INTENT_CONFIGS; } });
Object.defineProperty(exports, "getButtonSizeConfig", { enumerable: true, get: function () { return skwircle_button_1.getButtonSizeConfig; } });
Object.defineProperty(exports, "getButtonIntentConfig", { enumerable: true, get: function () { return skwircle_button_1.getButtonIntentConfig; } });
Object.defineProperty(exports, "getButtonIconStyle", { enumerable: true, get: function () { return skwircle_button_1.getButtonIconStyle; } });
Object.defineProperty(exports, "getButtonPaddingStyle", { enumerable: true, get: function () { return skwircle_button_1.getButtonPaddingStyle; } });
// Badge component and config
var skwircle_badge_1 = require("./skwircle-badge");
Object.defineProperty(exports, "createSkwircleBadge", { enumerable: true, get: function () { return skwircle_badge_1.createSkwircleBadge; } });
// Re-exported config
Object.defineProperty(exports, "BADGE_SIZE_CONFIGS", { enumerable: true, get: function () { return skwircle_badge_1.BADGE_SIZE_CONFIGS; } });
Object.defineProperty(exports, "BADGE_TYPE_CONFIGS", { enumerable: true, get: function () { return skwircle_badge_1.BADGE_TYPE_CONFIGS; } });
Object.defineProperty(exports, "BADGE_COLOR_CONFIGS", { enumerable: true, get: function () { return skwircle_badge_1.BADGE_COLOR_CONFIGS; } });
Object.defineProperty(exports, "BADGE_COLOR_MODERN_GRAY", { enumerable: true, get: function () { return skwircle_badge_1.BADGE_COLOR_MODERN_GRAY; } });
Object.defineProperty(exports, "getBadgeSizeConfig", { enumerable: true, get: function () { return skwircle_badge_1.getBadgeSizeConfig; } });
Object.defineProperty(exports, "getBadgeTypeConfig", { enumerable: true, get: function () { return skwircle_badge_1.getBadgeTypeConfig; } });
Object.defineProperty(exports, "getBadgeColorConfig", { enumerable: true, get: function () { return skwircle_badge_1.getBadgeColorConfig; } });
Object.defineProperty(exports, "getBadgePaddingStyle", { enumerable: true, get: function () { return skwircle_badge_1.getBadgePaddingStyle; } });
Object.defineProperty(exports, "getBadgeIconStyle", { enumerable: true, get: function () { return skwircle_badge_1.getBadgeIconStyle; } });
Object.defineProperty(exports, "getBadgeTextStyle", { enumerable: true, get: function () { return skwircle_badge_1.getBadgeTextStyle; } });
// Card component
var skwircle_card_1 = require("./skwircle-card");
Object.defineProperty(exports, "createSkwircleCard", { enumerable: true, get: function () { return skwircle_card_1.createSkwircleCard; } });
// Input component
var skwircle_input_1 = require("./skwircle-input");
Object.defineProperty(exports, "createSkwircleInput", { enumerable: true, get: function () { return skwircle_input_1.createSkwircleInput; } });
// Avatar component
var skwircle_avatar_1 = require("./skwircle-avatar");
Object.defineProperty(exports, "createSkwircleAvatar", { enumerable: true, get: function () { return skwircle_avatar_1.createSkwircleAvatar; } });
//# sourceMappingURL=index.js.map