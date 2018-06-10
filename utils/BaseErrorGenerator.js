

var BaseErrorGenerator = function() {

    return {

        buildError: function(httpCode, message, details) {

            var data;

            data.errorMessage = message
            data.errorDetails = details;

        	var error = new Error(JSON.stringify(data));
        	error.statusCode = httpCode;

        	return error;
        }
    };
};

module.exports = new BaseErrorGenerator();
