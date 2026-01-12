# Production Design System Documentation

> Central index for all prod/ documentation. Reference this when coordinating work across agents.

---

## ⚠️ Current State

**No components are production-ready yet.** All base/ components are scaffolded but have significant styling issues. Continue using legacy paths until components pass visual QA.

---

## Documentation Files

| File | Purpose | When to Reference |
|------|---------|-------------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, directory structure, component hierarchy | Understanding the overall system |
| [MIGRATION.md](./MIGRATION.md) | Migration tracking, audit log, component status | Checking what's migrated vs pending |
| [MIGRATION-LOOP.md](./MIGRATION-LOOP.md) | **Looping workflow for component migration** | Running `/migrate` command |
| [CONVENTIONS.md](./CONVENTIONS.md) | Coding standards, naming, file structure | Writing new components |
| [BASE-UI-PRIMITIVES.md](./BASE-UI-PRIMITIVES.md) | Base UI component mapping, integration patterns | Building on Base UI |
| [ICONS.md](./ICONS.md) | **Hugeicons usage, finding icons, styling** | Using icons in components |

---

## Quick Reference

### Directory Purpose

```
prod/
├── base/       # Base UI primitives with PAYVA styling (WIP)
├── features/   # Higher-level product components (not started)
└── data/       # Data display (tables, charts)
```

---

## Legacy Comparison Pattern

**Every migrated component MUST display its legacy version side-by-side** in the gallery for visual QA.

### Why?

- Ensures exact visual parity during migration
- Makes regressions immediately visible
- Provides confidence before deprecating legacy components

### Gallery Structure

Each component demo in `/playground/ui/gallery/prod-design-system/base` shows:

```
┌─────────────────────────────────────────────────────┐
│  Component Name                              Ready  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✓ Prod (prod/base/component-name)                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  [Prod component variants/states]             │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Legacy (untitled-ui/base/...)                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  [Legacy component - EXACT same demos]        │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Implementation

```tsx
// In base-section.tsx

import { Button } from '@/modules/design-system/v2/components/ui/prod/base/button'
import { Button as LegacyButton } from '@/modules/design-system/v2/components/ui/untitled-ui/base/buttons/button'

function ButtonDemo() {
  return (
    <div className="space-y-6">
      {/* Prod Version */}
      <div>
        <p className="mb-2 text-xs font-medium text-success">✓ Prod</p>
        <div className="rounded-lg border border-success/20 bg-success/5 p-4">
          <Button variant="primary">Primary</Button>
        </div>
      </div>

      {/* Legacy Version */}
      <div>
        <p className="mb-2 text-xs font-medium text-tertiary">Legacy</p>
        <div className="rounded-lg border border-primary bg-secondary p-4">
          <LegacyButton variant="primary">Primary</LegacyButton>
        </div>
      </div>
    </div>
  )
}
```

### Component Data Schema

```typescript
interface ComponentDemo {
  id: string
  name: string
  description: string
  status: 'migrated' | 'wip' | 'planned'
  baseUI: boolean
  variants?: string[]
  legacyPath?: string  // e.g., 'untitled-ui/base/buttons/button'
}
```

### Import Path (ONLY when component is Ready)

```typescript
@/modules/design-system/v2/components/ui/prod/[category]/[component]
```

### Current Paths (USE THESE until prod/ is ready)

```typescript
// Continue using legacy paths for production code
@/modules/design-system/v2/components/ui/untitled-ui/...
@/modules/design-system/v2/components/ui/custom/...
```

---

## Current Work Streams

### Sticky Data Table
- **Location**: `prod/data/sticky-data-table/` (migrated from `custom/data/`)
- **Status**: Available with ongoing PROD component integration
- **Audit**: See [STICKY-DATA-TABLE-AUDIT.md](./STICKY-DATA-TABLE-AUDIT.md) for migration progress
- **Notes**: Core table is feature-complete. Sub-components being migrated to PROD imports.

### Base UI Filter System
- **Location**: `base-ui/v2/` (to be migrated to `prod/base/`)
- **Status**: WIP
- **Components**: FilterMenu, FilterChip, FilterTrigger

### Base Components (Button, Icon, Badge, Accordion)
- **Status**: WIP - Scaffolded but styling incomplete
- **Blockers**: Missing squircle corners, incorrect colors, styling gaps
- **Priority**: High

---

## For Agents Working in Parallel

When making changes:

1. **Check MIGRATION.md first** - See what's being worked on
2. **Update MIGRATION.md after** - Log your changes
3. **Follow CONVENTIONS.md** - Maintain consistency
4. **Reference BASE-UI-PRIMITIVES.md** - Use Base UI where available

### Coordination Pattern

```
Agent A: Working on Sticky Data Table
Agent B: Working on Button migration
Agent C: Working on RISK page

All agents reference:
- prod/docs/MIGRATION.md for status
- prod/docs/CONVENTIONS.md for standards
```

---

## Related External Docs

| Document | Path |
|----------|------|
| Base UI Package | `/docs/v2/base-ui/init.md` |
| V2 Architecture | `/docs/v2/ARCHITECTURE.md` |
| Frontend Guide | `/docs/frontend/INDEX.md` |
| Untitled UI (legacy) | `untitled-ui/README.md` |

---

*Last Updated: January 2026*
