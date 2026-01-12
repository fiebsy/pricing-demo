# Migration Tracking & Audit Log

> Sequential tracking of component migrations from legacy paths to prod/.
> Update this file whenever you migrate, modify, or audit a component.

---

## ⚠️ Current State

**No components are production-ready yet.** All base/ components have styling issues that must be resolved before use.

---

## Migration Overview

### Source Paths (Legacy - Being Deprecated)

| Path | Contains | Status |
|------|----------|--------|
| `untitled-ui/base/` | Button, Input, Badge, etc. | Active - migrating |
| `untitled-ui/application/` | Table, Modal, DatePicker | Active - migrating |
| `untitled-ui/foundations/` | Featured Icon, Logos | Active - migrating |
| `custom/base/` | Clawback timer, Skwircle, Icons | Active - migrating |
| `custom/features/` | Display Card, Activity Feed | Active - migrating |
| `custom/controls/` | Unified Control Panel | Active - migrating |
| `custom/expanding-search/` | Expandable search | Active - migrating |
| `base-ui/v2/` | Filter system (WIP) | WIP - will merge |

### Target Path

```
prod/
├── base/       # Core primitives
├── features/   # Product features
└── data/       # Data components
```

---

## Priority Queue

### Phase 1: Low-Hanging Fruit
| Component | Source | Target | Priority | Status | Blockers |
|-----------|--------|--------|----------|--------|----------|
| Button | untitled-ui/base | prod/base/button | P0 | **WIP** | Missing squircle corners, styling gaps |
| Icon (HugeIcon) | custom/base/icon | prod/base/icon | P0 | **WIP** | Needs visual audit |
| Badge | untitled-ui/base | prod/base/badge | P0 | **WIP** | Incorrect styling, wrong variants |
| Accordion | animated-line | prod/base/accordion | P0 | **Migrated** | Base UI primitives |

### Phase 2: Features
| Component | Source | Target | Priority | Status |
|-----------|--------|--------|----------|--------|
| FeaturedIcon | untitled-ui/foundations | prod/features/featured-icon | P0 | **Migrated** |
| Display Card | custom/features | prod/features/display-card | P1 | Not Started |
| Activity Feed | custom/features | prod/features/activity-feed | P1 | Not Started |
| Animated Line | custom/features | prod/features/animated-line | P1 | Not Started |
| Expanding Search | custom/expanding-search | prod/features/expanding-search | P1 | **Migrated** |
| Control Panel | custom/controls | prod/features/control-panel | P1 | Not Started |
| Clawback Timer | custom/base | prod/features/clawback-timer | P1 | Not Started |

### Phase 3: Data Components
| Component | Source | Target | Priority | Status |
|-----------|--------|--------|----------|--------|
| Sticky Data Table | ~~custom/data/sticky-data-table~~ | prod/data/sticky-data-table | P1 | **Migrated** - See [STICKY-DATA-TABLE-AUDIT.md](./STICKY-DATA-TABLE-AUDIT.md) |
| Filter Menu | base-ui/v2 | prod/base/filter-menu | P2 | WIP |
| Filter Chip | base-ui/v2 | prod/base/filter-chip | P2 | WIP |

### Phase 4: Remaining Untitled UI
| Component | Source | Status | Notes |
|-----------|--------|--------|-------|
| Input | untitled-ui/base | **Migrated** | Base UI Field + Input primitives |
| Select | untitled-ui/base | Not Started | Needs usage audit |
| Checkbox | untitled-ui/base | Not Started | Needs usage audit |
| Modal | untitled-ui/application | Not Started | Needs usage audit |
| Table | untitled-ui/application | Not Started | Replace with sticky table |
| DatePicker | untitled-ui/application | Not Started | Complex - low priority |

---

## Production Usage Audit

### Files Importing from Legacy Paths

Run this command to audit current usage:
```bash
grep -r "from '@/modules/design-system/v2/components/ui/(untitled-ui|custom)" \
  --include="*.tsx" --include="*.ts" \
  front-end/src/modules/v2/ front-end/src/pages/v2/
```

### Current Count: 29 files (as of January 2026)

Key consumers:
- `collections-v3/` - Heavy usage
- `internal-collections/` - Heavy usage
- `activity/` - Activity feed
- `shared/search/` - Global search

**Note**: Files in `/playground/` are excluded from this audit.

---

## Migration Log

### January 2026

| Date | Component | Action | Agent/Author | Notes |
|------|-----------|--------|--------------|-------|
| Jan 4 | prod/ structure | Created | Claude | Initial setup with docs |
| Jan 4 | Button | Scaffolded | Claude | Base UI integration, has styling issues |
| Jan 4 | Icon (HugeIcon) | Scaffolded | Claude | Wrapper for @hugeicons-pro, needs audit |
| Jan 4 | Badge | Scaffolded | Claude | Has incorrect styling |
| Jan 4 | Accordion | Scaffolded | Claude | Styling incomplete |
| Jan 4 | Playground | Created | Claude | /playground/ui/gallery/prod-design-system |
| Jan 4 | Button/Badge | Fixed | Claude | Replaced dynamic require() with static import |
| Jan 5 | Input | Migrated | Claude | Base UI Field + Input primitives, visual parity confirmed |
| Jan 5 | ButtonUtility | Migrated | Claude | Base UI Button primitive, exact style parity, supports anchor links |
| Jan 5 | Accordion | Migrated | Claude | Base UI Accordion primitives, compound component API |
| Jan 6 | StickyDataTable | Migrated to prod/data | Claude | Moved from custom/data/, sub-component PROD integration ongoing |
| Jan 6 | FeaturedIcon | Migrated | Claude | Created prod/features/featured-icon, uses prod/base/icon HugeIcon wrapper |
| Jan 6 | TableEmptyState | Updated | Claude | Now uses prod/base/button, prod/features/featured-icon, Hugeicons |

<!-- Add entries as migrations happen -->

---

## Known Issues

### Button
- [ ] Missing squircle corner implementation
- [ ] Styling gaps vs legacy button
- [ ] Needs visual comparison audit

### Badge
- [ ] Incorrect styling across all variants
- [ ] Colors don't match design spec
- [ ] Size variants need adjustment

### Accordion
- [x] ~~Styling incomplete~~ - Migrated to Base UI
- [x] ~~Animation timing needs review~~ - Uses Base UI CSS variables for height animation

### Icon (HugeIcon)
- [ ] Functional but needs visual audit
- [ ] Verify all icon sizes render correctly

---

## Component Audit Template

When auditing a component for migration, document:

```markdown
### [Component Name]

**Source**: `path/to/source`
**Target**: `prod/category/component`

#### Current Usage
- [ ] List files importing this component
- [ ] Count: X production files

#### Base UI Mapping
- [ ] Identify Base UI primitive (if any)
- [ ] Document differences from current implementation

#### Migration Notes
- [ ] Breaking changes
- [ ] Props to preserve
- [ ] Props to deprecate

#### Visual QA
- [ ] Side-by-side comparison with legacy
- [ ] All variants checked
- [ ] All states checked (hover, active, disabled, focus)

#### Status
- [ ] Scaffolded
- [ ] Styling complete
- [ ] Visual QA passed
- [ ] Consumers updated
- [ ] Legacy removed
```

---

## Idle Component Detection

Components that exist but have zero production imports should be flagged for removal or archival.

### Potentially Idle (needs verification)
- `custom/base/deprecated-squircle/` - Marked deprecated
- Various untitled-ui components not in usage audit

### Verification Command
```bash
# Check if a component is imported anywhere in production
grep -r "from.*component-name" \
  --include="*.tsx" --include="*.ts" \
  front-end/src/modules/v2/ front-end/src/pages/v2/
```

---

## Blocking Dependencies

Some components depend on others. Migration order matters:

```
Button → (none) - WIP
Badge → (none) - WIP
Icon → (none) - WIP
Accordion → Icon - WIP

Display Card → Badge, Icon (blocked by Badge/Icon)
Activity Feed → Icon, Avatar (blocked by Icon)
Control Panel → Button, Icon, Filter components (blocked)

Sticky Data Table → Button, Checkbox, Tooltip, many others
```

---

## Success Criteria Per Component

Before marking a component as "Ready":

- [ ] Built on Base UI primitive (where applicable)
- [ ] Uses Huge Icons only
- [ ] Uses semantic color tokens
- [ ] Includes motion-reduce support
- [ ] Has TypeScript types exported
- [ ] Has index.ts barrel file
- [ ] **Visual parity with legacy component**
- [ ] **Squircle corners implemented (where applicable)**
- [ ] **Passes visual QA review**
- [ ] Playground example exists
- [ ] All production consumers updated

---

## Rollback Plan

If a migrated component has issues:

1. Consumers can temporarily import from legacy path
2. Fix issues in prod/ version
3. Re-update consumers

Legacy paths will not be deleted until all consumers are stable on prod/.

---

*Update this file with every migration action.*
