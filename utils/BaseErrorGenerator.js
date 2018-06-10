

var BaseErrorGenerator = function() {

    return {

        buildError: function(httpCode, message, details) {

            var data = {
                errorMessage : message,
                errorDetails : "" + details
            };

        	var error = new Error(JSON.stringify(data));
            error.statusCode = httpCode;
            error.errorMessage = message;
            error.errorDetails = "" + details;

        	return error;
        }
    };
};

module.exports = new BaseErrorGenerator();
