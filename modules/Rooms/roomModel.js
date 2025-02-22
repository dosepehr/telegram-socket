const mongoose = require('mongoose');
const { messageSchema } = require('../Messages/messageModel');
const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: '/defaultImg',
        },
        messages: {
            type: [messageSchema],
            default: [],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room, roomSchema };
