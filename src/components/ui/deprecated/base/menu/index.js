"use strict";
/**
 * Base UI Menu - Animated Menu Component
 *
 * A feature-rich menu component with nested submenu support, smooth animations,
 * and GPU-accelerated transitions. Built on Base UI primitives for accessibility.
 *
 * @module base-ui/menu
 *
 * @example Basic usage with icon trigger
 * ```tsx
 * import { RevealMenu } from '@/modules/design-system/v2/components/ui/base-ui/menu'
 * import MoreHorizontalIcon from '@hugeicons-pro/core-stroke-rounded/MoreHorizontalCircle01Icon'
 *
 * <RevealMenu
 *   trigger={{ icon: MoreHorizontalIcon }}
 *   items={[
 *     { id: 'edit', label: 'Edit', onClick: () => {} },
 *     { id: 'delete', label: 'Delete', onClick: () => {}, className: 'text-error-primary' },
 *   ]}
 * />
 * ```
 *
 * @example With nested submenus
 * ```tsx
 * <RevealMenu
 *   trigger={{ icon: MoreHorizontalIcon }}
 *   items={[
 *     {
 *       id: 'actions',
 *       type: 'submenu',
 *       label: 'Actions',
 *       items: [
 *         { id: 'edit', label: 'Edit', onClick: () => {} },
 *         { id: 'duplicate', label: 'Duplicate', onClick: () => {} },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateItemRadius = exports.PADDING_PX = exports.BORDER_RADIUS_PX = exports.getAppearanceStyle = exports.getAppearanceClasses = exports.BACKGROUND_COLOR_CSS_VAR_MAP = exports.APPEARANCE_CLASS_MAP = exports.DEFAULT_APPEARANCE = exports.TRANSFORM_ORIGINS = exports.getTransformOrigin = exports.ICON_SIZES = exports.ITEM_HEIGHT_CLASSES = exports.HEIGHT_TRANSITION_PRESETS = exports.EASING_PRESETS = exports.DEFAULT_MENU_PROPS = exports.DEFAULT_SLIDE_TRANSITION = exports.DEFAULT_HEIGHT_TRANSITION = exports.DEFAULT_REVEAL_CONFIG = exports.useRevealAnimation = exports.useMenuNavigation = exports.BackButton = exports.MenuItemComponent = exports.IconTrigger = exports.BaseUIMenu = exports.RevealMenu = void 0;
// =============================================================================
// COMPONENTS
// =============================================================================
var reveal_menu_1 = require("./reveal-menu");
Object.defineProperty(exports, "RevealMenu", { enumerable: true, get: function () { return reveal_menu_1.RevealMenu; } });
var base_ui_menu_1 = require("./base-ui-menu");
Object.defineProperty(exports, "BaseUIMenu", { enumerable: true, get: function () { return base_ui_menu_1.BaseUIMenu; } });
// Sub-components
var components_1 = require("./components");
Object.defineProperty(exports, "IconTrigger", { enumerable: true, get: function () { return components_1.IconTrigger; } });
Object.defineProperty(exports, "MenuItemComponent", { enumerable: true, get: function () { return components_1.MenuItemComponent; } });
Object.defineProperty(exports, "BackButton", { enumerable: true, get: function () { return components_1.BackButton; } });
// =============================================================================
// HOOKS
// =============================================================================
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "useMenuNavigation", { enumerable: true, get: function () { return hooks_1.useMenuNavigation; } });
Object.defineProperty(exports, "useRevealAnimation", { enumerable: true, get: function () { return hooks_1.useRevealAnimation; } });
// =============================================================================
// CONFIGURATION
// =============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "DEFAULT_REVEAL_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_REVEAL_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_HEIGHT_TRANSITION", { enumerable: true, get: function () { return config_1.DEFAULT_HEIGHT_TRANSITION; } });
Object.defineProperty(exports, "DEFAULT_SLIDE_TRANSITION", { enumerable: true, get: function () { return config_1.DEFAULT_SLIDE_TRANSITION; } });
Object.defineProperty(exports, "DEFAULT_MENU_PROPS", { enumerable: true, get: function () { return config_1.DEFAULT_MENU_PROPS; } });
Object.defineProperty(exports, "EASING_PRESETS", { enumerable: true, get: function () { return config_1.EASING_PRESETS; } });
Object.defineProperty(exports, "HEIGHT_TRANSITION_PRESETS", { enumerable: true, get: function () { return config_1.HEIGHT_TRANSITION_PRESETS; } });
Object.defineProperty(exports, "ITEM_HEIGHT_CLASSES", { enumerable: true, get: function () { return config_1.ITEM_HEIGHT_CLASSES; } });
Object.defineProperty(exports, "ICON_SIZES", { enumerable: true, get: function () { return config_1.ICON_SIZES; } });
Object.defineProperty(exports, "getTransformOrigin", { enumerable: true, get: function () { return config_1.getTransformOrigin; } });
Object.defineProperty(exports, "TRANSFORM_ORIGINS", { enumerable: true, get: function () { return config_1.TRANSFORM_ORIGINS; } });
// Appearance configuration
Object.defineProperty(exports, "DEFAULT_APPEARANCE", { enumerable: true, get: function () { return config_1.DEFAULT_APPEARANCE; } });
Object.defineProperty(exports, "APPEARANCE_CLASS_MAP", { enumerable: true, get: function () { return config_1.APPEARANCE_CLASS_MAP; } });
Object.defineProperty(exports, "BACKGROUND_COLOR_CSS_VAR_MAP", { enumerable: true, get: function () { return config_1.BACKGROUND_COLOR_CSS_VAR_MAP; } });
Object.defineProperty(exports, "getAppearanceClasses", { enumerable: true, get: function () { return config_1.getAppearanceClasses; } });
Object.defineProperty(exports, "getAppearanceStyle", { enumerable: true, get: function () { return config_1.getAppearanceStyle; } });
// Dynamic border radius
Object.defineProperty(exports, "BORDER_RADIUS_PX", { enumerable: true, get: function () { return config_1.BORDER_RADIUS_PX; } });
Object.defineProperty(exports, "PADDING_PX", { enumerable: true, get: function () { return config_1.PADDING_PX; } });
Object.defineProperty(exports, "calculateItemRadius", { enumerable: true, get: function () { return config_1.calculateItemRadius; } });
//# sourceMappingURL=index.js.map