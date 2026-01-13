"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickyHeaderWrapper = void 0;
/**
 * StickyDataTable V2 - StickyHeaderWrapper Component
 *
 * Wrapper component for the sticky header section.
 * Contains header, navigation arrows, gradient overlay, and optionally an integrated toolbar.
 *
 * When toolbar is integrated:
 * - Toolbar renders above the table header within the sticky container
 * - Both toolbar and header stick together when scrolling
 * - Header gap expands to accommodate toolbar height
 *
 * @module components/sticky-header-wrapper
 */
const react_1 = require("react");
const config_1 = require("../config");
const navigation_arrows_1 = require("./navigation-arrows");
const table_header_1 = require("./table-header");
/**
 * Sticky header wrapper
 *
 * Features:
 * - Sticky positioning with gap
 * - Navigation arrows
 * - Gradient scroll indicator
 * - Shadow line indicator
 */
const StickyHeaderWrapperBase = ({ headerGap = config_1.TABLE_CONFIG.HEADER_GAP, headerHeight = config_1.TABLE_CONFIG.HEADER_HEIGHT, headerScrollRef, bodyScrollRef, stickyColumns, scrollableColumns, allColumns, columnLabels, sortColumn, sortDirection, onSort, stickyState, showScrollIndicator, onScrollLeft, onScrollRight, borderRadius, borderConfig, backgroundConfig, columnChange, leavingColumnKeys, leavingColumns, enteringColumnKeys, totalStickyWidth, arrowPreferredTopOffset, selectionState, integratedToolbar, integratedToolbarPadding, integratedToolbarHeight, enableColumnReorder, onReorderColumns, isColumnConfigHydrated = true, lastDroppedKeyRef, dragCloneMode = 'floating', 
// Drag state from parent (lifted useHeaderDrag)
dragState, columnRectsRef, isColumnDraggable, handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel, getShiftDirection, getInlineOffset, getShiftAmount, cloneMode, isInlineDragMode, gradientBackgroundColor = 'var(--background-color-secondary_alt)', hideArrows = false, }) => {
    // Calculate effective padding for integrated toolbar
    const toolbarPadding = {
        top: integratedToolbarPadding?.top ?? config_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
        bottom: integratedToolbarPadding?.bottom ?? config_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP,
        left: integratedToolbarPadding?.left ?? 0,
        right: integratedToolbarPadding?.right ?? 0,
    };
    const toolbarHeight = integratedToolbarHeight ?? config_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT;
    return (<div className={`sticky z-30 flex flex-col ${backgroundConfig.headerWrapper}`} style={{
            top: `${headerGap}px`,
            width: '100%',
        }}>
      {/* Background filler above header (and toolbar if integrated) */}
      <div className={backgroundConfig.headerWrapper} style={{
            height: `${headerGap}px`,
            position: 'absolute',
            top: `-${headerGap}px`,
            left: 0,
            right: 0,
            pointerEvents: 'none',
        }}/>

      {/* Integrated Toolbar (Experimental) - Renders above table header in sticky area */}
      {integratedToolbar && (<div className="flex items-center justify-end" style={{
                minHeight: toolbarHeight,
                paddingTop: toolbarPadding.top,
                paddingBottom: toolbarPadding.bottom,
                paddingLeft: toolbarPadding.left,
                paddingRight: toolbarPadding.right,
                // Debug: uncomment to visualize toolbar bounds
                // backgroundColor: 'rgba(59, 130, 246, 0.1)',
                // border: '1px dashed rgba(59, 130, 246, 0.5)',
            }}>
          {integratedToolbar}
        </div>)}

      {/* Navigation arrows - hidden during empty state */}
      {!hideArrows && (<navigation_arrows_1.NavigationArrows showLeftArrow={stickyState.showLeftArrow} showRightArrow={stickyState.showRightArrow} onScrollLeft={onScrollLeft} onScrollRight={onScrollRight} bodyScrollRef={bodyScrollRef} headerGap={headerGap} totalStickyWidth={totalStickyWidth} preferredTopOffset={arrowPreferredTopOffset}/>)}

      {/* Shadow line indicator (hidden by default) */}
      <div className="pointer-events-none absolute z-[1] w-[1px]" style={{
            top: 0,
            left: `${totalStickyWidth}px`,
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent)',
            opacity: 0,
        }}/>

      {/* Table header - gradient is now rendered INSIDE the header using clip-path for proper clipping */}
      <table_header_1.TableHeader headerScrollRef={headerScrollRef} headerHeight={headerHeight} stickyColumns={stickyColumns} scrollableColumns={scrollableColumns} allColumns={allColumns} columnLabels={columnLabels} stickyState={stickyState} borderConfig={borderConfig} backgroundConfig={backgroundConfig} borderRadius={borderRadius} sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} columnChange={columnChange} leavingColumnKeys={leavingColumnKeys} leavingColumns={leavingColumns} enteringColumnKeys={enteringColumnKeys} selectionState={selectionState} enableColumnReorder={enableColumnReorder} onReorderColumns={onReorderColumns} isColumnConfigHydrated={isColumnConfigHydrated} lastDroppedKeyRef={lastDroppedKeyRef} dragCloneMode={dragCloneMode} 
    // Drag state from parent (lifted useHeaderDrag)
    dragState={dragState} columnRectsRef={columnRectsRef} isColumnDraggable={isColumnDraggable} handlePointerDown={handlePointerDown} handlePointerMove={handlePointerMove} handlePointerUp={handlePointerUp} handlePointerCancel={handlePointerCancel} getShiftDirection={getShiftDirection} getInlineOffset={getInlineOffset} getShiftAmount={getShiftAmount} cloneMode={cloneMode} isInlineDragMode={isInlineDragMode} 
    // Gradient is now inside header, clipped by clip-path to match border-radius
    showScrollIndicator={showScrollIndicator} gradientBackgroundColor={gradientBackgroundColor}/>
    </div>);
};
exports.StickyHeaderWrapper = (0, react_1.memo)(StickyHeaderWrapperBase);
exports.StickyHeaderWrapper.displayName = 'StickyHeaderWrapper';
//# sourceMappingURL=sticky-header-wrapper.js.map