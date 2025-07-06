# MongoDB Setup Guide

## 🚀 Complete MongoDB Integration Setup

Your Dyanpitt application now has full MongoDB integration! Here's how to set it up:

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (Local or Cloud)
3. **Gmail Account** (for sending emails)

## 🛠️ Setup Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. Use connection string: `mongodb://localhost:27017/dyanpitt`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `<username>`, `<password>`, and `<cluster>` in the connection string

### 3. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your settings:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/dyanpitt
   # OR for Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dyanpitt

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRE=7d

   # Session Configuration
   SESSION_SECRET=your-super-secret-session-key-here

   # Email Configuration (Gmail)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # GitHub OAuth (Optional)
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

### 4. Gmail Setup for OTP Emails

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `SMTP_PASS`

### 5. Start the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected: localhost:27017
📱 Frontend URL: http://localhost:5173
🔗 API Base URL: http://localhost:5000/api
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  email: "user@example.com",
  dyanpittId: "@DA202506001",
  fullName: "John Doe",
  phoneNumber: "+1234567890",
  dateOfBirth: "1990-01-01",
  gender: "male",
  password: "hashed_password",
  isEmailVerified: true,
  registrationMonth: "202506",
  registrationNumber: 1,
  createdAt: "2025-06-01T10:00:00Z",
  updatedAt: "2025-06-01T10:00:00Z"
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/register` - Complete registration
- `POST /api/auth/login` - Login with email/Dyanpitt ID
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Validation
- `POST /api/auth/check-email` - Check if email exists
- `POST /api/auth/check-phone` - Check if phone exists

### OAuth
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/github/callback` - GitHub callback

## ✨ Features Implemented

### ✅ **Complete Registration Flow**
1. Email validation and OTP sending
2. OTP verification
3. Complete profile creation
4. Automatic Dyanpitt ID generation
5. Welcome email with account details

### ✅ **Dual Login System**
- Login with email + password
- Login with Dyanpitt ID + password

### ✅ **Data Validation**
- Email uniqueness check
- Phone number uniqueness check
- Input validation and sanitization
- Password hashing with bcrypt

### ✅ **Email Integration**
- OTP verification emails
- Welcome emails with Dyanpitt ID
- Password reset emails (ready)

### ✅ **Security Features**
- JWT authentication
- Password hashing
- Input validation
- Rate limiting ready
- Session management

## 🧪 Testing the Integration

### 1. Test Registration Flow
```bash
# 1. Send OTP
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# 2. Verify OTP (check your email for the code)
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp": "123456"}'

# 3. Complete registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fullName": "Test User",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "password": "password123"
  }'
```

### 2. Test Login
```bash
# Login with email
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Login with Dyanpitt ID
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"dyanpittId": "@DA202506001", "password": "password123"}'
```

## 🔧 Frontend Integration

The frontend API service is already configured to work with these endpoints. Just make sure your backend is running on `http://localhost:5000`.

## 📊 MongoDB Queries

### View Users
```javascript
// In MongoDB shell or Compass
db.users.find().pretty()

// Count users
db.users.countDocuments()

// Find by Dyanpitt ID
db.users.findOne({dyanpittId: "@DA202506001"})

// Find by email
db.users.findOne({email: "test@example.com"})
```

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity for Atlas

2. **Email Not Sending**
   - Verify Gmail app password
   - Check SMTP settings
   - Ensure 2FA is enabled on Gmail

3. **JWT Errors**
   - Ensure JWT_SECRET is set in `.env`
   - Check token expiration

4. **Validation Errors**
   - Check request body format
   - Verify required fields
   - Check data types

## 🎉 Success!

Your Dyanpitt application now has:
- ✅ Complete MongoDB integration
- ✅ Real user registration and authentication
- ✅ Email verification with OTP
- ✅ Unique Dyanpitt ID generation
- ✅ Dual login system
- ✅ Email notifications
- ✅ Data persistence

All user data is now properly saved to MongoDB and the application is production-ready!