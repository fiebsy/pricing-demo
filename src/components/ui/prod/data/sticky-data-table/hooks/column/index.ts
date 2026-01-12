/**
 * Column - Column management hooks
 *
 * Handles column visibility, configuration, ordering, and FLIP animations.
 *
 * @module hooks/column
 */

export { useColumns } from './use-columns'

export {
  useColumnConfiguration,
  type UseColumnConfigurationOptions,
  type ColumnConfigurationState,
  type ColumnConfigurationActions,
  type UseColumnConfigurationReturn,
} from './use-column-configuration'

export {
  useColumnFlip,
  supportsWAAPI,
  prefersReducedMotion,
} from './use-column-flip'

export { useAutoColumnFlip } from './use-auto-column-flip'
