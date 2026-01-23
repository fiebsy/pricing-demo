/**
 * Hooks index
 *
 * @module b/profile-v2/hooks
 */

// V2-specific hooks
export { useCategoryHighlight } from './useCategoryHighlight'
export type { UseCategoryHighlightReturn } from './useCategoryHighlight'

export { useScoreAnimation } from './useScoreAnimation'
export type { UseScoreAnimationReturn, ScoreImprovement } from './useScoreAnimation'

export { useEditMode } from './useEditMode'
export type { UseEditModeReturn } from './useEditMode'

export { useBioKeywords } from './useBioKeywords'
export type { UseBioKeywordsReturn, BioKeyword } from './useBioKeywords'

// Re-export base profile hooks
export {
  useProfileScores,
  useRevisionFlow,
  useChatOverlay,
  useChatMessages,
  useSimulatedResponse,
} from '../../profile/hooks'

export type {
  UseProfileScoresReturn,
  UseRevisionFlowReturn,
  UseChatOverlayReturn,
  UseChatMessagesReturn,
  UseSimulatedResponseReturn,
} from '../../profile/hooks'
