/**
 * BioSection Component
 *
 * Bio text and question chips that link to categories.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/prod/base/badge'
import type { BioSectionProps } from '../types'

// =============================================================================
// CATEGORY COLORS - mapped to Badge component's valid colors
// =============================================================================

const categoryColors: Record<string, 'brand' | 'success' | 'warning' | 'info'> = {
  identity: 'brand',
  career: 'info',
  knowledge: 'success',
  voice: 'warning',
}

// =============================================================================
// COMPONENT
// =============================================================================

export function BioSection({ bio, questions, onQuestionClick, className }: BioSectionProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Bio */}
      <div className="bg-primary border border-primary rounded-2xl p-6">
        <h2 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-3">
          About
        </h2>
        <p className="text-secondary leading-relaxed whitespace-pre-line">{bio}</p>
      </div>

      {/* Questions */}
      <div className="bg-primary border border-primary rounded-2xl p-6">
        <h2 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-4">
          Questions
        </h2>
        <div className="flex flex-wrap gap-2">
          {questions.map((question) => (
            <button
              key={question.id}
              type="button"
              onClick={() => onQuestionClick(question)}
              className={cn(
                'text-left max-w-full',
                'motion-safe:transition-transform motion-safe:duration-150',
                'motion-reduce:transition-none',
                'hover:scale-[1.02] active:scale-[0.98]'
              )}
            >
              <Badge
                color={categoryColors[question.linkedCategory] || 'gray'}
                size="md"
                shape="pill"
                style="modern"
                className="cursor-pointer"
              >
                <span className="line-clamp-1">{question.text}</span>
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
