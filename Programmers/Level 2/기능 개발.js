const COMPLETE_PERCENT = 100;

function solution(progresses, speeds) {
  const answer = [];

  while (progresses.length !== 0) {
    let count = 0;

    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    while (progresses[0] >= COMPLETE_PERCENT) {
      progresses.shift();
      speeds.shift();
      count += 1;
    }

    count > 0 && answer.push(count);
  }

  return answer;
}
