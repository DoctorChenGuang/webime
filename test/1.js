const fs = require('fs');

fs.readFile('./src/word.txt', (err, data) => {
  if (err)
    throw err;

  let wordStr = data.toLocaleString();
  let words = wordStr.split(';');
  let wordsArray = [];

  for (const word of words) {
    let wordPair = word.split(',');
    wordsArray.push([wordPair[0], wordPair[1]]);
  }

  fs.writeFile('result.txt', JSON.stringify(wordsArray), err => {
    if (err) {
      throw err;
    }
  });
});