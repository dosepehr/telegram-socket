const socketIo = require("socket.io");

let io;

module.exports = {
    init: (server) => {
        io = socketIo(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized!");
        }
        return io;
    },
};
