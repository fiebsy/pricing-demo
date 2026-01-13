"use strict";
/**
 * Clear Button
 *
 * A small circular button to clear the search input.
 *
 * @module expanding-search/components/clear-button
 */
'use client';
/**
 * Clear Button
 *
 * A small circular button to clear the search input.
 *
 * @module expanding-search/components/clear-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearButton = void 0;
const react_1 = require("react");
const button_1 = require("@base-ui/react/button");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const icon_1 = require("@/components/ui/prod/base/icon");
const utils_1 = require("@/lib/utils");
const ClearButton = ({ visible, onClick }) => {
    if (!visible)
        return null;
    return (<button_1.Button onClick={onClick} className={(0, utils_1.cn)('relative flex-shrink-0 flex items-center justify-center', 'w-5 h-5 rounded-full', 'text-tertiary hover:text-primary active:text-primary', 'hover:bg-tertiary active:bg-tertiary', 'active:scale-95', 'transition-all duration-150', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-solid', 
        // Expand touch target without changing visual size
        'before:absolute before:inset-[-8px] before:content-[""]')} aria-label="Clear search">
      <icon_1.HugeIcon icon={core_stroke_rounded_1.Cancel01Icon} size={14} strokeWidth={2}/>
    </button_1.Button>);
};
exports.ClearButton = ClearButton;
exports.ClearButton.displayName = 'ClearButton';
//# sourceMappingURL=clear-button.js.map