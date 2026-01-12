# Animation Components

React components for creating animations.

---

## Topics

- [Motion Component](./motion-component.md): The `<motion.*>` element factory
- [AnimatePresence](./animate-presence.md): Enable exit animations when components unmount

---

## Quick Reference

### Motion Component
```tsx
import { motion } from 'motion/react'

// HTML elements
<motion.div animate={{ opacity: 1 }} />
<motion.button whileTap={{ scale: 0.95 }} />
<motion.span initial={{ y: 10 }} animate={{ y: 0 }} />

// SVG elements
<motion.svg />
<motion.path animate={{ pathLength: 1 }} />
<motion.circle />
```

### AnimatePresence
```tsx
import { motion, AnimatePresence } from 'motion/react'

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

### AnimatePresence Modes
| Mode | Behavior |
|------|----------|
| `mode="sync"` | Enter and exit animate together (default) |
| `mode="wait"` | Exit completes before enter starts |
| `mode="popLayout"` | Elements pop out of flow during exit |
