/**
 * Question Command Menu V4 - State Re-exports
 *
 * @deprecated Import from '@/components/ui/features/expandable-input' instead
 */

// Re-export from new expandable-input package for backwards compatibility
export {
  // State management
  V4Provider,
  useV4Context,
  triggerReducer,
  actions,
  INITIAL_STATE,
  createInputModeState,
  createQuestionModeState,
  createDisplayModeState,
} from '@/components/ui/features/expandable-input'

export type { V4ContextValue } from '@/components/ui/features/expandable-input'
