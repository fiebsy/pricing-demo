"use strict";
/**
 * Filter Header Component
 *
 * Reusable header for filter menu dropdowns showing filter icon and title
 * Matches the styling of the submenu back button for visual consistency
 *
 * @module base-ui/filter/components/filter-header
 */
'use client';
/**
 * Filter Header Component
 *
 * Reusable header for filter menu dropdowns showing filter icon and title
 * Matches the styling of the submenu back button for visual consistency
 *
 * @module base-ui/filter/components/filter-header
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterHeader = void 0;
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const icon_1 = require("@/components/ui/prod/base/icon");
const FilterHeader = ({ title = 'Add a filter', showDivider = true, }) => {
    return (<>
      <div className="-mx-1 flex items-center gap-2.5 corner-squircle px-2.5 py-1.5" style={{ borderRadius: 'var(--menu-item-radius, 12px)' }}>
        <icon_1.HugeIcon icon={core_stroke_rounded_1.FilterIcon} size={16} strokeWidth={2} className="text-tertiary shrink-0"/>
        <span className="text-primary flex-1 truncate text-sm font-medium">
          {title}
        </span>
      </div>
      {showDivider && (<div role="separator" className="bg-border-primary -mx-2 my-1 h-px opacity-50"/>)}
    </>);
};
exports.FilterHeader = FilterHeader;
//# sourceMappingURL=filter-header.js.map