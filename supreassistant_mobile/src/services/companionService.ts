import { getAuthToken } from '../utils/auth';
import { API_BASE_URL } from '../config';
import { Message } from '../types';

export const companionService = {
  async updateCompanion(name?: string): Promise<void> {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token');

    await fetch(`${API_BASE_URL}/companions/settings`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
  },

  async getChatHistory(): Promise<Message[]> {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE_URL}/companions/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch chat history');
      
      const data = await response.json();
      return Array.isArray(data) ? data : (data.messages || []);
    } catch (error) {
      console.error('Error in getChatHistory:', error);
      return [];
    }
  },

  async sendMessage(content: string): Promise<Message> {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token');

    const response = await fetch(`${API_BASE_URL}/companions/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: content })
    });

    if (!response.ok) throw new Error('Failed to send message');
    const data = await response.json();
    return data.message || data;
  }
}; 