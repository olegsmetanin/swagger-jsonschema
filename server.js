var express = require('express');

var app = express();

app.use('/', express.static('.'));

var swaggerTools = require('swagger-tools');

// swaggerRouter configuration
var options = {
 controllers: './controllers',
 useStubs: true //process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./swagger2.json');

try {
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
 // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
 app.use(middleware.swaggerMetadata());

 // Validate Swagger requests
 app.use(middleware.swaggerValidator());

 // Route validated requests to appropriate controller
 //app.use(middleware.swaggerRouter(options));

 // Serve the Swagger documents and Swagger UI
 app.use(middleware.swaggerUi());

 // Start the server
 app.listen(8000, function () {
   console.log('Your server is now running at http://localhost:8000');
 });

});

} catch (e) {
  console.log(e);
}
