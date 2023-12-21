function solution(n) {
  const maxNumber = Array.from({ length: n }).reduce(
    (acc, _, index) => acc + index + 1,
    0
  );
  const traingle = Array.from({ length: n }, (_, index) =>
    Array.from({ length: index + 1 }).fill(0)
  );

  let currRow = 0;
  let currCol = 0;
  let num = 1;

  traingle[currRow][currCol] = num;

  while (num < maxNumber) {
    while (
      num < maxNumber &&
      currRow + 1 < traingle.length &&
      traingle[currRow + 1][currCol] === 0
    ) {
      traingle[++currRow][currCol] = ++num;
    }

    while (
      num < maxNumber &&
      currCol + 1 < traingle[currRow].length &&
      traingle[currRow][currCol + 1] === 0
    ) {
      traingle[currRow][++currCol] = ++num;
    }

    while (num < maxNumber && traingle[currRow - 1][currCol - 1] === 0) {
      traingle[--currRow][--currCol] = ++num;
    }
  }

  return traingle.reduce(
    (accTriangle, currTriangle) => [...accTriangle, ...currTriangle],
    []
  );
}

console.log(solution(5));
