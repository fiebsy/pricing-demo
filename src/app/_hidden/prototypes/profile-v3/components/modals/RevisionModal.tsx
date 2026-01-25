/**
 * RevisionModal Component - V3
 *
 * Modal for improving category scores.
 * Simplified for flat 5-category structure (no sections).
 *
 * @module b/profile-v3/components/modals
 */

'use client'

import * as React from 'react'
import type { CategoryType } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface RevisionModalProps {
  isOpen: boolean
  targetCategory: CategoryType | null
  onClose: () => void
  onComplete: () => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function RevisionModal({
  isOpen,
  targetCategory,
  onClose,
  onComplete,
}: RevisionModalProps) {
  if (!isOpen || !targetCategory) return null

  const categoryLabel = targetCategory.charAt(0).toUpperCase() + targetCategory.slice(1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-primary border border-primary rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Improve {categoryLabel}
        </h2>
        <p className="text-secondary mb-6">
          Add content to boost your {targetCategory} score.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onComplete}
            className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid-hover transition-colors"
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  )
}
