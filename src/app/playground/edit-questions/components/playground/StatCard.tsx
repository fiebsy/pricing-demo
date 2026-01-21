/**
 * StatCard - Playground statistics display
 *
 * Shows a single stat value with label and optional color variant.
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'

// =============================================================================
// TYPES
// =============================================================================

export interface StatCardProps {
  /** Label text below the value */
  label: string
  /** Numeric value to display */
  value: number
  /** Color variant for the value */
  variant?: 'success' | 'warning' | 'neutral'
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatCard({ label, value, variant }: StatCardProps) {
  const variantClasses = {
    success: 'text-success-primary',
    warning: 'text-warning-primary',
    neutral: 'text-tertiary',
  }

  return (
    <div className="bg-secondary rounded-xl px-4 py-3 min-w-[100px]">
      <div className={`text-2xl font-bold ${variant ? variantClasses[variant] : 'text-primary'}`}>
        {value}
      </div>
      <div className="text-xs text-tertiary">{label}</div>
    </div>
  )
}
