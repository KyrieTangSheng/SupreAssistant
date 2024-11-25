import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SectionList,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { EventCard } from '../components/EventCard';
import { eventService } from '../services/eventService';
import { Event } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Swipeable } from 'react-native-gesture-handler';
import { colors, layout, spacing, typography } from '../themes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Events'>;
};

type Section = {
  title: string;
  data: Event[];
};

export const EventsScreen = ({ navigation }: Props) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEvents(false);
    });

    return unsubscribe;
  }, [navigation]);

  const fetchEvents = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await eventService.getUserEvents();
      const now = new Date();
      
      const future = response.filter(event => new Date(event.startTime) > now)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      
      const past = response.filter(event => new Date(event.startTime) <= now)
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

      setSections([
        { title: 'Upcoming Events', data: future },
        { title: 'Past Events', data: past },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchEvents(false);
    setIsRefreshing(false);
  };

  const handleDelete = async (eventId: string) => {
    try {
      await eventService.deleteEvent(eventId);
      await fetchEvents(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  const renderRightActions = (eventId: string) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => handleDelete(eventId)}
    >
      <Text style={styles.deleteActionText}>Delete</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetails', { eventId });
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity onPress={() => handleEventPress(item.id)}>
              <EventCard event={item} />
            </TouchableOpacity>
          </Swipeable>
        )}
        renderSectionHeader={({ section: { title, data } }) => (
          data.length > 0 ? (
            <View style={styles.sectionHeader}>
              {title === 'Upcoming Events' ? (
                <Text style={styles.sectionTitle}>Coming Up ⭐️</Text>
              ) : (
                <Text style={styles.sectionTitle}>Memory Lane 🌟</Text>
              )}
            </View>
          ) : null
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <EmptyState 
            message="Time to plan something exciting! ✨ Tap '+' to create your first event." 
          />
        }
        stickySectionHeadersEnabled={true}
        contentContainerStyle={sections[0].data.length === 0 && sections[1].data.length === 0 ? styles.emptyList : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.primary,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  deleteAction: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: spacing.md,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.md,
    borderRadius: layout.borderRadius.medium,
  },
  deleteActionText: {
    color: colors.text.inverse,
    ...typography.footnote,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  emptyList: {
    flex: 1,
  },
}); 