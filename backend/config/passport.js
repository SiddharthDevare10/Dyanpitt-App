const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local Strategy for email/password login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find user by email
    const user = await User.findByEmail(email);
    
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }
    
    // Check if account is locked
    if (user.isLocked) {
      return done(null, false, { 
        message: 'Account temporarily locked due to too many failed login attempts. Please try again later.' 
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      // Increment login attempts
      await user.incLoginAttempts();
      return done(null, false, { message: 'Invalid email or password' });
    }
    
    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// GitHub OAuth Strategy (only if credentials are provided)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this GitHub ID
      let user = await User.findByGitHubId(profile.id);
      
      if (user) {
        // Update last login
        user.lastLogin = Date.now();
        await user.save();
        return done(null, user);
      }
      
      // Check if user exists with same email
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      if (email) {
        user = await User.findByEmail(email);
        
        if (user) {
          // Link GitHub account to existing user
          user.githubId = profile.id;
          user.avatar = profile.photos[0]?.value;
          user.isEmailVerified = true;
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }
      }
      
      // Create new user
      user = new User({
        githubId: profile.id,
        email: email || `${profile.username}@github.local`, // Fallback email
        name: profile.displayName || profile.username,
        avatar: profile.photos[0]?.value,
        isEmailVerified: !!email,
        lastLogin: Date.now()
      });
      
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
} else {
  console.log('GitHub OAuth disabled - GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not provided');
}

// JWT Strategy for API authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-jwt-secret'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    
    if (user) {
      return done(null, user);
    }
    
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;