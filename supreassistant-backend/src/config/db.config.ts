import { Sequelize } from 'sequelize';
import { config } from './env.config';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.dbPath,
  logging: config.nodeEnv === 'development' ? console.log : false
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: config.nodeEnv === 'development' });
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}; 