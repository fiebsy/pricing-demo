# PAYVA Styles - Tailwind v4 + Semantic Design Tokens

**Purpose:** Semantic design token system for PAYVA dashboard with automatic dark mode support.

---

## Quick Start

### Use Semantic Tokens (Correct)

```tsx
<p className="text-primary">Body text</p>
<p className="text-secondary">Supporting text</p>
<button className="bg-brand-solid text-primary_on-brand">Action</button>
<div className="border border-primary bg-primary">Card</div>
```

### Don't Use Raw Colors (Wrong)

```tsx
// Will NOT adapt to dark mode
<p className="text-gray-900">Body text</p>
<div className="bg-white border-gray-300">Card</div>
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| **[THEME-STRUCTURE.md](./docs/THEME-STRUCTURE.md)** | Deep dive into theme.css token architecture |
| **[UTILITIES-GUIDE.md](./docs/UTILITIES-GUIDE.md)** | Complete utilities reference with examples |
| **[HOW-TO-GUIDES.md](./docs/HOW-TO-GUIDES.md)** | Step-by-step guides for common tasks |

---

## File Structure

```
src/styles/
├── README.md           # This file (entry point)
├── docs/               # Detailed documentation
│   ├── THEME-STRUCTURE.md
│   ├── UTILITIES-GUIDE.md
│   └── HOW-TO-GUIDES.md
│
├── globals.css         # Tailwind v4 entry point
├── base.css            # Browser resets & base styles
├── theme.css           # Semantic design tokens (1,672 lines)
│
├── fonts/              # Font files
│   └── neue-haas-grotesk/
│
└── utilities/          # Custom Tailwind utilities (3,710 lines)
    ├── colors.css      # Text/background/border colors
    ├── borders.css     # Border utilities
    ├── rings.css       # Focus ring utilities
    ├── outlines.css    # Outline utilities
    ├── typography.css  # Font families & display sizes
    ├── animations.css  # Animation classes & keyframes
    ├── gradients.css   # Gradient utilities
    ├── depth.css       # Subtle depth effects
    ├── shine.css       # Shine border effects
    ├── corners.css     # Corner utilities
    ├── misc.css        # Scrollbar, transitions
    ├── silk-styles.css # Silk component styles
    └── components-overrides.css # Third-party overrides
```

---

## Token Architecture

### The 3-Level Token System

```
Level 1: BASE COLORS (static)
         --color-brand-600: rgb(127 86 217)
                    ↓
Level 2: SEMANTIC TOKENS (theme-aware)
         Light: --color-bg-brand-solid: var(--color-brand-600)
         Dark:  --color-bg-brand-solid: var(--color-brand-600)
                    ↓
Level 3: PROPERTY TOKENS (Tailwind v4)
         @theme inline { --background-color-brand-solid: var(--color-bg-brand-solid) }
                    ↓
UTILITY: @utility bg-brand-solid { background-color: var(--background-color-brand-solid) }
                    ↓
USAGE:   <button className="bg-brand-solid">Click me</button>
```

**Key insight:** When `.dark-mode` class is applied, Level 2 tokens remap automatically. Your code stays the same.

---

## Quick Reference

### Text Colors

| Utility | Purpose | Light | Dark |
|---------|---------|-------|------|
| `text-primary` | Body text | gray-900 | gray-50 |
| `text-secondary` | Supporting text | gray-700 | gray-300 |
| `text-tertiary` | Muted text | gray-600 | gray-400 |
| `text-brand-primary` | Brand text | brand-900 | gray-50 |
| `text-error-primary` | Error text | error-600 | error-400 |
| `text-warning-primary` | Warning text | warning-600 | warning-400 |
| `text-success-primary` | Success text | success-600 | success-400 |

### Background Colors

| Utility | Purpose |
|---------|---------|
| `bg-primary` | Main surface |
| `bg-secondary` | Secondary surface |
| `bg-tertiary` | Tertiary surface |
| `bg-brand-solid` | CTA buttons |
| `bg-brand-primary` | Subtle brand surface |
| `bg-error-primary` | Error background |
| `bg-success-primary` | Success background |

### Border Colors

| Utility | Purpose |
|---------|---------|
| `border` | Default border (all sides) |
| `border-t/b/l/r/x/y` | Directional borders |
| `border-primary` | Default border color |
| `border-secondary` | Subtle border |
| `border-brand` | Brand accent border |
| `border-error` | Error border |

### Focus Rings

| Utility | Purpose |
|---------|---------|
| `ring-brand` | Brand focus ring |
| `ring-primary` | Default focus ring |
| `ring-error` | Error focus ring |

### Typography

| Utility | Purpose |
|---------|---------|
| `font-display` | Headings (Neue Haas Grotesk Display) |
| `font-body` | Body text (Neue Haas Grotesk Text) |
| `text-display-xs/sm/md/lg/xl/2xl` | Display text sizes |

### Depth Effects

```tsx
// Subtle depth gradient backgrounds
<div className="subtle-depth-20-primary bg-primary">Primary depth</div>
<div className="subtle-depth-30-brand bg-primary">Brand depth</div>
// Directions: -left, -right, -top, -bottom
```

---

## Dark Mode

Dark mode uses `.dark-mode` class on a parent element:

```tsx
<div className="dark-mode">
  <p className="text-primary">Auto-adapts to dark!</p>
</div>
```

**How it works:**
1. Light mode: `--color-text-primary` = gray-900 (dark)
2. Dark mode: `--color-text-primary` = gray-50 (light)
3. Your `text-primary` class automatically shows the right color

---

## Common Patterns

### Card

```tsx
<div className="bg-primary border border-primary rounded-lg p-6">
  <h3 className="text-primary">Title</h3>
  <p className="text-secondary">Description</p>
</div>
```

### Button (Primary)

```tsx
<button className="bg-brand-solid hover:bg-brand-solid_hover text-primary_on-brand px-4 py-2 rounded-lg focus:ring-2 focus:ring-brand">
  Submit
</button>
```

### Form Input

```tsx
<input
  className="bg-primary border border-primary text-primary placeholder:text-placeholder rounded-lg px-4 py-2 focus:border-brand focus:ring-2 focus:ring-brand"
  placeholder="Enter text..."
/>
```

### Alert

```tsx
<div className="bg-error-primary border-l-4 border-error p-4">
  <p className="text-error-primary">Error message</p>
</div>
```

---

## Adding New Tokens

Quick 4-step process (see [HOW-TO-GUIDES.md](./docs/HOW-TO-GUIDES.md) for details):

1. **Add semantic token** in `theme.css` Section 3
2. **Add property token** in `theme.css` @theme inline
3. **Add dark mode override** in `theme.css` .dark-mode
4. **Create utility** in `utilities/colors.css`

---

## Testing

**Design system audit page:** `/playground/deprecated/v2-design-system-audit`

---

## Dependencies

- **Tailwind CSS:** v4.0.0
- **Fonts:** Neue Haas Grotesk (Display + Text)

---

**Last Updated:** December 2025
