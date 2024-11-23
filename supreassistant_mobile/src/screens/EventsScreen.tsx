import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';
import { RootStackParamList } from '../types';
import { Event } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Events'>;
};

export const EventsScreen = ({ navigation }: Props) => {
  const [futureEvents, setFutureEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEvents();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getUserEvents();
      const now = new Date();
      
      const future = response.filter(event => new Date(event.startTime) > now)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      
      const past = response.filter(event => new Date(event.startTime) <= now)
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

      setFutureEvents(future);
      setPastEvents(past);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events');
    }
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetails', { eventId });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('CreateEvent')}
        style={styles.newEventButton}
      >
        <Text style={styles.newEventButtonText}>+ New Event</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      {futureEvents.map(event => (
        <TouchableOpacity 
          key={event.id} 
          onPress={() => handleEventPress(event.id)}
        >
          <EventCard event={event} />
        </TouchableOpacity>
      ))}
      
      <Text style={styles.sectionTitle}>Past Events</Text>
      {pastEvents.map(event => (
        <TouchableOpacity 
          key={event.id} 
          onPress={() => handleEventPress(event.id)}
        >
          <EventCard event={event} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  newEventButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  newEventButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 