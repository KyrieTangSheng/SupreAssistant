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
          
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.itemText}>Notifications</Text>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>App</Text>
        <View style={styles.group}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.itemText}>About</Text>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('Privacy')}
          >
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('Terms')}
          >
            <Text style={styles.itemText}>Terms of Service</Text>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
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
  itemText: {
    fontSize: 17,
    flex: 1,
    color: '#000',
  },
  chevron: {
    color: '#C7C7CC',
    fontSize: 20,
    fontWeight: '300',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 17,
    textAlign: 'center',
    width: '100%',
  },
  version: {
    color: '#6b6b6b',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
});