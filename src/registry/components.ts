/**
 * Component Registry
 * ===================
 *
 * Central registry of all UI components in the design system.
 * Use this for documentation, tooling, and discoverability.
 */

export type ComponentStatus = 'stable' | 'experimental' | 'deprecated'
export type ComponentCategory = 'primitive' | 'input' | 'feedback' | 'feature' | 'pattern'

export interface ComponentEntry {
  name: string
  path: string
  category: ComponentCategory
  status: ComponentStatus
  description: string
  version?: string
  latestVersion?: string
  deprecatedDate?: string
  replacedBy?: string
}

/**
 * Core Primitives - Stable
 */
export const corePrimitives: ComponentEntry[] = [
  {
    name: 'Badge',
    path: '@/components/ui/core/primitives/badge',
    category: 'primitive',
    status: 'stable',
    description: 'Status and category indicators',
  },
  {
    name: 'Button',
    path: '@/components/ui/core/primitives/button',
    category: 'primitive',
    status: 'stable',
    description: 'Primary action button component',
  },
  {
    name: 'ButtonUtility',
    path: '@/components/ui/core/primitives/button-utility',
    category: 'primitive',
    status: 'stable',
    description: 'Utility button for secondary actions',
  },
  {
    name: 'Icon',
    path: '@/components/ui/core/primitives/icon',
    category: 'primitive',
    status: 'stable',
    description: 'Icon wrapper for Hugeicons',
  },
  {
    name: 'Accordion',
    path: '@/components/ui/core/primitives/accordion',
    category: 'primitive',
    status: 'stable',
    description: 'Expandable/collapsible content sections',
  },
  {
    name: 'Menu',
    path: '@/components/ui/core/primitives/menu',
    category: 'primitive',
    status: 'stable',
    description: 'Dropdown menu component',
  },
]

/**
 * Core Inputs - Stable
 */
export const coreInputs: ComponentEntry[] = [
  {
    name: 'Checkbox',
    path: '@/components/ui/core/inputs/checkbox',
    category: 'input',
    status: 'stable',
    description: 'Checkbox input component',
  },
  {
    name: 'Input',
    path: '@/components/ui/core/inputs/input',
    category: 'input',
    status: 'stable',
    description: 'Text input component',
  },
  {
    name: 'Select',
    path: '@/components/ui/core/inputs/select',
    category: 'input',
    status: 'stable',
    description: 'Dropdown select component',
  },
]

/**
 * Core Feedback - Stable
 */
export const coreFeedback: ComponentEntry[] = [
  {
    name: 'Tooltip',
    path: '@/components/ui/core/feedback/tooltip',
    category: 'feedback',
    status: 'stable',
    description: 'Contextual information tooltip',
  },
  {
    name: 'Skeleton',
    path: '@/components/ui/core/feedback/skeleton',
    category: 'feedback',
    status: 'stable',
    description: 'Loading placeholder component',
  },
  {
    name: 'ClawbackTimer',
    path: '@/components/ui/core/feedback/clawback-timer',
    category: 'feedback',
    status: 'stable',
    description: 'Timer countdown component',
  },
]

/**
 * Feature Components - Stable
 */
export const featureComponents: ComponentEntry[] = [
  {
    name: 'DisplayCard',
    path: '@/components/ui/features/display-card',
    category: 'feature',
    status: 'stable',
    description: 'Content display card component',
  },
  {
    name: 'ExpandingSearch',
    path: '@/components/ui/features/expanding-search',
    category: 'feature',
    status: 'stable',
    description: 'Animated expanding search input',
  },
  {
    name: 'FeaturedIcon',
    path: '@/components/ui/features/featured-icon',
    category: 'feature',
    status: 'stable',
    description: 'Highlighted icon display',
  },
  {
    name: 'MetricCard',
    path: '@/components/ui/features/metric-card',
    category: 'feature',
    status: 'stable',
    description: 'Dashboard metric display card',
  },
  {
    name: 'OrderDetails',
    path: '@/components/ui/features/order-details',
    category: 'feature',
    status: 'stable',
    description: 'Order information display',
  },
  {
    name: 'SuccessToast',
    path: '@/components/ui/features/success-toast',
    category: 'feature',
    status: 'stable',
    description: 'Success notification toast',
  },
]

/**
 * UI Patterns - Stable
 */
export const patternComponents: ComponentEntry[] = [
  {
    name: 'ControlPanel',
    path: '@/components/ui/patterns/control-panel',
    category: 'pattern',
    status: 'stable',
    description: 'Unified control panel for playground configuration',
  },
  {
    name: 'Filter',
    path: '@/components/ui/patterns/filter',
    category: 'pattern',
    status: 'stable',
    description: 'Comprehensive filtering system with chips, menus, and selects',
  },
  {
    name: 'StickyDataTable',
    path: '@/components/ui/patterns/data-table/sticky-data-table',
    category: 'pattern',
    status: 'stable',
    description: 'Advanced data table with sticky headers and columns',
  },
]

/**
 * Experimental Components - WIP
 */
export const experimentalComponents: ComponentEntry[] = [
  {
    name: 'CommandMenu',
    path: '@/components/ui/experimental/command-menu',
    category: 'pattern',
    status: 'experimental',
    description: 'Biaxial command menu with keyboard navigation',
    latestVersion: 'v4',
  },
  {
    name: 'ButtonAnimation',
    path: '@/components/ui/experimental/button-animation',
    category: 'primitive',
    status: 'experimental',
    description: 'Animated button with interaction effects',
    latestVersion: 'v2',
  },
]

/**
 * All Components
 */
export const allComponents: ComponentEntry[] = [
  ...corePrimitives,
  ...coreInputs,
  ...coreFeedback,
  ...featureComponents,
  ...patternComponents,
  ...experimentalComponents,
]

/**
 * Get components by status
 */
export function getComponentsByStatus(status: ComponentStatus): ComponentEntry[] {
  return allComponents.filter(c => c.status === status)
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: ComponentCategory): ComponentEntry[] {
  return allComponents.filter(c => c.category === category)
}

/**
 * Get component by name
 */
export function getComponent(name: string): ComponentEntry | undefined {
  return allComponents.find(c => c.name.toLowerCase() === name.toLowerCase())
}
