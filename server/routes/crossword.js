import express from 'express';
import Crossword from '../models/Crossword.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create or update a crossword
router.post('/create', auth, async (req, res) => {
    try {
        const { title, grid, clues } = req.body;
        const userId = req.user.userId;

        // Check if crossword with same title exists for this user
        const existingCrossword = await Crossword.findOne({
            title: title,
            userId: userId,
        });

        if (!existingCrossword) {
            // Create new crossword
            const newCrossword = new Crossword({
                title: title,
                grid: grid,
                clues: clues,
                author: req.user.username,
                userId: userId,
            });
            await newCrossword.save();
            res.json(newCrossword);
        } else {
            // Update existing crossword
            existingCrossword.grid = grid;
            existingCrossword.clues = clues;
            await existingCrossword.save();
            res.json(existingCrossword);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Search crosswords
router.get('/search', auth, async (req, res) => {
    const searchQuery = req.query.search;
    const userId = req.user.userId;

    try {
        const crosswords = await Crossword.find({
            userId: userId,
            title: {
                $regex: searchQuery,
                $options: 'i',
            },
        });
        res.json(crosswords);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a specific crossword
router.get('/solve', auth, async (req, res) => {
    try {
        const _id = req.query.id;
        const userId = req.user.userId;

        const crossword = await Crossword.findOne({
            _id: _id,
            userId: userId,
        });

        if (crossword) {
            res.json(crossword);
        } else {
            res.status(404).json({ message: 'Crossword not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
