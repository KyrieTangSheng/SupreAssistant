import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export const HeaderAddButton = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
  },
  text: {
    color: '#007AFF',
    fontSize: 28,
    fontWeight: '300',
  },
});