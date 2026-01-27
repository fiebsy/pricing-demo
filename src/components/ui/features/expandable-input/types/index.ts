/**
 * Expandable Input - Type Re-exports
 *
 * Central export point for all types.
 */

// State types (merged with flow types)
export type {
  TriggerMode,
  ViewState,
  SaveStatus,
  ExpandableInputState,
  TriggerFullState, // alias
  ExpandableInputAction,
  TriggerAction, // alias
  DerivedExpandableInputState,
  DerivedTriggerState, // alias
  // Flow types
  FlowState,
  FlowStateId,
  FlowSlotOverride,
  FlowButtonOverride,
  FlowTriggerButtonOverride,
  FlowStateConfig,
  FlowConfigs,
} from './state'

export {
  getFlowStateId,
  isInputtingState,
  hasStoredContent,
} from './state'

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
  SuggestionItemConfig,
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
  ExpandableInputConfig,
  QuestionCommandMenuV4Config, // alias
  ExpandableInputPreset,
  QuestionCommandMenuV4Preset, // alias
  PlaygroundState,
} from './config'
