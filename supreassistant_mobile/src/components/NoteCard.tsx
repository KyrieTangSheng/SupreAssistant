import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../types';

interface Props {
  note: Note;
}

export const NoteCard = ({ note }: Props) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || 'Untitled Note'}
        </Text>
        <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>
      </View>
      <Text style={styles.content} numberOfLines={2}>
        {note.content || 'No content'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 13,
    color: '#8E8E93',
  },
  content: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
  },
});