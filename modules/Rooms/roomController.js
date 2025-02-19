const expressAsyncHandler = require('express-async-handler');

const Namespace = require('../Namespaces/namespaceModel');

exports.addRoom = expressAsyncHandler(async (req, res, next) => {
    const { title, namespace } = req.body;

    const mainNamespace = await Namespace.findOne({ href: namespace });

    if (!mainNamespace) {
        return res.status(400).json({ message: 'Namespace not found !!' });
    }

    const mainRoom = await Namespace.findOne({ 'rooms.title': title });
    if (mainRoom) {
        return res.status(400).json({ message: 'Room already exist !!' });
    }

    const room = { title };

    await Namespace.findOneAndUpdate(
        { href: namespace },
        {
            $push: {
                rooms: room,
            },
        }
    );

    return res
        .status(201)
        .json({ message: 'New Room created successfully :))' });
});
