import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    crosswords: [
        {
            title: {
                type: String,
                required: true,
            },
        },
    ],
});

export default mongoose.model('User', UserSchema);
