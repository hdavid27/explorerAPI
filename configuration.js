var rekuire = require('rekuire');
var path = require('path');
var intel = require('intel');


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

	getMongoDBUrl: function(){
		return process.env.MONGODB_URI || '';
	}

};