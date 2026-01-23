/**
 * Question Command Menu V3 - Core Exports
 */

export { QuestionCommandMenuV3Provider, useV3Context } from './context'
export type { V3ContextValue } from './context'

export {
  calculateSlotHeight,
  filterQuestionGroups,
  flattenQuestionGroups,
} from './height-calculator'
export type { HeightCalculatorParams } from './height-calculator'

export {
  useSlotContent,
  useSlotConfig,
  useSlotHeight,
  useContentConfig,
  useQuestionsConfig,
  useButtonsConfig,
  useFiltersConfig,
  useFilteredQuestions,
  useSlotVisible,
} from './hooks'
