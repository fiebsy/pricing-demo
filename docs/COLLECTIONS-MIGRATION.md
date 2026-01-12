# Collections Dashboard Migration

> Migration of the front-end partner collections page to demo-repo with mock data.

## Overview

This document tracks the migration of `/front-end/src/pages/v2/partners/[partnerId]/collections` to demo-repo as a standalone demo with mock data instead of GraphQL API calls.

**Route**: `/dashboard`

**Status**: Complete

---

## What Was Created

### Collections Module (`/src/modules/collections/`)

| File | Purpose |
|------|---------|
| `types.ts` | Type definitions (PartnerRiskItem, FilterId, MetricFilterId, etc.) |
| `mock-data.ts` | 120 seeded mock items with realistic distributions |
| `index.ts` | Module exports |

### Config (`/src/modules/collections/config/`)

| File | Purpose |
|------|---------|
| `hardened-preset.ts` | Table dimensions, borders, backgrounds, toolbar config |
| `column-config.ts` | 9 column definitions with HARDENED_COLUMNS |
| `filter-config.ts` | Filter definitions, predicates, applyFilters function |
| `index.ts` | Config exports |

### Hooks (`/src/modules/collections/hooks/`)

| File | Purpose |
|------|---------|
| `use-mock-pagination.ts` | Simulated pagination with 300ms delay |

### Components (`/src/modules/collections/components/`)

| File | Purpose |
|------|---------|
| `cell-renderer.tsx` | Table cell rendering for all 9 columns |
| `metric-tile-bar.tsx` | 4 metric cards (At Risk, Last Chance, Clawed Back, Default Rate) |
| `parts/pay-progress-circle.tsx` | SVG circular progress indicator |
| `toolbar/left-toolbar-content.tsx` | Filter menu with FilterSelectChip |
| `toolbar/right-toolbar-content.tsx` | ExpandingSearch |

### Utils (`/src/modules/collections/utils/`)

| File | Purpose |
|------|---------|
| `formatters.ts` | Currency, date, and status formatters |

### Page

| File | Purpose |
|------|---------|
| `/src/app/dashboard/page.tsx` | Main collections dashboard page |

---

## Dependencies Added

```bash
pnpm add date-fns sonner export-to-csv
```

---

## Import Path Fixes

The prod components had import paths referencing `@/modules/design-system/v2/...` (front-end paths). These were updated to `@/components/ui/prod/...` (demo-repo paths).

### Files Updated

- 46 files in `/src/components/ui/prod/` - design system import paths
- 27 files - HugeIcon import paths (`@/components/ui/base/icon/huge-icons/...` → `@/components/ui/prod/base/icon`)

### Bug Fixes

1. **Duplicate ActiveFilter export** in `sticky-data-table/index.tsx` - removed duplicate export
2. **Menu.Trigger button nesting** - added `nativeButton={false}` to allow non-button triggers
3. **Missing utility** - created `/src/lib/is-react-component.ts`

---

## Mock Data Distribution

The mock data generates 120 items with seeded randomness for consistency:

| Category | Count | Description |
|----------|-------|-------------|
| COLLECTIONS | 50 | Orders in collections (various urgency tiers) |
| ACTIVE_CLAWBACK | 40 | Orders with countdown timers |
| SETTLED_CLAWBACK | 30 | Completed clawbacks |

---

## Features

- **1:1 UI parity** with front-end collections page
- **MetricCard** click-to-filter functionality
- **FilterMenu** with submenus (Status, Outcome, Urgency, Balance, Route)
- **ExpandingSearch** with shine border
- **ClawbackTimer** battery countdown
- **PayProgressCircle** indicators
- **Client-side sorting** (click column headers)
- **Infinite scroll** with simulated loading
- **Hardened table configuration** matching production styling

---

## Slash Command

A `/demo-collections` slash command was created at:
```
/Users/derickfiebiger/Payva-Repos/.claude/commands/demo-collections.md
```

Use this command to continue work on the collections dashboard with guardrails enforced.

---

## Guardrails

When working on this feature:

- **READ-ONLY**: `/front-end/` (reference only)
- **READ-ONLY**: `/demo-repo/src/styles/` (no style modifications)
- **MODIFIABLE**: All other demo-repo directories

---

## Navigation

The floating nav bar was updated to include the Dashboard route:

```typescript
const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/', icon: Home01Icon },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: GridIcon },
  { id: 'playground', label: 'Playground', href: '/playground', icon: LeftToRightListBulletIcon },
]
```

---

**Last Updated**: 2026-01-12
