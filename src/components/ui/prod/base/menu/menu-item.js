"use strict";
/**
 * Menu - Menu Item Component
 *
 * Renders individual menu items using Base UI Menu.Item primitive.
 * Uses centralized config for consistent styling.
 * Handles selected state (checkmarks) and activeCount badges.
 *
 * @module prod/base/menu/menu-item
 */
'use client';
/**
 * Menu - Menu Item Component
 *
 * Renders individual menu items using Base UI Menu.Item primitive.
 * Uses centralized config for consistent styling.
 * Handles selected state (checkmarks) and activeCount badges.
 *
 * @module prod/base/menu/menu-item
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = exports.MenuItemComponent = void 0;
const react_1 = require("react");
const menu_1 = require("@base-ui/react/menu");
const ArrowRight01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon");
const Tick02Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Tick02Icon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const checkbox_1 = require("@/components/ui/prod/base/checkbox");
const config_1 = require("./config");
// ============================================================================
// Styles
// ============================================================================
const baseItemStyles = (0, utils_1.cn)('flex cursor-pointer items-center justify-between', config_1.INTERACTIVE_STATES.hover, config_1.INTERACTIVE_STATES.focusVisible, config_1.INTERACTIVE_STATES.active, 'corner-squircle transition-colors duration-150', 'motion-reduce:transition-none', 'relative outline-none select-none', config_1.MENU_ITEM_STYLES.paddingX, config_1.MENU_ITEM_STYLES.minHeight, config_1.MENU_ITEM_STYLES.textSize);
const itemRadiusStyle = {
    borderRadius: 'var(--menu-item-radius, 12px)',
};
// ============================================================================
// Active Count Badge
// ============================================================================
const ActiveCountBadge = ({ count }) => (<div className={(0, utils_1.cn)('inline-flex items-center justify-center', 'rounded-full', 'bg-utility-brand-50 border border-utility-brand-200', 'text-[10px] font-semibold leading-none text-utility-brand-700', 'px-[5px] py-[2px]')}>
    {count}
  </div>);
// ============================================================================
// Component
// ============================================================================
const MenuItemComponent = ({ item, onSubmenuClick, onSelect, }) => {
    // Separator - spans full width, 50% opacity
    // Note: Uses 'list' context (no my-1) because parent container has gap-1 which provides spacing
    if (item.type === 'separator') {
        return (<div role="separator" className={(0, config_1.getSeparatorClasses)('list')}/>);
    }
    // Label (using div instead of Menu.GroupLabel to avoid Menu.Group requirement)
    if (item.type === 'label') {
        return (<div role="presentation" className="text-tertiary px-2 py-1.5 text-xs font-semibold uppercase tracking-wide">
        {item.label}
      </div>);
    }
    // Checkbox item
    if (item.type === 'checkbox') {
        const checkboxItem = item;
        return (<menu_1.Menu.CheckboxItem checked={checkboxItem.checked} onCheckedChange={checkboxItem.onCheckedChange} disabled={checkboxItem.disabled} closeOnClick={checkboxItem.closeOnClick ?? false} className={(0, utils_1.cn)(baseItemStyles, 'text-primary', 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50')} style={itemRadiusStyle}>
        <div className={(0, utils_1.cn)('flex min-w-0 flex-1 items-center', config_1.MENU_ITEM_STYLES.iconGap)}>
          <checkbox_1.CheckboxBase checked={checkboxItem.checked} size="sm"/>
          <span className="truncate">{checkboxItem.label}</span>
        </div>
      </menu_1.Menu.CheckboxItem>);
    }
    // Submenu trigger
    if (item.type === 'submenu') {
        return (<div onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmenuClick(item.id);
            }} className={(0, utils_1.cn)(baseItemStyles, 'text-primary font-medium', item.description && 'flex-col items-start py-2')} style={itemRadiusStyle} role="menuitem" aria-haspopup="menu" aria-expanded={false} tabIndex={-1} onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    onSubmenuClick(item.id);
                }
            }}>
        <div className={(0, utils_1.cn)('flex min-w-0 flex-1 items-center w-full', config_1.MENU_ITEM_STYLES.iconGap)}>
          {item.icon != null && (<icon_1.HugeIcon icon={item.icon} size={config_1.MENU_ITEM_STYLES.iconSize} strokeWidth={config_1.MENU_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(config_1.MENU_ITEM_STYLES.iconColor, config_1.MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}/>)}
          <div className="flex-1 min-w-0">
            <div className="truncate">{item.label}</div>
            {item.description && (<div className="text-xs font-normal text-tertiary mt-0.5 truncate">
                {item.description}
              </div>)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.activeCount !== undefined && item.activeCount > 0 && (<ActiveCountBadge count={item.activeCount}/>)}
            <icon_1.HugeIcon icon={ArrowRight01Icon_1.default} size={config_1.MENU_ITEM_STYLES.iconSize} strokeWidth={config_1.MENU_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(config_1.MENU_ITEM_STYLES.iconColor, config_1.MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}/>
          </div>
        </div>
      </div>);
    }
    // Action item
    return (<menu_1.Menu.Item disabled={item.disabled} closeOnClick onClick={() => {
            item.onClick?.();
            onSelect();
        }} className={(0, utils_1.cn)(baseItemStyles, 'text-primary', 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50')} style={itemRadiusStyle}>
      <div className={(0, utils_1.cn)('flex min-w-0 flex-1 items-center', config_1.MENU_ITEM_STYLES.iconGap)}>
        {item.icon && (<icon_1.HugeIcon icon={item.icon} size={config_1.MENU_ITEM_STYLES.iconSize} strokeWidth={config_1.MENU_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(config_1.MENU_ITEM_STYLES.iconColor, config_1.MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}/>)}
        <span className="truncate">{item.label}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {item.shortcut && (<span className="text-xs text-tertiary opacity-60 ml-3">
            {item.shortcut}
          </span>)}
        {item.selected && (<icon_1.HugeIcon icon={Tick02Icon_1.default} size={config_1.MENU_ITEM_STYLES.iconSize} strokeWidth={2.5} className="text-brand-solid shrink-0"/>)}
      </div>
    </menu_1.Menu.Item>);
};
exports.MenuItemComponent = MenuItemComponent;
exports.MenuItem = exports.MenuItemComponent;
exports.MenuItemComponent.displayName = 'MenuItem';
//# sourceMappingURL=menu-item.js.map