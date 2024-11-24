export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
  
export interface AuthResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Events: undefined;
  CreateEvent: undefined;
  EventDetails: { eventId: string };
  EditEvent: { eventId: string };
  Companion: undefined;
  Notes: undefined;
  CreateNote: undefined;
  NoteDetails: { noteId: string };
  EditNote: { noteId: string };
};
  
export interface Message {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
