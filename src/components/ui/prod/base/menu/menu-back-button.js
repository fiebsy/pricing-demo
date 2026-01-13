"use strict";
/**
 * Menu - Back Button Component
 *
 * Navigation button for returning from submenu to root menu.
 * Includes separator below to match header styling.
 *
 * Uses centralized config for consistent styling with other menu components.
 *
 * @module prod/base/menu/menu-back-button
 */
'use client';
/**
 * Menu - Back Button Component
 *
 * Navigation button for returning from submenu to root menu.
 * Includes separator below to match header styling.
 *
 * Uses centralized config for consistent styling with other menu components.
 *
 * @module prod/base/menu/menu-back-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuBackButton = void 0;
const react_1 = require("react");
const ArrowLeft01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
const MenuBackButton = ({ title, onBack, showDivider = true, }) => {
    return (<>
      <button onClick={onBack} className={(0, utils_1.cn)('flex w-full items-center', config_1.MENU_ITEM_STYLES.paddingX, config_1.MENU_ITEM_STYLES.minHeight, config_1.MENU_ITEM_STYLES.iconGap, config_1.MENU_ITEM_STYLES.textSize, config_1.MENU_ITEM_STYLES.textWeight, 'text-primary', config_1.INTERACTIVE_STATES.hover, config_1.INTERACTIVE_STATES.active, config_1.INTERACTIVE_STATES.focusVisible, 'corner-squircle', 'transition-colors duration-150', 'motion-reduce:transition-none', 'outline-none')} style={{ borderRadius: 'var(--menu-item-radius, 12px)' }}>
        <icon_1.HugeIcon icon={ArrowLeft01Icon_1.default} size={config_1.MENU_ITEM_STYLES.iconSize} strokeWidth={config_1.MENU_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(config_1.MENU_ITEM_STYLES.iconColor, config_1.MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}/>
        <span className="truncate">{title}</span>
      </button>
      {showDivider && (<div role="separator" className={(0, config_1.getSeparatorClasses)('header')}/>)}
    </>);
};
exports.MenuBackButton = MenuBackButton;
exports.MenuBackButton.displayName = 'MenuBackButton';
//# sourceMappingURL=menu-back-button.js.map