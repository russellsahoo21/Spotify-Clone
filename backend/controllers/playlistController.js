import Playlist from '../models/Playlist.js';
import Song from '../models/Song.js'; // We might need this to verify a song exists

// @desc    Create a new playlist
// @route   POST /api/playlists
// @access  Private
export const createPlaylist = async (req, res) => {
    try {
        const { name, description, coverImage } = req.body;

        const playlist = await Playlist.create({
            name,
            description,
            coverImage,
            user: req.user._id, // Tied to the logged-in user from authMiddleware!
            songs: [], // Starts empty
        });

        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user's playlists
// @route   GET /api/playlists
// @access  Private
export const getUserPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single playlist by ID (with songs populated)
// @route   GET /api/playlists/:id
// @access  Private or Public (let's make it Public so people can share links)
export const getPlaylistById = async (req, res) => {
    try {
        // .populate('songs') is the magic here. It replaces the song IDs 
        // with the actual song objects from the database!
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        
        if (playlist) {
            res.status(200).json(playlist);
        } else {
            res.status(404).json({ message: 'Playlist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a song to a playlist
// @route   POST /api/playlists/:id/add-song
// @access  Private
export const addSongToPlaylist = async (req, res) => {
    try {
        const { songId } = req.body;
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Ensure the logged-in user actually owns this playlist!
        if (playlist.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to edit this playlist' });
        }

        // Prevent adding the same song twice
        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: 'Song is already in this playlist' });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};