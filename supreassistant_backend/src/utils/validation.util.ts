import { CreateEventData } from '../types/event.types';
import { CreateNoteData } from '../types/note.types';

export const validateEvent = (data: CreateEventData): string | null => {
  if (!data.title || data.title.trim().length < 3) {
    return 'Title must be at least 3 characters long';
  }

  if (!data.description) {
    return 'Description is required';
  }

  if (!data.startTime || !data.endTime) {
    return 'Start time and end time are required';
  }

  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return 'Invalid date format';
  }

  if (startTime >= endTime) {
    return 'End time must be after start time';
  }

  return null;
};

interface RegistrationData {
  email: string;
  password: string;
  username: string;
}

export const validateRegistration = (data: RegistrationData): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!data.email || !emailRegex.test(data.email)) {
    return 'Please enter a valid email address';
  }

  if (!data.username || data.username.trim().length < 3) {
    return 'Username must be at least 3 characters long';
  }

  if (!data.password || data.password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return null;
};

interface LoginData {
  email: string;
  password: string;
}

export const validateLogin = (data: LoginData): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    return 'Please enter a valid email address';
  }

  if (!data.password || data.password.length < 1) {
    return 'Password is required';
  }

  return null;
};

export const validateChatMessage = (message: any): string | null => {
  if (!message || typeof message !== 'string') {
    return 'Message must be a non-empty string';
  }
  
  if (message.length > 4000) {
    return 'Message is too long (max 4000 characters)';
  }

  return null;
};

export const validateCompanionUpdate = (data: any): string | null => {
  const { name, systemPrompt, model } = data;

  if (name && (typeof name !== 'string' || name.length < 1 || name.length > 50)) {
    return 'Name must be between 1 and 50 characters';
  }

  if (systemPrompt && (typeof systemPrompt !== 'string' || systemPrompt.length > 1000)) {
    return 'System prompt must be a string of max 1000 characters';
  }

  const allowedModels = ['gpt-4', 'gpt-3.5-turbo'];
  if (model && !allowedModels.includes(model)) {
    return 'Invalid model specified';
  }

  return null;
};

export const validateNote = (data: CreateNoteData): string | null => {
  if (!data.title || data.title.trim().length < 1) {
    return 'Title is required';
  }

  if (!data.content) {
    return 'Content is required';
  }

  return null;
}; 