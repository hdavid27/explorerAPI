var rekuire = require('rekuire');
var path = require('path');
var intel = require('intel');


var database = {
	host : 'localhost',
	port : '5432',
	name : 'database',
	username : '',
	password : ''
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
	}

};