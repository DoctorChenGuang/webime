let temp;
let result;
function calcSum(data) {
  if (data.length === 1) {
    for (let j = 0; j < data[0].length; j++) {
      let num = data[0][j];
      let sum = temp.length > 0 ? temp.reduce((a, n) => a + n) + num : num;
      result.push(sum);
    }
    return;
  }

  for (let i = 0; i < data[0].length; i++) {
    if (i > 0) {
      temp.pop();
    }
    temp.push(data[0][i] ? Math.pow(2, data.length - 1) : 0);

    let newData = [...data];
    newData.splice(0, 1);
    calcSum(newData);
  }

  temp.pop();
}

module.exports = function (data) {
  temp = [];
  result = [];
  calcSum(data);
  return result;
};
