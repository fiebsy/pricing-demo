/**
 * StackingNav V2 - Context Exports
 *
 * Split contexts for performance optimization:
 * - PhaseContext: Frequent updates during animations
 * - ConfigContext: Stable configuration
 * - NavigationContext: Path and actions
 * - LevelContext: Level-specific state
 *
 * @module features/stacking-nav-v2/context
 */

export { PhaseContext, usePhaseContext, type PhaseContextValue } from './phase-context'
export { ConfigContext, useConfigContext, type ConfigContextValue } from './config-context'
export { NavigationContext, useNavigationContext, type NavigationContextValue } from './navigation-context'
export { LevelContext, useLevelContext, type LevelContextValue } from './level-context'

/**
 * Combined hook for components that need all contexts.
 * Use individual hooks (usePhaseContext, useConfigContext, etc.)
 * when you only need specific data to reduce re-renders.
 */
export { useStackContext, StackContext } from './stack-context'
