# 🚀 Deployment Guide - Docker + Railway

## 📋 Quick Overview
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Docker + Node.js)
- **Database**: Railway MongoDB
- **Build**: Docker (no more nixpacks issues!)

## 🔧 Deployment Steps

### 1️⃣ Backend - Railway (Docker)
1. **Push to GitHub** - Ensure all changes are committed
2. **Railway Setup**:
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub → Select your repo
   - Choose `backend` folder
3. **Add MongoDB**:
   - Click "+ New" → Database → MongoDB
4. **Environment Variables** (Railway Variables tab):
   ```env
   NODE_ENV=production
   FRONTEND_URL=https://dyanpitt.vercel.app
   JWT_SECRET=your-super-secret-jwt-key
   SESSION_SECRET=your-super-secret-session-key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   ```

### 2️⃣ Frontend - Vercel
1. **Vercel Setup**:
   - Go to [vercel.com](https://vercel.com)
   - New Project → Import from GitHub
2. **Environment Variables**:
   ```env
   VITE_API_URL=https://your-railway-app.railway.app/api
   ```

### 3️⃣ Gmail App Password
1. **Google Account** → Security → 2-Factor Auth (enable)
2. **App Passwords** → Mail → Generate password
3. **Add to Railway**: `SMTP_PASS=generated-password`

## 🔍 Testing
- **Backend Health**: `https://your-railway-app.railway.app/api/health`
- **Frontend**: `https://your-app.vercel.app`
- **Registration Flow**: Test email verification

## 🚨 Common Issues
| Issue | Solution |
|-------|----------|
| CORS Error | Update `FRONTEND_URL` in Railway |
| Email Not Sending | Check Gmail app password |
| Build Fails | Docker handles everything automatically |

## ✅ Benefits of Docker Approach
- ✅ No more nixpacks conflicts
- ✅ Consistent builds
- ✅ Standard Node.js environment
- ✅ Easy debugging
- ✅ Production-ready

## 🎯 Live URLs
- **Frontend**: `https://dyanpitt.vercel.app`
- **Backend**: `https://dyanpitt-production.up.railway.app`
- **API Health**: `https://dyanpitt-production.up.railway.app/api/health`