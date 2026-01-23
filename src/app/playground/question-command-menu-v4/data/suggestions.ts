/**
 * Question Command Menu V4 - Sample Suggestions Data
 */

import type { SuggestionItem } from '../types'

export const SAMPLE_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'sug-1',
    text: 'What are the payment terms for this contract?',
    confidence: 0.92,
    category: 'Payment',
  },
  {
    id: 'sug-2',
    text: 'Is there a cancellation policy included?',
    confidence: 0.85,
    category: 'Terms',
  },
  {
    id: 'sug-3',
    text: 'What is the expected delivery timeline?',
    confidence: 0.78,
    category: 'Logistics',
  },
  {
    id: 'sug-4',
    text: 'Are there any penalty clauses for late delivery?',
    confidence: 0.65,
    category: 'Terms',
  },
  {
    id: 'sug-5',
    text: 'Who is responsible for shipping costs?',
    confidence: 0.55,
    category: 'Payment',
  },
  {
    id: 'sug-6',
    text: 'What warranties are provided with this service?',
    confidence: 0.45,
    category: 'Terms',
  },
  {
    id: 'sug-7',
    text: 'Can this contract be extended after the initial period?',
    confidence: 0.38,
    category: 'Terms',
  },
  {
    id: 'sug-8',
    text: 'What happens if there is a dispute?',
    confidence: 0.28,
    category: 'Legal',
  },
]

/**
 * Get confidence level from score.
 */
export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence > 0.7) return 'high'
  if (confidence >= 0.4) return 'medium'
  return 'low'
}

/**
 * Get confidence color class based on level.
 */
export function getConfidenceColorClass(level: 'high' | 'medium' | 'low'): string {
  switch (level) {
    case 'high':
      return 'text-success bg-success/10'
    case 'medium':
      return 'text-warning bg-warning/10'
    case 'low':
      return 'text-error bg-error/10'
  }
}
