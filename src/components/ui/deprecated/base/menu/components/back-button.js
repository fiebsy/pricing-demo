"use strict";
/**
 * Base UI Menu - Back Button Component
 *
 * Navigation button for returning to the previous menu level.
 *
 * @module base-ui/menu/components/back-button
 */
'use client';
/**
 * Base UI Menu - Back Button Component
 *
 * Navigation button for returning to the previous menu level.
 *
 * @module base-ui/menu/components/back-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = void 0;
const react_1 = require("react");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
// ============================================================================
// Component
// ============================================================================
/**
 * Back button for submenu navigation
 */
const BackButton = ({ title, onBack }) => {
    return (<>
      <div onClick={(e) => {
            e.stopPropagation();
            onBack();
        }} onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowLeft') {
                e.preventDefault();
                onBack();
            }
        }} className={(0, utils_1.cn)('hover:bg-quaternary focus:bg-quaternary active:bg-tertiary', 'mb-1 flex cursor-pointer items-center gap-2.5 corner-squircle px-2.5 py-1.5', 'transition-colors duration-150 outline-none')} style={{ borderRadius: 'var(--menu-item-radius, 12px)' }} role="menuitem" tabIndex={0}>
        <icon_1.HugeIcon icon={core_stroke_rounded_1.ArrowLeft01Icon} size={16} strokeWidth={2} className="text-tertiary shrink-0"/>
        <span className="text-primary flex-1 truncate text-sm font-medium">
          {title || ''}
        </span>
      </div>
      <div role="separator" className="bg-border-primary -mx-1 my-1 h-px opacity-50"/>
    </>);
};
exports.BackButton = BackButton;
exports.BackButton.displayName = 'BackButton';
//# sourceMappingURL=back-button.js.map