# Setup Guide - Design System Demo

## 🚀 Quick Start for GitHub & Vercel

### 1. Upgrade Node.js (Required)

Your current Node.js version (18.20.8) is too old for Next.js 16. You need Node 20.9.0 or higher.

```bash
# Using nvm (recommended)
cd /Users/derickfiebiger/Payva-Repos/derick-design-system-demo
nvm use  # Will automatically use Node 20.9.0 from .nvmrc

# Or install Node 20+ manually from https://nodejs.org
```

### 2. Test the Build

```bash
cd /Users/derickfiebiger/Payva-Repos/derick-design-system-demo
pnpm build
```

If successful, you'll see a production build ready to deploy!

### 3. Create GitHub Repository

```bash
# Create a new public repo on GitHub (via web or CLI)
gh repo create derick-design-system-demo --public --source=. --remote=origin

# Or manually:
# 1. Go to https://github.com/new
# 2. Create repository named: derick-design-system-demo
# 3. Set to PUBLIC
# 4. DON'T initialize with README (we already have one)

# Then push
git remote add origin https://github.com/YOUR_USERNAME/derick-design-system-demo.git
git branch -M main
git push -u origin main
```

### 4. Deploy to Vercel

**Option A: Via Web (Easiest)**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js and configure everything
4. Click "Deploy"
5. Done! 🎉

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/derickfiebiger/Payva-Repos/derick-design-system-demo
vercel --prod
```

### 5. Update README

Once deployed, update the README.md to include your actual GitHub username and Vercel URL:

```bash
# Replace placeholders in README.md:
# - yourusername → your actual GitHub username
# - Add your Vercel deployment URL
```

## 📁 What's Included

### ✅ Design System
- **theme.css** - 1,350+ lines of semantic design tokens (adapted from PAYVA)
- **utilities/** - Custom Tailwind utilities for semantic tokens
- **Free fonts** - Uses Inter font instead of proprietary Neue Haas Grotesk

### ✅ UI Components
- **Button** - 5 variants, 3 sizes, semantic token colors
- **Badge** - 7 color variants, status indicators
- **Card** - Composable card components with header, content, footer
- **ThemeToggle** - Automatic dark mode switching

### ✅ Pages
- **/** - Landing page with features grid
- **/components** - Interactive component showcase

### ✅ Configuration
- Next.js 16 with App Router
- TypeScript strict mode
- Tailwind v4
- Vercel-ready configuration

## 🎨 Design System Features

All components use **semantic design tokens** that automatically adapt to light/dark modes:

```tsx
// No dark: prefix needed!
<div className="text-primary bg-primary border-primary">
  Automatically adapts to theme
</div>
```

**200+ semantic tokens:**
- Text: `text-primary`, `text-secondary`, `text-tertiary`, `text-brand-primary`
- Backgrounds: `bg-primary`, `bg-secondary`, `bg-brand-solid`
- Borders: `border-primary`, `border-secondary`, `border-brand`
- Utility colors: `--color-utility-blue-500`, etc.

## 🔍 Local Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Notes

- Includes v2 components with full design system implementation
- **Premium Dependencies Included:**
  - HugeIcons Pro (requires authentication via .npmrc)
  - Untitled UI Pro (requires authentication via .npmrc)
  - SILK Components (@silk-hq/components)
- No proprietary PAYVA business logic included
- Authentication tokens in .npmrc are for package access only
- Perfect for portfolio/showcase purposes
- Design tokens demonstrate modern CSS custom property patterns

## 🐛 Troubleshooting

**Build fails with Node version error:**
```bash
nvm use
# or upgrade to Node 20+
```

**Dependencies not installing:**
```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

**Dark mode not working:**
- Check browser console for errors
- Make sure localStorage is enabled

## 🚀 Next Steps

1. ✅ Upgrade Node.js to 20+
2. ✅ Test build locally
3. ✅ Push to GitHub
4. ✅ Deploy to Vercel
5. ✅ Share your design system!

---

**Ready to share your work? Let's get it deployed! 🎉**

