import Song from '../models/Song.js';
import ytSearch from 'yt-search';

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


export const autoAddSong = async (req, res) => {
    try {
        const { url } = req.body;

        // 1. Validate Input
        if (!url) {
            return res.status(400).json({ message: 'Please provide a YouTube URL' });
        }

        // 2. Extract the 11-character video ID robustly
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
        const videoId = match ? match[1] : null;

        if (!videoId) {
            return res.status(400).json({ message: 'Invalid YouTube URL. Please check the link.' });
        }

        // 3. PREVENT DUPLICATES
        // We reconstruct a clean standard URL to ensure our database checks are consistent
        const standardUrl = `https://youtube.com/watch?v=${videoId}`;
        const existingSong = await Song.findOne({ audioUrl: standardUrl });
        
        if (existingSong) {
            return res.status(409).json({ 
                message: 'This song already exists in your library!',
                song: existingSong 
            });
        }

        // 4. Fetch YouTube Data with its own safety net
        let video;
        try {
            video = await ytSearch({ videoId });
        } catch (ytError) {
            console.error("YouTube Search Error:", ytError.message);
            return res.status(404).json({ message: 'Video is unavailable, private, or region-locked.' });
        }

        if (!video) {
            return res.status(404).json({ message: 'Could not extract data from this video.' });
        }

        // 5. METADATA FALLBACKS (Fixes the Mongoose Validation Error)
        // We use optional chaining (?.) and OR (||) to provide default values if YouTube is missing data
        const title = video.title || 'Unknown Title';
        const artist = video.author?.name || 'Unknown Artist';
        const coverImage = video.thumbnail || 'https://via.placeholder.com/600x600?text=No+Cover';
        const duration = video.timestamp || '0:00';

        // 6. Save to Database
        const newSong = await Song.create({
            title,
            artist,
            album: 'YouTube Audio',
            coverImage,
            audioUrl: standardUrl, // Save the clean URL
            duration
        });

        res.status(201).json(newSong);

    } catch (error) {
        console.error('Error in autoAddSong:', error);
        res.status(500).json({ message: 'Server error while processing the song.' });
    }
};