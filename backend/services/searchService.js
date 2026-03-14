import Song from '../models/Song.js';
import Playlist from '../models/Playlist.js';

export const searchEverything = async (searchQuery) => {
    // If no query is provided, return empty arrays
    if (!searchQuery) {
        return { songs: [], playlists: [] };
    }

    // Create a case-insensitive regex for the search term
    // Example: "drake" will match "Drake", "DRAKE", "drake", etc.
    const regex = new RegExp(searchQuery, 'i');

    // Run both database queries at the same time for better performance
    const [songs, playlists] = await Promise.all([
        Song.find({
            $or: [
                { title: regex },
                { artist: regex },
                { album: regex }
            ]
        }).limit(10), // Limit results so the response isn't massive
        
        Playlist.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        }).limit(10)
    ]);

    return { songs, playlists };
};