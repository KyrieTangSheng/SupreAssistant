import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { colors, typography, spacing, layout } from '../themes';
import { authService } from '../services/authService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setAuthToken } from '../utils/auth';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      await setAuthToken(response.token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaViewContext style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome to SupreAssistant 👋</Text>
            <Text style={styles.title}>Your Ultimate{'\n'}Digital Partner</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <View style={[styles.inputWrapper, styles.topInput]}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholderTextColor={colors.input.placeholder}
                />
              </View>
              
              <View style={[styles.inputWrapper, styles.bottomInput]}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="password"
                  placeholderTextColor={colors.input.placeholder}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.linkText}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaViewContext>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  headerContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  welcomeText: {
    ...typography.callout,
    color: colors.primary,
    marginBottom: spacing.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    ...typography.title1,
    color: colors.text.primary,
    lineHeight: spacing.xl,
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    backgroundColor: colors.input.background,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
  },
  inputWrapper: {
    padding: spacing.md,
  },
  topInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text.secondary,
  },
  bottomInput: {
    // No border for bottom input
  },
  label: {
    ...typography.footnote,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    ...typography.body,
    color: colors.text.primary,
    padding: 0,
    height: spacing.xl,
    fontWeight: '400',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    color: colors.primary,
    ...typography.footnote,
    fontWeight: '500',
  },
  button: {
    height: spacing.xxl,
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: spacing.xs,
    },
    shadowOpacity: 0.2,
    shadowRadius: spacing.md,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.text.inverse,
    ...typography.body,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
  },
  footerText: {
    color: colors.text.secondary,
    ...typography.footnote,
    fontWeight: '400',
  },
  linkText: {
    color: colors.primary,
    ...typography.footnote,
    fontWeight: '600',
  },
});