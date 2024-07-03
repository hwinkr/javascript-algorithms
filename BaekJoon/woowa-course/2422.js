const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const deliciousInfo = Array.from({ length: N + 1 }, () =>
  Array(N + 1).fill(true)
);

for (let i = 1; i < M + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  deliciousInfo[a][b] = false;
  deliciousInfo[b][a] = false;
}

let deliciousCount = 0;

for (let i = 1; i <= N - 2; i++) {
  for (let j = i + 1; j <= N - 1; j++) {
    if (!deliciousInfo[i][j]) continue;

    for (let k = j + 1; k <= N; k++) {
      if (!deliciousInfo[i][k] || !deliciousInfo[j][k]) continue;

      deliciousCount += 1;
    }
  }
}

console.log(deliciousCount);
