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
        nsp.on('connection', (socket) => {
            socket.emit('namespaceRooms', namespace.rooms);

            socket.on('joining', async (newRoom) => {
                const lastRoom = Array.from(socket.rooms)[1];
                if (lastRoom) socket.leave(lastRoom);
                socket.join(newRoom);

                const roomInfo = namespace.rooms.find(
                    (room) => room.title == newRoom
                );
            });
        });
    });
};

exports.broadCast = (io) => {
    io.on('connection', (socket) => {
        socket.broadcast.emit('newUser', 'socket');
    });
};
