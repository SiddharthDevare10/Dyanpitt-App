// Centralized error message handling
export const errorMessages = {
  // Authentication errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
  ACCOUNT_LOCKED: 'Account has been temporarily locked',
  PASSWORD_EXPIRED: 'Password has expired, please reset',
  
  // Registration errors
  EMAIL_EXISTS: 'Email address is already registered',
  PHONE_EXISTS: 'Phone number is already registered',
  WEAK_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  
  // OTP errors
  INVALID_OTP: 'Invalid or expired OTP',
  OTP_EXPIRED: 'OTP has expired, please request a new one',
  OTP_ATTEMPTS_EXCEEDED: 'Too many failed attempts, please try again later',
  OTP_NOT_SENT: 'Failed to send OTP, please try again',
  
  // Payment errors
  PAYMENT_FAILED: 'Payment processing failed',
  INVALID_CARD: 'Invalid card details',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  PAYMENT_TIMEOUT: 'Payment request timed out',
  PAYMENT_CANCELLED: 'Payment was cancelled',
  
  // Booking errors
  SEAT_UNAVAILABLE: 'Selected seat is no longer available',
  BOOKING_EXPIRED: 'Booking session has expired',
  INVALID_BOOKING: 'Invalid booking details',
  BOOKING_LIMIT_EXCEEDED: 'Maximum booking limit reached',
  
  // Membership errors
  MEMBERSHIP_EXPIRED: 'Your membership has expired',
  MEMBERSHIP_SUSPENDED: 'Your membership has been suspended',
  INVALID_MEMBERSHIP: 'Invalid membership plan',
  UPGRADE_REQUIRED: 'Please upgrade your membership to access this feature',
  
  // Network errors
  NETWORK_ERROR: 'Network connection error, please try again',
  SERVER_ERROR: 'Server error, please try again later',
  TIMEOUT_ERROR: 'Request timed out, please try again',
  
  // Validation errors
  REQUIRED_FIELD: 'This field is required',
  INVALID_FORMAT: 'Invalid format',
  MIN_LENGTH: 'Minimum length not met',
  MAX_LENGTH: 'Maximum length exceeded',
  
  // General errors
  UNKNOWN_ERROR: 'An unexpected error occurred',
  MAINTENANCE_MODE: 'Service is under maintenance',
  FEATURE_DISABLED: 'This feature is currently disabled'
};

// Error code to message mapping
export const getErrorMessage = (errorCode, customMessage = null) => {
  if (customMessage) return customMessage;
  return errorMessages[errorCode] || errorMessages.UNKNOWN_ERROR;
};

// Validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: minLength && hasUppercase && hasLowercase && hasNumbers,
    requirements: {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecialChar
    }
  };
};

// Format error for display
export const formatError = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return errorMessages.UNKNOWN_ERROR;
};