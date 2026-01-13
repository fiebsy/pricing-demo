"use strict";
/**
 * Filter Trigger
 *
 * Standalone trigger button for filter menus with press animation.
 * Uses the Button component with shine variant for the default style.
 *
 * @module prod/base/filter/filter-trigger/filter-trigger
 */
'use client';
/**
 * Filter Trigger
 *
 * Standalone trigger button for filter menus with press animation.
 * Uses the Button component with shine variant for the default style.
 *
 * @module prod/base/filter/filter-trigger/filter-trigger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTrigger = void 0;
const react_1 = require("react");
const Add01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Add01Icon");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/prod/base/button");
const icon_1 = require("@/components/ui/prod/base/icon");
// ============================================================================
// Configuration
// ============================================================================
/** Map TriggerRounded to ButtonRoundness */
const ROUNDED_MAP = {
    md: 'default',
    lg: 'default',
    xl: 'default',
    full: 'pill',
};
/** Map TriggerSize to ButtonSize */
const SIZE_MAP = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};
/** Legacy size config for ghost/outline variants */
const SIZES = {
    sm: { height: 32, padding: 10, text: 'text-xs', icon: 16 },
    md: { height: 40, padding: 12, text: 'text-sm', icon: 20 },
    lg: { height: 48, padding: 16, text: 'text-base', icon: 24 },
};
const ROUNDED = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
};
// ============================================================================
// Component
// ============================================================================
const FilterTrigger = ({ isOpen, label = 'Add a filter', icon, size = 'md', rounded = 'full', variant = 'default', className, onClick, }) => {
    const IconComponent = icon ?? Add01Icon_1.default;
    // Default variant uses Button with shine styling
    if (variant === 'default') {
        const buttonRoundness = ROUNDED_MAP[rounded];
        const buttonSize = SIZE_MAP[size];
        return (<button_1.Button variant="shine" size={buttonSize} roundness={buttonRoundness} iconLeading={IconComponent} onClick={onClick} aria-haspopup="menu" aria-expanded={isOpen} className={(0, utils_1.cn)(
            // When open: lock in pressed state and disable hover effects
            isOpen && [
                'scale-[0.98] bg-tertiary text-primary',
                'hover:bg-tertiary hover:text-primary',
                '[&_[data-icon]]:text-fg-tertiary hover:[&_[data-icon]]:text-fg-tertiary',
            ], className)}>
        {label}
      </button_1.Button>);
    }
    // Ghost and outline variants use legacy custom styling
    const sizeConfig = SIZES[size];
    const roundedClass = ROUNDED[rounded];
    const resolvedIconSize = sizeConfig.icon;
    return (<button type="button" aria-haspopup="menu" aria-expanded={isOpen} onClick={onClick} className={(0, utils_1.cn)(
        // Base
        'group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap', 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand', 'gap-1 font-semibold', sizeConfig.text, roundedClass, 
        // Variant: ghost
        variant === 'ghost' && [
            'bg-transparent',
            !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
            isOpen && 'bg-quaternary text-primary',
        ], 
        // Variant: outline
        variant === 'outline' && [
            'bg-transparent border border-primary',
            !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
            isOpen && 'bg-quaternary text-primary',
        ], 
        // Transition & press animation
        'transition-all duration-150 ease-out', 'active:scale-95', isOpen && 'scale-95', 
        // Accessibility: respect reduced motion preference
        'motion-reduce:transition-none motion-reduce:transform-none', className)} style={{
            height: sizeConfig.height,
            paddingLeft: sizeConfig.padding,
            paddingRight: sizeConfig.padding,
        }}>
      <icon_1.HugeIcon icon={IconComponent} size={resolvedIconSize} strokeWidth={1.5} className={(0, utils_1.cn)('pointer-events-none shrink-0 text-fg-quaternary', !isOpen && 'group-hover:text-fg-tertiary')}/>
      <span className="px-0.5">{label}</span>
    </button>);
};
exports.FilterTrigger = FilterTrigger;
exports.FilterTrigger.displayName = 'FilterTrigger';
//# sourceMappingURL=filter-trigger.js.map