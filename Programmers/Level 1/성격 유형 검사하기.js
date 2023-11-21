const judgeMBTI = (data) => {
  let mbti = "";

  const dataEntries = Object.entries(data);
  dataEntries.forEach(([type1, score1], index) => {
    if (index % 2) {
      return;
    }

    const [type2, score2] = dataEntries[index + 1];
    if (score1 >= score2) {
      mbti += type1;
    } else {
      mbti += type2;
    }
  });

  return mbti;
};

const execSurvey = (survey, choices) => {
  const surveyData = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };

  survey.forEach((item, index) => {
    const [type1, type2] = item;
    if (choices[index] === 4) return;

    if (choices[index] < 4) {
      surveyData[type1] += 4 - choices[index];
    } else {
      surveyData[type2] += choices[index] - 4;
    }
  });

  return surveyData;
};

function solution(survey, choices) {
  const surveyData = execSurvey(survey, choices);
  return judgeMBTI(surveyData);
}
