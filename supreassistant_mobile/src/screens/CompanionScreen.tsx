import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Message } from '../types';
import { companionService } from '../services/companionService';
import { colors, spacing, layout, typography } from '../themes';

export const CompanionScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToOffset({ 
        offset: contentHeight,
        animated: true 
      });
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, contentHeight]);

  const loadMessages = async () => {
    try {
      const history = await companionService.getChatHistory();
      setMessages(history.reverse());
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newUserMessage = {
      role: 'user',
      content: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage as Message]);
    setInputText('');

    try {
      const response = await companionService.sendMessage(inputText);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.role === 'user' ? styles.userMessage : styles.assistantMessage
    ]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted={false}
        onContentSizeChange={(w, h) => {
          setContentHeight(h);
        }}
        onLayout={scrollToBottom}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messageList: {
    flex: 1,
    padding: spacing.sm,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: layout.borderRadius.large,
    marginVertical: spacing.xs,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.input.background,
  },
  messageText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  input: {
    flex: 1,
    marginRight: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.input.background,
    borderRadius: layout.borderRadius.large,
    maxHeight: spacing.xxl * 2,
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '400',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  sendButtonText: {
    color: colors.primary,
    ...typography.body,
    fontWeight: '600',
  },
  messageListContent: {
    flexGrow: 1,
    paddingBottom: spacing.sm,
  }
}); 