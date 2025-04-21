import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import crosswordRoutes from './routes/crossword.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from config.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, 'config.env') });

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', crosswordRoutes);
app.use('/auth', authRoutes);

// Connect to MongoDB using the URI from config.env
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
