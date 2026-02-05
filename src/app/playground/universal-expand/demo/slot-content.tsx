/**
 * Universal Expand Playground - Demo Content
 *
 * Sample content components for each slot position.
 */

'use client'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import UserIcon from '@hugeicons-pro/core-stroke-rounded/UserIcon'
import File01Icon from '@hugeicons-pro/core-stroke-rounded/File01Icon'
import Folder01Icon from '@hugeicons-pro/core-stroke-rounded/Folder01Icon'
import Calendar01Icon from '@hugeicons-pro/core-stroke-rounded/Calendar01Icon'
import Mail01Icon from '@hugeicons-pro/core-stroke-rounded/Mail01Icon'
import FavouriteIcon from '@hugeicons-pro/core-stroke-rounded/FavouriteIcon'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'
import type { HugeIconData } from '@/components/ui/core/primitives/icon'
import { useUniversalExpand } from '@/components/ui/core/primitives/universal-expand'

// =============================================================================
// TRIGGER CONTENT
// =============================================================================

export function TriggerContent() {
  const { expanded, setExpanded } = useUniversalExpand()

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="flex items-center gap-3 w-full h-full px-4 text-left cursor-pointer"
    >
      <HugeIcon icon={Search01Icon} size={18} className="text-tertiary" />
      <span className="text-sm text-tertiary">Search commands...</span>
      <div className="ml-auto flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 text-xs font-medium text-quaternary bg-tertiary rounded">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 text-xs font-medium text-quaternary bg-tertiary rounded">
          K
        </kbd>
      </div>
    </button>
  )
}

// =============================================================================
// TOP SLOT CONTENT
// =============================================================================

const FILTER_OPTIONS = ['All', 'Recent', 'Starred', 'Shared']

export function TopSlotContent() {
  return (
    <div className="flex items-center gap-2 px-3 h-full">
      <HugeIcon icon={FilterIcon} size={14} className="text-tertiary" />
      {FILTER_OPTIONS.map((option, index) => (
        <button
          key={option}
          type="button"
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-full transition-colors',
            index === 0
              ? 'bg-brand-solid text-white'
              : 'text-secondary hover:bg-tertiary'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

// =============================================================================
// BOTTOM SLOT CONTENT
// =============================================================================

interface MenuItem {
  id: string
  label: string
  description?: string
  icon: HugeIconData
  shortcut?: string[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Go to Dashboard',
    description: 'View your main dashboard',
    icon: Home01Icon,
    shortcut: ['G', 'D'],
  },
  {
    id: 'profile',
    label: 'View Profile',
    description: 'Manage your account',
    icon: UserIcon,
    shortcut: ['G', 'P'],
  },
  {
    id: 'documents',
    label: 'Documents',
    description: 'Browse your files',
    icon: File01Icon,
    shortcut: ['G', 'F'],
  },
  {
    id: 'folders',
    label: 'Folders',
    description: 'Organize content',
    icon: Folder01Icon,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    description: 'View schedule',
    icon: Calendar01Icon,
    shortcut: ['G', 'C'],
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Check inbox',
    icon: Mail01Icon,
    shortcut: ['G', 'M'],
  },
  {
    id: 'starred',
    label: 'Starred Items',
    description: 'Quick access',
    icon: FavouriteIcon,
  },
  {
    id: 'recent',
    label: 'Recent Activity',
    description: 'View history',
    icon: Clock01Icon,
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Configure preferences',
    icon: Settings01Icon,
    shortcut: ['G', 'S'],
  },
]

export function BottomSlotContent() {
  return (
    <div className="flex flex-col py-2 h-full overflow-y-auto">
      {MENU_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cn(
            'flex items-center gap-3 px-3 py-2 mx-2 rounded-lg',
            'text-left transition-colors hover:bg-tertiary'
          )}
        >
          <HugeIcon icon={item.icon} size={18} className="text-tertiary" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-primary">{item.label}</div>
            {item.description && (
              <div className="text-xs text-tertiary truncate">
                {item.description}
              </div>
            )}
          </div>
          {item.shortcut && (
            <div className="flex items-center gap-1">
              {item.shortcut.map((key) => (
                <kbd
                  key={key}
                  className="px-1.5 py-0.5 text-xs font-medium text-quaternary bg-tertiary rounded"
                >
                  {key}
                </kbd>
              ))}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

// =============================================================================
// LEFT SLOT CONTENT
// =============================================================================

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home01Icon },
  { id: 'files', label: 'Files', icon: File01Icon },
  { id: 'calendar', label: 'Calendar', icon: Calendar01Icon },
  { id: 'mail', label: 'Mail', icon: Mail01Icon },
  { id: 'settings', label: 'Settings', icon: Settings01Icon },
]

export function LeftSlotContent() {
  return (
    <div className="flex flex-col py-2 h-full overflow-y-auto">
      <div className="px-3 py-2 text-xs font-medium text-tertiary uppercase tracking-wide">
        Navigation
      </div>
      {NAV_ITEMS.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={cn(
            'flex items-center gap-3 px-3 py-2 mx-2 rounded-lg',
            'text-left transition-colors',
            index === 0
              ? 'bg-brand-solid/10 text-brand-primary'
              : 'text-secondary hover:bg-tertiary'
          )}
        >
          <HugeIcon
            icon={item.icon}
            size={18}
            className={index === 0 ? 'text-brand-primary' : 'text-tertiary'}
          />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// =============================================================================
// RIGHT SLOT CONTENT
// =============================================================================

export function RightSlotContent() {
  return (
    <div className="flex flex-col py-3 px-3 gap-3 h-full overflow-y-auto">
      <div className="text-xs font-medium text-tertiary uppercase tracking-wide">
        Quick Actions
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-brand-solid text-white text-sm font-medium"
        >
          <HugeIcon icon={ArrowLeft01Icon} size={14} />
          Previous
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-tertiary text-secondary text-sm font-medium"
        >
          Next
          <HugeIcon icon={ArrowRight01Icon} size={14} />
        </button>
      </div>

      {/* Info card */}
      <div className="p-3 rounded-lg bg-tertiary">
        <div className="text-xs text-tertiary mb-1">Selected</div>
        <div className="text-sm font-medium text-primary">Dashboard</div>
        <div className="text-xs text-secondary mt-1">
          Your main overview panel
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-lg bg-tertiary text-center">
          <div className="text-lg font-semibold text-primary">12</div>
          <div className="text-xs text-tertiary">Items</div>
        </div>
        <div className="p-2 rounded-lg bg-tertiary text-center">
          <div className="text-lg font-semibold text-primary">3</div>
          <div className="text-xs text-tertiary">Active</div>
        </div>
      </div>
    </div>
  )
}
