# theme.css - Complete Structure Guide

**File:** `src/styles/theme.css` (1,672 lines)
**Purpose:** All design tokens for the PAYVA design system (base colors → semantic tokens → property mappings)
**Related:** [README.md](../README.md) | [UTILITIES-GUIDE.md](./UTILITIES-GUIDE.md) | [HOW-TO-GUIDES.md](./HOW-TO-GUIDES.md)

---

## 📊 File Overview

theme.css contains **all design tokens** in the system, organized into 5 distinct sections:

| Section                    | Lines      | What's Here                                 | Edit Frequency        |
| -------------------------- | ---------- | ------------------------------------------- | --------------------- |
| **1. Foundation Tokens**   | 1-116      | Spacing, fonts, radius, shadows, animations | Rarely                |
| **2. Base Color Scales**   | 117-503    | Raw color values (50-950 scales)            | Only when rebranding  |
| **3. Light Mode Semantic** | 504-900    | Semantic tokens (light mode values)         | Often                 |
| **4. Property Tokens**     | 901-1000   | @theme inline mappings for Tailwind         | When adding utilities |
| **5. Dark Mode Overrides** | 1001-1672  | Semantic token remappings for dark mode     | Often                 |

**Total tokens:** ~200+ semantic design tokens

---

## 🎯 Quick Navigation by Line Number

Jump directly to sections:

```
Lines 1-116      → Foundation (spacing, fonts, shadows)
Lines 117-503    → Base Colors (brand, status, grays, utility)
Lines 504-900    → Light Mode Semantic Tokens
Lines 901-1000   → Property Token Mappings (@theme inline)
Lines 1001-1672  → Dark Mode Overrides (.dark-mode)
```

---

## 📝 Section 1: Foundation Tokens (Lines 1-116)

**Purpose:** Design system foundation values (spacing scale, typography, shadows, etc.)

### Contains:

- **Spacing:** Base 4px system (`--spacing: 0.25rem`)
- **Font Families:** Body, Display, Monospace
- **Font Sizes:** xs through 2xl, plus display sizes
- **Border Radius:** none, xs, sm, md, lg, xl, 2xl, 3xl, full
- **Shadows:** xs through 3xl, skeumorphic, mockup shadows
- **Animations:** Marquee, caret blink

### Key Patterns:

```css
/* Spacing-based font sizes */
--text-md: calc(var(--spacing) * 4); /* 16px */
--text-md--line-height: calc(var(--spacing) * 6); /* 24px */

/* Font families */
--font-body: 'Neue Haas Grotesk Text', -apple-system, ...;
--font-display: 'Neue Haas Grotesk Display', -apple-system, ...;

/* Border radius scale */
--radius-sm: 0.25rem;
--radius-md: 0.375rem;
--radius-lg: 0.5rem;

/* Shadow system */
--shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);
--shadow-sm: 0px 1px 3px rgba(10, 13, 18, 0.1), 0px 1px 2px -1px rgba(10, 13, 18, 0.1);
```

**When to edit:** Almost never. These are foundational values that affect the entire system.

**Exception:** Font families may need adjustment if fonts change.

---

## 🎨 Section 2: Base Color Scales (Lines 117-503)

**Purpose:** Raw color values organized in 50-950 scales. These **never change** between light/dark modes.

### Color Families (387 lines):

#### Brand Colors (Lines 127-138)

```css
--color-brand-25: rgb(252 250 255); /* Lightest tint */
--color-brand-50: rgb(249 245 255);
--color-brand-100: rgb(244 235 255);
--color-brand-200: rgb(233 215 254);
--color-brand-300: rgb(214 187 251);
--color-brand-400: rgb(182 146 246);
--color-brand-500: rgb(158 119 237); /* Base brand color */
--color-brand-600: rgb(127 86 217); /* Primary brand (most used) */
--color-brand-700: rgb(105 65 198);
--color-brand-800: rgb(83 56 158);
--color-brand-900: rgb(66 48 125);
--color-brand-950: rgb(44 28 95); /* Darkest shade */
```

#### Status Colors

- **Error** (Lines 140-151): Red scale for destructive actions
- **Warning** (Lines 153-164): Amber/orange scale for warnings
- **Success** (Lines 166-177): Green scale for success states

#### Gray Scales (8 variants!)

- **Gray** (Lines 179-190): Default neutral gray
- **Gray Blue** (Lines 192-203): Blue-tinted gray
- **Gray Cool** (Lines 205-216): Cool-tinted gray
- **Gray Modern** (Lines 218-229): Modern blue-gray
- **Gray Neutral** (Lines 231-242): Balanced neutral
- **Gray Iron** (Lines 244-255): True neutral
- **Gray True** (Lines 257-268): Pure grayscale
- **Gray Warm** (Lines 270-281): Warm-tinted gray

#### Utility Colors (Lines 283-503)

Extended color palette for charts, badges, etc.:

- Moss, Green Light, Green, Teal, Cyan
- Blue Light, Blue, Blue Dark
- Indigo, Violet, Purple, Fuchsia
- Pink, Rose
- Orange, Orange Dark, Yellow

### Key Insight: Base Colors are Static

**These colors never change between light/dark mode.** They are referenced by semantic tokens, which DO change.

```css
/* Base color - always the same */
--color-brand-600: rgb(127 86 217);

/* Semantic token - references base color, but can change in dark mode */
--color-bg-brand-solid: var(--color-brand-600); /* Light mode */

.dark-mode {
  --color-bg-brand-solid: var(--color-brand-600); /* Dark mode (same in this case) */
}
```

**When to edit:** Only when completely rebranding or adding new color families.

**How to change brand color:** See [HOW-TO-GUIDES.md - Changing Brand Colors](./HOW-TO-GUIDES.md#changing-brand-colors)

---

## 🌞 Section 3: Light Mode Semantic Tokens (Lines 504-803)

**Purpose:** Map base colors to semantic meaning in light mode. These are the "source of truth" for component colors.

**Total:** ~100 semantic tokens organized into categories.

### 3.1 Utility Colors (Lines 509-676)

Maps base color scales to utility tokens for charts, badges, etc.

```css
/* Blue utilities */
--color-utility-blue-50: var(--color-blue-50);
--color-utility-blue-100: var(--color-blue-100);
/* ...continues through 700 */

/* Brand utilities */
--color-utility-brand-50: var(--color-brand-50);
--color-utility-brand-50_alt: var(--color-brand-50); /* Alternative mapping */
/* ...continues with _alt variants for dark mode flexibility */
```

**Pattern:** `_alt` variants exist for tokens that need different dark mode behavior.

### 3.2 Text Colors (Lines 678-702)

23 semantic text color tokens:

```css
/* Hierarchy */
--color-text-primary: var(--color-gray-900); /* Body text (darkest) */
--color-text-secondary: var(--color-gray-700); /* Supporting text */
--color-text-tertiary: var(--color-gray-600); /* Muted text */
--color-text-quaternary: var(--color-gray-500); /* Most subtle */

/* Special contexts */
--color-text-disabled: var(--color-gray-500);
--color-text-placeholder: var(--color-gray-500);
--color-text-white: var(--color-white);

/* Brand */
--color-text-brand-primary: var(--color-brand-900);
--color-text-brand-secondary: var(--color-brand-700);
--color-text-brand-tertiary: var(--color-brand-600);

/* On brand backgrounds */
--color-text-primary_on-brand: var(--color-white);
--color-text-secondary_on-brand: var(--color-brand-200);

/* Status */
--color-text-error-primary: var(--color-error-600);
--color-text-warning-primary: var(--color-warning-600);
--color-text-success-primary: var(--color-success-600);
```

**Naming convention:**

- `primary/secondary/tertiary/quaternary` = hierarchy (darkest to lightest)
- `_on-brand` = text that sits on brand-colored backgrounds
- `_hover` = hover state variant

### 3.3 Border Colors (Lines 704-714)

12 semantic border tokens:

```css
--color-border-primary: var(--color-gray-300); /* Default border */
--color-border-secondary: var(--color-gray-200); /* Subtle border */
--color-border-tertiary: var(--color-gray-100); /* Most subtle */

--color-border-disabled: var(--color-gray-300);
--color-border-disabled_subtle: var(--color-gray-200);

--color-border-brand: var(--color-brand-500);
--color-border-brand_alt: var(--color-brand-600);

--color-border-error: var(--color-error-500);
--color-border-error_subtle: var(--color-error-300);

--color-border-secondary_alt: rgb(0 0 0 / 0.08); /* Alpha variant */
```

### 3.4 Foreground Colors (Lines 716-738)

Similar to text colors but used for icons and non-text elements:

```css
--color-fg-primary: var(--color-gray-900);
--color-fg-secondary: var(--color-gray-700);
--color-fg-tertiary: var(--color-gray-600);
--color-fg-quaternary: var(--color-gray-400);

--color-fg-brand-primary: var(--color-brand-600);
--color-fg-brand-secondary: var(--color-brand-500);

--color-fg-disabled: var(--color-gray-400);
--color-fg-disabled_subtle: var(--color-gray-300);
```

### 3.5 Background Colors (Lines 740-770)

34 semantic background tokens:

```css
/* Surface hierarchy */
--color-bg-primary: var(--color-white); /* Main surface */
--color-bg-secondary: var(--color-gray-50); /* Secondary surface */
--color-bg-tertiary: var(--color-gray-100); /* Tertiary surface */
--color-bg-quaternary: var(--color-gray-200); /* Subtle emphasis */

/* State backgrounds */
--color-bg-active: var(--color-gray-50);
--color-bg-disabled: var(--color-gray-100);
--color-bg-overlay: var(--color-gray-950);

/* Brand backgrounds */
--color-bg-brand-solid: var(--color-brand-600); /* CTA buttons */
--color-bg-brand-solid_hover: var(--color-brand-700);
--color-bg-brand-primary: var(--color-brand-50); /* Subtle brand bg */
--color-bg-brand-secondary: var(--color-brand-100);
--color-bg-brand-section: var(--color-brand-800); /* Dark brand sections */

/* Status backgrounds */
--color-bg-error-primary: var(--color-error-50);
--color-bg-error-secondary: var(--color-error-100);
--color-bg-error-solid: var(--color-error-600);

--color-bg-warning-primary: var(--color-warning-50);
--color-bg-success-primary: var(--color-success-50);
```

**Pattern:**

- `primary/secondary/tertiary` = surface hierarchy (lightest to darker)
- `-solid` = bold, high-contrast backgrounds (buttons, badges)
- `_hover` = hover state variants

### 3.6 Component-Specific Colors (Lines 772-803)

Special tokens for specific UI components:

```css
/* Buttons */
--color-button-primary-icon: var(--color-brand-300);
--color-button-destructive-primary-icon: var(--color-error-300);

/* Focus rings */
--color-focus-ring: var(--color-brand-500); /* Default focus */
--color-focus-ring-error: var(--color-error-500); /* Error focus */

/* Icons */
--color-icon-fg-brand: var(--color-brand-600);
--color-icon-fg-brand_on-brand: var(--color-brand-200);

/* Avatars */
--color-avatar-bg: var(--color-gray-100);
--color-avatar-contrast-border: rgb(0 0 0 / 0.08);

/* Toggles */
--color-toggle-border: var(--color-gray-300);
--color-slider-handle-bg: var(--color-white);

/* Text editor */
--color-text-editor-icon-fg: var(--color-gray-400);
--color-text-editor-icon-fg_active: var(--color-gray-500);
```

---

## ⚙️ Section 4: Property Token Mappings (Lines 810-895)

**Purpose:** Create Tailwind-compatible property tokens in `@theme inline` block.

**Critical:** Tailwind v4 requires property tokens to generate utilities. This section maps semantic tokens → property tokens.

### Why This Section Exists

Tailwind v4 looks for specific CSS variable patterns to generate utilities:

- `--text-color-*` → generates `text-*` utilities
- `--background-color-*` → generates `bg-*` utilities
- `--border-color-*` → generates `border-*` utilities
- `--ring-color-*` → generates `ring-*` utilities
- `--outline-color-*` → generates `outline-*` utilities

### Structure (86 lines):

```css
@theme inline {
  /* BACKGROUND PROPERTY COLORS (Lines 811-842) */
  --background-color-primary: var(--color-bg-primary);
  --background-color-secondary: var(--color-bg-secondary);
  --background-color-brand-solid: var(--color-bg-brand-solid);
  /* ...34 background tokens */

  /* TEXT PROPERTY COLORS (Lines 844-857) */
  --text-color-primary: var(--color-text-primary);
  --text-color-secondary: var(--color-text-secondary);
  --text-color-brand-primary: var(--color-text-brand-primary);
  /* ...13 text tokens */

  /* BORDER PROPERTY COLORS (Lines 859-865) */
  --border-color-DEFAULT: var(--color-border-primary); /* Default for 'border' */
  --border-color-primary: var(--color-border-primary);
  --border-color-brand: var(--color-border-brand);
  /* ...6 border tokens */

  /* RING PROPERTY COLORS (Lines 867-880) */
  --ring-color-primary: var(--color-border-primary);
  --ring-color-brand: var(--color-border-brand);
  --ring-color-error: var(--color-border-error);
  /* ...14 ring tokens */

  /* OUTLINE PROPERTY COLORS (Lines 882-894) */
  --outline-color-primary: var(--color-border-primary);
  --outline-color-brand: var(--color-border-brand);
  /* ...12 outline tokens */
}
```

### Mapping Pattern

```
Semantic Token          Property Token                   Utility
(Section 3)        →    (Section 4)                 →    (utilities/*.css)

--color-bg-primary → --background-color-primary  → bg-primary
--color-text-primary → --text-color-primary      → text-primary
--color-border-primary → --border-color-primary  → border-primary
```

**When to edit:** Every time you add a new semantic token that needs a utility.

**How to add:** See [HOW-TO-GUIDES.md - Adding New Semantic Tokens](./HOW-TO-GUIDES.md#adding-new-semantic-tokens)

---

## 🌙 Section 5: Dark Mode Overrides (Lines 897-1320)

**Purpose:** Remap semantic tokens for dark mode using `.dark-mode` class.

**Total:** 424 lines of dark mode overrides

### How Dark Mode Works

When `.dark-mode` class is applied to a parent element, **semantic tokens automatically remap** to new values:

```css
/* Light mode (default) */
--color-text-primary: var(--color-gray-900); /* Dark gray */

/* Dark mode override */
.dark-mode {
  --color-text-primary: var(--color-gray-50); /* Light gray */
}
```

**Your code stays the same:**

```tsx
<p className="text-primary">Auto-adapts!</p>
```

### Structure (Lines 900-1320):

#### 5.1 Alpha Color Inversions (Lines 901-902)

```css
.dark-mode {
  --color-alpha-white: rgb(12 14 18); /* Swaps to dark */
  --color-alpha-black: rgb(255 255 255); /* Swaps to light */
}
```

#### 5.2 Gray Scale Remapping (Lines 906-917)

Default gray scale gets remapped for dark mode:

```css
.dark-mode {
  --color-gray-25: var(--color-gray-950); /* Darkest → lightest context */
  --color-gray-50: var(--color-gray-900);
  /* ...continues */
  --color-gray-900: var(--color-gray-100);
  --color-gray-950: var(--color-gray-50); /* Lightest → darkest context */
}
```

#### 5.3 Utility Color Inversions (Lines 919-1084)

All utility colors get inverted scales:

```css
.dark-mode {
  --color-utility-blue-50: var(--color-blue-950); /* Flip scale */
  --color-utility-blue-100: var(--color-blue-900);
  /* ...continues */
  --color-utility-blue-600: var(--color-blue-400);
  --color-utility-blue-700: var(--color-blue-300);
}
```

**Pattern:** 50↔950, 100↔900, 200↔800, etc.

#### 5.4 Text Color Remapping (Lines 1086-1112)

```css
.dark-mode {
  --color-text-primary: var(--color-gray-50); /* Light text */
  --color-text-secondary: var(--color-gray-300);
  --color-text-tertiary: var(--color-gray-400);

  --color-text-brand-primary: var(--color-gray-50);

  --color-text-error-primary: var(--color-error-400);
  --color-text-warning-primary: var(--color-warning-400);
  --color-text-success-primary: var(--color-success-400);
}
```

#### 5.5 Border Color Remapping (Lines 1114-1124)

```css
.dark-mode {
  --color-border-primary: var(--color-gray-700); /* Lighter in dark */
  --color-border-secondary: var(--color-gray-800);
  --color-border-tertiary: var(--color-gray-800);

  --color-border-brand: var(--color-brand-400); /* Lighter brand */
  --color-border-error: var(--color-error-400);
}
```

#### 5.6 Background Color Remapping (Lines 1149-1180)

```css
.dark-mode {
  --color-bg-primary: var(--color-gray-950); /* Darkest surface */
  --color-bg-secondary: var(--color-gray-900);
  --color-bg-tertiary: var(--color-gray-800);

  --color-bg-brand-solid: var(--color-brand-600); /* Same as light */
  --color-bg-brand-solid_hover: var(--color-brand-500);

  --color-bg-overlay: var(--color-gray-800); /* Lighter overlay */
}
```

#### 5.7 Component-Specific Remapping (Lines 1182-1216)

```css
.dark-mode {
  --color-focus-ring: var(--color-brand-500);

  --color-avatar-bg: var(--color-gray-800);
  --color-avatar-contrast-border: rgb(255 255 255 / 0.12);

  --color-slider-handle-bg: var(--color-fg-brand-primary);
  --color-slider-handle-border: var(--color-bg-primary);

  /* Navigation items */
  --color-nav-item-icon-fg: var(--color-gray-400);
  --color-nav-item-icon-fg_active: var(--color-gray-300);
}
```

#### 5.8 Property Token Remapping (Lines 1218-1319)

All property tokens get remapped to reference dark mode semantic tokens:

```css
.dark-mode {
  /* Background property colors */
  --background-color-primary: var(--color-bg-primary);
  --background-color-brand-solid: var(--color-bg-brand-solid);
  /* ...continues for all 86 property tokens */

  /* Text property colors */
  --text-color-primary: var(--color-text-primary);

  /* Border property colors */
  --border-color-primary: var(--color-border-primary);

  /* Ring/outline property colors */
  --ring-color-brand: var(--color-border-brand);
  --outline-color-brand: var(--color-border-brand);
}
```

**Key insight:** Property tokens are remapped to ensure utilities work in dark mode, even though the semantic tokens already handle the remapping. This is for Tailwind v4 compatibility.

---

## 🔄 Token Flow Visualization

### Complete Token Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  SECTION 2: BASE COLOR SCALES (Lines 117-503)             │
│  Static values - never change between light/dark           │
└─────────────────────────────────────────────────────────────┘
                            ↓
    --color-brand-600: rgb(127 86 217)
    --color-gray-900: rgb(24 29 39)
    --color-gray-50: rgb(250 250 250)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  SECTION 3: SEMANTIC TOKENS (Lines 504-803)               │
│  Give meaning to colors - change in dark mode              │
└─────────────────────────────────────────────────────────────┘
                            ↓
Light: --color-bg-brand-solid: var(--color-brand-600)
Light: --color-text-primary: var(--color-gray-900)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  SECTION 5: DARK MODE (Lines 897-1320)                    │
│  Remap semantic tokens for dark theme                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
Dark: --color-bg-brand-solid: var(--color-brand-600)  (same)
Dark: --color-text-primary: var(--color-gray-50)      (different!)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  SECTION 4: PROPERTY TOKENS (Lines 810-895)               │
│  @theme inline - Tailwind-compatible mappings              │
└─────────────────────────────────────────────────────────────┘
                            ↓
@theme inline {
  --background-color-brand-solid: var(--color-bg-brand-solid)
  --text-color-primary: var(--color-text-primary)
}
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  utilities/*.css - UTILITY DEFINITIONS                     │
│  @utility declarations that use property tokens            │
└─────────────────────────────────────────────────────────────┘
                            ↓
@utility bg-brand-solid {
  background-color: var(--background-color-brand-solid);
}
@utility text-primary {
  color: var(--text-color-primary);
}
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  YOUR COMPONENTS                                            │
│  <button className="bg-brand-solid text-primary">          │
└─────────────────────────────────────────────────────────────┘
```

### What Happens When `.dark-mode` is Applied

```tsx
// Component code (unchanged)
<div className="dark-mode">
  <button className="bg-brand-solid text-primary_on-brand">Click me</button>
</div>
```

**Token resolution in light mode:**

```
bg-brand-solid
  → var(--background-color-brand-solid)
  → var(--color-bg-brand-solid)
  → var(--color-brand-600)
  → rgb(127 86 217)

text-primary_on-brand
  → var(--text-color-primary_on-brand)
  → var(--color-text-primary_on-brand)
  → var(--color-white)
  → rgb(255 255 255)
```

**Token resolution in dark mode:**

```
bg-brand-solid
  → var(--background-color-brand-solid)
  → var(--color-bg-brand-solid)     [remapped by .dark-mode]
  → var(--color-brand-600)           [still same]
  → rgb(127 86 217)

text-primary_on-brand
  → var(--text-color-primary_on-brand)
  → var(--color-text-primary_on-brand)  [remapped by .dark-mode]
  → var(--color-gray-50)                 [different!]
  → rgb(247 247 247)
```

**Result:** Button stays purple, but on-brand text adjusts from white → light gray for better contrast in dark mode.

---

## 🎓 Advanced Patterns

### Pattern 1: Alternative Mappings (`_alt` suffix)

Some tokens have `_alt` variants for flexible dark mode behavior:

```css
/* Light mode */
--color-utility-brand-50: var(--color-brand-50);
--color-utility-brand-50_alt: var(--color-brand-50); /* Same in light */

/* Dark mode */
.dark-mode {
  --color-utility-brand-50: var(--color-brand-950); /* Invert to dark */
  --color-utility-brand-50_alt: var(--color-utility-gray-50); /* Use gray instead */
}
```

**Use case:** Charts that need brand colors in light mode but neutral grays in dark mode for better readability.

### Pattern 2: Hover State Tokens

Interactive states get dedicated tokens:

```css
--color-text-secondary: var(--color-gray-700);
--color-text-secondary_hover: var(--color-gray-800); /* Darker on hover */

.dark-mode {
  --color-text-secondary: var(--color-gray-300);
  --color-text-secondary_hover: var(--color-gray-200); /* Lighter on hover */
}
```

**Usage:**

```tsx
<button className="text-secondary hover:text-secondary_hover">Hover me</button>
```

### Pattern 3: Contextual Tokens (`_on-brand`)

Text colors for brand-colored backgrounds:

```css
/* Light mode */
--color-text-primary_on-brand: var(--color-white);
--color-text-secondary_on-brand: var(--color-brand-200);

/* Dark mode */
.dark-mode {
  --color-text-primary_on-brand: var(--color-gray-50);
  --color-text-secondary_on-brand: var(--color-gray-300);
}
```

**Usage:**

```tsx
<div className="bg-brand-solid">
  <h2 className="text-primary_on-brand">Title</h2>
  <p className="text-secondary_on-brand">Subtitle</p>
</div>
```

### Pattern 4: Alpha Color Inversions

For subtle overlays and borders:

```css
/* Light mode */
--color-border-secondary_alt: rgb(0 0 0 / 0.08); /* Black alpha */

/* Dark mode */
.dark-mode {
  --color-border-secondary_alt: var(--color-gray-800); /* Solid gray */
}
```

---

## 📖 Common Editing Scenarios

### Scenario 1: Adjusting Text Hierarchy

**Task:** Make secondary text lighter in light mode.

**Edit Section 3 (Light Mode Semantic):**

```css
/* Before */
--color-text-secondary: var(--color-gray-700);

/* After */
--color-text-secondary: var(--color-gray-600); /* One step lighter */
```

**Don't forget Section 5 (Dark Mode):**

```css
.dark-mode {
  /* Adjust accordingly */
  --color-text-secondary: var(--color-gray-400); /* Also lighter */
}
```

### Scenario 2: Adding New Semantic Token

See [HOW-TO-GUIDES.md - Adding New Semantic Tokens](./HOW-TO-GUIDES.md#adding-new-semantic-tokens) for step-by-step guide.

### Scenario 3: Changing Brand Color

See [HOW-TO-GUIDES.md - Changing Brand Colors](./HOW-TO-GUIDES.md#changing-brand-colors) for complete walkthrough.

### Scenario 4: Debugging Dark Mode

If dark mode looks wrong:

1. **Check Section 5** - Does your token have a dark mode override?
2. **Test token chain** - Use browser DevTools to trace var() references
3. **Verify property token** - Section 4 must map semantic → property
4. **Check utility** - utilities/\*.css must use property token

See [HOW-TO-GUIDES.md - Debugging Dark Mode](./HOW-TO-GUIDES.md#debugging-dark-mode) for detailed debugging.

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Editing Base Colors Directly

```css
/* DON'T modify base colors for theming */
--color-brand-600: rgb(255 0 0); /* Wrong approach */
```

**Why wrong:** Base colors should rarely change. Adjust semantic tokens instead.

### ❌ Mistake 2: Forgetting Dark Mode Override

```css
/* Added new semantic token */
--color-text-my-new-token: var(--color-gray-700);

/* ❌ MISSING dark mode override - will look broken in dark mode */
```

**Fix:**

```css
.dark-mode {
  --color-text-my-new-token: var(--color-gray-300);
}
```

### ❌ Mistake 3: Skipping Property Token Mapping

```css
/* Added semantic token */
--color-text-my-token: var(--color-gray-700);

/* ❌ MISSING property token - can't generate utility */
```

**Fix:**

```css
@theme inline {
  --text-color-my-token: var(--color-text-my-token);
}
```

### ❌ Mistake 4: Wrong Property Token Prefix

```css
/* ❌ WRONG - using semantic token prefix */
@theme inline {
  --color-text-primary: var(--color-text-primary);
}
```

**Fix:**

```css
/* ✅ CORRECT - using property token prefix */
@theme inline {
  --text-color-primary: var(--color-text-primary);
}
```

---

## 📊 Token Count Summary

| Category              | Light Mode | Dark Mode | Total           |
| --------------------- | ---------- | --------- | --------------- |
| **Text Colors**       | 23         | 23        | 46              |
| **Border Colors**     | 12         | 12        | 24              |
| **Background Colors** | 34         | 34        | 68              |
| **Foreground Colors** | 18         | 18        | 36              |
| **Component Colors**  | ~30        | ~30       | ~60             |
| **Utility Colors**    | 150+       | 150+      | 300+            |
| **Property Tokens**   | 86         | 86        | 172             |
| **Grand Total**       |            |           | **~700 tokens** |

---

## 🔗 Related Documentation

- **[README.md](../README.md)** - System overview and quick reference
- **[UTILITIES-GUIDE.md](./UTILITIES-GUIDE.md)** - How to use tokens in utilities
- **[HOW-TO-GUIDES.md](./HOW-TO-GUIDES.md)** - Step-by-step task guides

---

**Last Updated:** December 2025
