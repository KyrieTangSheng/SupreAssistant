import express from 'express';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import companionRoutes from './routes/companion.routes';

const app = express();

// Important: Don't forget these middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/companion', companionRoutes);
export default app; 