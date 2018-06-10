var express = require('express');

var routerFiles = express.Router();

routerFiles.get('/', function(req, res){
    res.send('Files')
}); 

module.exports = routerFiles;