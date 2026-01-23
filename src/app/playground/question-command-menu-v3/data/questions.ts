/**
 * Question Command Menu V3 - Sample Questions Data
 *
 * Mock data for the questions content type.
 */

import type { QuestionGroup } from '../config/types'

export const SAMPLE_QUESTIONS: QuestionGroup[] = [
  {
    id: 'recent',
    label: 'Recent Questions',
    items: [
      {
        id: '1',
        text: 'What are your thoughts on remote work?',
        answer: "I don't have enough context to answer this question accurately.",
        status: { type: 'needs-revision', label: 'Needs revision' },
      },
      {
        id: '2',
        text: 'How do you handle conflict in the workplace?',
        answer: 'I believe in open communication and finding common ground.',
        status: { type: 'approved', label: 'Approved' },
      },
      {
        id: '3',
        text: 'Describe your leadership style.',
        status: { type: 'pending', label: 'Pending' },
      },
    ],
  },
  {
    id: 'flagged',
    label: 'Flagged for Review',
    items: [
      {
        id: '4',
        text: 'What salary are you expecting?',
        answer: 'I prefer to discuss compensation after understanding the role better.',
        status: { type: 'needs-revision', label: 'Needs revision' },
      },
      {
        id: '5',
        text: 'Why did you leave your last job?',
        status: { type: 'rejected', label: 'Rejected' },
      },
    ],
  },
]
