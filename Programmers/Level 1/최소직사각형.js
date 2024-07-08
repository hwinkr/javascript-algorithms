function solution(sizes) {
  const rotatedCards = sizes.map((size) => {
    const [width, height] = size;

    return height > width ? [height, width] : [width, height];
  });

  const maxWidth = Math.max(...rotatedCards.map((card) => card[0]));
  const maxHeight = Math.max(...rotatedCards.map((card) => card[1]));

  return maxWidth * maxHeight;
}

console.log(
  solution([
    [60, 50],
    [30, 70],
    [60, 30],
    [80, 40],
  ])
);
