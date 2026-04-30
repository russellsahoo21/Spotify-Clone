import Song from '../models/Song.js';
import ytSearch from 'yt-search';
import appCache from '../utils/cache.js'; // Import the instance we created


// Helper to clear song-related cache
const flushSongCache = () => {
    appCache.del('all_songs');
    console.log("🗑️ Cache Flushed: New song added");
};

// @desc    Create a new song
// @route   POST /api/songs
// @access  Private (Admin or authorized users)
// @desc    Create a new song
export const createSong = async (req, res) => {
    try {
        const { title, artist, album, coverImage, audioUrl, duration } = req.body;

        if (!title || !artist || !coverImage || !audioUrl) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const song = await Song.create({ title, artist, album, coverImage, audioUrl, duration });

        // 🌟 INVALIDATE CACHE
        flushSongCache();

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
        const cacheKey = 'all_songs';

        // 1. Check Cache
        const cachedSongs = appCache.get(cacheKey);
        if (cachedSongs) {
            console.log("🚀 Serving Songs from Cache");
            return res.status(200).json(cachedSongs);
        }

        // 2. Cache Miss - Fetch from DB
        const songs = await Song.find({}).sort({ createdAt: -1 });
        
        // 3. Save to Cache
        appCache.set(cacheKey, songs);
        
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
        const cacheKey = `song_${req.params.id}`;

        const cachedSong = appCache.get(cacheKey);
        if (cachedSong) {
            console.log(`🚀 Serving Song ${req.params.id} from Cache`);
            return res.status(200).json(cachedSong);
        }

        const song = await Song.findById(req.params.id);
        if (song) {
            appCache.set(cacheKey, song);
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
        if (!url) return res.status(400).json({ message: 'Please provide a YouTube URL' });

        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
        const videoId = match ? match[1] : null;

        if (!videoId) return res.status(400).json({ message: 'Invalid YouTube URL.' });

        const standardUrl = `https://youtube.com/watch?v=${videoId}`;
        const existingSong = await Song.findOne({ audioUrl: standardUrl });
        
        if (existingSong) {
            return res.status(409).json({ message: 'Already exists!', song: existingSong });
        }

        let video;
        try {
            video = await ytSearch({ videoId });
        } catch (ytError) {
            return res.status(404).json({ message: 'Video unavailable.' });
        }

        if (!video) return res.status(404).json({ message: 'Data extraction failed.' });

        const newSong = await Song.create({
            title: video.title || 'Unknown Title',
            artist: video.author?.name || 'Unknown Artist',
            album: 'YouTube Audio',
            coverImage: video.thumbnail || 'https://via.placeholder.com/600',
            audioUrl: standardUrl,
            duration: video.timestamp || '0:00'
        });

        // 🌟 INVALIDATE CACHE
        flushSongCache();

        res.status(201).json(newSong);

    } catch (error) {
        console.error('Error in autoAddSong:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};