import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { EventCard } from '../components/EventCard';
import { eventService } from '../services/eventService';
import { Event } from '../types';
import { colors, spacing, typography, layout, shadows } from '../themes';
import { noteService } from '../services/noteService';
import { Note } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUpcomingEvents();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchRecentNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRecentNotes();
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

  const fetchRecentNotes = async () => {
    try {
      const notes = await noteService.getUserNotes();
      const recent = notes
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 2);
      setRecentNotes(recent);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Command Center ⚡️</Text>
        <Text style={styles.sectionSubtitle}>What's on your mind today?</Text>
        <View style={styles.buttonGroup}>
          <View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Events')}
            >
              <Text style={styles.buttonIcon}>📅</Text>
              <Text style={styles.buttonTitle}>Plan Your Day 📅</Text>
              <Text style={styles.buttonSubtitle}>Events & Tasks</Text>
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

          <View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Notes')}
            >
              <Text style={styles.buttonIcon}>📝</Text>
              <Text style={styles.buttonTitle}>Smart Notes 💡</Text>
              <Text style={styles.buttonSubtitle}>Notes & Ideas</Text>
            </TouchableOpacity>
            {recentNotes.length > 0 && (
              <View style={styles.previewContainer}>
                {recentNotes.map(note => (
                  <TouchableOpacity
                    key={note.id}
                    onPress={() => navigation.navigate('NoteDetails', { noteId: note.id })}
                    style={styles.previewCard}
                  >
                    <View style={styles.previewCardInner}>
                      <Text style={styles.previewIcon}>🔖</Text>
                      <Text style={styles.previewTitle} numberOfLines={1}>
                        {note.title || 'Untitled Note'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Companion')}
          >
            <Text style={styles.buttonIcon}>🤖</Text>
            <Text style={styles.buttonTitle}>Chat with AI Assistant🤖</Text>
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
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.title2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  sectionSubtitle: {
    ...typography.callout,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  buttonGroup: {
    gap: spacing.sm,
  },
  button: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  buttonIcon: {
    fontSize: spacing.lg,
    marginRight: spacing.sm,
    color: colors.primary,
  },
  buttonTitle: {
    ...typography.callout,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  buttonSubtitle: {
    ...typography.caption1,
    color: colors.text.secondary,
    marginLeft: 'auto',
    fontWeight: '500',
  },
  previewContainer: {
    marginTop: spacing.xs,
    marginLeft: spacing.xl,
    borderLeftWidth: 1,
    borderLeftColor: colors.border.light,
    paddingLeft: spacing.sm,
  },
  previewCard: {
    marginVertical: spacing.xs,
  },
  previewCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.xs,
    borderRadius: layout.borderRadius.small,
    ...shadows.small,
  },
  previewIcon: {
    fontSize: 12,
    marginRight: spacing.xs,
  },
  previewTitle: {
    ...typography.footnote,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  viewAllButton: {
    padding: spacing.xs,
  },
  viewAllText: {
    color: colors.primary,
    ...typography.footnote,
    fontWeight: '500',
  },
}); 