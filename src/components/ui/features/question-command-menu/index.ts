/**
 * Question Command Menu
 *
 * A configurable command menu component for question/answer workflows.
 * Supports multiple modes: input, question, display with customizable slots and content.
 */

// Types (primary source for all type definitions)
export * from './types'

// State management
export * from './state'

// Components (named exports to avoid type conflicts)
export {
  TriggerDisplay,
  ActionButton,
  TriggerInput,
  UnifiedTrigger,
  UniversalSlot,
  ContentRenderer,
  Preview,
} from './components'

// Content components
export * from './content'

// Hooks
export * from './hooks'

// Presets
export * from './presets'

// Data
export * from './data'

// Config options
export * from './config/options'

// Flow module (sub-export)
export * as flow from './flow'
