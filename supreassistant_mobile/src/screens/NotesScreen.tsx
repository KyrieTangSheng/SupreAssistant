import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { NoteCard } from '../components/NoteCard';
import { noteService } from '../services/noteService';
import { Note } from '../types';
import { Swipeable } from 'react-native-gesture-handler';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notes'>;
};

export const NotesScreen = ({ navigation }: Props) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchNotes = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const fetchedNotes = await noteService.getUserNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotes(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDelete = async (noteId: string) => {
    try {
      await noteService.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  const renderRightActions = (noteId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => handleDelete(noteId)}
      >
        <Text style={styles.deleteActionText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: Note }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      rightThreshold={40}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('NoteDetails', { noteId: item.id })}
        style={styles.noteItem}
      >
        <NoteCard note={item} />
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={notes.length === 0 ? styles.emptyList : undefined}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <EmptyState message="No notes yet. Tap the '+' button to create one!" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  noteItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  emptyList: {
    flex: 1,
  },
  deleteAction: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    marginVertical: 8,
  },
  deleteActionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});