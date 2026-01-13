"use strict";
/**
 * Select - Public Exports
 *
 * Dropdown select component styled to match the Menu component.
 * Built on Base UI Select primitive for accessibility.
 *
 * @module prod/base/select
 *
 * @example Basic Usage
 * ```tsx
 * import { Select } from '@/components/ui/prod/base/select'
 *
 * <Select
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *     { value: 'cherry', label: 'Cherry' },
 *   ]}
 *   placeholder="Select a fruit"
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example With Groups
 * ```tsx
 * <Select
 *   options={[
 *     {
 *       type: 'group',
 *       label: 'Fruits',
 *       options: [
 *         { value: 'apple', label: 'Apple' },
 *         { value: 'banana', label: 'Banana' },
 *       ],
 *     },
 *     { type: 'separator', id: 'sep-1' },
 *     {
 *       type: 'group',
 *       label: 'Vegetables',
 *       options: [
 *         { value: 'carrot', label: 'Carrot' },
 *         { value: 'broccoli', label: 'Broccoli' },
 *       ],
 *     },
 *   ]}
 *   placeholder="Select food"
 * />
 * ```
 *
 * @example With Icons
 * ```tsx
 * import Apple01Icon from '@hugeicons-pro/core-stroke-rounded/Apple01Icon'
 *
 * <Select
 *   options={[
 *     { value: 'apple', label: 'Apple', icon: Apple01Icon },
 *   ]}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKGROUND_CLASSES = exports.SHADOW_CLASSES = exports.BORDER_RADIUS_CLASSES = exports.getRevealAnimationClasses = exports.getSeparatorClasses = exports.getItemRadius = exports.getGradientStyles = exports.getPopupClasses = exports.INTERACTIVE_STATES = exports.SEPARATOR_STYLES = exports.SELECT_ITEM_STYLES = exports.EASING_EXPO_OUT = exports.Z_INDEX = exports.USE_LEGACY_ANIMATION = exports.REVEAL_ANIMATION_CLASSES = exports.REVEAL_ANIMATION = exports.DEFAULT_SIDE_OFFSET = exports.DEFAULT_POPUP_WIDTH = exports.DEFAULT_SELECT_WIDTH = exports.DEFAULT_APPEARANCE = exports.Select = void 0;
// ============================================================================
// Components
// ============================================================================
var select_1 = require("./select");
Object.defineProperty(exports, "Select", { enumerable: true, get: function () { return select_1.Select; } });
// ============================================================================
// Configuration
// ============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "DEFAULT_APPEARANCE", { enumerable: true, get: function () { return config_1.DEFAULT_APPEARANCE; } });
Object.defineProperty(exports, "DEFAULT_SELECT_WIDTH", { enumerable: true, get: function () { return config_1.DEFAULT_SELECT_WIDTH; } });
Object.defineProperty(exports, "DEFAULT_POPUP_WIDTH", { enumerable: true, get: function () { return config_1.DEFAULT_POPUP_WIDTH; } });
Object.defineProperty(exports, "DEFAULT_SIDE_OFFSET", { enumerable: true, get: function () { return config_1.DEFAULT_SIDE_OFFSET; } });
Object.defineProperty(exports, "REVEAL_ANIMATION", { enumerable: true, get: function () { return config_1.REVEAL_ANIMATION; } });
Object.defineProperty(exports, "REVEAL_ANIMATION_CLASSES", { enumerable: true, get: function () { return config_1.REVEAL_ANIMATION_CLASSES; } });
Object.defineProperty(exports, "USE_LEGACY_ANIMATION", { enumerable: true, get: function () { return config_1.USE_LEGACY_ANIMATION; } });
Object.defineProperty(exports, "Z_INDEX", { enumerable: true, get: function () { return config_1.Z_INDEX; } });
Object.defineProperty(exports, "EASING_EXPO_OUT", { enumerable: true, get: function () { return config_1.EASING_EXPO_OUT; } });
Object.defineProperty(exports, "SELECT_ITEM_STYLES", { enumerable: true, get: function () { return config_1.SELECT_ITEM_STYLES; } });
Object.defineProperty(exports, "SEPARATOR_STYLES", { enumerable: true, get: function () { return config_1.SEPARATOR_STYLES; } });
Object.defineProperty(exports, "INTERACTIVE_STATES", { enumerable: true, get: function () { return config_1.INTERACTIVE_STATES; } });
Object.defineProperty(exports, "getPopupClasses", { enumerable: true, get: function () { return config_1.getPopupClasses; } });
Object.defineProperty(exports, "getGradientStyles", { enumerable: true, get: function () { return config_1.getGradientStyles; } });
Object.defineProperty(exports, "getItemRadius", { enumerable: true, get: function () { return config_1.getItemRadius; } });
Object.defineProperty(exports, "getSeparatorClasses", { enumerable: true, get: function () { return config_1.getSeparatorClasses; } });
Object.defineProperty(exports, "getRevealAnimationClasses", { enumerable: true, get: function () { return config_1.getRevealAnimationClasses; } });
Object.defineProperty(exports, "BORDER_RADIUS_CLASSES", { enumerable: true, get: function () { return config_1.BORDER_RADIUS_CLASSES; } });
Object.defineProperty(exports, "SHADOW_CLASSES", { enumerable: true, get: function () { return config_1.SHADOW_CLASSES; } });
Object.defineProperty(exports, "BACKGROUND_CLASSES", { enumerable: true, get: function () { return config_1.BACKGROUND_CLASSES; } });
//# sourceMappingURL=index.js.map