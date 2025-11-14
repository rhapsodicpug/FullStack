# Deployment Guide

This guide will help you deploy both the backend and frontend to Vercel.

## Prerequisites

1. GitHub account
2. Vercel account (free tier works)
3. MongoDB Atlas account (free tier works)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier M0)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
5. Whitelist your IP:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel deployment) or add specific IPs
6. Get your connection string:
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with your database name (e.g., `authapp`)

## Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to backend directory:
```bash
cd backend
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Add environment variables:
```bash
vercel env add MONGODB_URI
# Paste your MongoDB connection string when prompted

vercel env add JWT_SECRET
# Enter a secure random string (you can generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

vercel env add NODE_ENV
# Enter: production
```

6. Redeploy to apply environment variables:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your repository
5. Set the root directory to `backend`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: `production`
7. Click "Deploy"
8. Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your repository (same one or different)
4. Set the root directory to `frontend`
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://your-backend.vercel.app/api`)
6. Click "Deploy"
7. Copy the deployment URL (e.g., `https://your-frontend.vercel.app`)

## Step 4: Update Backend CORS (if needed)

If you encounter CORS issues, you may need to update the backend CORS configuration to allow your frontend domain.

In `backend/server.js`, update the CORS configuration:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Then add `FRONTEND_URL` to your Vercel environment variables.

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Try signing up with a new account
3. Select a role (User or Admin)
4. Login and verify the dashboard shows correctly
5. Test logout functionality

## Troubleshooting

### Backend Issues

- **MongoDB Connection Error**: Verify your connection string and that your IP is whitelisted
- **JWT Errors**: Make sure JWT_SECRET is set in environment variables
- **CORS Errors**: Update CORS configuration to include your frontend URL

### Frontend Issues

- **API Calls Failing**: Verify `NEXT_PUBLIC_API_URL` is set correctly
- **Authentication Not Working**: Check that the backend URL is correct and accessible
- **Build Errors**: Check the build logs in Vercel dashboard

## Environment Variables Summary

### Backend (.env in Vercel)
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: `production`
- `FRONTEND_URL`: (Optional) Frontend URL for CORS

### Frontend (.env in Vercel)
- `NEXT_PUBLIC_API_URL`: Backend API URL (e.g., `https://your-backend.vercel.app/api`)

## Notes

- Vercel provides free SSL certificates automatically
- Both frontend and backend will have their own URLs
- Environment variables are encrypted and secure
- You can update environment variables anytime and redeploy

