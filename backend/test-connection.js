import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

console.log('Testing MongoDB connection...');
console.log('Username:', uri.match(/mongodb\+srv:\/\/([^:]+):/)?.[1] || 'Not found');
console.log('Password length:', uri.match(/mongodb\+srv:\/\/[^:]+:([^@]+)@/)?.[1]?.length || 0, 'characters');

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n🔍 Troubleshooting steps:');
      console.error('1. Go to MongoDB Atlas → Database Access');
      console.error('2. Verify the username "no_topur" exists');
      console.error('3. Check if the password is correct');
      console.error('4. If unsure, reset the password:');
      console.error('   - Click "Edit" on the user');
      console.error('   - Click "Edit Password"');
      console.error('   - Set a new password (copy it!)');
      console.error('   - Update your .env file with the new password');
      console.error('\n5. Also check Network Access:');
      console.error('   - Go to Network Access');
      console.error('   - Make sure your IP is whitelisted or allow 0.0.0.0/0');
    }
    
    process.exit(1);
  });

