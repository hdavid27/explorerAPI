var express = require('express');
var rekuire = require("rekuire");

var logger = rekuire('utils/LoggerProvider').getLogger();
var FileExplorerService = rekuire('services/FileExplorerService')

var routerFiles = express.Router();

routerFiles.get('/', function(req, res){

        new FileExplorerService().getFiles()
        .then(function(files){
            res.send('Files');
        }).catch(function(error){
            logger.error(error);
            res.status(error.statusCode).send(error).end();
        });

        

}); 

module.exports = routerFiles;