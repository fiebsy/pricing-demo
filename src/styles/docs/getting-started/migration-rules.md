# Migration Rules

Converting hardcoded colors to semantic tokens.

## Overview

When migrating existing code, replace raw color utilities with their semantic equivalents. This ensures dark mode support and consistent theming.

## Background Colors

### Gray Scale

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `bg-white` | `bg-primary` | Main content background |
| `bg-gray-50` | `bg-secondary` | Cards, inputs, subtle bg |
| `bg-gray-100` | `bg-tertiary` | Emphasized sections |
| `bg-gray-200` | `bg-quaternary` | Maximum emphasis |
| `bg-gray-900` | `bg-inverted-primary` | Inverted elements |

### Brand Colors

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `bg-brand-50` | `bg-brand-primary` | Light brand background |
| `bg-brand-100` | `bg-brand-secondary` | Accent areas |
| `bg-brand-600` | `bg-brand-solid` | Solid brand buttons |
| `bg-brand-700` | `bg-brand-solid_hover` | Hover state |

### Status Colors

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `bg-error-50` | `bg-error-primary` | Error background |
| `bg-error-100` | `bg-error-secondary` | Strong error bg |
| `bg-error-600` | `bg-error-solid` | Solid error button |
| `bg-success-50` | `bg-success-primary` | Success background |
| `bg-warning-50` | `bg-warning-primary` | Warning background |

## Text Colors

### Gray Scale

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `text-gray-900` | `text-primary` | Main text |
| `text-gray-700` | `text-secondary` | Supporting text |
| `text-gray-600` | `text-tertiary` | Muted text |
| `text-gray-500` | `text-quaternary` | Very muted |
| `text-gray-400` | `text-disabled` | Disabled state |
| `text-white` | `text-white` | Keep as-is (on dark bg) |

### Status Colors

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `text-error-600` | `text-error-primary` | Error text |
| `text-success-600` | `text-success-primary` | Success text |
| `text-warning-600` | `text-warning-primary` | Warning text |
| `text-brand-700` | `text-brand-secondary` | Brand accent text |

## Border Colors

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `border-gray-300` | `border-primary` | Standard border |
| `border-gray-200` | `border-secondary` | Subtle border |
| `border-gray-100` | `border-tertiary` | Very subtle border |
| `border-brand-500` | `border-brand` | Brand accent |
| `border-error-500` | `border-error` | Error state |

## Ring Colors (Focus)

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `ring-gray-300` | `ring-primary` | Standard focus ring |
| `ring-brand-500` | `ring-brand` | Brand focus ring |
| `ring-error-500` | `ring-error` | Error focus ring |

## Foreground Colors (Icons)

For icon colors, use `text-fg-*` utilities:

| Old (Hardcoded) | New (Semantic) | Use Case |
|-----------------|----------------|----------|
| `text-gray-900` | `text-fg-primary` | Primary icon |
| `text-gray-700` | `text-fg-secondary` | Secondary icon |
| `text-gray-600` | `text-fg-tertiary` | Tertiary icon |
| `text-gray-400` | `text-fg-quaternary` | Muted icon |
| `text-brand-600` | `text-fg-brand-primary` | Brand icon |
| `text-error-600` | `text-fg-error-primary` | Error icon |

## Hover States

Always pair base colors with semantic hover variants:

| Base | Hover | Use Case |
|------|-------|----------|
| `bg-primary` | `hover:bg-primary_hover` | Primary bg hover |
| `bg-secondary` | `hover:bg-secondary_hover` | Secondary bg hover |
| `bg-brand-solid` | `hover:bg-brand-solid_hover` | Brand button hover |
| `text-secondary` | `hover:text-secondary_hover` | Link hover |
| `text-fg-secondary` | `hover:text-fg-secondary_hover` | Icon hover |

## Special Cases

### Placeholder Text

```tsx
// Old
<input className="placeholder:text-gray-400" />

// New
<input className="placeholder:text-placeholder" />
```

### Disabled States

```tsx
// Old
<button className="disabled:bg-gray-100 disabled:text-gray-400">

// New
<button className="disabled:bg-disabled disabled:text-disabled">
```

### Overlay/Backdrop

```tsx
// Old
<div className="bg-gray-900/50" />

// New
<div className="bg-overlay/50" />
```

## Migration Checklist

- [ ] Replace `bg-white` with `bg-primary`
- [ ] Replace `bg-gray-*` with appropriate semantic token
- [ ] Replace `text-gray-*` with `text-primary/secondary/tertiary`
- [ ] Replace `border-gray-*` with `border-primary/secondary`
- [ ] Add `_hover` variants for interactive elements
- [ ] Replace icon colors with `text-fg-*` tokens
- [ ] Remove `dark:` prefixes (tokens handle dark mode)
- [ ] Test in both light and dark modes

## Example Migration

### Before

```tsx
<div className="bg-white border border-gray-200 rounded-lg p-4">
  <h3 className="text-gray-900 font-medium">Title</h3>
  <p className="text-gray-600 mt-1">Description</p>
  <button className="
    bg-purple-600
    hover:bg-purple-700
    text-white
    rounded-md
    px-4 py-2
    dark:bg-purple-500
    dark:hover:bg-purple-600
  ">
    Action
  </button>
</div>
```

### After

```tsx
<div className="bg-secondary border border-primary rounded-lg p-4">
  <h3 className="text-primary font-medium">Title</h3>
  <p className="text-tertiary mt-1">Description</p>
  <button className="
    bg-brand-solid
    hover:bg-brand-solid_hover
    text-white
    rounded-md
    px-4 py-2
  ">
    Action
  </button>
</div>
```

## Related

- [Colors](../tokens/colors.md): Complete color token reference
- [All Utilities](../reference/all-utilities.md): Full utility list
