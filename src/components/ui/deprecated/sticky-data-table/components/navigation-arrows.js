"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationArrows = void 0;
/**
 * StickyDataTable V2 - NavigationArrows Component
 *
 * Container for left and right navigation arrows.
 * Manages positioning based on table dimensions.
 *
 * @module components/navigation-arrows
 */
const react_1 = require("react");
const config_1 = require("../config");
const use_arrow_position_1 = require("../hooks/use-arrow-position");
const navigation_arrow_1 = require("./navigation-arrow");
/**
 * Navigation arrows container
 *
 * Features:
 * - Dynamic vertical positioning
 * - Responsive to table height
 * - Left arrow aligns with sticky column edge
 */
const NavigationArrowsBase = ({ showLeftArrow, showRightArrow, onScrollLeft, onScrollRight, bodyScrollRef, headerGap, totalStickyWidth, preferredTopOffset, }) => {
    // Calculate arrow position based on table height
    const arrowPosition = (0, use_arrow_position_1.useArrowPosition)({
        bodyRef: bodyScrollRef,
        headerGap,
        preferredTopOffset: preferredTopOffset ?? config_1.ARROW_CONFIG.PREFERRED_TOP_OFFSET,
        bottomOffset: config_1.ARROW_CONFIG.BOTTOM_OFFSET,
        arrowHeight: config_1.ARROW_CONFIG.ARROW_HEIGHT,
    });
    // Left arrow position aligns with sticky column edge
    const leftArrowPosition = `${totalStickyWidth}px`;
    return (<>
      <navigation_arrow_1.NavigationArrow direction="left" onClick={onScrollLeft} visible={showLeftArrow} position={{
            ...arrowPosition,
            left: leftArrowPosition,
        }}/>
      <navigation_arrow_1.NavigationArrow direction="right" onClick={onScrollRight} visible={showRightArrow} position={{
            ...arrowPosition,
            right: config_1.ARROW_CONFIG.RIGHT_ARROW_RIGHT,
        }}/>
    </>);
};
exports.NavigationArrows = (0, react_1.memo)(NavigationArrowsBase);
exports.NavigationArrows.displayName = 'NavigationArrows';
//# sourceMappingURL=navigation-arrows.js.map