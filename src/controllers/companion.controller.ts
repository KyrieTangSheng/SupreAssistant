import { Request, Response, NextFunction } from 'express';
import { CompanionService } from '../services/companion.service';
import { Message } from '../models/message.model';

export class CompanionController {
  private companionService: CompanionService;

  constructor() {
    this.companionService = new CompanionService();
  }

  chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const response = await this.companionService.chat(userId, message);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { limit = 50, before } = req.query;

      const companion = await this.companionService.getOrCreateCompanion(userId);

      const whereClause = {
        companionId: companion.id,
        ...(before && { createdAt: { $lt: before } })
      };

      const messages = await Message.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: Math.min(Number(limit), 100)
      });

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };

  updateCompanion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { name, systemPrompt, model } = req.body;

      const companion = await this.companionService.getOrCreateCompanion(userId);
      
      await companion.update({
        ...(name && { name }),
        ...(systemPrompt && { systemPrompt }),
        ...(model && { model })
      });

      res.status(200).json(companion);
    } catch (error) {
      next(error);
    }
  };
} 