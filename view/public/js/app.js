import { showActiveNamespace, showNamespaces } from '../../utils/funcs.js';

window.addEventListener('load', () => {
    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
        console.log('cc')
        socket.on('namespaces', (namespaces) => {
            console.log(namespaces)
            showNamespaces(namespaces);
            showActiveNamespace(namespaces);
        });
    });
});

