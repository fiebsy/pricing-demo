# 🚀 Vercel Deployment Guide

## Prerequisites

- GitHub repository with your code pushed
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Access to your UntitledUI Pro and HugeIcons Pro auth tokens

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "chore: add Vercel configuration"
git push origin main
```

### 2. Import Project in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository (`derick-design-system-demo`)
4. Click **"Import"**

### 3. Configure Environment Variables ⚠️ CRITICAL STEP

**🚨 MUST DO THIS FIRST:** Your project uses private npm registries. The build will fail with a 401 error if these are not set!

1. **Before deploying**, go to your Vercel project → **Settings → Environment Variables**
2. Add these two variables (get tokens from UntitledUI and HugeIcons dashboards):

   ```
   Name: UNTITLEDUI_AUTH_TOKEN
   Value: [paste your UntitledUI Pro auth token]
   
   Name: HUGEICONS_AUTH_TOKEN  
   Value: [paste your HugeIcons Pro auth token]
   ```

3. **IMPORTANT:** Check all three environment checkboxes:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

4. Click **"Save"** for each variable

**💡 Tip:** If you don't have tokens, get them from:
- UntitledUI: https://pkg.untitledui.com (your account settings)
- HugeIcons: https://hugeicons.com (your account settings)

### 4. Configure Build Settings

Vercel should auto-detect Next.js, but verify these settings in **Settings → General**:

- **Framework Preset:** Next.js
- **Build Command:** `pnpm build` (or leave auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `pnpm install` (or leave auto-detected)
- **Node.js Version:** 20.x (configured in `vercel.json`)

### 5. `.npmrc` Auto-Generation ✅

**Already configured!** The project includes a `preinstall` script that automatically generates `.npmrc` from environment variables before `pnpm install` runs. No additional setup needed - just make sure the environment variables from Step 3 are set correctly.

### 6. Deploy!

1. Click **"Deploy"** in Vercel dashboard
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at `your-project.vercel.app`

## Troubleshooting

### Build Fails: "Cannot find module"

- **Check:** Environment variables are set correctly
- **Check:** `.npmrc` file is accessible during build
- **Solution:** Use Option B above to generate `.npmrc` from env vars

### Build Fails: "Node version mismatch"

- **Check:** `vercel.json` specifies `nodeVersion: "20.x"`
- **Solution:** Vercel should use Node 20 automatically

### Private Registry Authentication Fails

- **Check:** Auth tokens are correct and not expired
- **Check:** Tokens are set for all environments (Production, Preview, Development)
- **Solution:** Regenerate tokens from UntitledUI/HugeIcons dashboards

## Post-Deployment

- ✅ Your site is live!
- ✅ Every push to `main` auto-deploys
- ✅ Preview deployments for PRs
- ✅ Custom domain can be added in Settings → Domains

## Quick Deploy Command (Alternative)

If you have Vercel CLI installed:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add UNTITLEDUI_AUTH_TOKEN
vercel env add HUGEICONS_AUTH_TOKEN

# Deploy to production
vercel --prod
```

---

**Next Step:** After deployment, test your site and verify all components load correctly!

