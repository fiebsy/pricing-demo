"use strict";
/**
 * Skwircle Variant Configuration
 *
 * Default settings for each variant.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentWrapperClass = exports.CONTENT_WRAPPER_CLASSES = exports.getVariantConfig = exports.VARIANT_CONFIGS = void 0;
/**
 * Default configuration for each variant.
 *
 * Variants auto-configure:
 * - roundness: Corner shape
 * - borderWidth: Border thickness
 * - elevation: Shadow level
 * - fillMode: Whether content fills container
 * - interactive: Whether hover colors apply
 */
exports.VARIANT_CONFIGS = {
    base: {
        roundness: 'moderate',
        borderWidth: 1,
        elevation: 'none',
        fillMode: false,
        interactive: false,
        ring: false,
        ringWidth: 2,
        contentWrapperClassName: '',
    },
    card: {
        roundness: 'rounded',
        borderWidth: 1,
        elevation: 'xs',
        fillMode: false,
        interactive: false,
        ring: false,
        ringWidth: 2,
        contentWrapperClassName: '',
    },
    button: {
        roundness: 'rounded',
        borderWidth: 0,
        elevation: 'sm',
        fillMode: true,
        interactive: true,
        ring: false,
        ringWidth: 2,
        contentWrapperClassName: 'flex items-center justify-center',
    },
    input: {
        roundness: 'subtle',
        borderWidth: 1,
        elevation: 'none',
        fillMode: true,
        interactive: false,
        ring: false,
        ringWidth: 2,
        contentWrapperClassName: 'flex items-center',
    },
    badge: {
        roundness: 'rounded', // Softer, more iOS-like rounding
        borderWidth: 1, // Match legacy Squircle badge (1px border like Untitled UI ring-1)
        elevation: 'none',
        fillMode: false,
        interactive: false,
        ring: false,
        ringWidth: 2,
        contentWrapperClassName: 'flex items-center font-medium whitespace-nowrap',
    },
    avatar: {
        roundness: 'pill',
        borderWidth: 0,
        elevation: 'none',
        fillMode: true,
        interactive: false,
        ring: false,
        ringWidth: 2,
        contentWrapperClassName: 'flex items-center justify-center',
    },
};
/**
 * Get variant configuration.
 */
const getVariantConfig = (variant) => {
    return exports.VARIANT_CONFIGS[variant];
};
exports.getVariantConfig = getVariantConfig;
/**
 * Content wrapper classes for proper centering per variant.
 */
exports.CONTENT_WRAPPER_CLASSES = {
    base: '',
    card: '',
    button: 'flex items-center justify-center',
    input: 'flex items-center',
    badge: 'flex items-center justify-center',
    avatar: 'flex items-center justify-center',
};
/**
 * Get content wrapper class for a variant.
 */
const getContentWrapperClass = (variant) => {
    return exports.CONTENT_WRAPPER_CLASSES[variant];
};
exports.getContentWrapperClass = getContentWrapperClass;
//# sourceMappingURL=variants.js.map