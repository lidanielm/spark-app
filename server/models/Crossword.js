import mongoose from 'mongoose';

const CrosswordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    grid: {
        type: [[String]],
        required: true,
    },
    clues: {
        type: [
            {
                number: Number,
                direction: String,
                length: Number,
                text: String,
                answer: String,
                row: Number,
                col: Number,
            },
        ],
        required: true,
    },
});

export default mongoose.model('Crossword', CrosswordSchema);
