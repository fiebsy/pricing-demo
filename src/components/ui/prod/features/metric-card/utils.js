"use strict";
/**
 * MetricCard Utilities
 *
 * Helper functions for building styles and formatting values.
 *
 * @module metric-card/utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCompactValue = exports.mergeSectionStyles = exports.mergeLayerStyles = exports.getHoverAnimationClasses = exports.buildSectionClasses = exports.buildLayerClasses = exports.buildDepthClass = exports.buildShineClass = void 0;
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
// =============================================================================
// SHINE & DEPTH CLASS BUILDERS
// =============================================================================
const buildShineClass = (type, intensity, shadow) => {
    if (type === 'none')
        return '';
    let className = `shine-${type}`;
    if (intensity !== 'normal')
        className += `-${intensity}`;
    if (shadow !== 'none')
        className += `-shadow-${shadow}`;
    return className;
};
exports.buildShineClass = buildShineClass;
const buildDepthClass = (intensity, color, direction) => {
    if (intensity === 'none')
        return '';
    let className = `subtle-depth-${intensity}-${color}`;
    if (direction !== 'bottom')
        className += `-${direction}`;
    return className;
};
exports.buildDepthClass = buildDepthClass;
// =============================================================================
// LAYER & SECTION CLASS BUILDERS
// =============================================================================
const buildLayerClasses = (style, borderRadius) => {
    const bgClass = config_1.BACKGROUND_CLASSES[style.background];
    const shineClass = (0, exports.buildShineClass)(style.shine, style.shineIntensity, style.shineShadow);
    const depthClass = (0, exports.buildDepthClass)(style.depth, style.depthColor, style.depthDirection);
    const cornerClass = borderRadius > 0 ? 'corner-squircle' : '';
    return (0, utils_1.cn)(bgClass, depthClass, cornerClass, shineClass);
};
exports.buildLayerClasses = buildLayerClasses;
const buildSectionClasses = (style) => {
    return (0, utils_1.cn)(config_1.TEXT_COLOR_CLASSES[style.color], config_1.FONT_FAMILY_CLASSES[style.fontFamily], config_1.FONT_SIZE_CLASSES[style.fontSize], config_1.FONT_WEIGHT_CLASSES[style.fontWeight]);
};
exports.buildSectionClasses = buildSectionClasses;
// =============================================================================
// ANIMATION CLASSES
// =============================================================================
const getHoverAnimationClasses = (animation) => {
    switch (animation) {
        case 'lift':
            return 'hover:-translate-y-0.5 hover:shadow-lg';
        case 'glow':
            return 'hover:shadow-lg hover:shadow-brand-primary/20';
        case 'fade':
            return 'hover:opacity-80 active:opacity-70';
        default:
            return '';
    }
};
exports.getHoverAnimationClasses = getHoverAnimationClasses;
// =============================================================================
// STYLE MERGING
// =============================================================================
const mergeLayerStyles = (base, override) => {
    if (!override)
        return base;
    return { ...base, ...override };
};
exports.mergeLayerStyles = mergeLayerStyles;
const mergeSectionStyles = (base, override) => {
    if (!override)
        return base;
    return { ...base, ...override };
};
exports.mergeSectionStyles = mergeSectionStyles;
// =============================================================================
// VALUE FORMATTING
// =============================================================================
/**
 * Formats a value string with compact notation (k, M, B suffixes)
 * Uses maxDigits to determine total significant figures displayed
 * Returns parts separately for individual styling
 */
const formatCompactValue = (value, config) => {
    // Extract prefix (like $) and numeric part
    const match = value.match(/^([^0-9-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) {
        return { prefix: '', number: value, suffix: '' };
    }
    const [, prefix = '', numericPart = '', originalSuffix = ''] = match;
    if (!config.compact) {
        return { prefix, number: numericPart + originalSuffix, suffix: '' };
    }
    const num = parseFloat(numericPart.replace(/,/g, ''));
    if (isNaN(num)) {
        return { prefix, number: numericPart + originalSuffix, suffix: '' };
    }
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    // Determine suffix and divisor
    let compactSuffix = '';
    let divisor = 1;
    if (absNum >= 1_000_000_000) {
        compactSuffix = 'B';
        divisor = 1_000_000_000;
    }
    else if (absNum >= 1_000_000) {
        compactSuffix = 'M';
        divisor = 1_000_000;
    }
    else if (absNum >= 1_000) {
        compactSuffix = 'k';
        divisor = 1_000;
    }
    // If no compacting needed, return with original format
    if (divisor === 1) {
        return { prefix, number: numericPart + originalSuffix, suffix: '' };
    }
    const compactNum = absNum / divisor;
    // Calculate how many digits are before the decimal
    const integerPart = Math.floor(compactNum);
    const integerDigits = integerPart === 0 ? 1 : Math.floor(Math.log10(integerPart)) + 1;
    // Remaining digits can be used for decimals
    const decimalPlaces = Math.max(0, config.maxDigits - integerDigits);
    // Format with calculated precision
    const formatted = compactNum.toFixed(decimalPlaces);
    // Remove trailing zeros after decimal (but keep at least the integer part)
    const cleanFormatted = formatted.replace(/\.?0+$/, '');
    return {
        prefix,
        number: `${sign}${cleanFormatted}`,
        suffix: compactSuffix + originalSuffix,
    };
};
exports.formatCompactValue = formatCompactValue;
//# sourceMappingURL=utils.js.map