# Avatar

A high-quality, unstyled React avatar component that is easy to customize.

## Overview

The Avatar displays user profile pictures, initials, or fallback content.

## Basic Usage

```tsx
import { Avatar } from '@base-ui/react/avatar';

<Avatar.Root>
  <Avatar.Image src="/profile.jpg" alt="User Name" />
  <Avatar.Fallback>UN</Avatar.Fallback>
</Avatar.Root>
```

## Core Components

| Component | Element | Purpose |
|-----------|---------|---------|
| `Avatar.Root` | `<span>` | Container element |
| `Avatar.Image` | `<img>` | Profile picture |
| `Avatar.Fallback` | `<span>` | Initials or alternative |

## Key Props

### Root
| Prop | Type | Purpose |
|------|------|---------|
| `className` | string \| function | Static or state-based classes |
| `style` | object \| function | Static or dynamic styles |
| `render` | element | Custom element |

### Image
| Prop | Type | Purpose |
|------|------|---------|
| `onLoadingStatusChange` | function | Loading status callback |
| `src` | string | Image source |
| `alt` | string | Alt text |

### Fallback
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `delay` | number | 0 | Delay before showing (ms) |

## Fallback Delay

Show fallback only after a delay (useful for slow-loading images):

```tsx
<Avatar.Root>
  <Avatar.Image src="/profile.jpg" />
  <Avatar.Fallback delay={500}>UN</Avatar.Fallback>
</Avatar.Root>
```

## Loading Status

Track image loading:

```tsx
<Avatar.Image
  src="/profile.jpg"
  onLoadingStatusChange={(status) => {
    // 'idle' | 'loading' | 'loaded' | 'error'
    console.log(status);
  }}
/>
```

## Styling Example

```tsx
<Avatar.Root className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
  <Avatar.Image className="aspect-square size-full" />
  <Avatar.Fallback className="flex size-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-600">
    UN
  </Avatar.Fallback>
</Avatar.Root>
```

## With Icon Fallback

```tsx
<Avatar.Root>
  <Avatar.Image src={user.avatar} alt={user.name} />
  <Avatar.Fallback>
    <UserIcon className="size-5" />
  </Avatar.Fallback>
</Avatar.Root>
```

## Avatar Group

```tsx
<div className="flex -space-x-2">
  <Avatar.Root className="ring-2 ring-white">
    <Avatar.Image src="/user1.jpg" />
  </Avatar.Root>
  <Avatar.Root className="ring-2 ring-white">
    <Avatar.Image src="/user2.jpg" />
  </Avatar.Root>
  <Avatar.Root className="ring-2 ring-white">
    <Avatar.Fallback>+3</Avatar.Fallback>
  </Avatar.Root>
</div>
```
