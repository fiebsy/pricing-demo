"use strict";
/**
 * OptionItem - Select dropdown option
 *
 * Individual option in the select dropdown with checkmark indicator.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/option-item
 */
'use client';
/**
 * OptionItem - Select dropdown option
 *
 * Individual option in the select dropdown with checkmark indicator.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/option-item
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionItem = void 0;
const select_1 = require("@base-ui/react/select");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const Tick01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Tick01Icon");
// ============================================================================
// Component
// ============================================================================
function OptionItem({ option }) {
    return (<select_1.Select.Item key={option.id} value={option.id} disabled={option.disabled} className={(0, utils_1.cn)('flex items-center justify-between gap-2', 'px-2 py-1.5 min-h-7 rounded-lg', 'text-sm font-medium', 'text-primary', 'outline-none cursor-pointer', 'data-[highlighted]:bg-tertiary', 'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed', 'transition-colors duration-100', 'motion-reduce:transition-none')}>
      <select_1.Select.ItemText>{option.label}</select_1.Select.ItemText>
      <select_1.Select.ItemIndicator className="text-brand-primary">
        <icon_1.HugeIcon icon={Tick01Icon_1.default} size={14} strokeWidth={2.5}/>
      </select_1.Select.ItemIndicator>
    </select_1.Select.Item>);
}
exports.OptionItem = OptionItem;
OptionItem.displayName = 'OptionItem';
//# sourceMappingURL=option-item.js.map