var Validator = require('jsonschema').Validator;
var v = new Validator();

var pc = require('./public/api/model/Zoo.json');
v.addSchema(pc, '/Zoo');

function importNextSchema() {
  var nextSchema = v.unresolvedRefs.shift();
  console.log('nextSchema', nextSchema);
  if (!nextSchema) {
    return;
  }
  v.addSchema(require('./public/api/model' + nextSchema), nextSchema);
  importNextSchema();
}

importNextSchema();

var instance = {
  id: 123,
  pets: [{
    id: 12,
    name: 'asd'
  }]
};
console.log(JSON.stringify(v.validate(instance, pc), null, 2));
