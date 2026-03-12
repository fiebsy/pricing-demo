/**
 * Component Registry
 * ===================
 *
 * Central registry of UI components used in the modal design challenge.
 */

export type ComponentStatus = 'stable' | 'experimental' | 'deprecated'
export type ComponentCategory = 'primitive' | 'feature' | 'pattern'

export interface ComponentEntry {
  name: string
  path: string
  category: ComponentCategory
  status: ComponentStatus
  description: string
}

/**
 * Core Primitives
 */
export const corePrimitives: ComponentEntry[] = [
  {
    name: 'Button',
    path: '@/components/ui/core/primitives/button',
    category: 'primitive',
    status: 'stable',
    description: 'Primary action button component',
  },
  {
    name: 'Icon',
    path: '@/components/ui/core/primitives/icon',
    category: 'primitive',
    status: 'stable',
    description: 'Icon wrapper for Hugeicons',
  },
  {
    name: 'FluidButtonGroup',
    path: '@/components/ui/core/primitives/fluid-button-group',
    category: 'primitive',
    status: 'stable',
    description: 'Fluid width button transitions',
  },
]

/**
 * Feature Components
 */
export const featureComponents: ComponentEntry[] = [
  {
    name: 'PricingSelectMenu',
    path: '@/components/ui/features/pricing-select-menu',
    category: 'feature',
    status: 'stable',
    description: 'Expandable pricing tier selection menu',
  },
]

/**
 * UI Patterns
 */
export const patternComponents: ComponentEntry[] = [
  {
    name: 'ControlPanel',
    path: '@/components/ui/patterns/control-panel',
    category: 'pattern',
    status: 'stable',
    description: 'Unified control panel for playground configuration',
  },
]

/**
 * All Components
 */
export const allComponents: ComponentEntry[] = [
  ...corePrimitives,
  ...featureComponents,
  ...patternComponents,
]
