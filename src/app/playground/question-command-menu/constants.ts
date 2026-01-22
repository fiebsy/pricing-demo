/**
 * Question Command Menu Playground - Constants
 *
 * Default configuration and presets for the playground.
 *
 * @module playground/question-command-menu
 */

import type { PlaygroundConfig, PlaygroundPreset, Question, QuestionSuggestion } from './types'

// =============================================================================
// DEFAULT CONFIG
// =============================================================================

export const DEFAULT_CONFIG: PlaygroundConfig = {
  // V4 Expand Layout
  triggerWidth: 320,
  triggerHeight: 48,
  panelWidth: 400,
  maxBottomHeight: 300,
  borderRadius: 20,
  topGap: 8,
  bottomGap: 12,

  // Animation
  animationPreset: 'smooth',
  expandDuration: 350,
  collapseDuration: 150,
  animateSlots: true,

  // Top Slot
  topSlotEnabled: true,
  topSlotHeight: 200,
  topSlotBackground: 'none',

  // Bottom Slot
  bottomSlotEnabled: true,
  bottomSlotBackground: 'none',

  // Question/Answer
  responseType: 'good',
  responseDelay: 800,
  maxQuestions: 5,

  // Suggestions
  showSuggestions: true,
  maxSuggestions: 5,
}

// =============================================================================
// PRESETS
// =============================================================================

export const PRESETS: PlaygroundPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard configuration with answer preview',
    data: DEFAULT_CONFIG,
  },
  {
    id: 'no-preview',
    name: 'No Preview',
    description: 'Questions expand without answer preview',
    data: {
      ...DEFAULT_CONFIG,
      topSlotEnabled: false,
      maxBottomHeight: 340,
    },
  },
  {
    id: 'tall-preview',
    name: 'Tall Preview',
    description: 'Larger answer preview area',
    data: {
      ...DEFAULT_CONFIG,
      topSlotEnabled: true,
      topSlotHeight: 280,
      maxBottomHeight: 80,
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Smaller footprint',
    data: {
      ...DEFAULT_CONFIG,
      triggerWidth: 280,
      triggerHeight: 44,
      panelWidth: 340,
      maxBottomHeight: 260,
      borderRadius: 16,
      topSlotHeight: 180,
    },
  },
  {
    id: 'spacious',
    name: 'Spacious',
    description: 'More breathing room',
    data: {
      ...DEFAULT_CONFIG,
      triggerWidth: 380,
      triggerHeight: 52,
      panelWidth: 460,
      maxBottomHeight: 380,
      borderRadius: 24,
      topGap: 12,
      bottomGap: 16,
      topSlotHeight: 260,
    },
  },
  {
    id: 'snappy',
    name: 'Snappy Animation',
    description: 'Fast, responsive feel',
    data: {
      ...DEFAULT_CONFIG,
      animationPreset: 'snappy',
      expandDuration: 200,
      collapseDuration: 100,
    },
  },
]

// =============================================================================
// SAMPLE QUESTIONS
// =============================================================================

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What are your thoughts on remote work?',
    status: 'orphaned',
    answer: {
      id: 'a1',
      text: "I don't have enough context to answer this question accurately.",
      confidence: 0.3,
      generatedAt: new Date(),
    },
  },
  {
    id: 'q2',
    text: 'How do you prioritize competing deadlines?',
    status: 'pending',
  },
  {
    id: 'q3',
    text: 'What is your approach to project management?',
    status: 'answered',
    answer: {
      id: 'a3',
      text: 'I use agile methodologies with a focus on iterative delivery and continuous feedback loops.',
      confidence: 0.92,
      generatedAt: new Date(),
    },
  },
  {
    id: 'q4',
    text: 'How do you handle team conflicts?',
    status: 'answered',
    answer: {
      id: 'a4',
      text: 'I believe in addressing conflicts directly through open communication and finding common ground.',
      confidence: 0.85,
      generatedAt: new Date(),
    },
  },
]

// =============================================================================
// SIMULATED RESPONSES
// =============================================================================

export const SIMULATED_RESPONSES = {
  good: {
    text: 'I approach this with a structured methodology that prioritizes clear communication and measurable outcomes.',
    confidence: 0.92,
    isOrphaned: false,
  },
  lousy: {
    text: 'Based on available information, here is a possible response though more context would help.',
    confidence: 0.55,
    isOrphaned: false,
  },
  unsure: {
    text: "I don't have enough context to answer this question accurately.",
    confidence: 0.25,
    isOrphaned: true,
  },
}

// =============================================================================
// QUESTION SUGGESTIONS
// =============================================================================

export const QUESTION_SUGGESTIONS: QuestionSuggestion[] = [
  { id: 's1', text: 'What motivates you in your work?' },
  { id: 's2', text: 'How do you handle feedback?' },
  { id: 's3', text: 'Describe your ideal work environment.' },
  { id: 's4', text: 'What are your career goals?' },
  { id: 's5', text: 'How do you stay organized?' },
  { id: 's6', text: 'What skills are you developing?' },
  { id: 's7', text: 'How do you approach learning?' },
  { id: 's8', text: 'What makes a good team player?' },
]
