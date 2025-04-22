// server/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
        const savedUser = await User.create({ username, password: hashedPassword });
        const token = jwt.sign({ userId: savedUser._id, username: username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, username: username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
});

export default router;
