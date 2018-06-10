var rekuire = require("rekuire");
var Promise = require('bluebird');

var configuration = rekuire('configuration');
var BaseErrorGenerator = rekuire("utils/BaseErrorGenerator");
var Database = rekuire('database/database');

var FileExplorerService = function(){



    return {

        getFiles: function(){

            return Database.getMongoDBConnection()
            .then(function(dbConnection){



                return [dbConnection, dbConnection.db(configuration.getDatabaseName()).collection('files').find({}).toArray()];

            }).spread(function(dbConnection, error, result){

                //dbConnection.close();

                console.log('ERROR', error);
                console.log('RESULT', result);
                

                // if(error){
                //     throw BaseErrorGenerator.buildError(400, 'Database error!', error);
                // }else {
                //     return result;
                // }
            }).catch(function(error){
                
                throw BaseErrorGenerator.buildError(500, 'Error', error);
            });

        }

    }

};

module.exports = FileExplorerService;