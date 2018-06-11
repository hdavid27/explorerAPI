var rekuire = require('rekuire');
var path = require('path');
var intel = require('intel');

var MONGODB_URI = process.env.MONGODB_URI || '';
var DB_NAME = process.env.DB_NAME || '';

var logLevel = intel.DEBUG;
var serverPort = process.env.PORT || 3000;

var crossdomainHeaders = {
	'Access-Control-Allow-Origin' : function(request) {
		return request.get('origin'); // Since we are using credentials, we can only return a single origin here! Use this to filter the allowed origins.
	},
	'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods' : 'GET, OPTIONS, PUT, POST, DELETE',
    'Access-Control-Max-Age': 86400
};

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
	},

	// Crossdomain
	getCrossdomainHeaders: function() {
		return crossdomainHeaders;
	}

};