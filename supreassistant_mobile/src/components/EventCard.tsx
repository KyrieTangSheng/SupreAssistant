import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event } from '../types';

interface Props {
  event: Event;
}

export const EventCard = ({ event }: Props) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.timeContainer}>
        <Text style={styles.date}>{formatDate(event.startTime)}</Text>
        <Text style={styles.time}>
          {formatTime(event.startTime)} - {formatTime(event.endTime)}
        </Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        {event.location && (
          <Text style={styles.location} numberOfLines={1}>
            📍 {event.location}
          </Text>
        )}
        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  timeContainer: {
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: '#666',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 