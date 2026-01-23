/**
 * Quick Fix Interactions - Mock Data
 *
 * Sample data for testing the playground.
 *
 * @module playground/quick-fix-interactions/constants
 */

import type { Notification } from '../core/StatusIsland'

// =============================================================================
// SAMPLE NOTIFICATIONS
// =============================================================================

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'upload_complete',
    title: '3 files uploaded',
    subtitle: 'Resume, cover letter, and portfolio',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
  },
  {
    id: 'n2',
    type: 'confidence_change',
    title: 'Confidence increased',
    subtitle: '+5% from new data',
    timestamp: new Date(Date.now() - 1000 * 60 * 12), // 12 min ago
  },
  {
    id: 'n3',
    type: 'regeneration',
    title: 'Answer regenerated',
    subtitle: 'Work preferences updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: 'n4',
    type: 'info',
    title: 'Quick fix complete',
    subtitle: '10 questions answered',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
  },
]

// =============================================================================
// QUICK FIX STATEMENTS
// =============================================================================

export interface QuickFixStatement {
  id: string
  text: string
  isTrue?: boolean
}

export const SAMPLE_STATEMENTS: QuickFixStatement[] = [
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
]

// =============================================================================
// MEMORY BULLETS
// =============================================================================

export const MEMORY_BULLETS: string[] = [
  'Prefers hybrid work arrangements',
  'Values async communication',
  'Believes in intentional remote collaboration',
  'Prioritizes work-life balance',
  'Appreciates flexible scheduling',
]
