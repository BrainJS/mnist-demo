const fs = require('fs');
const mnist = require('mnist');
const set = mnist.set(8000, 2000);
fs.writeFileSync(__dirname + '/training.json', JSON.stringify(set.training));
fs.writeFileSync(__dirname + '/test.json', JSON.stringify(set.test));