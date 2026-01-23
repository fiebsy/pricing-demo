/**
 * Profile Questions - V3
 *
 * Questions linked to the 5-category structure.
 *
 * @module b/profile-v3/constants/questions
 */

import type { ProfileQuestion } from '../types'

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  {
    id: 'q1',
    text: 'What drives your passion for design engineering?',
    linkedCategory: 'growth',
  },
  {
    id: 'q2',
    text: 'How did you transition into your current role?',
    linkedCategory: 'career',
  },
  {
    id: 'q3',
    text: 'What technologies are you most excited about?',
    linkedCategory: 'skills',
  },
  {
    id: 'q4',
    text: 'How would you describe your communication style?',
    linkedCategory: 'voice',
  },
  {
    id: 'q5',
    text: 'How do you approach building and leading teams?',
    linkedCategory: 'business',
  },
]
