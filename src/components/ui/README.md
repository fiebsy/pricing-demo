# UI Component Library

Organized, scalable component architecture for the Skwircle design system.

## Directory Structure

```
ui/
├── core/                    # STABLE - Hardened primitives
│   ├── primitives/          # Button, Badge, Icon, Menu, Accordion
│   ├── inputs/              # Checkbox, Input, Select
│   ├── feedback/            # Tooltip, Skeleton, ClawbackTimer
│   └── layout/              # Layout utilities (future)
│
├── features/                # STABLE - Composed feature components
│   ├── metric-card/
│   ├── expanding-search/
│   ├── display-card/
│   ├── featured-icon/
│   ├── order-details/
│   └── success-toast/
│
├── patterns/                # STABLE - Complex UI patterns
│   ├── control-panel/       # Playground configuration
│   ├── filter/              # Filtering system (chips, menus, selects)
│   └── data-table/          # Sticky data table
│
├── experimental/            # WIP - Versioned components
│   ├── command-menu/        # v1, v2, v3, v4 (latest: v4)
│   └── button-animation/    # v1, v2 (latest: v2)
│
├── deprecated/              # LEGACY - Do not use for new code
│   └── ...
│
└── prod/                    # LEGACY PATH - Migrate to new structure
    └── ...
```

## Component Tiers

### STABLE (Ready for Production)

Components that are well-tested, have consistent APIs, and are production-ready.

**Core Primitives** (`@/components/ui/core`)
- `Button`, `Badge`, `Icon` - Basic UI elements
- `Checkbox`, `Input`, `Select` - Form inputs
- `Tooltip`, `Skeleton` - Feedback components
- `Accordion`, `Menu` - Interactive primitives

**Features** (`@/components/ui/features`)
- Higher-level components built from primitives
- Domain-specific functionality
- Well-documented with config patterns

**Patterns** (`@/components/ui/patterns`)
- Complex, reusable UI patterns
- Internal architecture (hooks, config, types)
- Extensive documentation

### EXPERIMENTAL (Work in Progress)

Components under active development with multiple versions.

- **Versioning**: `v1`, `v2`, `v3`, `v4`
- **Latest version** is always the highest number
- **Import convention**: Use default export for latest, or specify version

```typescript
// Latest version (recommended)
import { CommandMenu } from '@/components/ui/experimental'

// Specific version (when needed)
import { CommandMenuV3 } from '@/components/ui/experimental'
```

### DEPRECATED (Legacy)

Components that should not be used for new code.
- Keep for backwards compatibility during migration
- Check `deprecatedDate` and `replacedBy` in registry

## Import Patterns

```typescript
// Core - Stable primitives
import { Button, Badge, Icon } from '@/components/ui/core'
import { Checkbox, Input, Select } from '@/components/ui/core/inputs'
import { Tooltip, Skeleton } from '@/components/ui/core/feedback'

// Features - Composed components
import { MetricCard, ExpandingSearch } from '@/components/ui/features'

// Patterns - Complex UI patterns
import { ControlPanel } from '@/components/ui/patterns/control-panel'
import { Filter, FilterChip } from '@/components/ui/patterns/filter'

// Experimental - Versioned WIP
import { CommandMenu } from '@/components/ui/experimental'
import { CommandMenuV3 } from '@/components/ui/experimental'

// Everything (not recommended - prefer specific imports)
import { Button, Badge, MetricCard } from '@/components/ui'
```

## Component Registry

Use the registry for programmatic access:

```typescript
import {
  allComponents,
  getComponentsByStatus,
  getComponentsByCategory,
  getComponent
} from '@/registry/components'

// Get all stable components
const stable = getComponentsByStatus('stable')

// Get all input components
const inputs = getComponentsByCategory('input')

// Get specific component metadata
const button = getComponent('Button')
```

## Adding New Components

### 1. Determine the tier

| If the component is... | Place it in... |
|------------------------|----------------|
| Basic UI primitive | `core/primitives/` |
| Form input | `core/inputs/` |
| Feedback/status | `core/feedback/` |
| Domain-specific feature | `features/` |
| Complex pattern with sub-components | `patterns/` |
| Work in progress with iterations | `experimental/` |

### 2. Create the component

```
new-component/
├── index.ts           # Barrel exports
├── new-component.tsx  # Main component
├── types.ts           # TypeScript types
├── config.ts          # Configuration/constants
├── hooks/             # Custom hooks (if needed)
└── components/        # Sub-components (if needed)
```

### 3. Add to registry

Update `src/registry/components.ts`:

```typescript
{
  name: 'NewComponent',
  path: '@/components/ui/[tier]/new-component',
  category: 'primitive', // or 'input', 'feedback', 'feature', 'pattern'
  status: 'stable',      // or 'experimental', 'deprecated'
  description: 'Description of the component',
}
```

### 4. Update barrel exports

Add to the appropriate `index.ts` file in the tier directory.

## Migration Guide

### From `prod/base/` to `core/`

```typescript
// Old
import { Button } from '@/components/ui/prod/base/button'

// New
import { Button } from '@/components/ui/core/primitives/button'
// Or simply:
import { Button } from '@/components/ui/core'
```

### From `prod/features/` to `features/`

```typescript
// Old
import { MetricCard } from '@/components/ui/prod/features/metric-card'

// New
import { MetricCard } from '@/components/ui/features/metric-card'
// Or:
import { MetricCard } from '@/components/ui/features'
```

### From versioned components to experimental

```typescript
// Old
import { BiaxialCommandMenu } from '@/components/ui/prod/base/biaxial-command-menu-v4'

// New
import { CommandMenu } from '@/components/ui/experimental'
// Or for specific version:
import { CommandMenuV4 } from '@/components/ui/experimental'
```

## Best Practices

1. **Always import from barrel exports** when possible
2. **Use specific imports** for tree-shaking in production
3. **Check component status** before using in new features
4. **Update the registry** when adding/modifying components
5. **Document breaking changes** in experimental versions
