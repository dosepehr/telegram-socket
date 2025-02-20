import {
    showActiveNamespace,
    showNamespaces,
    sendMessageInRoom,
    getMsg,
    detectIsTyping,
    sendLocation,
    getLocation,
    initMap,
    sendFile,
    getFile,
} from '../../utils/funcs.js';

window.addEventListener('load', async () => {
    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
        // socket.on("bro", (data) => console.log("Bro Data"));

        socket.on('namespaces', (namespaces) => {
            console.log(namespaces);
            showNamespaces(namespaces, socket);

            showActiveNamespace(namespaces);
            // sendMessageInRoom();
            // getMsg();
            // detectIsTyping();
            // sendLocation();
            // getLocation();
            // sendFile();
            // getFile();
            // initMap("map", 35, 50);
        });
    });
});

