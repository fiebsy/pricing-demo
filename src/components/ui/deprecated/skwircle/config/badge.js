"use strict";
/**
 * Skwircle Badge Configuration
 *
 * Size, icon, and extended color configurations for the badge variant.
 * Matches legacy Squircle badge and Untitled UI badge patterns.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBadgeTextStyle = exports.getBadgeIconStyle = exports.getBadgePaddingStyle = exports.getBadgeColorConfig = exports.getBadgeTypeConfig = exports.getBadgeSizeConfig = exports.BADGE_COLOR_MODERN_GRAY = exports.BADGE_COLOR_CONFIGS = exports.BADGE_TYPE_CONFIGS = exports.BADGE_SIZE_CONFIGS = void 0;
/**
 * Size configuration for badges.
 *
 * Uses leading-none to ensure text container wraps tightly around text,
 * then compensates with vertical padding for proper visual spacing.
 * This guarantees pixel-perfect text alignment regardless of font metrics.
 */
exports.BADGE_SIZE_CONFIGS = {
    xs: {
        // Extra small - for command keys, keyboard shortcuts
        paddingIcon: 3,
        paddingText: 5,
        paddingVertical: 2,
        gap: 3,
        textClass: 'text-[10px] leading-none',
        iconSize: 10,
        iconStroke: 2,
    },
    sm: {
        paddingIcon: 4,
        paddingText: 6,
        paddingVertical: 3,
        gap: 4,
        textClass: 'text-xs leading-none',
        iconSize: 12,
        iconStroke: 2,
    },
    md: {
        paddingIcon: 6,
        paddingText: 8,
        paddingVertical: 4,
        gap: 4,
        textClass: 'text-sm leading-none',
        iconSize: 12,
        iconStroke: 2,
    },
    lg: {
        paddingIcon: 8,
        paddingText: 10,
        paddingVertical: 5,
        gap: 4,
        textClass: 'text-sm leading-none',
        iconSize: 14,
        iconStroke: 2,
    },
};
/**
 * Type configuration for badge visual styles.
 * Maps legacy Squircle roundness levels to Skwircle presets.
 */
exports.BADGE_TYPE_CONFIGS = {
    pill: {
        roundness: 'pill', // Fully circular
        elevation: 'none',
        borderWidth: 1,
    },
    badge: {
        roundness: 'rounded', // Rounded corners (softer, more iOS-like)
        elevation: 'none',
        borderWidth: 1,
    },
    modern: {
        roundness: 'rounded', // Same rounded corners as badge
        elevation: 'xs', // Modern has shadow
        borderWidth: 1,
    },
};
/**
 * Color configuration using semantic utility tokens.
 * Icons use the same color as text but with reduced opacity (55%) for muted appearance.
 */
exports.BADGE_COLOR_CONFIGS = {
    gray: {
        backgroundColor: 'utility-gray-50',
        borderColor: 'utility-gray-200',
        textColor: 'utility-gray-700',
        iconColor: 'utility-gray-700',
        iconOpacity: 0.55,
    },
    brand: {
        backgroundColor: 'utility-brand-50',
        borderColor: 'utility-brand-200',
        textColor: 'utility-brand-700',
        iconColor: 'utility-brand-700',
        iconOpacity: 0.55,
    },
    error: {
        backgroundColor: 'utility-error-50',
        borderColor: 'utility-error-200',
        textColor: 'utility-error-700',
        iconColor: 'utility-error-700',
        iconOpacity: 0.55,
    },
    warning: {
        backgroundColor: 'utility-warning-50',
        borderColor: 'utility-warning-200',
        textColor: 'utility-warning-700',
        iconColor: 'utility-warning-700',
        iconOpacity: 0.55,
    },
    success: {
        backgroundColor: 'utility-success-50',
        borderColor: 'utility-success-200',
        textColor: 'utility-success-700',
        iconColor: 'utility-success-700',
        iconOpacity: 0.55,
    },
    blue: {
        backgroundColor: 'utility-blue-50',
        borderColor: 'utility-blue-200',
        textColor: 'utility-blue-700',
        iconColor: 'utility-blue-700',
        iconOpacity: 0.55,
    },
    indigo: {
        backgroundColor: 'utility-indigo-50',
        borderColor: 'utility-indigo-200',
        textColor: 'utility-indigo-700',
        iconColor: 'utility-indigo-700',
        iconOpacity: 0.55,
    },
    purple: {
        backgroundColor: 'utility-purple-50',
        borderColor: 'utility-purple-200',
        textColor: 'utility-purple-700',
        iconColor: 'utility-purple-700',
        iconOpacity: 0.55,
    },
    orange: {
        backgroundColor: 'utility-orange-50',
        borderColor: 'utility-orange-200',
        textColor: 'utility-orange-700',
        iconColor: 'utility-orange-700',
        iconOpacity: 0.55,
    },
};
/**
 * Modern gray badge uses semantic tokens instead of utility tokens.
 */
exports.BADGE_COLOR_MODERN_GRAY = {
    backgroundColor: 'background-primary',
    borderColor: 'border-primary',
    textColor: 'text-secondary',
    iconColor: 'text-secondary',
    iconOpacity: 0.55,
};
// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
/**
 * Get size configuration for a badge.
 */
const getBadgeSizeConfig = (size) => {
    return exports.BADGE_SIZE_CONFIGS[size];
};
exports.getBadgeSizeConfig = getBadgeSizeConfig;
/**
 * Get type configuration for a badge.
 */
const getBadgeTypeConfig = (type) => {
    return exports.BADGE_TYPE_CONFIGS[type];
};
exports.getBadgeTypeConfig = getBadgeTypeConfig;
/**
 * Get color configuration for a badge.
 * Modern type with gray color uses semantic tokens.
 */
const getBadgeColorConfig = (type, color) => {
    if (type === 'modern' && color === 'gray') {
        return exports.BADGE_COLOR_MODERN_GRAY;
    }
    return exports.BADGE_COLOR_CONFIGS[color];
};
exports.getBadgeColorConfig = getBadgeColorConfig;
/**
 * Calculate padding style for a badge based on icon position.
 */
const getBadgePaddingStyle = (size, iconPosition) => {
    const config = exports.BADGE_SIZE_CONFIGS[size];
    return {
        paddingLeft: `${iconPosition === 'leading' ? config.paddingIcon : config.paddingText}px`,
        paddingRight: `${iconPosition === 'trailing' ? config.paddingIcon : config.paddingText}px`,
        paddingTop: `${config.paddingVertical}px`,
        paddingBottom: `${config.paddingVertical}px`,
        gap: iconPosition !== 'none' ? `${config.gap}px` : undefined,
    };
};
exports.getBadgePaddingStyle = getBadgePaddingStyle;
/**
 * Get icon style with color and opacity for muted appearance.
 */
const getBadgeIconStyle = (colorConfig) => {
    return {
        color: `var(--color-${colorConfig.iconColor})`,
        opacity: colorConfig.iconOpacity,
    };
};
exports.getBadgeIconStyle = getBadgeIconStyle;
/**
 * Get text style with color.
 */
const getBadgeTextStyle = (colorConfig) => {
    return {
        color: `var(--color-${colorConfig.textColor})`,
    };
};
exports.getBadgeTextStyle = getBadgeTextStyle;
//# sourceMappingURL=badge.js.map