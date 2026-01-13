"use strict";
/**
 * StickyDataTable V2 - Export Toolbar Component
 *
 * Provides export functionality with a single button that adapts based on selection state.
 * Shows "Export All" when no rows selected, "Export Selected" when rows are selected.
 * Displays a counter badge overlay when rows are selected.
 *
 * @module components/export-toolbar
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportToolbar = void 0;
const React = require("react");
const Download01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Download01Icon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const button_utility_1 = require("@/components/ui/prod/base/button-utility");
/**
 * Selection counter badge component
 * Displays on top-right of the export button when items are selected
 */
const SelectionCountBadge = ({ count }) => {
    if (count === 0)
        return null;
    // Format count: show actual number up to 99, then "99+"
    const displayCount = count > 99 ? '99+' : count.toString();
    return (<span className={(0, utils_1.cn)(
        // Position: top-right corner, offset outside button bounds
        'absolute -top-1.5 -right-1.5', 
        // Size and shape
        'min-w-[18px] h-[18px] px-1', 'rounded-full', 
        // Typography
        'text-[10px] font-semibold leading-[18px] text-center', 
        // Colors: brand accent for visibility
        'bg-brand-solid text-primary_on-brand', 
        // Ensure it's above the button
        'z-10', 
        // Subtle entrance animation
        'animate-in fade-in zoom-in-50 duration-150')}>
      {displayCount}
    </span>);
};
/**
 * Export toolbar component for StickyDataTable V2
 *
 * Renders a download button that:
 * - Exports all rows when none are selected
 * - Exports selected rows when some are selected
 * - Shows a counter badge when rows are selected
 * - Auto-highlights when rows are selected
 */
const ExportToolbar = ({ exportAll, exportSelected, selectionState, customToolbar, }) => {
    // If custom toolbar is provided, render it instead
    if (customToolbar) {
        return <>{customToolbar}</>;
    }
    // If no export functions provided, don't render anything
    if (!exportAll && !exportSelected) {
        return null;
    }
    const hasSelectedRows = selectionState ? selectionState.selectedIds.size > 0 : false;
    const selectedCount = selectionState?.selectedCount ?? 0;
    // Determine which export function to use and tooltip text
    const handleExport = () => {
        if (hasSelectedRows && exportSelected && selectionState) {
            exportSelected(selectionState);
        }
        else if (exportAll) {
            exportAll();
        }
    };
    const tooltipText = hasSelectedRows
        ? `Export ${selectedCount} Selected`
        : 'Export All';
    // Wrap Hugeicons PRO icon with HugeIcon component for ButtonUtility
    const DownloadIcon = () => <icon_1.HugeIcon icon={Download01Icon_1.default} size={20} strokeWidth={1.5} data-icon/>;
    return (<div className="relative">
      <button_utility_1.ButtonUtility icon={DownloadIcon} tooltip={tooltipText} onClick={handleExport} size="sm" color="tertiary" isActive={hasSelectedRows}/>
      <SelectionCountBadge count={selectedCount}/>
    </div>);
};
exports.ExportToolbar = ExportToolbar;
//# sourceMappingURL=export-toolbar.js.map