import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.antonio.lockbox',
  appName: 'LockBox',
  webDir: 'build',
  bundledWebRuntime: false,
   plugins: {
    SplashScreen: {
      launchFadeOutDuration: 500,
      launchAutoHide: false,
      backgroundColor: "#252525",
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
