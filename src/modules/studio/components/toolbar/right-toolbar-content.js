"use strict";
/**
 * RightToolbarContent Component
 *
 * Contains the ExpandingSearch component for the right side of the toolbar.
 */
'use client';
/**
 * RightToolbarContent Component
 *
 * Contains the ExpandingSearch component for the right side of the toolbar.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightToolbarContent = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const expanding_search_1 = require("@/components/ui/prod/features/expanding-search");
const hardened_preset_1 = require("../../config/hardened-preset");
// =============================================================================
// COMPONENT
// =============================================================================
const RightToolbarContent = ({ value, onChange, expanded, onExpandedChange, className, }) => {
    return (<div className={(0, utils_1.cn)('flex items-center', className)}>
      <expanding_search_1.ExpandingSearch value={value} onChange={onChange} expanded={expanded} onExpandedChange={onExpandedChange} placeholder={hardened_preset_1.HARDENED_SEARCH_CONFIG.placeholder} expandedWidth={hardened_preset_1.HARDENED_SEARCH_CONFIG.expandedWidth} collapsedWidth={hardened_preset_1.HARDENED_SEARCH_CONFIG.collapsedWidth} height={hardened_preset_1.HARDENED_SEARCH_CONFIG.height} duration={hardened_preset_1.HARDENED_SEARCH_CONFIG.duration} revealMode={hardened_preset_1.HARDENED_SEARCH_CONFIG.revealMode} hideMode={hardened_preset_1.HARDENED_SEARCH_CONFIG.hideMode} collapseOnBlur={hardened_preset_1.HARDENED_SEARCH_CONFIG.collapseOnBlur} className="shine-1"/>
    </div>);
};
exports.RightToolbarContent = RightToolbarContent;
exports.RightToolbarContent.displayName = 'RightToolbarContent';
//# sourceMappingURL=right-toolbar-content.js.map