"use strict";
/**
 * BackButton - Animated back button for submenu navigation
 *
 * Displays a back button with the submenu title.
 * Uses state-based animation pattern.
 *
 * @module prod/base/filter/filter-menu-motion/components/back-button
 */
'use client';
/**
 * BackButton - Animated back button for submenu navigation
 *
 * Displays a back button with the submenu title.
 * Uses state-based animation pattern.
 *
 * @module prod/base/filter/filter-menu-motion/components/back-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = void 0;
const React = require("react");
const react_1 = require("motion/react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const ArrowLeft01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon");
const animation_config_1 = require("../animation-config");
// ============================================================================
// COMPONENT
// ============================================================================
function BackButton({ title, onBack, isVisible, animationConfig, shouldReduceMotion, }) {
    const animateProps = shouldReduceMotion
        ? { opacity: isVisible ? 1 : 0 }
        : { opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -15 };
    return (<>
      <react_1.motion.div initial={false} animate={animateProps} transition={(0, animation_config_1.getTimedTransition)(animationConfig.opacityDuration)}>
        <button type="button" onClick={onBack} className={(0, utils_1.cn)('flex items-center gap-2 px-2.5 min-h-9 w-full rounded-xl', 'text-sm font-medium text-tertiary', 'transition-colors hover:bg-quaternary', 'focus-visible:outline-none focus-visible:bg-quaternary', 'motion-reduce:transition-none')}>
          <icon_1.HugeIcon icon={ArrowLeft01Icon_1.default} size={16} strokeWidth={2} className="text-fg-tertiary opacity-60 shrink-0"/>
          <span className="flex-1 truncate text-left">{title}</span>
        </button>
      </react_1.motion.div>
      <div role="separator" className="border-primary -mx-1 my-1 border-t opacity-50"/>
    </>);
}
exports.BackButton = BackButton;
BackButton.displayName = 'BackButton';
//# sourceMappingURL=back-button.js.map