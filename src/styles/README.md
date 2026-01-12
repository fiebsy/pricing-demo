# PAYVA Style System

Semantic design token system for PAYVA built on Tailwind CSS v4 with automatic dark mode support.

**Full Documentation:** [`docs/init.md`](./docs/init.md)

---

## Quick Start

### Use Semantic Tokens (Correct)

```tsx
<p className="text-primary">Body text</p>
<p className="text-secondary">Supporting text</p>
<button className="bg-brand-solid text-primary_on-brand">Action</button>
<div className="border border-primary bg-secondary">Card</div>
```

### Don't Use Raw Colors (Wrong)

```tsx
// Will NOT adapt to dark mode
<p className="text-gray-900">Body text</p>
<div className="bg-white border-gray-300">Card</div>
```

---

## Documentation

| Section | Description | Link |
|---------|-------------|------|
| **Getting Started** | Quick start, dark mode, migration | [docs/getting-started/](./docs/getting-started/init.md) |
| **Design Tokens** | Architecture, colors, spacing | [docs/tokens/](./docs/tokens/init.md) |
| **Utilities** | Colors, typography, borders, effects | [docs/utilities/](./docs/utilities/init.md) |
| **Reference** | All utilities, patterns | [docs/reference/](./docs/reference/init.md) |

### Quick Links

- [Quick Start Guide](./docs/getting-started/quick-start.md)
- [Color Tokens](./docs/tokens/colors.md)
- [Migration Rules](./docs/getting-started/migration-rules.md)
- [Common Patterns](./docs/reference/patterns.md)
- [All Utilities](./docs/reference/all-utilities.md)

---

## File Structure

```
src/styles/
├── README.md           # This file
├── docs/               # Comprehensive documentation
│   ├── init.md         # Documentation entry point
│   ├── getting-started/
│   ├── tokens/
│   ├── utilities/
│   └── reference/
│
├── globals.css         # Tailwind v4 entry point
├── base.css            # Browser resets & base styles
├── theme.css           # Semantic design tokens (~1700 lines)
│
├── fonts/              # Font files
│   └── neue-haas-grotesk/
│
└── utilities/          # Custom Tailwind utilities
    ├── colors.css      # Text/background/border colors
    ├── borders.css     # Border utilities
    ├── rings.css       # Focus ring utilities
    ├── outlines.css    # Outline utilities
    ├── typography.css  # Font families & display sizes
    ├── animations.css  # Animation classes & keyframes
    ├── gradients.css   # Gradient utilities
    ├── depth.css       # Subtle depth effects
    ├── shine.css       # Shine border effects
    ├── corners.css     # Corner shape utilities
    ├── misc.css        # Scrollbar, transitions
    ├── silk-styles.css # SILK component styles
    └── components-overrides.css
```

---

## Token Architecture

```
Base Colors → Semantic Tokens → Property Tokens → Tailwind Utilities
```

| Layer | Example | Purpose |
|-------|---------|---------|
| Base | `--color-gray-900` | Raw RGB values |
| Semantic | `--color-text-primary` | Purpose-based naming |
| Property | `--text-color-primary` | CSS property binding |
| Utility | `text-primary` | Tailwind class |

When `.dark-mode` class is applied, semantic tokens remap automatically. Your code stays the same.

---

## Quick Reference

### Text Colors

```tsx
text-primary       // Main text
text-secondary     // Supporting text
text-tertiary      // Muted text
text-disabled      // Disabled state
text-brand-*       // Brand colors
text-error-*       // Error states
text-success-*     // Success states
text-warning-*     // Warning states
```

### Backgrounds

```tsx
bg-primary         // Main surface
bg-secondary       // Cards, inputs
bg-tertiary        // Sections
bg-brand-solid     // Brand buttons
bg-error-primary   // Error background
bg-success-primary // Success background
```

### Borders & Rings

```tsx
border-primary     // Standard border
border-secondary   // Subtle border
border-brand       // Brand accent
ring-brand         // Focus ring
ring-error         // Error focus
```

### Typography

```tsx
font-display       // Headings
font-body          // Body text
text-display-*     // xs, sm, md, lg, xl, 2xl
```

### Effects

```tsx
shine-1            // Glossy effect
shine-1-shadow-md  // Shine + shadow
depth-gradient-1   // Subtle depth
corner-squircle    // iOS-style corners
```

---

## Dark Mode

Dark mode uses `.dark-mode` class on a parent element:

```tsx
<div className="dark-mode">
  <p className="text-primary">Auto-adapts to dark!</p>
</div>
```

No `dark:` variants needed - tokens swap automatically.

---

## Common Patterns

### Card

```tsx
<div className="bg-secondary border border-primary rounded-xl p-4">
  <h3 className="text-primary font-medium">Title</h3>
  <p className="text-secondary mt-2">Description</p>
</div>
```

### Button

```tsx
<button className="bg-brand-solid hover:bg-brand-solid_hover text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand">
  Submit
</button>
```

### Input

```tsx
<input
  className="bg-secondary border border-primary rounded-md px-3 py-2 text-primary placeholder:text-placeholder focus:ring-2 focus:ring-brand"
  placeholder="Enter text..."
/>
```

See [Patterns Reference](./docs/reference/patterns.md) for more examples.

---

## Style Migration Rules

When migrating or refactoring, **preserve all styles exactly as-is**.

```tsx
// WRONG - Removing classes
// Source: "flex items-center gap-2 px-4 py-2"
// Target: "flex gap-2 px-4"  // Missing classes

// CORRECT - 1:1 preservation
// Source: "flex items-center gap-2 px-4 py-2"
// Target: "flex items-center gap-2 px-4 py-2"
```

See [Migration Rules](./docs/getting-started/migration-rules.md) for conversion tables.

---

## Dependencies

- **Tailwind CSS:** v4.0.0
- **Fonts:** Neue Haas Grotesk (Display + Text)

---

**Last Updated:** January 2025
