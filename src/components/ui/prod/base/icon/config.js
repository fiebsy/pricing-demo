"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPackages = exports.packagesByVariant = exports.getContainerSizeClass = exports.containerStyles = exports.getVariantStrokeWidth = exports.isStrokedVariant = exports.isFilledVariant = exports.strokedVariants = exports.filledVariants = exports.resolveStrokeWidth = exports.strokeWidthPresets = exports.resolveColorClass = exports.colorStyles = exports.resolveSize = exports.sizePresets = void 0;
// ============================================================================
// Size Configuration
// ============================================================================
/**
 * Size preset to pixel value mapping
 */
exports.sizePresets = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 48,
};
/**
 * Resolves a size value to pixels
 */
function resolveSize(size) {
    if (typeof size === 'number') {
        return size;
    }
    return exports.sizePresets[size] ?? exports.sizePresets.md;
}
exports.resolveSize = resolveSize;
// ============================================================================
// Color Configuration
// ============================================================================
/**
 * Color variant to Tailwind class mapping
 * Uses PAYVA V2 semantic color tokens
 *
 * @see src/styles/utilities/colors.css for token definitions
 */
exports.colorStyles = {
    // Foreground colors (text-* tokens)
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    quaternary: 'text-fg-quaternary',
    disabled: 'text-disabled',
    placeholder: 'text-placeholder',
    // Brand colors
    brand: 'text-brand-primary',
    'brand-secondary': 'text-fg-brand-secondary',
    // Status colors
    success: 'text-success-primary',
    warning: 'text-warning-primary',
    error: 'text-error-primary',
    info: 'text-brand-primary', // Info uses brand color
    // Special colors
    white: 'text-white',
    'on-brand': 'text-primary_on-brand',
    current: '', // Inherits from parent (currentColor)
};
/**
 * Resolves a color to its Tailwind class
 */
function resolveColorClass(color) {
    return exports.colorStyles[color] ?? '';
}
exports.resolveColorClass = resolveColorClass;
// ============================================================================
// Stroke Width Configuration
// ============================================================================
/**
 * Stroke width preset to numeric value mapping
 */
exports.strokeWidthPresets = {
    thin: 1,
    light: 1.25,
    regular: 1.5,
    medium: 2,
    bold: 2.5,
};
/**
 * Resolves a stroke width to its numeric value
 */
function resolveStrokeWidth(strokeWidth) {
    if (typeof strokeWidth === 'number') {
        return strokeWidth;
    }
    return exports.strokeWidthPresets[strokeWidth] ?? exports.strokeWidthPresets.regular;
}
exports.resolveStrokeWidth = resolveStrokeWidth;
// ============================================================================
// Variant Configuration
// ============================================================================
/**
 * Variants that use filled rendering (no stroke - strokeWidth should be 0)
 *
 * ONLY solid and bulk variants should have strokeWidth auto-set to 0.
 * duotone and twotone variants DO use strokes and should retain strokeWidth.
 */
exports.filledVariants = ['solid', 'bulk'];
/**
 * Variants that use strokes (strokeWidth applies)
 *
 * - stroke: Standard line-based icons
 * - duotone: Two-color with strokes on both layers
 * - twotone: Dual-color with distinct foreground/background strokes
 */
exports.strokedVariants = ['stroke', 'duotone', 'twotone'];
/**
 * Check if a variant is a filled style (should use strokeWidth 0)
 * Only solid and bulk variants are filled.
 */
function isFilledVariant(variant) {
    return exports.filledVariants.includes(variant);
}
exports.isFilledVariant = isFilledVariant;
/**
 * Check if a variant uses strokes (strokeWidth applies)
 * stroke, duotone, and twotone all use strokes.
 */
function isStrokedVariant(variant) {
    return exports.strokedVariants.includes(variant);
}
exports.isStrokedVariant = isStrokedVariant;
/**
 * Get the appropriate stroke width for a variant
 *
 * - solid/bulk: Returns 0 (filled icons, no stroke)
 * - stroke/duotone/twotone: Uses the provided strokeWidth value
 */
function getVariantStrokeWidth(variant, strokeWidth) {
    if (isFilledVariant(variant)) {
        return 0;
    }
    return resolveStrokeWidth(strokeWidth);
}
exports.getVariantStrokeWidth = getVariantStrokeWidth;
// ============================================================================
// Container Configuration (for solid/bulk icons)
// ============================================================================
/**
 * Base container styles for solid/bulk icons that need containment
 */
exports.containerStyles = 'relative flex shrink-0 items-center justify-center overflow-hidden';
/**
 * Get container size class based on icon size
 */
function getContainerSizeClass(size) {
    return `w-[${size}px] h-[${size}px]`;
}
exports.getContainerSizeClass = getContainerSizeClass;
// ============================================================================
// Package Reference (for documentation)
// ============================================================================
/**
 * Hugeicons PRO package names by variant
 * Use these when importing icons for specific styles
 */
exports.packagesByVariant = {
    stroke: '@hugeicons-pro/core-stroke-rounded',
    solid: '@hugeicons-pro/core-solid-rounded',
    bulk: '@hugeicons-pro/core-bulk-rounded',
    duotone: '@hugeicons-pro/core-duotone-rounded',
    twotone: '@hugeicons-pro/core-twotone-rounded',
};
/**
 * All available Hugeicons style packages
 */
exports.allPackages = [
    // Stroke styles (line-based)
    '@hugeicons-pro/core-stroke-rounded',
    '@hugeicons-pro/core-stroke-sharp',
    '@hugeicons-pro/core-stroke-standard',
    // Solid styles (filled)
    '@hugeicons-pro/core-solid-rounded',
    '@hugeicons-pro/core-solid-sharp',
    '@hugeicons-pro/core-solid-standard',
    // Special styles (two-tone)
    '@hugeicons-pro/core-bulk-rounded',
    '@hugeicons-pro/core-duotone-rounded',
    '@hugeicons-pro/core-twotone-rounded',
];
//# sourceMappingURL=config.js.map