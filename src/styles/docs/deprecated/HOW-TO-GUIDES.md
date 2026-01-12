# How-To Guides - Common Tasks & Recipes

**Purpose:** Step-by-step guides for common styling tasks
**Related:** [README.md](../README.md) | [THEME-STRUCTURE.md](./THEME-STRUCTURE.md) | [UTILITIES-GUIDE.md](./UTILITIES-GUIDE.md)

---

## 📋 Table of Contents

### Basic Tasks

1. [Adding New Semantic Tokens](#1-adding-new-semantic-tokens)
2. [Changing Brand Colors](#2-changing-brand-colors)
3. [Adding New Utilities](#3-adding-new-utilities)

### Advanced Tasks

4. [Adjusting Dark Mode Colors](#4-adjusting-dark-mode-colors)
5. [Creating New Color Families](#5-creating-new-color-families)
6. [Debugging Dark Mode Issues](#6-debugging-dark-mode-issues)

### Best Practices

7. [Ensuring Semantic Token Adherence](#7-ensuring-semantic-token-adherence)
8. [Common Mistakes and Fixes](#8-common-mistakes-and-fixes)
9. [Testing Your Changes](#9-testing-your-changes)

---

## 1. Adding New Semantic Tokens

**When you need this:** Creating a new semantic color that doesn't exist (e.g., `text-success-secondary`, `bg-info-primary`).

**Time:** 5-10 minutes

**Files to edit:** `theme.css`, `utilities/colors.css` (or relevant utility file)

---

### Step 1: Add Light Mode Semantic Token

**Edit:** `theme.css` Section 3 (Lines 504-803)

Find the appropriate category and add your token:

```css
/* TEXT COLORS (Lines 678-702) */
--color-text-success-secondary: var(--color-success-500); /* ← Add this */
```

**Naming convention:**

- `--color-text-*` for text colors
- `--color-bg-*` for backgrounds
- `--color-border-*` for borders
- Use hierarchy: `primary` > `secondary` > `tertiary` > `quaternary`

---

### Step 2: Add Property Token Mapping

**Edit:** `theme.css` Section 4 (Lines 810-895 in `@theme inline` block)

Add property token that Tailwind can recognize:

```css
@theme inline {
  /* TEXT PROPERTY COLORS */
  --text-color-success-secondary: var(--color-text-success-secondary); /* ← Add this */
}
```

**Prefix mapping:**

- Semantic token: `--color-text-*` → Property token: `--text-color-*`
- Semantic token: `--color-bg-*` → Property token: `--background-color-*`
- Semantic token: `--color-border-*` → Property token: `--border-color-*`

---

### Step 3: Add Dark Mode Override

**Edit:** `theme.css` Section 5 (Lines 897-1320 in `.dark-mode` block)

Add dark mode remapping:

```css
.dark-mode {
  /* TEXT COLORS */
  --color-text-success-secondary: var(--color-success-400); /* ← Add this (lighter) */
}
```

**Don't forget property token remapping:**

```css
.dark-mode {
  /* TEXT PROPERTY COLORS */
  --text-color-success-secondary: var(--color-text-success-secondary); /* ← Add this */
}
```

---

### Step 4: Create Custom Utility

**Edit:** `utilities/colors.css` (or relevant utility file)

Add utility definition:

```css
/* Text color utilities using semantic tokens */
@utility text-success-secondary {
  color: var(--text-color-success-secondary);
}
```

**Pattern:**

- Text: `@utility text-NAME { color: var(--text-color-NAME); }`
- Background: `@utility bg-NAME { background-color: var(--background-color-NAME); }`
- Border: `@utility border-NAME { border-color: var(--border-color-NAME); }`

---

### Step 5: Test Your Token

Create test component:

```tsx
<div className="p-4">
  {/* Light mode test */}
  <p className="text-success-secondary">Success secondary text (light)</p>

  {/* Dark mode test */}
  <div className="dark-mode">
    <p className="text-success-secondary">Success secondary text (dark)</p>
  </div>
</div>
```

**Verify:**

- ✅ Light mode: Should show `--color-success-500`
- ✅ Dark mode: Should show `--color-success-400`
- ✅ No console errors
- ✅ Utility applies correctly

---

### Complete Example

Let's add `text-info-primary` from scratch:

**1. Semantic token (theme.css Section 3):**

```css
--color-text-info-primary: var(--color-blue-600);
```

**2. Property token (theme.css @theme inline):**

```css
@theme inline {
  --text-color-info-primary: var(--color-text-info-primary);
}
```

**3. Dark mode (theme.css .dark-mode):**

```css
.dark-mode {
  --color-text-info-primary: var(--color-blue-400);
  --text-color-info-primary: var(--color-text-info-primary);
}
```

**4. Utility (utilities/colors.css):**

```css
@utility text-info-primary {
  color: var(--text-color-info-primary);
}
```

**5. Usage:**

```tsx
<p className="text-info-primary">Info message</p>
```

---

## 2. Changing Brand Colors

**When you need this:** Rebranding or updating primary brand color palette.

**Time:** 15-20 minutes

**Files to edit:** `theme.css` Section 2 only

**⚠️ Warning:** This affects the entire application. Test thoroughly!

---

### Step 1: Locate Brand Color Scales

**Edit:** `theme.css` Section 2 (Lines 127-138)

```css
--color-brand-25: rgb(252 250 255);
--color-brand-50: rgb(249 245 255);
--color-brand-100: rgb(244 235 255);
--color-brand-200: rgb(233 215 254);
--color-brand-300: rgb(214 187 251);
--color-brand-400: rgb(182 146 246);
--color-brand-500: rgb(158 119 237);
--color-brand-600: rgb(127 86 217); /* ← Primary brand color (most used) */
--color-brand-700: rgb(105 65 198);
--color-brand-800: rgb(83 56 158);
--color-brand-900: rgb(66 48 125);
--color-brand-950: rgb(44 28 95);
```

---

### Step 2: Generate New Color Scale

**Option A: Use a color scale generator**

- **Untitled UI Color Generator**: https://www.untitledui.com/colors
- **Tailwind Color Generator**: https://uicolors.app/create
- **Input:** Your new brand color (e.g., `#3B82F6` for blue)
- **Output:** Complete 50-950 scale

**Option B: Manual adjustment**

- Keep 500 as your base brand color
- Lighter shades (50-400): Tints
- Darker shades (600-950): Shades
- Ensure accessible contrast ratios

---

### Step 3: Replace Brand Colors

**Edit:** `theme.css` Section 2 (Lines 127-138)

```css
/* NEW BRAND COLORS (Blue example) */
--color-brand-25: rgb(245 250 255);
--color-brand-50: rgb(239 248 255);
--color-brand-100: rgb(209 233 255);
--color-brand-200: rgb(178 221 255);
--color-brand-300: rgb(132 202 255);
--color-brand-400: rgb(83 177 253);
--color-brand-500: rgb(46 144 250); /* Base blue */
--color-brand-600: rgb(21 112 239); /* Primary brand */
--color-brand-700: rgb(23 92 211);
--color-brand-800: rgb(24 73 169);
--color-brand-900: rgb(25 65 133);
--color-brand-950: rgb(16 42 86);
```

**🎯 That's it!** You don't need to touch anything else. All semantic tokens automatically reference the new colors.

---

### Step 4: Verify Color Usage

Check key brand usages:

```tsx
{
  /* Buttons */
}
;<button className="bg-brand-solid">Should be new brand-600</button>

{
  /* Text */
}
;<p className="text-brand-primary">Should be new brand-900</p>

{
  /* Borders */
}
;<div className="border-brand border">Should be new brand-500</div>

{
  /* Backgrounds */
}
;<div className="bg-brand-primary">Should be new brand-50</div>
```

---

### Step 5: Test Contrast Ratios

**Critical for accessibility:**

Use browser DevTools or online tools to check:

- `text-primary_on-brand` on `bg-brand-solid` → Must be 4.5:1 minimum
- `text-secondary_on-brand` on `bg-brand-solid` → Must be 3:1 minimum
- `border-brand` on `bg-primary` → Must be visible

**Tools:**

- Chrome DevTools Contrast Checker
- https://webaim.org/resources/contrastchecker/

---

### Complete Example: Purple → Blue

**Before (Purple):**

```css
--color-brand-600: rgb(127 86 217); /* Purple */
```

**After (Blue):**

```css
--color-brand-600: rgb(21 112 239); /* Blue */
```

**Result:**

- All buttons: Purple → Blue
- All brand text: Purple → Blue
- All brand backgrounds: Purple tints → Blue tints
- Dark mode: Automatically adjusts

**No other changes needed!** The semantic token system handles everything.

---

## 3. Adding New Utilities

**When you need this:** Creating a new utility class (e.g., `scrollbar-dark`, `text-balance`).

**Time:** 5 minutes

**Files to edit:** Appropriate file in `utilities/` folder

---

### Step 1: Choose the Right File

| Utility Type | File                          | Example          |
| ------------ | ----------------------------- | ---------------- |
| Text colors  | `colors.css`                  | `text-*`         |
| Backgrounds  | `colors.css`                  | `bg-*`           |
| Borders      | `colors.css` or `borders.css` | `border-*`       |
| Rings        | `rings.css`                   | `ring-*`         |
| Outlines     | `outlines.css`                | `outline-*`      |
| Other        | `misc.css`                    | Custom utilities |

---

### Step 2: Define Utility

**Edit:** Appropriate `utilities/*.css` file

**Pattern:**

```css
@utility utility-name {
  property: value;
}
```

**Examples:**

```css
/* utilities/misc.css */
@utility text-balance {
  text-wrap: balance;
}

@utility scrollbar-dark {
  scrollbar-color: var(--color-gray-600) var(--color-gray-800);
}

@utility text-pretty {
  text-wrap: pretty;
}
```

---

### Step 3: Test Utility

```tsx
<p className="text-balance">
  This text will balance across lines nicely.
</p>

<div className="overflow-y-scroll scrollbar-dark">
  Scrollable content with dark scrollbar
</div>
```

---

### Step 4: Document (Optional)

If utility is non-obvious, add comment:

```css
/* Utility for balanced text wrapping (prevents orphans) */
@utility text-balance {
  text-wrap: balance;
}
```

---

### Utilities with Variants

Need hover/focus variants?

```css
/* Base utility */
@utility bg-card {
  background-color: var(--background-color-secondary);
}

/* Hover variant - Tailwind generates this automatically */
/* Use as: hover:bg-card */
```

---

## 4. Adjusting Dark Mode Colors

**When you need this:** Dark mode colors don't look right or need tweaking.

**Time:** 10 minutes per token

**Files to edit:** `theme.css` Section 5 (Dark mode overrides)

---

### Step 1: Identify the Token

Find which semantic token controls the color:

**Browser DevTools method:**

1. Inspect element with incorrect color
2. Find `color`, `background-color`, or `border-color` in Computed tab
3. Trace `var()` references backwards

**Example:**

```
Computed: color: rgb(148, 151, 156)
  ↓
Styles: color: var(--text-color-secondary)
  ↓
theme.css: --text-color-secondary: var(--color-text-secondary)
  ↓
theme.css .dark-mode: --color-text-secondary: var(--color-gray-400)
  ↓
Found it! Need to adjust --color-gray-400 mapping
```

---

### Step 2: Adjust Dark Mode Semantic Token

**Edit:** `theme.css` Section 5 (Lines 1086-1112 for text colors)

```css
.dark-mode {
  /* Before */
  --color-text-secondary: var(--color-gray-300);

  /* After (lighter) */
  --color-text-secondary: var(--color-gray-200);
}
```

**Common adjustments:**

- **Too dark:** Use lighter gray (gray-300 → gray-200)
- **Too light:** Use darker gray (gray-300 → gray-400)
- **Low contrast:** Increase difference from background
- **Too harsh:** Use warmer/cooler gray variant

---

### Step 3: Verify Property Token

Ensure property token also remaps in dark mode:

```css
.dark-mode {
  /* Semantic token */
  --color-text-secondary: var(--color-gray-200);

  /* Property token - should reference updated semantic */
  --text-color-secondary: var(--color-text-secondary); /* ✅ Good */
}
```

---

### Step 4: Test in Context

View component in both themes:

```tsx
<div className="space-y-4">
  {/* Light mode */}
  <div className="bg-primary p-4">
    <p className="text-secondary">Light mode text</p>
  </div>

  {/* Dark mode */}
  <div className="dark-mode bg-primary p-4">
    <p className="text-secondary">Dark mode text</p>
  </div>
</div>
```

---

### Step 5: Check Related Tokens

If you adjusted `--color-text-secondary`, also check:

- `--color-text-secondary_hover` (hover state)
- `--color-fg-secondary` (foreground variant)
- Related border/background tokens

Ensure consistent hierarchy:

```css
.dark-mode {
  --color-text-primary: var(--color-gray-50); /* Lightest */
  --color-text-secondary: var(--color-gray-300); /* Lighter */
  --color-text-tertiary: var(--color-gray-400); /* Light */
  --color-text-quaternary: var(--color-gray-500); /* Base */
}
```

---

## 5. Creating New Color Families

**When you need this:** Adding a new status color (e.g., "info" for informational messages).

**Time:** 30 minutes

**Files to edit:** `theme.css`

---

### Step 1: Generate Color Scale

Use color generator:

- **Input:** Your color (e.g., `#3B82F6` for info blue)
- **Output:** 50-950 scale

**Or use existing Tailwind scale:** (`--color-blue-*`)

---

### Step 2: Add Base Color Scale

**Edit:** `theme.css` Section 2 (add after existing status colors ~Line 177)

```css
/* INFO COLORS */
--color-info-25: rgb(245 250 255);
--color-info-50: rgb(239 248 255);
--color-info-100: rgb(209 233 255);
--color-info-200: rgb(178 221 255);
--color-info-300: rgb(132 202 255);
--color-info-400: rgb(83 177 253);
--color-info-500: rgb(46 144 250);
--color-info-600: rgb(21 112 239);
--color-info-700: rgb(23 92 211);
--color-info-800: rgb(24 73 169);
--color-info-900: rgb(25 65 133);
--color-info-950: rgb(16 42 86);
```

---

### Step 3: Add Utility Color Mappings

**Edit:** `theme.css` Section 3 (Lines 509-676)

```css
/* UTILITY COLORS */
--color-utility-info-50: var(--color-info-50);
--color-utility-info-100: var(--color-info-100);
--color-utility-info-200: var(--color-info-200);
--color-utility-info-300: var(--color-info-300);
--color-utility-info-400: var(--color-info-400);
--color-utility-info-500: var(--color-info-500);
--color-utility-info-600: var(--color-info-600);
--color-utility-info-700: var(--color-info-700);
```

---

### Step 4: Add Semantic Tokens

**Edit:** `theme.css` Section 3 (add to appropriate categories)

```css
/* TEXT COLORS */
--color-text-info-primary: var(--color-info-600);

/* BORDER COLORS */
--color-border-info: var(--color-info-500);

/* BACKGROUND COLORS */
--color-bg-info-primary: var(--color-info-50);
--color-bg-info-secondary: var(--color-info-100);
--color-bg-info-solid: var(--color-info-600);
```

---

### Step 5: Add Property Tokens

**Edit:** `theme.css` @theme inline (Lines 810-895)

```css
@theme inline {
  --text-color-info-primary: var(--color-text-info-primary);
  --border-color-info: var(--color-border-info);
  --background-color-info-primary: var(--color-bg-info-primary);
  --background-color-info-secondary: var(--color-bg-info-secondary);
  --background-color-info-solid: var(--color-bg-info-solid);
}
```

---

### Step 6: Add Dark Mode Overrides

**Edit:** `theme.css` .dark-mode (Lines 897-1320)

```css
.dark-mode {
  /* Utility color inversions */
  --color-utility-info-50: var(--color-info-950);
  --color-utility-info-100: var(--color-info-900);
  /* ...continue pattern... */
  --color-utility-info-600: var(--color-info-400);
  --color-utility-info-700: var(--color-info-300);

  /* Semantic tokens */
  --color-text-info-primary: var(--color-info-400);
  --color-border-info: var(--color-info-400);
  --color-bg-info-primary: var(--color-info-950);
  --color-bg-info-secondary: var(--color-info-600);
  --color-bg-info-solid: var(--color-info-600);

  /* Property tokens */
  --text-color-info-primary: var(--color-text-info-primary);
  --border-color-info: var(--color-border-info);
  --background-color-info-primary: var(--color-bg-info-primary);
  --background-color-info-secondary: var(--color-bg-info-secondary);
  --background-color-info-solid: var(--color-bg-info-solid);
}
```

---

### Step 7: Create Utilities

**Edit:** `utilities/colors.css`

```css
/* Text */
@utility text-info-primary {
  color: var(--text-color-info-primary);
}

/* Backgrounds */
@utility bg-info-primary {
  background-color: var(--background-color-info-primary);
}

@utility bg-info-secondary {
  background-color: var(--background-color-info-secondary);
}

@utility bg-info-solid {
  background-color: var(--background-color-info-solid);
}

/* Border */
@utility border-info {
  border-color: var(--border-color-info);
}
```

---

### Step 8: Test Complete Color Family

```tsx
<div className="space-y-4">
  {/* Info banner */}
  <div className="bg-info-primary border-info border-l-4 p-4">
    <p className="text-info-primary">Informational message</p>
  </div>

  {/* Info badge */}
  <span className="bg-info-solid rounded px-2 py-1 text-white">Info Badge</span>

  {/* Dark mode test */}
  <div className="dark-mode">
    <div className="bg-info-primary p-4">
      <p className="text-info-primary">Dark mode info</p>
    </div>
  </div>
</div>
```

---

## 6. Debugging Dark Mode Issues

**When you need this:** Dark mode colors look wrong or don't change.

**Time:** 10-30 minutes

---

### Symptom 1: Colors Don't Change in Dark Mode

**Cause:** Missing dark mode override or wrong token.

**Diagnostic:**

```tsx
<div className="dark-mode">
  <p className="text-primary">Should be light gray but isn't</p>
</div>
```

**Steps:**

1. **Inspect element in DevTools**

   ```
   color: var(--text-color-primary)
     → var(--color-text-primary)
     → rgb(24, 29, 39)  /* Still dark! */
   ```

2. **Check .dark-mode override exists**

   ```css
   /* Search theme.css for: */
   .dark-mode {
     --color-text-primary: var(--color-gray-50); /* Should be here! */
   }
   ```

3. **Verify .dark-mode class is applied**

   ```tsx
   {
     /* ❌ Missing class */
   }
   ;<div>
     <p className="text-primary">No dark mode</p>
   </div>

   {
     /* ✅ Correct */
   }
   ;<div className="dark-mode">
     <p className="text-primary">Dark mode active</p>
   </div>
   ```

4. **Fix:** Add dark mode override if missing

---

### Symptom 2: Wrong Color in Dark Mode

**Cause:** Incorrect color mapping in dark mode.

**Example:** Text is too dark on dark background (low contrast).

**Steps:**

1. **Identify token and current value**

   ```css
   .dark-mode {
     --color-text-secondary: var(--color-gray-300); /* Current */
   }
   ```

2. **Test lighter/darker alternatives**

   ```css
   /* Try lighter */
   --color-text-secondary: var(--color-gray-200);

   /* Or darker */
   --color-text-secondary: var(--color-gray-400);
   ```

3. **Check contrast ratio** (DevTools or WebAIM)
   - Minimum: 4.5:1 for body text
   - Minimum: 3:1 for large text

4. **Update token accordingly**

---

### Symptom 3: Some Elements Work, Others Don't

**Cause:** Utility using raw color instead of semantic token.

**Diagnostic:**

```tsx
{
  /* ❌ Raw color - won't change */
}
;<p className="text-gray-900">Static color</p>

{
  /* ✅ Semantic token - changes */
}
;<p className="text-primary">Dynamic color</p>
```

**Fix:** Replace raw colors with semantic tokens throughout codebase.

**Search pattern:**

```bash
# Find raw color utilities
grep -r "text-gray-" src/
grep -r "bg-gray-" src/
grep -r "border-gray-" src/
```

---

### Symptom 4: Flashing/FOUC (Flash of Unstyled Content)

**Cause:** Dark mode class applied after initial render.

**Fix:** Ensure dark mode class is set before hydration:

```tsx
// _app.tsx or layout.tsx
useEffect(() => {
  const isDark = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark-mode', isDark)
}, [])
```

**Better:** Use `next-themes` or similar for SSR support.

---

### Debugging Checklist

✅ **`.dark-mode` class is applied to parent element**
✅ **Semantic token has dark mode override in theme.css**
✅ **Property token is also remapped in dark mode**
✅ **Utility uses property token, not semantic token**
✅ **Contrast ratio meets accessibility standards**
✅ **No raw color utilities (text-gray-_, bg-gray-_) in use**

---

## 7. Ensuring Semantic Token Adherence

**When you need this:** Auditing codebase or reviewing PRs.

**Time:** Ongoing

---

### What to Look For

#### ✅ Correct: Semantic Tokens

```tsx
<div className="bg-primary text-primary border-primary border">Semantic tokens</div>
```

#### ❌ Wrong: Raw Colors

```tsx
<div className="border-gray-300 bg-white text-gray-900">Raw colors (won't adapt to dark mode)</div>
```

---

### Automated Checks

**1. Search for raw color patterns:**

```bash
# Text colors
grep -r "text-gray-" src/ --exclude-dir=node_modules
grep -r "text-white" src/ --exclude-dir=node_modules  # ⚠️ Check context
grep -r "text-black" src/ --exclude-dir=node_modules

# Backgrounds
grep -r "bg-white" src/ --exclude-dir=node_modules
grep -r "bg-gray-" src/ --exclude-dir=node_modules

# Borders
grep -r "border-gray-" src/ --exclude-dir=node_modules
```

**2. Check for arbitrary values:**

```bash
grep -r "bg-\[" src/  # Arbitrary background colors
grep -r "text-\[" src/  # Arbitrary text colors
```

---

### PR Review Checklist

When reviewing code changes:

- [ ] Uses semantic tokens (`text-primary`, `bg-primary`)
- [ ] No raw color utilities (`text-gray-900`, `bg-white`)
- [ ] No arbitrary color values (`bg-[#FFFFFF]`)
- [ ] Tested in both light and dark mode
- [ ] Proper semantic token for context (e.g., `text-error-primary` for errors)
- [ ] Hover/focus states use semantic tokens
- [ ] New components follow established patterns

---

### Refactoring Legacy Code

**Pattern:** Search and replace raw colors → semantic tokens

```tsx
// Before
<button className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
  Click me
</button>

// After
<button className="bg-primary text-primary border-primary hover:bg-hover">
  Click me
</button>
```

**Tool:** Create migration script:

```bash
#!/bin/bash
# replace-raw-colors.sh

# Text colors
sed -i '' 's/text-gray-900/text-primary/g' src/**/*.tsx
sed -i '' 's/text-gray-700/text-secondary/g' src/**/*.tsx
sed -i '' 's/text-gray-600/text-tertiary/g' src/**/*.tsx

# Backgrounds
sed -i '' 's/bg-white/bg-primary/g' src/**/*.tsx
sed -i '' 's/bg-gray-50/bg-secondary/g' src/**/*.tsx
sed -i '' 's/bg-gray-100/bg-tertiary/g' src/**/*.tsx

# Borders
sed -i '' 's/border-gray-300/border-primary/g' src/**/*.tsx
sed -i '' 's/border-gray-200/border-secondary/g' src/**/*.tsx
```

**⚠️ Warning:** Test thoroughly after automated replacements!

---

## 8. Common Mistakes and Fixes

**Learn from common errors and how to fix them.**

---

### Mistake 1: Using Raw Color Utilities

**❌ Wrong:**

```tsx
<div className="border-gray-300 bg-white text-gray-900" />
```

**✅ Fix:**

```tsx
<div className="bg-primary text-primary border-primary" />
```

**Why:** Raw colors don't adapt to dark mode.

---

### Mistake 2: Wrong Token Prefix in Utilities

**❌ Wrong:**

```css
@utility text-primary {
  color: var(--color-text-primary); /* Wrong prefix! */
}
```

**✅ Fix:**

```css
@utility text-primary {
  color: var(--text-color-primary); /* Correct property token */
}
```

**Why:** Tailwind v4 requires property token prefix.

---

### Mistake 3: Forgetting Dark Mode Override

**❌ Wrong:**

```css
/* Only light mode defined */
--color-text-my-token: var(--color-gray-700);
```

**✅ Fix:**

```css
/* Light mode */
--color-text-my-token: var(--color-gray-700);

/* Dark mode */
.dark-mode {
  --color-text-my-token: var(--color-gray-300);
}
```

**Why:** Token won't adapt to dark mode without override.

---

### Mistake 4: Skipping Property Token Mapping

**❌ Wrong:**

```css
/* Semantic token defined */
--color-text-my-token: var(--color-gray-700);

/* ❌ Missing property token! */
```

**✅ Fix:**

```css
/* Semantic token */
--color-text-my-token: var(--color-gray-700);

/* Property token mapping */
@theme inline {
  --text-color-my-token: var(--color-text-my-token);
}
```

**Why:** Can't generate utility without property token.

---

### Mistake 5: Editing Base Colors for Theming

**❌ Wrong:**

```css
/* Modifying base colors for dark mode */
--color-gray-900: rgb(255 255 255); /* Don't do this! */
```

**✅ Fix:**

```css
/* Edit semantic tokens instead */
.dark-mode {
  --color-text-primary: var(--color-gray-50); /* Correct approach */
}
```

**Why:** Base colors should remain static. Semantic tokens handle theming.

---

### Mistake 6: Inconsistent Token Hierarchy

**❌ Wrong:**

```css
.dark-mode {
  --color-text-primary: var(--color-gray-400); /* Less prominent */
  --color-text-secondary: var(--color-gray-300); /* More prominent */
  /* Hierarchy is backwards! */
}
```

**✅ Fix:**

```css
.dark-mode {
  --color-text-primary: var(--color-gray-50); /* Most prominent */
  --color-text-secondary: var(--color-gray-300); /* Less prominent */
  /* Hierarchy is correct */
}
```

**Why:** Maintain visual hierarchy: primary > secondary > tertiary > quaternary.

---

### Mistake 7: Using `dark:` Prefix Instead of `.dark-mode`

**❌ Wrong:**

```tsx
<p className="text-gray-900 dark:text-gray-50">Using dark: prefix</p>
```

**✅ Fix:**

```tsx
<p className="text-primary">Semantic token auto-adapts</p>
```

**Why:** System uses `.dark-mode` class, not Tailwind's `dark:` variant.

---

### Mistake 8: Not Testing Contrast Ratios

**❌ Wrong:**

```css
.dark-mode {
  --color-text-secondary: var(--color-gray-600); /* Too dark on dark bg! */
  --color-bg-primary: var(--color-gray-950);
  /* Contrast: 1.5:1 (fails WCAG) */
}
```

**✅ Fix:**

```css
.dark-mode {
  --color-text-secondary: var(--color-gray-300); /* Lighter */
  --color-bg-primary: var(--color-gray-950);
  /* Contrast: 4.8:1 (passes WCAG) */
}
```

**Why:** Must meet WCAG contrast standards (4.5:1 minimum).

---

## 9. Testing Your Changes

**Comprehensive testing checklist.**

---

### Visual Testing

#### Test in Light Mode

```tsx
<div className="bg-primary space-y-4 p-8">
  <h1 className="text-primary">Primary text</h1>
  <p className="text-secondary">Secondary text</p>
  <button className="bg-brand-solid text-primary_on-brand px-4 py-2">Button</button>
</div>
```

**Check:**

- ✅ Colors look correct
- ✅ Text is readable
- ✅ Hover states work
- ✅ Focus rings visible

#### Test in Dark Mode

```tsx
<div className="dark-mode bg-primary space-y-4 p-8">
  <h1 className="text-primary">Primary text</h1>
  <p className="text-secondary">Secondary text</p>
  <button className="bg-brand-solid text-primary_on-brand px-4 py-2">Button</button>
</div>
```

**Check:**

- ✅ Colors inverted correctly
- ✅ Contrast ratios acceptable
- ✅ No harsh colors
- ✅ Hover/focus still visible

---

### Automated Testing

#### Check Build

```bash
npm run build
```

**Verify:**

- ✅ No CSS errors
- ✅ No unused token warnings
- ✅ Bundle size reasonable

#### Type Check

```bash
npm run type-check
```

**Verify:**

- ✅ No TypeScript errors
- ✅ Token names match between CSS and usage

---

### Browser Testing

**Test in multiple browsers:**

- Chrome/Edge
- Firefox
- Safari

**Check:**

- ✅ Colors render correctly
- ✅ Dark mode works
- ✅ No FOUC (flash of unstyled content)

---

### Accessibility Testing

#### Contrast Ratios

**Use DevTools:**

1. Inspect text element
2. Check "Contrast" in Accessibility panel
3. Verify: ✅ Passes / ❌ Fails

**Online tools:**

- https://webaim.org/resources/contrastchecker/
- https://contrast-ratio.com/

**Requirements:**

- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

#### Keyboard Navigation

**Test focus indicators:**

```tsx
<button className="focus:ring-brand focus:ring-2">Tab to me</button>
```

**Check:**

- ✅ Focus ring visible in both themes
- ✅ Ring has sufficient contrast
- ✅ Ring doesn't clip

---

### Token Validation

#### Verify Token Chain

**Use DevTools Computed tab:**

```
1. Inspect element
2. Find property (e.g., color)
3. Trace var() references:

color: rgb(24, 29, 39)
  ↓ var(--text-color-primary)
  ↓ var(--color-text-primary)
  ↓ var(--color-gray-900)
  ↓ rgb(24, 29, 39)
```

**Check:**

- ✅ Token chain resolves
- ✅ Correct color at end
- ✅ No `undefined` values

---

### Regression Testing

**Check existing components:**

```tsx
{
  /* Card */
}
;<Card>Should still look correct</Card>

{
  /* Form */
}
;<Input placeholder="Should work" />

{
  /* Button */
}
;<Button>Should work</Button>

{
  /* Alert */
}
;<Alert variant="error">Should work</Alert>
```

**Verify:**

- ✅ No visual regressions
- ✅ Colors still appropriate
- ✅ Dark mode still works

---

### Sign-off Checklist

Before merging changes:

**Development:**

- [ ] Light mode looks correct
- [ ] Dark mode looks correct
- [ ] All semantic tokens defined
- [ ] Property tokens mapped
- [ ] Dark mode overrides added
- [ ] Utilities created and work
- [ ] No console errors/warnings

**Testing:**

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Contrast ratios pass WCAG
- [ ] Focus indicators visible
- [ ] No visual regressions
- [ ] Build succeeds

**Code Quality:**

- [ ] No raw color utilities
- [ ] Token hierarchy correct
- [ ] Dark mode complete
- [ ] Code follows patterns
- [ ] Documentation updated (if applicable)

---

## 🔗 Related Documentation

- **[README.md](../README.md)** - System overview and quick reference
- **[THEME-STRUCTURE.md](./THEME-STRUCTURE.md)** - Token architecture
- **[UTILITIES-GUIDE.md](./UTILITIES-GUIDE.md)** - Utility reference

---

**Last Updated:** December 2025
