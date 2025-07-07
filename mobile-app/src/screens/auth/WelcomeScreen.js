import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Logo/Brand Section */}
        <View style={styles.logoSection}>
          <Surface style={[styles.logoContainer, { backgroundColor: theme.colors.primaryContainer }]} elevation={2}>
            <Text variant="headlineLarge" style={[styles.brandText, { color: theme.colors.primary }]}>
              Dyanpitt
            </Text>
            <Text variant="titleMedium" style={[styles.tagline, { color: theme.colors.onPrimaryContainer }]}>
              ज्ञानपित्त - Your Study Sanctuary
            </Text>
          </Surface>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text variant="headlineSmall" style={[styles.welcomeTitle, { color: theme.colors.onBackground }]}>
            Welcome to Dyanpitt
          </Text>
          <Text variant="bodyLarge" style={[styles.welcomeSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Book your perfect study space with premium amenities and peaceful environment
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>📚</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>Premium Study Rooms</Text>
          </View>
          <View style={styles.feature}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>🪑</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>Comfortable Seating</Text>
          </View>
          <View style={styles.feature}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>🌐</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>High-Speed WiFi</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Sign In
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Register')}
            style={[styles.secondaryButton, { borderColor: theme.colors.outline }]}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
          >
            Create Account
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  brandText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    textAlign: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 48,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  buttonSection: {
    gap: 16,
  },
  primaryButton: {
    borderRadius: 12,
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});