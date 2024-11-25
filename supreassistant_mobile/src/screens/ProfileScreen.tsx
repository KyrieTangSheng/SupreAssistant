import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { profileService } from '../services/profileService';
import { colors, spacing, typography } from '../themes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

export const ProfileScreen = ({ navigation }: Props) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await profileService.getProfile();
      setName(userData.username);
      setEmail(userData.email);
      setPhone(userData.phone || '');
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  const handleSave = async (field: string, value: string) => {
    try {
      const updateData = {
        [field]: value
      };
      await profileService.updateProfile(updateData);
      setIsEditing(null);
      loadUserProfile(); // Reload to ensure we have the latest data
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const renderItem = (label: string, value: string, field: string) => {
    if (isEditing === field) {
      return (
        <View style={styles.item}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => {
              switch (field) {
                case 'name': setName(text); break;
                case 'phone': setPhone(text); break;
              }
            }}
            autoFocus
            onBlur={() => handleSave(field, value)}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.item}
        onPress={() => {
          if (field !== 'email') { // Email can't be edited
            setIsEditing(field);
          }
        }}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || 'Not set'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <View style={styles.group}>
          {renderItem('Name', name, 'name')}
          {renderItem('Email', email, 'email')}
        </View>
      </View>
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
  label: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '400',
  },
  value: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '400',
  },
  input: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'right',
    flex: 1,
    fontWeight: '400',
  },
});
