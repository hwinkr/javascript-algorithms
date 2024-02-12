function solution(arr) {
  const answer = [];
  let lastIndex = answer.length - 1;

  while (arr.length !== 0) {
    const number = arr.pop();
    if (answer[lastIndex] === number) continue;

    answer.push(number);
    lastIndex += 1;
  }

  return answer.reverse();
}
