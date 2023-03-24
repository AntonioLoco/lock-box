import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.antonio.lockbox',
  appName: 'LockBox',
  webDir: 'build',
  bundledWebRuntime: false,
   plugins: {
    SplashScreen: {
      // launchAutoHide: true,
      // launchShowDuration: 3000,
      launchFadeOutDuration: 500,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      // showSpinner: true,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      // spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      // layoutName: "launch_screen",
      // useDialog: true,
    },
  },
};

export default config;
