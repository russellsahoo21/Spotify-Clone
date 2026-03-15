import express from 'express';
import { searchEverything } from '../services/searchService.js';

const router = express.Router();

// @route   GET /api/search?q=your_query
router.get('/', async (req, res) => {
    try {
        const results = await searchEverything(req.query.q);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;