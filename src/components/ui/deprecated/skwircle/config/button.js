"use strict";
/**
 * Skwircle Button Configuration
 *
 * Size, icon, and styling configurations for the button variant.
 * Matches badge pattern with muted icon opacity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtonPaddingStyle = exports.getButtonIconStyle = exports.getButtonIntentConfig = exports.getButtonSizeConfig = exports.BUTTON_INTENT_CONFIGS = exports.BUTTON_SIZE_CONFIGS = void 0;
/**
 * Size configuration for buttons.
 * Uses leading-none for pixel-perfect text alignment.
 */
exports.BUTTON_SIZE_CONFIGS = {
    xs: {
        paddingX: 10,
        paddingY: 6,
        paddingLeftWithLeadingIcon: 6,
        gap: 4,
        textClass: 'text-xs leading-none',
        iconSize: 14,
        iconStroke: 2,
        iconOnlyPadding: 6,
    },
    sm: {
        paddingX: 12,
        paddingY: 8,
        paddingLeftWithLeadingIcon: 7,
        gap: 4,
        textClass: 'text-sm leading-none',
        iconSize: 16,
        iconStroke: 2,
        iconOnlyPadding: 8,
    },
    md: {
        paddingX: 14,
        paddingY: 10,
        paddingLeftWithLeadingIcon: 8,
        gap: 6,
        textClass: 'text-sm leading-none',
        iconSize: 18,
        iconStroke: 2,
        iconOnlyPadding: 10,
    },
    lg: {
        paddingX: 16,
        paddingY: 12,
        paddingLeftWithLeadingIcon: 10,
        gap: 6,
        textClass: 'text-md leading-none',
        iconSize: 20,
        iconStroke: 2,
        iconOnlyPadding: 12,
    },
    xl: {
        paddingX: 20,
        paddingY: 14,
        paddingLeftWithLeadingIcon: 12,
        gap: 8,
        textClass: 'text-md leading-none',
        iconSize: 20,
        iconStroke: 2,
        iconOnlyPadding: 14,
    },
};
/**
 * Intent configuration for buttons.
 * Icons use 55% opacity at rest, restore to 100% on hover.
 */
exports.BUTTON_INTENT_CONFIGS = {
    primary: {
        textColor: 'text-primary_on-brand',
        iconOpacity: 0.55,
        iconOpacityHover: 1.0,
    },
    secondary: {
        textColor: 'text-primary',
        iconOpacity: 0.55,
        iconOpacityHover: 1.0,
    },
    ghost: {
        textColor: 'text-tertiary',
        textColorHover: 'text-tertiary_hover',
        iconOpacity: 0.55,
        iconOpacityHover: 1.0,
    },
    error: {
        textColor: 'text-primary_on-brand',
        iconOpacity: 0.55,
        iconOpacityHover: 1.0,
    },
};
// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
/**
 * Get size configuration for a button.
 */
const getButtonSizeConfig = (size) => {
    return exports.BUTTON_SIZE_CONFIGS[size];
};
exports.getButtonSizeConfig = getButtonSizeConfig;
/**
 * Get intent configuration for a button.
 */
const getButtonIntentConfig = (intent) => {
    return exports.BUTTON_INTENT_CONFIGS[intent];
};
exports.getButtonIntentConfig = getButtonIntentConfig;
/**
 * Get icon style with opacity for muted appearance.
 * Returns both base style and Tailwind class for hover transition.
 * Uses `group-hover:` since Skwircle parent has `group` class.
 */
const getButtonIconStyle = (intent) => {
    const config = exports.BUTTON_INTENT_CONFIGS[intent];
    return {
        style: {
            opacity: config.iconOpacity,
            transition: 'opacity 100ms linear',
        },
        className: 'group-hover:opacity-100',
    };
};
exports.getButtonIconStyle = getButtonIconStyle;
/**
 * Get padding style for a button.
 * @param size - Button size
 * @param iconOnly - Whether the button only contains an icon
 * @param hasLeadingIcon - Whether the button has a leading icon (reduces left padding)
 */
const getButtonPaddingStyle = (size, iconOnly = false, hasLeadingIcon = false) => {
    const config = exports.BUTTON_SIZE_CONFIGS[size];
    if (iconOnly) {
        return {
            padding: `${config.iconOnlyPadding}px`,
        };
    }
    return {
        paddingLeft: hasLeadingIcon
            ? `${config.paddingLeftWithLeadingIcon}px`
            : `${config.paddingX}px`,
        paddingRight: `${config.paddingX}px`,
        paddingTop: `${config.paddingY}px`,
        paddingBottom: `${config.paddingY}px`,
        gap: `${config.gap}px`,
    };
};
exports.getButtonPaddingStyle = getButtonPaddingStyle;
//# sourceMappingURL=button.js.map