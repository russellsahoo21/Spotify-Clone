import express from 'express';
import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addSongToPlaylist,
} from '../controllers/playlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for /api/playlists
router.route('/')
    .post(protect, createPlaylist)
    .get(protect, getUserPlaylists);

router.route('/:id')
    .get(getPlaylistById);

// We need a specific route to add songs
router.route('/:id/add-song')
    .post(protect, addSongToPlaylist);

export default router;