# Supabase Authentication Setup (100% Free Alternative)

## 🚀 Supabase Benefits:
- **Completely FREE** for small projects
- **Built-in authentication** with social providers
- **PostgreSQL database** included
- **Real-time subscriptions**
- **No credit card required**
- **Open source** (can self-host)

## 🔧 Setup Steps:

### 1. Create Supabase Project
1. Go to [Supabase.com](https://supabase.com/)
2. Click "Start your project"
3. Sign up with GitHub (free)
4. Click "New project"
5. Choose organization and enter:
   - Name: "my-login-app"
   - Database Password: (generate strong password)
   - Region: (closest to you)
6. Click "Create new project"

### 2. Configure Authentication
1. Go to Authentication → Settings
2. Site URL: `http://localhost:5173`
3. Redirect URLs: `http://localhost:5173/**`
4. Enable providers you want:
   - Email ✅
   - Google ✅
   - GitHub ✅
   - Discord ✅
   - Twitter ✅

### 3. Get API Keys
1. Go to Settings → API
2. Copy:
   - Project URL
   - Anon public key
   - Service role key (keep secret)

### 4. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 5. Frontend Setup
Create `src/config/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const signUpWithEmail = async (email, password, userData = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData // Additional user metadata
    }
  })
  return { data, error }
}

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = () => {
  return supabase.auth.getUser()
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}

// Reset password
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  return { data, error }
}
```

### 6. Update LoginScreen
```javascript
import { 
  signInWithEmail, 
  signInWithGoogle, 
  signInWithGitHub,
  resetPassword 
} from '../config/supabase'

// In your component
const handleLogin = async () => {
  if (!validateForm()) return;

  setIsLoading(true);
  setErrors(prev => ({ ...prev, general: '' }));

  try {
    const { data, error } = await signInWithEmail(email, password);
    
    if (error) {
      setErrors(prev => ({ ...prev, general: error.message }));
      return;
    }

    if (data.user) {
      console.log('Login successful:', data.user);
      // User is automatically logged in
      alert('Login successful! Welcome back!');
      // Redirect to dashboard
    }
  } catch (error) {
    setErrors(prev => ({ 
      ...prev, 
      general: 'Login failed. Please try again.' 
    }));
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleLogin = async () => {
  try {
    const { data, error } = await signInWithGoogle();
    
    if (error) {
      setErrors(prev => ({ ...prev, general: error.message }));
      return;
    }
    
    // Will redirect to Google OAuth
  } catch (error) {
    setErrors(prev => ({ 
      ...prev, 
      general: 'Google login failed. Please try again.' 
    }));
  }
};

const handleForgotPassword = async () => {
  if (!email) {
    setErrors(prev => ({ 
      ...prev, 
      email: 'Please enter your email address first' 
    }));
    return;
  }

  try {
    setIsLoading(true);
    const { data, error } = await resetPassword(email);
    
    if (error) {
      setErrors(prev => ({ ...prev, general: error.message }));
      return;
    }
    
    alert('Password reset instructions have been sent to your email.');
  } catch (error) {
    setErrors(prev => ({ 
      ...prev, 
      general: 'Failed to send password reset email.' 
    }));
  } finally {
    setIsLoading(false);
  }
};
```

### 7. Environment Variables
Add to `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 8. Auth State Management
Create `src/hooks/useAuth.js`:
```javascript
import { useState, useEffect } from 'react'
import { supabase, onAuthStateChange } from '../config/supabase'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

### 9. Social Provider Setup

#### For Google:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Add Client ID and Secret to Supabase Auth settings

#### For GitHub:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth app
3. Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. Add Client ID and Secret to Supabase Auth settings

## ✅ Benefits:
- **100% FREE** for small projects
- **No backend needed**
- **PostgreSQL database** included
- **Real-time features**
- **Row Level Security**
- **Multiple auth providers**
- **Open source**

## 🎯 Perfect For:
- Small to medium projects
- Rapid prototyping
- Full-stack apps without backend complexity
- Real-time applications