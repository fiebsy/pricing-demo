# Base UI Setup

Integrate Motion with Base UI components using the `render` prop pattern.

## Overview

Base UI components render and control their own DOM elements by default. However, most components provide a `render` prop that allows you to switch to a `motion` component, enabling animations.

## Basic Integration

Use the `render` prop to replace the default element with a motion component:

```tsx
import { Menu } from '@base-ui/react/menu'
import { motion } from 'motion/react'

function AnimatedMenuTrigger() {
  return (
    <Menu.Trigger
      render={
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      }
    >
      Open Menu
    </Menu.Trigger>
  )
}
```

## Exit Animations

For components that unmount when closed, use `AnimatePresence` with the `exit` prop.

### Pattern for Unmounting Components

Most Base UI popups (Dialog, Popover, Menu) are removed from the DOM when closed. To animate them:

1. **Hoist the `open` state** with `useState`
2. **Add `keepMounted`** to the Portal component
3. **Wrap with `AnimatePresence`** and conditionally render

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
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2 }}
                  />
                }
              >
                Popover content
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}
```

### Pattern for Mounted Components

Some components like `Select` must stay in the DOM even when closed. Use state-based animation instead:

```tsx
import { Select } from '@base-ui/react/select'
import { motion } from 'motion/react'
import * as React from 'react'

function AnimatedSelect() {
  const [open, setOpen] = React.useState(false)

  return (
    <Select.Root open={open} onOpenChange={setOpen}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup
            render={
              <motion.div
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  scale: open ? 1 : 0.95,
                  y: open ? 0 : -10,
                }}
                transition={{ duration: 0.15 }}
              />
            }
          >
            {/* Select options */}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
```

**Important**: Set `initial={false}` to prevent animation on first render.

## Exit Animation Detection

Base UI uses `element.getAnimations()` to detect when animations complete before unmounting. Motion runs `opacity`, `transform`, `filter`, and `clipPath` animations via hardware acceleration.

**Always animate at least one of these properties** for exit animations:

```tsx
// Good - opacity is animated
exit={{ opacity: 0, scale: 0.9 }}

// Good - even if opacity shouldn't change visually
exit={{ opacity: 0.9999, y: -10 }}

// Won't work - no animatable property for detection
exit={{ visibility: 'hidden' }}
```

## Manual Unmounting

For full control, use `actionsRef` to manually unmount after animations:

```tsx
import { Popover } from '@base-ui/react/popover'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function ManualUnmount() {
  const [open, setOpen] = React.useState(false)
  const actionsRef = React.useRef({ unmount: () => {} })

  return (
    <Popover.Root
      open={open}
      onOpenChange={setOpen}
      actionsRef={actionsRef}
    >
      <Popover.Trigger>Open</Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    onAnimationComplete={() => {
                      if (!open) {
                        actionsRef.current.unmount()
                      }
                    }}
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

## Component Examples

### Dialog

```tsx
function AnimatedDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50"
                />
              }
            />
            <Dialog.Popup
              render={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                />
              }
            >
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Content here</Dialog.Description>
            </Dialog.Popup>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
```

### Menu with Staggered Items

```tsx
const menuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: -10 },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

function AnimatedMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger>Menu</Menu.Trigger>
      <AnimatePresence>
        {open && (
          <Menu.Portal keepMounted>
            <Menu.Positioner>
              <Menu.Popup
                render={
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                }
              >
                {['Edit', 'Duplicate', 'Delete'].map((item) => (
                  <Menu.Item
                    key={item}
                    render={<motion.div variants={itemVariants} />}
                  >
                    {item}
                  </Menu.Item>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  )
}
```

## Transform Origin

Use the `--transform-origin` CSS variable provided by Base UI for natural scaling:

```tsx
<Popover.Popup
  render={
    <motion.div
      style={{ transformOrigin: 'var(--transform-origin)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    />
  }
>
```

## Related

- [AnimatePresence](../animation/components/animate-presence.md): Deep dive into exit animations
- [Patterns](../advanced/patterns.md): More Base UI animation recipes
- [Base UI Animation Guide](../../base-ui/handbook/animation.md): CSS-based alternatives
