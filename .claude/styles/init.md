# PAYVA Style System

Comprehensive design token and utility system built on Tailwind CSS v4.

**Location**: `front-end/src/styles/`

---

## Getting Started

- [Quick Start](./getting-started/quick-start.md): Essential patterns and first steps
- [Dark Mode](./getting-started/dark-mode.md): Theme switching implementation
- [Migration Rules](./getting-started/migration-rules.md): Moving from hardcoded values

---

## Design Tokens

- [Architecture](./tokens/architecture.md): Token layers and naming conventions
- [Colors](./tokens/colors.md): Base, semantic, and property color tokens
- [Spacing & Sizing](./tokens/spacing-sizing.md): Typography, radius, shadows

---

## Utilities

- [Colors](./utilities/colors.md): Text, background, border color classes
- [Typography](./utilities/typography.md): Font families and display scales
- [Borders & Rings](./utilities/borders-rings.md): Focus states and decorative borders
- [Effects](./utilities/effects.md): Shine, depth, gradients, animations

---

## Reference

- [All Utilities](./reference/all-utilities.md): Complete utility reference table
- [Patterns](./reference/patterns.md): Common patterns and recipes

---

## Quick Reference

### Most Common Operations

```tsx
// Semantic backgrounds
className="bg-primary"        // Main content bg
className="bg-secondary"      // Subtle bg (cards, inputs)
className="bg-tertiary"       // Emphasized sections

// Semantic text
className="text-primary"      // Main text
className="text-secondary"    // Supporting text
className="text-tertiary"     // Muted text

// Borders
className="border border-primary"   // Standard border
className="ring-1 ring-primary"     // Focus ring style

// Status colors
className="bg-error-primary text-error-primary"
className="bg-success-primary text-success-primary"
className="bg-warning-primary text-warning-primary"
```

### File Structure

| File | Purpose |
|------|---------|
| `globals.css` | Entry point - imports all styles |
| `base.css` | Browser resets, font rendering |
| `theme.css` | Design tokens (1700+ lines) |
| `utilities/*.css` | Custom Tailwind utilities |

---

## Related Documentation

| Topic | Location |
|-------|----------|
| V2 Architecture | `docs/v2/ARCHITECTURE.md` |
| Component Design | `docs/v2/base-ui/` |
| Frontend Guide | `docs/frontend/INDEX.md` |
