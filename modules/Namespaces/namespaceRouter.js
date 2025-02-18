const express = require('express');
const { addNamespace } = require('./namespaceController');

const namespaceRouter = express.Router();

namespaceRouter.route('/').post(addNamespace);

module.exports = namespaceRouter;
