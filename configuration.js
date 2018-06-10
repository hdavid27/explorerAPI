var rekuire = require('rekuire');
var path = require('path');
var intel = require('intel');


var database = {
	host : process.env.DB_HOST || '',
	port : process.env.DB_PORT || '',
	name : process.env.DB_NAME || '',
	username : process.env.DB_USERNAME ||  '',
	password : process.env.DB_PASSWORD ||  ''
};

var logLevel = intel.INFO;
var serverPort = process.env.PORT || 3000;

module.exports = {

    // Server configuration
    getLogLevel: function() {
		return logLevel;
    },
    
    getServerPort: function() {
		return serverPort;
	},
    
    // Database credentials
	getDatabaseHost: function() {
		return database.host;
	},

	getDatabasePort: function() {
		return database.port;
	},

	getDatabaseName: function() {
		return database.name;
	},

	getDatabaseUsername: function() {
		return database.username;
	},

	getDatabasePassword: function() {
		return database.password;
	},

	getMongoDBUrl: function(){
		return 'mongodb://' + database.username + ':' + database.password + '@' + database.host + '/' + database.name
	}

};