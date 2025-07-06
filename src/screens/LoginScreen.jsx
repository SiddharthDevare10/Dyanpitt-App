import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import apiService from '../services/api';

export default function LoginScreen({ onNavigateToRegister, onNavigateToForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Check for GitHub OAuth callback on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // Handle GitHub OAuth callback
      const success = apiService.handleGitHubCallback(token);
      if (success) {
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        // Check completion status and redirect accordingly
        // For GitHub login, we'll redirect to dashboard for now
        // In production, you'd want to check completion status here too
        window.location.href = '/dashboard';
      }
    }
  }, []);

  // Validation functions
  const validateEmailOrId = (emailOrId) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dyanpittIdRegex = /^@DA\d{9}$/;
    
    if (!emailOrId) {
      return 'Email address or Dyanpitt ID is required';
    }
    
    if (emailOrId.trim().length === 0) {
      return 'Please enter your email address or Dyanpitt ID';
    }
    
    // Check if it's a Dyanpitt ID
    if (emailOrId.startsWith('@DA')) {
      if (!dyanpittIdRegex.test(emailOrId)) {
        return 'Invalid Dyanpitt ID format. Should be @DA followed by 9 digits (e.g., @DA202507001)';
      }
      return '';
    }
    
    // Check if it's an email
    if (emailOrId.includes('@')) {
      if (!emailRegex.test(emailOrId)) {
        return 'Please enter a valid email address (e.g., user@example.com)';
      }
      if (emailOrId.length > 254) {
        return 'Email address is too long (maximum 254 characters)';
      }
      return '';
    }
    
    // If it doesn't start with @DA and doesn't contain @, it's invalid
    return 'Please enter a valid email address or Dyanpitt ID (starts with @DA)';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  // Handle input changes with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear general errors when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
    
    if (touched.email) {
      const error = validateEmailOrId(value);
      setErrors(prev => ({ ...prev, email: error }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear general errors when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
    
    if (touched.password) {
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  // Handle field blur (when user leaves the field)
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'email') {
      const error = validateEmailOrId(email);
      setErrors(prev => ({ ...prev, email: error }));
    } else if (field === 'password') {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  // Validate entire form
  const validateForm = () => {
    const emailError = validateEmailOrId(email);
    const passwordError = validatePassword(password);
    
    const newErrors = {
      email: emailError,
      password: passwordError
    };
    
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    
    return !emailError && !passwordError;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));
    
    try {
      // Determine if login is with email or Dyanpitt ID
      const isEmailLogin = email.includes('@') && !email.startsWith('@DA');
      const loginData = {
        [isEmailLogin ? 'email' : 'dyanpittId']: email,
        password: password,
        rememberMe: rememberMe
      };

      const response = await apiService.login(loginData);
      
      if (response.success) {
        // Store user data for the dashboard
        if (response.user) {
          localStorage.setItem('userData', JSON.stringify(response.user));
        }
        
        // Check user completion status and redirect accordingly
        const user = response.user;
        if (!user.membershipCompleted) {
          window.location.href = '/membership';
        } else if (!user.bookingCompleted) {
          window.location.href = '/booking';
        } else {
          window.location.href = '/dashboard';
        }
      }
      
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        general: error.message || 'Login failed. Please check your credentials and try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    // Redirect to GitHub OAuth
    window.location.href = apiService.getGitHubAuthUrl();
  };

  const handleSignUp = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
    }
  };

  const handleForgotPassword = () => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header-section">
        <h1 className="main-title">Welcome Back</h1>
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="error-message general-error">
          {errors.general}
        </div>
      )}

      {/* Email Input */}
      <div className="input-group">
        <label className="input-label">Email or Dyanpitt ID</label>
        <input
          type="text"
          placeholder="Enter your email or Dyanpitt ID"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => handleBlur('email')}
          onKeyPress={handleKeyPress}
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          disabled={isLoading}
        />
        {errors.email && (
          <div className="error-message">
            {errors.email}
          </div>
        )}
      </div>

      {/* Password Input */}
      <div className="input-group">
        <label className="input-label">Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('password')}
            onKeyPress={handleKeyPress}
            className={`form-input password-input ${errors.password ? 'input-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <div className="error-message">
            {errors.password}
          </div>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="form-options">
        <label className="remember-me">
          <input 
            type="checkbox" 
            className="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <span className="checkbox-label">Remember me</span>
        </label>
        <button 
          onClick={handleForgotPassword} 
          className="forgot-password"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}
      <button 
        onClick={handleLogin} 
        className={`login-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="spinner"></div>
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Divider */}
      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-text">Or continue with</span>
        <div className="divider-line"></div>
      </div>

      {/* GitHub Login */}
      <button 
        onClick={handleGitHubLogin} 
        className="google-button"
        disabled={isLoading}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" className="google-icon">
          <path
            fill="#ffffff"
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        Continue with GitHub
      </button>

      {/* Sign Up Link */}
      <div className="signup-link">
        <p className="signup-text">
          Don't have an account?{' '}
          <button 
            onClick={handleSignUp} 
            className="signup-button"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

