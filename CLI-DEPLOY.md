# 🚀 Vercel CLI Deployment Guide

## Quick Deploy Steps

### 1. Set Environment Variables

You need to add your auth tokens. Run these commands (you'll be prompted to enter the token values):

```bash
# Add UntitledUI token (for Production, Preview, Development)
vercel env add UNTITLEDUI_AUTH_TOKEN production
vercel env add UNTITLEDUI_AUTH_TOKEN preview
vercel env add UNTITLEDUI_AUTH_TOKEN development

# Add HugeIcons token (for Production, Preview, Development)
vercel env add HUGEICONS_AUTH_TOKEN production
vercel env add HUGEICONS_AUTH_TOKEN preview
vercel env add HUGEICONS_AUTH_TOKEN development
```

**Or add to all environments at once:**
```bash
vercel env add UNTITLEDUI_AUTH_TOKEN
vercel env add HUGEICONS_AUTH_TOKEN
```

### 2. Deploy

```bash
# Preview deployment (creates a preview URL)
vercel

# Production deployment (deploys to your main domain)
vercel --prod
```

### 3. Verify Environment Variables

```bash
# List all environment variables
vercel env ls
```

## Alternative: Set Env Vars from File

If you have a `.env.local` file with your tokens:

```bash
# Pull env vars from .env.local
vercel env pull .env.local
```

Then add them:
```bash
vercel env add UNTITLEDUI_AUTH_TOKEN < .env.local
```

## Troubleshooting

- **401 Error**: Make sure env vars are set for all environments
- **Build fails**: Check `vercel logs` for detailed error messages
- **Wrong project**: Use `vercel link` to link to the correct project



