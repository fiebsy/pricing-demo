"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeletonBodyCell = exports.SkeletonHeaderCell = void 0;
/**
 * Skeleton Cells
 *
 * Sticky-aware skeleton cells for header and body rows.
 *
 * @module skeleton/skeleton-cells
 */
const skeleton_1 = require("@/components/ui/deprecated/skeleton");
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
/**
 * Skeleton Header Cell - Sticky Aware
 *
 * Renders a single header cell skeleton with proper sticky positioning,
 * backgrounds, and borders matching the real table.
 */
const SkeletonHeaderCell = ({ column, stickyState, borderConfig, backgroundConfig, cellConfig = utils_2.DEFAULT_HEADER_CELL_CONFIG, }) => {
    // Use same style utilities as real table
    const style = (0, utils_1.getCellStyle)(column, stickyState);
    const backgroundClass = (0, utils_1.getHeaderStickyBackground)(backgroundConfig, stickyState, column.isSticky ?? false);
    const stickyBorder = (0, utils_1.getStickyColumnBorder)(column, stickyState, borderConfig);
    // Suppress right border for first sticky when enhanced styling active
    const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling;
    const cellBorder = stickyBorder || shouldSuppressRightBorder
        ? ''
        : (0, utils_1.getCellBorder)(borderConfig, column.isLast, column.key);
    const paddingClass = (0, utils_1.getCellPadding)(column.isFirst, column.isLast);
    const alignment = (0, utils_1.getAlignmentClasses)(column.align);
    // Calculate skeleton dimensions based on config
    const isCheckbox = column.key === '__checkbox';
    const skeletonWidth = isCheckbox ? 20 : (0, utils_2.calculateSkeletonWidth)(column, cellConfig);
    const skeletonHeight = isCheckbox ? 20 : cellConfig.height;
    const skeletonBorderRadius = cellConfig.borderRadius;
    return (<div className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder}`} style={style}>
      <div className={`${paddingClass} flex h-full items-center ${alignment.flexJustify}`}>
        <skeleton_1.Skeleton style={{
            width: skeletonWidth,
            height: skeletonHeight,
            borderRadius: skeletonBorderRadius,
        }}/>
      </div>
    </div>);
};
exports.SkeletonHeaderCell = SkeletonHeaderCell;
/**
 * Skeleton Body Cell - Sticky Aware
 *
 * Renders a single body cell skeleton with proper sticky positioning,
 * backgrounds, and borders matching the real table.
 */
const SkeletonBodyCell = ({ column, stickyState, borderConfig, backgroundConfig, cellConfig = utils_2.DEFAULT_BODY_CELL_CONFIG, }) => {
    // Use same style utilities as real table
    const style = (0, utils_1.getCellStyle)(column, stickyState);
    const backgroundClass = (0, utils_1.getRowStickyBackground)(backgroundConfig, stickyState, column.isSticky ?? false);
    const stickyBorder = (0, utils_1.getStickyColumnBorder)(column, stickyState, borderConfig);
    // Suppress right border for first sticky when enhanced styling active
    const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling;
    const cellBorder = stickyBorder || shouldSuppressRightBorder
        ? ''
        : (0, utils_1.getCellBorder)(borderConfig, column.isLast, column.key);
    const paddingClass = (0, utils_1.getCellPadding)(column.isFirst, column.isLast);
    const alignment = (0, utils_1.getAlignmentClasses)(column.align);
    // Calculate skeleton dimensions based on config
    const isCheckbox = column.key === '__checkbox';
    const skeletonWidth = isCheckbox ? 16 : (0, utils_2.calculateSkeletonWidth)(column, cellConfig);
    const skeletonHeight = isCheckbox ? 16 : cellConfig.height;
    const skeletonBorderRadius = cellConfig.borderRadius;
    return (<div className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder}`} style={style}>
      <div className={`${paddingClass} flex h-full items-center ${alignment.flexJustify}`}>
        <skeleton_1.Skeleton style={{
            width: skeletonWidth,
            height: skeletonHeight,
            borderRadius: skeletonBorderRadius,
        }}/>
      </div>
    </div>);
};
exports.SkeletonBodyCell = SkeletonBodyCell;
//# sourceMappingURL=skeleton-cells.js.map