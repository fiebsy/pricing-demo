"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnControlPanel = void 0;
/**
 * StickyDataTable V2 - ColumnControlPanel Component
 *
 * Dropdown panel for toggling column visibility.
 * Now uses prod/base/menu with checkbox items for full PROD integration.
 *
 * @module components/column-control-panel
 */
const react_1 = require("react");
const Layout2ColumnIcon_1 = require("@hugeicons-pro/core-stroke-rounded/Layout2ColumnIcon");
const menu_1 = require("@/components/ui/prod/base/menu");
const button_utility_1 = require("@/components/ui/prod/base/button-utility");
const icon_1 = require("@/components/ui/prod/base/icon");
/**
 * Column control panel
 *
 * Features:
 * - Checkbox list of all columns (organized by groups if provided)
 * - Sticky column indicator
 * - Reset all option
 */
const ColumnControlPanelBase = ({ allColumns, visibleColumnKeys, onToggleColumn, onResetColumns, columnLabels, columnGroups, }) => {
    // Build menu items from columns
    const menuItems = (0, react_1.useMemo)(() => {
        const items = [];
        // Helper to create checkbox item for a column
        const createCheckboxItem = (col) => {
            const isVisible = visibleColumnKeys.has(col.key);
            const isSticky = col.isSticky ?? false;
            const baseLabel = columnLabels[col.key] || col.key;
            const label = isSticky ? `${baseLabel} (Sticky)` : baseLabel;
            return {
                type: 'checkbox',
                id: col.key,
                label,
                checked: isVisible,
                onCheckedChange: () => onToggleColumn(col.key),
            };
        };
        if (columnGroups && columnGroups.length > 0) {
            // Group columns
            const groupedColumns = {};
            const ungroupedColumns = [];
            // Initialize groups
            columnGroups.forEach((group) => {
                groupedColumns[group.label] = [];
            });
            // Sort columns into groups
            allColumns.forEach((col) => {
                if (col.key === '__checkbox')
                    return;
                let found = false;
                for (const group of columnGroups) {
                    if (group.keys.includes(col.key)) {
                        groupedColumns[group.label]?.push(col);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    ungroupedColumns.push(col);
                }
            });
            // Add grouped columns
            columnGroups.forEach((group) => {
                const groupCols = groupedColumns[group.label];
                if (!groupCols || groupCols.length === 0)
                    return;
                items.push({ type: 'label', id: `group-${group.label}`, label: group.label });
                groupCols.forEach((col) => {
                    items.push(createCheckboxItem(col));
                });
            });
            // Add ungrouped columns
            if (ungroupedColumns.length > 0) {
                items.push({ type: 'label', id: 'group-other', label: 'Other' });
                ungroupedColumns.forEach((col) => {
                    items.push(createCheckboxItem(col));
                });
            }
        }
        else {
            // No groups - render all columns in one list
            allColumns.forEach((col) => {
                if (col.key === '__checkbox')
                    return;
                items.push(createCheckboxItem(col));
            });
        }
        return items;
    }, [allColumns, visibleColumnKeys, onToggleColumn, columnLabels, columnGroups]);
    // Wrap icon for ButtonUtility
    const ColumnsIcon = () => <icon_1.HugeIcon icon={Layout2ColumnIcon_1.default} size={20} strokeWidth={1.5} data-icon/>;
    return (<menu_1.Menu trigger={<button_utility_1.ButtonUtility icon={ColumnsIcon} tooltip="Column Visibility" size="sm" color="tertiary"/>} header={<div className={`flex items-center text-quaternary opacity-60 ${menu_1.MENU_ITEM_STYLES_SMALL.paddingX} ${menu_1.MENU_ITEM_STYLES_SMALL.minHeight} ${menu_1.MENU_ITEM_STYLES_SMALL.textSize} font-normal mb-1`}>
          Column visibility
        </div>} items={menuItems} width={180} side="bottom" align="end" className="font-medium [&_[role=menuitemcheckbox]]:min-h-7 [&_[role=menuitemcheckbox]]:py-1 [&_.size-4]:size-3.5"/>);
};
exports.ColumnControlPanel = (0, react_1.memo)(ColumnControlPanelBase);
exports.ColumnControlPanel.displayName = 'ColumnControlPanel';
//# sourceMappingURL=column-control-panel.js.map