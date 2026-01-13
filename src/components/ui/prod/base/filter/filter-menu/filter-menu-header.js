"use strict";
/**
 * Filter Menu - Header Component
 *
 * Header with filter icon and title, matching the V1 FilterHeader styling.
 * Includes optional divider below for visual separation from menu items.
 *
 * Uses centralized config for consistent styling with other menu components.
 *
 * @module prod/base/filter/filter-menu/filter-menu-header
 */
'use client';
/**
 * Filter Menu - Header Component
 *
 * Header with filter icon and title, matching the V1 FilterHeader styling.
 * Includes optional divider below for visual separation from menu items.
 *
 * Uses centralized config for consistent styling with other menu components.
 *
 * @module prod/base/filter/filter-menu/filter-menu-header
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMenuHeader = void 0;
const react_1 = require("react");
const FilterIcon_1 = require("@hugeicons-pro/core-stroke-rounded/FilterIcon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const menu_1 = require("../../menu");
const FilterMenuHeader = ({ title = 'Add a filter', showDivider = true, itemRadius = 12, }) => {
    return (<>
      <div className={(0, utils_1.cn)('flex items-center corner-squircle', menu_1.MENU_ITEM_STYLES.paddingX, menu_1.MENU_ITEM_STYLES.minHeight, menu_1.MENU_ITEM_STYLES.iconGap)} style={{ borderRadius: itemRadius }}>
        <icon_1.HugeIcon icon={FilterIcon_1.default} size={menu_1.MENU_ITEM_STYLES.iconSize} strokeWidth={menu_1.MENU_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(menu_1.MENU_ITEM_STYLES.iconColor, menu_1.MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}/>
        <span className={(0, utils_1.cn)('text-fg-tertiary flex-1 truncate', menu_1.MENU_ITEM_STYLES.textSize, menu_1.MENU_ITEM_STYLES.textWeight)}>
          {title}
        </span>
      </div>
      {showDivider && (<div role="separator" className={(0, menu_1.getSeparatorClasses)('header')}/>)}
    </>);
};
exports.FilterMenuHeader = FilterMenuHeader;
exports.FilterMenuHeader.displayName = 'FilterMenuHeader';
//# sourceMappingURL=filter-menu-header.js.map