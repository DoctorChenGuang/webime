const fs = require('fs');
const py = require('../src/py.json');
const single = require('../src/single.json');

let wordsArray = [];
for (let index = 0; index < py.length; index++) {
  const item = py[index];
  wordsArray.push([item, single[index]]);
}

fs.writeFile('result.txt', JSON.stringify(wordsArray), err => {
  if (err)
    throw err;

  console.log('done');
});
