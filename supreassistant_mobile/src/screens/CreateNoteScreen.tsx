import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { noteService } from '../services/noteService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateNote'>;
};

export const CreateNoteScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = async () => {
    try {
      const noteData = {
        title,
        content,
      };

      await noteService.createNote(noteData);
      Alert.alert('Success', 'Note created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create note');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Note</Text>
      
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
        style={styles.createButton}
        onPress={handleCreateNote}
      >
        <Text style={styles.buttonText}>Create Note</Text>
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
  createButton: {
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