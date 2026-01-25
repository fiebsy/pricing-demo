# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Skwircle (demo-repo) is a **sandboxed UI testing environment** for PAYVA design system components. It isolates core UI primitives from business logic for:

- Cross-device testing (desktop, tablet, mobile)
- Safe component experimentation
- Bidirectional sync with PAYVA frontend

**No sensitive data** - only pure UI components.

---

## Workspace Scope

This is a **standalone repository** separate from the main PAYVA monorepo.

```
skwircle/
├── src/
│   ├── app/                              # Next.js App Router pages
│   │   ├── playground/                   # Active playground routes
│   │   ├── _hidden/                      # Development/experimental
│   │   │   ├── playground/               # Experimental playgrounds
│   │   │   ├── sandbox/                  # Free-form testing (exploratory code)
│   │   │   └── prototypes/               # Profile versions, prototypes
│   │   └── [feature-routes]/             # Feature pages (dashboard, studio, etc.)
│   │
│   ├── components/ui/                    # UI Component Library
│   │   ├── core/                         # STABLE - Hardened primitives
│   │   │   ├── primitives/               # Button, Badge, Icon, Menu, Accordion
│   │   │   ├── inputs/                   # Checkbox, Input, Select
│   │   │   ├── feedback/                 # Tooltip, Skeleton, ClawbackTimer
│   │   │   └── layout/                   # Layout utilities (future)
│   │   ├── features/                     # STABLE - Composed feature components
│   │   │   ├── metric-card/
│   │   │   ├── expanding-search/
│   │   │   ├── display-card/
│   │   │   └── ...
│   │   ├── patterns/                     # STABLE - Complex UI patterns
│   │   │   ├── control-panel/
│   │   │   ├── filter/
│   │   │   └── data-table/
│   │   ├── experimental/                 # WIP - Versioned components
│   │   │   ├── command-menu/             # v1, v2, v3, v4
│   │   │   └── button-animation/         # v1, v2
│   │   ├── deprecated/                   # Legacy (do not use for new code)
│   │   └── prod/                         # Legacy path (use new structure)
│   │
│   ├── registry/                         # Component & Playground registries
│   │   ├── components.ts                 # All components with metadata
│   │   └── playgrounds.ts                # All playgrounds with metadata
│   │
│   ├── styles/                           # Theme, tokens, utilities
│   ├── docs/                             # Embedded documentation
│   └── modules/                          # Feature modules
│
├── docs/                                 # Project documentation
└── .claude/commands/                     # Slash commands (/docs, /playground)
```

**Parent repo reference** (when needed): `/Users/derickfiebiger/Payva-Repos/`

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4** (CSS-first config with `@theme`, `@custom-variant`)
- **Hugeicons PRO** (exclusive icon library)
- **Base UI** (`@base-ui/react`) for headless primitives

---

## Development Commands

```bash
# Install dependencies (requires pnpm 10.15.0+)
pnpm install

# Run development server
pnpm dev

# Build production
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# Start production server
pnpm start
```

---

## Architecture & Code Structure

### Component System (NEW STRUCTURE)

| Location | Status | Purpose |
|----------|--------|---------|
| `src/components/ui/core/` | **STABLE** | Hardened primitives (buttons, badges, inputs) |
| `src/components/ui/features/` | **STABLE** | Composed feature components |
| `src/components/ui/patterns/` | **STABLE** | Complex patterns (data table, filters) |
| `src/components/ui/experimental/` | **WIP** | Versioned work-in-progress components |
| `src/components/ui/deprecated/` | **LEGACY** | Do not use for new code |

### Import Patterns

```typescript
// Core primitives (stable)
import { Button, Badge, Icon } from '@/components/ui/core'
import { Checkbox, Input, Select } from '@/components/ui/core/inputs'

// Feature components (stable)
import { MetricCard, ExpandingSearch } from '@/components/ui/features'

// Complex patterns (stable)
import { ControlPanel, Filter } from '@/components/ui/patterns'

// Experimental (specify version or use default latest)
import { CommandMenu } from '@/components/ui/experimental'           // Latest (v4)
import { CommandMenuV3 } from '@/components/ui/experimental'        // Specific version
import { ButtonAnimation } from '@/components/ui/experimental'      // Latest (v2)
```

### Component Registry

Use the registry for programmatic access to component metadata:

```typescript
import {
  allComponents,
  getComponentsByStatus,
  getComponent
} from '@/registry/components'

import {
  allPlaygrounds,
  getLatestPlayground,
  getPlaygroundsForComponent
} from '@/registry/playgrounds'
```

### Design Token System

- **200+ semantic tokens** in `src/styles/theme.css`
- **Token usage**: Always use semantic tokens like `text-primary`, `bg-brand-solid`, `border-secondary`
- **Dark mode**: Handled via `.dark-mode` class - tokens remap automatically

### Styling Approach

- **Tailwind v4**: CSS-first config via `@theme`, `@custom-variant`
- **Custom utilities**: `src/styles/utilities/` for animations, gradients, corners, depth
- **Class merging**: Use `cx()` utility from `src/lib/cx.ts` or `src/modules/utils/cx.ts`

---

## Key Technical Patterns

### Icons (CRITICAL)

**Hugeicons PRO is the EXCLUSIVE icon library. No Untitled UI icons allowed.**

```typescript
// CORRECT - Always use Hugeicons with wrapper
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'

<HugeIcon icon={Home01Icon} size={20} className="text-primary" />

// FORBIDDEN - No Untitled UI icons
import { User01 } from '@untitledui-pro/icons/line'  // NO!
```

**Full guide**: `docs/styles/icons/hugeicons.md`

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Badge.tsx`, `MetricCard.tsx` |
| Utilities | kebab-case | `cx.ts`, `utils.ts` |
| Styles | kebab-case | `theme.css`, `globals.css` |

---

## Animation Preferences (CRITICAL)

Follow the performance tier system from `docs/ANIMATION-PREFERENCES.md`:

### S-Tier (Prefer) - Compositor-only

```typescript
// Animate transform + opacity only
className="transition-transform transition-opacity duration-300
           ease-[cubic-bezier(.2,.8,.2,1)] transform-gpu
           translate-x-0 opacity-100"

// Use data attributes for state
className="translate-x-full opacity-0
           data-open:translate-x-0 data-open:opacity-100"
```

### Accessibility - Always include

```typescript
// Gate motion for reduced-motion users
className="motion-safe:transition motion-reduce:transition-none"
```

### Avoid - Layout animations

```typescript
// NEVER animate these properties
width, height, top, left, margin, padding

// If layout must change, use FLIP technique
// (measure once, animate with transforms)
```

### Tailwind v4 Motion Tokens

```css
@theme {
  --ease-standard: cubic-bezier(.2,.8,.2,1);
  --ease-snappy: cubic-bezier(.2, 0, 0, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
}
```

---

## Playground System

### Routes

| Route | Purpose |
|-------|---------|
| `/playground/[name]` | Active playgrounds (production testing) |
| `/_hidden/playground/[name]` | Experimental playgrounds |
| `/_hidden/sandbox/` | Free-form exploratory code |
| `/_hidden/prototypes/` | Feature prototypes (profile versions, etc.) |

### Playground Registry

```typescript
import {
  activePlaygrounds,
  experimentalPlaygrounds,
  archivedPlaygrounds,
  getLatestPlayground
} from '@/registry/playgrounds'

// Get all active playgrounds
activePlaygrounds.forEach(p => console.log(p.route, p.description))

// Get latest playground for a component
const latestCommandMenu = getLatestPlayground('CommandMenu')
```

### UnifiedControlPanel (Required for all playgrounds)

```typescript
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
} from '@/components/ui/patterns/control-panel'

// Standard layout
<div className="min-h-screen">
  <div className="fixed top-0 ...">Header</div>
  <div className="pt-20 pr-[352px]">Preview Area</div>
  <UnifiedControlPanel config={panelConfig} onChange={handleChange} />
</div>
```

**Every playground MUST include:**
- Preset dropdown (select from saved configurations)
- Copy Preset button (exports current config as JSON)
- Reset to default functionality

**Reference implementation**: `src/app/_hidden/playground/skwircle-demo/`

---

## Component Transfer (Frontend → Demo Repo)

When bringing components from PAYVA frontend into demo-repo:

### 1. Identify Source & Target

```
# Source (frontend)
front-end/src/modules/v2/[feature]/components/[component]/

# Target (demo-repo) - Use NEW structure:
src/components/ui/core/primitives/[component]/     # For primitives
src/components/ui/core/inputs/[component]/         # For form inputs
src/components/ui/features/[component]/            # For feature components
src/components/ui/patterns/[component]/            # For complex patterns
src/components/ui/experimental/[component]/        # For WIP components
```

### 2. Adapt Import Paths

| Frontend | Demo Repo |
|----------|-----------|
| `@/modules/design-system/v2/components/ui/...` | `@/components/ui/core/...` |
| `@/modules/api/generated/graphql` | Remove (no GraphQL in demo) |
| `@untitledui-pro/icons/...` | `@hugeicons-pro/core-stroke-rounded/...` |

### 3. Remove Business Logic

- Strip GraphQL hooks/queries
- Replace API data with mock data
- Remove authentication checks
- Keep only UI rendering logic

### 4. Checklist

- [ ] Update all import paths
- [ ] Replace Untitled UI icons with Hugeicons
- [ ] Remove GraphQL dependencies
- [ ] Add mock data if needed
- [ ] Verify semantic tokens work
- [ ] Test dark mode
- [ ] Add to playground if applicable
- [ ] Add to component registry

---

## Sync Scripts

### Pull styles from frontend

```bash
./scripts/sync-styles.sh
```

Syncs `theme.css`, `base.css`, and all `utilities/*.css` from PAYVA frontend.

### Push components to frontend

```bash
./scripts/sync-to-frontend.sh
```

Syncs Skwircle core files to frontend.

---

## Documentation

| Topic | Location |
|-------|----------|
| Component Registry | `src/registry/components.ts` |
| Playground Registry | `src/registry/playgrounds.ts` |
| Animation Preferences | `docs/ANIMATION-PREFERENCES.md` |
| Collections Migration | `docs/COLLECTIONS-MIGRATION.md` |
| Sticky Data Table | `docs/design-system/sticky-data-table/init.md` |
| Base UI Components | `src/docs/base-ui/` |
| Motion.dev Reference | `src/docs/motion-dev/` |
| Style Utilities | `src/styles/docs/init.md` |

---

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/docs [topic]` | Generate progressive disclosure documentation |
| `/playground [component]` | Create playground page with UnifiedControlPanel |

---

**Last Updated**: January 2025
