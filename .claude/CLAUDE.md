# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Skwircle (demo-repo) is a **sandboxed UI testing environment** for PAYVA design system components. It isolates core UI primitives from business logic for:

- Cross-device testing (desktop, tablet, mobile)
- Safe component experimentation
- Bidirectional sync with PAYVA frontend

**No sensitive data** - only pure UI components.

---

## Navigation & Documentation Structure

### 🗺️ Quick Navigation Map

| Topic | Path | Use For |
|-------|------|---------|
| **Base UI** | `.claude/base-ui/` | Headless component patterns |
| **Motion.dev** | `.claude/motion-dev/` | Animation integration |
| **Styles** | `.claude/styles/` | Design tokens & utilities |
| **Commands** | `.claude/commands/` | Slash commands (/docs, /playground) |
| **Animation Rules** | `docs/ANIMATION-PREFERENCES.md` | Performance guidelines |
| **Playground Context** | See [Playground System](#playground-system) | Component incubation |

### 📚 Documentation Hierarchy

```
.claude/                           # Primary documentation hub
├── base-ui/                      # Base UI component library
│   ├── init.md                   # START HERE for Base UI
│   ├── components/               # Component-specific docs
│   └── handbook/                 # Patterns & best practices
├── motion-dev/                   # Motion animation library
│   ├── init.md                   # START HERE for animations
│   ├── getting-started/
│   │   └── base-ui-setup.md     # Critical: Base UI + Motion integration
│   └── animation/                # Animation patterns
├── styles/                       # Style system documentation
│   ├── init.md                   # START HERE for styling
│   ├── tokens/                   # Design token definitions
│   └── utilities/                # Utility class reference
└── commands/                     # Slash command definitions
    ├── docs.md                   # /docs command
    └── playground.md             # /playground command
```

**🎯 Key Integration Points:**
- **Base UI + Motion**: `.claude/motion-dev/getting-started/base-ui-setup.md`
- **Animation Preferences**: `docs/ANIMATION-PREFERENCES.md` (ALWAYS follow)
- **Style Utilities**: `.claude/styles/reference/all-utilities.md`

---

## Workspace Structure

```
skwircle/
├── src/
│   ├── app/                              # Next.js App Router pages
│   │   ├── playground/                   # Active playground routes
│   │   ├── _hidden/                      # Development/experimental
│   │   │   ├── playground/               # Experimental playgrounds
│   │   │   ├── sandbox/                  # Free-form testing
│   │   │   └── prototypes/               # Profile versions, prototypes
│   │   └── [feature-routes]/             # Feature pages
│   │
│   ├── components/ui/                    # UI Component Library
│   │   ├── core/                         # STABLE - Hardened primitives
│   │   ├── features/                     # STABLE - Composed features
│   │   ├── patterns/                     # STABLE - Complex patterns
│   │   ├── experimental/                 # WIP - Versioned components
│   │   └── prod/                         # Legacy path (use new structure)
│   │
│   ├── registry/                         # Component & Playground registries
│   ├── styles/                           # Theme, tokens, utilities
│   └── modules/                          # Feature modules
│
├── docs/                                 # Project documentation
└── .claude/                              # Claude-specific guidance
```

**Parent repo reference** (when needed): `/Users/derickfiebiger/Payva-Repos/`

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4** (CSS-first config with `@theme`, `@custom-variant`)
- **Hugeicons PRO** (exclusive icon library)
- **Base UI** (`@base-ui/react`) for headless primitives
- **Motion** (`motion/react`) for animations

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

## Component Architecture

### Component Categories

| Location | Purpose | Documentation |
|----------|---------|---------------|
| `src/components/ui/core/` | Stable primitives | `.claude/base-ui/components/` |
| `src/components/ui/features/` | Feature components | Component-specific |
| `src/components/ui/patterns/` | Complex patterns | Pattern guides |
| `src/components/ui/experimental/` | WIP versioned | Playground docs |

**Import Pattern**: `from '@/components/ui/[category]'`

### Base UI Integration

**ALWAYS use Base UI components** when available. See `.claude/base-ui/init.md` for:
- Component list with descriptions
- Data attributes for styling
- CSS variables for positioning
- Import patterns

**Example Integration**:
```tsx
import { Dialog } from '@base-ui/react/dialog'
import { motion } from 'motion/react'

// Use render prop for animation
<Dialog.Popup
  render={
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    />
  }
/>
```

### Motion Integration

**Reference**: `.claude/motion-dev/getting-started/base-ui-setup.md`

Key patterns:
1. Use `render` prop to replace Base UI elements with motion components
2. Add `AnimatePresence` for exit animations
3. Hoist `open` state and add `keepMounted` for unmounting components
4. Always animate `opacity` or `transform` for exit detection

---

## Styling System

### Design Tokens

**Reference**: `.claude/styles/init.md`

**Token Hierarchy**:
1. **Base tokens**: Raw color values
2. **Semantic tokens**: Intent-based (`primary`, `secondary`, `error`)
3. **Property tokens**: Context-specific (`text-primary`, `bg-secondary`)

### Key Style Patterns

```tsx
// Semantic backgrounds
className="bg-primary"        // Main content
className="bg-secondary"      // Cards, inputs
className="bg-tertiary"       // Emphasized sections

// Semantic text
className="text-primary"      // Main text
className="text-secondary"    // Supporting text
className="text-tertiary"     // Muted text

// Effects (see .claude/styles/utilities/effects.md)
className="shine-1-subtle"    // Subtle shine
className="depth-gradient-2"  // Medium depth
className="corner-squircle"   // Squircle corners
```

### Animation Preferences (CRITICAL)

**ALWAYS follow** `docs/ANIMATION-PREFERENCES.md`:

1. **Prefer compositor-only**: Animate `transform` and `opacity`
2. **Accessibility**: Use `motion-safe:` and `motion-reduce:` variants
3. **Performance**: Avoid layout properties (`width`, `height`, `margin`)
4. **GPU acceleration**: Use `transform-gpu` wisely
5. **Exit animations**: Always animate at least `opacity` or `transform`

**Example**:
```tsx
<div className="transition-transform transition-opacity duration-300 
                motion-safe:translate-x-0 motion-reduce:transition-none" />
```

---

## Icons (CRITICAL)

**Hugeicons PRO is the EXCLUSIVE icon library. No Untitled UI icons allowed.**

```typescript
// CORRECT - Always use Hugeicons with wrapper
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'

<HugeIcon icon={Home01Icon} size={20} className="text-primary" />

// FORBIDDEN - No Untitled UI icons
import { User01 } from '@untitledui-pro/icons/line'  // NO!
```

**Note**: Icon names are case-sensitive (e.g., `SmartPhone01Icon` not `Smartphone01Icon`)

---

## Playground System

**Reference**: `.claude/commands/playground.md`

### Requirements

Every playground MUST have:
1. **UnifiedControlPanel** with presets
2. **Copy functionality** for current config
3. **Reset to default** functionality
4. **Modular file structure** (config/, panels/, core/, utils/)
5. **Migration documentation** (README.md)

### Playground Structure

```
src/app/playground/[component]/
├── page.tsx                   # Page component
├── core/                      # Migration-ready component
│   └── [component].tsx
├── config/                    # Configuration
│   ├── presets.ts            # Preset definitions
│   ├── options.ts            # Control options
│   └── types.ts              # Type definitions
├── panels/                    # Control panel config
│   └── panel-config.ts
├── utils/                     # Style utilities
│   └── class-builders.ts
└── README.md                  # Migration docs
```

### Creating Playgrounds

Use the `/playground` command to generate properly structured playgrounds with all required files and patterns.

---

## Component Transfer

**Frontend → Demo**: 
1. Strip business logic
2. Update import paths
3. Replace Untitled UI with Hugeicons
4. Add to registries

**Demo → Frontend**:
1. Copy core component files
2. Update import paths for frontend
3. Add business logic layer
4. Test integration

---

## Sync Scripts

- `./scripts/sync-styles.sh` - Pull styles from frontend
- `./scripts/sync-to-frontend.sh` - Push components to frontend

---

## Slash Commands

| Command | Purpose | Documentation |
|---------|---------|---------------|
| `/docs [topic]` | Generate progressive disclosure docs | `.claude/commands/docs.md` |
| `/playground [component]` | Create playground with UnifiedControlPanel | `.claude/commands/playground.md` |

---

## MCP Browser Integration

**Use MCP tools only when explicitly requested by the user.**

### Available Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `take_screenshot` | Capture browser screenshots | User asks: "take a screenshot", "show me how this looks" |
| `get_selected_component` | Get selected component info | User references "this component", "selected element" |
| `get_component_source` | Read component source | Debugging specific components |
| `trigger_hot_reload` | Refresh browser | After significant changes |

### Setup

Chrome with remote debugging:
```bash
open -a "Google Chrome" --args --remote-debugging-port=9222
```

**Full documentation**: `docs/mcp/INDEX.md`

---

## Critical Guidelines

### Always Follow

1. **Animation Preferences**: Read `docs/ANIMATION-PREFERENCES.md` before animating
2. **Base UI First**: Check `.claude/base-ui/` before creating custom components
3. **Motion Integration**: Use `.claude/motion-dev/getting-started/base-ui-setup.md` patterns
4. **Style Tokens**: Reference `.claude/styles/` for all styling decisions
5. **Hugeicons Only**: Never use Untitled UI icons

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Badge.tsx`, `MetricCard.tsx` |
| Utilities | kebab-case | `cx.ts`, `class-builders.ts` |
| Styles | kebab-case | `theme.css`, `globals.css` |

### Component Migration Path

1. **Incubate** in playground with full control panel
2. **Validate** all presets and variations
3. **Extract** core component to production location
4. **Convert** presets to component variants
5. **Document** public API and usage

---

## Quick Reference Paths

### When You Need...

| Task | Go To |
|------|-------|
| Base UI component docs | `.claude/base-ui/components/[component].md` |
| Animation patterns | `.claude/motion-dev/animation/` |
| Style tokens | `.claude/styles/tokens/` |
| Create playground | Use `/playground` command |
| Animation + Base UI | `.claude/motion-dev/getting-started/base-ui-setup.md` |
| Performance rules | `docs/ANIMATION-PREFERENCES.md` |
| MCP setup | `docs/mcp/INDEX.md` |

---

**Last Updated**: January 2025