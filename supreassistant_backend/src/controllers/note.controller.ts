import { Request, Response, NextFunction } from 'express';
import { NoteService } from '../services/note.service';
import { validateNote } from '../utils/validation.util';

export class NoteController {
  private noteService: NoteService;

  constructor() {
    this.noteService = new NoteService();
  }

  createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationError = validateNote(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const note = await this.noteService.createNote(req.user.id, req.body);
      res.status(201).json({
        message: 'Note created successfully.',
        note
      });
    } catch (error) {
      next(error);
    }
  };

  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const note = await this.noteService.updateNote(req.params.noteId, req.user.id, req.body);
      res.status(200).json({
        message: 'Note updated successfully.',
        note
      });
    } catch (error) {
      next(error);
    }
  };

  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.noteService.deleteNote(req.params.noteId, req.user.id);
      res.status(200).json({
        message: 'Note deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  getNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const note = await this.noteService.getNote(req.params.noteId, req.user.id);
      res.status(200).json({ note });
    } catch (error) {
      next(error);
    }
  };

  getUserNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notes = await this.noteService.getUserNotes(req.user.id);
      res.status(200).json({ notes });
    } catch (error) {
      next(error);
    }
  };
} 