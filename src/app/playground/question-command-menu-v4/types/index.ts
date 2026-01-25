/**
 * Question Command Menu V4 - Type Re-exports
 *
 * Central export point for all types.
 */

// State types
export type {
  TriggerMode,
  ViewState,
  SaveStatus,
  TriggerFullState,
  TriggerAction,
  DerivedTriggerState,
} from './state'

// Flow types
export type {
  FlowState,
  FlowStateId,
  FlowSlotOverride,
  FlowButtonOverride,
  FlowStateConfig,
  FlowConfigs,
} from './flow'

export {
  getFlowStateId,
  isInputtingState,
  hasStoredContent,
} from './flow'

// Trigger types
export type {
  ButtonVisibility,
  TriggerButtonVariant,
  TriggerButtonType,
  TriggerButtonSize,
  TriggerButtonRoundness,
  TriggerButtonGroup,
  TriggerButtonConfig,
  TriggerButtonAction,
  TriggerConfig,
  TriggerDisplayConfig,
  UnifiedTriggerProps,
} from './trigger'

// Content types
export type {
  ContentTypeId,
  SlotPosition,
  ContentInstance,
  QuestionStatus,
  QuestionItem,
  QuestionGroup,
  QuestionItemConfig,
  QuestionsConfig,
  ActionButtonVariant,
  ActionButtonIcon,
  ButtonSize,
  ActionButtonConfig,
  ButtonsConfig,
  FilterOption,
  FiltersConfig,
  ChatMessage,
  ResponseActionId,
  ResponseAction,
  ChatConfig,
  SuggestionItem,
  SuggestionsConfig,
  ContentConfigs,
  BackgroundOption,
  BorderColorOption,
  ShineOption,
} from './content'

// Slot types
export type {
  HeightMode,
  ExpandOrigin,
  SlotAppearanceConfig,
  SlotAnimationConfig,
  SlotScrollConfig,
  UnifiedSlotConfig,
  SlotsConfig,
} from './slots'

export {
  DEFAULT_SLOT_APPEARANCE,
  DEFAULT_SLOT_ANIMATION,
  DEFAULT_SLOT_SCROLL,
  DEFAULT_TOP_SLOT,
  DEFAULT_BOTTOM_SLOT,
} from './slots'

// Config types
export type {
  BackdropAnimationMode,
  AnimationConfig,
  LayoutConfig,
  ShadowOption,
  GradientOption,
  GradientColorOption,
  AppearanceConfig,
  QuestionCommandMenuV4Config,
  QuestionCommandMenuV4Preset,
  PlaygroundState,
} from './config'
