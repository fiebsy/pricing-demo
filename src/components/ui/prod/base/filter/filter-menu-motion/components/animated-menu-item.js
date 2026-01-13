"use strict";
/**
 * AnimatedMenuItem - Motion-animated menu item
 *
 * Wraps Base UI Menu.Item with Motion Dev animations.
 * Supports state-based animation (mounted components pattern).
 *
 * @module prod/base/filter/filter-menu-motion/components/animated-menu-item
 */
'use client';
/**
 * AnimatedMenuItem - Motion-animated menu item
 *
 * Wraps Base UI Menu.Item with Motion Dev animations.
 * Supports state-based animation (mounted components pattern).
 *
 * @module prod/base/filter/filter-menu-motion/components/animated-menu-item
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedMenuItem = void 0;
const React = require("react");
const menu_1 = require("@base-ui/react/menu");
const react_1 = require("motion/react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const ArrowRight01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon");
const CheckmarkCircle02Icon_1 = require("@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon");
const animation_config_1 = require("../animation-config");
// ============================================================================
// STYLES
// ============================================================================
const ITEM_CLASSES = (0, utils_1.cn)('flex items-center gap-2 px-2.5 min-h-9 rounded-xl cursor-pointer', 'text-sm font-medium text-secondary', 'transition-colors hover:bg-quaternary', 'focus-visible:outline-none focus-visible:bg-quaternary', 'motion-reduce:transition-none');
const ICON_CLASSES = 'text-fg-tertiary opacity-60 shrink-0';
// ============================================================================
// COMPONENT
// ============================================================================
/**
 * AnimatedMenuItem - Single menu item with motion animation.
 *
 * Uses state-based animation pattern for mounted components:
 * - `initial={false}` prevents animation on first render
 * - Animation driven by `isVisible` prop
 * - Supports staggered delays based on index
 */
function AnimatedMenuItem({ item, index, animationConfig, shouldReduceMotion, isVisible, isInSubmenu = false, onSubmenuClick, onSelect, }) {
    // Separator - no animation needed
    if (item.type === 'separator') {
        return (<div role="separator" className="border-primary -mx-1 border-t opacity-50"/>);
    }
    // Calculate stagger delay
    const itemDelay = animationConfig.enableItemStagger
        ? index * animationConfig.itemStagger
        : 0;
    // State-based animation props
    const animateProps = shouldReduceMotion
        ? { opacity: isVisible ? 1 : 0 }
        : {
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : isInSubmenu ? -15 : 15,
        };
    const transition = (0, animation_config_1.getTimedTransition)(animationConfig.opacityDuration, isVisible ? itemDelay : 0);
    // Submenu trigger item
    if (item.type === 'submenu') {
        return (<react_1.motion.div initial={false} animate={animateProps} transition={transition}>
        <menu_1.Menu.Item className={ITEM_CLASSES} closeOnClick={false} onClick={() => onSubmenuClick(item.id)}>
          {item.icon && (<icon_1.HugeIcon icon={item.icon} size={16} strokeWidth={2} className={ICON_CLASSES}/>)}
          <span className="flex-1 truncate">{item.label}</span>
          {typeof item.activeCount === 'number' && item.activeCount > 0 && (<span className="bg-brand-solid text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-5 text-center">
              {item.activeCount}
            </span>)}
          <icon_1.HugeIcon icon={ArrowRight01Icon_1.default} size={16} strokeWidth={2} className="text-fg-quaternary shrink-0"/>
        </menu_1.Menu.Item>
      </react_1.motion.div>);
    }
    // Action item
    return (<react_1.motion.div initial={false} animate={animateProps} transition={transition}>
      <menu_1.Menu.Item className={ITEM_CLASSES} onClick={() => {
            item.onClick?.();
            onSelect();
        }}>
        {item.icon && (<icon_1.HugeIcon icon={item.icon} size={16} strokeWidth={2} className={ICON_CLASSES}/>)}
        <span className="flex-1 truncate">{item.label}</span>
        {item.selected && (<icon_1.HugeIcon icon={CheckmarkCircle02Icon_1.default} size={16} strokeWidth={2} className="text-brand-primary shrink-0"/>)}
      </menu_1.Menu.Item>
    </react_1.motion.div>);
}
exports.AnimatedMenuItem = AnimatedMenuItem;
AnimatedMenuItem.displayName = 'AnimatedMenuItem';
//# sourceMappingURL=animated-menu-item.js.map