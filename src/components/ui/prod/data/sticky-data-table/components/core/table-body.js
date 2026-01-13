"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBody = void 0;
/**
 * StickyDataTable V2 - TableBody Component
 *
 * Renders the scrollable table body with rows.
 * Optimized for large datasets with memoization.
 *
 * @module components/table-body
 */
const react_1 = require("react");
const React = require("react");
const utils_1 = require("../../utils");
const table_row_1 = require("./table-row");
const hooks_1 = require("../../hooks");
const config_1 = require("../../config");
/**
 * Table body component
 *
 * Features:
 * - Scrollable container with sync
 * - Memoized row rendering
 * - Sticky cell positioning
 * - Selection checkbox support
 */
function TableBodyBase({ bodyScrollRef, data, stickyColumns, scrollableColumns, allColumns, stickyState, borderConfig, backgroundConfig, borderRadius, rowHeight = config_1.TABLE_CONFIG.ROW_HEIGHT, renderCell, onRowClick, columnChange, leavingColumnKeys, leavingColumns, enteringColumnKeys, selectionState, getRowId, loadingIndicator, onEndReached, onEndReachedThreshold = 200, lastDroppedKeyRef, 
// Drag state for inline column shifting
getShiftDirection, getInlineOffset, getShiftAmount, isInlineDragMode = false, draggedColumnKey, }) {
    const outerBorderClasses = (0, utils_1.getBodyOuterBorders)(borderConfig);
    const outerBorderStyles = (0, utils_1.getBodyOuterBorderStyles)(borderConfig);
    const sentinelRef = (0, react_1.useRef)(null);
    // Auto-FLIP: Smooth column shift animations for body cells
    const columnKeys = allColumns.map((col) => col.key);
    (0, hooks_1.useAutoColumnFlip)(bodyScrollRef, columnKeys, {
        draggedKeyRef: lastDroppedKeyRef,
    });
    // Calculate total sticky width for positioning leaving columns
    const totalStickyWidth = stickyColumns.reduce((sum, col) => sum + col.width, 0);
    (0, react_1.useEffect)(() => {
        if (!onEndReached || !sentinelRef.current)
            return;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry?.isIntersecting) {
                onEndReached();
            }
        }, {
            root: null, // Use viewport as root to support window scrolling
            rootMargin: `0px 0px ${onEndReachedThreshold}px 0px`,
        });
        observer.observe(sentinelRef.current);
        return () => {
            observer.disconnect();
        };
    }, [onEndReached, onEndReachedThreshold, data.length]);
    return (<div className="relative">
      {/* Main scrollable body */}
      <div ref={bodyScrollRef} className={`overflow-x-auto overflow-y-hidden ${outerBorderClasses} ${backgroundConfig.bodyContainer}`} style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // Horizontal overscroll: contain to prevent parent horizontal scroll
            // Vertical: auto (default) - allows natural propagation since overflow-y is hidden
            overscrollBehaviorX: 'contain',
            // Touch action: allow both pan directions
            // Horizontal panning scrolls the table, vertical panning passes through to page
            touchAction: 'pan-x pan-y',
            lineHeight: 0,
            fontSize: 0,
            borderBottomLeftRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
            willChange: 'scroll-position',
            ...outerBorderStyles, // Side-specific border colors
        }}>
        {data.map((row, index) => {
            const rowId = getRowId ? getRowId(row, index) : index;
            return (<table_row_1.TableRow key={rowId} row={row} index={index} rowId={rowId} stickyColumns={stickyColumns} scrollableColumns={scrollableColumns} allColumns={allColumns} stickyState={stickyState} borderConfig={borderConfig} backgroundConfig={backgroundConfig} rowHeight={rowHeight} renderCell={renderCell} onRowClick={onRowClick} columnChange={columnChange} leavingColumnKeys={leavingColumnKeys} enteringColumnKeys={enteringColumnKeys} selectionState={selectionState} 
            // Drag state for inline column shifting
            getShiftDirection={getShiftDirection} getInlineOffset={getInlineOffset} getShiftAmount={getShiftAmount} isInlineDragMode={isInlineDragMode} draggedColumnKey={draggedColumnKey}/>);
        })}

        {/* Sentinel for infinite scroll */}
        {onEndReached && <div ref={sentinelRef} style={{ height: 1, width: 1, pointerEvents: 'none', opacity: 0 }}/>}

        {/* Loading Indicator (injected into scroll container) */}
        {/* Pass table's columns (with checkbox) and configs to ensure skeleton matches real table */}
        {loadingIndicator && (<div style={{ minWidth: '100%', width: 'fit-content' }}>
            {React.isValidElement(loadingIndicator)
                ? React.cloneElement(loadingIndicator, {
                    stickyState,
                    columns: allColumns, // Pass computed columns with checkbox
                    enableSelection: false, // Columns already include checkbox, don't add again
                    borderConfig, // Pass table's border config
                    backgroundConfig, // Pass table's background config
                    rowHeight, // Pass table's row height
                })
                : loadingIndicator}
          </div>)}
      </div>

    </div>);
}
const MemoizedTableBody = (0, react_1.memo)(TableBodyBase);
// Type assertion to preserve generic type information
exports.TableBody = MemoizedTableBody;
exports.TableBody.displayName = 'TableBody';
//# sourceMappingURL=table-body.js.map