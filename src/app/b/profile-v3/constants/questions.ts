/**
 * Profile Questions - V3
 *
 * Questions linked to the 5-category structure.
 * Each question can have an optional AI response and confidence score.
 *
 * @module b/profile-v3/constants/questions
 */

import type { ProfileQuestion } from '../types'

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  {
    id: 'q1',
    text: 'What drives your passion for design engineering?',
    linkedCategory: 'growth',
    aiResponse: 'My passion comes from the intersection of creativity and problem-solving. I love taking complex user needs and translating them into elegant, intuitive interfaces. Every pixel is an opportunity to make someone\'s day a little easier.',
    aiConfidence: 0.92,
  },
  {
    id: 'q2',
    text: 'How did you transition into your current role?',
    linkedCategory: 'career',
    aiResponse: 'I started as a frontend developer, but always had an eye for design. Over time, I took on more UI/UX responsibilities, eventually merging both skillsets into a design engineering role where I can own the full creative-to-code pipeline.',
    aiConfidence: 0.88,
  },
  {
    id: 'q3',
    text: 'What technologies are you most excited about?',
    linkedCategory: 'skills',
    aiResponse: 'React Server Components and the new wave of AI-assisted development tools are fascinating. I\'m also exploring motion design with Framer Motion and CSS animations to create more delightful user experiences.',
    aiConfidence: 0.85,
  },
  {
    id: 'q4',
    text: 'How would you describe your communication style?',
    linkedCategory: 'voice',
    aiResponse: null, // No response yet - will show empty state
    aiConfidence: null,
  },
  {
    id: 'q5',
    text: 'How do you approach building and leading teams?',
    linkedCategory: 'business',
    aiResponse: null, // No response yet - will show empty state
    aiConfidence: null,
  },
]
