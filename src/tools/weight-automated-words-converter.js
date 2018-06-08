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
        let pinyinParts = pinyin[0];//得到的数据
        let weight = pinyin[pinyin.length - 1];

        let strLen = pinyinParts.length;//每个数据的字符长度

        //去掉单字
        if (strLen === 1) continue;

        let arr = [];
        arr[0] = pinyinParts;
        arr[1] = weight;
        result.push(arr);
    }
    fs.writeFileSync('src/lib/weight.js', JSON.stringify(result));
}