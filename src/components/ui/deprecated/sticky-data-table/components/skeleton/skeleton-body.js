"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeletonBodySticky = exports.SkeletonRowSticky = void 0;
/**
 * Skeleton Body
 *
 * Sticky-aware body skeleton with rows and overflow detection.
 *
 * @module skeleton/skeleton-body
 */
const react_1 = require("react");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const skeleton_cells_1 = require("./skeleton-cells");
/**
 * Skeleton Row - Sticky Aware
 *
 * Matches StickyDataTable row structure with:
 * - CSS Grid layout
 * - Proper sticky cell styling
 * - Row borders
 */
const SkeletonRowSticky = ({ processed, index, isLast, rowHeight = config_1.TABLE_CONFIG.ROW_HEIGHT, bodyCellConfig, }) => {
    const { allColumns, gridTemplate, stickyState, borderConfig, backgroundConfig } = processed;
    // Row border (between rows)
    const rowBorderClass = !isLast && borderConfig.showRows ? `border-b ${borderConfig.rowColor}` : '';
    return (<div 
    // NOTE: No background class here - cell backgrounds handle sticky styling
    // This matches TableRow which also has no row-level background
    className={`grid w-fit min-w-full ${rowBorderClass}`} style={{
            gridTemplateColumns: gridTemplate,
            height: `${rowHeight}px`,
        }}>
      {allColumns.map((col) => (<skeleton_cells_1.SkeletonBodyCell key={col.key} column={col} stickyState={stickyState} borderConfig={borderConfig} backgroundConfig={backgroundConfig} cellConfig={bodyCellConfig}/>))}
    </div>);
};
exports.SkeletonRowSticky = SkeletonRowSticky;
/**
 * Skeleton Body - Sticky Aware
 *
 * Container for skeleton rows with proper borders
 * Measures overflow to determine sticky state dynamically
 */
const SkeletonBodySticky = ({ processed, rowCount, rowHeight = config_1.TABLE_CONFIG.ROW_HEIGHT, borderRadius = config_1.TABLE_CONFIG.DEFAULT_BORDER_RADIUS, onOverflowDetected, bodyCellConfig, }) => {
    const { borderConfig, backgroundConfig } = processed;
    const bodyRef = (0, react_1.useRef)(null);
    const outerBorderClasses = (0, utils_1.getBodyOuterBorders)(borderConfig);
    const outerBorderStyles = (0, utils_1.getBodyOuterBorderStyles)(borderConfig);
    // Measure overflow after render
    (0, react_1.useEffect)(() => {
        if (!bodyRef.current || !onOverflowDetected)
            return;
        const checkOverflow = () => {
            const element = bodyRef.current;
            if (!element)
                return;
            const hasOverflow = element.scrollWidth > element.clientWidth;
            onOverflowDetected(hasOverflow);
        };
        // Check immediately and after a short delay to account for layout
        checkOverflow();
        const timeoutId = setTimeout(checkOverflow, 100);
        // Also check on resize
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(bodyRef.current);
        return () => {
            clearTimeout(timeoutId);
            resizeObserver.disconnect();
        };
    }, [onOverflowDetected, processed.gridTemplate]);
    return (<div ref={bodyRef} className={`overflow-x-auto overflow-y-hidden ${outerBorderClasses} ${backgroundConfig.bodyContainer}`} style={{
            scrollbarWidth: 'none',
            borderBottomLeftRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
            ...outerBorderStyles, // Side-specific border colors
        }}>
      {Array.from({ length: rowCount }).map((_, i) => (<exports.SkeletonRowSticky key={i} processed={processed} index={i} isLast={i === rowCount - 1} rowHeight={rowHeight} bodyCellConfig={bodyCellConfig}/>))}
    </div>);
};
exports.SkeletonBodySticky = SkeletonBodySticky;
//# sourceMappingURL=skeleton-body.js.map