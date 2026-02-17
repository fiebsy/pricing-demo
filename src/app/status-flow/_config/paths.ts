/**
 * Status Flow - Path Preset Definitions
 *
 * Predefined path traces for common analysis scenarios.
 */

import type { PathPreset } from './types'

// =============================================================================
// PATH PRESETS
// =============================================================================

export const PATH_PRESETS: PathPreset[] = [
  {
    id: 'paid-in-full',
    label: 'Path to Paid in Full',
    description: 'Highlight all routes that lead to successful payment completion',
    targetStatuses: ['PAID_IN_FULL'],
    highlightColor: 'var(--color-success-500)',
  },
  {
    id: 'clawback-complete',
    label: 'Path to Clawback Complete',
    description: 'Trace paths that end in completed clawback',
    targetStatuses: ['CLAWBACK_COMPLETE'],
    highlightColor: 'var(--color-error-500)',
  },
  {
    id: 'defaulted',
    label: 'Path to Defaulted',
    description: 'Show escalation paths leading to defaulted states',
    targetStatuses: ['DEFAULTED', 'DEFAULTED_PENDING_CLAWBACK', 'DEFAULTED_SETTLED'],
    highlightColor: 'var(--color-error-600)',
  },
  {
    id: 'recovery',
    label: 'Recovery Paths',
    description: 'Highlight transitions from AT_RISK back to HEALTHY states',
    targetStatuses: [
      'FUNDING_IN_REPAYMENT',
      'SERVICING_IN_REPAYMENT',
      'IN_REPAYMENT',
      'FUNDED',
    ],
    sourceFilter: ['AT_RISK'],
    highlightColor: 'var(--color-success-400)',
  },
  {
    id: 'canceled-settled',
    label: 'Path to Canceled Settled',
    description: 'Trace cancellation flows that lead to settled state',
    targetStatuses: ['CANCELED_SETTLED'],
    highlightColor: 'var(--color-warning-500)',
  },
  {
    id: 'chargeback-flow',
    label: 'Chargeback Flow',
    description: 'Follow the chargeback process from initiation to settlement',
    targetStatuses: [
      'CHARGEBACK_PENDING_CLAWBACK',
      'CHARGEBACK_SETTLED',
    ],
    highlightColor: 'var(--color-error-400)',
  },
]

// =============================================================================
// HELPERS
// =============================================================================

export function getPathPreset(id: string): PathPreset | undefined {
  return PATH_PRESETS.find(p => p.id === id)
}

export function getPresetTargetStatuses(id: string): string[] {
  return getPathPreset(id)?.targetStatuses ?? []
}
