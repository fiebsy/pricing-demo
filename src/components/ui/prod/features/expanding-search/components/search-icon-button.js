"use strict";
/**
 * Search Icon Button
 *
 * The trigger button that displays the search icon.
 * Stays fixed at the left position while the input slides in.
 *
 * @module expanding-search/components/search-icon-button
 */
'use client';
/**
 * Search Icon Button
 *
 * The trigger button that displays the search icon.
 * Stays fixed at the left position while the input slides in.
 *
 * @module expanding-search/components/search-icon-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIconButton = void 0;
const react_1 = require("react");
const button_1 = require("@base-ui/react/button");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const icon_1 = require("@/components/ui/prod/base/icon");
const utils_1 = require("@/lib/utils");
const SearchIconButton = ({ isExpanded, collapsedWidth, iconSize, iconStrokeWidth, iconOpacity, onClick, }) => {
    return (<button_1.Button onClick={isExpanded ? undefined : onClick} className={(0, utils_1.cn)('absolute left-0 top-0 bottom-0', 'flex items-center justify-center', isExpanded
            ? 'text-primary'
            : 'text-tertiary group-hover/search:text-primary group-active/search:text-primary', 'transition-[color,transform] duration-150', 'focus:outline-none', !isExpanded && 'active:scale-95')} style={{
            width: collapsedWidth,
            opacity: iconOpacity / 100,
        }} aria-label={isExpanded ? 'Search' : 'Open search'} tabIndex={isExpanded ? -1 : 0}>
      <icon_1.HugeIcon icon={core_stroke_rounded_1.Search01Icon} size={iconSize} strokeWidth={iconStrokeWidth}/>
    </button_1.Button>);
};
exports.SearchIconButton = SearchIconButton;
exports.SearchIconButton.displayName = 'SearchIconButton';
//# sourceMappingURL=search-icon-button.js.map