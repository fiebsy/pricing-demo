/**
 * Mock Data for Quick Fix Interactions
 */

import type { Notification } from '../core/StatusIsland'

export const SAMPLE_STATEMENTS = [
  { id: '1', text: 'I enjoy working in teams' },
  { id: '2', text: 'I prefer remote work' },
  { id: '3', text: 'I thrive under pressure' },
  { id: '4', text: 'I am detail-oriented' },
  { id: '5', text: 'I like creative problem solving' },
]

export const MEMORY_BULLETS = [
  'Prefers collaborative environment',
  'Values work-life balance',
  'Handles deadlines well',
  'Attention to detail',
  'Creative thinker',
]

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'upload_complete',
    title: 'Resume uploaded',
    subtitle: 'Successfully processed',
    timestamp: new Date(),
  },
  {
    id: 'n2',
    type: 'confidence_change',
    title: 'Confidence increased',
    subtitle: '+5% improvement',
    timestamp: new Date(),
  },
]