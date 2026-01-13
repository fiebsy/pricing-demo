"use strict";
/**
 * FilterTrigger - Default trigger button for the filter menu
 *
 * A styled button that changes appearance when the menu is open.
 *
 * @module prod/base/filter/filter-menu-motion/components/filter-trigger
 */
'use client';
/**
 * FilterTrigger - Default trigger button for the filter menu
 *
 * A styled button that changes appearance when the menu is open.
 *
 * @module prod/base/filter/filter-menu-motion/components/filter-trigger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTrigger = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const Add01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Add01Icon");
// ============================================================================
// COMPONENT
// ============================================================================
function FilterTrigger({ isOpen, isActive }) {
    const active = isOpen || isActive;
    return (<button type="button" className={(0, utils_1.cn)('inline-flex items-center gap-2 rounded-xl px-4 py-2.5', 'text-sm font-medium transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary', 'motion-reduce:transition-none', active
            ? 'bg-brand-solid text-white'
            : 'bg-secondary text-secondary ring-1 ring-inset ring-primary hover:bg-secondary_hover')}>
      <icon_1.HugeIcon icon={Add01Icon_1.default} size={16} strokeWidth={2}/>
      <span>Filter</span>
    </button>);
}
exports.FilterTrigger = FilterTrigger;
FilterTrigger.displayName = 'FilterTrigger';
//# sourceMappingURL=filter-trigger.js.map