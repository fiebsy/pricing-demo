"use strict";
/**
 * RemoveButton - Chip removal button
 *
 * The X button that removes a filter chip.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/remove-button
 */
'use client';
/**
 * RemoveButton - Chip removal button
 *
 * The X button that removes a filter chip.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/remove-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveButton = void 0;
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const CancelCircleIcon_1 = require("@hugeicons-pro/core-solid-rounded/CancelCircleIcon");
// ============================================================================
// Component
// ============================================================================
function RemoveButton({ filterLabel, iconSize, height, onRemove, }) {
    return (<button type="button" onClick={(e) => {
            e.stopPropagation();
            onRemove();
        }} className={(0, utils_1.cn)('flex-shrink-0 flex items-center justify-center', 'text-tertiary hover:text-primary', 'transition-colors duration-150', 'motion-reduce:transition-none', 'pr-2 -ml-1', 'outline-none focus-visible:ring-2 focus-visible:ring-brand')} style={{ height }} aria-label={`Remove ${filterLabel} filter`}>
      <icon_1.HugeIcon icon={CancelCircleIcon_1.default} size={iconSize} strokeWidth={0}/>
    </button>);
}
exports.RemoveButton = RemoveButton;
RemoveButton.displayName = 'RemoveButton';
//# sourceMappingURL=remove-button.js.map