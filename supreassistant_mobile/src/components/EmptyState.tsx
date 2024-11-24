import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  message: string;
  icon?: string; // You can add icon support later
};

export const EmptyState = ({ message }: Props) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});