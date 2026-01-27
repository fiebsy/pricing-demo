/**
 * Edit Questions Playground - Mock Data
 *
 * Sample data for testing the Q/A editor interface.
 *
 * @module playground/edit-questions/constants
 */

import type { Question, QuickFixStatement, MindContent } from '../types'

/**
 * Initial questions for the playground.
 */
export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is your approach to project management?',
    status: 'answered',
    answer: {
      id: 'a1',
      text: 'I follow an iterative approach with regular stakeholder check-ins. Each phase includes planning, execution, review, and adjustment cycles to ensure alignment with goals.',
      confidence: 0.88,
      generatedAt: new Date('2024-01-15T10:30:00'),
    },
  },
  {
    id: 'q2',
    text: 'How do you handle team conflicts?',
    status: 'answered',
    answer: {
      id: 'a2',
      text: 'I address conflicts through open dialogue, focusing on understanding each perspective before working towards a collaborative solution that aligns with team objectives.',
      confidence: 0.75,
      generatedAt: new Date('2024-01-15T11:00:00'),
    },
  },
  {
    id: 'q3',
    text: 'What are your thoughts on remote work?',
    status: 'orphaned',
    answer: {
      id: 'a3',
      text: "I don't have enough context to answer this question accurately.",
      confidence: 0,
      generatedAt: new Date('2024-01-15T11:30:00'),
    },
  },
  {
    id: 'q4',
    text: 'How do you prioritize competing deadlines?',
    status: 'pending',
  },
]

/**
 * Suggested questions for autocomplete.
 */
export const SUGGESTED_QUESTIONS: string[] = [
  'What is your leadership style?',
  'How do you measure success?',
  'What are your core values?',
  'How do you approach innovation?',
  'What is your decision-making process?',
  'How do you handle feedback?',
  'What motivates you professionally?',
  'How do you stay current in your field?',
  'What is your communication style?',
  'How do you build trust with stakeholders?',
  'What is your approach to risk management?',
  'How do you foster team collaboration?',
  'What are your growth priorities?',
  'How do you handle uncertainty?',
  'What is your problem-solving methodology?',
]

/**
 * Quick fix statements for the Tinder-style flow.
 */
export const QUICK_FIX_STATEMENTS: QuickFixStatement[] = [
  { id: 'qf1', text: 'I prefer working in a fully remote environment' },
  { id: 'qf2', text: 'Hybrid work arrangements work best for my productivity' },
  { id: 'qf3', text: 'I believe in-person collaboration is essential for creative work' },
  { id: 'qf4', text: 'Async communication is more efficient than real-time meetings' },
  { id: 'qf5', text: 'Video calls are just as effective as in-person meetings' },
  { id: 'qf6', text: 'Work-life balance is improved with flexible schedules' },
  { id: 'qf7', text: 'Team culture suffers without regular face-to-face interaction' },
  { id: 'qf8', text: 'I can be equally productive from home or office' },
  { id: 'qf9', text: 'Commuting time is better spent on actual work' },
  { id: 'qf10', text: 'Spontaneous office conversations spark valuable ideas' },
  { id: 'qf11', text: 'Written documentation replaces the need for many meetings' },
  { id: 'qf12', text: 'Remote work requires more intentional communication' },
]

/**
 * Sample content items that could be added to mind.
 */
export const SAMPLE_MIND_CONTENT: MindContent[] = [
  { id: 'mc1', type: 'file', name: 'Remote Work Policy.pdf' },
  { id: 'mc2', type: 'link', name: 'Company Handbook', url: 'https://example.com/handbook' },
  { id: 'mc3', type: 'text', name: 'Personal Note', content: 'My thoughts on remote work...' },
]

/**
 * Memory bullets generated after quick fix completion.
 */
export const MEMORY_BULLETS: string[] = [
  'Prefers hybrid work arrangements',
  'Values async communication',
  'Believes in intentional remote collaboration',
  'Prioritizes work-life balance',
  'Appreciates flexible scheduling',
]
