"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnControlPanel = void 0;
/**
 * StickyDataTable V2 - ColumnControlPanel Component
 *
 * Simplified dropdown panel for toggling column visibility.
 * Uses native HTML elements for demo/sandbox environment.
 *
 * @module components/column-control-panel
 */
const react_1 = require("react");
const icon_1 = require("@/components/ui/prod/base/icon");
const Menu01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Menu01Icon");
const checkbox_1 = require("@/components/ui/base/primitives/checkbox");
/**
 * Column control panel - simplified for demo environment
 */
const ColumnControlPanelBase = ({ allColumns, visibleColumnKeys, onToggleColumn, onResetColumns, columnLabels, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const menuRef = (0, react_1.useRef)(null);
    const buttonRef = (0, react_1.useRef)(null);
    // Close on outside click
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);
    // Copy current visible columns configuration to clipboard
    const handleCopyDefaults = (0, react_1.useCallback)(() => {
        const visibleColumns = allColumns
            .filter((col) => col.key !== '__checkbox' && visibleColumnKeys.has(col.key))
            .map((col) => col.key);
        const config = {
            defaultVisibleColumns: visibleColumns,
        };
        const configString = JSON.stringify(config, null, 2);
        navigator.clipboard.writeText(configString);
    }, [allColumns, visibleColumnKeys]);
    const handleReset = (0, react_1.useCallback)(() => {
        onResetColumns();
        setIsOpen(false);
    }, [onResetColumns]);
    return (<div className="relative">
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center size-8 rounded-md text-tertiary hover:text-primary hover:bg-secondary transition-colors" title="Column Visibility">
        <icon_1.HugeIcon icon={Menu01Icon_1.default} size={18} strokeWidth={1.5}/>
      </button>

      {isOpen && (<div ref={menuRef} className="absolute right-0 top-full mt-1 z-50 min-w-[200px] rounded-lg border border-primary bg-primary shadow-lg">
          <div className="px-3 py-2 border-b border-secondary">
            <span className="text-xs font-semibold text-secondary">Column Visibility</span>
          </div>

          <div className="py-1 max-h-[300px] overflow-y-auto">
            {allColumns.map((col) => {
                if (col.key === '__checkbox')
                    return null;
                const isVisible = visibleColumnKeys.has(col.key);
                const isSticky = col.isSticky ?? false;
                const label = columnLabels[col.key] || col.key;
                return (<div key={col.key} role="menuitemcheckbox" aria-checked={isVisible} tabIndex={0} onClick={() => onToggleColumn(col.key)} onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onToggleColumn(col.key);
                        }
                    }} className="flex items-center gap-2.5 w-full px-3 py-1.5 text-left hover:bg-secondary transition-colors cursor-pointer">
                  <checkbox_1.Checkbox isSelected={isVisible} onChange={() => onToggleColumn(col.key)} size="sm"/>
                  <span className="flex-1 text-sm text-primary">{label}</span>
                  {isSticky && (<span className="text-quaternary text-xs">Sticky</span>)}
                </div>);
            })}
          </div>

          <div className="border-t border-secondary py-1">
            <button onClick={handleCopyDefaults} className="w-full px-3 py-1.5 text-left text-sm text-primary hover:bg-secondary transition-colors">
              Copy Defaults
            </button>
            <button onClick={handleReset} className="w-full px-3 py-1.5 text-left text-sm text-primary hover:bg-secondary transition-colors">
              Reset All
            </button>
          </div>
        </div>)}
    </div>);
};
exports.ColumnControlPanel = (0, react_1.memo)(ColumnControlPanelBase);
exports.ColumnControlPanel.displayName = 'ColumnControlPanel';
//# sourceMappingURL=column-control-panel.js.map