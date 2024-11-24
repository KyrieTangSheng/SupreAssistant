import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { eventService } from '../services/eventService';
import { clearAuth, getAuthToken } from '../utils/auth';
import { RootStackParamList, Event } from '../types';
import { EventCard } from '../components/EventCard';
import { companionService } from '../services/companionService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const initializeApp = async () => {
      const token = await getAuthToken();
      console.log('Token in HomeScreen:', token);
      if (token) {
        await companionService.updateCompanion();
        fetchUpcomingEvents();
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUpcomingEvents();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchUpcomingEvents = async () => {
    try {
      const events = await eventService.getUserEvents();
      const now = new Date();
      const future = events
        .filter(event => new Date(event.startTime) > now)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
        .slice(0, 2);
      
      setUpcomingEvents(future);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events');
    }
  };

  const handleLogout = async () => {
    await clearAuth();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Supre Assistant</Text>
      
      <View style={styles.eventsSection}>
        <View style={styles.eventHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {upcomingEvents.map(event => (
          <TouchableOpacity 
            key={event.id} 
            onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
          >
            <EventCard key={event.id} event={event} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Companion')}
      >
        <Text style={styles.buttonText}>Chat with AI Assistant</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Notes')}
      >
        <Text style={styles.buttonText}>View Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventsSection: {
    marginBottom: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 14,
  }
}); 