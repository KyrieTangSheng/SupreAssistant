import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, typography } from '../themes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

export const SettingsScreen = ({ navigation }: Props) => {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.group}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.itemText}>Profile</Text>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>App</Text>
        <View style={styles.group}>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.group}>
          <TouchableOpacity 
            style={styles.item}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    ...typography.footnote,
    color: colors.text.secondary,
    marginLeft: spacing.lg,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  group: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.light,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: spacing.xl + spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.light,
  },
  itemText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '400',
  },
  chevron: {
    color: colors.text.tertiary,
    ...typography.body,
    fontWeight: '300',
  },
  logoutText: {
    color: colors.danger,
    ...typography.body,
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
  },
  version: {
    color: colors.text.secondary,
    ...typography.caption1,
    textAlign: 'center',
    marginTop: spacing.xl + spacing.lg,
    marginBottom: spacing.lg,
    fontWeight: '400',
  },
});