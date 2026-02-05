/**
 * Horizontal Expand V1 - Main Export
 *
 * A composable horizontal expand system where containers can expand
 * left and right using clip-path animations.
 *
 * Usage:
 * ```tsx
 * import { HorizontalExpandV1 } from '@/components/ui/features/experimental/horizontal-expand-v1'
 *
 * <HorizontalExpandV1.Root
 *   expanded={isExpanded}
 *   onExpandedChange={setIsExpanded}
 *   config={{
 *     layout: { triggerWidth: 64, triggerHeight: 64 },
 *     leftSlot: { enabled: true, width: 80 },
 *     rightSlot: { enabled: true, width: 80 },
 *   }}
 * >
 *   <HorizontalExpandV1.LeftSlot>
 *     <div>Left Content</div>
 *   </HorizontalExpandV1.LeftSlot>
 *   <HorizontalExpandV1.TriggerSlot>
 *     <div>Trigger</div>
 *   </HorizontalExpandV1.TriggerSlot>
 *   <HorizontalExpandV1.RightSlot>
 *     <div>Right Content</div>
 *   </HorizontalExpandV1.RightSlot>
 * </HorizontalExpandV1.Root>
 * ```
 */

export { HorizontalExpandV1 } from './horizontal-expand-root'
export { useHorizontalExpand } from './context'
export {
  DEFAULT_HORIZONTAL_EXPAND_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LAYOUT_CONFIG,
  DEFAULT_LEFT_SLOT_CONFIG,
  DEFAULT_RIGHT_SLOT_CONFIG,
  DEFAULT_TRIGGER_SLOT_CONFIG,
  EASING_EXPO_OUT,
} from './constants'
export type {
  HorizontalExpandConfig,
  HorizontalExpandRootProps,
  HorizontalExpandContextValue,
  HorizontalExpandOrigin,
  SlotPosition,
  SlotConfig,
  SlotProps,
  SlotDimensions,
  LayoutConfig,
  AnimationConfig,
  BackdropProps,
  BackgroundOption,
  BorderColorOption,
} from './types'
