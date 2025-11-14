# FullStack Role-Based Authentication Application

A full-stack web application with role-based authentication (User/Admin) built with Next.js, Express, MongoDB, and JWT.

## Features

-  Role-based signup/login (User or Admin)
-  Secure password storage using bcrypt
-  JWT-based authentication
-  Protected dashboard routes
-  Role-specific dashboard headers
-  Form validation with Zod
-  Modern UI with TailwindCSS

## Tech Stack

### Backend
- **Node.js** with Express
- **MongoDB** (MongoDB Atlas)
- **bcryptjs** for password hashing
- **JWT** for authentication
- **Mongoose** for database operations

### Frontend
- **Next.js 16** with TypeScript
- **TailwindCSS** for styling
- **React Hook Form** for form handling
- **Zod** for form validation
- **Axios** for API calls

## Project Structure

```
FullStack/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── app/
│   │   ├── signup/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── api.ts
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

4. Get your MongoDB Atlas connection string:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with your database name (e.g., `authapp`)

5. Generate a secure JWT secret (you can use any random string):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

6. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "User"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### GET `/api/auth/me`
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

## Deployment

### Backend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to backend directory and deploy:
```bash
cd backend
vercel
```

3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key

4. Update the frontend `.env.local` with your backend URL:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```

### Frontend Deployment (Vercel)

1. Push your code to GitHub

2. Import your repository in [Vercel](https://vercel.com)

3. Set the root directory to `frontend`

4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL

5. Deploy!

## Usage

1. Visit the home page
2. Click "Sign Up" to create a new account
3. Select a role (User or Admin)
4. Fill in your details and submit
5. You'll be redirected to the dashboard
6. The dashboard shows "Welcome, [Name] (Role)"
7. Click "Logout" to sign out

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Protected routes on the frontend
- Token validation middleware on the backend
- CORS enabled for cross-origin requests

## License

MIT

