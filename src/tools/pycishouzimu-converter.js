const fs = require('fs');
const word = require('../resource/dict.json');

fs.readFile('./src/resource/pyciShouZimu.txt', (err, data) => {
  if (err)
    throw err;

  let lines = data.toString().split(';');
  let result = [];
  lines.forEach(line => {
    let parts = line.split(',');
    if (word[parts[0]])
      return;

    result.push([parts[0], parts[1]]);
  });

  fs.writeFile('result.txt', JSON.stringify(result), err => {
    if (err)
      throw err;
  });
});