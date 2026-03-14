import User from '../models/User.js';

// @desc    Get logged in user profile
// @route   GET /api/users/profile
// @access  Private (Requires Token)
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                likedSongs: user.likedSongs,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};