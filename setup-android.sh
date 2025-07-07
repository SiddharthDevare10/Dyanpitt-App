#!/bin/bash

echo "🚀 Setting up Dyanpitt Android Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Installing OpenJDK 11..."
    sudo apt update
    sudo apt install -y openjdk-11-jdk
else
    echo "✅ Java found: $(java -version 2>&1 | head -n 1)"
fi

# Check if Android SDK is configured
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME not set. Please install Android Studio and configure SDK."
    echo "   See ANDROID_SETUP.md for detailed instructions."
else
    echo "✅ Android SDK found: $ANDROID_HOME"
fi

# Install global dependencies
echo "📦 Installing global dependencies..."
npm install -g @expo/cli @react-native-community/cli

# Install project dependencies
echo "📦 Installing project dependencies..."
npm run install-all

# Create environment file for mobile app
if [ ! -f "mobile-app/.env" ]; then
    echo "📝 Creating mobile app environment file..."
    cp mobile-app/.env.example mobile-app/.env
    echo "✅ Created mobile-app/.env - update with your computer's IP for physical device testing"
fi

# Create backend environment file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Install Android Studio: https://developer.android.com/studio"
echo "2. Set up Android emulator (see ANDROID_SETUP.md)"
echo "3. Start backend: npm run backend"
echo "4. Start mobile app: npm run mobile"
echo ""
echo "For detailed Android setup instructions, see ANDROID_SETUP.md"