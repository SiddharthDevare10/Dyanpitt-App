# 🚀 Quick Deployment Guide - FREE

## 📋 What We'll Deploy (100% FREE)

1. **Frontend** → Vercel (React + Vite)
2. **Backend** → Railway (Node.js + Express + MongoDB)
3. **Database** → Railway MongoDB (included)
4. **Email** → Gmail SMTP (free)

---

## 🔧 Step 1: Deploy Backend to Railway (5 minutes)

### 1.1 Sign up for Railway
- Go to [railway.app](https://railway.app)
- Sign up with GitHub (recommended)

### 1.2 Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Select the **`backend`** folder
5. Railway will auto-detect Node.js and deploy

### 1.3 Add Environment Variables
In Railway dashboard, go to **Variables** tab and add:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongo:27017/dyanpitt
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-too
FRONTEND_URL=https://your-app-name.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### 1.4 Add MongoDB
1. In Railway, click **"+ New"**
2. Select **"Database"** → **"MongoDB"**
3. Railway will automatically connect it to your app

### 1.5 Get Backend URL
- Copy your Railway app URL (e.g., `https://your-app.railway.app`)

---

## 🌐 Step 2: Deploy Frontend to Vercel (3 minutes)

### 2.1 Sign up for Vercel
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

### 2.2 Deploy Frontend
1. Click **"New Project"**
2. Import your GitHub repository
3. Vercel auto-detects Vite configuration
4. Click **"Deploy"**

### 2.3 Add Environment Variables
In Vercel dashboard, go to **Settings** → **Environment Variables**:

```env
VITE_API_URL=https://your-backend.railway.app/api
```

### 2.4 Redeploy
- Go to **Deployments** tab
- Click **"Redeploy"** to apply environment variables

---

## 📧 Step 3: Set up Gmail SMTP (2 minutes)

### 3.1 Enable 2-Factor Authentication
- Go to Google Account settings
- Enable 2-Factor Authentication

### 3.2 Generate App Password
1. Go to **Security** → **App passwords**
2. Select **"Mail"** and **"Other"**
3. Name it "Dyanpitt App"
4. Copy the generated password

### 3.3 Update Railway Environment
- Add the app password to `SMTP_PASS` in Railway

---

## ✅ Step 4: Test Your Deployment

### 4.1 Test Frontend
- Visit your Vercel URL
- Check if the app loads correctly

### 4.2 Test Backend
- Visit `https://your-backend.railway.app/api/health`
- Should return: `{"status":"OK","message":"Server is running"}`

### 4.3 Test Full Flow
1. Register a new account
2. Verify OTP (check email)
3. Complete profile
4. Test forgot password
5. Test login

---

## 🎯 Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **Database**: Managed by Railway
- **Email**: Gmail SMTP

---

## 💰 Cost Breakdown

| Service | Cost | Limits |
|---------|------|--------|
| **Vercel** | FREE | Unlimited personal projects |
| **Railway** | FREE | 500 hours/month |
| **MongoDB** | FREE | Included with Railway |
| **Gmail SMTP** | FREE | Unlimited emails |
| **TOTAL** | **$0.00/month** | Perfect for testing & demos |

---

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Error**: Update `FRONTEND_URL` in Railway
2. **Database Connection**: Check MongoDB service in Railway
3. **Email Not Sending**: Verify Gmail app password
4. **Build Fails**: Check Node.js version compatibility

### Need Help?
- Railway has excellent Discord support
- Vercel has comprehensive documentation
- Both platforms have great free tiers

---

## 🚀 Ready to Deploy?

1. **Push your code to GitHub** (if not already)
2. **Follow Step 1** (Railway backend)
3. **Follow Step 2** (Vercel frontend)
4. **Follow Step 3** (Gmail SMTP)
5. **Test everything** (Step 4)

**Total time**: ~15 minutes
**Total cost**: $0.00

Let's get your app live! 🎉