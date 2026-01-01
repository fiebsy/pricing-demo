/**
 * Skwircle Card Playground
 *
 * Experimentation space for card components with
 * preview area + dark footer pattern.
 */

'use client'

import Link from 'next/link'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import { Skwircle } from '@/components/ui/skwircle/skwircle'

// =============================================================================
// EXAMPLE CARD DATA
// =============================================================================

const EXAMPLE_CARDS = [
  {
    id: 'shared-tooltip',
    title: 'Shared Tooltip',
    date: 'Dec 2025',
  },
  {
    id: 'toc-pill',
    title: 'TOC Pill',
    date: 'Dec 2025',
  },
  {
    id: 'memory-lane',
    title: 'Memory Lane',
    date: 'Nov 2025',
  },
  {
    id: 'gallery-view',
    title: 'Gallery View',
    date: 'Nov 2025',
  },
]

// =============================================================================
// SHOWCASE CARD COMPONENT
// =============================================================================

interface ShowcaseCardProps {
  title: string
  date: string
  children?: React.ReactNode
}

function ShowcaseCard({ title, date, children }: ShowcaseCardProps) {
  return (
    <Skwircle.Card
      elevation="sm"
      roundness="rounded"
      intent="default"
      className="overflow-hidden"
    >
      {/* Preview Area - Light */}
      <div className="aspect-[4/3] bg-white flex items-center justify-center p-6">
        {children || (
          <div className="text-tertiary text-sm">Preview Content</div>
        )}
      </div>

      {/* Footer - Dark */}
      <div className="bg-gray-900 px-5 py-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-0.5 text-sm text-gray-400">{date}</p>
      </div>
    </Skwircle.Card>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function SkwircleCardPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 px-8 py-4">
          <Link
            href="/playground"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <HugeIcon icon={ArrowLeft01Icon} size={16} />
            Back
          </Link>
          <div className="h-4 w-px bg-gray-700" />
          <h1 className="text-lg font-semibold text-white">Skwircle Card</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 max-w-2xl">
          A collection of components and widgets exploring design, animations, and micro-interactions.
        </p>

        {/* Card Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl">
          {EXAMPLE_CARDS.map((card) => (
            <ShowcaseCard key={card.id} title={card.title} date={card.date} />
          ))}
        </div>
      </div>
    </div>
  )
}
