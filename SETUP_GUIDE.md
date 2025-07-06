# 🚀 MongoDB + Google OAuth Setup Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Cloud Console account
- Git

## 🛠️ Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database - Choose one option:

# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/loginapp

# Option B: MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/loginapp

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Session Secret (generate a strong random string)
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random

# Google OAuth Credentials (see step 3)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "My Login App"
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
5. Copy Client ID and Client Secret to your `.env` file

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string and add to `.env`
4. Whitelist your IP address

### 5. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Install Frontend Dependencies

```bash
# From project root
npm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
# API Base URL
VITE_API_URL=http://localhost:5000/api

# Google OAuth Client ID (same as backend)
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### 3. Start Frontend Server

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 🧪 Testing the Integration

### 1. Test Backend Health

Visit: `http://localhost:5000/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Email/Password Login

1. Open frontend: `http://localhost:5173`
2. Try logging in with invalid credentials
3. Should see proper error messages

### 3. Test Google OAuth

1. Click "Continue with Google" button
2. Should redirect to Google login
3. After successful login, should redirect back with token

## 📁 Project Structure

```
project/
├── backend/                 # Node.js + Express backend
│   ├── config/
│   │   └── passport.js     # Passport.js configuration
│   ├── models/
│   │   └── User.js         # MongoDB User model
│   ├── routes/
│   │   └── auth.js         # Authentication routes
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── server.js           # Main server file
│   └── .env                # Backend environment variables
├── src/                    # React frontend
│   ├── services/
│   │   └── api.js          # API service for backend calls
│   ├── screens/
│   │   └── LoginScreen.jsx # Updated login component
│   └── ...
└── .env                    # Frontend environment variables
```

## 🔐 Security Features

✅ **Password Hashing**: bcrypt with salt rounds  
✅ **JWT Authentication**: Secure token-based auth  
✅ **Rate Limiting**: Prevents brute force attacks  
✅ **Account Locking**: Locks account after failed attempts  
✅ **Input Validation**: Server-side validation  
✅ **CORS Protection**: Configured for your domain  
✅ **Session Security**: Secure session configuration  

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset

### Utility
- `GET /api/health` - Health check
- `GET /api/auth/check-email/:email` - Check if email exists

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity for Atlas

2. **Google OAuth Not Working**
   - Verify Google Client ID/Secret
   - Check redirect URI in Google Console
   - Ensure Google+ API is enabled

3. **CORS Errors**
   - Check `FRONTEND_URL` in backend `.env`
   - Verify frontend is running on correct port

4. **JWT Token Issues**
   - Check `JWT_SECRET` is set
   - Verify token is being sent in headers

### Debug Commands

```bash
# Check backend logs
cd backend && npm run dev

# Check MongoDB connection
mongosh "your-mongodb-uri"

# Test API endpoints
curl http://localhost:5000/api/health
```

## 🔄 Next Steps

1. **Add User Dashboard**: Create protected routes
2. **Email Verification**: Implement email confirmation
3. **Password Reset**: Complete forgot password flow
4. **User Profile**: Add profile management
5. **Admin Panel**: Add user management features

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify all environment variables are set
3. Check console logs for errors
4. Ensure all services are running

Happy coding! 🎉