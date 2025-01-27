import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import crosswordRoutes from './routes/crossword.js';
import config from './config.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
    cors({
        origin: 'https://eloquent-naiad-ff7b62.netlify.app/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/crossword', crosswordRoutes);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
