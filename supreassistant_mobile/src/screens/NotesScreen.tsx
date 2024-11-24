import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { NoteCard } from '../components/NoteCard';
import { noteService } from '../services/noteService';
import { Note } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notes'>;
};

export const NotesScreen = ({ navigation }: Props) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await noteService.getUserNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch notes');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.newNoteButton}
        onPress={() => navigation.navigate('CreateNote')}
      >
        <Text style={styles.newNoteButtonText}>+ New Note</Text>
      </TouchableOpacity>

      <ScrollView>
        {notes.map(note => (
          <TouchableOpacity
            key={note.id}
            onPress={() => navigation.navigate('NoteDetails', { noteId: note.id })}
          >
            <NoteCard note={note} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  newNoteButton: {
    padding: 10,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  newNoteButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});