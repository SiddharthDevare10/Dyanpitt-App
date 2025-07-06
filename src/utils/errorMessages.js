// Centralized error messages for consistent user experience

export const ERROR_MESSAGES = {
  // Email validation
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address (e.g., user@example.com)',
  EMAIL_TOO_LONG: 'Email address is too long (maximum 254 characters)',
  EMAIL_EXISTS: 'The email already exists',

  // Password validation
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
  PASSWORD_TOO_LONG: 'Password is too long (maximum 128 characters)',
  PASSWORD_NO_LOWERCASE: 'Password must contain at least one lowercase letter (a-z)',
  PASSWORD_NO_UPPERCASE: 'Password must contain at least one uppercase letter (A-Z)',
  PASSWORD_NO_NUMBER: 'Password must contain at least one number (0-9)',
  PASSWORD_NO_SPECIAL: 'Password must contain at least one special character (!@#$%^&*...)',
  PASSWORD_HAS_SPACES: 'Password cannot contain spaces',
  PASSWORD_MISMATCH: 'Passwords do not match. Please make sure both passwords are identical',

  // OTP validation
  OTP_REQUIRED: 'Verification code is required',
  OTP_INCOMPLETE: 'Please enter the complete 6-digit verification code',
  OTP_TOO_LONG: 'Verification code must be exactly 6 digits',
  OTP_INVALID_FORMAT: 'Verification code must contain only numbers (0-9)',
  OTP_EXPIRED: 'Verification code has expired. Please request a new one',
  OTP_INVALID: 'Invalid verification code. Please check and try again',

  // Name validation
  NAME_REQUIRED: 'Full name is required',
  NAME_TOO_SHORT: 'Full name must be at least 2 characters long',
  NAME_TOO_LONG: 'Full name is too long (maximum 100 characters)',
  NAME_INVALID_CHARS: 'Full name can only contain letters, spaces, hyphens, apostrophes, and periods',
  NAME_INCOMPLETE: 'Please enter your first and last name',

  // Phone validation
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_TOO_SHORT: 'Phone number must be at least 10 digits long',
  PHONE_TOO_LONG: 'Phone number is too long (maximum 15 digits)',
  PHONE_INVALID_FORMAT: 'Phone number must contain only numbers (0-9)',
  PHONE_STARTS_WITH_ZERO: 'Phone number should not start with 0 (country code is already selected)',
  PHONE_EXISTS: 'This phone number is already registered with another account. Please use a different phone number.',

  // Date of birth validation
  DOB_REQUIRED: 'Date of birth is required',
  DOB_INVALID: 'Please enter a valid date',
  DOB_FUTURE: 'Date of birth cannot be in the future',
  DOB_TOO_YOUNG: 'You must be at least 13 years old to create an account',
  DOB_TOO_OLD: 'Please enter a valid date of birth (maximum age 120 years)',
  DOB_TOO_EARLY: 'Please enter a date after 1900',

  // Gender validation
  GENDER_REQUIRED: 'Please select your gender',
  GENDER_INVALID: 'Please select a valid gender option from the dropdown',

  // Login validation
  LOGIN_REQUIRED: 'Email address or Dyanpitt ID is required',
  LOGIN_EMPTY: 'Please enter your email address or Dyanpitt ID',
  DYANPITT_ID_INVALID: 'Invalid Dyanpitt ID format. Should be @DA followed by 7 digits (e.g., @DA2025060001)',
  LOGIN_INVALID_FORMAT: 'Please enter a valid email address or Dyanpitt ID (starts with @DA)',

  // General errors
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  SERVER_ERROR: 'Server error. Please try again in a few moments.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  
  // Success messages
  OTP_SENT: 'Verification code sent successfully to your email',
  EMAIL_VERIFIED: 'Email verified successfully',
  REGISTRATION_SUCCESS: 'Account created successfully! Welcome to Dyanpitt!',
  LOGIN_SUCCESS: 'Login successful! Welcome back!',

  // API specific errors
  SEND_OTP_FAILED: 'Unable to send verification code. Please try again in a few moments.',
  VERIFY_OTP_FAILED: 'Unable to verify code. Please try again.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
  
  // Field specific context
  FIELD_CONTEXT: {
    email: 'We need your email to send you important updates and verify your account.',
    password: 'Choose a strong password to keep your account secure.',
    confirmPassword: 'Please re-enter your password to confirm it matches.',
    fullName: 'Enter your full name as you\'d like it to appear on your profile.',
    phoneNumber: 'We may use your phone number for account security and important notifications.',
    dateOfBirth: 'Your date of birth helps us provide age-appropriate features.',
    gender: 'This information helps us personalize your experience.',
    otp: 'Check your email for the 6-digit verification code we sent you.'
  }
};

// Helper function to get user-friendly error message
export const getErrorMessage = (field, error) => {
  return ERROR_MESSAGES[error] || `Please check your ${field} and try again.`;
};

// Helper function to get field context/help text
export const getFieldContext = (field) => {
  return ERROR_MESSAGES.FIELD_CONTEXT[field] || '';
};