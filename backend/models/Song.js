import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a song title'],
        },
        artist: {
            type: String,
            required: [true, 'Please add an artist name'],
        },
        album: {
            type: String,
            default: 'Single',
        },
        coverImage: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        audioUrl: {
            type: String,
            required: [true, 'Please provide an audio file URL'],
        },
        duration: {
            type: String, // We'll store this as a formatted string like "3:45"
            default: '0:00',
        },
    },
    {
        timestamps: true,
    }
);

const Song = mongoose.model('Song', songSchema);

export default Song;