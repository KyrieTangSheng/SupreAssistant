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
import { colors, spacing } from '../themes';

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

  const handleDelete = async (noteId: string) => {
    try {
      await noteService.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  const renderRightActions = (noteId: string) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => handleDelete(noteId)}
    >
      <Text style={styles.deleteActionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Note }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      rightThreshold={40}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('NoteDetails', { noteId: item.id })}
        style={styles.noteCard}
      >
        <View style={styles.noteContent}>
          <Text style={styles.noteTitle} numberOfLines={1}>
            {item.title || 'Untitled Note'}
          </Text>
          <Text style={styles.notePreview} numberOfLines={2}>
            {item.content}
          </Text>
          <View style={styles.noteFooter}>
            <Text style={styles.noteDate}>
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>My Notes ✍️</Text>
        <Text style={styles.headerCount}>{notes.length} notes</Text>
      </View>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          notes.length === 0 && styles.emptyList
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState 
            message="Start capturing your thoughts! ✨" 
          />
        }
      />
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  headerCount: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  noteCard: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    paddingVertical: spacing.md,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  notePreview: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  noteDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
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
  emptyList: {
    flex: 1,
  },
});