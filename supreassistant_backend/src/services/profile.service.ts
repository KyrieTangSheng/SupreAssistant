import { User } from '../models/user.model';
import { DatabaseError, NotFoundError, ValidationError } from '../utils/errors';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

interface UpdateProfileData {
  username?: string;
  email?: string;
  password?: string;
}

export class ProfileService {
  async getProfile(userId: string) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Error fetching user profile');
    }
  }

  async updateProfile(userId: string, data: UpdateProfileData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Check for duplicate email/username if they're being updated
      if (data.email || data.username) {
        const existingUser = await User.findOne({
          where: {
            id: { [Op.ne]: userId }, // Exclude current user
            [Op.or]: [
              ...(data.email ? [{ email: data.email }] : []),
            ]
          }
        });

        if (existingUser) {
          if (data.email && existingUser.email === data.email) {
            throw new ValidationError('Email already in use');
          }
        }
      }

      // If password is being updated, hash it
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      await user.update(data);

      // Return user without password
      const { password, ...userWithoutPassword } = user.get();
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError('Error updating user profile');
    }
  }

  async deleteProfile(userId: string) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      await user.destroy();
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Error deleting user profile');
    }
  }
}