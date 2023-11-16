const DIRECTIONS = [
  [0, 1],
  [1, 1],
  [1, 0],
];

const DESTROYED_MARK = "-";

const getUniqueArray = (arr) => {
  return [...new Set(arr.join("|").split("|"))].map((v) =>
    v.split(",").map((v) => Number(v))
  );
};

const countDestroyedBlocks = (board) => {
  const destoryedBlocks = board.reduce((acc, row, i) => {
    const destoryedBlocksInRow = row
      .map((col, j) => col === DESTROYED_MARK && [i, j])
      .filter((value) => !!value);

    return acc + destoryedBlocksInRow.length;
  }, 0);

  return destoryedBlocks;
};

const changePositions = (row, col, board, positions) => {
  const changeBlocks = [];

  for (let j = 0; j < col; j++) {
    for (let i = row - 1; i >= 0; i -= 1) {
      if (positions.some((pos) => i === pos[0] && j === pos[1])) {
        continue;
      }
      changeBlocks.push(board[i][j]);
    }

    while (changeBlocks.length < row) {
      changeBlocks.push(DESTROYED_MARK);
    }

    for (let i = 0; i < row; i += 1) {
      board[i][j] = changeBlocks.pop();
    }
  }
};

const updatePositions = (positions, board, targetPosition) => {
  const [x, y] = targetPosition;

  if (
    DIRECTIONS.every((dir) => {
      const [dx, dy] = dir;
      return board[x + dx] && board[x + dx][y + dy] === board[x][y];
    })
  ) {
    const destoryedPositions = [
      ...DIRECTIONS.map((dir) => [x + dir[0], y + dir[1]]),
      [x, y],
    ];
    positions.push(...destoryedPositions);
  }
};

function solution(row, col, board) {
  const gameBoard = board.map((row) => row.split(""));

  while (true) {
    const positions = [];
    gameBoard.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === DESTROYED_MARK) return;
        updatePositions(positions, gameBoard, [i, j]);
      });
    });

    if (!positions.length) {
      return countDestroyedBlocks(gameBoard);
    }

    const uniquePositions = getUniqueArray(positions);
    changePositions(row, col, gameBoard, uniquePositions);
  }
}
