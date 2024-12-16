import { Event } from '../types';
import { getAuthToken } from '../utils/auth';
import { API_BASE_URL } from '../config';

export const eventService = {
  async getUserEvents(): Promise<Event[]> {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseText = await response.text();

      if (!response.ok) {
        if (response.status === 401) throw new Error('Authentication required');
        throw new Error(`Failed to fetch events: ${response.status} ${responseText}`);
      }

      // Parse the response only if it's valid JSON
      const data = responseText ? JSON.parse(responseText) : {};
      return data.events || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token');

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Authentication required');
      throw new Error('Failed to create event');
    }

    const data = await response.json();
    return data.event;
  },

  async getEvent(eventId: string): Promise<Event> {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token');

    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }

    const data = await response.json();
    return data.event;
  },

  async updateEvent(eventId: string, eventData: Partial<Event>): Promise<Event> {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token');

    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error('Failed to update event');
    }

    const data = await response.json();
    return data.event;
  },

  async deleteEvent(eventId: string): Promise<void> {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token');

    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  }
};