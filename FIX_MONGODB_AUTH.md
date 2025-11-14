# Fix MongoDB Authentication Error

## Quick Fix: Create a New Database User

The easiest way to fix this is to create a NEW database user with a simple password (no special characters).

### Step 1: Go to MongoDB Atlas

1. Open [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account

### Step 2: Create a New Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"** button
3. Fill in:
   - **Authentication Method:** Password
   - **Username:** `appuser` (or any name you like)
   - **Password:** Click **"Autogenerate Secure Password"** OR create a simple one like `MyPassword123` (NO special characters!)
   - **⚠️ IMPORTANT:** Copy the password immediately! You won't see it again!
4. **Database User Privileges:** Select **"Atlas Admin"**
5. Click **"Add User"**

### Step 3: Update Your .env File

1. Open `backend/.env` file
2. Replace the MONGODB_URI line with your new credentials

**If password has NO special characters:**
```env
MONGODB_URI=mongodb+srv://appuser:MyPassword123@cluster0.fn0mamb.mongodb.net/authapp?retryWrites=true&w=majority&appName=Cluster0
```

**If password has special characters, URL-encode them:**
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- etc.

Example: If password is `Pass@123`, use `Pass%40123`

### Step 4: Check Network Access

1. In MongoDB Atlas, click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - OR add your specific IP address
4. Click **"Confirm"**

### Step 5: Test the Connection

```bash
cd backend
node test-connection.js
```

You should see: `✅ SUCCESS! Connected to MongoDB`

### Step 6: Restart Your Server

```bash
npm run dev
```

## Alternative: Reset Existing User Password

If you want to keep using the same username:

1. Go to **"Database Access"**
2. Find user **"no_topur"**
3. Click the **"Edit"** button (pencil icon)
4. Click **"Edit Password"**
5. Enter a NEW password (or use "Autogenerate Secure Password")
6. **Copy the password immediately!**
7. Click **"Update User"**
8. Update your `.env` file with the new password

## Common Issues

### Issue: Password has special characters
**Solution:** URL-encode special characters in the connection string

### Issue: "Authentication failed"
**Solution:** 
- Double-check username and password match exactly
- Make sure you replaced `<password>` placeholder
- Verify the user exists in MongoDB Atlas

### Issue: "Connection timeout"
**Solution:** 
- Check Network Access - add your IP or allow 0.0.0.0/0
- Make sure your cluster is running

## Example .env File

```env
PORT=5000
MONGODB_URI=mongodb+srv://appuser:SimplePassword123@cluster0.fn0mamb.mongodb.net/authapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=a14b6776b33a7a13a6994f91b008d52de8913d5f20dd78c177858d93350a777c
NODE_ENV=development
```

Replace:
- `appuser` → Your actual username
- `SimplePassword123` → Your actual password (URL-encoded if needed)
- `cluster0.fn0mamb.mongodb.net` → Your actual cluster hostname

