import express from 'express';
import Crossword from '../models/Crossword.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    console.log(req.body);
    try {
        const title = req.body.title;
        const author = req.body.author;

        const crossword = await Crossword.findOne({
            title: title,
            author: author,
        });
        if (!crossword) {
            const newCrossword = new Crossword({
                title: title,
                grid: req.body.grid,
                clues: req.body.clues,
                author: author,
            });
            await newCrossword.save();
            res.json(newCrossword);
        } else {
            crossword.set('grid', req.body.grid);
            crossword.set('clues', req.body.clues);
            await crossword.save();
            res.json(crossword);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/search', async (req, res) => {
    const searchQuery = req.query.search;
    console.log(searchQuery);
    try {
        const crosswords = await Crossword.find({
            title: {
                $regex: searchQuery,
                $options: 'i',
            },
        });
        if (crosswords.length > 0) {
            res.json(crosswords);
        } else {
            res.json({ message: 'Crossword not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/solve', async (req, res) => {
    try {
        const _id = req.query.id;
        console.log(_id);
        const crossword = await Crossword.findById(_id);
        if (crossword) {
            res.json(crossword);
        } else {
            res.json({ message: 'Crossword not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
