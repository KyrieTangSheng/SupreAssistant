import { Router } from 'express';
import { NoteController } from '../controllers/note.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const noteController = new NoteController();

router.use(authMiddleware);

router.post('/', noteController.createNote);
router.get('/', noteController.getUserNotes);
router.get('/:noteId', noteController.getNote);
router.put('/:noteId', noteController.updateNote);
router.delete('/:noteId', noteController.deleteNote);

export default router; 