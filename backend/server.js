import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://stupendous-gumdrop-727a63.netlify.app',
  'https://full-stack-git-main-rhapsodicpugs-projects.vercel.app',
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : [])
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Check if origin matches Vercel pattern
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    
    // Check if origin matches Netlify pattern
    if (/^https:\/\/.*\.netlify\.app$/.test(origin)) {
      return callback(null, true);
    }
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Root route (must be before other routes)
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected to MongoDB successfully');
    } else {
      console.error('MONGODB_URI is not defined in environment variables');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Common fixes:');
      console.error('1. Check your username and password in the connection string');
      console.error('2. If password has special characters, URL-encode them (e.g., @ becomes %40)');
      console.error('3. Verify the database user exists in MongoDB Atlas');
      console.error('4. Make sure you replaced <password> with your actual password');
    }
  }
};

// Connect to MongoDB (for both local and serverless)
connectDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;

