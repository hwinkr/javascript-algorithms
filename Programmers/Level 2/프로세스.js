function solution(priorities, location) {
  const processData = priorities.reduce((accData, curr, index) => {
    return [...accData, [index, curr]];
  }, []);

  const sequenceData = [];

  while (processData.length > 1) {
    const [location, process] = processData.shift();

    let isExecutable = true;

    for (let i = 0; i < processData.length; i++) {
      const compareProcess = processData[i][1];

      if (process < compareProcess) {
        isExecutable = false;
        processData.push([location, process]);
        break;
      }
    }

    if (isExecutable) {
      sequenceData.push(location);
    }
  }
  const lastLocation = processData[0][0];
  sequenceData.push(lastLocation);

  return sequenceData.indexOf(location) + 1;
}

console.log(solution([2, 1, 3, 2], 2));

/* 아래는 더 선언적인 코드
while (processData.length > 1) {
  const [location, process] = processData.shift();

  const isExecutable = processData.every((compareData) => {
    const compareProcess = compareData[1];
    return compareProcess <= process;
  });

  if (isExecutable) {
    sequenceData.push(location);
  } else {
    processData.push([location, process]);
  }
}
  return sequenceData.indexOf(location) + 1;
*/
