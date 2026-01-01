'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  FolderMinusIcon,
  FolderOpenIcon,
  Search01Icon,
  Home01Icon,
  Settings01Icon,
  Settings02Icon,
  UserIcon,
  StarIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  InformationCircleIcon,
  MoreHorizontalCircle01Icon,
  Edit02Icon,
  Copy01Icon,
  Delete02Icon,
  Logout01Icon,
} from '@hugeicons-pro/core-stroke-rounded'

import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import { Accordion, ACCORDION_PRESETS } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/skwircle/components/badge'
import { Button } from '@/components/ui/skwircle/components/button'
import { SearchInput } from '@/components/ui/skwircle/components/search-input'
import { Skwircle } from '@/components/ui/skwircle'
import { ExpandingSearch } from '@/components/ui/expanding-search'
import {
  FilterChip,
  ExpandingFilterChip,
  AddFilterMenu,
  DEFAULT_FILTER_STYLING_CONFIG,
  DEFAULT_FILTER_APPEARANCE,
  DEFAULT_CHIP_STYLE,
  CHIP_STYLE_PRESETS,
  getChipStylePreset,
} from '@/components/ui/filter'
import {
  RevealMenu,
  DEFAULT_APPEARANCE,
  type MenuItem,
} from '@/components/ui/menu'

// --- Types ---

type SectionId = 'skwircle-library' | 'accordion' | 'interactive'

interface ComponentItem {
  id: string
  name: string
  description: string
  section: SectionId
}

// --- Section Metadata ---

const SECTIONS: { id: SectionId; label: string; description: string }[] = [
  { id: 'skwircle-library', label: 'Skwircle', description: 'iOS-style squircle components' },
  { id: 'accordion', label: 'Accordion', description: 'Expandable sections with animated L-shaped lines' },
  { id: 'interactive', label: 'Interactive', description: 'Animated expanding components' },
]

// --- Component Registry ---

const COMPONENTS: ComponentItem[] = [
  // SKWIRCLE LIBRARY
  { id: 'skwircle', name: 'Skwircle', description: 'iOS-style superellipse container with SVG borders', section: 'skwircle-library' },
  { id: 'card', name: 'Card', description: 'Container component with elevation and padding', section: 'skwircle-library' },
  { id: 'button', name: 'Button', description: 'Interactive button with multiple hierarchies', section: 'skwircle-library' },
  { id: 'badge', name: 'Badge', description: 'Status indicators and labels', section: 'skwircle-library' },
  { id: 'search-input', name: 'SearchInput', description: 'Skwircle-based search field with clear button', section: 'skwircle-library' },

  // ACCORDION
  { id: 'accordion', name: 'Accordion', description: 'Expandable sections with animated L-shaped lines', section: 'accordion' },

  // INTERACTIVE
  { id: 'expanding-search', name: 'ExpandingSearch', description: 'Search input that expands from a compact icon state', section: 'interactive' },
  { id: 'expanding-filter-chip', name: 'ExpandingFilterChip', description: 'Filter chip that expands to reveal value and close button', section: 'interactive' },
  { id: 'add-filter-menu', name: 'AddFilterMenu', description: 'Filter selection dropdown with submenu navigation', section: 'interactive' },
  { id: 'reveal-menu', name: 'RevealMenu', description: 'Animated dropdown menu with reveal animation', section: 'interactive' },
]

// --- Button Utility ---

function ButtonUtility({
  icon,
  onClick,
  tooltip,
}: {
  icon: React.ReactNode
  onClick: () => void
  tooltip?: string
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className="hover:bg-secondary_hover flex h-7 w-7 items-center justify-center rounded-md transition-colors"
    >
      {icon}
    </button>
  )
}

// --- Component Showcase Sections ---

function SkwircleShowcase() {
  const roundnessOptions = ['none', 'subtle', 'moderate', 'rounded', 'pill'] as const

  return (
    <div className="space-y-8">
      {/* Roundness Variants */}
      <div>
        <h4 className="text-secondary mb-4 text-sm font-medium">Roundness Variants</h4>
        <div className="grid grid-cols-5 gap-6">
          {roundnessOptions.map((roundness) => (
            <div key={roundness} className="flex flex-col items-center gap-2">
              <Skwircle
                backgroundColor="background-secondary"
                borderColor="border-secondary"
                borderWidth={1}
                roundness={roundness}
                className="flex h-16 w-16 items-center justify-center"
              >
                <span className="sr-only">{roundness}</span>
              </Skwircle>
              <span className="text-tertiary text-xs">{roundness}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Elevation Variants */}
      <div>
        <h4 className="text-secondary mb-4 text-sm font-medium">Elevation Variants</h4>
        <div className="grid grid-cols-5 gap-6">
          {(['none', 'xs', 'sm'] as const).map((elevation) => (
            <div key={elevation} className="flex flex-col items-center gap-2">
              <Skwircle
                backgroundColor="background-secondary"
                borderColor="border-secondary"
                borderWidth={1}
                roundness="rounded"
                elevation={elevation}
                className="flex h-16 w-16 items-center justify-center"
              >
                <span className="sr-only">{elevation}</span>
              </Skwircle>
              <span className="text-tertiary text-xs">{elevation}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CardShowcase() {
  return (
    <div className="space-y-6">
      {/* Basic Cards */}
      <div>
        <h4 className="text-secondary mb-4 text-sm font-medium">Basic Card</h4>
        <div className="flex flex-wrap gap-4">
          <Skwircle
            variant="card"
            elevation="xs"
            className="w-64"
          >
            <div className="p-4">
              <h5 className="text-primary text-sm font-medium">Card Title</h5>
              <p className="text-tertiary mt-1 text-xs">This is a basic card with some content inside.</p>
            </div>
          </Skwircle>
        </div>
      </div>

      {/* Card Elevations */}
      <div>
        <h4 className="text-secondary mb-4 text-sm font-medium">Elevations</h4>
        <div className="flex flex-wrap gap-4">
          {(['none', 'xs', 'sm'] as const).map((elevation) => (
            <Skwircle
              key={elevation}
              variant="card"
              elevation={elevation}
              className="w-40"
            >
              <div className="p-4 text-center">
                <span className="text-secondary text-xs font-medium">{elevation}</span>
              </div>
            </Skwircle>
          ))}
        </div>
      </div>

      {/* Card with Content */}
      <div>
        <h4 className="text-secondary mb-4 text-sm font-medium">With Rich Content</h4>
        <Skwircle
          variant="card"
          elevation="sm"
          className="max-w-sm"
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Skwircle
                variant="avatar"
                roundness="rounded"
                backgroundColor="background-brand-section"
                borderWidth={0}
                className="h-10 w-10 flex items-center justify-center"
              >
                <HugeIcon icon={UserIcon} size={20} className="text-brand-secondary" />
              </Skwircle>
              <div>
                <h5 className="text-primary text-sm font-medium">John Doe</h5>
                <p className="text-tertiary text-xs">Product Designer</p>
              </div>
            </div>
            <p className="text-secondary text-sm">
              Building beautiful interfaces with Skwircle components.
            </p>
          </div>
        </Skwircle>
      </div>
    </div>
  )
}

function ButtonShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Hierarchy</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button hierarchy="primary">Primary</Button>
          <Button hierarchy="secondary">Secondary</Button>
          <Button hierarchy="tertiary">Tertiary</Button>
          <Button hierarchy="link-gray">Link</Button>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Sizes</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">XL</Button>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">With Icons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button.WithIcon icon={Home01Icon} hierarchy="primary">
            Home
          </Button.WithIcon>
          <Button.WithIcon icon={Settings01Icon} hierarchy="secondary">
            Settings
          </Button.WithIcon>
          <Button.Icon icon={UserIcon} hierarchy="tertiary" ariaLabel="User" />
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">States</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>
    </div>
  )
}

function SearchInputShowcase() {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Sizes</h4>
        <div className="flex flex-col gap-3 max-w-sm">
          <SearchInput size="sm" placeholder="Small search..." value={value} onChange={handleChange} />
          <SearchInput size="md" placeholder="Medium search..." value={value} onChange={handleChange} />
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Interactive</h4>
        <div className="max-w-sm">
          <SearchInput
            size="md"
            placeholder="Type to search..."
            value={value}
            onChange={handleChange}
            onClear={handleClear}
          />
          {value && <p className="text-tertiary mt-2 text-xs">Value: "{value}"</p>}
        </div>
      </div>
    </div>
  )
}

function BadgeShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Colors</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="gray">Gray</Badge>
          <Badge color="brand">Brand</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="indigo">Indigo</Badge>
          <Badge color="purple">Purple</Badge>
          <Badge color="orange">Orange</Badge>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Sizes</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Types</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Badge type="badge" color="brand">Badge</Badge>
          <Badge type="pill" color="brand">Pill</Badge>
          <Badge type="modern" color="brand">Modern</Badge>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">With Icons</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Badge.WithIcon icon={CheckmarkCircle02Icon} color="success">
            Success
          </Badge.WithIcon>
          <Badge.WithIcon icon={Alert02Icon} color="warning">
            Warning
          </Badge.WithIcon>
          <Badge.WithIcon icon={InformationCircleIcon} color="blue">
            Info
          </Badge.WithIcon>
          <Badge.Icon icon={StarIcon} color="brand" />
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">With Dot</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Badge.WithDot dotColor="success">Online</Badge.WithDot>
          <Badge.WithDot dotColor="warning">Away</Badge.WithDot>
          <Badge.WithDot dotColor="error">Offline</Badge.WithDot>
        </div>
      </div>
    </div>
  )
}

function AccordionShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Default Preset</h4>
        <div className="bg-secondary rounded-lg p-4 max-w-xs">
          <Accordion
            label="Navigation"
            triggerConfig={ACCORDION_PRESETS.default.trigger}
            itemConfig={ACCORDION_PRESETS.default.item}
            defaultExpanded
          >
            <Accordion.Item href="#">Dashboard</Accordion.Item>
            <Accordion.Item href="#">Settings</Accordion.Item>
            <Accordion.Item href="#">Profile</Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Compact Preset</h4>
        <div className="bg-secondary rounded-lg p-4 max-w-xs">
          <Accordion
            label="Files"
            triggerConfig={ACCORDION_PRESETS.compact.trigger}
            itemConfig={ACCORDION_PRESETS.compact.item}
            defaultExpanded
          >
            <Accordion.Item href="#">document.pdf</Accordion.Item>
            <Accordion.Item href="#">image.png</Accordion.Item>
            <Accordion.Item href="#">data.json</Accordion.Item>
            <Accordion.Item href="#">config.ts</Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Comfortable Preset</h4>
        <div className="bg-secondary rounded-lg p-4 max-w-xs">
          <Accordion
            label="Features"
            triggerConfig={ACCORDION_PRESETS.comfortable.trigger}
            itemConfig={ACCORDION_PRESETS.comfortable.item}
            defaultExpanded
          >
            <Accordion.Item href="#">Analytics</Accordion.Item>
            <Accordion.Item href="#">Integrations</Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

function ExpandingSearchShowcase() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Default</h4>
        <div className="flex items-center gap-4">
          <ExpandingSearch
            placeholder="Search..."
            value={searchValue}
            onChange={setSearchValue}
            className="shine-1"
          />
          {searchValue && (
            <span className="text-tertiary text-xs">Value: "{searchValue}"</span>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Custom Sizes</h4>
        <div className="flex flex-col gap-3">
          <ExpandingSearch
            placeholder="Compact (32px)"
            collapsedWidth={32}
            expandedWidth={200}
            height={32}
            iconSize={16}
            className="shine-1"
          />
          <ExpandingSearch
            placeholder="Default (40px)"
            collapsedWidth={40}
            expandedWidth={240}
            height={40}
            className="shine-1"
          />
          <ExpandingSearch
            placeholder="Large (48px)"
            collapsedWidth={48}
            expandedWidth={280}
            height={48}
            iconSize={22}
            className="shine-1"
          />
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Animation Modes</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <ExpandingSearch placeholder="Immediate" revealMode="immediate" className="shine-1" />
            <span className="text-quaternary text-xs">Immediate</span>
          </div>
          <div className="flex flex-col gap-1">
            <ExpandingSearch placeholder="Fade" revealMode="fade" className="shine-1" />
            <span className="text-quaternary text-xs">Fade</span>
          </div>
          <div className="flex flex-col gap-1">
            <ExpandingSearch placeholder="Sync" revealMode="sync" className="shine-1" />
            <span className="text-quaternary text-xs">Sync</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpandingFilterChipShowcase() {
  const [chips, setChips] = useState([
    { id: 1, label: 'Status', value: 'Active', icon: CheckmarkCircle02Icon },
    { id: 2, label: 'Category', value: 'Sales', icon: StarIcon },
  ])

  const removeChip = (id: number) => {
    setChips(chips.filter(c => c.id !== id))
  }

  const resetChips = () => {
    setChips([
      { id: 1, label: 'Status', value: 'Active', icon: CheckmarkCircle02Icon },
      { id: 2, label: 'Category', value: 'Sales', icon: StarIcon },
    ])
  }

  return (
    <div className="space-y-6">
      {/* FilterChip - Recommended Usage */}
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">FilterChip (Recommended)</h4>
        <p className="text-tertiary mb-2 text-xs">Uses icons by default with all styling applied automatically</p>
        <div className="flex flex-wrap items-center gap-2">
          {chips.map(chip => (
            <FilterChip
              key={chip.id}
              icon={chip.icon}
              value={chip.value}
              onRemove={() => removeChip(chip.id)}
            />
          ))}
          {chips.length === 0 && (
            <button
              onClick={resetChips}
              className="text-brand-primary text-sm hover:underline"
            >
              Reset chips
            </button>
          )}
        </div>
      </div>

      {/* Small Preset */}
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Small Preset</h4>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            preset="small"
            icon={CheckmarkCircle02Icon}
            value="Active"
            onRemove={() => {}}
          />
          <FilterChip
            preset="small"
            icon={StarIcon}
            value="Featured"
            onRemove={() => {}}
          />
        </div>
      </div>

      {/* With Labels (no icons) */}
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">With Labels (no icons)</h4>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="Status"
            value="Active"
            chipConfig={{ useIcon: false }}
            onRemove={() => {}}
          />
          <FilterChip
            label="Category"
            value="Sales"
            chipConfig={{ useIcon: false }}
            onRemove={() => {}}
          />
        </div>
      </div>

      {/* All Sizes */}
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">All Sizes</h4>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip icon={UserIcon} value="XS" chipConfig={{ size: 'xs' }} />
          <FilterChip icon={UserIcon} value="SM" chipConfig={{ size: 'sm' }} />
          <FilterChip icon={UserIcon} value="Default" />
          <FilterChip icon={UserIcon} value="MD" chipConfig={{ size: 'md' }} />
          <FilterChip icon={UserIcon} value="LG" chipConfig={{ size: 'lg' }} />
        </div>
      </div>

      {/* With Icons (default behavior) */}
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">With Icons (default)</h4>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            icon={CheckmarkCircle02Icon}
            value="Active"
            onRemove={() => {}}
          />
          <FilterChip
            icon={StarIcon}
            value="Featured"
            onRemove={() => {}}
          />
          <FilterChip
            icon={UserIcon}
            value="John Doe"
            onRemove={() => {}}
          />
        </div>
      </div>

      {/* Click to Expand Animation */}
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Click to Expand</h4>
        <p className="text-tertiary mb-2 text-xs">Click the collapsed chips to expand them</p>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip icon={CheckmarkCircle02Icon} value="Pending" defaultExpanded={false} />
          <FilterChip icon={StarIcon} value="Invoice" defaultExpanded={false} />
          <FilterChip icon={Home01Icon} value="Home" defaultExpanded={false} />
        </div>
      </div>
    </div>
  )
}

function AddFilterMenuShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Default Filter Menu</h4>
        <div className="flex items-center gap-4">
          <AddFilterMenu
            config={DEFAULT_FILTER_STYLING_CONFIG}
            appearance={DEFAULT_FILTER_APPEARANCE}
            onFilterSelect={(filterId) => setSelectedFilter(filterId)}
          />
          {selectedFilter && (
            <span className="text-tertiary text-sm">
              Selected: <span className="text-primary font-medium">{selectedFilter}</span>
            </span>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Features</h4>
        <ul className="text-tertiary space-y-1 text-sm">
          <li>• Animated reveal on open</li>
          <li>• Submenu navigation with slide transitions</li>
          <li>• Height animation between menu levels</li>
          <li>• Opacity crossfade effects</li>
        </ul>
      </div>
    </div>
  )
}

function RevealMenuShowcase() {
  const menuItems: MenuItem[] = [
    { id: 'edit', label: 'Edit', icon: Edit02Icon, onClick: () => console.log('Edit') },
    { id: 'copy', label: 'Copy', icon: Copy01Icon, onClick: () => console.log('Copy') },
    { id: 'separator-1', type: 'separator' },
    {
      id: 'settings',
      type: 'submenu',
      label: 'Settings',
      icon: Settings02Icon,
      items: [
        { id: 'profile', label: 'Profile', icon: UserIcon, onClick: () => console.log('Profile') },
        { id: 'logout', label: 'Logout', icon: Logout01Icon, onClick: () => console.log('Logout') },
      ],
    },
    { id: 'separator-2', type: 'separator' },
    { id: 'delete', label: 'Delete', icon: Delete02Icon, className: 'text-error-primary', onClick: () => console.log('Delete') },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Icon Trigger Menu</h4>
        <div className="flex items-center gap-4">
          <RevealMenu
            trigger={{ icon: MoreHorizontalCircle01Icon }}
            items={menuItems}
            appearance={DEFAULT_APPEARANCE}
          />
          <span className="text-tertiary text-xs">Click the icon to open menu</span>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Positions</h4>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <RevealMenu
              trigger={{ icon: MoreHorizontalCircle01Icon }}
              items={menuItems.slice(0, 3)}
              side="bottom"
              align="start"
              appearance={DEFAULT_APPEARANCE}
            />
            <span className="text-quaternary text-xs">Bottom-Start</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <RevealMenu
              trigger={{ icon: MoreHorizontalCircle01Icon }}
              items={menuItems.slice(0, 3)}
              side="bottom"
              align="end"
              appearance={DEFAULT_APPEARANCE}
            />
            <span className="text-quaternary text-xs">Bottom-End</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <RevealMenu
              trigger={{ icon: MoreHorizontalCircle01Icon }}
              items={menuItems.slice(0, 3)}
              side="right"
              align="start"
              appearance={DEFAULT_APPEARANCE}
            />
            <span className="text-quaternary text-xs">Right-Start</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-secondary mb-3 text-sm font-medium">Features</h4>
        <ul className="text-tertiary space-y-1 text-sm">
          <li>• Scale + opacity reveal animation</li>
          <li>• Submenu navigation with back button</li>
          <li>• Keyboard navigation support</li>
          <li>• Customizable appearance (shine, shadow, radius)</li>
        </ul>
      </div>
    </div>
  )
}

// --- Component Renderer ---

function ComponentShowcase({ componentId }: { componentId: string }) {
  switch (componentId) {
    case 'skwircle':
      return <SkwircleShowcase />
    case 'card':
      return <CardShowcase />
    case 'button':
      return <ButtonShowcase />
    case 'search-input':
      return <SearchInputShowcase />
    case 'badge':
      return <BadgeShowcase />
    case 'accordion':
      return <AccordionShowcase />
    case 'expanding-search':
      return <ExpandingSearchShowcase />
    case 'expanding-filter-chip':
      return <ExpandingFilterChipShowcase />
    case 'add-filter-menu':
      return <AddFilterMenuShowcase />
    case 'reveal-menu':
      return <RevealMenuShowcase />
    default:
      return <p className="text-tertiary">No showcase available</p>
  }
}

// --- Page Component ---

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState<SectionId>('skwircle-library')
  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(
    () => new Set(SECTIONS.map((s) => s.id))
  )
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const navContainerRef = useRef<HTMLElement | null>(null)
  const [indicatorY, setIndicatorY] = useState(0)

  const toggleSection = (sectionId: SectionId, expanded: boolean) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (expanded) {
        next.add(sectionId)
      } else {
        next.delete(sectionId)
      }
      return next
    })
  }

  // Fast scroll helper (150ms)
  const fastScrollTo = (element: HTMLElement | null, block: ScrollLogicalPosition = 'start') => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    const offset = block === 'center' ? window.innerHeight / 2 - rect.height / 2 : 0
    const targetY = window.scrollY + rect.top - offset
    const startY = window.scrollY
    const diff = targetY - startY
    const duration = 150
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      window.scrollTo(0, startY + diff * easeOut)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of SECTIONS) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update indicator position when active section changes
  useEffect(() => {
    const navItem = navItemRefs.current[activeSection]
    const navContainer = navContainerRef.current
    if (navItem && navContainer) {
      const containerRect = navContainer.getBoundingClientRect()
      const itemRect = navItem.getBoundingClientRect()
      setIndicatorY(itemRect.top - containerRect.top + 4)
    }
  }, [activeSection, expandedSections])

  // Group components by section
  const componentsBySection = useMemo(() => {
    const grouped: Record<SectionId, ComponentItem[]> = {
      'skwircle-library': [],
      'accordion': [],
      'interactive': [],
    }

    COMPONENTS.forEach((component) => {
      grouped[component.section].push(component)
    })

    return grouped
  }, [])

  // Filter components by search
  const filteredComponentsBySection = useMemo(() => {
    if (!searchQuery.trim()) return componentsBySection

    const query = searchQuery.toLowerCase()
    const filtered: Record<SectionId, ComponentItem[]> = {
      'skwircle-library': [],
      'accordion': [],
      'interactive': [],
    }

    Object.entries(componentsBySection).forEach(([section, components]) => {
      filtered[section as SectionId] = components.filter((c) => {
        const searchFields = [c.name, c.description, c.id]
        return searchFields.some((field) => field?.toLowerCase().includes(query))
      })
    })

    return filtered
  }, [searchQuery, componentsBySection])

  // Total filtered count
  const totalCount = useMemo(() => {
    return Object.values(filteredComponentsBySection).reduce((sum, components) => sum + components.length, 0)
  }, [filteredComponentsBySection])

  return (
    <div className="bg-secondary flex min-h-screen justify-center">
      <div className="flex w-full max-w-[1000px]">
      {/* Sticky Sidebar Navigation */}
      <aside className="bg-secondary border-secondary sticky top-0 h-screen w-[260px] shrink-0 overflow-y-auto border-r py-10 pr-6 pl-6">
        {/* Sidebar Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-primary text-[15px] font-medium">Skwircle</h1>
            <p className="text-quaternary mt-1 text-[13px]">Component Library</p>
          </div>
          <ButtonUtility
            icon={
              <HugeIcon
                icon={expandedSections.size === SECTIONS.length ? FolderMinusIcon : FolderOpenIcon}
                size={14}
                strokeWidth={2}
                className="text-tertiary"
              />
            }
            onClick={() =>
              setExpandedSections(
                expandedSections.size === SECTIONS.length ? new Set() : new Set(SECTIONS.map((s) => s.id))
              )
            }
            tooltip={expandedSections.size === SECTIONS.length ? 'Collapse all' : 'Expand all'}
          />
        </div>

        {/* Sidebar Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <HugeIcon icon={Search01Icon} size={16} className="text-quaternary" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-secondary bg-secondary_subtle text-primary placeholder:text-quaternary focus:border-brand-primary focus:ring-brand-primary w-full rounded-lg border py-2 pr-3 pl-9 text-[13px] focus:ring-1 focus:outline-none"
            />
          </div>
        </div>

        <nav ref={navContainerRef} className="relative -ml-2 flex flex-col gap-5">
          {/* Sliding indicator - positioned relative to nav, accounts for -ml-2 offset */}
          <div
            className="absolute -left-1 h-5 w-1 rounded-full bg-brand-secondary shine-3 transition-transform duration-150 ease-out"
            style={{ transform: `translateY(${indicatorY}px)` }}
          />
          {SECTIONS.map((section) => {
            const components = filteredComponentsBySection[section.id]
            if (components.length === 0) return null

            return (
              <div
                key={section.id}
                ref={(el) => {
                  navItemRefs.current[section.id] = el
                }}
              >
                <Accordion
                  label={section.label}
                  expanded={expandedSections.has(section.id)}
                  onExpandedChange={(expanded) => toggleSection(section.id, expanded)}
                  triggerConfig={ACCORDION_PRESETS.compact.trigger}
                  itemConfig={ACCORDION_PRESETS.compact.item}
                  toggleOnChevronOnly
                  onLabelClick={() => {
                    fastScrollTo(document.getElementById(section.id), 'start')
                  }}
                >
                  {components.map((component) => (
                    <Accordion.Item
                      key={component.id}
                      href={`#${component.id}`}
                      onClick={() => {
                        fastScrollTo(document.getElementById(component.id), 'center')
                      }}
                    >
                      <span className="block truncate text-[13px]">{component.name}</span>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            )
          })}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 px-12 py-10">
        {/* Page Header */}
        <header className="mb-16">
          <h1 className="text-primary text-xl font-medium tracking-tight">Skwircle Components</h1>
          <p className="text-tertiary mt-2 text-[15px]">
            Interactive showcase of Skwircle UI components.
          </p>
        </header>

        {/* Sections */}
        {SECTIONS.map((section) => {
          const components = filteredComponentsBySection[section.id]
          if (components.length === 0) return null

          return (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => {
                sectionRefs.current[section.id] = el
              }}
              className="mb-20 scroll-mt-8"
            >
              {/* Section Header */}
              <div className="mb-8 pb-3 border-b border-secondary">
                <h2 className="text-primary text-xl font-medium">{section.label}</h2>
                <p className="text-quaternary mt-1.5 text-[13px]">{section.description}</p>
              </div>

              {/* Components List */}
              <div className="space-y-10">
                {components.map((component) => (
                  <div
                    key={component.id}
                    id={component.id}
                    className="scroll-mt-8"
                  >
                    {/* Component Header */}
                    <div className="mb-4">
                      <h3 className="text-primary text-[15px] font-medium">{component.name}</h3>
                      <p className="text-tertiary mt-1 text-[13px]">{component.description}</p>
                    </div>

                    {/* Component Showcase */}
                    <div className="bg-primary border-secondary rounded-xl border p-6">
                      <ComponentShowcase componentId={component.id} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Empty State */}
        {totalCount === 0 && (
          <div className="py-20 text-center">
            <p className="text-tertiary text-[15px]">No components found matching your search.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-brand-primary mt-4 text-[13px] font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

      </main>
      </div>
    </div>
  )
}
