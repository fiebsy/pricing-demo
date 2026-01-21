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
demo-repo/                              # This codebase
├── src/
│   ├── app/                            # Next.js App Router pages
│   │   ├── playground/                 # Active playground routes
│   │   └── _hidden/playground/         # Development playgrounds
│   ├── components/ui/prod/             # Production-ready components
│   ├── v2/components/ui/               # V2 component system
│   ├── styles/                         # Theme, tokens, utilities
│   └── docs/                           # Embedded documentation
├── docs/                               # Project documentation
└── .claude/commands/                   # Slash commands (/docs, /playground)
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

### Component System

| Location | Purpose |
|----------|---------|
| `src/components/ui/prod/` | Production-ready components |
| `src/v2/components/ui/` | V2 component system (skwircle primitives) |
| `src/v2/components/ui/skwircle/` | Core squircle implementation |
| `src/components/ui/deprecated/` | Legacy components (do not use) |

### Design Token System

- **200+ semantic tokens** in `src/styles/theme.css`
- **Token usage**: Always use semantic tokens like `text-primary`, `bg-brand-solid`, `border-secondary`
- **Dark mode**: Handled via `.dark-mode` class - tokens remap automatically

### Styling Approach

- **Tailwind v4**: CSS-first config via `@theme`, `@custom-variant`
- **Custom utilities**: `src/styles/utilities/` for animations, gradients, corners, depth
- **Class merging**: Use `cx()` utility from `src/v2/utils/cx.ts`

---

## Key Technical Patterns

### Icons (CRITICAL)

**Hugeicons PRO is the EXCLUSIVE icon library. No Untitled UI icons allowed.**

```typescript
// CORRECT - Always use Hugeicons with wrapper
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
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
| `/playground/[name]` | Active playgrounds |
| `/_hidden/playground/[name]` | Development/experimental |

### UnifiedControlPanel (Required for all playgrounds)

```typescript
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
} from '@/components/ui/prod/base/control-panel'

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

# Target (demo-repo)
src/components/ui/prod/features/[component]/
# OR for primitives:
src/v2/components/ui/[component]/
```

### 2. Adapt Import Paths

| Frontend | Demo Repo |
|----------|-----------|
| `@/modules/design-system/v2/components/ui/...` | `@/components/ui/prod/...` |
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
