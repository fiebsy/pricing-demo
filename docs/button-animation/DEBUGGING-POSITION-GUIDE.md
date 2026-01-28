# Button Animation V3: Position Debugging Guide

## Overview

This guide provides comprehensive debugging techniques for tracking and fixing position issues in the ButtonAnimation V3 component, specifically addressing anchor button positioning problems.

## The Core Issue

The main problem occurs when multiple buttons become "anchored" (have children expanded below them). Each anchored button should stack with a progressive offset, but currently only the first promoted button positions correctly.

### Visual Representation of the Bug
```
Expected:
[All] → [Design] → [Figma] → [Components]
0px     8px        16px       24px

Actual (Broken):
[All] → [Design] → [Figma][Components overlapping]
0px     8px        8px
```

## Debugging Tools Available

### 1. Debug Mode in Playground

Enable debug mode in the playground to see:
- Position values on each button
- State indicators (A = Anchored, ACT = Active, C = Child)
- Level and depth information
- Calculated offsets in pixels

### 2. Console Debugging

The enhanced StackLevelDebug component provides console utilities:

```javascript
// In browser console:
buttonAnimationDebug.printCurrentState()  // Show all button positions
buttonAnimationDebug.printHistory('figma')  // Show position history for a button
buttonAnimationDebug.findOverlaps()  // Detect overlapping buttons
```

### 3. Visual Debug Overlay

The PositionDebugOverlay component shows:
- Real-time position tracking
- Overlap detection
- Active path visualization
- Offset calculator

## Key Debugging Points

### 1. Position Calculation Logic

The position of each button depends on:

```typescript
// For anchored items:
offset = peekOffset * depth

// For active (non-anchored) items:
offset = peekOffset * anchoredCount
```

**Debug Check**: Verify that `depth` and `anchoredCount` are calculated correctly.

### 2. Recursive Rendering

Children are rendered recursively, and each level needs to maintain proper offset:

```typescript
// Level 0: Root items
// Level 1: First-level children  
// Level 2: Second-level children (THIS IS WHERE IT BREAKS)
// Level 3+: Deeper levels
```

**Debug Check**: Log the level and accumulated offset at each recursive call.

### 3. State Transitions

Track when buttons transition between states:
- `idle` → `active`: Button is clicked
- `active` → `anchored`: Button's children are expanded
- `anchored` → `active`: Children are collapsed

**Debug Check**: Log state transitions and verify offset updates.

## Debugging Workflow

### Step 1: Enable Debug Mode

```typescript
// In playground page
<ButtonAnimationV3
  showDebug={true}
  // ... other props
/>
```

### Step 2: Navigate to Reproduce Issue

1. Click "Design" - observe console logs
2. Click "Figma" - check if offset is correct
3. Click "Components" - THIS IS WHERE IT FAILS
4. Check console for offset calculations

### Step 3: Check Key Variables

At each navigation step, verify:

```javascript
console.log({
  activePath,        // ['design', 'figma', 'components']
  level,            // Current recursion level
  depth,            // How deep is this anchored item
  anchoredCount,    // How many ancestors are anchored
  calculatedOffset  // Final pixel offset
})
```

### Step 4: Trace the Recursion

The recursive structure should maintain offsets:

```
StackLevel (level=0)
  ├─ All (anchored at 0px)
  ├─ Design (active, anchored at 8px)
  └─ StackLevel (level=1)
      ├─ Figma (active, anchored at 16px)
      └─ StackLevel (level=2)  <-- PROBLEM HERE
          └─ Components (active at 24px)
```

## Common Issues and Solutions

### Issue 1: Children Not Inheriting Parent Offset

**Symptom**: Children at level 2+ start at wrong position

**Debug**:
```javascript
// In StackLevel component
console.log('Rendering children at level', level + 1)
console.log('Parent offset should be', getActiveOffset())
```

**Solution**: Wrap recursive children in positioned container

### Issue 2: Anchored Items Overlapping

**Symptom**: Multiple anchored items at same position

**Debug**:
```javascript
// Check each anchored item's calculated offset
if (isAnchored) {
  console.log(`${item.id} anchored at depth ${depth}: ${offset}px`)
}
```

**Solution**: Ensure depth is incremented correctly for each level

### Issue 3: Active Items Not Pushing Off

**Symptom**: Active items don't account for full anchor stack

**Debug**:
```javascript
// Verify anchor count
const anchoredDepth = activePath.length
console.log('Active item should push off by', anchoredDepth * peekOffset)
```

**Solution**: Count all ancestors in activePath for offset

## Advanced Debugging Techniques

### 1. Position Tracking with MutationObserver

```javascript
// Track DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      console.log('Position changed:', mutation.target, mutation.target.style.left)
    }
  })
})

observer.observe(document.querySelector('.button-container'), {
  attributes: true,
  subtree: true,
  attributeFilter: ['style']
})
```

### 2. Visual Position Markers

Add visual markers to see expected vs actual positions:

```javascript
// Add markers at expected positions
[0, 8, 16, 24].forEach(offset => {
  const marker = document.createElement('div')
  marker.style.cssText = `
    position: absolute;
    left: ${offset}px;
    top: 0;
    width: 1px;
    height: 100px;
    background: red;
    z-index: 9999;
  `
  document.body.appendChild(marker)
})
```

### 3. Animation Frame Logging

Track positions during animations:

```javascript
let frameCount = 0
const trackAnimation = () => {
  if (frameCount++ < 60) {  // Track for 1 second
    document.querySelectorAll('[data-button-id]').forEach(btn => {
      const rect = btn.getBoundingClientRect()
      console.log(`Frame ${frameCount}: ${btn.dataset.buttonId} at ${rect.left}px`)
    })
    requestAnimationFrame(trackAnimation)
  }
}
trackAnimation()
```

## The Fix Explained

The core issue was that recursive children weren't maintaining their parent's offset. The solution involves:

1. **Cumulative Offset Calculation**: Each anchored level adds to the total offset
2. **Recursive Container Positioning**: Children are wrapped in a container positioned at the parent's offset
3. **Consistent State Management**: Ensure state transitions maintain correct offsets

### Key Code Changes

```typescript
// Fixed offset calculation
const getAnchoredOffset = (depth: number) => {
  return styleConfig.peekOffset * depth
}

const getActiveOffset = () => {
  const anchoredDepth = activePath.length
  return styleConfig.peekOffset * anchoredDepth
}

// Recursive children with maintained offset
{level > 0 ? (
  <div style={{ position: 'absolute', left: getActiveOffset() }}>
    <StackLevel items={activeItem.children} />
  </div>
) : (
  <StackLevel items={activeItem.children} />
)}
```

## Testing the Fix

1. Navigate to deepest level: All → Design → Figma → Components → Buttons
2. Verify each button is offset by 8px from previous
3. Check no overlapping occurs
4. Test collapse and re-expand maintains positions
5. Try different branches to ensure consistency

## Performance Monitoring

While debugging, also monitor performance:

```javascript
// Measure render time
console.time('StackLevel render')
// ... component renders
console.timeEnd('StackLevel render')

// Check for unnecessary re-renders
useEffect(() => {
  console.count(`StackLevel ${level} rendered`)
})
```

## Conclusion

Debugging position issues requires:
1. Understanding the recursive structure
2. Tracking state at each level
3. Verifying offset calculations
4. Ensuring proper container positioning

Use the tools and techniques in this guide to identify and fix positioning bugs efficiently.