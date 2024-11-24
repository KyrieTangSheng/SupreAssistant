import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { noteService } from '../services/noteService';
import { Note } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NoteDetails'>;
  route: RouteProp<RootStackParamList, 'NoteDetails'>;
};

export const NoteDetailsScreen = ({ navigation, route }: Props) => {
  const [note, setNote] = useState<Note | null>(null);
  const { noteId } = route.params;

  useEffect(() => {
    fetchNoteDetails();
  }, [noteId]);

  const fetchNoteDetails = async () => {
    try {
      const noteData = await noteService.getNote(noteId);
      setNote(noteData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch note details');
      navigation.goBack();
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await noteService.deleteNote(noteId);
              Alert.alert('Success', 'Note deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete note');
            }
          },
        },
      ]
    );
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      
      <Text style={styles.content}>{note.content}</Text>
      
      <Text style={styles.date}>
        Last updated: {new Date(note.updatedAt).toLocaleDateString()}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditNote', { noteId })}
        >
          <Text style={styles.buttonText}>Edit Note</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Note</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});