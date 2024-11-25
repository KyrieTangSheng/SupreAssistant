import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/profile.service';
import { validateProfileUpdate } from '../utils/validation.util';
import { ValidationError } from '../utils/errors';

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.profileService.getProfile(req.user.id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationError = validateProfileUpdate(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const user = await this.profileService.updateProfile(req.user.id, req.body);
      res.status(200).json({
        message: 'Profile updated successfully.',
        user
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  };

  deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.profileService.deleteProfile(req.user.id);
      res.status(200).json({
        message: 'User account deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };
}