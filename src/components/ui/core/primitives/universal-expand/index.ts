/**
 * Universal Expand - Public API
 *
 * A 4-directional expandable component system that extends the BiaxialExpand
 * architecture to support top, bottom, left, and right expansion while
 * preserving the GPU-accelerated clip-path animation system.
 *
 * @example Basic usage (bottom-only)
 * ```tsx
 * import {
 *   UniversalExpandRoot,
 *   UniversalSlot,
 *   Backdrop,
 *   TriggerSlot,
 *   getBottomOnlyConfig,
 * } from '@/components/ui/core/primitives/universal-expand'
 *
 * function SearchMenu() {
 *   return (
 *     <UniversalExpandRoot config={getBottomOnlyConfig()}>
 *       <Backdrop />
 *       <TriggerSlot>
 *         <SearchInput />
 *       </TriggerSlot>
 *       <UniversalSlot position="bottom">
 *         <SearchResults />
 *       </UniversalSlot>
 *     </UniversalExpandRoot>
 *   )
 * }
 * ```
 *
 * @example Multi-directional expansion
 * ```tsx
 * <UniversalExpandRoot config={getQuadExpansionConfig()}>
 *   <Backdrop />
 *   <TriggerSlot><Button>Open</Button></TriggerSlot>
 *   <UniversalSlot position="top"><Filters /></UniversalSlot>
 *   <UniversalSlot position="bottom"><Results /></UniversalSlot>
 *   <UniversalSlot position="left"><Sidebar /></UniversalSlot>
 *   <UniversalSlot position="right"><Details /></UniversalSlot>
 * </UniversalExpandRoot>
 * ```
 */

// ============================================================================
// COMPONENTS
// ============================================================================

export { UniversalExpandRoot } from './universal-expand-root'
export {
  Backdrop,
  ContentLayer,
  TriggerSlot,
  UniversalSlot,
} from './components'

// ============================================================================
// CONTEXT & HOOKS
// ============================================================================

export {
  useUniversalExpand,
  useUniversalExpandOptional,
} from './context'

export {
  useSlotDimension,
  calculateSlotDimension,
  calculateListContentHeight,
  calculateHorizontalContentWidth,
} from './hooks'

// ============================================================================
// UTILITIES
// ============================================================================

export {
  getSlotClipPath,
  getDefaultExpandOrigin,
  getSectionClipPath,
  getBackdropClipPath,
  getContentClipPath,
  calculateTotalDimensions,
  getSlotPositionStyles,
  getInnerContainerStyles,
  getAutoSizeStyles,
  getBackdropDimensions,
  getCollapsedBackdropDimensions,
  getBackgroundClass,
  getBorderColorVar,
  deepMerge,
} from './utils'

// ============================================================================
// CONSTANTS
// ============================================================================

export {
  EASING_EXPO_OUT,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_GAP_CONFIG,
  DEFAULT_LAYOUT_CONFIG,
  DEFAULT_SLOT_APPEARANCE,
  DEFAULT_SLOT_ANIMATION,
  DEFAULT_SLOT_SCROLL,
  DEFAULT_TOP_SLOT,
  DEFAULT_BOTTOM_SLOT,
  DEFAULT_LEFT_SLOT,
  DEFAULT_RIGHT_SLOT,
  DEFAULT_SLOTS_CONFIG,
  DEFAULT_TRIGGER_SLOT_CONFIG,
  DEFAULT_UNIVERSAL_EXPAND_CONFIG,
} from './constants'

// ============================================================================
// PRESETS
// ============================================================================

export {
  // Bottom-only
  BOTTOM_ONLY_PRESET,
  getBottomOnlyConfig,
  // Vertical bidirectional
  VERTICAL_BIDIRECTIONAL_PRESET,
  getVerticalBidirectionalConfig,
  CHAT_INTERFACE_PRESET,
  getChatInterfaceConfig,
  // Side panels
  RIGHT_PANEL_PRESET,
  getRightPanelConfig,
  LEFT_PANEL_PRESET,
  getLeftPanelConfig,
  HORIZONTAL_BIDIRECTIONAL_PRESET,
  getHorizontalBidirectionalConfig,
  // Multi-directional
  L_SHAPED_TOP_RIGHT_PRESET,
  getLShapedTopRightConfig,
  L_SHAPED_BOTTOM_LEFT_PRESET,
  getLShapedBottomLeftConfig,
  T_SHAPED_PRESET,
  getTShapedConfig,
  QUAD_EXPANSION_PRESET,
  getQuadExpansionConfig,
} from './presets'

// ============================================================================
// COMPATIBILITY
// ============================================================================

export {
  convertBiaxialConfig,
  fromBiaxialConfig,
} from './compat'

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Slot positions
  ExtendedSlotPosition,
  SlotPosition,
  Axis,
  // Background & appearance
  BackgroundOption,
  BorderColorOption,
  ShineOption,
  // Dimension types
  DimensionMode,
  ExpandOrigin,
  LegacyExpandOrigin,
  SlotDimensions,
  GapConfig,
  // Slot configuration
  SlotAppearance,
  SlotAnimation,
  SlotScroll,
  UnifiedSlotConfig,
  SlotsConfig,
  // Animation
  BackdropAnimationMode,
  AnimationConfig,
  // Layout
  LayoutConfig,
  TriggerSlotConfig,
  // Root config
  UniversalExpandConfig,
  // Context
  UniversalExpandContextValue,
  // Component props
  UniversalExpandRootProps,
  UniversalSlotProps,
  BackdropProps,
  TriggerSlotProps,
  ContentLayerProps,
} from './types'

// Re-export type helpers
export {
  SLOT_AXIS_MAP,
  getSlotAxis,
  isVerticalSlot,
  isHorizontalSlot,
} from './types'
