var rekuire = require('rekuire');
var Promise = require('bluebird');
var mongo = require('mongodb');

var configuration = rekuire('configuration');

var Database = function(){

    return {

        getMongoDBConnection: function(){

            return new Promise(function(resolve, reject){
                //connect to database
                mongo.MongoClient.connect(configuration.getMongoDBUrl(), function(err, db){
                        
                    if(err){
                        reject(err)
                    }else{
                        resolve(db);
                    }

                });
            });
            
        }
    }

};

module.exports = new Database();