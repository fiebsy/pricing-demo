/**
 * Edit Questions Playground - Services
 *
 * Re-exports all services for cleaner imports.
 *
 * @module playground/edit-questions/services
 */

export {
  createQuestionsService,
  useQuestionsService,
  type GenerateAnswerOptions,
  type GenerateAnswerResult,
  type QuestionsServiceConfig,
  type UseQuestionsServiceOptions,
} from './questions-service'

export {
  searchSuggestions,
  getAllSuggestions,
  isDuplicateQuestion,
  getSuggestionCount,
  useSuggestions,
  type SuggestionMatch,
  type SearchOptions,
  type UseSuggestionsOptions,
  type UseSuggestionsReturn,
} from './suggestions-service'
