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
              <Text style={styles.sectionTitle}>{title}</Text>
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
          <EmptyState message="No events scheduled. Tap the '+' button to create one!" />
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
    backgroundColor: '#F8F8F8',
  },
  sectionHeader: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  deleteAction: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  deleteActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyList: {
    flex: 1,
  },
}); 