# ButtonAnimation V2 Debug Guide

## 🔍 How to Capture & Share Debug Logs

### Step 1: Open the Playground
1. Navigate to http://localhost:3000/playground/button-animation-v2
2. Open Chrome DevTools (F12)
3. Go to the Console tab

### Step 2: Enable Debug Features
In the Control Panel (right sidebar):
1. Click the **Debug** tab
2. Enable **"Enable Debug Overlay"**
3. Enable **"Show Mini Tracker"**
4. Enable all debug options (Grid, Rulers, Connections, Calculations)

### Step 3: Reproduce the Issue
1. Click on buttons in this sequence:
   - Click "Design" → Should show "All" anchored at 8px
   - Click "Figma" → Should show "All" at 8px, "Design" at 16px
   - Click "Components" → Should show stack of 3 anchored items
   - Click "Buttons" → Should show stack of 4 anchored items

### Step 4: Capture Logs
In the Chrome DevTools Console:

```javascript
// Export the position log
window.exportPositionLog()

// This will download a JSON file with all position data
```

### Step 5: What to Share

1. **Console Output**: Copy all the logs that show:
   ```
   🎯 Position Update at [time]
   Active Path: design → figma → components
   Anchored Count: 2
   Expected Child Offset: 16px
   [Table with button positions]
   ```

2. **Downloaded JSON File**: The position log file

3. **Screenshot**: Take a screenshot showing:
   - The button layout
   - The debug overlay (if visible)
   - The console with errors (if any)

4. **Current Behavior vs Expected**:
   - **Expected**: Each anchored button stacks at 8px intervals (8px, 16px, 24px, etc.)
   - **Actual**: [Describe what you're seeing]

## 📊 Debug Information Available

### In the Console
- `window.exportPositionLog()` - Export all position data
- `window.clearPositionLog()` - Clear stored logs

### Visual Indicators
- **Yellow dots**: Anchored buttons
- **Green dots**: Active buttons
- **Blue dots**: Child buttons
- **Grid lines**: Show 8px intervals
- **Offset calculations panel**: Shows expected positions

## 🔧 Quick Checks

1. **Are we using the Enhanced version?**
   - Check that playground imports `EnhancedButtonAnimationV2`
   - Look for `data-enhanced="true"` attribute on the component

2. **Is the context being passed correctly?**
   - Check console for `anchoredCount` values
   - Verify `activePath` shows correct selection

3. **Are positions calculated correctly?**
   - First anchor should be at `peekOffset * 1` (8px)
   - Second anchor at `peekOffset * 2` (16px)
   - Children at `peekOffset * anchoredCount`

## 📝 Files Involved

Key files with positioning logic:
- `src/components/ui/prod/base/button-animation-v2/core/position-calculator.ts`
- `src/components/ui/prod/base/button-animation-v2/components/AnimatedButton.tsx`
- `src/components/ui/prod/base/button-animation-v2/components/EnhancedStackLevel.tsx`
- `src/components/ui/prod/base/button-animation-v2/EnhancedButtonAnimationV2.tsx`

## 🐛 Common Issues

### Issue: Buttons overlapping instead of stacking
- **Check**: Is `anchoredCount` being calculated correctly?
- **Check**: Is `anchorIndex` being passed to layout context?

### Issue: Children not positioned after anchors
- **Check**: Is `anchoredCount` passed to child context?
- **Check**: Is first child getting absolute positioning?

### Issue: No console logs appearing
- **Check**: Is `PositionLogger` included in the component?
- **Check**: Are you in development mode?

## 💡 Testing Commands

```bash
# Clear cache and restart
rm -rf .next && pnpm dev

# Check if using enhanced version
grep "EnhancedButtonAnimationV2" src/app/playground/button-animation-v2/page.tsx

# View recent changes
git diff src/components/ui/prod/base/button-animation-v2/
```