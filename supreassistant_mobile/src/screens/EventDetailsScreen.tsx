import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { eventService } from '../services/eventService';
import { Event } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EventDetails'>;
  route: RouteProp<RootStackParamList, 'EventDetails'>;
};

export const EventDetailsScreen = ({ navigation, route }: Props) => {
  const { eventId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  // Auto-save when fields change
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (!isLoading) {
        handleSave();
      }
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [title, description, location, startTime, endTime]);

  const fetchEventDetails = async () => {
    try {
      const event = await eventService.getEvent(eventId);
      setTitle(event.title);
      setDescription(event.description);
      setLocation(event.location || '');
      setStartTime(new Date(event.startTime));
      setEndTime(new Date(event.endTime));
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch event details');
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    try {
      await eventService.updateEvent(eventId, {
        title,
        description,
        location,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const onStartTimeChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartTime(selectedDate);
      if (selectedDate > endTime) {
        const newEndTime = new Date(selectedDate);
        newEndTime.setHours(selectedDate.getHours() + 1);
        setEndTime(newEndTime);
      }
    }
  };

  const onEndTimeChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) {
      if (selectedDate > startTime) {
        setEndTime(selectedDate);
      } else {
        Alert.alert('Invalid Time', 'End time must be after start time');
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.timeSection}>
        <Text style={styles.label}>Start Time</Text>
        <Text 
          style={styles.timeText}
          onPress={() => setShowStartPicker(true)}
        >
          {startTime.toLocaleString()}
        </Text>
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="datetime"
            onChange={onStartTimeChange}
          />
        )}
      </View>

      <View style={styles.timeSection}>
        <Text style={styles.label}>End Time</Text>
        <Text 
          style={styles.timeText}
          onPress={() => setShowEndPicker(true)}
        >
          {endTime.toLocaleString()}
        </Text>
        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="datetime"
            onChange={onEndTimeChange}
            minimumDate={startTime}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Location (optional)"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  timeSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#007AFF',
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
}); 