const Namespace = require('../modules/Namespaces/namespaceModel');


exports.initConnection = (io) => {
  io.on("connection", async (socket) => {
    console.log("Socket ID ->", socket.id);
    const namespaces = await Namespace.find({}).sort({ _id: -1 });
    socket.emit("namespaces", namespaces);
  });
};
