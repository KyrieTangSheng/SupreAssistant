import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/event.service';
import { validateEvent } from '../utils/validation.util';

const eventService = new EventService();

export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const validationError = validateEvent(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const event = await eventService.createEvent(req.user.id, req.body);
      res.status(201).json({
        message: 'Event created successfully.',
        event
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventService.updateEvent(req.params.eventId, req.user.id, req.body);
      res.status(200).json({
        message: 'Event updated successfully.',
        event
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.deleteEvent(req.params.eventId, req.user.id);
      res.status(200).json({
        message: 'Event deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  }

  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventService.getEvent(req.params.eventId, req.user.id);
      res.status(200).json({ event });
    } catch (error) {
      next(error);
    }
  }

  async getUserEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await eventService.getUserEvents(
        req.user.id,
        req.query.startDate as string,
        req.query.endDate as string
      );
      res.status(200).json({ events });
    } catch (error) {
      next(error);
    }
  }
} 