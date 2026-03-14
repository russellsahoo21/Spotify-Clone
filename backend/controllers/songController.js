import Song from '../models/Song.js';

// @desc    Create a new song
// @route   POST /api/songs
// @access  Private (Admin or authorized users)
export const createSong = async (req, res) => {
    try {
        const { title, artist, album, coverImage, audioUrl, duration } = req.body;

        // Basic validation
        if (!title || !artist || !coverImage || !audioUrl) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const song = await Song.create({
            title,
            artist,
            album,
            coverImage,
            audioUrl,
            duration,
        });

        res.status(201).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all songs
// @route   GET /api/songs
// @access  Public (or Private depending on your app rules)
export const getSongs = async (req, res) => {
    try {
        // Fetch all songs, sorted by newest first
        const songs = await Song.find({}).sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single song by ID
// @route   GET /api/songs/:id
// @access  Public
export const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (song) {
            res.status(200).json(song);
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};