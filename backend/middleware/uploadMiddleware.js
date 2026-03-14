import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// 1. Storage Configuration for Cover Images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'spotify_clone/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

// 2. Storage Configuration for Audio Files
const audioStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'spotify_clone/audio',
        resource_type: 'video', // CRITICAL: Cloudinary processes audio under the 'video' resource type
        allowed_formats: ['mp3', 'wav', 'ogg'],
    },
});

// Export the multer instances so we can use them in our routes
export const uploadImage = multer({ storage: imageStorage });
export const uploadAudio = multer({ storage: audioStorage });