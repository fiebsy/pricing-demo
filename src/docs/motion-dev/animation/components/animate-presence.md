# AnimatePresence

Enable exit animations when components are removed from the React tree.

## Overview

By default, when a React component unmounts, it's immediately removed from the DOM. `AnimatePresence` keeps components mounted long enough for their exit animations to complete.

## Basic Usage

Wrap conditionally rendered components with `AnimatePresence`:

```tsx
import { motion, AnimatePresence } from 'motion/react'

function Modal({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Modal content
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

The `exit` prop defines the animation that plays before the component unmounts.

## Exit Animations

The `exit` prop accepts the same values as `animate`:

```tsx
// Simple exit
exit={{ opacity: 0 }}

// Combined properties
exit={{ opacity: 0, scale: 0.9, y: -20 }}

// With transition
exit={{
  opacity: 0,
  transition: { duration: 0.2 }
}}
```

## Modes

Control how enter and exit animations interact.

### `mode="sync"` (Default)

Enter and exit animations happen simultaneously:

```tsx
<AnimatePresence mode="sync">
  {items.map((item) => (
    <motion.div key={item.id} exit={{ opacity: 0 }}>
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

### `mode="wait"`

The exiting component completes its animation before the entering component starts:

```tsx
<AnimatePresence mode="wait">
  {currentPage === 'home' ? (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Home
    </motion.div>
  ) : (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      About
    </motion.div>
  )}
</AnimatePresence>
```

Use `mode="wait"` for:
- Page transitions
- Tab content switches
- Any case where you want one element to fully exit before another enters

### `mode="popLayout"`

Exiting elements are removed from the document flow, allowing entering elements to take their position immediately:

```tsx
<AnimatePresence mode="popLayout">
  {notifications.map((notification) => (
    <motion.div
      key={notification.id}
      layout
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {notification.message}
    </motion.div>
  ))}
</AnimatePresence>
```

## Initial Animation

By default, children animate on first render. Disable with `initial={false}`:

```tsx
<AnimatePresence initial={false}>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

Now the component appears immediately on first render but animates on subsequent mounts.

## Callbacks

### `onExitComplete`

Fires when all exiting animations complete:

```tsx
<AnimatePresence onExitComplete={() => console.log('All exits complete')}>
  {isVisible && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

Useful for cleanup or triggering subsequent actions.

## Keys

React's `key` prop is critical for `AnimatePresence` to track components:

```tsx
<AnimatePresence>
  {items.map((item) => (
    <motion.div
      key={item.id}  // Required for proper tracking
      exit={{ opacity: 0 }}
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

### Swapping Components

Use different keys to trigger exit/enter animations:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentTab}  // Changes key triggers exit → enter
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    {tabContent[currentTab]}
  </motion.div>
</AnimatePresence>
```

## With Base UI

Base UI components require special handling for exit animations.

### Unmounting Components (Popover, Menu, Dialog)

```tsx
import { Popover } from '@base-ui/react/popover'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function AnimatedPopover() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>Open</Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  />
                }
              >
                Content
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}
```

Key requirements:
1. **Hoist `open` state** - Control it with `useState`
2. **Add `keepMounted`** - To the Portal component
3. **Conditionally render** - The Portal inside AnimatePresence

### Mounted Components (Select)

For components that stay mounted, use state-driven animation:

```tsx
<Select.Popup
  render={
    <motion.div
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        scale: open ? 1 : 0.95,
      }}
    />
  }
/>
```

## Multiple Exits

Track multiple exiting elements:

```tsx
function NotificationStack({ notifications, onRemove }) {
  return (
    <AnimatePresence>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          onAnimationComplete={(definition) => {
            if (definition === 'exit') {
              // Cleanup after exit animation
            }
          }}
        >
          {notification.message}
          <button onClick={() => onRemove(notification.id)}>
            Dismiss
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
```

## Custom Exit Variants

Use variants for complex exit animations:

```tsx
const variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.15 },
  },
}

<AnimatePresence>
  {isVisible && (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  )}
</AnimatePresence>
```

## Directional Exits

Animate in different directions based on context:

```tsx
function Carousel({ currentIndex, items }) {
  const [direction, setDirection] = useState(0)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {items[currentIndex]}
      </motion.div>
    </AnimatePresence>
  )
}
```

## Related

- [Animation Basics](../basics.md): The `exit` prop
- [Base UI Setup](../../getting-started/base-ui-setup.md): Integration patterns
- [Patterns](../../advanced/patterns.md): Complete component examples
