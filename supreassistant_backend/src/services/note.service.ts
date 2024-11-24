import { Note } from '../models/note.model';
import { CreateNoteData, UpdateNoteData } from '../types/note.types';
import { DatabaseError, NotFoundError } from '../utils/errors';

export class NoteService {
  async createNote(userId: string, data: CreateNoteData): Promise<Note> {
    try {
      return await Note.create({
        ...data,
        userId
      });
    } catch (error) {
      throw new DatabaseError('Error creating note');
    }
  }

  async updateNote(noteId: string, userId: string, data: UpdateNoteData): Promise<Note> {
    try {
      const note = await Note.findOne({ where: { id: noteId, userId } });
      
      if (!note) {
        throw new NotFoundError('Note not found');
      }

      await note.update(data);
      return note;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Error updating note');
    }
  }

  async deleteNote(noteId: string, userId: string): Promise<void> {
    try {
      const result = await Note.destroy({ where: { id: noteId, userId } });
      
      if (result === 0) {
        throw new NotFoundError('Note not found');
      }
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Error deleting note');
    }
  }

  async getNote(noteId: string, userId: string): Promise<Note> {
    try {
      const note = await Note.findOne({ where: { id: noteId, userId } });
      
      if (!note) {
        throw new NotFoundError('Note not found');
      }

      return note;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Error fetching note');
    }
  }

  async getUserNotes(userId: string): Promise<Note[]> {
    try {
      return await Note.findAll({ 
        where: { userId },
        order: [['updatedAt', 'DESC']]
      });
    } catch (error) {
      throw new DatabaseError('Error fetching user notes');
    }
  }
} 