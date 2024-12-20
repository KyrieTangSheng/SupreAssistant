import { CreateEventData } from "./event.types";
import { CreateNoteData } from "./note.types";

export interface AICompanion{
    id: string;
    userId: string;
    name?: string;
    model: string;
    personality?: string;
    createdAt: Date;
    updatedAt: Date;
    lastInteractionAt: Date;
    // Could include preferences, memory summaries, etc.
}

export interface Message {
    id: string;
    companionId: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    // Could add metadata like sentiment, topics, etc.
}

export interface Memory {
    id: string;
    companionId: string;
    type: 'fact' | 'preference' | 'experience' | 'summary';
    content: string;
    relevance: number;
    lastAccessed: Date;
    createdAt: Date;
} 

export interface AIResponse{
  intent: string;
  content: string;
  event?: CreateEventData;
  note?: CreateNoteData;
}
