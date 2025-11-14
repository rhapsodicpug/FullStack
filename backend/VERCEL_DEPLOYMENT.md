# Vercel Deployment Guide for Backend

## Quick Fix for 404 Error

If you're getting a 404 NOT_FOUND error, follow these steps:

### Step 1: Update Vercel Configuration

The backend now uses the `api/index.js` structure which is the recommended way for Vercel serverless functions.

### Step 2: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### Step 3: Redeploy

After adding environment variables, redeploy your project:
- Go to **Deployments** tab
- Click the three dots on the latest deployment
- Select **Redeploy**

## Alternative: Using Vercel CLI

If you prefer using CLI:

```bash
cd backend

# Add environment variables
vercel env add MONGODB_URI
# Paste your MongoDB connection string

vercel env add JWT_SECRET
# Paste your JWT secret

vercel env add NODE_ENV
# Enter: production

# Deploy
vercel --prod
```

## Testing the Deployment

After deployment, test your endpoints:

1. **Health Check:**
   ```
   GET https://your-backend-url.vercel.app/api/health
   ```

2. **Signup:**
   ```
   POST https://your-backend-url.vercel.app/api/auth/signup
   ```

3. **Login:**
   ```
   POST https://your-backend-url.vercel.app/api/auth/login
   ```

## Common Issues

### Issue: 404 NOT_FOUND
**Solution:** Make sure:
- The `api/index.js` file exists
- Environment variables are set in Vercel
- The project is redeployed after changes

### Issue: MongoDB Connection Error
**Solution:** 
- Verify `MONGODB_URI` is set correctly in Vercel
- Check MongoDB Atlas Network Access (allow 0.0.0.0/0)
- Ensure password is URL-encoded if it has special characters

### Issue: CORS Errors
**Solution:** The CORS middleware is already configured to allow all origins. If you need to restrict it, update `server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

## Project Structure for Vercel

```
backend/
├── api/
│   └── index.js          # Vercel serverless entry point
├── routes/
│   └── auth.js           # Auth routes
├── models/
│   └── User.js           # User model
├── middleware/
│   └── auth.js           # Auth middleware
├── server.js             # Express app (imported by api/index.js)
├── package.json
└── vercel.json           # Vercel configuration
```

## Notes

- Vercel automatically handles serverless function routing
- All routes under `/api/*` will be handled by the Express app
- The `api/index.js` file is the entry point for Vercel
- Environment variables must be set in Vercel dashboard, not in `.env` file

