# Dyanpitt - Android Application

A mobile-first gym membership and booking application with React Native frontend and Node.js backend.

## Project Structure
```
dyanpitt-android-app/
├── backend/                    # Node.js API server
│   ├── config/                # Database and passport configuration
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── services/              # Email and other services
│   └── middleware/            # Authentication middleware
├── mobile-app/                # React Native Android app
│   ├── src/
│   │   ├── context/          # Authentication context
│   │   ├── navigation/       # App navigation
│   │   ├── screens/          # App screens
│   │   ├── services/         # API services
│   │   └── theme/            # App theming
│   └── App.js
├── src/                       # Shared components and utilities
│   ├── components/           # Reusable UI components
│   ├── data/                 # Pricing and discount data
│   ├── services/             # API service layer
│   └── utils/                # Utility functions
├── pricing_structure.csv     # Membership pricing data
└── README.md
```

## Features Restored
✅ **Pricing & Membership Plans**
- Multiple membership tiers (Basic, Premium, Elite)
- Duration-based discounts (1, 3, 6, 12 months)
- Pricing structure CSV for backend processing

✅ **Discount System**
- Promotional codes (WELCOME10, STUDENT20, etc.)
- Seasonal offers (New Year, Summer specials)
- Validation and calculation logic

✅ **Seat Selection**
- Interactive seat selection modal
- Availability checking
- Price calculation per seat

✅ **Essential Components**
- Custom dropdown with search functionality
- Password strength indicator
- Error message handling
- API service layer

✅ **Backend Integration**
- User authentication and registration
- OTP verification system
- Membership management
- Booking system
- Payment processing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation)
- Android Studio / React Native development environment
- Java Development Kit (JDK 11 or 17)

### Automated Setup (Recommended)
```bash
# Run the setup script
./setup-android.sh
```

### Manual Setup
1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Environment**
   ```bash
   # Copy environment files
   cp mobile-app/.env.example mobile-app/.env
   cp backend/.env.example backend/.env
   ```

3. **Start Backend Server**
   ```bash
   npm run backend
   ```

4. **Start Mobile App**
   ```bash
   npm run mobile
   ```

### Android Development Setup
For detailed Android setup instructions, see **[ANDROID_SETUP.md](ANDROID_SETUP.md)**

## Backend Setup

### Environment Configuration
```bash
cd backend
cp .env.example .env
# Edit .env file with your local MongoDB URI and SMTP settings
```

### Database
Make sure MongoDB is running locally on port 27017, or update MONGODB_URI in backend/.env

## Mobile App Setup

### React Native Environment
Follow React Native CLI setup guide for Android development:
- Install Android Studio
- Configure Android SDK
- Set up Android emulator or connect physical device

## Development URLs
- **Backend API**: http://localhost:5001/api
- **API Health Check**: http://localhost:5001/api/health

## Key Features
- **User Management**: Registration, login, profile management
- **Email Verification**: OTP-based email verification
- **Membership Plans**: Multiple tiers with duration discounts
- **Booking System**: Seat selection and reservation
- **Payment Integration**: Secure payment processing
- **Discount System**: Promotional codes and seasonal offers
- **Mobile-First Design**: Optimized for Android devices

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/update-membership` - Update membership
- `POST /api/auth/update-booking` - Create/update booking
- `POST /api/auth/complete-payment` - Process payment

## Development Commands

### Backend
```bash
cd backend
npm run dev    # Start with nodemon
npm start      # Start normally
```

### Mobile App
```bash
cd mobile-app
npm start              # Start Expo development server
npm run android        # Run on Android emulator
npm run android-device # Run on physical Android device
npm run doctor         # Check React Native environment
```

## Data Files
- `pricing_structure.csv` - Contains all membership plans and pricing
- `src/data/pricing.js` - Pricing logic and calculations
- `src/data/discounts.js` - Discount codes and validation