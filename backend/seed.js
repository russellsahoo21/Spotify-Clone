import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Song from './models/Song.js';

// Load env variables so we can connect to your MongoDB
dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        console.log('🧹 Clearing out old songs...');
        await Song.deleteMany(); // This deletes your existing test songs to prevent duplicates

        // Feel free to add or change these artists!
        const artists = [
            'The Weeknd', 
            'Drake', 
            'Taylor Swift', 
            'Dua Lipa', 
            'Kendrick Lamar', 
            'Ariana Grande', 
            'Bad Bunny',
            'Billie Eilish'
        ];
        
        let allSongs = [];

        console.log('🎧 Fetching music from iTunes API...');

        for (const artist of artists) {
            // Fetch the top 15 songs for each artist
            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&limit=15`);
            const data = await response.json();

            const formattedSongs = data.results.map(track => {
                // iTunes returns a tiny 100x100 image. This string replacement 
                // magically grabs the crisp, high-res 600x600 version instead!
                const highResImage = track.artworkUrl100.replace('100x100bb', '600x600bb');
                
                // Convert milliseconds duration into a clean "3:45" string format
                const minutes = Math.floor(track.trackTimeMillis / 60000);
                const seconds = ((track.trackTimeMillis % 60000) / 1000).toFixed(0);
                const duration = `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;

                return {
                    title: track.trackName,
                    artist: track.artistName,
                    album: track.collectionName || 'Single',
                    coverImage: highResImage,
                    audioUrl: track.previewUrl, // 30-second playable audio preview
                    duration: duration
                };
            });

            // Add this artist's songs to our master list
            allSongs = [...allSongs, ...formattedSongs];
        }

        console.log(`🚀 Injecting ${allSongs.length} songs into MongoDB...`);
        await Song.insertMany(allSongs);

        console.log('✅ Database seeded successfully! Enjoy the music.');
        process.exit();

    } catch (error) {
        console.error(`❌ Error with seeding: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();