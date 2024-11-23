import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { eventService } from '../services/eventService';
import { Event } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EventDetails'>;
  route: RouteProp<RootStackParamList, 'EventDetails'>;
};

export const EventDetailsScreen = ({ navigation, route }: Props) => {
  const [event, setEvent] = useState<Event | null>(null);
  const { eventId } = route.params;

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const eventData = await eventService.getEvent(eventId);
      setEvent(eventData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch event details');
      navigation.goBack();
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await eventService.deleteEvent(eventId);
              Alert.alert('Success', 'Event deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete event');
            }
          },
        },
      ]
    );
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      
      <View style={styles.timeContainer}>
        <Text style={styles.label}>Start Time:</Text>
        <Text style={styles.value}>
          {new Date(event.startTime).toLocaleString()}
        </Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.label}>End Time:</Text>
        <Text style={styles.value}>
          {new Date(event.endTime).toLocaleString()}
        </Text>
      </View>

      {event.location && (
        <View style={styles.section}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{event.location}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditEvent', { eventId })}
        >
          <Text style={styles.buttonText}>Edit Event</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeContainer: {
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 