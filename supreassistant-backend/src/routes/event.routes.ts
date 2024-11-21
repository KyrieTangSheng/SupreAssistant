import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const eventController = new EventController();

router.use(authMiddleware);

router.post('/', eventController.createEvent);
router.get('/', eventController.getUserEvents);
router.get('/:eventId', eventController.getEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);

export default router; 