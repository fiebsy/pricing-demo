# Layout Synchronization & Skeleton Strategy (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../FEATURES.md](../FEATURES.md) and [../STYLING.md](../STYLING.md) for current skeleton documentation.

---

> **Goal:** Ensure zero Cumulative Layout Shift (CLS) when transitioning from loading state (Skeleton) to loaded state (StickyDataTable).

## 🎯 Core Concept: Single Source of Truth

The synchronization relies on a shared configuration file that dictates dimensions for **both** the real table and the skeleton loader.

**Config File:** `src/modules/design-system/v2/components/ui/custom/data/sticky-data-table/config.ts`

```typescript
export const TABLE_CONFIG = {
  HEADER_GAP: 12, // Gap above sticky header
  HEADER_HEIGHT: 48, // Fixed header row height
  ROW_HEIGHT: 46, // Fixed body row height
  TOOLBAR_HEIGHT: 20, // Fixed toolbar height
  TOOLBAR_MARGIN: 16, // Margin below toolbar
  // ...
}
```

By importing these constants in both `StickyDataTable` components (`TableRow`, `TableHeader`) and `TableSkeleton`, we guarantee that any change to a dimension is automatically reflected everywhere.

---

## 🏗️ Architecture

### 1. Real Table (`StickyDataTable`)

- **Toolbar:** Uses flex layout but respects the margin defined in config.
- **Header:** `TableHeader` uses `HEADER_HEIGHT` for its container.
- **Body:** `TableRow` uses `ROW_HEIGHT` for its grid container height.
- **Gap:** `StickyHeaderWrapper` uses `HEADER_GAP` to position the sticky header.

### 2. Skeleton Loader (`TableSkeleton`)

- **Structure:** Exactly mimics the DOM nesting of the real table (`div` > `div` > `grid`).
- **Dimensions:** Imports `TABLE_CONFIG` directly to calculate total height and element sizes.
- **Alignment:** Uses the same grid template generator (`generateSkeletonGridTemplate`) as the real table.

---

## 🧪 How to Audit & Test

We have a dedicated playground for verifying layout synchronization.

**URL:** `/playground/ui/gallery/table-payva/skeleton-loader-playground`

### Debug Mode

1. Open the playground.
2. In the control panel, expand the **Debug** section.
3. Enable **Debug Mode** and **Show Measurements**.

### Interpreting the Console Output

When you click **"Simulate Page Load"**, the console will log a comparison:

```
📏 Layout Shift Analysis
 SKELETON CONFIG
Toolbar: 36px
Header Gap: 12px
...

 REAL MEASUREMENTS
Toolbar: 36px ✅
Header Gap: 12px ✅
...

✅ PERFECT MATCH - No Layout Shift
```

- **✅ MATCH**: The real DOM element height matches the config constant exactly.
- **⚠️ MISMATCH**: There is a layout shift. The log will show the difference.

---

## 🛠️ Making Changes

### Scenario A: Changing Row Height

1. Open `config.ts`.
2. Update `ROW_HEIGHT` to the new value (e.g., `60`).
3. **Done!** Both the real table rows and skeleton rows will update automatically.

### Scenario B: Adding New UI Elements

If you add a new element (e.g., a footer) to `StickyDataTable`:

1. Add its height constant to `TABLE_CONFIG`.
2. Update the real component to use this constant.
3. Update `TableSkeleton` to include a placeholder for this element using the same constant.
4. Use the playground to verify alignment.

### Scenario C: Debugging a Mismatch

If the playground reports a mismatch:

1. Check if `StickyDataTable` has introduced any dynamic sizing or new margins.
2. Verify that the DOM selector in the playground's `useEffect` is still targeting the correct element.
3. Ensure `box-sizing` isn't causing issues (height usually includes padding/border).

---

## 🎨 Animation Experiments

When experimenting with new loading animations:

1. **Keep Dimensions Fixed:** You can animate opacity, background color, or shimmer effects, but **never** animate `height`, `margin`, or `padding` of the container elements during the loading state.
2. **Use `TableSkeleton` as Base:** Create new variants (e.g., `TableSkeletonFade`, `TableSkeletonShimmer`) that wrap the same structural logic but apply different CSS classes.

---

**Key Rule:** If `TABLE_CONFIG` changes, layout shifts are impossible. If styles override `TABLE_CONFIG`, layout shifts are guaranteed.
