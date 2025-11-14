# Deploy Frontend to Netlify

## Step 1: Fix Git Submodule Issue

The frontend submodule issue has been fixed. The frontend files are now added directly to the repository.

## Step 2: Deploy to Netlify

### Option A: Using Netlify Dashboard (Recommended)

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your repository: `rhapsodicpug/FullStack`
6. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
7. Click **"Show advanced"** and add environment variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://full-stack-pearl-omega.vercel.app/api`
8. Click **"Deploy site"**

### Option B: Using Netlify CLI

```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
# Follow the prompts:
# - Create & configure a new site
# - Team: Your team
# - Site name: (press enter for random name)
# - Build command: npm run build
# - Directory to deploy: .next
# - Netlify functions folder: (press enter)
# - Path to redirects file: (press enter)

# Add environment variable
netlify env:set NEXT_PUBLIC_API_URL https://full-stack-pearl-omega.vercel.app/api

# Deploy
netlify deploy --prod
```

## Step 3: Verify Deployment

After deployment, you'll get a URL like:
```
https://your-site-name.netlify.app
```

Test your frontend:
- Visit the URL
- Try signing up
- Try logging in
- Check if it connects to your backend

## Environment Variables in Netlify

Make sure to set:
- `NEXT_PUBLIC_API_URL` = `https://full-stack-pearl-omega.vercel.app/api`

## Troubleshooting

### Issue: Build fails
- Check build logs in Netlify dashboard
- Verify `package.json` has all dependencies
- Make sure Node.js version is 18+

### Issue: API calls fail
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for CORS errors
- Verify backend URL is accessible

### Issue: 404 on routes
- Next.js needs proper configuration for SPA routing
- The `netlify.toml` file should handle this

## Notes

- Netlify automatically detects Next.js and uses the correct build settings
- The `netlify.toml` file is already configured
- Your frontend will be deployed at a Netlify URL
- Backend remains on Vercel at: `https://full-stack-pearl-omega.vercel.app`

