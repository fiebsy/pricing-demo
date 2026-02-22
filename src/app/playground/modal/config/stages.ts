/**
 * Modal Stage Configurations
 *
 * Defines 4 stages with varying content to demonstrate
 * smooth height transitions between modal states.
 */

import type { StageConfig } from './types'

export const MODAL_STAGES: StageConfig[] = [
  {
    id: 1,
    name: 'Stage 1',
    content: {
      headerTitle: 'Modal Title 1',
      contentA: { lineCount: 3, height: 48 },
      contentB: { lineCount: 2, height: 32 },
      buttons: { primary: 'Button 1', secondary: 'Button 2' },
    },
  },
  {
    id: 2,
    name: 'Stage 2',
    content: {
      headerTitle: 'Modal Title 2',
      contentA: { lineCount: 5, height: 80 },
      contentB: { lineCount: 3, height: 48 },
      buttons: { primary: 'Button 1', secondary: 'Button 2' },
    },
  },
  {
    id: 3,
    name: 'Stage 3',
    content: {
      headerTitle: 'Modal Title 3',
      contentA: { lineCount: 2, height: 32 },
      contentB: { lineCount: 4, height: 64 },
      buttons: { primary: 'Button 1', secondary: 'Button 2' },
    },
  },
  {
    id: 4,
    name: 'Stage 4',
    content: {
      headerTitle: 'Modal Title 4',
      contentA: { lineCount: 4, height: 64 },
      contentB: { lineCount: 1, height: 16 },
      buttons: { primary: 'Button 1', secondary: 'Button 2' },
    },
  },
]

export function getStageById(id: 1 | 2 | 3 | 4): StageConfig {
  return MODAL_STAGES.find((s) => s.id === id) ?? MODAL_STAGES[0]
}
