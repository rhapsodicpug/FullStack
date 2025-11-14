# Vercel 404 Fix - Step by Step

## Critical Settings to Verify

### 1. Root Directory (MOST IMPORTANT)

In Vercel Dashboard → Your Project → Settings → General:

**Root Directory MUST be set to:** `backend`

If it's empty, `/`, or anything else, change it to `backend` and redeploy.

### 2. Verify File Structure

Your backend folder should have:
```
backend/
├── api/
│   └── index.js          ← This file MUST exist
├── server.js
├── package.json
└── vercel.json
```

### 3. Test the Deployment

After setting Root Directory to `backend` and redeploying, test:

1. **Root endpoint:**
   ```
   https://your-app.vercel.app/
   ```
   Should return: `{"status":"OK","message":"Backend API is running"}`

2. **Health check:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

3. **Signup endpoint:**
   ```
   POST https://your-app.vercel.app/api/auth/signup
   ```

## If Still Getting 404

### Check Deployment Logs

1. Go to **Deployments** → Latest deployment
2. Click on it to view details
3. Check **Function Logs** tab
4. Look for errors or warnings

### Alternative: Use Vercel CLI to Test Locally

```bash
cd backend
npm install -g vercel
vercel dev
```

This will show you exactly what Vercel sees and help identify the issue.

### Verify Environment Variables

In Vercel → Settings → Environment Variables, ensure:
- `MONGODB_URI` is set
- `JWT_SECRET` is set  
- `NODE_ENV=production` is set

## Common Issues

### Issue: Root Directory not set
**Symptom:** Build completes in <1 second, 404 on all routes
**Fix:** Set Root Directory to `backend` in Vercel settings

### Issue: api/index.js not found
**Symptom:** Build logs show "Function not found"
**Fix:** Verify `backend/api/index.js` exists and is committed to git

### Issue: Routes not working
**Symptom:** Root works but `/api/auth/*` returns 404
**Fix:** Check that routes are defined in `server.js`

## Quick Verification Commands

```bash
# Verify file exists
cd backend
ls -la api/index.js

# Verify it exports correctly
node -e "import('./api/index.js').then(m => console.log('Export:', typeof m.default))"

# Check git has the file
git ls-files | grep api/index.js
```

