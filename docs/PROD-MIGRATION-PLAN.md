# Prod Migration Plan

> Consolidate `prod/` into the organized component structure and delete `prod/` entirely.

---

## Decisions

- **Badge** — use prod version (17 consumers vs 2)
- **Control panel** — use prod version (sidebar + motion, 62 consumers vs 2)
- **Icon** — identical copies, keep `core/primitives/icon/` as canonical home
- **Clawback timer** — identical copies, keep `core/feedback/clawback-timer/`

---

## Why IDE-move-one-at-a-time won't work cleanly

Prod components cross-reference each other heavily:

```
icon ← badge, button, button-utility, filter, menu, control-panel,
        accordion, biaxial-command-menu-v4, button-animation-v2,
        sticky-data-table, featured-icon, metric-card, expanding-search, select
button ← filter, control-panel, button-animation-v2, sticky-data-table
menu ← filter, biaxial-command-menu-v4, sticky-data-table
checkbox ← menu, control-panel, sticky-data-table
tooltip ← button-utility
badge ← sticky-data-table
button-utility ← sticky-data-table
filter ← sticky-data-table
featured-icon ← sticky-data-table
```

Moving `icon` first breaks 14 other prod components until they're also moved. IDE move updates the files that *import* the moved module, but not sibling prod files that haven't moved yet.

---

## Approach: Delete → Move all → Find-replace → Verify

### Step 1: Delete dead weight and duplicate losers

Delete these before moving anything — clears the landing zones and removes noise.

**Zero-import prod components (just delete):**

| Directory | Why |
|-----------|-----|
| `prod/base/accordion/` | 0 external imports |
| `prod/base/clawback-timer/` | 0 imports, identical copy in `core/feedback/` |
| `prod/base/select/` | 0 external imports |
| `prod/features/expanding-search/` | 0 external imports, copy in `deprecated/` |
| `prod/features/featured-icon/` | 0 external imports (only imported by sticky-data-table internally — will need a local replacement or inline) |

**Duplicate losers (delete the version we're NOT keeping):**

| Delete | Keep (winner) |
|--------|---------------|
| `core/primitives/badge/` | `prod/base/badge/` → moving to `core/primitives/badge/` |
| `patterns/control-panel/` | `prod/base/control-panel/` → moving to `patterns/control-panel/` |
| `prod/base/icon/` | `core/primitives/icon/` (already in place) |

**Note on `featured-icon`**: `sticky-data-table` imports it internally at `components/core/table-empty-state.tsx`. After deleting `prod/features/featured-icon/`, that import needs updating — either inline the simple icon wrapper or point it to a local file.

### Step 2: Move all remaining prod directories at once

Move every remaining directory out of `prod/` to its new home:

| From | To |
|------|----|
| `prod/base/badge/` | `core/primitives/badge/` |
| `prod/base/button/` | `core/primitives/button/` |
| `prod/base/button-utility/` | `core/primitives/button-utility/` |
| `prod/base/checkbox/` | `core/inputs/checkbox/` |
| `prod/base/menu/` | `core/primitives/menu/` |
| `prod/base/tooltip/` | `core/feedback/tooltip/` |
| `prod/base/filter/` | `patterns/filter/` |
| `prod/base/control-panel/` | `patterns/control-panel/` |
| `prod/base/biaxial-command-menu-v4/` | `features/command-menu/` |
| `prod/base/button-animation-v2/` | `features/button-animation/` |
| `prod/features/metric-card/` | `features/metric-card/` |
| `prod/data/sticky-data-table/` | `patterns/data-table/` |

You can do this in Finder, IDE sidebar, or `mv` commands — the files don't care where they live until imports are updated.

### Step 3: Global find-replace on import paths

This is the bulk of the work, but it's mechanical. Every import follows a predictable pattern:

| Find | Replace |
|------|---------|
| `@/components/ui/core/primitives/icon` | `@/components/ui/core/primitives/icon` |
| `@/components/ui/core/primitives/badge` | `@/components/ui/core/primitives/badge` |
| `@/components/ui/core/primitives/button'` | `@/components/ui/core/primitives/button'` |
| `@/components/ui/core/primitives/button/` | `@/components/ui/core/primitives/button/` |
| `@/components/ui/core/primitives/button-utility` | `@/components/ui/core/primitives/button-utility` |
| `@/components/ui/core/inputs/checkbox` | `@/components/ui/core/inputs/checkbox` |
| `@/components/ui/core/primitives/menu` | `@/components/ui/core/primitives/menu` |
| `@/components/ui/core/feedback/tooltip` | `@/components/ui/core/feedback/tooltip` |
| `@/components/ui/patterns/filter` | `@/components/ui/patterns/filter` |
| `@/components/ui/patterns/control-panel` | `@/components/ui/patterns/control-panel` |
| `@/components/ui/features/command-menu` | `@/components/ui/features/command-menu` |
| `@/components/ui/features/button-animation` | `@/components/ui/features/button-animation` |
| `@/components/ui/features/metric-card` | `@/components/ui/features/metric-card` |
| `@/components/ui/patterns/data-table` | `@/components/ui/patterns/data-table` |

**Important:** Do `button-utility` and `button-animation` before `button` to avoid partial matches. Same with `biaxial-command-menu-v4` before `menu`.

### Step 4: Delete `prod/` and verify

```bash
rm -rf src/components/ui/prod
pnpm type-check
```

### Step 5: Update barrel exports

Add moved components back to the appropriate `index.ts` files:

- **`core/primitives/index.ts`** — add Badge, Button, ButtonUtility, Menu
- **`core/inputs/index.ts`** — recreate with Checkbox
- **`core/feedback/index.ts`** — add Tooltip
- **`features/index.ts`** — add MetricCard, CommandMenu, ButtonAnimation
- **`patterns/index.ts`** — add Filter, DataTable (control-panel already exported)

---

## Final structure after migration

```
ui/
├── core/
│   ├── primitives/
│   │   ├── badge/              ← from prod/base
│   │   ├── biaxial-expand/     (existing)
│   │   ├── button/             ← from prod/base
│   │   ├── button-utility/     ← from prod/base
│   │   ├── icon/               (existing, prod copy deleted)
│   │   ├── menu/               ← from prod/base
│   │   └── slider/             (existing)
│   ├── inputs/
│   │   └── checkbox/           ← from prod/base
│   └── feedback/
│       ├── clawback-timer/     (existing, prod copy deleted)
│       └── tooltip/            ← from prod/base
│
├── features/
│   ├── button-animation/       ← from prod/base/button-animation-v2
│   ├── command-menu/           ← from prod/base/biaxial-command-menu-v4
│   ├── display-card/           (existing)
│   ├── edit-questions/         (existing)
│   ├── expandable-input/       (existing)
│   ├── metric-card/            ← from prod/features
│   ├── question-command-menu/  (existing)
│   ├── radial-blur/            (existing)
│   ├── stacking-nav/           (existing)
│   └── success-toast/          (existing)
│
├── patterns/
│   ├── control-panel/          ← from prod/base (replaces tab version)
│   ├── data-table/             ← from prod/data/sticky-data-table
│   └── filter/                 ← from prod/base
│
└── deprecated/                 (untouched — 7 items still referenced)
```

No more `prod/`. No more `experimental/`. Clean hierarchy.

---

## Open questions

1. **`featured-icon` in sticky-data-table** — after deleting `prod/features/featured-icon/`, `table-empty-state.tsx` needs its import fixed. Inline it or create a minimal version in `features/`?
2. **Expanding search** — keep the `deprecated/` copy (1 consumer in `_hidden/feed/`) or delete it too?
3. **Barrel exports** — re-export everything from category index files, or prefer direct imports to each component?
