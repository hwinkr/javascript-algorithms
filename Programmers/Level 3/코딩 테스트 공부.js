function solution(alp, cop, problems) {
  const maxAl = Math.max(...problems.map((p) => p[0]));
  const maxCo = Math.max(...problems.map((p) => p[1]));
  const dp = Array.from({ length: maxAl + 1 }, () =>
    Array.from({ length: maxCo + 1 }).fill(maxAl + maxCo)
  );

  alp = Math.min(alp, maxAl);
  cop = Math.min(cop, maxCo);
  dp[alp][cop] = 0;

  for (let i = alp; i < maxAl + 1; i += 1) {
    for (let j = cop; j < maxCo + 1; j += 1) {
      if (i + 1 < maxAl + 1)
        dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      if (j + 1 < maxCo + 1)
        dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);

      problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
        if (i < alp_req || j < cop_req) return;

        const newAl = Math.min(maxAl, i + alp_rwd);
        const newCo = Math.min(maxCo, j + cop_rwd);
        dp[newAl][newCo] = Math.min(dp[newAl][newCo], dp[i][j] + cost);
      });
    }
  }

  return dp[maxAl][maxCo];
}
