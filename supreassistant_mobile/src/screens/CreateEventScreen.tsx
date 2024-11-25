import React, { useState } from 'react';
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
import { RootStackParamList } from '../types';
import { colors, spacing, typography } from '../themes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateEvent'>;
};

export const CreateEventScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreateEvent = async () => {
    try {
      const eventData = {
        title,
        description,
        location,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };

      await eventService.createEvent(eventData);
      Alert.alert('Success', 'Event created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Event Summary ✨</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Give your event a catchy title"
          placeholderTextColor={colors.input.placeholder}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>🗓 When</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Text style={styles.timeLabel}>Starts</Text>
            <Text style={styles.timeText}>{startTime.toLocaleString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Text style={styles.timeLabel}>Ends</Text>
            <Text style={styles.timeText}>{endTime.toLocaleString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>📍 Where</Text>
          <TextInput
            style={styles.locationInput}
            placeholder="Add location"
            placeholderTextColor={colors.input.placeholder}
            value={location}
            onChangeText={setLocation}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>✨ Details</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="What's this event about?"
          placeholderTextColor={colors.input.placeholder}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startTime}
          mode="datetime"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartTime(date);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endTime}
          mode="datetime"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndTime(date);
          }}
          minimumDate={startTime}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerLabel: {
    ...typography.footnote,
    color: colors.text.primary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  titleInput: {
    ...typography.title2,
    color: colors.text.primary,
    fontWeight: '600',
    padding: spacing.xs,
    backgroundColor: colors.input.background,
    borderRadius: spacing.sm,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: spacing.md,
    padding: spacing.lg,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  timeSection: {
    marginBottom: spacing.lg,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.input.background,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.sm,
  },
  timeLabel: {
    ...typography.footnote,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  timeText: {
    ...typography.callout,
    color: colors.primary,
    fontWeight: '500',
  },
  locationSection: {
    marginBottom: spacing.sm,
  },
  locationInput: {
    ...typography.body,
    color: colors.text.primary,
    backgroundColor: colors.input.background,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.sm,
    fontWeight: '400',
  },
  descriptionInput: {
    ...typography.body,
    color: colors.text.primary,
    backgroundColor: colors.input.background,
    padding: spacing.md,
    borderRadius: spacing.sm,
    height: spacing.xxl * 4,
    textAlignVertical: 'top',
    fontWeight: '400',
  },
}); 