import app from './app';
import { config } from './config/env.config';
import { initializeDatabase } from './config/db.config';

const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Make sure all models are imported before starting
import './models/user.model';
import './models/companion.model';
import './models/message.model';
import './models/event.model';

startServer(); 