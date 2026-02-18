/**
 * CSV Export Utility
 *
 * Generates CSV content from TypeScript data for syncing with docs.
 */

import type { StatusRow, TransitionRow } from '../config/types'

// =============================================================================
// STATUS CSV
// =============================================================================

const STATUS_HEADER = [
  'record_type',
  'id',
  'code',
  'stage',
  'category',
  'subcategory',
  'order_type',
  'is_ignorable',
  'ignorable_reason',
  'badge_label',
  'short_label',
  'sentence_desc',
  'user_facing_desc',
  'technical_desc',
  'duration_expectation',
  'next_steps',
  'owner',
].join(',')

function escapeCSV(value: string | boolean | number): string {
  const str = String(value)
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatStatusRow(status: StatusRow): string {
  return [
    status.record_type,
    status.id,
    status.code,
    status.stage,
    status.category,
    status.subcategory,
    status.order_type,
    status.is_ignorable ? 'TRUE' : 'FALSE',
    escapeCSV(status.ignorable_reason),
    escapeCSV(status.badge_label),
    escapeCSV(status.short_label),
    escapeCSV(status.sentence_desc),
    escapeCSV(status.user_facing_desc),
    escapeCSV(status.technical_desc),
    escapeCSV(status.duration_expectation),
    escapeCSV(status.next_steps),
    escapeCSV(status.owner),
  ].join(',')
}

// =============================================================================
// TRANSITION CSV
// =============================================================================

const TRANSITION_HEADER = [
  'record_type',
  'id',
  'from_status_id',
  'to_status_id',
  'from_code',
  'to_code',
  'frequency',
  'coverage',
  'change_category',
  'is_ignorable',
  'badge_label',
  'short_label',
  'sentence_desc',
  'user_facing_desc',
  'technical_desc',
].join(',')

function formatTransitionRow(transition: TransitionRow): string {
  return [
    transition.record_type,
    transition.id,
    transition.from_status_id,
    transition.to_status_id,
    transition.from_code,
    transition.to_code,
    transition.frequency,
    transition.coverage,
    transition.change_category,
    transition.is_ignorable ? 'TRUE' : 'FALSE',
    escapeCSV(transition.badge_label),
    escapeCSV(transition.short_label),
    escapeCSV(transition.sentence_desc),
    escapeCSV(transition.user_facing_desc),
    escapeCSV(transition.technical_desc),
  ].join(',')
}

// =============================================================================
// EXPORT FUNCTIONS
// =============================================================================

export function generateStatusesCSV(statuses: StatusRow[]): string {
  const rows = statuses.map(formatStatusRow)
  return [STATUS_HEADER, ...rows].join('\n')
}

export function generateTransitionsCSV(transitions: TransitionRow[]): string {
  const rows = transitions.map(formatTransitionRow)
  return [TRANSITION_HEADER, ...rows].join('\n')
}

export function generateCombinedCSV(
  statuses: StatusRow[],
  transitions: TransitionRow[]
): string {
  const statusSection = generateStatusesCSV(statuses)
  const transitionSection = generateTransitionsCSV(transitions)

  return [statusSection, '', transitionSection].join('\n')
}

// =============================================================================
// DOWNLOAD HELPER
// =============================================================================

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
