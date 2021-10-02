"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionSchema = new mongoose_1.Schema({
    answer: {
        type: String,
        required: true,
        trim: true,
        minlength: [20, 'Please provide a detailed answer.'],
    }
}, { timestamps: true });
var Answer = (0, mongoose_1.model)('Answer', questionSchema);
exports.default = Answer;
