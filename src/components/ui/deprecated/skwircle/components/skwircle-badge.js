"use strict";
/**
 * Skwircle Badge Component
 *
 * A pre-configured badge variant of Skwircle with color and size helpers.
 * Uses config from ./config/badge.ts for styling presets.
 *
 * @example Basic
 * ```tsx
 * const colorConfig = getBadgeColorConfig('badge', 'success')
 *
 * <SkwircleBadge
 *   backgroundColor={colorConfig.backgroundColor}
 *   borderColor={colorConfig.borderColor}
 * >
 *   <span style={getBadgeTextStyle(colorConfig)}>Success</span>
 * </SkwircleBadge>
 * ```
 *
 * @example Full config
 * ```tsx
 * const colorConfig = getBadgeColorConfig('badge', 'brand')
 * const padding = getBadgePaddingStyle('md', 'leading')
 * const iconStyle = getBadgeIconStyle(colorConfig)
 * const textStyle = getBadgeTextStyle(colorConfig)
 *
 * <SkwircleBadge backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor}>
 *   <span className="flex items-center text-sm" style={padding}>
 *     <span style={iconStyle}><Icon /></span>
 *     <span style={textStyle}>Label</span>
 *   </span>
 * </SkwircleBadge>
 * ```
 */
'use client';
/**
 * Skwircle Badge Component
 *
 * A pre-configured badge variant of Skwircle with color and size helpers.
 * Uses config from ./config/badge.ts for styling presets.
 *
 * @example Basic
 * ```tsx
 * const colorConfig = getBadgeColorConfig('badge', 'success')
 *
 * <SkwircleBadge
 *   backgroundColor={colorConfig.backgroundColor}
 *   borderColor={colorConfig.borderColor}
 * >
 *   <span style={getBadgeTextStyle(colorConfig)}>Success</span>
 * </SkwircleBadge>
 * ```
 *
 * @example Full config
 * ```tsx
 * const colorConfig = getBadgeColorConfig('badge', 'brand')
 * const padding = getBadgePaddingStyle('md', 'leading')
 * const iconStyle = getBadgeIconStyle(colorConfig)
 * const textStyle = getBadgeTextStyle(colorConfig)
 *
 * <SkwircleBadge backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor}>
 *   <span className="flex items-center text-sm" style={padding}>
 *     <span style={iconStyle}><Icon /></span>
 *     <span style={textStyle}>Label</span>
 *   </span>
 * </SkwircleBadge>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkwircleBadge = exports.getBadgeTextStyle = exports.getBadgeIconStyle = exports.getBadgePaddingStyle = exports.getBadgeColorConfig = exports.getBadgeTypeConfig = exports.getBadgeSizeConfig = exports.BADGE_COLOR_MODERN_GRAY = exports.BADGE_COLOR_CONFIGS = exports.BADGE_TYPE_CONFIGS = exports.BADGE_SIZE_CONFIGS = void 0;
const React = require("react");
// Re-export badge config for easy access
var badge_1 = require("../config/badge");
Object.defineProperty(exports, "BADGE_SIZE_CONFIGS", { enumerable: true, get: function () { return badge_1.BADGE_SIZE_CONFIGS; } });
Object.defineProperty(exports, "BADGE_TYPE_CONFIGS", { enumerable: true, get: function () { return badge_1.BADGE_TYPE_CONFIGS; } });
Object.defineProperty(exports, "BADGE_COLOR_CONFIGS", { enumerable: true, get: function () { return badge_1.BADGE_COLOR_CONFIGS; } });
Object.defineProperty(exports, "BADGE_COLOR_MODERN_GRAY", { enumerable: true, get: function () { return badge_1.BADGE_COLOR_MODERN_GRAY; } });
Object.defineProperty(exports, "getBadgeSizeConfig", { enumerable: true, get: function () { return badge_1.getBadgeSizeConfig; } });
Object.defineProperty(exports, "getBadgeTypeConfig", { enumerable: true, get: function () { return badge_1.getBadgeTypeConfig; } });
Object.defineProperty(exports, "getBadgeColorConfig", { enumerable: true, get: function () { return badge_1.getBadgeColorConfig; } });
Object.defineProperty(exports, "getBadgePaddingStyle", { enumerable: true, get: function () { return badge_1.getBadgePaddingStyle; } });
Object.defineProperty(exports, "getBadgeIconStyle", { enumerable: true, get: function () { return badge_1.getBadgeIconStyle; } });
Object.defineProperty(exports, "getBadgeTextStyle", { enumerable: true, get: function () { return badge_1.getBadgeTextStyle; } });
/**
 * Internal component - gets the base Skwircle injected
 */
const createSkwircleBadge = (SkwircleBase) => {
    const SkwircleBadge = (props) => {
        return <SkwircleBase variant="badge" {...props}/>;
    };
    SkwircleBadge.displayName = 'Skwircle.Badge';
    return SkwircleBadge;
};
exports.createSkwircleBadge = createSkwircleBadge;
//# sourceMappingURL=skwircle-badge.js.map