const Namespace = require("../modules/Namespaces/namespaceModel");

exports.initNamespaces = async (io) => {
    const namespaces = await Namespace.find({}).lean();

    namespaces.forEach((namespace) => {
        const nsp = io.of(namespace.href);
        nsp.on("connection", (socket) => {
            console.log(`User connected to namespace: ${namespace.href}`);
            socket.emit("namespaceRooms", namespace.rooms);
        });
    });
};
