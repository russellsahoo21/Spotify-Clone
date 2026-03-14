import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a playlist name'],
        },
        description: {
            type: String,
            default: '',
        },
        coverImage: {
            type: String,
            default: '', // Users can upload a custom cover, or we can default to a generic image
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Ties the playlist to the user who created it
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Song', // Creates the relationship to the Song model
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;