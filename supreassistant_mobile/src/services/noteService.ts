import { API_BASE_URL } from '../config';
import { Note } from '../types';
import { getAuthToken } from '../utils/auth';

class NoteService {
  async getUserNotes(): Promise<Note[]> {
    try{
        const token = await getAuthToken();
        if (!token) throw new Error('No authentication token');

        const response = await fetch(`${API_BASE_URL}/notes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch notes: ${response.statusText}`);
        }
        
        const responseText = await response.text();
        const data = responseText ? JSON.parse(responseText) : {};
        return data.notes || [];
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
  }

  async getNote(noteId: string): Promise<Note> {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch note: ${response.statusText}`);
      }

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};
      return data.note;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  }

  async createNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create note: ${response.statusText}`);
      }

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};
      return data.note;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  async updateNote(noteId: string, noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};
      return data.note;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async deleteNote(noteId: string): Promise<void> {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
}

export const noteService = new NoteService();