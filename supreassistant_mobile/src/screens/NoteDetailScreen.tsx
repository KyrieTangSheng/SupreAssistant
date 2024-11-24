import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { noteId } = route.params;

  useEffect(() => {
    fetchNoteDetails();
  }, [noteId]);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      handleSave();
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [title, content]);

  const fetchNoteDetails = async () => {
    try {
      const note = await noteService.getNote(noteId);
      setTitle(note.title);
      setContent(note.content);
    } catch (error) {
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    if (!title && !content) return;
    
    try {
      await noteService.updateNote(noteId, {
        title,
        content,
      });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.contentInput}
        placeholder="Note"
        value={content}
        onChangeText={setContent}
        multiline
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    textAlignVertical: 'top',
  },
});