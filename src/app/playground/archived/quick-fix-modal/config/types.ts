/**
 * Quick Fix Modal - Configuration Types
 *
 * Types for the modal flow framework with clip-path transitions,
 * sheet stack navigation, and island/toast integration.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix-modal
 */

import type {
  QuickFixInteractionsConfig,
} from '../../quick-fix-interactions/config/types'

// Local type definitions (since they don't exist in quick-fix-interactions)
export type FlowId = 'quick-fix' | 'add-to-mind' | 'manual-fix'
export type SolutionId = string

export interface FlowDefinition {
  id: FlowId
  enabled?: boolean
  label?: string
  title?: string
  description: string
  icon?: string
  variant?: string
}

export interface FlowRegistry {
  flows?: FlowDefinition[]
  defaultFlow?: FlowId | null
  [key: string]: any
}

export interface IntegrationConfig {
  mode: 'modal' | 'inline'
  showHeader: boolean
  showBackButton: boolean
  showCloseButton?: boolean
  headerTitle?: string
  showStepIndicator?: boolean
  onCompleteAction?: 'close' | 'reset' | 'navigate' | 'toast'
  onClose?: () => void
}

// =============================================================================
// MODAL CONFIGURATION
// =============================================================================

export interface ModalConfig {
  // Sizing
  maxWidth: number
  maxHeight: number
  borderRadius: number
  padding: number

  // Background & effects
  background: 'primary' | 'secondary' | 'tertiary'
  shine: string // none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
  shineIntensity: string // (empty) | -subtle | -intense
  cornerShape: 'round' | 'squircle'
  goldBorder: boolean

  // Backdrop
  backdropOpacity: number
  backdropBlur: number
}

// =============================================================================
// SHEET STACK CONFIGURATION
// =============================================================================

export interface StackConfig {
  // Depth appearance
  depthScale: number // 0.95 = each sheet 5% smaller
  depthOffset: number // -16px vertical offset
  depthOpacity: number // 0.8 = 80% opacity for stacked sheets
  maxVisibleSheets: number

  // Stack animation
  pushDirection: 'up' | 'down' | 'left' | 'right'
  popDirection: 'up' | 'down' | 'left' | 'right'
}

// =============================================================================
// ANIMATION CONFIGURATION
// =============================================================================

export interface AnimationConfig {
  // Clip-path reveal
  clipRevealDuration: number // 300ms
  clipRevealDelay: number // 0ms

  // Sheet transitions
  sheetTransition: number // 350ms
  pushDuration: number
  popDuration: number

  // Timing
  easing: string // cubic-bezier(0.16, 1, 0.3, 1) - expo out
  staggerDelay: number // Delay between staggered animations
}

// =============================================================================
// SHEET DEFINITION
// =============================================================================

export interface SheetDefinition {
  id: string
  title: string
  component: React.ComponentType<SheetContentProps>
  componentProps?: Record<string, unknown>
  canPop?: boolean // Whether back button is shown
}

export interface SheetContentProps {
  onNavigate: (sheetId: string, props?: Record<string, unknown>) => void
  onComplete: () => void
  onClose: () => void
  config: QuickFixModalConfig
}

// =============================================================================
// SHEET STACK STATE
// =============================================================================

export interface SheetStackState {
  sheets: SheetDefinition[]
  currentIndex: number
  isAnimating: boolean
  direction: 'push' | 'pop' | null
}

export type SheetStackAction =
  | { type: 'PUSH'; sheet: SheetDefinition }
  | { type: 'POP' }
  | { type: 'RESET'; initialSheet: SheetDefinition }
  | { type: 'SET_ANIMATING'; isAnimating: boolean }
  | { type: 'NAVIGATE_TO'; sheetId: string; props?: Record<string, unknown> }

// =============================================================================
// COMBINED MODAL CONFIGURATION
// =============================================================================

export interface QuickFixModalConfig {
  // Base config from QuickFixInteractionsConfig
  previewMode: 'full-flow' | 'card-stack' | 'flow-selector' | 'completion' | 'island' | 'toast'
  modalPreviewMode: 'full-flow' | 'sheet-stack' | 'island' | 'toast' | 'clip-path'
  
  // Component configurations from base
  card: any
  swipe: any
  actionButtons: any
  progress: any
  flowOptions: any
  completion: any
  island: any
  toast: any
  
  // Modal-specific config
  modal: ModalConfig
  stack: StackConfig
  animation: AnimationConfig
}

// =============================================================================
// MODAL SOLUTION PRESET
// =============================================================================

export interface ModalSolutionPreset {
  id: string
  name: string
  solution: SolutionId
  description: string
  config: QuickFixModalConfig
  flowRegistry: FlowRegistry
  integration: IntegrationConfig
}

// =============================================================================
// FLOW SHEET MAPPING
// =============================================================================

/**
 * Maps flow IDs to their corresponding sheet configurations.
 * Used by FlowSelectorSheet to navigate to the correct flow.
 */
export interface FlowSheetMapping {
  flowId: FlowId
  sheetId: string
  title: string
  component: React.ComponentType<SheetContentProps>
}

// =============================================================================
// MODAL CONTEXT
// =============================================================================

export interface QuickFixModalContextValue {
  // State
  isOpen: boolean
  config: QuickFixModalConfig

  // Sheet stack
  stackState: SheetStackState
  pushSheet: (sheet: SheetDefinition) => void
  popSheet: () => void
  resetStack: (initialSheet: SheetDefinition) => void
  navigateToFlow: (flowId: FlowId, props?: Record<string, unknown>) => void

  // Actions
  openModal: () => void
  closeModal: () => void
  onComplete: () => void

  // Integration data (for Solution B)
  categoryName?: string
  setCategoryName?: (name: string) => void
}

// =============================================================================
// PRESET METADATA
// =============================================================================

export interface QuickFixModalPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'premium' | 'edit-questions' | 'profile'
  data: QuickFixModalConfig
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

// Note: FlowDefinition, FlowId, FlowRegistry, IntegrationConfig, and SolutionId
// are defined locally in this file since they don't exist in quick-fix-interactions
