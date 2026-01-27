/**
 * Expandable Input
 *
 * A comprehensive, production-ready expandable input system built on the
 * BiaxialExpand primitive. Features a configurable trigger with multiple modes,
 * flexible slot system for content, and a complete state management solution.
 *
 * @example Basic usage
 * ```tsx
 * import { ExpandableInputProvider, useExpandableInput } from '@/components/ui/features/expandable-input'
 * import { DEFAULT_CONFIG } from '@/components/ui/features/expandable-input/config'
 *
 * function MyComponent() {
 *   return (
 *     <ExpandableInputProvider config={DEFAULT_CONFIG}>
 *       <ExpandableInputUI />
 *     </ExpandableInputProvider>
 *   )
 * }
 * ```
 */

// =============================================================================
// TYPES
// =============================================================================

export * from './types'

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

export {
  // Provider & hooks
  ExpandableInputProvider,
  V4Provider, // alias for backwards compatibility
  useExpandableInput,
  useV4Context, // alias for backwards compatibility

  // Reducer
  expandableInputReducer,
  triggerReducer, // alias for backwards compatibility
  actions,

  // Initial state
  INITIAL_STATE,
  createInputModeState,
  createQuestionModeState,
  createDisplayModeState,
} from './state'

export type {
  ExpandableInputContextValue,
  V4ContextValue, // alias for backwards compatibility
} from './state'

// =============================================================================
// CONFIG
// =============================================================================

export {
  DEFAULT_CONFIG,
  DEFAULT_PRESET,
  COMMON_BUTTONS,
} from './config'

// =============================================================================
// UTILS
// =============================================================================

export {
  deepMerge,
  createPreset,
} from './utils'

// =============================================================================
// RE-EXPORT PRIMITIVE
// =============================================================================

// Re-export the BiaxialExpand primitive for convenience
export {
  BiaxialExpand,
  BiaxialExpandV4, // alias for backwards compatibility
  useBiaxialExpand,
} from '@/components/ui/core/primitives/biaxial-expand'
