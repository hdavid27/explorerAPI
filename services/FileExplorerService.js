var rekuire = require("rekuire");
var Promise = require('bluebird');
var UUID = require('uuid');

var configuration = rekuire('configuration');
var BaseErrorGenerator = rekuire("utils/BaseErrorGenerator");
var Database = rekuire('database/database');

var FileExplorerService = function(){

    return {

        createFile: function(name, type, parent){

            if(!name || !type){
                throw BaseErrorGenerator.buildError(400, 'Bad request!');
            }

            parent = parent || 'root';

            return Database.getMongoDBConnection()
            .then(function(dbConnection){

                var collection = dbConnection.db(configuration.getDatabaseName()).collection('files');

                var query = {
                    "name": name,
                    "type": type,
                    "parent": parent
                }

                return [
                    dbConnection,
                    collection.find(query).toArray()
                ];

            }).spread(function(dbConnection, result){

                console.log(result);

                if(result.length > 0){
                    dbConnection.close();
                    throw BaseErrorGenerator.buildError(400, 'File already exists!');
                }

                var collection = dbConnection.db(configuration.getDatabaseName()).collection('files');

                var fileToAdd = {
                    "fileId": UUID.v4(),
                    "name": name,
                    "type": type,
                    "parent": parent || 'root',
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                }

                return [
                    dbConnection,
                    collection.insert([fileToAdd])
                ];

            }).spread(function(dbConnection, result){

                dbConnection.close();

                return result.ops[0];

            });

        },

        updateFile: function(fileId, name){

            if(!fileId || !name){
                throw BaseErrorGenerator.buildError(400, 'Bad request!');
            }

            return Database.getMongoDBConnection()
            .then(function(dbConnection){

                var collection = dbConnection.db(configuration.getDatabaseName()).collection('files');

                var query = {
                    fileId : fileId
                };

                return [
                    dbConnection,
                    collection.updateOne({fileId : fileId}, {$set: {name: name, "updatedAt": new Date()}})
                ];

            }).spread(function(dbConnection, result){

                dbConnection.close();

                return result;

            });

        },

        getFiles: function(offset, parent){

            offset = parseInt(offset) || 0;
            parent = parent || 'root';

            var limit = configuration.getQueryLimit();

            return Database.getMongoDBConnection()
            .then(function(dbConnection){

                var collection = dbConnection.db(configuration.getDatabaseName()).collection('files');

                var query = {
                    parent : parent
                };

                return [
                    dbConnection,
                    collection.find(query).limit(limit).skip(offset).toArray()
                ];

            }).spread(function(dbConnection, result){

                dbConnection.close();

                return result;

            });

        },

        deleteFile: function(fileId){

            if(!fileId){
                throw BaseErrorGenerator.buildError(400, 'Bad request!');
            }

            if(fileId == 'root'){
                throw BaseErrorGenerator.buildError(401, 'Unauthorized to delete that folder!');
            }

            return Database.getMongoDBConnection()
            .then(function(dbConnection){

                var collection = dbConnection.db(configuration.getDatabaseName()).collection('files');

                return [
                    dbConnection,
                    collection.deleteMany({parent: fileId}),
                    collection.deleteOne({fileId: fileId})
                ];

            }).spread(function(dbConnection, result){

                dbConnection.close();

                return result;

            });

        }

    }

};

module.exports = FileExplorerService;