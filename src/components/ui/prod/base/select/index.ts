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

// ============================================================================
// Components
// ============================================================================

export { Select } from './select'

// ============================================================================
// Types
// ============================================================================

export type {
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectSeparator,
  SelectItem,
  SelectSide,
  SelectAlign,
  SelectAppearance,
  IconType,
  BorderRadius,
  Shadow,
  ShineVariant,
  Background,
  GradientPattern,
  GradientColor,
} from './types'

// ============================================================================
// Configuration
// ============================================================================

export {
  DEFAULT_APPEARANCE,
  DEFAULT_SELECT_WIDTH,
  DEFAULT_POPUP_WIDTH,
  DEFAULT_SIDE_OFFSET,
  REVEAL_ANIMATION,
  REVEAL_ANIMATION_CLASSES,
  USE_LEGACY_ANIMATION,
  Z_INDEX,
  EASING_EXPO_OUT,
  SELECT_ITEM_STYLES,
  SEPARATOR_STYLES,
  INTERACTIVE_STATES,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  getSeparatorClasses,
  getRevealAnimationClasses,
  BORDER_RADIUS_CLASSES,
  SHADOW_CLASSES,
  BACKGROUND_CLASSES,
} from './config'
