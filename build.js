const fs = require('fs');

const files = [
  'ime-loader.js',
  'lib/ch.js',
  'lib/first-letter-word.js',
  'lib/word-new.js',
  'lib/words-new.js',
  'lib/automated-words.js',
  'lib/weight.js'
];

files.forEach(file => {
  fs.copyFile('./src/' + file, './dist/' + file, err => {
    if (err)
      throw err;
  });
});
