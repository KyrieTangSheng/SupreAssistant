import express from 'express';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import companionRoutes from './routes/companion.routes';
import noteRoutes from './routes/note.routes';
import profileRoutes from './routes/profile.routes';

const app = express();

// Important: Don't forget these middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/companions', companionRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users/profile', profileRoutes);
export default app; 