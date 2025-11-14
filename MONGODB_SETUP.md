# MongoDB Atlas Password Setup Guide

## Understanding the MongoDB Connection String

The MongoDB connection string looks like this:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Important:** The `<password>` is a PLACEHOLDER - you need to replace it with your actual password!

## Where to Get/Create Your Password

### Option 1: If You Already Created a Database User

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Click on **"Database Access"** in the left sidebar
4. You'll see a list of database users
5. **Note:** MongoDB Atlas does NOT show you the password after creation (for security)
6. If you forgot your password, you need to reset it (see Option 2)

### Option 2: Create a New Database User (Recommended if you forgot password)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click on **"Database Access"** in the left sidebar
3. Click **"Add New Database User"** button
4. Choose authentication method: **"Password"**
5. Enter:
   - **Username:** (e.g., `myappuser` or `admin`)
   - **Password:** Click "Autogenerate Secure Password" OR create your own
   - **⚠️ IMPORTANT:** Copy the password immediately! MongoDB won't show it again!
6. Set user privileges: **"Atlas Admin"** (or "Read and write to any database")
7. Click **"Add User"**

### Option 3: Reset Password for Existing User

1. Go to **"Database Access"**
2. Find your user in the list
3. Click the **"Edit"** button (pencil icon)
4. Click **"Edit Password"**
5. Enter a new password (or use "Autogenerate Secure Password")
6. **⚠️ Copy the password immediately!**
7. Click **"Update User"**

## Step-by-Step: Getting Your Connection String

1. **Create/Verify Database User** (steps above)

2. **Get Connection String:**
   - Go to **"Database"** in MongoDB Atlas
   - Click **"Connect"** button on your cluster
   - Choose **"Connect your application"**
   - Select **"Node.js"** and version (any version works)
   - Copy the connection string

3. **Replace the Placeholders:**
   ```
   Original: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   
   Replace:
   - <username> → Your database username (e.g., myappuser)
   - <password> → Your database password (e.g., MySecurePass123)
   
   Result: mongodb+srv://myappuser:MySecurePass123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Add Database Name:**
   Add your database name before the `?`:
   ```
   mongodb+srv://myappuser:MySecurePass123@cluster0.xxxxx.mongodb.net/authapp?retryWrites=true&w=majority
   ```

5. **URL-Encode Special Characters (if needed):**
   If your password has special characters, encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `:` → `%3A`
   - `/` → `%2F`
   - `?` → `%3F`
   - `&` → `%26`
   - `=` → `%3D`

## Example: Complete Setup

### Step 1: Create User in MongoDB Atlas
- Username: `appuser`
- Password: `MyPassword123!` (you create this)
- Role: Atlas Admin

### Step 2: Get Connection String
```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

### Step 3: Replace Placeholders
Since password has `!`, we need to URL-encode it to `%21`:
```
mongodb+srv://appuser:MyPassword123%21@cluster0.abc123.mongodb.net/authapp?retryWrites=true&w=majority
```

### Step 4: Add to .env file
```env
MONGODB_URI=mongodb+srv://appuser:MyPassword123%21@cluster0.abc123.mongodb.net/authapp?retryWrites=true&w=majority
```

## Quick Tips

✅ **DO:**
- Use a strong password
- Save your password in a password manager
- URL-encode special characters in passwords
- Add a database name to the connection string

❌ **DON'T:**
- Share your password publicly
- Commit passwords to Git
- Use the literal text `<password>` in your connection string
- Forget to replace the placeholders

## Troubleshooting

**"I forgot my password"**
→ Create a new database user or reset the password (see Option 2/3 above)

**"Authentication failed"**
→ Double-check:
- Username is correct
- Password is correct (and URL-encoded if needed)
- You replaced `<password>` with actual password
- Database user exists and is active

**"Connection timeout"**
→ Check Network Access in MongoDB Atlas - add your IP address or allow from anywhere (0.0.0.0/0)

