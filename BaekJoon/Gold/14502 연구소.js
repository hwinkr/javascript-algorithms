const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [row, col] = input
    .shift()
    .split(" ")
    .map((el) => Number(el));

  const graph = input.map((line) => line.split(" ").map((num) => Number(num)));
  const answer = solution(graph, row, col);
  console.log(answer);
  process.exit();
});

const VIRUS = 2;
const WALL = 1;
const PATH = 0;
const DIRESCTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function findTargetPositions(graph, target) {
  const targetPositions = graph.reduce((accVirus, row, i) => {
    const virusInRow = row
      .map((cell, j) => cell === target && [i, j])
      .filter((value) => !!value);
    return [...accVirus, ...virusInRow];
  }, []);

  return targetPositions;
}

const countSafezone = (graph) => {
  const safezone = graph.reduce((accSafezone, row, i) => {
    const safezoneInrow = row
      .map((cell, j) => cell === PATH && [i, j])
      .filter((value) => !!value).length;
    return accSafezone + safezoneInrow;
  }, 0);

  return safezone;
};

const isPositionsInLab = (nx, ny, row, col) => {
  return nx >= 0 && nx < row && ny >= 0 && ny < col;
};

const polluteLab = (graph, row, col, virus) => {
  while (virus.length > 0) {
    const [x, y] = virus.shift();
    DIRESCTIONS.forEach((dir) => {
      const [dx, dy] = dir;
      const nx = x + dx;
      const ny = y + dy;

      if (isPositionsInLab(nx, ny, row, col) && graph[nx][ny] === PATH) {
        graph[nx][ny] = VIRUS;
        virus.push([nx, ny]);
      }
    });
  }
};

const solution = (graph, row, col) => {
  const virusPositions = findTargetPositions(graph, VIRUS);
  const pathPositions = findTargetPositions(graph, PATH);

  let answer = -Infinity;

  for (let i = 0; i < pathPositions.length - 2; i += 1) {
    for (let j = i + 1; j < pathPositions.length - 1; j += 1) {
      for (let k = j + 1; k < pathPositions.length; k += 1) {
        const copyGraph = graph.map((row) => [...row]);
        const addWallPositions = [
          pathPositions[i],
          pathPositions[j],
          pathPositions[k],
        ];

        addWallPositions.forEach((addWall) => {
          const [x, y] = addWall;
          copyGraph[x][y] = WALL;
        });

        polluteLab(copyGraph, row, col, [...virusPositions]);
        const safezone = countSafezone(copyGraph);
        answer = Math.max(answer, safezone);
      }
    }
  }

  return answer;
};
