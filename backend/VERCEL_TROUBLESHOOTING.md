# Vercel 404 Error Troubleshooting

## If you're still getting 404 after the latest fix:

### Option 1: Check Vercel Project Settings

1. Go to your Vercel project dashboard
2. Check **Settings** → **General**:
   - **Root Directory**: Should be `backend` (not empty or `/`)
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### Option 2: Alternative Vercel Configuration

If the current setup doesn't work, try this alternative `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

### Option 3: Use Individual API Routes (Most Reliable)

Create individual serverless functions for each route:

1. Create `api/auth/signup.js`:
```javascript
import app from '../../server.js';
export default app;
```

2. Create `api/auth/login.js`:
```javascript
import app from '../../server.js';
export default app;
```

3. Create `api/auth/me.js`:
```javascript
import app from '../../server.js';
export default app;
```

4. Update `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ]
}
```

### Option 4: Check Environment Variables

Make sure these are set in Vercel:
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

### Option 5: Check Deployment Logs

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check **Build Logs** and **Function Logs** for errors

### Option 6: Test Locally with Vercel CLI

```bash
cd backend
npm install -g vercel
vercel dev
```

This will run your app locally and help identify issues.

### Option 7: Verify File Structure

Make sure your backend folder structure is:
```
backend/
├── api/
│   └── index.js
├── routes/
│   └── auth.js
├── models/
│   └── User.js
├── middleware/
│   └── auth.js
├── server.js
├── package.json
└── vercel.json
```

### Common Issues:

1. **404 on all routes**: 
   - Check if `api/index.js` exists
   - Verify `vercel.json` routes configuration
   - Check Root Directory in Vercel settings

2. **404 on specific routes**:
   - Check if routes are defined in `server.js`
   - Verify route paths match (e.g., `/api/auth/signup`)

3. **Build succeeds but 404**:
   - Check Function Logs in Vercel dashboard
   - Verify environment variables are set
   - Check if MongoDB connection is working

### Quick Test:

After deployment, test these URLs:
- `https://your-app.vercel.app/` (should return JSON)
- `https://your-app.vercel.app/api/health` (should return JSON)
- `https://your-app.vercel.app/api/auth/signup` (POST request)

If all return 404, the routing configuration is wrong.
If some work and others don't, it's a route-specific issue.

