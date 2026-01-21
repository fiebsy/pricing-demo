/**
 * Biaxial Command Menu - Public API
 *
 * A biaxial animated command palette with search and keyboard navigation.
 *
 * @module prod/base/biaxial-command-menu
 */

// Main component and core exports
export {
  BiaxialCommandMenu,
  DEFAULT_COMMAND_CONFIG,
  SAMPLE_COMMANDS,
} from './core'

// Types
export type {
  CommandMenuProps,
  CommandMenuConfig,
  CommandItem,
  CommandItemAction,
  CommandItemBase,
  CommandItemSeparator,
  CommandGroup,
  BackgroundOption,
} from './core'

// Subcomponents (for advanced composition)
export {
  CommandInput,
  CommandItem as CommandItemComponent,
  CommandList,
} from './components'

export type {
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandListRef,
} from './components'
