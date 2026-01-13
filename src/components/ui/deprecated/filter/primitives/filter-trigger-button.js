"use strict";
/**
 * Filter Trigger Button Primitive
 *
 * Button styled to trigger filter menus. Uses centralized configuration
 * from config.ts for consistent styling across the application.
 *
 * @module base-ui/filter/primitives/filter-trigger-button
 */
'use client';
/**
 * Filter Trigger Button Primitive
 *
 * Button styled to trigger filter menus. Uses centralized configuration
 * from config.ts for consistent styling across the application.
 *
 * @module base-ui/filter/primitives/filter-trigger-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTriggerButton = void 0;
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("../config");
// ============================================================================
// Style Mapping Utilities
// ============================================================================
const getHeightClass = (height) => {
    const heightMap = {
        32: 'h-8',
        36: 'h-9',
        40: 'h-10',
        44: 'h-11',
        48: 'h-12',
    };
    return heightMap[height] || `h-[${height}px]`;
};
const getPaddingXClass = (px) => {
    const pxMap = {
        8: 'px-2',
        10: 'px-2.5',
        12: 'px-3',
        14: 'px-3.5',
        16: 'px-4',
    };
    return pxMap[px] || `px-[${px}px]`;
};
const getRoundedClass = (rounded) => {
    const roundedMap = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
    };
    return roundedMap[rounded] || 'rounded-full';
};
const getShineClass = (shine, intensity) => {
    if (shine === 'none')
        return '';
    const intensitySuffix = intensity === 'normal' ? '' : `-${intensity}`;
    return `shine-${shine}${intensitySuffix}`;
};
const getFontWeightClass = (weight) => {
    const weightMap = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };
    return weightMap[weight] || 'font-semibold';
};
// ============================================================================
// Component
// ============================================================================
/**
 * FilterTriggerButton - Trigger button for filter menus
 *
 * Uses GAN2 configuration defaults. Styling can be overridden via styleConfig prop.
 */
const FilterTriggerButton = ({ isOpen, label = 'Add a filter', icon, styleConfig, className, }) => {
    // Merge with defaults
    const config = {
        ...config_1.DEFAULT_FILTER_TRIGGER_STYLE,
        ...styleConfig,
    };
    const IconComponent = icon ?? core_stroke_rounded_1.Add01Icon;
    return (<button className={(0, utils_1.cn)(
        // Base styles
        'group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap', 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand', 
        // Size & shape from config
        getHeightClass(config.height), getPaddingXClass(config.paddingX), getRoundedClass(config.rounded), getFontWeightClass(config.fontWeight), 'gap-1 text-sm', 
        // Background from config
        `bg-${config.background}`, config.border && 'border border-primary', 
        // Shine from config
        getShineClass(config.shine, config.shineIntensity), 
        // Transition
        'transition-all duration-150 ease-out', 
        // Normal state - text colors from config
        !isOpen && [
            `text-${config.textColor}`,
            `hover:bg-${config.backgroundHover} hover:text-${config.textColorHover}`,
        ], 
        // Active/Open state - pressed appearance
        isOpen && [
            `bg-${config.backgroundHover} text-${config.textColor}`,
            'scale-95',
        ], className)}>
      <icon_1.HugeIcon icon={IconComponent} size={config.iconSize} strokeWidth={config.iconStrokeWidth} className={(0, utils_1.cn)('pointer-events-none shrink-0', `text-fg-${config.iconColor}`, !isOpen && `group-hover:text-fg-${config.iconColor}_hover`)}/>
      <span className="px-0.5">{label}</span>
    </button>);
};
exports.FilterTriggerButton = FilterTriggerButton;
exports.FilterTriggerButton.displayName = 'FilterTriggerButton';
//# sourceMappingURL=filter-trigger-button.js.map