const { addOne, getAll } = require('../Factory/factoryController');
const Namespace = require('./namespaceModel');

exports.addNamespace = addOne(Namespace);
