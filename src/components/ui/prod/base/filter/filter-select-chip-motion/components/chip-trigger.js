"use strict";
/**
 * ChipTrigger - Select trigger button
 *
 * The clickable trigger that opens the select dropdown.
 * Displays icon and current value.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/chip-trigger
 */
'use client';
/**
 * ChipTrigger - Select trigger button
 *
 * The clickable trigger that opens the select dropdown.
 * Displays icon and current value.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/chip-trigger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipTrigger = void 0;
const select_1 = require("@base-ui/react/select");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
// ============================================================================
// Component
// ============================================================================
function ChipTrigger({ displayValue, icon: Icon, sizeConfig, isOpen, roundnessClass, }) {
    return (<select_1.Select.Trigger className={(0, utils_1.cn)('inline-flex items-center gap-1.5', sizeConfig.padding, sizeConfig.text, 'font-medium text-primary', 'outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1', roundnessClass, 'cursor-pointer')} style={{ height: sizeConfig.height }}>
      {/* Icon */}
      <icon_1.HugeIcon icon={Icon} size={sizeConfig.iconSize} strokeWidth={2} className="text-tertiary flex-shrink-0 opacity-50"/>

      {/* Value */}
      <select_1.Select.Value className="text-primary font-medium whitespace-nowrap">
        {displayValue}
      </select_1.Select.Value>
    </select_1.Select.Trigger>);
}
exports.ChipTrigger = ChipTrigger;
ChipTrigger.displayName = 'ChipTrigger';
//# sourceMappingURL=chip-trigger.js.map