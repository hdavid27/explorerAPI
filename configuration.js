var rekuire = require('rekuire');
var path = require('path');
var intel = require('intel');

var MONGODB_URI = process.env.MONGODB_URI || '';
var DB_NAME = process.env.DB_NAME || '';

var logLevel = intel.DEBUG;
var serverPort = process.env.PORT || 3000;

module.exports = {

    // Server configuration
    getLogLevel: function() {
		return logLevel;
    },
    
    getServerPort: function() {
		return serverPort;
	},

	getDatabaseName: function() {
		return DB_NAME;
	},

	getMongoDBURI: function(){
		return MONGODB_URI;
	}

};