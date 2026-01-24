/**
 * Profile V3 Hooks
 *
 * @module b/profile-v3/hooks
 */

export { useProfileScores } from './useProfileScores'
export { useRevisionFlow } from './useRevisionFlow'
export { useCategoryHighlight } from './useCategoryHighlight'
export { useScoreAnimation } from './useScoreAnimation'
export { useQuestions, MAX_QUESTIONS } from './useQuestions'
export { useQuestionsCoordinator } from './useQuestionsCoordinator'

// Re-export hooks from base profile that are still applicable
export { useChatOverlay } from '../../profile/hooks/useChatOverlay'
export { useEditMode } from '../../profile-v2/hooks/useEditMode'
