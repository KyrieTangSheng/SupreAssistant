import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { authService } from '../services/authService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, layout, shadows } from '../themes';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: { navigation: RegisterScreenNavigationProp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await authService.register(username, email, password);
      Alert.alert(
        'Success',
        'Registration successful! Please login with your credentials.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Join SupreAssistant 🚀</Text>
          <Text style={styles.subtitle}>Your journey to supreme productivity starts here</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  contentContainer: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subtitle: {
    ...typography.callout,
    color: colors.text.secondary,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.footnote,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    height: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: layout.borderRadius.medium,
    paddingHorizontal: spacing.md,
    ...typography.body,
    backgroundColor: colors.input.background,
    color: colors.text.primary,
    fontWeight: '400',
  },
  button: {
    height: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadows.small,
  },
  buttonDisabled: {
    backgroundColor: colors.text.tertiary,
  },
  buttonText: {
    color: colors.text.inverse,
    ...typography.callout,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.text.secondary,
    ...typography.footnote,
    fontWeight: '500',
  },
  linkText: {
    color: colors.primary,
    ...typography.footnote,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
}); 