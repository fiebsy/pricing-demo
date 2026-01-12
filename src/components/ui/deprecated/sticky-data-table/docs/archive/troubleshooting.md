# Troubleshooting (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../INDEX.md](../INDEX.md) for current documentation.

---

Common issues, solutions, and best practices for StickyDataTable.

## Common Issues

### Columns Not Aligning

**Symptoms:** Header and body columns don't line up perfectly.

**Solutions:**

- Ensure `gridTemplate` matches exactly between header and body (handled automatically)
- Check that column widths in `columns` config are correct
- Verify padding classes match between header and row cells (handled automatically)
- Check browser DevTools - grid template should be identical for header and body
- Ensure both components are using the same `generateGridTemplate()` call

**Debug Steps:**

1. Open browser DevTools
2. Inspect header and body grid containers
3. Compare `grid-template-columns` values - they should be identical
4. Check for any CSS overrides affecting column widths

### Sticky Columns Not Working

**Symptoms:** Sticky columns don't remain fixed when scrolling.

**Solutions:**

- Verify `isSticky: true` in column config
- Check `stickyLeft` offset is correct (sum of previous sticky widths)
- Ensure parent container has proper overflow settings
- Verify no CSS `overflow: hidden` on parent containers
- Check z-index values (sticky columns should have `z-index: 10`)

**Common Mistakes:**

```tsx
// ❌ Wrong: stickyLeft not calculated correctly
{
  key: 'name',
  isSticky: true,
  stickyLeft: 0, // Should be sum of previous sticky widths
}

// ✅ Correct: stickyLeft is sum of previous widths
{
  key: 'rank',
  width: 48,
  isSticky: true,
  stickyLeft: 0,
},
{
  key: 'name',
  width: 180,
  isSticky: true,
  stickyLeft: 48, // Sum of previous sticky width (48)
}
```

### Arrows Not Appearing

**Symptoms:** Navigation arrows don't show when content overflows.

**Solutions:**

- Check `useTableScrollState` hook is working
- Verify scroll width exceeds client width
- Ensure `SCROLL_THRESHOLD` isn't too large (default: 10px)
- Check that scroll containers have proper overflow settings
- Verify arrow positioning CSS is correct

**Debug Steps:**

1. Check scroll container dimensions in DevTools
2. Verify `scrollWidth > clientWidth`
3. Check `canScrollLeft` and `canScrollRight` values in React DevTools
4. Inspect arrow elements - they should be positioned correctly

### Styling Not Updating

**Symptoms:** Backgrounds or borders don't change when expected.

**Solutions:**

- Verify `stickyState` is being passed correctly
- Check `useEnhancedStyling` is true when arrows are visible
- Ensure background/border configs are correct
- Verify semantic tokens are being used (not raw colors)
- Check for CSS specificity issues

**Debug Steps:**

1. Inspect sticky cells in DevTools
2. Check computed background/border classes
3. Verify `stickyState.useEnhancedStyling` value
4. Check for CSS overrides or conflicting styles

### Type Errors with Generic Data

**Symptoms:** TypeScript errors when using the component.

**Solutions:**

- Ensure your data type extends `Record<string, any>`
- Check that column keys match your data properties
- Verify `renderCell` function signature matches expected type

**Example:**

```tsx
// ❌ Wrong: Type doesn't extend Record<string, any>
interface User {
  id: string
  name: string
}

// ✅ Correct: Extends Record<string, any>
interface User extends Record<string, any> {
  id: string
  name: string
}

// Or use type assertion
;<StickyDataTable<User & Record<string, any>>
  data={users}
  // ...
/>
```

### Column Animations Not Working

**Symptoms:** Columns don't animate when toggled.

**Solutions:**

- Check that animation CSS is loaded (`src/styles/globals.css`)
- Verify animation classes are being applied
- Check browser DevTools for animation keyframes
- Ensure `leavingColumnKeys` state is working correctly
- Check for CSS conflicts or overrides

**Debug Steps:**

1. Inspect column elements during toggle
2. Check for `animate-column-add` or `animate-column-remove` classes
3. Verify animation keyframes exist in CSS
4. Check for `will-change` or `transform` properties

### Performance Issues

**Symptoms:** Table is slow or laggy, especially with many rows/columns.

**Solutions:**

- Disable column animations (see [Styling Guide](./styling.md))
- Reduce number of visible columns
- Use `minWidth`/`maxWidth` instead of fixed widths
- Memoize `renderCell` function if expensive
- Consider virtual scrolling (not currently implemented)
- Check for unnecessary re-renders with React DevTools

**Performance Checklist:**

- [ ] Animations disabled if not needed
- [ ] `renderCell` function is memoized if expensive
- [ ] Column count is reasonable (< 20 columns)
- [ ] Row count is manageable (< 1000 rows without virtual scrolling)
- [ ] No unnecessary re-renders

## Best Practices

### Column Configuration

**✅ Do:**

- Use consistent widths for similar data types
- Limit sticky columns to 2-3 for best UX
- Calculate `stickyLeft` as sum of previous sticky widths
- Use `minWidth`/`maxWidth` for flexible columns
- Only make columns sortable if sorting makes sense

**❌ Don't:**

- Use too many sticky columns (> 3)
- Forget to calculate `stickyLeft` correctly
- Use fixed widths when flexible would work better
- Make all columns sortable unnecessarily

### Styling

**✅ Do:**

- Use semantic design tokens (`border-primary`, `bg-primary`)
- Match app layout backgrounds for consistency
- Use `hideCellBordersForColumns` for visual grouping
- Test in both light and dark modes

**❌ Don't:**

- Use raw colors (`border-gray-300`, `bg-white`)
- Override too many default styles
- Create conflicting border/background combinations
- Ignore dark mode compatibility

### Cell Rendering

**✅ Do:**

- Keep render functions simple and performant
- Use semantic HTML in render functions
- Memoize expensive render logic
- Return consistent types from renderCell

**❌ Don't:**

- Perform heavy computations in renderCell
- Create new objects/arrays on every render
- Use inline styles unnecessarily
- Mix different return types unpredictably

### Type Safety

**✅ Do:**

- Extend `Record<string, any>` for data types
- Use TypeScript generics properly
- Type column keys correctly
- Use type assertions when necessary

**❌ Don't:**

- Use `any` type unnecessarily
- Ignore TypeScript errors
- Mix typed and untyped data
- Forget to type renderCell parameters

## Debugging Tips

### React DevTools

1. Inspect component props and state
2. Check hook values (`useDynamicColumns`, `useTableScrollState`)
3. Monitor re-renders with Profiler
4. Check for prop drilling issues

### Browser DevTools

1. **Inspect Grid Layout:**
   - Check `grid-template-columns` on header and body
   - Verify column widths match
   - Check for CSS overrides

2. **Inspect Sticky Positioning:**
   - Check `position: sticky` on sticky columns
   - Verify `left` offset values
   - Check z-index stacking

3. **Inspect Scroll State:**
   - Check scroll container dimensions
   - Verify `scrollWidth` vs `clientWidth`
   - Check scroll position values

4. **Inspect Animations:**
   - Check animation classes
   - Verify keyframes exist
   - Check animation timing

### Console Debugging

Add temporary logging to understand state:

```tsx
// In your component
console.log('Sticky State:', stickyState)
console.log('Visible Columns:', visibleColumnKeys)
console.log('Sort State:', { sortColumn, sortDirection })
```

## Getting Help

If you're still experiencing issues:

1. Check the [API Reference](./api-reference.md) for prop details
2. Review [Advanced Usage](./advanced.md) for architecture details
3. Check [Styling Guide](./styling.md) for customization options
4. Review component source code for implementation details
5. Check browser console for errors
6. Verify all dependencies are installed correctly

## Common Patterns

### Fixing Alignment Issues

```tsx
// Ensure grid template matches
const gridTemplate = generateGridTemplate(stickyColumns, scrollableColumns)
// Use same template for header and body
```

### Fixing Sticky Positioning

```tsx
// Calculate stickyLeft correctly
const stickyLeft = stickyColumns.slice(0, index).reduce((sum, col) => sum + (col.minWidth ?? col.width), 0)
```

### Fixing Type Errors

```tsx
// Ensure data type extends Record<string, any>
interface MyData extends Record<string, any> {
  id: string
  // ... other fields
}
```

---

For more information, see the [main documentation index](./index.md).
