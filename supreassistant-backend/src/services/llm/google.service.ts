import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

export class GoogleProvider {
  private google: GoogleGenerativeAI;
  private MODEL_NAME = process.env.GOOGLE_MODEL_NAME || 'gemini-1.5-flash';
  private model: GenerativeModel;
  private API_KEY = process.env.GOOGLE_API_KEY || 'undefined';
  constructor() {
    this.google = new GoogleGenerativeAI(this.API_KEY);
    
    this.model = this.google.getGenerativeModel({
      model: this.MODEL_NAME
    });
  }

  async generateResponse(messages: Array<{ role: string; content: string }>) {
    try {
      // Convert messages to Google's format
      const formattedMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await this.model.generateContent({
        contents: formattedMessages,
      });
      
      const result = response.response;
      if (!result.text()) {
        throw new Error('Empty response from Google AI');
      }
      
      return result.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}