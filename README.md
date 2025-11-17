# Design System Demo

A modern UI component library showcase built with Next.js 14, React 19, and Tailwind CSS v4, featuring 200+ semantic design tokens with automatic dark mode support.

## ✨ Features

- **🎨 Semantic Design Tokens** - 200+ design tokens that automatically adapt to light/dark modes
- **⚡ Tailwind CSS v4** - Built with the latest Tailwind using CSS custom properties
- **🌓 Automatic Dark Mode** - No manual `dark:` prefixes needed - tokens remap automatically
- **🔒 Type-Safe** - Fully typed with TypeScript for excellent DX
- **📱 Responsive** - Mobile-first design with smooth interactions
- **🚀 Production Ready** - Optimized and ready for deployment
- **✨ Squircle Components** - Smooth, continuous curves with configurable roundness
- **🎯 HugeIcons Pro** - 4,600+ professional icons (stroke, duotone, solid styles)
- **🎭 SILK Components** - Animation primitives and modal system
- **🎪 Untitled UI Pro** - Premium component library

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Font:** Inter (via Google Fonts)
- **Package Manager:** pnpm
- **Premium Libraries:** HugeIcons Pro, Untitled UI Pro, SILK Components
- **Animation:** Framer Motion
- **Icons:** 4,600+ from HugeIcons Pro

**See [V2-COMPONENTS.md](./V2-COMPONENTS.md) for complete component documentation.**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/fiebsy/skwircle.git
cd skwircle

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check
```

## 📖 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with fonts & theme
│   │   └── page.tsx           # Single minimalist showcase
│   ├── v2/
│   │   ├── components/ui/     # V2 component library
│   │   │   ├── button/        # Squircle button (primary/secondary/tertiary)
│   │   │   ├── badge/         # Squircle badge (icons/dots/colors)
│   │   │   ├── search-input/  # Squircle search input
│   │   │   ├── icon/          # HugeIcon wrapper
│   │   │   └── squircle/      # Squircle primitive
│   │   └── utils/cx.ts        # Class merger
│   ├── components/
│   │   ├── theme-provider.tsx # Theme context
│   │   └── ui/theme-toggle.tsx # Dark mode toggle
│   ├── lib/
│   │   ├── fonts.ts           # Neue Haas Grotesk config
│   │   └── utils.ts           # cn helper
│   └── styles/                # Design system (1,350+ lines)
│       ├── globals.css        # Tailwind v4 + SILK
│       ├── theme.css          # Semantic tokens
│       ├── fonts/             # Neue Haas Grotesk fonts
│       ├── silk/              # SILK styles
│       └── utilities/         # Custom utilities
├── package.json
├── V2-COMPONENTS.md           # Full component docs
└── SETUP.md                   # Deployment guide
```

## 🎨 Design System

### Semantic Design Tokens

The design system uses semantic tokens that automatically adapt to light and dark modes:

**Text Colors:**
```tsx
<p className="text-primary">Primary text</p>
<p className="text-secondary">Secondary text</p>
<p className="text-tertiary">Tertiary text</p>
<p className="text-brand-primary">Brand text</p>
```

**Background Colors:**
```tsx
<div className="bg-primary">Main surface</div>
<div className="bg-secondary">Secondary surface</div>
<div className="bg-brand-solid">Brand button</div>
```

**Border Colors:**
```tsx
<div className="border border-primary">Default border</div>
<div className="border border-brand">Brand border</div>
```

### V2 Components

#### Button (Squircle-based)
```tsx
import { Button } from '@/v2/components/ui/button'
import { Settings01Icon } from '@hugeicons-pro/core-stroke-rounded'

<Button hierarchy="primary">Primary</Button>
<Button hierarchy="secondary">Secondary</Button>
<Button hierarchy="tertiary">Tertiary</Button>

<Button.WithIcon hierarchy="primary" icon={Settings01Icon}>
  With Icon
</Button.WithIcon>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

#### Badge (Squircle-based with HugeIcons)
```tsx
import { Badge } from '@/v2/components/ui/badge'
import { StarIcon } from '@hugeicons-pro/core-stroke-rounded'

<Badge type="pill" color="brand">Pill</Badge>
<Badge type="badge" color="brand">Badge</Badge>
<Badge type="modern" color="brand">Modern</Badge>

<Badge.WithIcon type="modern" color="success" icon={StarIcon}>
  Featured
</Badge.WithIcon>

<Badge.WithDot type="modern" color="gray" dotColor="success" size="sm">
  Active
</Badge.WithDot>
```

#### SearchInput (Squircle-based)
```tsx
import { SearchInput } from '@/v2/components/ui/search-input'

<SearchInput 
  placeholder="Search components..."
  size="md"
/>
```

### Dark Mode

Dark mode is handled automatically via the `ThemeProvider` and `.dark-mode` class:

```tsx
// Toggle theme
import { useTheme } from '@/components/theme-provider'

const { theme, toggleTheme } = useTheme()
toggleTheme() // Switches between light and dark
```

All semantic tokens remap automatically - no `dark:` prefix needed!

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fiebsy/skwircle)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any platform supporting Next.js

## 📝 License

MIT License - feel free to use this design system in your projects!

## 👤 Author

**Derick Fiebiger**
- Design Engineer specializing in payment platforms and user experience

## 🙏 Acknowledgments

- Design system architecture inspired by modern design token patterns
- Built with Tailwind CSS v4 and Next.js 14
- Inter font by Rasmus Andersson

---

**Note:** This is a portfolio/showcase project demonstrating design system principles and semantic design tokens. All code is original and uses open-source dependencies only.

