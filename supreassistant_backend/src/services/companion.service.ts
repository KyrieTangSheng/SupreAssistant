import { Companion } from '../models/companion.model';
import { Message } from '../models/message.model';
import { OpenAIProvider } from './llm/openai.service';
import { GoogleProvider } from './llm/google.service';
import { DatabaseError, NotFoundError } from '../utils/errors';
import { EventService } from './event.service'
import { AIResponse } from '../types/companion.types';
import { NoteService } from './note.service';

export class CompanionService {
  private llmProvider: OpenAIProvider | GoogleProvider;
  private eventService: EventService;
  private noteService: NoteService;
  constructor() {
    this.llmProvider = new OpenAIProvider(); 
    // this.llmProvider = new GoogleProvider();
    this.eventService = new EventService();
    this.noteService = new NoteService();
  }

  async getOrCreateCompanion(userId: string): Promise<Companion> {
    try {
      let companion = await Companion.findOne({ where: { userId } });
      
      if (!companion) {
        companion = await Companion.create({ userId });
      }
      
      return companion;
    } catch (error) {
      throw new DatabaseError('Error getting/creating companion');
    }
  }

  async getUserInfo(userId: string): Promise<string> {
    try{
      const events = await this.eventService.getUserEvents(userId);
      const notes = await this.noteService.getUserNotes(userId);

      const eventsInfo = events.map(event => ({
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location
      }));
      const notesInfo = notes.map(note => ({
        title: note.title,
        content: note.content
      }));

      return JSON.stringify({
        events: eventsInfo,
        notes: notesInfo
      });
    } catch (error) {
      throw new DatabaseError('Error getting relevant user info');
    }
  }

  async chat(userId: string, message: string): Promise<Message> {
    try {
      const companion = await this.getOrCreateCompanion(userId);
      
      // Get recent message history
      const recentMessages = await Message.findAll({
        where: { companionId: companion.id },
        order: [['createdAt', 'DESC']],
        limit: 10
      });

      const userInfo = await this.getUserInfo(userId);
      
      // Format messages for OpenAI or Google LLM
      const messages = [
        { role: 'system', content: companion.systemPrompt },
        {role: 'system', content: 'Remember that today\'s date and time is ' + new Date().toLocaleString()},
        {role: 'system', content: userInfo},
        ...recentMessages.reverse().map(m => ({
          role: m.role,
          content: m.content
        })),
        { role: 'user', content: message }
      ];
      // Get AI response
      const aiResponse = await this.llmProvider.generateResponse(messages) as AIResponse;
      // If the AI response is to add an event, create the event
      // If the AI response is to add a note, create the note
      if (aiResponse && aiResponse.intent === 'addEvent' && aiResponse.event) {
        await this.eventService.createEvent(userId, aiResponse.event);
      } else if (aiResponse && aiResponse.intent === 'addNote' && aiResponse.note) {
        await this.noteService.createNote(userId, aiResponse.note);
      }

      // Save user message
      await Message.create({
        companionId: companion.id,
        content: message,
        role: 'user'
      });

      // Save AI response
      const responseMessage = await Message.create({
        companionId: companion.id,
        content: aiResponse.content,
        role: 'assistant'
      });

      // Update last interaction time
      await companion.update({ lastInteractionAt: new Date() });

      return responseMessage;
    } catch (error) {
      console.error(error);
      throw new DatabaseError('Error processing chat message');
    }
  }
} 