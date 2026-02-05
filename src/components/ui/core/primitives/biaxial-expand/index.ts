/**
 * Biaxial Expand
 *
 * A composable, slot-based expand system with unified clip-path animations.
 *
 * ARCHITECTURE: Unified Model
 * - Trigger lives INSIDE Content for proper clip-path reveal
 * - Backdrop provides visual styling (background, shadow, shine)
 * - TopSlot expands upward (separate from main content)
 *
 * @example Basic usage with search input
 * ```tsx
 * <BiaxialExpand.Root>
 *   <BiaxialExpand.Backdrop />
 *
 *   <BiaxialExpand.Content>
 *     <BiaxialExpand.Trigger>
 *       <BiaxialExpand.SearchInput placeholder="Search..." />
 *     </BiaxialExpand.Trigger>
 *
 *     <BiaxialExpand.ContentWrapper>
 *       <BiaxialExpand.BottomSlot>
 *         <BiaxialExpand.MenuContent groups={groups} />
 *       </BiaxialExpand.BottomSlot>
 *     </BiaxialExpand.ContentWrapper>
 *   </BiaxialExpand.Content>
 * </BiaxialExpand.Root>
 * ```
 *
 * @example With top section
 * ```tsx
 * <BiaxialExpand.Root>
 *   <BiaxialExpand.TopSlot>
 *     <BiaxialExpand.FilterBar />
 *   </BiaxialExpand.TopSlot>
 *
 *   <BiaxialExpand.Backdrop />
 *
 *   <BiaxialExpand.Content>
 *     <BiaxialExpand.Trigger>
 *       <BiaxialExpand.SearchInput placeholder="Search..." />
 *     </BiaxialExpand.Trigger>
 *
 *     <BiaxialExpand.ContentWrapper>
 *       <BiaxialExpand.BottomSlot>
 *         <BiaxialExpand.MenuContent groups={groups} />
 *       </BiaxialExpand.BottomSlot>
 *     </BiaxialExpand.ContentWrapper>
 *   </BiaxialExpand.Content>
 * </BiaxialExpand.Root>
 * ```
 */

// Core components
import { BiaxialExpandRoot } from './biaxial-expand-root'
import {
  TopSlot,
  TriggerSlot,
  BottomSlot,
  LeftSlot,
  RightSlot,
  Backdrop,
  ContentLayer,
  ContentWrapper,
} from './components'

// Variants
import {
  SearchInput,
  ActionButton,
  FilterBar,
  MenuContent,
} from './variants'

// Export compound component
export const BiaxialExpand = {
  // Core
  Root: BiaxialExpandRoot,
  TopSlot,
  Trigger: TriggerSlot,
  BottomSlot,
  LeftSlot,
  RightSlot,
  Backdrop,
  Content: ContentLayer,
  ContentWrapper,

  // Built-in variants
  SearchInput,
  ActionButton,
  FilterBar,
  MenuContent,
}

/**
 * @deprecated Use `BiaxialExpand` instead. This alias will be removed in a future version.
 * The V4 suffix is no longer needed as BiaxialExpand is now the primary export.
 */
export const BiaxialExpandV4 = BiaxialExpand

// Export individual components for tree-shaking
export {
  BiaxialExpandRoot,
  TopSlot,
  TriggerSlot,
  BottomSlot,
  LeftSlot,
  RightSlot,
  Backdrop,
  ContentLayer,
  ContentWrapper,
  SearchInput,
  ActionButton,
  FilterBar,
  MenuContent,
}

// Export hooks
export { useBiaxialExpand, useBiaxialExpandOptional } from './context'

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
  ExpandOriginX,
  PositionMode,
  SearchInputProps,
  MenuContentProps,
  CommandGroup,
  CommandItem,
  CommandItemAction,
  CommandItemSeparator,
  CommandItemBase,
} from './types'

// Export constants
export {
  DEFAULT_BIAXIAL_EXPAND_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LAYOUT_CONFIG,
  SAMPLE_COMMANDS,
  EASING_EXPO_OUT,
} from './constants'

// Export variant types
export type { ActionButtonProps, FilterBarProps, FilterOption } from './variants'
