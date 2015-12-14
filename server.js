var express = require('express');
var fs = require('fs');

var app = express();

app.use('/docs', express.static('./node_modules/swagger-ui/dist'));
app.use('/', express.static('public'));

//var swaggerTools = require('swagger-tools');

// swaggerRouter configuration
var options = {
 controllers: './controllers',
 useStubs: true //process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./public/api/swagger.json');

function flattenRefs(obj, defs) {
  for(var key in obj) {
    if (obj.hasOwnProperty(key) && key === '$ref' && typeof obj[key] === 'string') {
      var path = obj[key];
      console.log('path', path);
      if (!path || path.indexOf('#/definitions') === 0) continue;

      var prefix = path.indexOf('model') >= 0 ? './public/api/' : './public/api/model/';
      defs[path] = require(prefix + path);
      obj[key] = '#/definitions/' + path;
    }

    if (typeof obj[key] === 'object') {
      flattenRefs(obj[key], defs);
    }
  }
}

swaggerDoc.definitions = swaggerDoc.definitions || {};
flattenRefs(swaggerDoc, swaggerDoc.definitions);
flattenRefs(swaggerDoc.definitions, swaggerDoc.definitions);

//console.log(JSON.stringify(swaggerDoc, null, 2));
fs.writeFileSync('./public/api/swagger-build.json', JSON.stringify(swaggerDoc, null, 2), 'utf-8');

try {
// Initialize the Swagger middleware
//swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
 // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
 //app.use(middleware.swaggerMetadata());

 // Validate Swagger requests
 //app.use(middleware.swaggerValidator());

 // Route validated requests to appropriate controller
 //app.use(middleware.swaggerRouter(options));

 // Serve the Swagger documents and Swagger UI
 //app.use(middleware.swaggerUi());

 // Start the server
 app.listen(8000, function () {
   console.log('Your server is now running at http://localhost:8000');
 });

//});

} catch (e) {
  console.log(e);
}
