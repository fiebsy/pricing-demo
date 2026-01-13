"use strict";
/**
 * AnimatedChip - Single animated filter chip
 *
 * Wraps the chip trigger and popup with Motion animations.
 * Handles scale-up entry, fade exit, and layout transitions.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/animated-chip
 */
'use client';
/**
 * AnimatedChip - Single animated filter chip
 *
 * Wraps the chip trigger and popup with Motion animations.
 * Handles scale-up entry, fade exit, and layout transitions.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/animated-chip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedChip = void 0;
const React = require("react");
const react_1 = require("motion/react");
const select_1 = require("@base-ui/react/select");
const utils_1 = require("@/lib/utils");
const FilterIcon_1 = require("@hugeicons-pro/core-stroke-rounded/FilterIcon");
const chip_trigger_1 = require("./chip-trigger");
const chip_popup_1 = require("./chip-popup");
const remove_button_1 = require("./remove-button");
const config_1 = require("../config");
// ============================================================================
// Component
// ============================================================================
function AnimatedChip({ filter, index, animationConfig, styleConfig, shouldReduceMotion, onValueChange, onRemove, showDebug, }) {
    const [open, setOpen] = React.useState(false);
    // Derived values
    const sizeConfig = (0, config_1.getSizeConfig)(styleConfig.size);
    const roundnessClass = (0, config_1.getRoundnessClass)(styleConfig.roundness);
    const selectedOption = filter.options.find((o) => o.id === filter.value);
    const displayValue = selectedOption?.label ?? filter.value;
    const Icon = filter.icon || FilterIcon_1.default;
    // Build layout transition
    const layoutTransition = (0, config_1.buildLayoutTransition)(animationConfig);
    // Build scale transition (matches layout)
    const scaleTransition = animationConfig.transitionType === 'spring'
        ? { type: 'spring', stiffness: animationConfig.stiffness, damping: animationConfig.damping }
        : { type: 'tween', duration: animationConfig.duration, ease: config_1.EASING_CURVES[animationConfig.easing] };
    return (<react_1.motion.div layout initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{
            layout: layoutTransition,
            opacity: { duration: animationConfig.exitDuration },
            scale: scaleTransition,
        }} className="inline-flex origin-left">
      <select_1.Select.Root value={filter.value} onValueChange={(val) => val && onValueChange(val)} open={open} onOpenChange={setOpen}>
        {/* Chip container - animates width changes */}
        <react_1.motion.div layout transition={{ layout: layoutTransition }} className={(0, utils_1.cn)('group relative inline-flex items-center', 'bg-secondary border border-transparent shine-3-subtle', 'hover:bg-tertiary', open && 'bg-tertiary', roundnessClass, 'transition-colors duration-150', 'motion-reduce:transition-none')} style={{ height: sizeConfig.height }}>
          {/* Trigger */}
          <chip_trigger_1.ChipTrigger displayValue={displayValue} icon={Icon} sizeConfig={sizeConfig} isOpen={open} roundnessClass={roundnessClass}/>

          {/* Remove button */}
          <remove_button_1.RemoveButton filterLabel={filter.label} iconSize={sizeConfig.iconSize} height={sizeConfig.height} onRemove={onRemove}/>

          {/* Debug index */}
          {showDebug && (<span className="absolute -top-2 -left-2 bg-brand-primary text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
              {index}
            </span>)}
        </react_1.motion.div>

        {/* Dropdown popup */}
        <chip_popup_1.ChipPopup label={filter.label} options={filter.options} isOpen={open}/>
      </select_1.Select.Root>
    </react_1.motion.div>);
}
exports.AnimatedChip = AnimatedChip;
AnimatedChip.displayName = 'AnimatedChip';
//# sourceMappingURL=animated-chip.js.map