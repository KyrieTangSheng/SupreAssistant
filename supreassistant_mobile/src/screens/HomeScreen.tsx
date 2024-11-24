import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { EventCard } from '../components/EventCard';
import { eventService } from '../services/eventService';
import { Event } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchUpcomingEvents();
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
      const upcoming = events
        .filter(event => new Date(event.startTime) > now)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
        .slice(0, 2); // Reduced to 2 for better visual balance
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.buttonGroup}>
          <View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Events')}
            >
              <Text style={styles.buttonIcon}>📅</Text>
              <Text style={styles.buttonTitle}>Events</Text>
              <Text style={styles.buttonSubtitle}>View your schedule</Text>
            </TouchableOpacity>
            {upcomingEvents.length > 0 && (
              <View style={styles.previewContainer}>
                {upcomingEvents.map(event => (
                  <TouchableOpacity
                    key={event.id}
                    onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
                    style={styles.previewCard}
                  >
                    <EventCard event={event} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Notes')}
          >
            <Text style={styles.buttonIcon}>📝</Text>
            <Text style={styles.buttonTitle}>Notes</Text>
            <Text style={styles.buttonSubtitle}>Capture your thoughts</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Companion')}
          >
            <Text style={styles.buttonIcon}>🤖</Text>
            <Text style={styles.buttonTitle}>AI Companion</Text>
            <Text style={styles.buttonSubtitle}>Get assistance</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.buttonIcon}>⚙️</Text>
            <Text style={styles.buttonTitle}>Settings</Text>
            <Text style={styles.buttonSubtitle}>Manage your account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    marginLeft: 4,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.5,
    elevation: 2,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 'auto',
  },
  previewContainer: {
    marginTop: 1,
    marginLeft: 32,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E5E5',
    paddingLeft: 12,
  },
  previewCard: {
    marginVertical: 6,
  },
  viewAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
}); 