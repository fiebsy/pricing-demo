/**
 * Playground Index Page
 *
 * Landing page for all component playgrounds and demos.
 * Navigate to individual component demos from here.
 */

'use client'

import Link from 'next/link'
import { Skwircle } from '@/components/ui/skwircle/skwircle'

const PLAYGROUND_ITEMS = [
  {
    id: 'skwircle-demo',
    title: 'Skwircle Design System',
    description: 'Interactive playground for buttons, inputs, badges, and cards',
    href: '/playground/skwircle-demo',
  },
  {
    id: 'skwircle-card',
    title: 'Skwircle Card',
    description: 'Showcase cards with preview area and dark footer pattern',
    href: '/playground/skwircle-card',
  },
  {
    id: 'design-lab',
    title: 'Design Lab',
    description: 'Sandbox for testing and refining component designs',
    href: '/lab',
  },
]

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="border-b border-primary bg-primary px-8 py-6">
        <h1 className="text-display-md font-semibold text-primary">Component Playground</h1>
        <p className="mt-1 text-sm text-secondary">
          Explore and test Skwircle design system components
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLAYGROUND_ITEMS.map((item) => (
            <Link key={item.id} href={item.href} className="group">
              <Skwircle.Card
                elevation="xs"
                roundness="rounded"
                intent="default"
              >
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-primary group-hover:text-brand-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-tertiary">
                    {item.description}
                  </p>
                </div>
              </Skwircle.Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
