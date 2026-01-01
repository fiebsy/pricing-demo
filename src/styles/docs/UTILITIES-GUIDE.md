# Utilities Guide - Complete Reference

**Location:** `src/styles/utilities/` (13 files, 3,710 lines total)
**Purpose:** Custom Tailwind v4 utilities using semantic design tokens
**Related:** [README.md](../README.md) | [THEME-STRUCTURE.md](./THEME-STRUCTURE.md) | [HOW-TO-GUIDES.md](./HOW-TO-GUIDES.md)

---

## 📊 Overview

All utilities in this system use **semantic design tokens** from theme.css, ensuring automatic dark mode adaptation.

### File Structure

```
utilities/
├── colors.css                604 lines   Text, background, border colors
├── depth.css               1,025 lines   Subtle depth gradient effects
├── gradients.css             626 lines   Gradient utilities
├── shine.css                 516 lines   Shine border effects
├── components-overrides.css  239 lines   Third-party overrides
├── typography.css             57 lines   Font families & display sizes
├── animations.css            173 lines   Animation classes & keyframes
├── rings.css                 109 lines   Focus ring utilities
├── borders.css                66 lines   Border utilities
├── outlines.css               52 lines   Outline utilities
├── corners.css                41 lines   Corner utilities
├── misc.css                   19 lines   Miscellaneous helpers
└── silk-styles.css           183 lines   Silk component styles
                            ───────────
Total:                      3,710 lines
```

### Quick Stats

| Category | Count | Auto Dark Mode | File |
|----------|-------|----------------|------|
| **Text Colors** | 13 utilities | ✅ Yes | colors.css |
| **Background Colors** | 38 utilities | ✅ Yes | colors.css |
| **Border Colors** | 5 utilities | ✅ Yes | colors.css |
| **Border Directional** | 7 utilities | ✅ Yes | borders.css |
| **Ring/Focus** | 10 utilities | ✅ Yes | rings.css |
| **Outline** | 9 utilities | ✅ Yes | outlines.css |
| **Miscellaneous** | 2 utilities | N/A | misc.css |
| **Total** | 84 utilities | | |

---

## 🎨 borders.css (48 lines)

**Purpose:** Border utilities with default semantic token values.

**Key Feature:** All border utilities automatically apply `--border-color-DEFAULT` unless overridden with a specific border color utility.

### Complete Utility List

```css
/* Base border (all sides) */
border                  /* 1px solid + default color */

/* Directional borders */
border-t                /* Top only */
border-b                /* Bottom only */
border-l                /* Left only */
border-r                /* Right only */
border-x                /* Left + Right */
border-y                /* Top + Bottom */
```

### How They Work

Each utility sets:
1. **Width:** 1px
2. **Style:** solid
3. **Color:** `var(--border-color-DEFAULT)` (references `--color-border-primary`)

```css
@utility border {
  border-width: 1px;
  border-style: solid;
  border-color: var(--border-color-DEFAULT);
}
```

### Usage Examples

#### Basic Border
```tsx
<div className="border">
  Default border (all sides)
</div>
```

**Renders as:**
- Light mode: 1px solid #D5D7DA (gray-300)
- Dark mode: 1px solid #414551 (gray-700)

#### Directional Borders
```tsx
<div className="border-t">Top border only</div>
<div className="border-b">Bottom border only</div>
<div className="border-x">Left and right borders</div>
<div className="border-y">Top and bottom borders</div>
```

#### Combined with Border Colors
```tsx
<div className="border border-brand">
  Brand-colored border
</div>

<input className="border border-primary focus:border-brand" />
```

#### Common Card Pattern
```tsx
<div className="border border-primary rounded-lg p-4">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Dark Mode Behavior

**Automatic:** Border color adapts based on `--border-color-DEFAULT` remapping.

```css
/* Light mode */
--border-color-DEFAULT: var(--color-border-primary);
  → var(--color-gray-300)
  → rgb(213 215 218)

/* Dark mode */
.dark-mode {
  --border-color-DEFAULT: var(--color-border-primary);
    → var(--color-gray-700)
    → rgb(55 58 65)
}
```

### Override with Semantic Colors

```tsx
{/* Primary border (default) */}
<div className="border border-primary" />

{/* Subtle border */}
<div className="border border-secondary" />

{/* Brand border */}
<div className="border border-brand" />

{/* Error border */}
<div className="border border-error" />
```

---

## 🎨 colors.css (210 lines)

**Purpose:** Text, background, and border color utilities using semantic tokens.

**Contains:** 56 utilities organized into 3 categories.

---

### Category 1: Text Colors (13 utilities)

#### Hierarchy Text Colors

```css
text-primary            /* Body text (darkest/most prominent) */
text-secondary          /* Supporting text */
text-tertiary           /* Muted text */
text-quaternary         /* Most subtle text */
```

**Usage:**
```tsx
<h1 className="text-primary">Main Heading</h1>
<p className="text-secondary">Supporting description</p>
<span className="text-tertiary">Metadata</span>
<small className="text-quaternary">Fine print</small>
```

**Light vs Dark:**
```css
/* Light */
text-primary    → --color-gray-900 → rgb(24 29 39)    /* Dark gray */
text-secondary  → --color-gray-700 → rgb(65 70 81)
text-tertiary   → --color-gray-600 → rgb(83 88 98)
text-quaternary → --color-gray-500 → rgb(113 118 128)

/* Dark */
text-primary    → --color-gray-50  → rgb(247 247 247) /* Light gray */
text-secondary  → --color-gray-300 → rgb(206 207 210)
text-tertiary   → --color-gray-400 → rgb(148 151 156)
text-quaternary → --color-gray-400 → rgb(148 151 156)
```

#### Special Context Text Colors

```css
text-white              /* Always white (no dark mode change) */
text-disabled           /* Disabled text state */
text-placeholder        /* Form placeholder text */
```

**Usage:**
```tsx
<button className="bg-brand-solid text-white">
  Button Text
</button>

<input
  className="text-primary placeholder:text-placeholder"
  placeholder="Enter name..."
  disabled
/>
```

#### Brand Text Colors

```css
text-brand-primary      /* Primary brand text */
```

**Usage:**
```tsx
<a href="#" className="text-brand-primary hover:underline">
  Brand Link
</a>

<p className="text-brand-primary font-semibold">
  Featured Text
</p>
```

#### Status Text Colors

```css
text-error-primary      /* Error/destructive text */
text-warning-primary    /* Warning text */
text-success-primary    /* Success text */
```

**Usage:**
```tsx
<p className="text-error-primary">Error: Invalid input</p>
<p className="text-warning-primary">Warning: Low stock</p>
<p className="text-success-primary">Success: Order placed</p>
```

**Color Values:**
```css
/* Light mode */
text-error-primary   → --color-error-600   → rgb(217 45 32)
text-warning-primary → --color-warning-600 → rgb(220 104 3)
text-success-primary → --color-success-600 → rgb(7 148 85)

/* Dark mode */
text-error-primary   → --color-error-400   → rgb(249 112 102)
text-warning-primary → --color-warning-400 → rgb(253 176 34)
text-success-primary → --color-success-400 → rgb(71 205 137)
```

#### On-Brand Text Colors

For text on brand-colored backgrounds:

```css
text-primary_on-brand   /* Primary text on brand bg */
text-secondary_on-brand /* Secondary text on brand bg */
```

**Usage:**
```tsx
<div className="bg-brand-solid p-6">
  <h2 className="text-primary_on-brand">Title on Brand</h2>
  <p className="text-secondary_on-brand">Subtitle on brand</p>
</div>
```

---

### Category 2: Background Colors (38 utilities)

#### Surface Hierarchy Backgrounds

```css
/* Primary surfaces */
bg-primary              /* Main surface (white/darkest) */
bg-primary-solid        /* Solid primary */
bg-primary_alt          /* Alternative primary */
bg-primary_hover        /* Hover state */
bg-hover                /* Alias for primary_hover */

/* Secondary surfaces */
bg-secondary            /* Secondary surface */
bg-secondary-solid      /* Solid secondary */
bg-secondary_alt        /* Alternative secondary */
bg-secondary_hover      /* Hover state */
bg-secondary_subtle     /* Subtle secondary */

/* Tertiary/Quaternary */
bg-tertiary             /* Tertiary surface */
bg-quaternary           /* Quaternary surface */
```

**Visual Hierarchy (Light Mode):**
```
bg-primary (white) → bg-secondary (gray-50) → bg-tertiary (gray-100) → bg-quaternary (gray-200)
 Lightest                                                                  Darkest
```

**Usage Examples:**

```tsx
{/* Page background */}
<body className="bg-primary">
  {/* Card */}
  <div className="bg-secondary rounded-lg">
    {/* Nested section */}
    <div className="bg-tertiary p-4">
      Content
    </div>
  </div>
</body>

{/* Hover states */}
<button className="bg-secondary hover:bg-secondary_hover">
  Hover me
</button>

<tr className="bg-primary hover:bg-hover">
  <td>Table row with hover</td>
</tr>
```

#### State Backgrounds

```css
bg-active               /* Active/selected state */
bg-disabled             /* Disabled state */
bg-disabled_subtle      /* Subtle disabled */
bg-overlay              /* Modal/popover overlay */
```

**Usage:**
```tsx
<button
  className="bg-secondary"
  data-active
  className="bg-active"
>
  Active Button
</button>

<input disabled className="bg-disabled" />

<div className="fixed inset-0 bg-overlay/80">
  Modal overlay
</div>
```

#### Brand Backgrounds

```css
/* Solid brand (CTA buttons) */
bg-brand-solid          /* Primary brand button */
bg-brand-solid_hover    /* Hover state */

/* Subtle brand backgrounds */
bg-brand-primary        /* Subtle brand surface */
bg-brand-primary_alt    /* Alternative */
bg-brand-secondary      /* Secondary brand surface */

/* Brand sections */
bg-brand-section        /* Dark brand section */
bg-brand-section_subtle /* Subtle brand section */
```

**Usage Examples:**

```tsx
{/* Primary CTA button */}
<button className="bg-brand-solid hover:bg-brand-solid_hover text-primary_on-brand">
  Sign Up
</button>

{/* Subtle brand highlight */}
<div className="bg-brand-primary p-4 border border-brand">
  <p className="text-brand-primary">Featured content</p>
</div>

{/* Brand section (hero) */}
<section className="bg-brand-section py-20">
  <h1 className="text-primary_on-brand">Hero Title</h1>
</section>
```

**Color Values (Brand Solid):**
```css
/* Both light and dark use same brand color */
bg-brand-solid → --color-brand-600 → rgb(127 86 217)
```

#### Status Backgrounds

```css
/* Error backgrounds */
bg-error-primary        /* Subtle error bg */
bg-error-secondary      /* Medium error bg */
bg-error-solid          /* Bold error bg */

/* Warning backgrounds */
bg-warning-primary      /* Subtle warning bg */
bg-warning-secondary    /* Medium warning bg */
bg-warning-solid        /* Bold warning bg */

/* Success backgrounds */
bg-success-primary      /* Subtle success bg */
bg-success-secondary    /* Medium success bg */
bg-success-solid        /* Bold success bg */
```

**Usage Patterns:**

```tsx
{/* Subtle alert banner */}
<div className="bg-error-primary border border-error p-4">
  <p className="text-error-primary">Error message</p>
</div>

{/* Bold status badge */}
<span className="bg-success-solid text-white px-2 py-1 rounded">
  Active
</span>

{/* Inline status indicator */}
<div className="bg-warning-secondary text-warning-primary px-3 py-2">
  Pending approval
</div>
```

**Color Progression (Error Example):**
```css
/* Light mode */
bg-error-primary   → --color-error-50  → Very light red
bg-error-secondary → --color-error-100 → Light red
bg-error-solid     → --color-error-600 → Bold red

/* Dark mode */
bg-error-primary   → --color-error-950 → Very dark red
bg-error-secondary → --color-error-600 → Medium red
bg-error-solid     → --color-error-600 → Bold red
```

---

### Category 3: Border Colors (5 utilities)

Semantic border color variants to combine with border utilities:

```css
border-primary          /* Default border color */
border-secondary        /* Subtle border */
border-tertiary         /* Most subtle border */
border-brand            /* Brand border */
border-error            /* Error border */
```

**Usage:**
```tsx
{/* Default border */}
<div className="border border-primary">
  Default border
</div>

{/* Subtle divider */}
<hr className="border-t border-secondary" />

{/* Brand-accented card */}
<div className="border-2 border-brand bg-brand-primary p-4">
  Featured card
</div>

{/* Error input */}
<input className="border border-error focus:ring-error" />
```

**Color Hierarchy:**
```css
/* Light mode (darkest to lightest) */
border-primary   → gray-300
border-secondary → gray-200
border-tertiary  → gray-100

/* Dark mode (lightest to darkest) */
border-primary   → gray-700
border-secondary → gray-800
border-tertiary  → gray-800
```

---

## 💍 rings.css (57 lines)

**Purpose:** Focus ring utilities for accessibility (keyboard navigation).

**Contains:** 10 ring utilities.

### Complete Utility List

```css
/* Primary rings */
ring-brand              /* Brand-colored focus ring (default) */
ring-primary            /* Primary gray focus ring */
ring-secondary          /* Secondary gray ring */
ring-secondary_alt      /* Alternative secondary */
ring-tertiary           /* Tertiary gray ring */

/* State rings */
ring-disabled           /* Disabled state ring */
ring-disabled_subtle    /* Subtle disabled ring */
ring-error              /* Error focus ring */
ring-error_subtle       /* Subtle error ring */

/* Brand variations */
ring-brand-solid        /* Solid brand ring */
ring-brand-solid_hover  /* Hover state */
ring-brand_alt          /* Alternative brand */
ring-bg-brand-solid     /* Brand background ring */
```

### How Rings Work

Focus rings use Tailwind's `--tw-ring-color` custom property:

```css
@utility ring-brand {
  --tw-ring-color: var(--color-focus-ring);
}
```

**Default Ring Color:** The default ring color is set to `ring-primary` (via `--tw-ring-color: var(--ring-color-primary)` in theme.css). This means when you use `ring-1`, `ring-2`, etc. without specifying a color, it will automatically use `ring-primary`.

**Must combine with ring width utilities:**
```tsx
className="ring-2 ring-brand"
          ^^^^^^^ ^^^^^^^^^
          width   color
```

**Default behavior (no color specified):**
```tsx
className="ring-1"  // Automatically uses ring-primary
className="ring-2"  // Automatically uses ring-primary
```

### Usage Examples

#### Form Inputs

```tsx
{/* Default focus ring */}
<input
  className="border border-primary focus:ring-2 focus:ring-brand"
  type="text"
/>

{/* Error state */}
<input
  className="border border-error focus:ring-2 focus:ring-error"
  type="email"
  aria-invalid="true"
/>
```

#### Buttons

```tsx
{/* Primary button */}
<button className="bg-brand-solid text-white focus:ring-2 focus:ring-brand focus:ring-offset-2">
  Submit
</button>

{/* Secondary button */}
<button className="bg-secondary text-primary focus:ring-2 focus:ring-primary">
  Cancel
</button>
```

#### Custom Focus Indicators

```tsx
{/* Card selection */}
<div
  className="border border-primary cursor-pointer focus:ring-2 focus:ring-brand"
  tabIndex={0}
  role="button"
>
  Selectable card
</div>

{/* Tab navigation */}
<button
  className="text-secondary focus:text-primary focus:ring-2 focus:ring-brand_alt"
  role="tab"
>
  Tab 1
</button>
```

### Ring Offset

Combine with `ring-offset` for visual separation:

```tsx
<button className="focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-primary">
                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                  2px gap with background color
</button>
```

### Dark Mode Behavior

Ring colors automatically adapt:

```css
/* Light mode */
ring-brand → --color-brand-500 → rgb(158 119 237)
ring-error → --color-error-500 → rgb(240 68 56)

/* Dark mode */
ring-brand → --color-brand-500 → rgb(158 119 237)  /* Same */
ring-error → --color-error-500 → rgb(240 68 56)    /* Same */
```

**Note:** Most ring colors stay consistent across themes for accessibility.

### Accessibility Best Practices

✅ **Always provide focus rings:**
```tsx
<button className="focus:ring-2 focus:ring-brand">
  Accessible Button
</button>
```

❌ **Never remove focus indicators:**
```tsx
<button className="focus:outline-none">
  {/* Bad for accessibility! */}
</button>
```

✅ **Use high-contrast rings:**
```tsx
<button className="bg-brand-solid focus:ring-2 focus:ring-brand focus:ring-offset-2">
  High contrast focus
</button>
```

---

## 📐 outlines.css (53 lines)

**Purpose:** Outline utilities (similar to rings but use CSS `outline` property).

**Contains:** 9 outline utilities.

### Complete Utility List

```css
/* Primary outlines */
outline-primary         /* Primary gray outline */
outline-secondary       /* Secondary gray outline */
outline-secondary_alt   /* Alternative secondary */
outline-tertiary        /* Tertiary gray outline */

/* State outlines */
outline-disabled        /* Disabled state */
outline-disabled_subtle /* Subtle disabled */
outline-error           /* Error outline */
outline-error_subtle    /* Subtle error */

/* Brand outlines */
outline-brand           /* Brand outline */
outline-brand-solid     /* Solid brand */
outline-brand-solid_hover /* Hover state */
outline-brand_alt       /* Alternative brand */
```

### Rings vs Outlines

| Feature | Rings (`ring-*`) | Outlines (`outline-*`) |
|---------|------------------|------------------------|
| **CSS Property** | `box-shadow` | `outline` |
| **Affects Layout** | No | No |
| **Offset Control** | Yes (`ring-offset`) | Limited |
| **Border Radius** | Follows element | Square |
| **Stacking** | Can layer | Single |
| **Best For** | Focus indicators | Debug/highlight |

### Usage Examples

#### Debugging Layouts

```tsx
{/* Visualize element boundaries */}
<div className="outline outline-2 outline-error">
  Debug this element
</div>
```

#### Alternative Focus Indicators

```tsx
{/* When rings don't work (e.g., rounded elements) */}
<button className="rounded-full focus:outline focus:outline-2 focus:outline-brand">
  Circular Button
</button>
```

#### Temporary Highlights

```tsx
{/* Highlight validation errors */}
<div className={errors ? "outline outline-error" : ""}>
  <input type="text" />
</div>
```

### Dark Mode Behavior

Outline colors adapt like ring colors:

```css
/* Light mode */
outline-brand   → --color-border-brand
outline-primary → --color-border-primary

/* Dark mode */
outline-brand   → --color-brand-400  (lighter)
outline-primary → --color-gray-700   (lighter)
```

---

## 🔧 misc.css (20 lines)

**Purpose:** Miscellaneous utility helpers.

**Contains:** 2 utilities.

---

### 1. scrollbar-hide

**Purpose:** Hide scrollbars while keeping scroll functionality.

**Cross-browser:** Works in Chrome, Safari, Firefox, Edge.

```css
@utility scrollbar-hide {
  /* Webkit browsers */
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
  /* Firefox */
  scrollbar-width: none;
  /* IE/Edge */
  -ms-overflow-style: none;
}
```

**Usage:**
```tsx
{/* Horizontal scroll container */}
<div className="flex overflow-x-auto scrollbar-hide">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

{/* Vertical scroll area */}
<div className="h-64 overflow-y-auto scrollbar-hide">
  Long content...
</div>

{/* Custom carousel */}
<div className="flex gap-4 overflow-x-scroll scrollbar-hide snap-x">
  <img src="..." className="snap-center" />
  <img src="..." className="snap-center" />
</div>
```

**When to use:**
- Custom scroll UI (carousels, galleries)
- Mobile-like experiences on desktop
- Minimalist designs
- Overlay scroll areas

**Accessibility note:** Ensure scrollable areas are still keyboard-accessible!

---

### 2. transition-inherit-all

**Purpose:** Inherit all transition properties from parent.

**Use case:** Nested elements that need same transitions as parent.

```css
@utility transition-inherit-all {
  transition-property: inherit;
  transition-duration: inherit;
  transition-timing-function: inherit;
}
```

**Usage:**
```tsx
{/* Parent defines transition */}
<button className="transition-all duration-200 ease-in-out">
  {/* Child inherits transition */}
  <span className="transition-inherit-all">
    Button Text
  </span>
  <Icon className="transition-inherit-all" />
</button>

{/* Animated card */}
<div className="transition-transform duration-300 hover:scale-105">
  <img className="transition-inherit-all" src="..." />
  <div className="transition-inherit-all">
    Content
  </div>
</div>
```

**When to use:**
- Complex components with multiple children
- Synchronized animations
- Avoiding repetitive transition declarations

---

## 🎭 Common Patterns & Combinations

### Pattern 1: Card Component

```tsx
<div className="
  bg-primary
  border border-primary
  rounded-lg
  p-6
  hover:bg-hover
  hover:border-brand
  transition-colors
">
  <h3 className="text-primary mb-2">Card Title</h3>
  <p className="text-secondary">Card description</p>
</div>
```

**Dark mode:** All colors adapt automatically.

### Pattern 2: Form Input

```tsx
<input
  type="text"
  className="
    w-full
    px-4 py-2
    bg-primary
    border border-primary
    text-primary
    placeholder:text-placeholder
    rounded-lg
    focus:outline-none
    focus:border-brand
    focus:ring-2
    focus:ring-brand
    disabled:bg-disabled
    disabled:text-disabled
  "
  placeholder="Enter text..."
/>
```

### Pattern 3: Button Variants

```tsx
{/* Primary button */}
<button className="
  bg-brand-solid
  hover:bg-brand-solid_hover
  text-primary_on-brand
  px-4 py-2
  rounded-lg
  focus:ring-2
  focus:ring-brand
  focus:ring-offset-2
">
  Primary Action
</button>

{/* Secondary button */}
<button className="
  bg-secondary
  hover:bg-secondary_hover
  text-primary
  border border-primary
  px-4 py-2
  rounded-lg
  focus:ring-2
  focus:ring-primary
">
  Secondary Action
</button>

{/* Destructive button */}
<button className="
  bg-error-solid
  text-white
  px-4 py-2
  rounded-lg
  focus:ring-2
  focus:ring-error
">
  Delete
</button>
```

### Pattern 4: Status Badge

```tsx
{/* Success badge */}
<span className="
  bg-success-primary
  text-success-primary
  border border-success-primary
  px-2 py-1
  rounded-full
  text-xs
  font-medium
">
  Active
</span>

{/* Error badge */}
<span className="
  bg-error-secondary
  text-error-primary
  px-2 py-1
  rounded
">
  Failed
</span>
```

### Pattern 5: Table Row

```tsx
<tr className="
  border-b border-secondary
  hover:bg-hover
  transition-colors
">
  <td className="text-primary py-4">Content</td>
  <td className="text-secondary py-4">Metadata</td>
</tr>
```

### Pattern 6: Alert Banner

```tsx
<div className="
  bg-warning-primary
  border-l-4 border-warning-solid
  p-4
">
  <p className="text-warning-primary font-medium">
    Warning: Action required
  </p>
</div>
```

---

## 🐛 Debugging Utilities

### Check Token Values in DevTools

```tsx
{/* Add data attribute to inspect */}
<div
  className="bg-brand-solid"
  data-bg="brand-solid"
  style={{ outline: '2px solid red' }}
>
  Debugging this element
</div>
```

**In DevTools Computed Styles:**
```
background-color: var(--background-color-brand-solid)
  → var(--color-bg-brand-solid)
  → var(--color-brand-600)
  → rgb(127 86 217)
```

### Test Dark Mode

```tsx
{/* Force dark mode on element */}
<div className="dark-mode">
  <p className="text-primary">Should be light gray</p>
  <div className="bg-primary">Should be dark</div>
</div>
```

### Visual Debugging

```tsx
{/* Outline all elements */}
<div className="[&_*]:outline [&_*]:outline-error">
  <div>Nested</div>
  <div>Elements</div>
</div>
```

---

## ✅ Best Practices

### DO: Use Semantic Tokens

```tsx
✅ <div className="bg-primary text-primary border border-primary" />
```

### DON'T: Use Raw Colors

```tsx
❌ <div className="bg-white text-gray-900 border-gray-300" />
```

### DO: Combine Utilities Thoughtfully

```tsx
✅ <button className="bg-brand-solid hover:bg-brand-solid_hover focus:ring-2 focus:ring-brand" />
```

### DON'T: Override Semantic Colors with Arbitrary Values

```tsx
❌ <button className="bg-[#7F56D9]" />  {/* Use bg-brand-solid instead */}
```

### DO: Test in Both Light and Dark Mode

```tsx
✅ Always verify components in both themes
```

### DON'T: Assume Colors Work in Dark Mode

```tsx
❌ Skipping dark mode testing
```

---

## 🔗 Related Documentation

- **[README.md](../README.md)** - System overview and quick reference
- **[THEME-STRUCTURE.md](./THEME-STRUCTURE.md)** - Where tokens come from
- **[HOW-TO-GUIDES.md](./HOW-TO-GUIDES.md)** - Adding new utilities

---

**Last Updated:** December 2025
