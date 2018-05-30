const IME = {
  loaded: false,
  singleKey: [],
  ZCSH: [],
  firstLetterWords: new Map(),
  word: new Map(),
  words: new Map(),
  vowels: [],
  initial: []
};

(function () {
  function loadAsync(url) {
    let newScript = document.createElement('script');
    newScript.src = url;

    return new Promise((resolve, reject) => {
      newScript.onload = () => {
        resolve();
      };
      newScript.onerror = err => {
        reject(err);
      };
      document.head.appendChild(newScript);
    });
  }

  async function init() {
    const fileList = [
      '../src/words.js',
      '../src/word.js',
      '../src/first-letter-word.js',
      '../src/ch.js'
    ];

    let loadFileTasks = [];
    fileList.forEach(file => {
      loadFileTasks.push(loadAsync(file));
    });

    await Promise.all(loadFileTasks);
    IME.loaded = true;
    IME.convert = convert;
    Object.freeze(IME);
    console.info('[IME]', 'all files loaded');
  }

  function convert(input) {
    if (!input || typeof input !== 'string') {
      console.warn('[IME]', '待转换的字符串为空');
      return;
    }

    let analyzedResult = analyse(input);
    if (!analyzedResult.result) {
      return input;
    }

    console.log('analyzedResult', analyzedResult);
  }

  function analyse(input) {
    let analyzedResult = { result: false, syllables: [] };
    let syllable = '';
    let i = 0;

    while (i < input.length) {
      let code = input.charCodeAt(i);

      // 只转换小写字母
      if (code < 97 && code > 122) {
        return analyzedResult;
      }

      let letter = input[i];
      let tempSyllable = syllable + letter;
      if (IME.word.has(tempSyllable)) {
        syllable += letter;
        ++i;
        continue;
      }

      // 词库中拼音用g代替ng      
      replacedSyllable = tempSyllable.replace('ang', 'ag').replace('eng', 'eg').replace('ing', 'ig').replace('iong', 'iog').replace('ong', 'og').replace('');
      if (IME.word.has(replacedSyllable)) {
        syllable += letter;
        ++i;
        continue;
      }

      // 声母继续往下匹配
      if (IME.initial.includes(tempSyllable)) {
        syllable += letter;
        ++i;
        continue;
      }

      analyzedResult.syllables.push(syllable);
      syllable = '';
    }

    if (syllable) {
      analyzedResult.syllables.push(syllable);
    }

    analyzedResult.result = true;
    return analyzedResult;
  }

  function queryWords(syllables) {
    let result = [];

    for (let i = 0; i < syllables.length - 1; i++) {
      let combinedSyllable = syllables.slice(0, syllables.length - i).join('');
      let wordsStr = IME.words.get(combinedSyllable);
      if (!wordsStr)
        continue;

      result.concat(wordsStr.split(' '));
    }

    let firstSyllable = syllables[0];
    let wordStr = IME.word.get(firstSyllable);
    if (wordStr) {
      result.concat(wordStr.split(''));
      return result;
    }

    let zcshIndex = ['zh', 'ch', 'sh'].indexOf(firstSyllable);
    if (zcshIndex > -1) {
      result.push(IME.ZCSH[zcshIndex].split(''));
    } else {
      let singleKeyIndex = firstSyllable.charCodeAt(0) - 97;
      result.push(IME.singleKey[singleKeyIndex].split(''));
    }


    for (let j = 0; j < IME.vowels.length; j++) {
      let vowel = IME.vowels[j];
    }
  }

  function queryFirstLetterWords(input) {
    return IME.firstLetterWords.get(input);
  }

  init();
})();
