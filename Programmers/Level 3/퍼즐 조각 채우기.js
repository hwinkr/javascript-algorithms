const BLOCK = 1;
const BLANK = 0;
const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const rotateBlock = (recBlock) => {
  const recBlockSize = recBlock.length;
  const rotatedBlocks = [];

  for (let i = 0; i < recBlockSize; i++) {
    for (let j = 0; j < recBlockSize; j++) {
      if (recBlock[recBlockSize - j - 1][i] === BLOCK) {
        rotatedBlocks.push([i, j]);
      }
    }
  }

  const [minRow, minCol] = getMinMaxCoor(rotatedBlocks);
  const rotatedRecBlock = Array.from({ length: recBlockSize }, () =>
    Array.from({ length: recBlockSize }).fill(0)
  );

  rotatedBlocks.forEach(([r, c]) => {
    rotatedRecBlock[r - minRow][c - minCol] = 1;
  });

  return rotatedRecBlock;
};

const getMinMaxCoor = (blocks) => {
  const minRow = Math.min(...blocks.map((v) => v[0]));
  const minCol = Math.min(...blocks.map((v) => v[1]));
  const maxRow = Math.max(...blocks.map((v) => v[0]));
  const maxCol = Math.max(...blocks.map((v) => v[1]));

  return [minRow, minCol, maxRow, maxCol];
};

const getBlock = (row, col, graph, target) => {
  const size = graph.length;
  const que = [[row, col]];
  const blocks = [[row, col]];
  graph[row][col] = target === BLOCK ? BLANK : BLOCK;

  while (que.length) {
    const [r, c] = que.shift();

    DIRECTIONS.forEach(([dx, dy]) => {
      const nr = r + dx;
      const nc = c + dy;

      if (nr < 0 || nr >= size || nc < 0 || nc >= size) return;
      if (graph[nr][nc] !== target) return;

      graph[nr][nc] = target === BLOCK ? BLANK : BLOCK;
      blocks.push([nr, nc]);
      que.push([nr, nc]);
    });
  }

  const [minRow, minCol, maxRow, maxCol] = getMinMaxCoor(blocks);
  const blockSize = Math.max(maxRow - minRow, maxCol - minCol) + 1;
  const recBlock = Array.from({ length: blockSize }, () =>
    Array.from({ length: blockSize }).fill(0)
  );

  blocks.forEach(([r, c]) => {
    recBlock[r - minRow][c - minCol] = 1;
  });

  return recBlock;
};

const calcCellCount = (block) => {
  const cellCount = block.reduce((accCount, row, i) => {
    const cellRow = row
      .map((col, j) => col === BLOCK && [i, j])
      .filter((value) => !!value);

    return accCount + cellRow.length;
  }, 0);

  return cellCount;
};

const isSameShape = (blank, block) =>
  JSON.stringify(blank) === JSON.stringify(block);

function solution(game_board, table) {
  const size = game_board.length;
  const blanks = [];
  const blocks = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (game_board[i][j] === BLANK) {
        blanks.push(getBlock(i, j, game_board, BLANK));
      }

      if (table[i][j] === BLOCK) {
        blocks.push(getBlock(i, j, table, BLOCK));
      }
    }
  }

  const visitedBlanks = Array.from({ length: blanks.length }).fill(false);
  const visitedBlocks = Array.from({ length: blocks.length }).fill(false);
  let answer = 0;

  blanks.forEach((blank, blankIndex) => {
    blocks.forEach((block, blockIndex) => {
      if (visitedBlanks[blankIndex] || visitedBlocks[blockIndex]) return;

      let copiedBlock = [...block];
      for (let i = 0; i < 4; i++) {
        copiedBlock = rotateBlock(copiedBlock);
        if (isSameShape(blank, copiedBlock)) {
          visitedBlanks[blankIndex] = true;
          visitedBlocks[blockIndex] = true;
          answer += calcCellCount(block);
          return;
        }
      }
    });
  });

  return answer;
}

// console.log(
//   solution(
//     [
//       [1, 1, 0, 0, 1, 0],
//       [0, 0, 1, 0, 1, 0],
//       [0, 1, 1, 0, 0, 1],
//       [1, 1, 0, 1, 1, 1],
//       [1, 0, 0, 0, 1, 0],
//       [0, 1, 1, 1, 0, 0],
//     ],
//     [
//       [1, 0, 0, 1, 1, 0],
//       [1, 0, 1, 0, 1, 0],
//       [0, 1, 1, 0, 1, 1],
//       [0, 0, 1, 0, 0, 0],
//       [1, 1, 0, 1, 1, 0],
//       [0, 1, 0, 0, 0, 0],
//     ]
//   )
// ); 14
