function solution(answers) {
  const scoreTable = {
    1: 0,
    2: 0,
    3: 0,
  };

  const personOne = [1, 2, 3, 4, 5];
  const personTwo = [2, 1, 2, 3, 2, 4, 2, 5];
  const personThree = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  answers.forEach((answer, index) => {
    if (personOne[index % personOne.length] === answer) scoreTable[1] += 1;
    if (personTwo[index % personTwo.length] === answer) scoreTable[2] += 1;
    if (personThree[index % personThree.length] === answer) scoreTable[3] += 1;
  });

  const maxScore = Math.max(...Object.values(scoreTable));
  const winners = Object.keys(scoreTable)
    .filter((key) => scoreTable[key] === maxScore)
    .map(Number);

  return winners;
}

console.log(solution([1, 2, 3, 4, 5]));
