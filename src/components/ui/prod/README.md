# PAYVA V2 Production Design System

> **Status**: Early Development - NOT PRODUCTION READY
> **Last Updated**: January 2026

The `prod/` directory will be the canonical source for all production-ready V2 components. Components here are built on **Base UI primitives** with PAYVA styling applied directly.

---

## ⚠️ Current State Warning

**These components are NOT ready for production use.**

Known issues:
- **Button**: Missing squircle corner implementation, styling gaps
- **Badge**: Incorrect styling, missing variants
- **Accordion**: Styling incomplete
- **Icon**: Functional but needs audit

Do NOT import from `prod/` in production code until components pass visual QA.

---

## Directory Structure

```
prod/
├── README.md                    # This file
├── docs/                        # Documentation
│   ├── INDEX.md                 # Documentation index
│   ├── ARCHITECTURE.md          # System architecture
│   ├── MIGRATION.md             # Migration tracking & audit log
│   ├── CONVENTIONS.md           # Coding conventions
│   └── BASE-UI-PRIMITIVES.md    # Base UI integration guide
│
├── base/                        # Core primitives (Base UI backed)
│   ├── button/                  # WIP - styling incomplete
│   ├── icon/                    # WIP - functional, needs audit
│   ├── badge/                   # WIP - styling incorrect
│   ├── accordion/               # WIP - styling incomplete
│   └── ...
│
├── features/                    # Higher-level product features
│   └── (not started)
│
└── data/                        # Data display components
    └── (see custom/data/sticky-data-table for production table)
```

---

## Strict Rules

### 1. Import Policy
```typescript
// ALLOWED - Import from prod/ (ONLY when component is marked Ready)
import { Button } from '@/modules/design-system/v2/components/ui/prod/base/button'

// CURRENT - Continue using legacy paths until prod/ is ready
import { Button } from '@/modules/design-system/v2/components/ui/untitled-ui/base/buttons/button'
```

### 2. Icon Policy
```typescript
// ALLOWED - Huge Icons only
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { HugeIcon } from '@/modules/design-system/v2/components/ui/prod/base/icon'

// FORBIDDEN - Untitled UI icons
// import { X01 } from '@untitledui-pro/icons/line'
```

### 3. Base UI First
All new primitives must be built on Base UI. No custom implementations for components Base UI provides.

### 4. Playground Exclusion
Components in `/playground/` are NOT considered "in use" when auditing. Only `/modules/v2/` and `/pages/v2/` count as production usage.

---

## Migration Status

| Category | Component | Status | Blockers |
|----------|-----------|--------|----------|
| **base/** | Button | WIP | Missing squircle corners, styling gaps |
| **base/** | Icon | WIP | Needs visual audit |
| **base/** | Badge | WIP | Incorrect styling, wrong variants |
| **base/** | Input | Ready | Base UI Field + Input primitives |
| **base/** | Checkbox | Ready | Base UI Checkbox primitive |
| **base/** | Accordion | WIP | Styling incomplete |
| **features/** | Display Card | Not Started | Depends on Badge, Icon |
| **features/** | Activity Feed | Not Started | |
| **data/** | Sticky Data Table | Available | Use custom/data/sticky-data-table |

See [docs/MIGRATION.md](./docs/MIGRATION.md) for detailed tracking.

---

## What "Ready" Means

A component is NOT ready until:

- [ ] Visual parity with legacy component
- [ ] Squircle corners implemented (where applicable)
- [ ] All variants match design spec
- [ ] Passes visual QA review
- [ ] Playground demo approved
- [ ] Production consumers can safely switch

---

## Documentation

| Document | Purpose |
|----------|---------|
| [INDEX.md](./docs/INDEX.md) | Documentation overview |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design & decisions |
| [MIGRATION.md](./docs/MIGRATION.md) | Migration tracking & audit |
| [CONVENTIONS.md](./docs/CONVENTIONS.md) | Coding standards |
| [BASE-UI-PRIMITIVES.md](./docs/BASE-UI-PRIMITIVES.md) | Base UI integration |

---

## Related Documentation

- [Base UI Init Guide](/docs/v2/base-ui/init.md) - Base UI package overview
- [V2 Architecture](/docs/v2/ARCHITECTURE.md) - Overall V2 architecture
- [Sticky Data Table](../custom/data/sticky-data-table/docs/FEATURES.md) - Production table docs

---

*For questions or updates, reference this documentation when working with other agents.*
