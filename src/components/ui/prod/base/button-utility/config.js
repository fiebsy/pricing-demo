"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltipOffsets = exports.iconStyles = exports.baseStyles = exports.iconSizeStyles = exports.shapeStyles = exports.activeHoverOverrideStyles = exports.activeStyles = exports.colorStyles = void 0;
/**
 * Color styles for ButtonUtility variants
 * Applied when NOT in active state
 */
exports.colorStyles = {
    secondary: 'bg-primary text-fg-tertiary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:text-fg-tertiary_hover disabled:shadow-xs disabled:ring-disabled_subtle',
    tertiary: 'text-fg-tertiary hover:text-fg-tertiary_hover',
};
/**
 * Active state styles for ButtonUtility variants
 * Applied when isActive is true
 */
exports.activeStyles = {
    secondary: 'shadow-none scale-95 text-fg-tertiary_hover ring-1 ring-primary ring-inset',
    tertiary: 'scale-95 text-fg-tertiary_hover',
};
/**
 * Hover override styles for when disableHoverWhenActive is true
 * Locks color on hover to prevent hover effects
 */
exports.activeHoverOverrideStyles = {
    secondary: 'hover:text-fg-tertiary_hover',
    tertiary: 'hover:text-fg-tertiary_hover',
};
/**
 * Shape styles for ButtonUtility variants
 */
exports.shapeStyles = {
    square: 'rounded-md corner-squircle',
    circular: 'rounded-full',
};
/**
 * Icon size styles based on button size
 */
exports.iconSizeStyles = {
    xs: '*:data-icon:size-4',
    sm: '*:data-icon:size-5',
};
/**
 * Base styles applied to all ButtonUtility instances
 * Includes layout, transitions, focus states, and disabled states
 */
exports.baseStyles = 'group outline-focus-ring disabled:text-fg-disabled_subtle relative inline-flex h-max cursor-pointer items-center justify-center p-1.5 transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed';
/**
 * Icon-specific styles for consistent rendering
 * Applied to all icons inside the button
 * Includes opacity hover effect for subtle brightness increase
 */
exports.iconStyles = '*:data-icon:transition-inherit-all *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:opacity-60 group-hover:*:data-icon:opacity-100';
/**
 * Tooltip offset based on button size
 */
exports.tooltipOffsets = {
    xs: 4,
    sm: 6,
};
//# sourceMappingURL=config.js.map