import bcrypt from 'bcryptjs';
import { UserRegistrationData, UserLoginData, AuthResponse } from '../types/auth.types';
import { generateToken } from '../utils/jwt.util';
import { User } from '../models/user.model';
import { DatabaseError, AuthenticationError } from '../utils/errors';
import { Op } from 'sequelize';

export class AuthService {
  async register(userData: UserRegistrationData): Promise<AuthResponse> {
    try {
      const existingUser = await User.findOne({ 
        where: { 
          [Op.or]: [
            { email: userData.email },
            { username: userData.username }
          ]
        } 
      });
      if (existingUser) {
        throw new AuthenticationError('User already exists');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      console.log({
        ...userData,
        password: hashedPassword
      });
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });

      const token = generateToken({ userId: user.id });

      return {
        message: 'User registered successfully.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      };
    } catch(error) {
      console.error('Registration error:', error);
      throw error instanceof AuthenticationError 
        ? error 
        : new DatabaseError('Error registering user: ' + (error as Error).message);
    }
  }

  async login(loginData: UserLoginData): Promise<AuthResponse> {
    try {
      const user = await User.findOne({ where: { email: loginData.email } });
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      const isValidPassword = await bcrypt.compare(loginData.password, user.password);
      if (!isValidPassword) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = generateToken({ userId: user.id });

      return {
        message: 'Login successful.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      };
    } catch (error) {
      throw new DatabaseError('Error during login');
    }
  }
} 