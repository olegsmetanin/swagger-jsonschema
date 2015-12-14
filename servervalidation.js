var Validator = require('jsonschema').Validator;
var v = new Validator();

var pc = require('./PetCollection.json');
v.addSchema(pc, '/PetCollection');

function importNextSchema() {
  var nextSchema = v.unresolvedRefs.shift();
  if (!nextSchema) {
    return;
  }
  v.addSchema(require(nextSchema), nextSchema);
}

importNextSchema();

var instance = [{
  id: 12,
  name: 'asd'
}];
console.log(v.validate(instance, pc));
