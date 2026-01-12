# Patterns

Animation recipes for Base UI components.

## Overview

This page provides copy-paste animation patterns for common Base UI components. Each pattern follows accessibility best practices and uses Motion's recommended approaches.

## Dialogs & Popups

### Dialog

```tsx
import { Dialog } from '@base-ui/react/dialog'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function AnimatedDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="px-4 py-2 bg-primary text-primary-foreground rounded">
        Open Dialog
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/50"
                />
              }
            />
            <Dialog.Popup
              render={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0.1 }}
                  className="fixed inset-4 m-auto max-w-md max-h-fit bg-white rounded-lg p-6 shadow-xl"
                />
              }
            >
              <Dialog.Title className="text-lg font-semibold">
                Dialog Title
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
                Dialog description goes here.
              </Dialog.Description>
              <Dialog.Close className="mt-4 px-4 py-2 bg-gray-100 rounded">
                Close
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
```

### Popover

```tsx
import { Popover } from '@base-ui/react/popover'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function AnimatedPopover() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="px-3 py-1.5 border rounded">
        Info
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.15 }}
                    style={{ transformOrigin: 'var(--transform-origin)' }}
                    className="p-3 bg-white border rounded-lg shadow-lg"
                  />
                }
              >
                <Popover.Arrow className="fill-white stroke-gray-200" />
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

### Menu with Staggered Items

```tsx
import { Menu } from '@base-ui/react/menu'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      staggerChildren: 0.03,
    },
  },
  exit: { opacity: 0, scale: 0.95, y: -5, transition: { duration: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

function AnimatedMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="px-3 py-1.5 border rounded">
        Actions
      </Menu.Trigger>
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
                    style={{ transformOrigin: 'var(--transform-origin)' }}
                    className="min-w-40 bg-white border rounded-lg shadow-lg py-1"
                  />
                }
              >
                {['Edit', 'Duplicate', 'Archive', 'Delete'].map((item) => (
                  <Menu.Item
                    key={item}
                    render={
                      <motion.div
                        variants={itemVariants}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      />
                    }
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

### Tooltip

```tsx
import { Tooltip } from '@base-ui/react/tooltip'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function AnimatedTooltip({ children, content }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Tooltip.Root open={open} onOpenChange={setOpen} delay={200}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <AnimatePresence>
        {open && (
          <Tooltip.Portal keepMounted>
            <Tooltip.Positioner>
              <Tooltip.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.1 }}
                    className="px-2 py-1 bg-gray-900 text-white text-sm rounded"
                  />
                }
              >
                {content}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        )}
      </AnimatePresence>
    </Tooltip.Root>
  )
}
```

## Form Controls

### Button with Press Feedback

```tsx
import { Button } from '@base-ui/react/button'
import { motion } from 'motion/react'

function AnimatedButton({ children, ...props }) {
  return (
    <Button
      render={
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        />
      }
      {...props}
    >
      {children}
    </Button>
  )
}
```

### Switch with Smooth Thumb

```tsx
import { Switch } from '@base-ui/react/switch'
import { motion } from 'motion/react'
import * as React from 'react'

function AnimatedSwitch() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={setChecked}
      className="relative w-11 h-6 rounded-full bg-gray-200 data-[checked]:bg-primary"
    >
      <Switch.Thumb
        render={
          <motion.span
            animate={{ x: checked ? 20 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="block w-5 h-5 bg-white rounded-full shadow"
          />
        }
      />
    </Switch.Root>
  )
}
```

### Checkbox with Check Animation

```tsx
import { Checkbox } from '@base-ui/react/checkbox'
import { motion } from 'motion/react'
import * as React from 'react'

function AnimatedCheckbox({ label }) {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={setChecked}
      className="flex items-center gap-2"
    >
      <Checkbox.Indicator
        render={
          <motion.div
            animate={{
              backgroundColor: checked ? '#3b82f6' : '#ffffff',
              borderColor: checked ? '#3b82f6' : '#d1d5db',
            }}
            transition={{ duration: 0.15 }}
            className="w-5 h-5 border-2 rounded flex items-center justify-center"
          />
        }
      >
        <motion.svg
          initial={false}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 24 24"
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <motion.path d="M5 12l5 5L20 7" />
        </motion.svg>
      </Checkbox.Indicator>
      <span>{label}</span>
    </Checkbox.Root>
  )
}
```

### Select with Smooth Dropdown

```tsx
import { Select } from '@base-ui/react/select'
import { motion } from 'motion/react'
import * as React from 'react'

function AnimatedSelect({ options }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Select.Root open={open} onOpenChange={setOpen}>
      <Select.Trigger className="px-3 py-2 border rounded-lg flex items-center gap-2">
        <Select.Value placeholder="Select option" />
        <Select.Icon>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup
            render={
              <motion.div
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  y: open ? 0 : -10,
                  scale: open ? 1 : 0.95,
                }}
                transition={{ duration: 0.15 }}
                className="bg-white border rounded-lg shadow-lg py-1 mt-1"
              />
            }
          >
            {options.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <Select.OptionText>{option.label}</Select.OptionText>
              </Select.Option>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
```

## Navigation

### Accordion

```tsx
import { Accordion } from '@base-ui/react/accordion'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function AnimatedAccordion({ items }) {
  return (
    <Accordion.Root className="space-y-2">
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              {item.title}
              <motion.span
                animate={{ rotate: 0 }}
                className="[[data-open]>&]:rotate-180 transition-transform"
              >
                ▼
              </motion.span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel
            render={({ open }) => (
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">{item.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          />
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
```

### Tabs with Sliding Indicator

```tsx
import { Tabs } from '@base-ui/react/tabs'
import { motion } from 'motion/react'
import * as React from 'react'

function AnimatedTabs({ tabs }) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id)

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      <Tabs.List className="relative flex border-b">
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.id}
            value={tab.id}
            className="relative px-4 py-2 text-gray-600 data-[selected]:text-primary"
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.id} value={tab.id}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {tab.content}
          </motion.div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  )
}
```

### Collapsible

```tsx
import { Collapsible } from '@base-ui/react/collapsible'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

function AnimatedCollapsible({ title, children }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger className="flex items-center gap-2 font-medium">
        <motion.span animate={{ rotate: open ? 90 : 0 }}>→</motion.span>
        {title}
      </Collapsible.Trigger>
      <AnimatePresence>
        {open && (
          <Collapsible.Panel
            render={
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              />
            }
          >
            <div className="pt-2 pl-6">{children}</div>
          </Collapsible.Panel>
        )}
      </AnimatePresence>
    </Collapsible.Root>
  )
}
```

## Utility: Animation Wrapper

Create reusable animation wrappers:

```tsx
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import * as React from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PopupAnimationProps {
  open: boolean
  children: React.ReactNode
}

function PopupAnimation({ open, children }: PopupAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.95,
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.95,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

## Related

- [Base UI Setup](../getting-started/base-ui-setup.md): Integration basics
- [AnimatePresence](../animation/components/animate-presence.md): Exit animations
- [Accessibility](./accessibility.md): Reduced motion support
