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
    backgroundColor: '#F2F2F7',
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b6b6b',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  group: {
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#c8c8c8',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c8c8c8',
  },
  label: {
    fontSize: 17,
    flex: 1,
    color: '#000',
  },
  value: {
    fontSize: 17,
    color: '#8E8E93',
  },
  input: {
    fontSize: 17,
    color: '#000',
    textAlign: 'right',
    flex: 1,
  },
});
