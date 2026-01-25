/**
 * Playground Registry
 * ====================
 *
 * Central registry of all playground routes for testing and development.
 * Playgrounds are organized by component and status.
 */

export type PlaygroundStatus = 'active' | 'experimental' | 'archived'
export type PlaygroundCategory = 'component' | 'feature' | 'pattern' | 'animation' | 'layout'

export interface PlaygroundEntry {
  name: string
  route: string
  category: PlaygroundCategory
  status: PlaygroundStatus
  description: string
  component?: string
  version?: string
  latestVersion?: string
}

/**
 * Active Playgrounds - Production testing
 */
export const activePlaygrounds: PlaygroundEntry[] = [
  // Command Menu Series
  {
    name: 'Biaxial Command Menu v4',
    route: '/playground/biaxial-command-menu-v4',
    category: 'pattern',
    status: 'active',
    description: 'Latest biaxial command menu implementation',
    component: 'CommandMenu',
    version: 'v4',
    latestVersion: 'v4',
  },
  {
    name: 'Question Command Menu v4 Flow',
    route: '/playground/question-command-menu-v4-flow',
    category: 'pattern',
    status: 'active',
    description: 'Question selection flow with command menu',
    component: 'CommandMenu',
    version: 'v4-flow',
  },

  // Button Animation Series
  {
    name: 'Button Animation v2',
    route: '/playground/button-animation-v2',
    category: 'animation',
    status: 'active',
    description: 'Latest button animation implementation',
    component: 'ButtonAnimation',
    version: 'v2',
    latestVersion: 'v2',
  },
  {
    name: 'Button Audit',
    route: '/playground/button-audit',
    category: 'component',
    status: 'active',
    description: 'Button component style audit and comparison',
    component: 'Button',
  },

  // Feature Playgrounds
  {
    name: 'Edit Questions',
    route: '/playground/edit-questions',
    category: 'feature',
    status: 'active',
    description: 'Question editing interface playground',
  },
  {
    name: 'Filter Chip Motion',
    route: '/playground/filter-chip-motion',
    category: 'animation',
    status: 'active',
    description: 'Animated filter chip interactions',
    component: 'Filter',
  },
  {
    name: 'Quick Fix Modal',
    route: '/playground/quick-fix-modal',
    category: 'feature',
    status: 'active',
    description: 'Quick fix modal interface',
  },
  {
    name: 'Quick Fix Interactions',
    route: '/playground/quick-fix-interactions',
    category: 'feature',
    status: 'active',
    description: 'Quick fix interaction patterns',
  },
  {
    name: 'Radial Blur',
    route: '/playground/radial-blur',
    category: 'animation',
    status: 'active',
    description: 'Radial blur effect playground',
  },
  {
    name: 'Ratings Panel',
    route: '/playground/ratings-panel',
    category: 'feature',
    status: 'active',
    description: 'Rating selection panel',
  },
  {
    name: 'Sliding Ratings',
    route: '/playground/sliding-ratings',
    category: 'animation',
    status: 'active',
    description: 'Animated sliding ratings interface',
  },
  {
    name: 'Sticky Data Table',
    route: '/playground/sticky-data-table',
    category: 'pattern',
    status: 'active',
    description: 'Data table with sticky headers/columns',
    component: 'StickyDataTable',
  },
  {
    name: 'Success Toast',
    route: '/playground/success-toast',
    category: 'component',
    status: 'active',
    description: 'Success toast notification playground',
    component: 'SuccessToast',
  },
]

/**
 * Experimental Playgrounds - Hidden/dev routes
 */
export const experimentalPlaygrounds: PlaygroundEntry[] = [
  {
    name: 'Skwircle Demo',
    route: '/_hidden/playground/skwircle-demo',
    category: 'component',
    status: 'experimental',
    description: 'Reference implementation for Skwircle component',
  },
  {
    name: 'Skwircle Card',
    route: '/_hidden/playground/skwircle-card',
    category: 'component',
    status: 'experimental',
    description: 'Skwircle card component showcase',
  },
  {
    name: 'Sticky Data Table (Experimental)',
    route: '/_hidden/playground/sticky-data-table',
    category: 'pattern',
    status: 'experimental',
    description: 'Experimental data table features',
  },
]

/**
 * Archived Playgrounds - Older versions (kept for reference)
 */
export const archivedPlaygrounds: PlaygroundEntry[] = [
  // Command Menu older versions
  {
    name: 'Biaxial Command Menu v1',
    route: '/playground/biaxial-command-menu',
    category: 'pattern',
    status: 'archived',
    description: 'Original biaxial command menu',
    component: 'CommandMenu',
    version: 'v1',
  },
  {
    name: 'Biaxial Command Menu v2',
    route: '/playground/biaxial-command-menu-v2',
    category: 'pattern',
    status: 'archived',
    description: 'Second iteration command menu',
    component: 'CommandMenu',
    version: 'v2',
  },
  {
    name: 'Biaxial Command Menu v3',
    route: '/playground/biaxial-command-menu-v3',
    category: 'pattern',
    status: 'archived',
    description: 'Third iteration command menu',
    component: 'CommandMenu',
    version: 'v3',
  },
  // Question Command Menu older versions
  {
    name: 'Question Command Menu v1',
    route: '/playground/question-command-menu',
    category: 'pattern',
    status: 'archived',
    description: 'Original question command menu',
    version: 'v1',
  },
  {
    name: 'Question Command Menu v2',
    route: '/playground/question-command-menu-v2',
    category: 'pattern',
    status: 'archived',
    description: 'Second iteration',
    version: 'v2',
  },
  {
    name: 'Question Command Menu v3',
    route: '/playground/question-command-menu-v3',
    category: 'pattern',
    status: 'archived',
    description: 'Third iteration',
    version: 'v3',
  },
  {
    name: 'Question Command Menu v4',
    route: '/playground/question-command-menu-v4',
    category: 'pattern',
    status: 'archived',
    description: 'Fourth iteration (use v4-flow instead)',
    version: 'v4',
  },
  // Button Animation older version
  {
    name: 'Button Animation v1',
    route: '/playground/button-animation',
    category: 'animation',
    status: 'archived',
    description: 'Original button animation',
    component: 'ButtonAnimation',
    version: 'v1',
  },
]

/**
 * All Playgrounds
 */
export const allPlaygrounds: PlaygroundEntry[] = [
  ...activePlaygrounds,
  ...experimentalPlaygrounds,
  ...archivedPlaygrounds,
]

/**
 * Get playgrounds by status
 */
export function getPlaygroundsByStatus(status: PlaygroundStatus): PlaygroundEntry[] {
  return allPlaygrounds.filter(p => p.status === status)
}

/**
 * Get playgrounds by category
 */
export function getPlaygroundsByCategory(category: PlaygroundCategory): PlaygroundEntry[] {
  return allPlaygrounds.filter(p => p.category === category)
}

/**
 * Get playgrounds for a specific component
 */
export function getPlaygroundsForComponent(componentName: string): PlaygroundEntry[] {
  return allPlaygrounds.filter(p => p.component?.toLowerCase() === componentName.toLowerCase())
}

/**
 * Get the latest version playground for a component
 */
export function getLatestPlayground(componentName: string): PlaygroundEntry | undefined {
  const playgrounds = getPlaygroundsForComponent(componentName)
  return playgrounds.find(p => p.version === p.latestVersion && p.status === 'active')
}
