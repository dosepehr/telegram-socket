const { getIo } = require('./io');
const namespaceSocket = require('./namespaceSocket');
const globalHandlers = require('./handlers');

module.exports = async () => {
    const io = getIo();
    globalHandlers(io);
    namespaceSocket.initConnection(io);
    // namespaceSocket.broadCast(io);
    await namespaceSocket.initNamespaces(io);
};

