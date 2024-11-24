import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { noteService } from '../services/noteService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditNote'>;
  route: RouteProp<RootStackParamList, 'EditNote'>;
};

export const EditNoteScreen = ({ navigation, route }: Props) => {
  const { noteId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNoteDetails();
  }, []);

  const fetchNoteDetails = async () => {
    try {
      const note = await noteService.getNote(noteId);
      setTitle(note.title);
      setContent(note.content);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch note details');
      navigation.goBack();
    }
  };

  const handleUpdateNote = async () => {
    try {
      const noteData = {
        title,
        content,
      };
      await noteService.updateNote(noteId, noteData);
      Alert.alert('Success', 'Note updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update note');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Note Content"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity 
        style={styles.updateButton}
        onPress={handleUpdateNote}
      >
        <Text style={styles.buttonText}>Update Note</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});