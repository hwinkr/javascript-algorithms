const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

const numberCount = Number(input[0]);
const numbers = input[1].split(" ").map(Number);

const sortedNumbers = numbers.sort((a, b) => a - b);

function solution(count, numbers) {
  let answer = 0;

  for (let i = 0; i < count; i++) {
    const targetNumber = numbers[i];

    let start = 0;
    let end = count - 1;

    while (start < end) {
      if (i === start) {
        start += 1;
        continue;
      }
      if (i === end) {
        end -= 1;
        continue;
      }

      const sum = numbers[start] + numbers[end];
      if (sum === targetNumber) {
        answer += 1;
        break;
      }

      if (sum < targetNumber) {
        start += 1;
        continue;
      }
      end -= 1;
    }
  }

  return answer;
}

console.log(solution(numberCount, sortedNumbers));
