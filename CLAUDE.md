# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Skwircle (demo-repo) is a **sandboxed UI testing environment** for PAYVA design system components. It isolates core UI primitives from business logic for:

- Cross-device testing (desktop, tablet, mobile)
- Safe component experimentation
- Bidirectional sync with PAYVA frontend

**No sensitive data** - only pure UI components.

**Full documentation**: `/Users/derickfiebiger/Payva-Repos/docs/demo-repo/INDEX.md`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Hugeicons PRO (exclusive icon library)

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

## Architecture & Code Structure

### Component System
- **V2 components** (`src/v2/components/ui/`): Production-ready components using squircle primitives
- **Skwircle core** (`src/v2/components/ui/skwircle/`): 500+ line foundational squircle implementation with SVG-based rendering, performance modes, and variant-first API
- **Component patterns**: All V2 components extend the skwircle primitive with semantic design tokens

### Design Token System
- **200+ semantic tokens** in `src/styles/theme.css` that automatically remap between light/dark modes
- **Token usage**: Always use semantic tokens like `text-primary`, `bg-brand-solid`, `border-secondary` - never hardcode colors
- **Dark mode**: Handled automatically via `.dark-mode` class on html element - tokens remap without dark: prefixes

### Styling Approach
- **Tailwind v4**: Using beta version with PostCSS plugin (`@tailwindcss/postcss`)
- **Custom utilities**: Extended utilities in `src/styles/utilities/` for animations, gradients, corners, depth
- **Class merging**: Use `cx()` utility from `src/v2/utils/cx.ts` for conditional classes

### Typography
- **Neue Haas Grotesk**: Custom font with Text and Display variants loaded locally from `src/styles/fonts/`
- **Font usage**: Applied via `fontVariableDefinitions` and `fontFamilyDefinitions` in `src/lib/fonts.ts`

## Key Technical Patterns

### Component Development
1. V2 components should extend the skwircle primitive where applicable
2. Use semantic design tokens exclusively - no hardcoded colors
3. Include TypeScript types for all props
4. Follow variant-first API pattern (type, variant, size props)

### Icons (CRITICAL)
**Hugeicons PRO is the EXCLUSIVE icon library for Skwircle. No Untitled UI icons allowed.**

```typescript
// CORRECT - Always use Hugeicons with wrapper
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'

<HugeIcon icon={Home01Icon} size={20} className="text-primary" />

// FORBIDDEN - No Untitled UI icons
import { User01 } from '@untitledui-pro/icons/line'  // NO!
```

**Why?** Skwircle demos components for PAYVA frontend, which is deprecating Untitled UI. Keeping Skwircle Hugeicons-only prevents deprecated patterns from propagating.

**Full guide**: `docs/styles/icons/hugeicons.md`

### Premium Package Authentication
The project uses premium icon libraries requiring authentication:
- `@hugeicons-pro` requires auth tokens
- Tokens managed via environment variables in production

### Performance Considerations
- Skwircle components have three performance modes: high, balanced, low
- Use appropriate mode based on component count and user device
- SVG filters are expensive - consider performance mode for multiple squircles

### File Naming Conventions
- Components: PascalCase files (`Badge.tsx`)
- Utilities: kebab-case (`cx.ts`, `utils.ts`)
- Styles: kebab-case (`theme.css`, `globals.css`)

## Important Implementation Details

### Theme Provider
- Theme context at `src/components/theme-provider.tsx` manages dark mode
- Uses localStorage for persistence with key `theme`
- Applies `.dark-mode` class to html element

### Playground Routes (CRITICAL)

**All playground pages MUST use the `UnifiedControlPanel` component.**

**Full guide**: `src/app/playground/PLAYGROUND.md`

Quick pattern:
```typescript
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelConfig,
} from '@/components/ui/controls/unified-control-panel'

// Standard layout: fixed header, preview area with panel offset, fixed panel
<div className="min-h-screen bg-gray-950">
  <div className="fixed top-0 ...">Header</div>
  <div className="pt-20 pr-[352px]">Preview Area</div>
  <UnifiedControlPanel config={panelConfig} onChange={handleChange} />
</div>
```

Reference implementation: `/playground/skwircle-card/page.tsx`

### Build Configuration
- React Strict Mode enabled
- TypeScript strict mode with path aliases (`@/*` maps to `src/*`)
- Next.js App Router with server components by default

## Common Tasks

### Adding a New V2 Component
1. Create component directory in `src/v2/components/ui/[component-name]/`
2. Export from `index.tsx` with named export
3. Extend skwircle primitive if applicable
4. Use semantic design tokens from theme.css
5. Add TypeScript types for all props

### Modifying Design Tokens
1. Edit `src/styles/theme.css`
2. Tokens automatically remap in dark mode via CSS custom properties
3. Follow naming pattern: `--[category]-[semantic-name]`

### Working with Squircles
1. Import from `src/v2/components/ui/skwircle/`
2. Configure roundness (0-5), performance mode, shadows
3. Use compound components for complex layouts
4. Consider performance impact with multiple squircles

### Creating a Playground Page
1. Read `src/app/playground/PLAYGROUND.md` for complete instructions
2. Create route at `src/app/playground/[component-name]/page.tsx`
3. Define typed config interface and DEFAULT_CONFIG
4. Create `createPanelConfig()` function with sections/subsections
5. Use standard layout: fixed header, offset preview area, UnifiedControlPanel
6. Add entry to PLAYGROUND_ITEMS in `/playground/page.tsx`

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
Syncs Skwircle core files, config, hooks, rendering, and utils to frontend.

**Transfer guide**: `/Users/derickfiebiger/Payva-Repos/docs/demo-repo/COMPONENT-TRANSFER.md`