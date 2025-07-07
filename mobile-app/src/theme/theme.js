import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

export const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: '#515151',
    primaryContainer: '#f5f5f5',
    secondary: '#6b7280',
    secondaryContainer: '#f3f4f6',
    tertiary: '#10b981',
    tertiaryContainer: '#d1fae5',
    surface: '#ffffff',
    surfaceVariant: '#f8f9fa',
    background: '#ffffff',
    error: '#ef4444',
    errorContainer: '#fef2f2',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#515151',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#6b7280',
    onTertiary: '#ffffff',
    onTertiaryContainer: '#065f46',
    onSurface: '#1f2937',
    onSurfaceVariant: '#6b7280',
    onBackground: '#1f2937',
    onError: '#ffffff',
    onErrorContainer: '#991b1b',
    outline: '#d1d5db',
    outlineVariant: '#e5e7eb',
    inverseSurface: '#374151',
    inverseOnSurface: '#f9fafb',
    inversePrimary: '#9ca3af',
    shadow: '#000000',
    scrim: '#000000',
    surfaceDisabled: '#f3f4f6',
    onSurfaceDisabled: '#9ca3af',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};