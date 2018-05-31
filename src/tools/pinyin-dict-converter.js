const fs = require('fs');
const calcSum = require('./calc');
const initial = ['b', 'c', 'ch', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 'sh', 't', 'w', 'x', 'y', 'z', 'zh'];
const vowels = ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "er", "i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "o", "ou", "ong", "u", "ua", "uai", "uan", "uang", "ue", "ui", "un", "uo", "v"];

fs.readFile('./src/pinyin-dict.txt', (err, data) => {
  if (err)
    throw err;

  convert(data);
});

function convert(data) {
  let pinyinDict = data.toString();
  let pinyinLines = pinyinDict.split('\r\n');

  let result = new Map();
  for (let i = 0; i < pinyinLines.length; i++) {
    let pinyinLine = pinyinLines[i];
    let pinyinParts = pinyinLine.split(' ');
    let syllables = pinyinParts[2].split('\'');
    // let structure = [];

    // 完全使用词库实现简拼全拼混合不合适
    // for (let j = 0; j < syllables.length; j++) {
    //   let syllable = syllables[j];
    //   let syllableInitial;

    //   if (initial.includes(syllable[0])) {
    //     let firstTwoLetters = syllable[0] + syllable[1];
    //     syllableInitial = ['ch', 'sh', 'zh'].includes(firstTwoLetters) ? firstTwoLetters : syllable[0];
    //   }

    //   if (syllableInitial) {
    //     syllables[j] = [syllables[j], syllableInitial];
    //     structure.push([1, 0]);
    //   } else {
    //     structure.push([0]);
    //   }
    // }

    // let pos = calcSum(structure);
    // let combinedSyllable = '';
    // pos.forEach(p => {
    //   for (let k = 0; k < syllables.length; k++) {
    //     let isFull = p >> k & 1;
    //     let syllable = syllables[k];
    //     if (Array.isArray(syllable)) {
    //       combinedSyllable += isFull ? syllable[0] : syllable[1];
    //     } else {
    //       combinedSyllable += syllable;
    //     }
    //   }

    //   result.push(`${combinedSyllable} ${pinyinParts[0]}`);
    //   combinedSyllable = '';
    // });
    // 只处理多音节的词
    if (syllables.length < 2)
      continue;

    let lastSyllable = syllables[syllables.length - 1];
    let firstLetter = lastSyllable[0];
    let lastSyllableInitial;
    if (initial.includes(firstLetter)) {
      let firstTwoLetters = firstLetter + lastSyllable[1];
      lastSyllableInitial = ['ch', 'sh', 'zh'].includes(firstTwoLetters)
        ? firstTwoLetters : firstLetter;
    }

    let combinedSyllable = syllables.join('');
    if (result.has(combinedSyllable)) {
      result.set(combinedSyllable, result.get(combinedSyllable) + ' ' + pinyinParts[0]);
    } else {
      result.set(combinedSyllable, pinyinParts[0]);
    }

    if (lastSyllableInitial) {
      syllables[syllables.length - 1] = lastSyllableInitial;
      combinedSyllable = syllables.join('');

      if (result.has(combinedSyllable)) {
        result.set(combinedSyllable, result.get(combinedSyllable) + ' ' + pinyinParts[0]);
      } else {
        result.set(combinedSyllable, pinyinParts[0]);
      }
    }
  }

  let finalResult = [];
  result.forEach((value, key) => {
    finalResult.push([key, value]);
  });
  fs.writeFile('result.txt', JSON.stringify(finalResult));
}
