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

// Select-specific types (shared types are available from @/components/ui/core/primitives/menu)
export type {
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectSeparator,
  SelectItem,
  SelectSide,
  SelectAlign,
  SelectAppearance,
} from './types'

// ============================================================================
// Configuration
// ============================================================================

// Select-specific config exports (shared styles are available from @/components/ui/core/primitives/menu)
export {
  DEFAULT_SELECT_WIDTH,
  DEFAULT_POPUP_WIDTH,
  SELECT_ITEM_STYLES,
} from './config'
