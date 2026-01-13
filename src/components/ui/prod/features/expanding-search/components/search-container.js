"use strict";
/**
 * Search Container
 *
 * The animated container that expands/collapses horizontally.
 * Manages width transitions and provides the visual shell.
 *
 * @module expanding-search/components/search-container
 */
'use client';
/**
 * Search Container
 *
 * The animated container that expands/collapses horizontally.
 * Manages width transitions and provides the visual shell.
 *
 * @module expanding-search/components/search-container
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchContainer = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const animation_1 = require("../utils/animation");
exports.SearchContainer = (0, react_1.forwardRef)(({ isExpanded, collapsedWidth, expandedWidth, height, duration, className, onClick, onTransitionEnd, children, }, ref) => {
    const currentWidth = isExpanded ? expandedWidth : collapsedWidth;
    return (<div ref={ref} onClick={onClick} onTransitionEnd={onTransitionEnd} className={(0, utils_1.cn)('group/search relative overflow-hidden', 'rounded-full', 'cursor-pointer', 'motion-reduce:transition-none', isExpanded && 'cursor-text')} style={{
            width: currentWidth,
            height,
            transition: (0, animation_1.getContainerTransition)(duration),
        }}>
        {/* Background layer - transparent at rest, visible on hover/active/expanded */}
        <div className={(0, utils_1.cn)('absolute inset-0 z-0 rounded-full transition-opacity duration-150 pointer-events-none', 'bg-secondary', className, // includes shine-1
        isExpanded ? 'opacity-100' : 'opacity-0 group-hover/search:opacity-100 group-active/search:opacity-100')}/>
        {children}
      </div>);
});
exports.SearchContainer.displayName = 'SearchContainer';
//# sourceMappingURL=search-container.js.map