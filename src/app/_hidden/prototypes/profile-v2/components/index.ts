/**
 * Components index
 *
 * @module b/profile-v2/components
 */

// Layout
export { BentoProfileLayout, BottomToolbar } from './layout'

// Profile Panel
export {
  ProfilePanel,
  ProfileAvatar,
  ProfileIdentity,
  ProfileBio,
} from './profile-panel'

// Bento Grid
export { BentoGrid, QuestionCard } from './bento-grid'

// Edit Panel
export {
  EditPanel,
  SectionTabs,
  CategoryMetrics,
  TabIndicator,
} from './edit-panel'

// Edit Mode
export {
  EditModeProvider,
  useEditModeContext,
  FloatingEditControls,
} from './edit-mode'

// Confidence
export { ScoreImprovement } from './confidence'

// Toast
export { ScoreToast } from './toast'

// Chat
export { ConfidenceSignal, ChatOverlay } from './chat'

// Re-export from base profile
export { RevisionModal, UpdatesIsland } from '@/app/b/profile/components'
