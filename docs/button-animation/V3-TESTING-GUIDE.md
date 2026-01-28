# Button Animation V3 - Testing Guide

## Quick Test Sequence

### Test 1: Basic 4-Level Navigation
**Purpose**: Verify anchor stacking works at all depths

1. Click **Design** → Observe "All" anchors left
2. Click **Figma** → Observe "Design" stacks next to "All" 
3. Click **Components** → Observe "Figma" stacks next to "Design"
4. Click **Buttons** → Observe "Components" stacks next to "Figma"

**Expected**: Each anchored button should progressively stack, creating a breadcrumb-like trail

### Test 2: Collapse and Re-expand
**Purpose**: Verify positions remain consistent

1. Navigate to: Design → Figma → Components → Buttons
2. Click "All" to collapse everything
3. Navigate again to: Design → Figma → Components
4. Verify positions match the first navigation

### Test 3: Different Branches
**Purpose**: Test consistency across different navigation paths

1. Navigate: Develop → React → Hooks → useState
2. Reset (click "All")
3. Navigate: Deploy → AWS → Lambda
4. Reset
5. Navigate: Design → Sketch → Symbols

**Expected**: Same depth = same visual offset regardless of branch

### Test 4: Rapid Navigation
**Purpose**: Test animation smoothness and no position jumping

1. Quickly click: Design → Figma → Components → Buttons
2. Quickly click back through anchored items
3. Rapidly switch between siblings

**Expected**: Smooth transitions, no overlapping, no jumping

## Visual Verification Checklist

### Anchor Stack Alignment
- [ ] All anchored items align vertically
- [ ] Each level has consistent offset (default 8px)
- [ ] No overlapping between anchored items
- [ ] Proper z-index layering (deeper = higher z-index)

### Active Item Positioning
- [ ] Active items push off from the last anchor
- [ ] Active items maintain consistent spacing
- [ ] Child items appear below their parent
- [ ] No gap between anchor stack and active items

### Animation Quality
- [ ] Smooth promotion animation when child becomes parent
- [ ] No jarring jumps or position resets
- [ ] Consistent spring physics across all transitions
- [ ] Proper fade for anchored items

## Configuration Testing

### Peek Offset Variations
Test with different offset values:

1. **Negative Offset (-8px)**
   - Anchors stack to the left
   - Creates overlapping effect

2. **Zero Offset (0px)**
   - All items stack at same position
   - Tests pure z-index layering

3. **Large Offset (24px)**
   - Wide spacing between anchors
   - Tests layout boundaries

### Animation Speed
1. Set spring stiffness to 1000 (very fast)
2. Set spring stiffness to 100 (very slow)
3. Verify no position glitches at extremes

## Edge Cases

### Single Child Paths
- Design → Adobe XD (no children)
- Deploy → Vercel (no children)

### Deep Nesting (5+ levels)
- All → Design → Figma → Components → Buttons
- Verify all 5 levels stack correctly

### Many Siblings
- At Components level: Buttons, Inputs, Cards
- Verify layout when returning to parent

## Performance Metrics

### Expected Performance
- Initial render: < 16ms
- Navigation click: < 8ms
- Animation frame: Consistent 60fps
- Memory: No leaks after 100 navigations

### Performance Test
1. Open DevTools Performance tab
2. Start recording
3. Navigate through all branches
4. Stop recording
5. Verify no dropped frames

## Regression Tests

### From V2 Issues
- [ ] Child-to-parent promotion animates correctly
- [ ] No instant jumps when child becomes parent
- [ ] Consistent behavior at all nesting levels

### From V3 Fixes
- [ ] Anchors don't overlay on each other
- [ ] Cumulative offset calculation works
- [ ] Depth-aware positioning is correct

## Debug Mode Testing

Enable debug mode to verify:
- Correct state labels on each button
- Promotion state triggers appropriately
- Active path updates correctly
- Z-index values are as expected

## Accessibility Testing

1. **Keyboard Navigation**
   - Tab through all buttons
   - Enter/Space activate buttons
   - Focus indicators visible

2. **Screen Reader**
   - Proper ARIA labels
   - State announcements
   - Navigation context

3. **Reduced Motion**
   - Animations disabled
   - Instant transitions
   - No motion sickness triggers

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

## Mobile Testing

1. Touch interactions work
2. No hover states stuck
3. Proper touch targets (44x44 minimum)
4. Smooth animations on mobile devices