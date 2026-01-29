# Spacing & Sizing Tokens

Typography, radius, shadows, and other non-color design tokens.

## Overview

Beyond colors, the theme defines tokens for typography, border radius, shadows, and animations. These ensure consistent sizing and spacing across the application.

## Typography

### Font Families

```css
--font-body: 'Neue Haas Grotesk Text', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
--font-display: 'Neue Haas Grotesk Display', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
--font-mono: ui-monospace, 'Roboto Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

**Usage:**

```tsx
<p className="font-body">Body text</p>
<h1 className="font-display">Display heading</h1>
<code className="font-mono">Code snippet</code>
```

### Text Sizes (Body)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px (3 × spacing) | 18px | Captions, labels |
| `text-sm` | 14px (3.5 × spacing) | 20px | Secondary text |
| `text-md` | 16px (4 × spacing) | 24px | Body text |
| `text-lg` | 18px (4.5 × spacing) | 28px | Large body |
| `text-xl` | 20px (5 × spacing) | 30px | Lead text |

**Usage:**

```tsx
<p className="text-xs">Extra small</p>
<p className="text-sm">Small text</p>
<p className="text-md">Medium (default)</p>
<p className="text-lg">Large text</p>
<p className="text-xl">Extra large</p>
```

### Display Sizes (Headings)

| Token | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| `text-display-xs` | 24px (6 × spacing) | 32px | - |
| `text-display-sm` | 30px (7.5 × spacing) | 38px | - |
| `text-display-md` | 36px (9 × spacing) | 44px | -0.72px |
| `text-display-lg` | 48px (12 × spacing) | 60px | -0.96px |
| `text-display-xl` | 60px (15 × spacing) | 72px | -1.2px |
| `text-display-2xl` | 72px (18 × spacing) | 90px | -1.44px |

**Usage:**

```tsx
<h1 className="text-display-xl font-display">Hero Heading</h1>
<h2 className="text-display-lg font-display">Section Heading</h2>
<h3 className="text-display-md font-display">Subsection</h3>
<h4 className="text-display-sm font-display">Card Title</h4>
<h5 className="text-display-xs font-display">Small Title</h5>
```

### Spacing Base

All spacing derives from a 4px (0.25rem) base:

```css
--spacing: 0.25rem;
```

Tailwind's default spacing scale uses this:
- `p-1` = 4px
- `p-2` = 8px
- `p-4` = 16px
- etc.

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0px | Sharp corners |
| `rounded-xs` | 2px | Subtle rounding |
| `rounded-sm` | 4px | Small elements |
| `rounded` / `rounded-DEFAULT` | 4px | Default |
| `rounded-md` | 6px | Inputs, buttons |
| `rounded-lg` | 8px | Cards |
| `rounded-xl` | 12px | Large cards |
| `rounded-2xl` | 16px | Modals |
| `rounded-3xl` | 24px | Large surfaces |
| `rounded-4xl` | 32px | Hero sections |
| `rounded-5xl` | 40px | Extra large |
| `rounded-6xl` | 48px | Maximum |
| `rounded-full` | 9999px | Circles, pills |

**Usage:**

```tsx
<button className="rounded-md">Button</button>
<div className="rounded-xl">Card</div>
<img className="rounded-full" />
```

## Shadows

### Standard Shadows

| Token | Definition | Usage |
|-------|------------|-------|
| `shadow-xs` | Subtle 1px | Inputs, small elements |
| `shadow-sm` | Light elevation | Buttons, tags |
| `shadow-md` | Medium elevation | Cards, dropdowns |
| `shadow-lg` | High elevation | Modals, popovers |
| `shadow-xl` | Maximum elevation | Dialogs |
| `shadow-2xl` | Extra high | Hero cards |
| `shadow-3xl` | Ultra high | Special emphasis |

**Values:**

```css
--shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);

--shadow-sm: 0px 1px 3px rgba(10, 13, 18, 0.1),
             0px 1px 2px -1px rgba(10, 13, 18, 0.1);

--shadow-md: 0px 4px 6px -1px rgba(10, 13, 18, 0.1),
             0px 2px 4px -2px rgba(10, 13, 18, 0.06);

--shadow-lg: 0px 12px 16px -4px rgba(10, 13, 18, 0.08),
             0px 4px 6px -2px rgba(10, 13, 18, 0.03),
             0px 2px 2px -1px rgba(10, 13, 18, 0.04);
```

### Skeuomorphic Shadows

For 3D button effects:

```css
--shadow-skeumorphic: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset,
                      0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset;

--shadow-xs-skeumorphic: var(--shadow-skeumorphic), var(--shadow-xs);
```

**Usage:**

```tsx
<button className="shadow-skeumorphic">3D Button</button>
<button className="shadow-xs-skeumorphic">Elevated 3D</button>
```

### Mockup Shadows

For device/screen mockups:

```css
--shadow-modern-mockup-inner-lg: /* Inner shadow for screens */
--shadow-modern-mockup-outer-lg: /* Outer shadow for devices */
--drop-shadow-iphone-mockup: 20px 12px 18px rgba(16, 24, 40, 0.2);
```

## Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| `xxs` | 320px | Small phones |
| `xs` | 600px | Large phones / Sonner toasts |

**Note:** Standard Tailwind breakpoints (sm, md, lg, xl, 2xl) are also available.

## Max Width

```css
--max-width-container: 1280px;
```

**Usage:**

```tsx
<div className="max-w-container mx-auto">
  Contained content
</div>
```

## Animations

### Keyframes

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes caret-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### Animation Presets

```css
--animate-marquee: marquee 60s linear infinite;
--animate-caret-blink: caret-blink 1s infinite;
```

**Usage:**

```tsx
<div className="animate-marquee">Scrolling text</div>
<span className="animate-caret-blink">|</span>
```

## Common Patterns

### Card with Proper Sizing

```tsx
<div className="
  p-4
  rounded-xl
  shadow-md
  border border-primary
  bg-secondary
">
  <h3 className="text-display-xs font-display text-primary">Title</h3>
  <p className="text-md text-secondary mt-2">Content</p>
</div>
```

### Input with Standard Sizing

```tsx
<input
  className="
    px-3 py-2
    text-md
    rounded-md
    border border-primary
    shadow-xs
    bg-secondary
  "
/>
```

### Button Hierarchy

```tsx
{/* Primary - elevated */}
<button className="px-4 py-2 rounded-lg shadow-sm bg-brand-solid">
  Primary
</button>

{/* Secondary - subtle */}
<button className="px-4 py-2 rounded-lg shadow-xs bg-secondary border border-primary">
  Secondary
</button>

{/* Tertiary - flat */}
<button className="px-4 py-2 rounded-lg bg-tertiary">
  Tertiary
</button>
```

### Responsive Typography

```tsx
<h1 className="
  text-display-sm
  md:text-display-md
  lg:text-display-lg
  font-display
  text-primary
">
  Responsive Heading
</h1>
```

## Related

- [Effects](../utilities/effects.md): Shine, depth, gradient utilities
- [Architecture](./architecture.md): Token structure
- [All Utilities](../reference/all-utilities.md): Complete reference
