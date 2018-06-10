var express = require('express');
var rekuire = require("rekuire");

var FileExplorerService = rekuire('services/FileExplorerService')

var routerFiles = express.Router();

routerFiles.get('/', function(req, res){
    new FileExplorerService().getFiles();
    res.send('Files')
}); 

module.exports = routerFiles;