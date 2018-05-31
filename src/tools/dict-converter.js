const fs = require('fs');
const dict = require('../src/resource/dict.json');

let result = [];
Object.keys(dict).forEach(key => {
  result.push([key, dict[key]]);
});

fs.writeFile('word-new.js', JSON.stringify(result));