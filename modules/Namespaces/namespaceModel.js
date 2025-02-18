const mongoose = require('mongoose');
const Room = require('../Rooms/roomModel');

const namespaceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
        rooms: {
            type: [Room.roomSchema],
            default: [],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const Namespace = mongoose.model('Namespace', namespaceSchema);

module.exports = Namespace;
