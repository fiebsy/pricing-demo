/**
 * Pitch deck data - main export
 *
 * All slide data is now centralized in all-slides-config.ts
 * for easier editing and maintenance.
 */

// Re-export types
export * from './types'

// Re-export constants
export * from './constants'

// Import the consolidated slide configuration
import { ALL_SLIDES_CONFIG, STORAGE_KEY } from './all-slides-config'

// Export the slides array
export const SLIDES = ALL_SLIDES_CONFIG

// Export storage key
export { STORAGE_KEY }

// Re-export individual slides for backward compatibility
export const titleSlide = ALL_SLIDES_CONFIG[0]
export const problemSlide = ALL_SLIDES_CONFIG[1]
export const solutionSlide = ALL_SLIDES_CONFIG[2]
export const whyNowSlide = ALL_SLIDES_CONFIG[3]
export const marketSlide = ALL_SLIDES_CONFIG[4]
export const tractionSlide = ALL_SLIDES_CONFIG[5]
export const portfolioSlide = ALL_SLIDES_CONFIG[6]
export const businessModelSlide = ALL_SLIDES_CONFIG[7]
export const distributionSlide = ALL_SLIDES_CONFIG[8]
export const teamSlide = ALL_SLIDES_CONFIG[9]
export const financialsSlide = ALL_SLIDES_CONFIG[10]
export const closingSlide = ALL_SLIDES_CONFIG[11]
