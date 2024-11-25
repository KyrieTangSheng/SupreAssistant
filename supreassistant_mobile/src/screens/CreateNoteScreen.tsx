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
import { colors, spacing, typography, layout, shadows } from '../themes';

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
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Note Summary ✨</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Give your note a title"
          placeholderTextColor={colors.input.placeholder}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📝 Content</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Start writing your thoughts..."
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