/**
 * Biaxial Expand V4
 *
 * A composable, slot-based expand system with unified clip-path animations.
 * Matches V3's smooth reveal behavior while enabling flexible slot composition.
 *
 * ARCHITECTURE: Unified Model
 * - Trigger lives INSIDE Content for proper clip-path reveal
 * - Backdrop provides visual styling (background, shadow, shine)
 * - TopSlot expands upward (separate from main content)
 *
 * @example Basic usage with search input
 * ```tsx
 * <BiaxialExpandV4.Root>
 *   <BiaxialExpandV4.Backdrop />
 *
 *   <BiaxialExpandV4.Content>
 *     <BiaxialExpandV4.Trigger>
 *       <BiaxialExpandV4.SearchInput placeholder="Search..." />
 *     </BiaxialExpandV4.Trigger>
 *
 *     <BiaxialExpandV4.ContentWrapper>
 *       <BiaxialExpandV4.BottomSlot>
 *         <BiaxialExpandV4.MenuContent groups={groups} />
 *       </BiaxialExpandV4.BottomSlot>
 *     </BiaxialExpandV4.ContentWrapper>
 *   </BiaxialExpandV4.Content>
 * </BiaxialExpandV4.Root>
 * ```
 *
 * @example With top section
 * ```tsx
 * <BiaxialExpandV4.Root>
 *   <BiaxialExpandV4.TopSlot>
 *     <BiaxialExpandV4.FilterBar />
 *   </BiaxialExpandV4.TopSlot>
 *
 *   <BiaxialExpandV4.Backdrop />
 *
 *   <BiaxialExpandV4.Content>
 *     <BiaxialExpandV4.Trigger>
 *       <BiaxialExpandV4.SearchInput placeholder="Search..." />
 *     </BiaxialExpandV4.Trigger>
 *
 *     <BiaxialExpandV4.ContentWrapper>
 *       <BiaxialExpandV4.BottomSlot>
 *         <BiaxialExpandV4.MenuContent groups={groups} />
 *       </BiaxialExpandV4.BottomSlot>
 *     </BiaxialExpandV4.ContentWrapper>
 *   </BiaxialExpandV4.Content>
 * </BiaxialExpandV4.Root>
 * ```
 */

// Core components
import { BiaxialExpandRoot } from './core/biaxial-expand-root'
import {
  TopSlot,
  TriggerSlot,
  BottomSlot,
  Backdrop,
  ContentLayer,
  ContentWrapper,
} from './core/components'

// Variants
import {
  SearchInput,
  ActionButton,
  FilterBar,
  MenuContent,
} from './variants'

// Export compound component
export const BiaxialExpandV4 = {
  // Core
  Root: BiaxialExpandRoot,
  TopSlot,
  Trigger: TriggerSlot,
  BottomSlot,
  Backdrop,
  Content: ContentLayer,
  ContentWrapper,

  // Built-in variants
  SearchInput,
  ActionButton,
  FilterBar,
  MenuContent,
}

// Export individual components for tree-shaking
export {
  BiaxialExpandRoot,
  TopSlot,
  TriggerSlot,
  BottomSlot,
  Backdrop,
  ContentLayer,
  ContentWrapper,
  SearchInput,
  ActionButton,
  FilterBar,
  MenuContent,
}

// Export hooks
export { useBiaxialExpand, useBiaxialExpandOptional } from './core/context'

// Export types
export type {
  BiaxialExpandConfig,
  BiaxialExpandRootProps,
  BiaxialExpandContextValue,
  SlotProps,
  SlotConfig,
  SlotPosition,
  SlotDimensions,
  AnimationConfig,
  LayoutConfig,
  BackgroundOption,
  BorderColorOption,
  BackdropAnimationMode,
  ExpandOrigin,
  SearchInputProps,
  MenuContentProps,
  CommandGroup,
  CommandItem,
  CommandItemAction,
  CommandItemSeparator,
  CommandItemBase,
} from './core/types'

// Export constants
export {
  DEFAULT_BIAXIAL_EXPAND_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LAYOUT_CONFIG,
  SAMPLE_COMMANDS,
  EASING_EXPO_OUT,
} from './core/constants'

// Export variant types
export type { ActionButtonProps, FilterBarProps, FilterOption } from './variants'
