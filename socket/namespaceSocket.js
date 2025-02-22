const Namespace = require('../modules/Namespaces/namespaceModel');

exports.initConnection = (io) => {
    io.on('connection', async (socket) => {
        const namespaces = await Namespace.find({}).sort({ _id: -1 });
        socket.emit('namespaces', namespaces);
    });
};
exports.initNamespaces = async (io) => {
    const namespaces = await Namespace.find({}).lean();

    namespaces.forEach((namespace) => {
        const nsp = io.of(namespace.href);

        nsp.on('connection', async (socket) => {
            const mainSpace = await Namespace.findOne({ _id: namespace._id });
            socket.emit('namespaceRooms', mainSpace.rooms);

            socket.on('joining', async (newRoom) => {
                const lastRoom = Array.from(socket.rooms)[1];

                if (lastRoom) {
                    // leaving
                    socket.leave(lastRoom);
                    await getRoomSockets(io, namespace.href, newRoom);
                }
                // joining
                socket.join(newRoom);
                await getRoomSockets(io, namespace.href, newRoom);
                const roomInfo = mainSpace.rooms.find(
                    (room) => room.title == newRoom
                );
                socket.emit('roomInfo', roomInfo);
                newMessage(socket);
                // disconnecting
                socket.on('disconnect', async () => {
                    await getRoomSockets(io, namespace.href, newRoom);
                });
            });
        });
    });
};

exports.broadCast = (io) => {
    io.on('connection', (socket) => {
        socket.broadcast.emit('newUser', 'socket');
    });
};

const getRoomSockets = async (io, namespace, room) => {
    const onlineUsers = await io.of(namespace).in(room).allSockets();
    io.of(namespace)
        .in(room)
        .emit('onlineUsersCount', Array.from(onlineUsers).length);
};

const newMessage = async (socket) => {
    socket.on('newMsg', async (data) => {
        const { message, roomName } = data;

        const namespace = await Namespace.findOne({
            'rooms.title': roomName,
        });

        await Namespace.updateOne(
            { _id: namespace._id, 'rooms.title': roomName },
            {
                $push: {
                    'rooms.$.messages': {
                        sender: '65d8b43df39419873708e9cf',
                        message,
                    },
                },
            }
        );
    });
};
