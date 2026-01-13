"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExportCsvSticky = void 0;
const export_to_csv_1 = require("export-to-csv");
const sonner_1 = require("sonner");
/**
 * Export hook for StickyDataTable that works with SelectionState instead of TanStack Table
 */
const useExportCsvSticky = ({ data, selectionState, fileName, getRowId, customizeCsvOutput, }) => {
    const csvConfig = (0, export_to_csv_1.mkConfig)({
        fieldSeparator: ',',
        filename: fileName,
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });
    const mapDataForCsv = (item) => customizeCsvOutput ? customizeCsvOutput(item) : item;
    const exportData = async (items) => {
        try {
            if (items.length === 0) {
                sonner_1.toast.error('No data to export');
                return;
            }
            const csvData = items.map(mapDataForCsv);
            const csv = (0, export_to_csv_1.generateCsv)(csvConfig)(csvData);
            (0, export_to_csv_1.download)(csvConfig)(csv);
            sonner_1.toast.success(`${items.length} row${items.length === 1 ? '' : 's'} exported successfully!`);
        }
        catch (error) {
            console.error('Failed to export data:', error);
            sonner_1.toast.error(`Failed to export data.`);
            throw new Error('Export failed');
        }
    };
    const exportAll = async () => {
        try {
            await exportData(data);
        }
        catch (error) {
            // Error is handled in exportData
        }
    };
    const exportSelected = async () => {
        try {
            if (!selectionState || selectionState.selectedIds.size === 0) {
                sonner_1.toast.error('No rows selected');
                return;
            }
            const selectedItems = data.filter((row, index) => {
                const rowId = getRowId ? getRowId(row, index) : index;
                return selectionState.selectedIds.has(rowId);
            });
            await exportData(selectedItems);
        }
        catch (error) {
            // Error is handled in exportData
        }
    };
    return { exportAll, exportSelected };
};
exports.useExportCsvSticky = useExportCsvSticky;
//# sourceMappingURL=use-export-csv-sticky.js.map