import { Op } from 'sequelize';
import { Event } from '../models/event.model';
import { CreateEventData, UpdateEventData } from '../types/event.types';
import { DatabaseError, NotFoundError } from '../utils/errors';

export class EventService {
  async createEvent(userId: string, eventData: CreateEventData): Promise<Event> {
    try {
      const event = await Event.create({
        ...eventData,
        userId
      });
      return event;
    } catch (error) {
      throw new DatabaseError('Error creating event');
    }
  }

  async updateEvent(eventId: string, userId: string, updateData: UpdateEventData): Promise<Event> {
    try {
      const event = await Event.findOne({ where: { id: eventId, userId: userId } });
      if (!event) {
        throw new NotFoundError('Event not found');
      }

      console.log(updateData);
      console.log(event);

      await event.update(updateData);
      return event;
    } catch (error) {
      throw new DatabaseError('Error updating event');
    }
  }

  async deleteEvent(eventId: string, userId: string): Promise<void> {
    try {
      const event = await Event.findOne({ where: { id: eventId, userId: userId } });
      if (!event) {
        throw new NotFoundError('Event not found');
      }

      await event.destroy();
    } catch (error) {
      throw new DatabaseError('Error deleting event');
    }
  }

  async getEvent(eventId: string, userId: string): Promise<Event> {
    try {
      const event = await Event.findOne({ where: { id: eventId, userId } });
      if (!event) {
        throw new NotFoundError('Event not found');
      }
      return event;
    } catch (error) {
      throw new DatabaseError('Error retrieving event');
    }
  }

  async getUserEvents(userId: string, startDate?: string, endDate?: string): Promise<Event[]> {
    try {
      const whereClause: any = { userId };
      if (startDate && endDate) {
        whereClause.startTime = {
          [Op.between]: [startDate, endDate]
        };
      }

      const events = await Event.findAll({ where: whereClause });
      return events;
    } catch (error) {
      throw new DatabaseError('Error retrieving events');
    }
  }
} 