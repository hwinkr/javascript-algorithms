const getTruckMoveCount = (totalTime, truckTime) => {
  let count = Math.floor(totalTime / (truckTime * 2));
  if (totalTime % (truckTime * 2) >= truckTime) count += 1;

  return count;
};

function solution(a, b, g, s, w, t) {
  let totalTime = 10 ** 9 * 10 ** 5 * 4;

  let start = 0;
  let end = totalTime;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    let totalGold = 0;
    let totalSilver = 0;
    let totalMineral = 0;

    for (let i = 0; i < g.length; i++) {
      const currGold = g[i];
      const currSilver = s[i];
      const truckWeight = w[i];
      const truckTime = t[i];

      const moveCount = getTruckMoveCount(mid, truckTime);

      totalGold += Math.min(currGold, truckWeight * moveCount);
      totalSilver += Math.min(currSilver, truckWeight * moveCount);
      totalMineral += Math.min(currGold + currSilver, truckWeight * moveCount);
    }

    if (totalMineral >= a + b && totalGold >= a && totalSilver >= b) {
      end = mid - 1;
      totalTime = Math.min(totalTime, mid);
    } else {
      start = mid + 1;
    }
  }

  return totalTime;
}

// console.log(solution(10, 10, [100], [100], [7], [10])); 50
// console.log(
//   solution(90, 500, [70, 70, 0], [0, 0, 500], [100, 100, 2], [4, 8, 1])
// );  499
