const calcRionScoreDiff = (rion, apeach) => {
  const scoreDiff = rion.reduce((accDiff, currCount, index) => {
    if (currCount === 0 && apeach[index] === 0) return accDiff;

    if (currCount > apeach[index]) return accDiff + (10 - index);
    return accDiff - (10 - index);
  }, 0);

  return scoreDiff;
};

function solution(n, info) {
  let maxScoreDiff = 0;
  let result = [];

  const makesRionBoard = (arr, index, count) => {
    if (count === n) {
      const rionScoreDiff = calcRionScoreDiff(arr, info);
      if (maxScoreDiff > rionScoreDiff) return;
      if (maxScoreDiff === rionScoreDiff) {
        result.push(arr);
        return;
      }
      maxScoreDiff = rionScoreDiff;
      result = [arr];
    }

    for (let i = index; i < arr.length; i++) {
      if (arr[i] > info[i]) continue;

      const copyArr = [...arr];
      copyArr[i] += 1;
      makesRionBoard(copyArr, i, count + 1);
    }
  };
  makesRionBoard(Array.from({ length: 11 }).fill(0), 0, 0);

  if (maxScoreDiff === 0) return [-1];

  return result.sort((a, b) => {
    for (let i = info.length - 1; i > 0; i--) {
      if (a[i] === b[i]) continue;
      return b[i] - a[i];
    }
  })[0];
}
