const calcMinDist = (n, dist) => {
  for (let i = 1; i < n + 1; i++) {
    dist[i][i] = 0;
  }

  for (let k = 1; k < n + 1; k++) {
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        if (i === j || i === k || j === k) continue;
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
};

function solution(n, s, a, b, fares) {
  const maxCost = 200 * 100_000;
  const dist = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }).fill(maxCost)
  );

  fares.forEach(([node1, node2, cost]) => {
    dist[node1][node2] = cost;
    dist[node2][node1] = cost;
  });

  calcMinDist(n, dist);

  let minTaxiCost = maxCost;
  for (let i = 1; i < n + 1; i++) {
    minTaxiCost = Math.min(minTaxiCost, dist[s][i] + dist[i][a] + dist[i][b]);
  }

  return minTaxiCost;
}

// console.log(
//   solution(6, 4, 6, 2, [
//     [4, 1, 10],
//     [3, 5, 24],
//     [5, 6, 2],
//     [3, 1, 41],
//     [5, 1, 24],
//     [4, 6, 50],
//     [2, 4, 66],
//     [2, 3, 22],
//     [1, 6, 25],
//   ])
// ); 82

// console.log(
//   solution(7, 3, 4, 1, [
//     [5, 7, 9],
//     [4, 6, 4],
//     [3, 6, 1],
//     [3, 2, 3],
//     [2, 1, 6],
//   ])
// ); 14

// console.log(
//   solution(6, 4, 5, 6, [
//     [2, 6, 6],
//     [6, 3, 7],
//     [4, 6, 7],
//     [6, 5, 11],
//     [2, 5, 12],
//     [5, 3, 20],
//     [2, 4, 8],
//     [4, 3, 9],
//   ])
// ); 25
