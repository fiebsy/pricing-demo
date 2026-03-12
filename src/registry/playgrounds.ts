/**
 * Playground Registry
 * ====================
 *
 * Central registry of playground routes for the modal design challenge.
 */

export type PlaygroundStatus = 'active'
export type PlaygroundCategory = 'component' | 'feature' | 'animation'

export interface PlaygroundEntry {
  name: string
  route: string
  category: PlaygroundCategory
  status: PlaygroundStatus
  description: string
}

export const activePlaygrounds: PlaygroundEntry[] = [
  {
    name: 'Modal',
    route: '/playground/modal',
    category: 'component',
    status: 'active',
    description: 'Base UI Dialog with Motion animations and configurable stages',
  },
  {
    name: 'Modal V2',
    route: '/playground/modal-v2',
    category: 'component',
    status: 'active',
    description: 'Refactored 5-phase modal with fluid button transitions',
  },
  {
    name: 'Pricing Select Menu',
    route: '/playground/pricing-select-menu',
    category: 'feature',
    status: 'active',
    description: 'Expandable tier selection with A/B variants',
  },
  {
    name: 'Button Fluid Layout',
    route: '/playground/button-fluid-layout',
    category: 'animation',
    status: 'active',
    description: 'Fluid width transitions with animated state changes',
  },
  {
    name: 'Coin Stack',
    route: '/playground/coin-stack',
    category: 'animation',
    status: 'active',
    description: 'Animated coin stack asset with spring transitions',
  },
  {
    name: 'Pricing Modal',
    route: '/playground/pricing',
    category: 'component',
    status: 'active',
    description: 'Flow-based pricing modal with ProCard and configurable content',
  },
  {
    name: 'Checklist',
    route: '/playground/checklist',
    category: 'component',
    status: 'active',
    description: 'Focused checklist component with full text and icon styling control',
  },
]

export const allPlaygrounds: PlaygroundEntry[] = [...activePlaygrounds]
