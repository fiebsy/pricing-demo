/**
 * Biaxial Command Menu V4 Playground
 *
 * Demonstrates the composable slot-based architecture with UNIFIED animation model.
 * Trigger lives INSIDE Content for proper clip-path reveal (matching V3).
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'
import UserIcon from '@hugeicons-pro/core-stroke-rounded/UserIcon'
import File01Icon from '@hugeicons-pro/core-stroke-rounded/File01Icon'

import {
  BiaxialExpandV4,
  useBiaxialExpand,
  type CommandGroup,
  type CommandItemAction,
  type BiaxialExpandConfig,
} from '@/components/ui/prod/base/biaxial-command-menu-v4'

// ============================================================================
// SAMPLE DATA
// ============================================================================

const COMMANDS_WITH_ICONS: CommandGroup[] = [
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      {
        id: 'dashboard',
        label: 'Go to Dashboard',
        description: 'View your main dashboard',
        shortcut: ['G', 'D'],
        icon: Home01Icon,
      },
      {
        id: 'customers',
        label: 'Go to Customers',
        description: 'Manage customer accounts',
        shortcut: ['G', 'C'],
        icon: UserIcon,
      },
      {
        id: 'contracts',
        label: 'Go to Contracts',
        description: 'View all contracts',
        shortcut: ['G', 'O'],
        icon: File01Icon,
      },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      {
        id: 'new-contract',
        label: 'Create Contract',
        description: 'Start a new contract',
        shortcut: ['C'],
        icon: Add01Icon,
      },
      {
        id: 'settings',
        label: 'Settings',
        description: 'Configure your preferences',
        icon: Settings01Icon,
        navigates: true,
      },
    ],
  },
]

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_CONFIG: Partial<BiaxialExpandConfig> = {
  layout: {
    triggerWidth: 280,
    triggerHeight: 44,
    panelWidth: 380,
    maxBottomHeight: 340,
    borderRadius: 20,
    topGap: 0,
    bottomGap: 12,
    backdropTopOffset: 0,
  },
  animation: {
    duration: 350,
    collapseDuration: 150,
    contentFadeDuration: 0,
    contentFadeDelay: 0,
    backdropMode: 'size',
    backdropDelay: 0,
    backdropDurationOffset: 0,
    animateSlotContainers: true,
    slotContainerDelay: 0,
    slotContainerDurationOffset: 100,
    expandOrigin: 'top',
  },
  appearance: {
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-2-subtle',
    background: 'tertiary',
    gradient: 'subtle-depth-md',
    gradientColor: 'tertiary',
    squircle: true,
  },
  topSlot: {
    enabled: false,
  },
  bottomSlot: {
    enabled: true,
    background: 'secondary',
    borderRadius: 14,
    inset: 4,
    borderWidth: 1,
    borderColor: 'primary',
  },
}

// ============================================================================
// DEMO SECTION
// ============================================================================

function DemoSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-secondary border border-primary">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <p className="text-sm text-tertiary mt-1">{description}</p>
      </div>
      <div className="h-[400px] flex items-start justify-center pt-16">
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// DEMO 1: DEFAULT (V3 PARITY)
// ============================================================================

function DefaultDemo() {
  const [filter, setFilter] = useState('')

  const handleSelect = (item: CommandItemAction) => {
    console.log('Selected:', item.label)
  }

  return (
    <BiaxialExpandV4.Root config={DEFAULT_CONFIG}>
      {/* Backdrop - visual layer */}
      <BiaxialExpandV4.Backdrop />

      {/* Content - UNIFIED container with clip-path animation */}
      <BiaxialExpandV4.Content>
        {/* Trigger inside Content for unified animation */}
        <BiaxialExpandV4.Trigger>
          <BiaxialExpandV4.SearchInput
            placeholder="Search commands..."
            value={filter}
            onValueChange={setFilter}
          />
        </BiaxialExpandV4.Trigger>

        {/* Bottom content with fade */}
        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <BiaxialExpandV4.MenuContent
              groups={COMMANDS_WITH_ICONS}
              filter={filter}
              onSelect={handleSelect}
            />
          </BiaxialExpandV4.BottomSlot>
        </BiaxialExpandV4.ContentWrapper>
      </BiaxialExpandV4.Content>
    </BiaxialExpandV4.Root>
  )
}

// ============================================================================
// DEMO 2: WITH TOP SECTION
// ============================================================================

function WithTopSectionDemo() {
  const [filter, setFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const handleSelect = (item: CommandItemAction) => {
    console.log('Selected:', item.label)
  }

  const topSectionConfig: Partial<BiaxialExpandConfig> = {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout!,
      topGap: 8,
    },
    topSlot: {
      enabled: true,
      height: 48,
      background: 'secondary',
      borderRadius: 14,
      inset: 4,
      borderWidth: 1,
      borderColor: 'primary',
      durationOffset: -100,
    },
  }

  return (
    <BiaxialExpandV4.Root config={topSectionConfig}>
      {/* Top section expands upward (separate from main content) */}
      <BiaxialExpandV4.TopSlot>
        <BiaxialExpandV4.FilterBar
          options={[
            { id: 'recent', label: 'Recent' },
            { id: 'starred', label: 'Starred' },
            { id: 'all', label: 'All' },
          ]}
          value={activeFilter}
          onChange={setActiveFilter}
        />
      </BiaxialExpandV4.TopSlot>

      <BiaxialExpandV4.Backdrop />

      <BiaxialExpandV4.Content>
        <BiaxialExpandV4.Trigger>
          <BiaxialExpandV4.SearchInput
            placeholder="Search commands..."
            value={filter}
            onValueChange={setFilter}
          />
        </BiaxialExpandV4.Trigger>

        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <BiaxialExpandV4.MenuContent
              groups={COMMANDS_WITH_ICONS}
              filter={filter}
              onSelect={handleSelect}
            />
          </BiaxialExpandV4.BottomSlot>
        </BiaxialExpandV4.ContentWrapper>
      </BiaxialExpandV4.Content>
    </BiaxialExpandV4.Root>
  )
}

// ============================================================================
// DEMO 3: ACTION BUTTON
// ============================================================================

function ActionButtonDemo() {
  const handleSelect = (item: CommandItemAction) => {
    console.log('Selected:', item.label)
  }

  return (
    <BiaxialExpandV4.Root config={DEFAULT_CONFIG}>
      <BiaxialExpandV4.Backdrop />

      <BiaxialExpandV4.Content>
        <BiaxialExpandV4.Trigger>
          <BiaxialExpandV4.ActionButton
            icon={Add01Icon}
            label="Quick Actions"
          />
        </BiaxialExpandV4.Trigger>

        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <BiaxialExpandV4.MenuContent
              groups={COMMANDS_WITH_ICONS}
              onSelect={handleSelect}
            />
          </BiaxialExpandV4.BottomSlot>
        </BiaxialExpandV4.ContentWrapper>
      </BiaxialExpandV4.Content>
    </BiaxialExpandV4.Root>
  )
}

// ============================================================================
// DEMO 4: CUSTOM CONTENT
// ============================================================================

function CustomTrigger() {
  const { expanded, setExpanded } = useBiaxialExpand()

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className={cn(
        'flex items-center gap-3 w-full h-full px-4',
        'text-left'
      )}
    >
      <div className="w-8 h-8 rounded-full bg-brand-solid flex items-center justify-center">
        <HugeIcon icon={UserIcon} size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-primary">John Doe</div>
        <div className="text-xs text-tertiary truncate">john@example.com</div>
      </div>
    </button>
  )
}

function CustomBottomContent() {
  const { setExpanded } = useBiaxialExpand()

  const options = [
    { icon: UserIcon, label: 'Profile', description: 'View your profile' },
    { icon: Settings01Icon, label: 'Settings', description: 'Preferences' },
  ]

  return (
    <div className="flex flex-col gap-2 p-2">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={() => {
            console.log('Selected:', option.label)
            setExpanded(false)
          }}
          className={cn(
            'flex items-center gap-3 p-3 rounded-xl',
            'hover:bg-tertiary transition-colors duration-150',
            'text-left'
          )}
        >
          <HugeIcon
            icon={option.icon}
            size={20}
            className="text-tertiary"
          />
          <div>
            <div className="text-sm font-medium text-primary">
              {option.label}
            </div>
            <div className="text-xs text-tertiary">{option.description}</div>
          </div>
        </button>
      ))}

      <div className="h-px bg-primary mx-2 my-1" />

      <button
        type="button"
        onClick={() => setExpanded(false)}
        className={cn(
          'flex items-center justify-center gap-2 p-3 rounded-xl',
          'text-sm font-medium text-error-primary',
          'hover:bg-error-primary/10 transition-colors duration-150'
        )}
      >
        Sign Out
      </button>
    </div>
  )
}

function CustomContentDemo() {
  const customConfig: Partial<BiaxialExpandConfig> = {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout!,
      maxBottomHeight: 200,
    },
  }

  return (
    <BiaxialExpandV4.Root config={customConfig}>
      <BiaxialExpandV4.Backdrop />

      <BiaxialExpandV4.Content>
        <BiaxialExpandV4.Trigger>
          <CustomTrigger />
        </BiaxialExpandV4.Trigger>

        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <CustomBottomContent />
          </BiaxialExpandV4.BottomSlot>
        </BiaxialExpandV4.ContentWrapper>
      </BiaxialExpandV4.Content>
    </BiaxialExpandV4.Root>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function BiaxialCommandMenuV4Playground() {
  return (
    <main className="min-h-screen bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-primary">
            Biaxial Command Menu V4
          </h1>
          <p className="text-tertiary mt-2">
            Composable slot-based architecture with unified clip-path animation (V3 parity)
          </p>
        </div>

        {/* Demos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DemoSection
            title="Default (V3 Parity)"
            description="Search input with command menu - unified clip-path reveal"
          >
            <DefaultDemo />
          </DemoSection>

          <DemoSection
            title="With Top Section"
            description="Filter bar above the trigger"
          >
            <WithTopSectionDemo />
          </DemoSection>

          <DemoSection
            title="Action Button"
            description="Button trigger instead of search"
          >
            <ActionButtonDemo />
          </DemoSection>

          <DemoSection
            title="Custom Content"
            description="User profile with custom slots"
          >
            <CustomContentDemo />
          </DemoSection>
        </div>

        {/* API Reference */}
        <div className="mt-16 p-8 rounded-2xl bg-secondary border border-primary">
          <h2 className="text-lg font-semibold text-primary mb-4">
            V4 Architecture (Unified Model)
          </h2>

          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-medium text-primary mb-2">Component Structure</h3>
              <pre className="text-xs text-tertiary bg-tertiary p-4 rounded-lg overflow-x-auto">
{`<BiaxialExpandV4.Root>
  <BiaxialExpandV4.TopSlot />      {/* Optional - expands upward */}
  <BiaxialExpandV4.Backdrop />     {/* Visual layer */}
  <BiaxialExpandV4.Content>        {/* UNIFIED clip-path container */}
    <BiaxialExpandV4.Trigger />    {/* INSIDE Content */}
    <BiaxialExpandV4.ContentWrapper>
      <BiaxialExpandV4.BottomSlot />
    </BiaxialExpandV4.ContentWrapper>
  </BiaxialExpandV4.Content>
</BiaxialExpandV4.Root>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-primary mb-2">Key Difference from Old V4</h3>
              <p className="text-tertiary">
                Trigger is now <strong>INSIDE</strong> Content, not outside. This enables the
                unified clip-path animation where trigger and menu expand together as one
                rectangle, matching V3's smooth reveal behavior.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-primary mb-2">
                Built-in Variants
              </h3>
              <ul className="list-disc list-inside text-tertiary space-y-1">
                <li>
                  <code className="text-secondary">SearchInput</code> - Search trigger (default)
                </li>
                <li>
                  <code className="text-secondary">ActionButton</code> - Button trigger
                </li>
                <li>
                  <code className="text-secondary">FilterBar</code> - Top slot filters
                </li>
                <li>
                  <code className="text-secondary">MenuContent</code> - Command menu list
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-primary mb-2">Custom Content</h3>
              <p className="text-tertiary">
                Use <code className="text-secondary">useBiaxialExpand()</code>{' '}
                hook to access context in custom slot content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
