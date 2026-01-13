"use strict";
/**
 * FilterMenuHeader - Header component for the filter menu
 *
 * Displays the "Add a filter" header with icon and optional divider.
 *
 * @module prod/base/filter/filter-menu-motion/components/filter-menu-header
 */
'use client';
/**
 * FilterMenuHeader - Header component for the filter menu
 *
 * Displays the "Add a filter" header with icon and optional divider.
 *
 * @module prod/base/filter/filter-menu-motion/components/filter-menu-header
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMenuHeader = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const FilterIcon_1 = require("@hugeicons-pro/core-stroke-rounded/FilterIcon");
// ============================================================================
// COMPONENT
// ============================================================================
function FilterMenuHeader({ title = 'Add a filter', showDivider = true, className, }) {
    return (<>
      <div className={(0, utils_1.cn)('flex items-center gap-2 px-2.5 min-h-9', className)}>
        <icon_1.HugeIcon icon={FilterIcon_1.default} size={16} strokeWidth={2} className="text-fg-tertiary opacity-60 shrink-0"/>
        <span className="text-fg-tertiary text-sm font-medium">
          {title}
        </span>
      </div>
      {showDivider && (<div role="separator" className="border-primary -mx-1 my-1 border-t opacity-50"/>)}
    </>);
}
exports.FilterMenuHeader = FilterMenuHeader;
FilterMenuHeader.displayName = 'FilterMenuHeader';
//# sourceMappingURL=filter-menu-header.js.map