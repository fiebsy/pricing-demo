# Accessibility

Respect user motion preferences and ensure animations are accessible.

## Overview

Some users experience motion sickness, vestibular disorders, or simply prefer reduced motion. Motion provides tools to respect the `prefers-reduced-motion` media query.

## prefers-reduced-motion

This CSS media query indicates that the user has requested reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable or reduce animations */
}
```

Users can enable this in:
- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **iOS**: Settings → Accessibility → Motion → Reduce Motion
- **Windows**: Settings → Ease of Access → Display → Show animations
- **Android**: Settings → Accessibility → Remove animations

## useReducedMotion

Check the user's motion preference:

```tsx
import { useReducedMotion } from 'motion/react'

function Component() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{
        scale: prefersReducedMotion ? 1 : 1.2,
      }}
    />
  )
}
```

## Patterns

### Disable Animation

```tsx
function AccessibleButton({ children }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
```

### Reduce Animation

Instead of disabling, reduce intensity:

```tsx
function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
      }}
    />
  )
}
```

### Use Opacity Only

Opacity changes are generally safe for motion-sensitive users:

```tsx
function SafeFadeIn() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Only add movement if motion is OK
      {...(!prefersReducedMotion && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      })}
    />
  )
}
```

### Instant Transition

Make transitions instant for reduced motion:

```tsx
function Component() {
  const prefersReducedMotion = useReducedMotion()

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: 'easeOut' }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    />
  )
}
```

## ReducedMotion Component

Create a wrapper component:

```tsx
import { useReducedMotion, motion, AnimatePresence } from 'motion/react'

interface MotionProps {
  children: React.ReactNode
  className?: string
}

function SafeMotion({
  children,
  className,
  initial,
  animate,
  exit,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    // Render without animation
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      exit={exit}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

## Variants with Reduced Motion

Create accessible variants:

```tsx
function useAccessibleVariants(variants) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
      exit: { opacity: 0, transition: { duration: 0 } },
    }
  }

  return variants
}

// Usage
function AnimatedList({ items }) {
  const variants = useAccessibleVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  })

  return (
    <motion.ul initial="hidden" animate="visible">
      {items.map((item) => (
        <motion.li key={item.id} variants={variants}>
          {item.content}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

## Tailwind CSS Integration

Use the `motion-reduce` variant:

```tsx
<motion.div
  className="motion-reduce:transition-none"
  whileHover={{ scale: 1.05 }}
/>
```

### Combined Approach

```tsx
function AccessibleCard() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="motion-reduce:transform-none"
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
    >
      Card content
    </motion.div>
  )
}
```

## Which Animations to Reduce

### Safe (Usually OK)
- Opacity fades
- Color changes
- Border/shadow changes
- Small scale changes (< 10%)

### Potentially Problematic
- Large movements (x, y)
- Zooming/scaling
- Rotation
- Parallax effects
- Auto-playing animations
- Rapid flashing

### Guidelines

| Animation Type | Reduced Motion Behavior |
|----------------|------------------------|
| Page transitions | Instant crossfade |
| Scroll reveals | Instant appearance |
| Hover effects | Disable or opacity only |
| Loading spinners | Static or very slow |
| Parallax | Disable |
| Carousels | No auto-advance |

## Testing

### Browser DevTools

1. Open DevTools
2. Press Cmd/Ctrl + Shift + P
3. Search "Emulate CSS prefers-reduced-motion"
4. Select "reduce"

### macOS

1. System Preferences → Accessibility
2. Display → Reduce motion

### Automated Testing

```tsx
// In tests, mock the hook
jest.mock('motion/react', () => ({
  ...jest.requireActual('motion/react'),
  useReducedMotion: () => true,
}))
```

## WCAG Guidelines

Motion should follow WCAG 2.1 guidelines:

### 2.2.2 Pause, Stop, Hide (Level A)
- Users must be able to pause, stop, or hide moving content
- Auto-playing animations should have controls

### 2.3.1 Three Flashes (Level A)
- Content should not flash more than 3 times per second

### 2.3.3 Animation from Interactions (Level AAA)
- Motion triggered by interaction can be disabled

## Example: Full Accessible Component

```tsx
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function AccessibleModal({ isOpen, onClose, children }: ModalProps) {
  const prefersReducedMotion = useReducedMotion()

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2 }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            role="dialog"
            aria-modal="true"
            className="fixed inset-4 m-auto max-w-md bg-white rounded-lg p-6"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

## Related

- [Animation Basics](../animation/basics.md): Core animations
- [Performance](./performance.md): Optimize animations
- [Base UI Accessibility](../../base-ui/overview/accessibility.md): Component a11y
