export const JsonToTableData = (dataList, keyArr) => {
  const resultArr = [];
  let skipValue = 0;
  const temp = [];
  if (typeof dataList === "object" && !isArrayLike(dataList)) {
    for (let key in dataList) {
      serialObjectPush(dataList[key], temp);
    }
    // 후에 수정해야될수도있음
    resultArr.push(temp);
    return resultArr;
  } else {
    dataList.forEach((data, i) => {
      const tempArr = [];
      keyArr.forEach((key) => {
        if (skipValue > 0) {
          skipValue -= 1;
          return;
        }
        if (typeof data[key] === "object") {
          serialObjectPush(data[key], tempArr);
          skipValue += data[key].length;
        } else {
          tempArr.push(data[key]);
        }
      });
      resultArr.push(tempArr);
    });

    return resultArr;
  }
};

const serialObjectPush = (data, arr) => {
  if (typeof data === "object") {
    for (let v in data) {
      serialObjectPush(data[v], arr);
    }
  } else {
    arr.push(data);
  }
};

const isArrayLike = function (collection) {
  // 배열 인덱스: 32bit 정수(2의 32제곱 - 1)
  // 유사 배열 인덱스: 자바스크립트로 표현할 수 있는 양의 정수(2의 53제곱 - 1)
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  // 빈문자열은 유사배열이다. undefined == null => true
  const length = collection == null ? undefined : collection.length;
  return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
};
