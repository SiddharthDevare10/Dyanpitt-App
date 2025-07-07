export default {
  expo: {
    name: "Dyanpitt",
    slug: "dyanpitt-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.dyanpitt.mobile",
      versionCode: 1,
      permissions: [
        "android.permission.INTERNET",
        "android.permission.VIBRATE",
        "android.permission.ACCESS_NETWORK_STATE"
      ],
      allowBackup: false
    },
    plugins: [
      "expo-font",
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#ffffff"
        }
      ]
    ],
    extra: {
      // API URL for different environments
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:5001/api", // Android emulator default
      eas: {
        projectId: "your-project-id-here"
      }
    }
  }
};