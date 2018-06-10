var express = require('express');

var routerAPI = express.Router();

routerAPI.use('/files', require('./fileexplorer'));

module.exports = routerAPI;