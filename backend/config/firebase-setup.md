# Firebase Authentication Setup (Free Alternative)

## 🔥 Firebase Auth Benefits:
- **10,000 free authentications/month**
- **Multiple providers** (Google, Facebook, Twitter, GitHub, etc.)
- **No credit card required**
- **Easy setup**
- **Real-time database included**

## 🔧 Setup Steps:

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "my-login-app"
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable providers you want:
   - Email/Password ✅
   - Google ✅
   - GitHub ✅
   - Facebook ✅
   - Twitter ✅

### 3. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>)
4. Register app name: "my-login-app"
5. Copy the config object

### 4. Install Firebase SDK
```bash
# Frontend
npm install firebase

# Backend (optional - for admin SDK)
npm install firebase-admin
```

### 5. Frontend Setup
Create `src/config/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Auth functions
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const loginWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
};

export const logout = () => {
  return signOut(auth);
};
```

### 6. Update LoginScreen
```javascript
import { 
  loginWithEmail, 
  loginWithGoogle, 
  loginWithGitHub 
} from '../config/firebase';

// In your component
const handleLogin = async () => {
  try {
    setIsLoading(true);
    const userCredential = await loginWithEmail(email, password);
    const user = userCredential.user;
    
    // Get Firebase token
    const token = await user.getIdToken();
    
    // Store token and user info
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }));
    
    console.log('Login successful:', user);
    alert('Login successful!');
  } catch (error) {
    setErrors({ general: error.message });
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleLogin = async () => {
  try {
    const result = await loginWithGoogle();
    const user = result.user;
    const token = await user.getIdToken();
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }));
    
    console.log('Google login successful:', user);
  } catch (error) {
    setErrors({ general: error.message });
  }
};
```

### 7. Environment Variables
Add to `.env`:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## ✅ Benefits:
- **Completely free** up to 10k users
- **Multiple OAuth providers**
- **Real-time features**
- **No backend needed**
- **Google's infrastructure**
- **Easy social login setup**

## 🔄 Hybrid Approach:
You can also use Firebase Auth + your MongoDB backend:
- Firebase handles authentication
- Your backend stores additional user data
- Best of both worlds!