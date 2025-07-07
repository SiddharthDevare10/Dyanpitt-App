const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/database');

// Import configurations
require('./config/passport');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();

// CORS configuration for local development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration for local development
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-key-for-local-testing',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API info route for browser testing
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Dyanpitt API is running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        sendOtp: 'POST /api/auth/send-otp',
        verifyOtp: 'POST /api/auth/verify-otp',
        forgotPassword: 'POST /api/auth/forgot-password',
        me: 'GET /api/auth/me (requires auth)',
        logout: 'POST /api/auth/logout (requires auth)'
      }
    },
    note: 'Most endpoints require POST requests with JSON data'
  });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler with debugging info
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    requestedPath: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'POST /api/auth/send-otp',
      'POST /api/auth/verify-otp'
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📱 Frontend URL: http://localhost:5173`);
});