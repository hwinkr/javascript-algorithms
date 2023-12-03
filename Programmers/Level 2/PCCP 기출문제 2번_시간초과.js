const EMPTY = 0;
const OIL = 1;
const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const isPosInMap = (row, col, nx, ny) => {
  return 0 <= nx && row > nx && 0 <= ny && col > ny;
};

const getOilCount = (row, col, target, land) => {
  const visited = Array.from({ length: row }, () =>
    Array.from({ length: col }).fill(false)
  );

  const oilList = [];
  for (let i = 0; i < row; i++) {
    if (land[i][target] === OIL) {
      oilList.push([i, target]);
    }
  }

  let oilCount = 0;
  oilCount += oilList.length;
  oilList.forEach(([x, y]) => {
    visited[x][y] = true;
  });

  while (oilList.length !== 0) {
    const [x, y] = oilList.shift();

    DIRECTIONS.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;

      if (
        isPosInMap(row, col, nx, ny) &&
        land[nx][ny] === OIL &&
        !visited[nx][ny]
      ) {
        oilCount += 1;
        visited[nx][ny] = true;
        oilList.push([nx, ny]);
      }
    });
  }

  return oilCount;
};

function solution(land) {
  const row = land.length;
  const col = land[0].length;

  let maxOilCount = 0;
  for (let i = 0; i < col; i++) {
    const oilCount = getOilCount(row, col, i, land);
    maxOilCount = Math.max(maxOilCount, oilCount);
  }

  return maxOilCount;
}

console.log(
  getOilCount(7, 6, 5, [
    [1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ])
);

// console.log(
//   solution([
//     [1, 0, 1, 0, 1, 1],
//     [1, 0, 1, 0, 0, 0],
//     [1, 0, 1, 0, 0, 1],
//     [1, 0, 0, 1, 0, 0],
//     [1, 0, 0, 1, 0, 1],
//     [1, 0, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1],
//   ])
// );
