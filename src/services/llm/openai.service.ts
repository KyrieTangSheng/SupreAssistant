import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export class OpenAIProvider {
  private openai: OpenAI;
  private MODEL_NAME = process.env.OPENAI_MODEL_NAME || 'gpt-4o';

  constructor() {
    this.openai = new OpenAI();
  }

  async generateResponse(messages: Array<{ role: string; content: string }>) {
    console.log('messages', messages);
    await this.openai.chat.completions.create({
      model: this.MODEL_NAME,
      messages: messages as ChatCompletionMessageParam[]
    }).then((response) => {
      return response.choices[0].message.content;
    }).catch((error) => {
      console.error(error);
      throw error;
    });
  }
} 