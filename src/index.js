var Validator = require('jsonschema').Validator;
var v = new Validator();
var pc = require('../public/api/model/Zoo.json');
v.addSchema(pc, '/Zoo.json');

function importNextSchema() {
  var nextSchema = v.unresolvedRefs.shift();
  if (!nextSchema) {
    return;
  }
  v.addSchema(require('../public/api/model' + nextSchema), nextSchema);
  importNextSchema();
}

importNextSchema();

var instance = {
  id: 123,
  pets: [{
    id: 234,
    name: 'asd'
  }]
};
console.log(v.validate(instance, pc));
