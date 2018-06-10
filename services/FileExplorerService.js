var rekuire = require("rekuire");
var Promise = require('bluebird');
var mongo = require('mongodb');

var logger = rekuire('utils/LoggerProvider').getLogger();
var BaseErrorGenerator = rekuire("utils/BaseErrorGenerator");
var configuration = rekuire('configuration');

var FileExplorerService = function(){

    var dbConnection;

    //connect to database
    mongo.MongoClient.connect(configuration.getMongoDBUrl(), function(err, db){
            
        if(err){
            logger.error('Enable to connect to database!', error);
            throw new BaseErrorGenerator(500, 'Enable to connect to database!', error);
        }else{
            dbConnection = db;
        }

    });

    return {

        getFiles: function(){

        }

    }

};

module.exports = FileExplorerService;