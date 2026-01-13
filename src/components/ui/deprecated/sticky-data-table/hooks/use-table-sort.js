"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableSort = void 0;
const react_1 = require("react");
/**
 * Generic hook for table sorting
 */
function useTableSort(data) {
    const [sortColumn, setSortColumn] = (0, react_1.useState)(null);
    const [sortDirection, setSortDirection] = (0, react_1.useState)('desc');
    const sortedData = (0, react_1.useMemo)(() => {
        return [...data].sort((a, b) => {
            if (!sortColumn)
                return 0;
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                const modifier = sortDirection === 'asc' ? 1 : -1;
                return (aVal - bVal) * modifier;
            }
            const modifier = sortDirection === 'asc' ? 1 : -1;
            return aVal > bVal ? modifier : aVal < bVal ? -modifier : 0;
        });
    }, [data, sortColumn, sortDirection]);
    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortColumn(columnKey);
            setSortDirection('desc');
        }
    };
    return {
        sortColumn,
        sortDirection,
        sortedData,
        handleSort,
    };
}
exports.useTableSort = useTableSort;
//# sourceMappingURL=use-table-sort.js.map