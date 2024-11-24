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
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>Last updated: {formatDate(note.updatedAt)}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {note.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
});