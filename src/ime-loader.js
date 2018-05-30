const IME = {
  loaded: false,
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
      replacedSyllable = tempSyllable.replace('ng', 'g');
      if (IME.word.has(replacedSyllable)) {
        syllable += letter;
        ++i;
        continue;
      }

      // 当前只有一个字母或者zh、sh、ch中的一个，继续往下匹配
      if (tempSyllable.length === 1 || ['zh', 'sh', 'ch'].includes(tempSyllable)) {
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

  init();
})();
