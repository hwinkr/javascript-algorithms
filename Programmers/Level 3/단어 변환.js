const checkSingleWordDiff = (word1, word2) => {
  let diffCount = 0;

  const word1Array = word1.split("");
  const word2Array = word2.split("");

  word1Array.forEach((word, index) => {
    if (word !== word2Array[index]) diffCount += 1;
  });

  return diffCount === 1;
};

const findNextWords = (currWord, words, visitied) => {
  const nextWords = [];
  words.forEach((word, index) => {
    if (checkSingleWordDiff(word, currWord) && !visitied[index])
      nextWords.push(word);
  });

  return nextWords;
};

function solution(begin, target, words) {
  const visitied = Array.from({ length: words.length }).fill(false);
  const que = [[begin, 0]];

  while (que.length !== 0) {
    const [currWord, count] = que.shift();
    if (currWord === target) return count;

    const nextWords = findNextWords(currWord, words, visitied);
    if (nextWords.length === 0) continue;

    nextWords.forEach((word) => {
      const index = words.indexOf(word);
      visitied[index] = true;

      que.push([word, count + 1]);
    });
  }

  return 0;
}

// console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])); 4
// console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"])); 0
