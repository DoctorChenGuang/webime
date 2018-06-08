// import Keywords from "./lib/automated-keywords.js";
const Keywords = require('./lib/automated-keywords.js');
let automatedKeywords = new Map(Keywords);

function automatedKeyword(data) {
    let result = {};

    let dataLen = data.length;
    let keywords = data.substring(0, 1);

    let kwArr = automatedKeywords.get(keywords);
    console.log('kwArr', kwArr);
}
automatedKeyword('中');