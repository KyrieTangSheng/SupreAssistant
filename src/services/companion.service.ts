import { Companion } from '../models/companion.model';
import { Message } from '../models/message.model';
import { OpenAIProvider } from './llm/openai.service';
import { GoogleProvider } from './llm/google.service';
import { DatabaseError, NotFoundError } from '../utils/errors';

export class CompanionService {
  private llmProvider: OpenAIProvider | GoogleProvider;

  constructor() {
    // this.llmProvider = new OpenAIProvider(); 
    this.llmProvider = new GoogleProvider();
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

  async chat(userId: string, message: string): Promise<Message> {
    try {
      const companion = await this.getOrCreateCompanion(userId);
      
      // Get recent message history
      const recentMessages = await Message.findAll({
        where: { companionId: companion.id },
        order: [['createdAt', 'DESC']],
        limit: 10
      });

      // Format messages for OpenAI or Google LLM
      const messages = [
        { role: 'system', content: companion.systemPrompt },
        ...recentMessages.reverse().map(m => ({
          role: m.role,
          content: m.content
        })),
        { role: 'user', content: message }
      ];

      // Get AI response
      const aiResponse = await this.llmProvider.generateResponse(messages);

      // Save user message
      await Message.create({
        companionId: companion.id,
        content: message,
        role: 'user'
      });

      // Save AI response
      const responseMessage = await Message.create({
        companionId: companion.id,
        content: aiResponse,
        role: 'assistant'
      });

      // Update last interaction time
      await companion.update({ lastInteractionAt: new Date() });

      return responseMessage;
    } catch (error) {
      throw new DatabaseError('Error processing chat message');
    }
  }
} 