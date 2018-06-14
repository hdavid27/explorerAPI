var express = require('express');
var rekuire = require("rekuire");
var bodyParser = require('body-parser');

var logger = rekuire('utils/LoggerProvider').getLogger();
var FileExplorerService = rekuire('services/FileExplorerService')

var routerFiles = express.Router();

routerFiles.use(bodyParser.json());

//GET files from root
routerFiles.get('/', function(req, res){

    new FileExplorerService().getFiles()
    .then(function(files){
        res.json(files);
    }).catch(function(error){
        logger.error(error);
        res.status(error.statusCode || 500).send(error).end();
    });

});

//GET files with parent
routerFiles.get('/:parent', function(req, res){

        new FileExplorerService().getFiles(req.params.parent)
        .then(function(files){
            res.json(files);
        }).catch(function(error){
            logger.error(error);
            res.status(error.statusCode || 500).send(error).end();
        });

}); 

//Create new file
routerFiles.post('/', function(req, res){

    console.log(req.body, req.params);
    

    new FileExplorerService().createFile(req.body.name, req.body.type, req.body.parent)
    .then(function(file){
        res.json(file);
    }).catch(function(error){
        logger.error(error);
        res.status(error.statusCode || 500).send(error).end();
    });
});

//Update file
routerFiles.post('/:id', function(req, res){
    new FileExplorerService().updateFile(req.params.id, req.body.name)
    .then(function(result){
        res.json(result);
    }).catch(function(error){
        logger.error(error);
        res.status(error.statusCode || 500).send(error).end();
    });
});

//Delete file
routerFiles.delete('/:id', function(req, res){
    new FileExplorerService().deleteFile(req.params.id)
    .then(function(result){
        res.json(result);
    }).catch(function(error){
        logger.error(error);
        res.status(error.statusCode || 500).send(error).end();
    });
});

module.exports = routerFiles;