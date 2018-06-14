var express = require('express');
var rekuire = require('rekuire');
var _ = require('lodash');

var configuration = rekuire('configuration');
var logger = rekuire('utils/LoggerProvider').getLogger();

var routerAPI = express.Router();

//seting up cross domain headers
routerAPI.use(function(request, response, next) {
    var crossdomainHeaders = configuration.getCrossdomainHeaders();

    logger.debug('Configuring CORS');

    _.each(crossdomainHeaders, function(value, key) {
        if (_.isFunction(value)) {
            value = value(request);
        }

        response.header(key, value);
    });

    if (request.method === 'OPTIONS') { 
        response.end(); 
    }else { 
        next();
    }
})

routerAPI.use('/files', require('./fileexplorer'));

module.exports = routerAPI;