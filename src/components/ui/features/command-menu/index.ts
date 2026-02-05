/**
 * Biaxial Expand
 *
 * @deprecated Import from '@/components/ui/core/primitives/biaxial-expand' instead.
 * Use `BiaxialExpand` (not `BiaxialExpandV4`) as the primary export.
 *
 * This file re-exports from the new location for backwards compatibility.
 */

// Re-export everything from the new biaxial-expand primitive
export {
  // Compound component
  BiaxialExpandV4,
  BiaxialExpand,

  // Individual components
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

  // Hooks
  useBiaxialExpand,
  useBiaxialExpandOptional,

  // Constants
  DEFAULT_BIAXIAL_EXPAND_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LAYOUT_CONFIG,
  SAMPLE_COMMANDS,
  EASING_EXPO_OUT,
} from '@/components/ui/core/primitives/biaxial-expand'

// Re-export types
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
  ActionButtonProps,
  FilterBarProps,
  FilterOption,
} from '@/components/ui/core/primitives/biaxial-expand'
