import mongoose, { Schema, model, connect, Mongoose } from 'mongoose';
import { AnswerInterface } from './schemaInterface';

const questionSchema = new Schema <AnswerInterface> ({
    answer: {
        type: String,
        required: true,
        trim: true,
        minlength: [20, 'Please provide a detailed answer.'],
    }
}, {timestamps: true})

const Answer = model<AnswerInterface>('Answer', questionSchema);
export default Answer;