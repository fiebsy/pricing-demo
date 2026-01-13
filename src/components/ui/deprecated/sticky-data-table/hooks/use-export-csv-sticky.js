"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExportCsvSticky = void 0;
/**
 * Simple CSV export utility - generates and downloads CSV files
 */
function downloadCsv(data, fileName) {
    if (data.length === 0)
        return;
    // Get headers from first row
    const headers = Object.keys(data[0]);
    // Build CSV content
    const csvRows = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma or quote
            const stringValue = String(value ?? '');
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(','))
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/**
 * Export hook for StickyDataTable that works with SelectionState
 */
const useExportCsvSticky = ({ data, selectionState, fileName, getRowId, customizeCsvOutput, }) => {
    const mapDataForCsv = (item) => customizeCsvOutput ? customizeCsvOutput(item) : item;
    const exportData = async (items) => {
        try {
            if (items.length === 0) {
                console.warn('No data to export');
                return;
            }
            const csvData = items.map(mapDataForCsv);
            downloadCsv(csvData, fileName);
            console.log(`${items.length} row${items.length === 1 ? '' : 's'} exported successfully!`);
        }
        catch (error) {
            console.error('Failed to export data:', error);
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
                console.warn('No rows selected');
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