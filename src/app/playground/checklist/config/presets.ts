/**
 * Checklist Presets
 *
 * Default configuration and preset variations.
 */

import type { ChecklistConfig, ChecklistItem, ChecklistPresetMeta } from './types'

// ============================================================================
// Default Items
// ============================================================================

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'item-1', text: 'Renews at $29/mo', date: 'March 20', icon: 'checkmark' },
  { id: 'item-2', text: 'Credits roll over', icon: 'checkmark' },
  { id: 'item-3', text: 'Downgrade anytime', icon: 'checkmark' },
]

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_CHECKLIST_CONFIG: ChecklistConfig = {
  items: DEFAULT_ITEMS,
  itemGap: 'normal',
  textStyle: {
    size: 'sm',
    weight: 'medium',
    color: 'tertiary',
    opacity: 100,
  },
  iconStyle: {
    size: 'base',
    weight: 'duotone',
    color: 'tertiary',
    opacity: 80,
  },
  dateStyle: {
    size: 'sm',
    weight: 'normal',
    color: 'tertiary',
    opacity: 60,
  },
}

// ============================================================================
// Compact Preset
// ============================================================================

const COMPACT_ITEMS: ChecklistItem[] = [
  { id: 'item-1', text: '5 team members', icon: 'checkmark' },
  { id: 'item-2', text: '10GB storage', icon: 'checkmark' },
  { id: 'item-3', text: 'Email support', icon: 'checkmark' },
]

const COMPACT_CONFIG: ChecklistConfig = {
  items: COMPACT_ITEMS,
  itemGap: 'tight',
  textStyle: {
    size: 'sm',
    weight: 'normal',
    color: 'secondary',
    opacity: 100,
  },
  iconStyle: {
    size: 'sm',
    weight: 'stroke',
    color: 'secondary',
    opacity: 80,
  },
}

// ============================================================================
// Bold Preset
// ============================================================================

const BOLD_ITEMS: ChecklistItem[] = [
  { id: 'item-1', text: 'Enterprise security', icon: 'checkmark' },
  { id: 'item-2', text: 'Dedicated support', icon: 'star' },
  { id: 'item-3', text: 'Custom onboarding', icon: 'checkmark' },
  { id: 'item-4', text: 'SLA guarantee', icon: 'checkmark' },
]

const BOLD_CONFIG: ChecklistConfig = {
  items: BOLD_ITEMS,
  itemGap: 'relaxed',
  textStyle: {
    size: 'lg',
    weight: 'bold',
    color: 'primary',
    opacity: 100,
  },
  iconStyle: {
    size: 'lg',
    weight: 'solid',
    color: 'primary',
    opacity: 100,
  },
}

// ============================================================================
// Minimal Preset
// ============================================================================

const MINIMAL_ITEMS: ChecklistItem[] = [
  { id: 'item-1', text: 'Basic features included', icon: 'none' },
  { id: 'item-2', text: 'Community support', icon: 'none' },
  { id: 'item-3', text: 'Standard documentation', icon: 'none' },
  { id: 'item-4', text: 'Monthly updates', icon: 'none' },
]

const MINIMAL_CONFIG: ChecklistConfig = {
  items: MINIMAL_ITEMS,
  itemGap: 'normal',
  textStyle: {
    size: 'base',
    weight: 'normal',
    color: 'secondary',
    opacity: 90,
  },
  iconStyle: {
    size: 'base',
    weight: 'stroke',
    color: 'secondary',
    opacity: 100,
  },
}

// ============================================================================
// Accent Preset
// ============================================================================

const ACCENT_ITEMS: ChecklistItem[] = [
  { id: 'item-1', text: 'Real-time collaboration', icon: 'sparkles' },
  { id: 'item-2', text: 'Smart notifications', icon: 'sparkles' },
  { id: 'item-3', text: 'AI assistant', icon: 'sparkles' },
  { id: 'item-4', text: 'Workflow automation', icon: 'sparkles' },
  { id: 'item-5', text: 'Custom webhooks', icon: 'circle' },
]

const ACCENT_CONFIG: ChecklistConfig = {
  items: ACCENT_ITEMS,
  itemGap: 'normal',
  textStyle: {
    size: 'base',
    weight: 'semibold',
    color: 'primary',
    opacity: 100,
  },
  iconStyle: {
    size: 'base',
    weight: 'duotone',
    color: 'accent',
    opacity: 100,
  },
}

// ============================================================================
// Presets Array
// ============================================================================

export const CHECKLIST_PRESETS: ChecklistPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard checklist with stroke icons',
    data: DEFAULT_CHECKLIST_CONFIG,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Smaller text and tighter gaps',
    data: COMPACT_CONFIG,
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Large text with solid icons',
    data: BOLD_CONFIG,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'No icons, clean text only',
    data: MINIMAL_CONFIG,
  },
  {
    id: 'accent',
    name: 'Accent',
    description: 'Duotone icons with accent color',
    data: ACCENT_CONFIG,
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): ChecklistPresetMeta | undefined =>
  CHECKLIST_PRESETS.find((p) => p.id === id)

/**
 * Creates a new checklist item with a unique ID
 */
export function createNewItem(index: number): ChecklistItem {
  return {
    id: `item-${Date.now()}-${index}`,
    text: 'New item',
    icon: 'checkmark',
  }
}
