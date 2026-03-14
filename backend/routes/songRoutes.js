import express from 'express';
import { createSong, getSongs, getSongById } from '../controllers/songController.js';
import { uploadAudio, uploadImage } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js'; // To ensure only logged-in users upload

const router = express.Router();

// --- UPLOAD ENDPOINTS ---

// @route   POST /api/songs/upload/audio
// @desc    Upload audio to Cloudinary and return the URL
router.post('/upload/audio', protect, uploadAudio.single('audio'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No audio file uploaded' });
    // req.file.path contains the Cloudinary URL!
    res.status(200).json({ audioUrl: req.file.path }); 
});

// @route   POST /api/songs/upload/image
// @desc    Upload image to Cloudinary and return the URL
router.post('/upload/image', protect, uploadImage.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No image file uploaded' });
    res.status(200).json({ imageUrl: req.file.path });
});


// --- DATABASE ENDPOINTS ---

router.route('/')
    .get(getSongs)
    .post(protect, createSong); // Protect this so randos can't add songs!

router.route('/:id')
    .get(getSongById);

export default router;