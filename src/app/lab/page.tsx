/**
 * Design Lab
 *
 * A sandbox for testing and iterating on component designs.
 * Add components here to experiment with styling and behavior.
 */

'use client'

import { useState } from 'react'
import { Skwircle } from '@/components/ui/skwircle/skwircle'
import { ExpandingSearch } from '@/components/ui/expanding-search/expanding-search'

export default function LabPage() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary bg-primary/80 backdrop-blur-sm">
        <div className="px-8 py-4">
          <h1 className="text-display-sm font-semibold text-primary">Design Lab</h1>
          <p className="text-sm text-tertiary">Test and refine component designs</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Section: Buttons */}
          <section>
            <SectionHeader title="Buttons" />
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Skwircle.Button intent="primary">
                <span className="px-4 py-2 text-sm font-medium">Primary</span>
              </Skwircle.Button>
              <Skwircle.Button intent="secondary">
                <span className="px-4 py-2 text-sm font-medium">Secondary</span>
              </Skwircle.Button>
              <Skwircle.Button intent="ghost">
                <span className="px-4 py-2 text-sm font-medium">Ghost</span>
              </Skwircle.Button>
              <Skwircle.Button intent="error">
                <span className="px-4 py-2 text-sm font-medium">Error</span>
              </Skwircle.Button>
              <Skwircle.Button intent="success">
                <span className="px-4 py-2 text-sm font-medium">Success</span>
              </Skwircle.Button>
            </div>
          </section>

          {/* Section: Cards */}
          <section>
            <SectionHeader title="Cards" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Skwircle.Card elevation="xs" roundness="rounded">
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-primary">Card XS</h3>
                  <p className="mt-1 text-xs text-tertiary">
                    Extra small elevation for subtle depth
                  </p>
                </div>
              </Skwircle.Card>
              <Skwircle.Card elevation="sm" roundness="rounded">
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-primary">Card SM</h3>
                  <p className="mt-1 text-xs text-tertiary">
                    Small elevation for light shadows
                  </p>
                </div>
              </Skwircle.Card>
              <Skwircle.Card elevation="md" roundness="rounded">
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-primary">Card MD</h3>
                  <p className="mt-1 text-xs text-tertiary">
                    Medium elevation for balanced depth
                  </p>
                </div>
              </Skwircle.Card>
            </div>
          </section>

          {/* Section: Badges */}
          <section>
            <SectionHeader title="Badges" />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Skwircle.Badge intent="default">
                <span className="px-2.5 py-1 text-xs font-medium">Default</span>
              </Skwircle.Badge>
              <Skwircle.Badge intent="primary">
                <span className="px-2.5 py-1 text-xs font-medium">Primary</span>
              </Skwircle.Badge>
              <Skwircle.Badge intent="success">
                <span className="px-2.5 py-1 text-xs font-medium">Success</span>
              </Skwircle.Badge>
              <Skwircle.Badge intent="warning">
                <span className="px-2.5 py-1 text-xs font-medium">Warning</span>
              </Skwircle.Badge>
              <Skwircle.Badge intent="error">
                <span className="px-2.5 py-1 text-xs font-medium">Error</span>
              </Skwircle.Badge>
            </div>
          </section>

          {/* Section: Search */}
          <section>
            <SectionHeader title="Expanding Search" />
            <div className="mt-4 flex items-center gap-6">
              <ExpandingSearch
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search..."
                expandedWidth={280}
              />
              <span className="text-sm text-tertiary">
                {searchValue ? `Searching: "${searchValue}"` : 'Click to expand'}
              </span>
            </div>
          </section>

          {/* Section: Inputs */}
          <section>
            <SectionHeader title="Inputs" />
            <div className="mt-4 max-w-sm space-y-4">
              <Skwircle.Input>
                <input
                  type="text"
                  placeholder="Default input"
                  className="w-full bg-transparent px-3 py-2 text-sm text-primary placeholder:text-quaternary focus:outline-none"
                />
              </Skwircle.Input>
              <Skwircle.Input ring ringColor="outline-color-brand">
                <input
                  type="text"
                  placeholder="Input with ring"
                  className="w-full bg-transparent px-3 py-2 text-sm text-primary placeholder:text-quaternary focus:outline-none"
                />
              </Skwircle.Input>
            </div>
          </section>

          {/* Section: Avatars */}
          <section>
            <SectionHeader title="Avatars" />
            <div className="mt-4 flex items-center gap-4">
              <Skwircle.Avatar roundness="pill">
                <div className="flex h-10 w-10 items-center justify-center bg-brand-solid text-sm font-medium text-primary_on-brand">
                  DF
                </div>
              </Skwircle.Avatar>
              <Skwircle.Avatar roundness="rounded">
                <div className="flex h-10 w-10 items-center justify-center bg-utility-gray-100 text-sm font-medium text-primary">
                  AB
                </div>
              </Skwircle.Avatar>
              <Skwircle.Avatar roundness="soft">
                <div className="flex h-10 w-10 items-center justify-center bg-success-solid text-sm font-medium text-primary_on-brand">
                  CD
                </div>
              </Skwircle.Avatar>
            </div>
          </section>

          {/* Section: Empty Canvas */}
          <section>
            <SectionHeader title="Canvas" description="Add new components here for testing" />
            <div className="mt-4 min-h-[200px] rounded-lg border-2 border-dashed border-secondary bg-secondary/50 p-6">
              <p className="text-center text-sm text-quaternary">
                Drop components here to experiment
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-secondary pb-2">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      {description && <p className="mt-0.5 text-xs text-tertiary">{description}</p>}
    </div>
  )
}
