"use strict";
/**
 * Base UI Menu - Icon Trigger Component
 *
 * Circular button trigger with icon, commonly used for "more options" menus.
 * Uses ButtonUtility styles for consistent styling across the design system.
 *
 * Note: Uses a plain <button> element (not react-aria Button) to allow
 * Base UI's Menu.Trigger to properly handle click events.
 *
 * @module base-ui/menu/components/icon-trigger
 */
'use client';
/**
 * Base UI Menu - Icon Trigger Component
 *
 * Circular button trigger with icon, commonly used for "more options" menus.
 * Uses ButtonUtility styles for consistent styling across the design system.
 *
 * Note: Uses a plain <button> element (not react-aria Button) to allow
 * Base UI's Menu.Trigger to properly handle click events.
 *
 * @module base-ui/menu/components/icon-trigger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconTrigger = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
// Simplified button utility styles for demo-repo
const buttonUtilityStyles = {
    shapes: {
        circular: 'rounded-full',
    },
    colors: {
        secondary: 'text-secondary hover:text-primary hover:bg-secondary',
    },
    active: {
        secondary: 'text-primary bg-secondary',
    },
};
// ============================================================================
// Component
// ============================================================================
/**
 * Circular icon button trigger for menus
 * Uses ButtonUtility styles with circular shape and isActive state
 */
exports.IconTrigger = react_1.default.forwardRef(({ icon, className, isOpen, ...props }, ref) => {
    return (<button ref={ref} type="button" aria-label="Open menu" className={(0, utils_1.cn)(
        // Base styles (from ButtonUtility pattern)
        'group relative inline-flex h-max cursor-pointer items-center justify-center p-1.5 transition-all duration-150 ease-out', 'outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2', 'disabled:text-fg-disabled_subtle disabled:cursor-not-allowed', 
        // Shape - circular
        buttonUtilityStyles.shapes.circular, 
        // Color - secondary (only when not active)
        !isOpen && buttonUtilityStyles.colors.secondary, 
        // Active state styles
        isOpen && buttonUtilityStyles.active.secondary, 
        // Icon styles
        '*:data-icon:transition-inherit-all *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current', '*:data-icon:size-4', className)} {...props}>
        <icon_1.HugeIcon icon={icon} size={16} strokeWidth={2.5} data-icon/>
      </button>);
});
exports.IconTrigger.displayName = 'IconTrigger';
//# sourceMappingURL=icon-trigger.js.map