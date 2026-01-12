# Token Architecture

Understanding the layered design token system.

## Overview

The PAYVA style system uses a **three-layer token architecture** that enables automatic dark mode, consistent theming, and property-specific utilities.

## The Three Layers

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: Base Colors                                   │
│  Raw color values in RGB format                         │
│  --color-gray-900: rgb(24 29 39)                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  LAYER 2: Semantic Tokens                               │
│  Purpose-based naming (what the color IS FOR)           │
│  --color-text-primary: var(--color-gray-900)            │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: Property Tokens                               │
│  CSS property-specific (enables Tailwind utilities)     │
│  --text-color-primary: var(--color-text-primary)        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  TAILWIND UTILITIES                                     │
│  Generated classes from property tokens                 │
│  text-primary → { color: var(--text-color-primary) }    │
└─────────────────────────────────────────────────────────┘
```

## Layer 1: Base Colors

Raw color values defined in the `@theme` block:

```css
@theme {
  /* Brand palette */
  --color-brand-50: rgb(249 245 255);
  --color-brand-100: rgb(244 235 255);
  --color-brand-500: rgb(158 119 237);
  --color-brand-600: rgb(127 86 217);
  --color-brand-900: rgb(66 48 125);

  /* Gray palette */
  --color-gray-50: rgb(250 250 250);
  --color-gray-100: rgb(245 245 245);
  --color-gray-900: rgb(24 29 39);
  --color-gray-950: rgb(10 13 18);

  /* Status palettes */
  --color-error-500: rgb(240 68 56);
  --color-success-500: rgb(23 178 106);
  --color-warning-500: rgb(247 144 9);
}
```

**Characteristics:**
- Static values that never change
- Full 25-950 scale for each color family
- Includes: brand, error, warning, success, gray variants, chart colors

## Layer 2: Semantic Tokens

Purpose-based tokens that reference base colors:

```css
@theme {
  /* Text colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-tertiary: var(--color-gray-600);
  --color-text-disabled: var(--color-gray-500);

  /* Background colors */
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-gray-50);
  --color-bg-tertiary: var(--color-gray-100);

  /* Border colors */
  --color-border-primary: var(--color-gray-300);
  --color-border-secondary: var(--color-gray-200);
}
```

**Characteristics:**
- Named by PURPOSE, not appearance
- These are the tokens that swap in dark mode
- Categories: text, bg, border, fg (foreground/icons)

## Layer 3: Property Tokens

CSS property-specific tokens in `@theme inline`:

```css
@theme inline {
  /* Text property tokens */
  --text-color-primary: var(--color-text-primary);
  --text-color-secondary: var(--color-text-secondary);

  /* Background property tokens */
  --background-color-primary: var(--color-bg-primary);
  --background-color-secondary: var(--color-bg-secondary);

  /* Border property tokens */
  --border-color-primary: var(--color-border-primary);
  --border-color-secondary: var(--color-border-secondary);

  /* Ring property tokens */
  --ring-color-primary: var(--color-border-primary);
  --ring-color-brand: var(--color-border-brand);
}
```

**Characteristics:**
- Prefixed with CSS property name
- Enables Tailwind to generate correct utilities
- `@theme inline` tells Tailwind to create utilities

## Dark Mode Implementation

The `.dark-mode` class overrides semantic tokens (Layer 2):

```css
@layer base {
  .dark-mode {
    /* Semantic tokens swap */
    --color-text-primary: var(--color-gray-50);
    --color-bg-primary: var(--color-gray-950);
    --color-border-primary: var(--color-gray-700);

    /* Property tokens also update */
    --text-color-primary: var(--color-text-primary);
    --background-color-primary: var(--color-bg-primary);
  }
}
```

This architecture means:
- You write `text-primary` ONCE
- It automatically uses the correct color in both modes
- No `dark:` variants needed

## Naming Conventions

### Semantic Token Naming

```
--color-{category}-{variant}
--color-{category}-{state}_{modifier}

Examples:
--color-text-primary
--color-bg-brand-solid
--color-border-error_subtle
--color-text-secondary_hover
```

### Property Token Naming

```
--{property}-color-{semantic-name}

Examples:
--text-color-primary
--background-color-secondary
--border-color-brand
--ring-color-error
--outline-color-primary
```

### Generated Utility Naming

```
{property-prefix}-{semantic-name}

Examples:
text-primary        → color: var(--text-color-primary)
bg-secondary        → background-color: var(--background-color-secondary)
border-brand        → border-color: var(--border-color-brand)
ring-error          → --tw-ring-color: var(--ring-color-error)
```

## Semantic Categories

### Hierarchy Tokens (primary/secondary/tertiary/quaternary)

Used for layered UI elements:

| Level | Text | Background | Border |
|-------|------|------------|--------|
| Primary | Main content | Base layer | Standard |
| Secondary | Supporting | Cards, inputs | Subtle |
| Tertiary | Muted | Sections | Very subtle |
| Quaternary | Very muted | Emphasis | Minimal |

### State Tokens (hover, active, disabled)

```css
--color-bg-primary_hover      /* Hover state */
--color-bg-active             /* Active/pressed state */
--color-bg-disabled           /* Disabled state */
--color-bg-disabled_subtle    /* Subtle disabled */
```

### Status Tokens (brand, error, success, warning)

```css
/* Each status has primary, secondary, and solid variants */
--color-bg-error-primary      /* Light error background */
--color-bg-error-secondary    /* Stronger error background */
--color-bg-error-solid        /* Solid error (buttons) */
--color-bg-error-solid_hover  /* Solid error hover */
```

## File Structure

All tokens live in `theme.css`:

```
theme.css
├── @theme { }                    # Lines 1-965
│   ├── Spacing, fonts, radius    # Lines 1-125
│   ├── Base colors               # Lines 128-514
│   ├── Utility colors            # Lines 598-766
│   ├── Chart colors              # Lines 771-818
│   ├── Semantic tokens           # Lines 820-964
│   └── Property tokens (inline)  # Lines 967-1226
│
└── @layer base { .dark-mode }    # Lines 1228-1732
    ├── Utility color overrides   # Lines 1235-1416
    ├── Semantic overrides        # Lines 1442-1560
    └── Property overrides        # Lines 1597-1731
```

## Why This Architecture?

1. **Single Source of Truth**: Change a base color, all tokens update
2. **Automatic Dark Mode**: Swap semantic layer, everything follows
3. **Type Safety**: Tailwind generates only valid utilities
4. **Consistency**: Same utility name = same semantic meaning everywhere
5. **Performance**: CSS custom properties are efficient

## Related

- [Colors](./colors.md): Complete color token reference
- [Spacing & Sizing](./spacing-sizing.md): Non-color tokens
- [All Utilities](../reference/all-utilities.md): Generated utilities
