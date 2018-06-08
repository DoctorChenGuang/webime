/**生成用于比较词频的库 */
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '../resource/pinyin-dict.txt'), (err, data) => {
    if (err)
        throw err;

    convert(data);
});

function convert(data) {
    let pinyinDict = data.toString();
    let pinyinLines = pinyinDict.split('\r\n');

    let result = [];

    for (let i = 0; i < pinyinLines.length; i++) {
        let pinyinLine = pinyinLines[i];

        let pinyin = pinyinLine.split(' ');
        let pinyinParts = pinyin[0];
        let weight = pinyin[pinyin.length - 1];

        //去掉单字
        if (pinyinParts.length === 1) continue;

        let arr = [];
        arr[0] = pinyinParts;
        arr[1] = weight;
        result.push(arr);
    }

    let finalResult = `IME.Weight = new Map(` + JSON.stringify(result) + `)`;

    fs.writeFileSync('src/lib/weight.js', finalResult);
}