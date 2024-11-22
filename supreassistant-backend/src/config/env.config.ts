import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  dbPath: process.env.DB_PATH || 'database.sqlite',
  openaiApiKey: process.env.OPENAI_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}; 