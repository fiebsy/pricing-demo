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

## Architecture

### Component System

| Location | Purpose |
|----------|---------|
| `src/components/ui/core/` | Stable primitives (buttons, inputs) |
| `src/components/ui/features/` | Feature components |
| `src/components/ui/patterns/` | Complex patterns |
| `src/components/ui/experimental/` | WIP versioned components |

**Import**: `from '@/components/ui/[category]'`

**Registries**: Use `@/registry/components` and `@/registry/playgrounds` for metadata access.

### Styling

- **Tokens**: Use semantic tokens (`text-primary`, `bg-brand-solid`)
- **Tailwind v4**: CSS-first config with custom utilities in `src/styles/`  
- **Dark mode**: Automatic via `.dark-mode` class
- **Class merging**: Use `cx()` utility

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

## Animation Preferences

**CRITICAL**: Only animate `transform` and `opacity` (compositor-only). Never animate layout properties.

- **Preferred**: `transition-transform transition-opacity`
- **Accessibility**: Always include `motion-safe:transition motion-reduce:transition-none`
- **Avoid**: width, height, margin, padding
- **Reference**: `docs/ANIMATION-PREFERENCES.md`

---

## Playground System

**Routes**: `/playground/[name]` (active), `/_hidden/playground/[name]` (experimental)

**Required**: All playgrounds must use `UnifiedControlPanel` from `@/components/ui/patterns/control-panel` with presets, copy, and reset functionality.

**Registry**: Use `@/registry/playgrounds` for metadata access.

---

## Component Transfer

**Frontend → Demo**: Strip business logic, update import paths, replace Untitled UI with Hugeicons, add to registries.

---

## Sync Scripts

- `./scripts/sync-styles.sh` - Pull styles from frontend
- `./scripts/sync-to-frontend.sh` - Push components to frontend

---

## Documentation

| Topic | Location |
|-------|----------|
| **MCP Browser Bridge** | `docs/mcp/INDEX.md` |
| MCP Test Plan | `docs/MCP-BRIDGE-TEST-PLAN.md` |
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

## MCP Browser Integration

This project includes an **MCP Browser Bridge** for browser communication. **Use MCP tools only when explicitly requested by the user.**

### Available Tools

| Tool | Purpose |
|------|---------|
| `take_screenshot` | Capture browser screenshots (when requested) |
| `get_selected_component` | Get info on selected component |
| `get_component_source` | Read component source file |
| `trigger_hot_reload` | Refresh the browser |

### Usage Policy

- **Screenshots**: Only take when user explicitly asks ("take a screenshot", "show me how this looks")
- **Component selection**: Use when user references "this component" or "selected element"  
- **Source access**: Only when debugging specific components

### Setup Requirements

Chrome with remote debugging required for screenshots:
```bash
chrome-debug  # See docs/mcp/INDEX.md for setup
```

### Documentation

See `docs/mcp/INDEX.md` for complete setup and usage guide.

---

**Last Updated**: January 2025
