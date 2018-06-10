
var express = require('express');
var rekuire = require('rekuire');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var configuration = rekuire('configuration');
var logger = rekuire('utils/LoggerProvider').getLogger();

var app = express();

app.use(morgan('common'));

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', function (req, res) {
    res.json("Explorer API")
});

app.use('/api', rekuire('routes/api'));

//unhandled request
app.use(function (req, res) {
    logger.error("Route was not handled:", req.originalUrl);
    res.status(error.statusCode || 404).send("Route not found!").end(); 
});

// Start listening
app.listen(configuration.getServerPort(), function(){
    logger.info('Server is running on port ' + configuration.getServerPort());
});