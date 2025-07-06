# GitHub OAuth Setup (Free Alternative)

## 🔧 Setup Steps:

### 1. Create GitHub OAuth App
1. Go to GitHub.com → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: "My Login App"
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Click "Register application"
5. Copy Client ID and Client Secret

### 2. Install GitHub Strategy
```bash
npm install passport-github2
```

### 3. Add to .env
```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 4. Update Passport Config
Add to `config/passport.js`:

```javascript
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    
    if (user) {
      user.lastLogin = Date.now();
      await user.save();
      return done(null, user);
    }
    
    user = await User.findByEmail(profile.emails[0].value);
    
    if (user) {
      user.githubId = profile.id;
      user.avatar = profile.photos[0]?.value;
      user.lastLogin = Date.now();
      await user.save();
      return done(null, user);
    }
    
    user = new User({
      githubId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName || profile.username,
      avatar: profile.photos[0]?.value,
      isEmailVerified: true,
      lastLogin: Date.now()
    });
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
```

### 5. Add Routes
Add to `routes/auth.js`:

```javascript
// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/auth/callback?token=${token}`);
  }
);
```

### 6. Update Frontend
In `services/api.js`:

```javascript
// GitHub OAuth
getGitHubAuthUrl() {
  return `${this.baseURL}/auth/github`;
}
```

In `LoginScreen.jsx`:
```javascript
const handleGitHubLogin = () => {
  window.location.href = apiService.getGitHubAuthUrl();
};
```

## ✅ Benefits:
- Completely free
- No credit card required
- Easy setup
- Developer-friendly
- Good for tech-focused apps