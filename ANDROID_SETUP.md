# Android Development Setup for Dyanpitt

## Prerequisites Installation

### 1. Install Node.js
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from: https://nodejs.org/
```

### 2. Install Java Development Kit (JDK)
```bash
# Install OpenJDK 11 or 17
sudo apt update
sudo apt install openjdk-11-jdk

# Verify installation
java -version
javac -version

# Set JAVA_HOME (add to ~/.bashrc or ~/.zshrc)
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
```

### 3. Install Android Studio
1. **Download Android Studio**: https://developer.android.com/studio
2. **Install Android Studio**:
   ```bash
   # Extract and run
   tar -xzf android-studio-*.tar.gz
   cd android-studio/bin
   ./studio.sh
   ```
3. **Follow the setup wizard** to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

### 4. Configure Android SDK
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# Reload your shell
source ~/.bashrc
```

### 5. Install React Native CLI
```bash
npm install -g @react-native-community/cli
```

## Project Setup

### 1. Install Expo CLI (if using Expo)
```bash
npm install -g @expo/cli
```

### 2. Install Project Dependencies
```bash
cd mobile-app
npm install
```

### 3. Configure Android Emulator
1. **Open Android Studio**
2. **Go to Tools > AVD Manager**
3. **Create Virtual Device**:
   - Choose a device (e.g., Pixel 4)
   - Select system image (API 30+ recommended)
   - Configure AVD settings
   - Click Finish

### 4. Start Android Emulator
```bash
# List available emulators
emulator -list-avds

# Start emulator (replace with your AVD name)
emulator -avd Pixel_4_API_30
```

## Running the App

### Method 1: Using Expo (Recommended for development)
```bash
cd mobile-app
npm start

# Then press 'a' to open on Android emulator
# Or scan QR code with Expo Go app on physical device
```

### Method 2: React Native CLI (for production builds)
```bash
cd mobile-app
npx react-native run-android
```

## Physical Device Setup

### 1. Enable Developer Options
1. Go to **Settings > About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings > Developer Options**
4. Enable **USB Debugging**

### 2. Connect Device
```bash
# Check if device is connected
adb devices

# If device not recognized, install ADB
sudo apt install android-tools-adb android-tools-fastboot
```

## Troubleshooting

### Common Issues and Solutions

#### 1. ANDROID_HOME not set
```bash
echo $ANDROID_HOME
# Should show: /home/username/Android/Sdk
```

#### 2. Emulator not starting
```bash
# Check available system images
sdkmanager --list | grep system-images

# Install if missing
sdkmanager "system-images;android-30;google_apis;x86_64"
```

#### 3. Metro bundler issues
```bash
cd mobile-app
npx react-native start --reset-cache
```

#### 4. Build errors
```bash
cd mobile-app/android
./gradlew clean
cd ..
npx react-native run-android
```

#### 5. Permission denied errors
```bash
chmod +x android/gradlew
```

## Development Workflow

### 1. Start Backend Server
```bash
# Terminal 1
npm run backend
```

### 2. Start Mobile App
```bash
# Terminal 2
npm run mobile
```

### 3. Development Tips
- **Hot Reload**: Shake device or press R+R to reload
- **Debug Menu**: Shake device or Cmd+M (Mac) / Ctrl+M (Windows/Linux)
- **Chrome DevTools**: Enable remote debugging in debug menu

## Building for Production

### 1. Generate Signed APK
```bash
cd mobile-app/android
./gradlew assembleRelease
```

### 2. Generate AAB (for Play Store)
```bash
cd mobile-app/android
./gradlew bundleRelease
```

## Environment Configuration

### 1. Create app.config.js (if using Expo)
```javascript
export default {
  expo: {
    name: "Dyanpitt",
    slug: "dyanpitt",
    version: "1.0.0",
    platforms: ["android"],
    android: {
      package: "com.dyanpitt.app",
      versionCode: 1
    },
    extra: {
      apiUrl: "http://10.0.2.2:5001/api" // For Android emulator
    }
  }
};
```

### 2. Update API URL for Android
- **Emulator**: Use `http://10.0.2.2:5001/api`
- **Physical Device**: Use your computer's IP `http://192.168.x.x:5001/api`

## Next Steps
1. ✅ Install all prerequisites
2. ✅ Set up Android emulator
3. ✅ Run the mobile app
4. ✅ Test API connectivity with backend
5. ✅ Test app features (registration, login, booking)

## Useful Commands
```bash
# Check React Native environment
npx react-native doctor

# List connected devices
adb devices

# View app logs
npx react-native log-android

# Clear cache
npx react-native start --reset-cache
```