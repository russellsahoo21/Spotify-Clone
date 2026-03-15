import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import songRoutes from './routes/songRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import searchRoutes from './routes/searchRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data in the body
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Basic test route
app.get('/', (req, res) => {
    res.send('Spotify Clone API is running...');
});

// We will mount our routes here in the next step!
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/search', searchRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});