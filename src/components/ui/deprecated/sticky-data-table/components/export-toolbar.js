"use strict";
/**
 * StickyDataTable V2 - Export Toolbar Component
 *
 * Provides export functionality with a single button that adapts based on selection state.
 * Shows "Export All" when no rows selected, "Export Selected" when rows are selected.
 *
 * @module components/export-toolbar
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportToolbar = void 0;
const React = require("react");
const Download01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Download01Icon");
const icon_1 = require("@/components/ui/prod/base/icon");
const button_1 = require("@/components/ui/base/primitives/button");
/**
 * Export toolbar component for StickyDataTable V2
 *
 * Renders a download button that:
 * - Exports all rows when none are selected
 * - Exports selected rows when some are selected
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
    // Determine which export function to use and tooltip text
    const handleExport = () => {
        if (hasSelectedRows && exportSelected && selectionState) {
            exportSelected(selectionState);
        }
        else if (exportAll) {
            exportAll();
        }
    };
    const tooltipText = hasSelectedRows ? 'Export Selected' : 'Export All';
    return (<button_1.Button onClick={handleExport} size="sm" color="tertiary" title={tooltipText}>
      <icon_1.HugeIcon icon={Download01Icon_1.default} size={16} strokeWidth={1.5}/>
    </button_1.Button>);
};
exports.ExportToolbar = ExportToolbar;
//# sourceMappingURL=export-toolbar.js.map