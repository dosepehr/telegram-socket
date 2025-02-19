const express = require('express');
const { addRoom } = require('./roomController');

const roomRouter = express.Router();

roomRouter.route('/').post(addRoom);

module.exports = roomRouter;
