/**
 * Panel Configuration for Quick Fix Interactions
 */

import type { PanelConfig } from '@/components/ui/prod/base/control-panel'
import type { QuickFixInteractionsConfig } from '../config/types'

export function buildQuickFixPanelConfig(
  config: QuickFixInteractionsConfig,
  presets: Array<{ id: string; name: string; data: QuickFixInteractionsConfig }>,
  activePresetId: string | null
): PanelConfig {
  return {
    title: 'Quick Fix Interactions',
    sections: [],
  }
}