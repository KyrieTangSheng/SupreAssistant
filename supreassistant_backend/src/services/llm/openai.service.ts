import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { AIResponse } from '../../types/companion.types';
import { CreateEventData } from '../../types/event.types';
import { CreateNoteData } from '../../types/note.types';

const IntentSchema = z.object({
  intent: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("addEvent"),
      event: z.object({
        title: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        description: z.string(),
        location: z.string(),
      }),
    }),
    z.object({
      type: z.literal("addNote"),
      note: z.object({
        title: z.string(),
        content: z.string(),
      }),
    }),
    z.object({
      type: z.literal("generalQuery"),
      query: z.string(),
    }),
  ]),
});

export class OpenAIProvider {
  private openai: OpenAI;
  private MODEL_NAME = process.env.OPENAI_MODEL_NAME || 'gpt-4o';

  constructor() {
    this.openai = new OpenAI();
  }

  async generateResponse(messages: Array<{ role: string; content: string }>): Promise<AIResponse> {
    try {
      const completion = await this.openai.beta.chat.completions.parse({
        model: this.MODEL_NAME,
        messages: messages as ChatCompletionMessageParam[],
        response_format: zodResponseFormat(IntentSchema, 'intent')
      });

      const parsedIntent = completion.choices[0].message.parsed;

      if (parsedIntent && parsedIntent.intent.type === 'addEvent') {
        console.log('add_event', parsedIntent.intent.event);
        const responseContent = `Event added: ${parsedIntent.intent.event.title} at ${parsedIntent.intent.event.location} on ${parsedIntent.intent.event.startTime} to ${parsedIntent.intent.event.endTime}; Details: ${parsedIntent.intent.event.description}`;
        return ({
          intent: 'addEvent',
          event: parsedIntent.intent.event as CreateEventData,
          content: responseContent
        });
      } else if (parsedIntent && parsedIntent.intent.type === 'addNote') {
        console.log('add_note', parsedIntent.intent.note);
        const responseContent = `Note added: ${parsedIntent.intent.note.title}; Details: ${parsedIntent.intent.note.content}`;
        return ({
          intent: 'addNote',
          note: parsedIntent.intent.note as CreateNoteData,
          content: responseContent
        });
      } else if (parsedIntent && parsedIntent.intent.type === 'generalQuery') {
        console.log('general_query', parsedIntent.intent.query);
        const response = await this.openai.chat.completions.create({
          model: this.MODEL_NAME,
          messages: messages as ChatCompletionMessageParam[],
        });
        const responseContent = response.choices[0].message.content;
        return ({
          intent: 'generalQuery',
          content: responseContent || 'No response from AI'
        });
      } else { // fallback to general query
        const response = await this.openai.chat.completions.create({
          model: this.MODEL_NAME,
          messages: messages as ChatCompletionMessageParam[],
        });
        const responseContent = response.choices[0].message.content;
        return ({
          intent: 'generalQuery',
          content: responseContent || 'No response from AI'
        });
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
} 