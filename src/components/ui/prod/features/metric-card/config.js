"use strict";
/**
 * MetricCard Configuration
 *
 * Constants, defaults, style mappings, and presets for MetricCard.
 *
 * @module metric-card/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.METRIC_CARD_PRESETS = exports.METRIC_CARD_PRESET_FLAT = exports.DEFAULT_METRIC_CARD_CONFIG = exports.DEFAULT_VALUE_FORMAT = exports.DEFAULT_TREND_STYLE = exports.DEFAULT_INNER_LAYER_STYLE = exports.DEFAULT_LAYER_STYLE = exports.TREND_COLORS = exports.FONT_WEIGHT_CLASSES = exports.FONT_SIZE_CLASSES = exports.FONT_FAMILY_CLASSES = exports.TEXT_COLOR_CLASSES = exports.BACKGROUND_CLASSES = exports.ICON_SIZE_OPTIONS = exports.BORDER_RADIUS_DEFAULT = void 0;
// =============================================================================
// CONSTANTS
// =============================================================================
exports.BORDER_RADIUS_DEFAULT = 16;
exports.ICON_SIZE_OPTIONS = [10, 12, 14, 16, 18, 20, 24];
// =============================================================================
// STYLE MAPPINGS
// =============================================================================
exports.BACKGROUND_CLASSES = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    quaternary: 'bg-quaternary',
    'brand-primary': 'bg-brand-primary',
    'brand-secondary': 'bg-brand-secondary',
};
exports.TEXT_COLOR_CLASSES = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    quaternary: 'text-quaternary',
    'brand-primary': 'text-brand-primary',
    'brand-secondary': 'text-brand-secondary',
};
exports.FONT_FAMILY_CLASSES = {
    text: 'font-sans',
    display: 'font-display',
};
exports.FONT_SIZE_CLASSES = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
};
exports.FONT_WEIGHT_CLASSES = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
};
exports.TREND_COLORS = {
    up: 'text-success-primary',
    down: 'text-error-primary',
    neutral: 'text-tertiary',
};
// =============================================================================
// DEFAULT STYLES
// =============================================================================
exports.DEFAULT_LAYER_STYLE = {
    background: 'secondary',
    shine: '0',
    shineIntensity: 'subtle',
    shineShadow: 'none',
    depth: 'none',
    depthColor: 'primary',
    depthDirection: 'bottom',
    opacity: 100,
};
exports.DEFAULT_INNER_LAYER_STYLE = {
    background: 'primary',
    shine: '0',
    shineIntensity: 'subtle',
    shineShadow: 'none',
    depth: 'none',
    depthColor: 'primary',
    depthDirection: 'bottom',
    opacity: 100,
};
exports.DEFAULT_TREND_STYLE = {
    fontSize: 'xs',
    fontWeight: 'medium',
    iconSize: 12,
    useDirectionalColors: true,
    color: 'tertiary',
    alignment: 'center',
};
exports.DEFAULT_VALUE_FORMAT = {
    compact: false,
    maxDigits: 4,
    prefixOpacity: 50,
    suffixOpacity: 50,
};
// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================
exports.DEFAULT_METRIC_CARD_CONFIG = {
    // Layout
    sectionOrder: ['label', 'value', 'count'],
    gap: 4,
    minWidth: 180,
    // Layer styles
    outer: exports.DEFAULT_LAYER_STYLE,
    inner: exports.DEFAULT_INNER_LAYER_STYLE,
    outerPadding: 4,
    innerPadding: 16,
    borderRadius: exports.BORDER_RADIUS_DEFAULT,
    // Section styles
    labelStyle: { color: 'tertiary', fontFamily: 'text', fontSize: 'sm', fontWeight: 'normal' },
    valueStyle: { color: 'primary', fontFamily: 'text', fontSize: '2xl', fontWeight: 'semibold' },
    countStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'xs', fontWeight: 'normal' },
    trendStyle: exports.DEFAULT_TREND_STYLE,
    // Animation
    hoverAnimation: 'none',
    transitionDuration: 200,
    // Hover overrides
    hoverOuter: undefined,
    hoverInner: { depth: '10' },
    // Active overrides
    activeOuter: { shine: '1', depth: '20' },
    activeInner: { shine: '2', shineIntensity: 'normal', shineShadow: 'sm' },
};
// =============================================================================
// PRESET CONFIGURATIONS
// =============================================================================
/** Flat card - outer hidden, reveals on active */
exports.METRIC_CARD_PRESET_FLAT = {
    sectionOrder: ['value', 'label', 'count'],
    gap: 12,
    gap1: 0,
    gap2: 16,
    minWidth: 150,
    outer: {
        background: 'secondary',
        shine: '0',
        shineIntensity: 'normal',
        shineShadow: 'none',
        depth: 'none',
        depthColor: 'secondary',
        depthDirection: 'bottom',
        opacity: 0,
    },
    inner: {
        background: 'primary',
        shine: '0',
        shineIntensity: 'subtle',
        shineShadow: 'none',
        depth: 'none',
        depthColor: 'primary',
        depthDirection: 'bottom',
        opacity: 100,
    },
    outerPadding: 4,
    innerPadding: 16,
    borderRadius: 16,
    labelStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'sm', fontWeight: 'medium', opacity: 80 },
    valueStyle: { color: 'secondary', fontFamily: 'display', fontSize: '3xl', fontWeight: 'medium', opacity: 100 },
    countStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'xs', fontWeight: 'normal', opacity: 70 },
    trendStyle: { fontSize: 'xs', fontWeight: 'medium', iconSize: 12, useDirectionalColors: true, color: 'tertiary', alignment: 'center' },
    hoverAnimation: 'none',
    transitionDuration: 100,
    hoverOuter: { opacity: 0 },
    hoverInner: { depth: '10' },
    activeOuter: { shine: '1', depth: '20', opacity: 100 },
    activeInner: { shine: '2', shineIntensity: 'normal', shineShadow: 'sm' },
    activeValueStyle: { color: 'primary' },
    activeLabelStyle: { opacity: 90 },
    labelSuffixStyle: { opacity: 50 },
};
exports.METRIC_CARD_PRESETS = {
    default: exports.DEFAULT_METRIC_CARD_CONFIG,
    flat: exports.METRIC_CARD_PRESET_FLAT,
};
//# sourceMappingURL=config.js.map