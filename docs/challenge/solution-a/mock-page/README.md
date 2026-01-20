# Solution A: Delphi Profile Mock Page

> **Route:** `/a/mock`
> **Status:** View Profile ✅ | Edit Profile ✅

This mock page recreates the Delphi.ai profile flow using custom components. The page supports fluid transitions between view and edit modes.

---

## Architecture Overview

### Interaction Model

The Delphi profile page uses a **single-page fluid transition** model:
- **View Profile** and **Edit Profile** are NOT separate routes
- Content transitions fluidly within the same container
- State toggles between `view` and `edit` modes
- The outer shell (decorative background) remains constant

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │  Decorative Gradient BG    │    │  ← Persists across modes
│  │  ┌───────────────────────┐  │    │
│  │  │                       │  │    │
│  │  │   VIEW or EDIT        │  │    │  ← Content swaps here
│  │  │   (fluid transition)  │  │    │
│  │  │                       │  │    │
│  │  └───────────────────────┘  │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### File Structure

```
src/app/a/
├── mock/
│   └── page.tsx              # Main page with mode state
├── components/
│   ├── view-profile-content.tsx  # View mode display
│   ├── edit-profile-form.tsx     # Edit mode form container
│   ├── form-field.tsx            # Reusable field wrapper with animation
│   ├── text-input.tsx            # Text input + DisabledNameField
│   ├── textarea-field.tsx        # Auto-resizing textarea
│   ├── profile-image.tsx         # 144px squircle with upload overlay
│   ├── questions-list.tsx        # Dynamic pinned questions (max 5)
│   └── social-links.tsx          # URL inputs with domain parsing
└── types.ts                      # TypeScript interfaces (ProfileMode, ProfileFormData)
```

---

## Implementation Status

### ✅ View Profile Mode

| Component | Description |
|-----------|-------------|
| Header actions | Private badge, Share button, Edit button |
| Profile image | Click to enlarge (scale animation) |
| Name | Large heading with responsive font size `clamp(36px, 10vw, 52px)` |
| Organization | Inline text with logo and verified badge |
| Bio | Static paragraph at 18px |
| Questions | Clickable buttons in rounded container |
| Social links | Icon buttons linking out |
| Footer | "Powered by Delphi" text |

### ✅ Edit Profile Mode

| Component | File | Description |
|-----------|------|-------------|
| Form container | `edit-profile-form.tsx` | State management, Cancel/Save buttons |
| Profile image | `profile-image.tsx` | Squircle clip path, hover upload overlay |
| Name field | `text-input.tsx` | Disabled with lock icon, "Contact support" link |
| Organization | `text-input.tsx` | Two side-by-side inputs with logo |
| Headline | `text-input.tsx` | Single input, optional, max 60 chars |
| Bio | `textarea-field.tsx` | Auto-resize, Highlight/Generate Bio actions |
| Questions | `questions-list.tsx` | Dynamic array, remove buttons, max 5 |
| Social links | `social-links.tsx` | URL parsing, domain icons, remove buttons |

---

## Mode Toggle Implementation

The page uses React state to toggle between modes:

```tsx
// In page.tsx
const [mode, setMode] = useState<ProfileMode>('view')

// Render based on mode
{mode === 'view' ? (
  <ViewProfileContent data={PROFILE_DATA} onEdit={() => setMode('edit')} />
) : (
  <EditProfileForm
    initialData={PROFILE_DATA}
    onSave={(data) => { setMode('view') }}
    onCancel={() => setMode('view')}
  />
)}
```

### Mode Transitions

| Action | Result |
|--------|--------|
| Click "Edit" button (view mode) | Switches to edit mode |
| Click "Cancel" button (edit mode) | Returns to view mode |
| Click "Save" button (edit mode) | Saves data and returns to view mode |

---

## Key Styling Patterns

### Input Styling (Edit Mode)

The Delphi input style is distinctive. Use these exact values:

```tsx
// Background
bg-[#fcfaf9]  // Light mode
dark:bg-sand-4  // Dark mode

// Border radius
rounded-[14px]

// Shadow (the key visual element)
shadow-[inset_0_2px_2px_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.05),0_2px_2px_0_rgba(0,0,0,0.05)]

// Focus shadow (adds ring)
focus:shadow-[inset_0_2px_2px_0_rgba(255,255,255,1),0_0_0_2px_var(--color-gray-300),0_2px_2px_0_rgba(0,0,0,0.05)]
```

### View Mode Styling

```tsx
// Name heading
<h1 className="text-[clamp(36px,10vw,52px)] mt-6 mb-3 font-semibold leading-[1.1] -ml-0.5">

// Organization line
<div className="flex items-center gap-2 pb-5 text-md text-[var(--color-gray-600)]">

// Bio section
<p className="text-[18px] leading-relaxed text-[var(--color-gray-900)]/90">

// Questions container
<div className="-ml-5.5 -mr-5.5 mb-8 rounded-none bg-[var(--color-gray-900)]/5 p-6 pb-2 md:rounded-[30px]">

// Question buttons
<button className="rounded-[20px] bg-[var(--color-gray-900)]/5 px-4 py-3">

// Social link icons
<a className="rounded-2xl bg-[var(--color-gray-900)]/5 p-2">
```

### Staggered Animations

Both modes use staggered fade-in animations:

```tsx
<div
  className="animate-in fade-in slide-in-from-bottom-4"
  style={{
    animationDelay: `${index * 60}ms`,  // 0, 60, 120, 180...
    animationDuration: '500ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'backwards',
  }}
>
```

### Profile Image Squircle

The profile image uses a custom SVG clip path:

```tsx
const squircleClipPath = `path('M0 54C0 29.1898...')` // See profile-image.tsx
```

### Decorative Background

```tsx
<div
  className="pointer-events-none absolute ... h-[400px] rounded-[72px] bg-white/50"
  style={{
    boxShadow: '0 4px 200px 0 rgba(0,0,0,0.25), inset 0 4px 4px 0px rgba(255,255,255,1)',
    maskImage: 'linear-gradient(black 0%, transparent 300px)',
  }}
/>
```

---

## Component Differences: View vs Edit

| Element | View Mode | Edit Mode |
|---------|-----------|-----------|
| Header buttons | Private badge, Share, Edit | Cancel, Save |
| Profile image | Click to enlarge (scale animation) | Upload overlay on hover |
| Name | Large heading (36-52px responsive) | Disabled input with lock icon |
| Organization | Inline text with verified badge | Two inputs (name + role) |
| Headline | Part of organization line | Separate input field |
| Bio | Static paragraph | Editable textarea |
| Questions | Clickable buttons (rounded-[20px]) | Editable list with remove buttons |
| Social links | Icon buttons linking out | URL inputs with domain parsing |
| Footer | "Powered by Delphi" | Divider only |

---

## Delphi Theme

The page uses the `.theme-delphi` class applied to `<html>` for warm, earthy colors.

**Theme file:** `src/styles/themes/theme-delphi.css`

Key color transformations:
- Cool gray → Warm brown neutrals
- Pure white → Warm cream (#fdf6ee)
- Purple brand → Orange (#ff5c00)

---

## Testing

Navigate to: `http://localhost:3002/a/mock`

The page:
- Starts in View Profile mode by default
- Applies Delphi theme on mount
- Shows staggered animations on content sections
- Click "Edit" to switch to Edit Profile mode
- Click "Cancel" or "Save" to return to View mode
- Profile image scales on click (view mode) or shows upload overlay (edit mode)

---

## Reference Files

For the original Delphi markup, refer to:

- **View Profile HTML:** `docs/challenge/solution-a/inspected-output/view-profile.md`
- **Edit Profile HTML:** `docs/challenge/solution-a/inspected-output/edit-profile.md`
