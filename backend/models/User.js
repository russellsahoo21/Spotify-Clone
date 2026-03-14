import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a username'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        profileImage: {
            type: String,
            default: '', // We can update this later with Cloudinary
        },
        likedSongs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Song',
            },
        ],
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('User', userSchema);

export default User;