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
import { noteService } from '../services/noteService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, spacing, typography, layout, shadows } from '../themes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateNote'>;
};

export const CreateNoteScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) {
      if (title.trim() && content.trim()) {
        createNote();
      }
      return;
    }

    const saveTimeout = setTimeout(() => {
      handleSave();
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [title, content, noteId]);

  const createNote = async () => {
    try {
      const newNote = await noteService.createNote({
        title: title.trim(),
        content: content.trim(),
      });
      setNoteId(newNote.id);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleSave = async () => {
    if (!noteId || !title.trim() || !content.trim()) return;
    
    try {
      await noteService.updateNote(noteId, {
        title: title.trim(),
        content: content.trim(),
      });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>New Note ✨</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Title (required)"
          placeholderTextColor={colors.input.placeholder}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📝 Content</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Write your note here (required)"
          placeholderTextColor={colors.input.placeholder}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </View>
    </ScrollView>
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
  },
  headerLabel: {
    ...typography.footnote,
    color: colors.text.primary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  titleInput: {
    ...typography.title2,
    color: colors.text.primary,
    fontWeight: '600',
    padding: spacing.xs,
    backgroundColor: colors.input.background,
    borderRadius: spacing.sm,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: spacing.md,
    padding: spacing.lg,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  contentInput: {
    ...typography.body,
    color: colors.text.primary,
    backgroundColor: colors.input.background,
    padding: spacing.md,
    borderRadius: spacing.sm,
    minHeight: spacing.xxl * 8,
    maxHeight: spacing.xxl * 12,
    fontWeight: '400',
  },
});