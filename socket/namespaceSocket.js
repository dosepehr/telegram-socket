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
                if (lastRoom) socket.leave(lastRoom);
                socket.join(newRoom);
                await getRoomSockets(io, namespace.href, newRoom);
                const roomInfo = mainSpace.rooms.find(
                    (room) => room.title == newRoom
                );
                socket.emit('roomInfo', roomInfo);
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
