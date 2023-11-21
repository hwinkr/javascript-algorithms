function solution(q1, q2) {
  let q1Sum = q1.reduce((acc, curr) => acc + curr, 0);
  const q2Sum = q2.reduce((acc, curr) => acc + curr, 0);
  const sum = q1Sum + q2Sum;

  const target = sum / 2;
  const q = [...q1, ...q2];
  let q1Pointer = 0;
  let q2Pointer = q2.length;

  for (let count = 0; count < q1.length * 4; count++) {
    if (q1Sum === target) return count;

    q1Sum > target
      ? (q1Sum -= q[q1Pointer++ % q.length])
      : (q1Sum += q[q2Pointer++ % q.length]);
  }

  return -1;
}
