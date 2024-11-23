import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { eventService } from '../services/eventService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditEvent'>;
  route: RouteProp<RootStackParamList, 'EditEvent'>;
};

export const EditEventScreen = ({ navigation, route }: Props) => {
  const { eventId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const event = await eventService.getEvent(eventId);
      setTitle(event.title);
      setDescription(event.description);
      setLocation(event.location || '');
      setStartTime(new Date(event.startTime));
      setEndTime(new Date(event.endTime));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch event details');
      navigation.goBack();
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const eventData = {
        title,
        description,
        location,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };
      await eventService.updateEvent(eventId, eventData);
      Alert.alert('Success', 'Event updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update event');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Start Time</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <Text style={styles.datePickerText}>
            {startTime.toLocaleString()}
          </Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setStartTime(selectedDate);
                setShowStartPicker(false);
              }
            }}
          />
        )}
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>End Time</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)}>
          <Text style={styles.datePickerText}>
            {endTime.toLocaleString()}
          </Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setEndTime(selectedDate);
                setShowEndPicker(false);
              }
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
        <Text style={styles.buttonText}>Update Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePickerText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 