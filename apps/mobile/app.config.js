const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.anasrazaattari.dev";
  }
  if (IS_PREVIEW) {
    return "com.anasrazaattari.preview";
  }
  return "com.anasrazaattari";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Anas Raza Attari (Dev)";
  }
  if (IS_PREVIEW) {
    return "Anas Raza Attari (Preview)";
  }
  return "Anas Raza Attari";
};

export default {
  expo: {
    name: getAppName(),
    slug: "anas-raza-attari",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/android-icon-foreground.png",
    scheme: "anasrazaattari",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
      associatedDomains: ["applinks:anasrazaattari.expo.app"],
    },
    android: {
      versionCode: 3,
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundColor: "#000000",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: getUniqueIdentifier(),
      permissions: [
        "FOREGROUND_SERVICE",
        "FOREGROUND_SERVICE_MEDIA_PLAYBACK",
        "WAKE_LOCK",
        "android.permission.WAKE_LOCK",
        "android.permission.MODIFY_AUDIO_SETTINGS",
      ],
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "anasrazaattari",
              host: "*",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "anasrazaattari.expo.app",
              pathPrefix: "/naat",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          resizeMode: "cover",
          backgroundColor: "#000000",
        }
      ],
      // Sentry plugin DISABLED — uncomment to re-enable
      // [
      //   "@sentry/react-native",
      //   {
      //     organization: "sahil-hasnain",
      //     project: "ubaid-raza-naats",
      //   },
      // ],
      [
        "expo-speech-recognition",
        {
          microphonePermission:
            "Allow $(PRODUCT_NAME) to use the microphone for voice search.",
          speechRecognitionPermission:
            "Allow $(PRODUCT_NAME) to recognize speech for voice search.",
          androidSpeechServicePackages: [
            "com.google.android.googlequicksearchbox",
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        "projectId": "34c43ca5-f0b1-43dc-9d29-b8c3fc054151"
      },
    },
  },
};
