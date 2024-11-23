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
  };
  
  export interface Message {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
  }