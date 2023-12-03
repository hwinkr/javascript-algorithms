const IN = "IN";
const OUT = "OUT";
const LAST_TIME = "23:59";

const convertTime = (time) => {
  const [hour, minute] = time.split(":");
  return Number(hour) * 60 + Number(minute);
};

const calcTotalTime = (timeList) => {
  if (timeList.length % 2) timeList.push(convertTime(LAST_TIME));
  const totalTime = timeList.reduce((acc, currTime, index) => {
    if (index % 2) return acc;
    return acc + timeList[index + 1] - currTime;
  }, 0);

  return totalTime;
};

function solution(fees, records) {
  const [basicTime, basicCost, unitTime, unitCost] = fees;

  const timeBoard = {};
  records.forEach((parkingData) => {
    const [time, carNumber, state] = parkingData.split(" ");
    const convertedTime = convertTime(time);
    if (!timeBoard.hasOwnProperty(carNumber)) {
      timeBoard[carNumber] = [convertedTime];
      return;
    }
    timeBoard[carNumber].push(convertedTime);
  });

  const inOutTimeList = Object.keys(timeBoard)
    .sort()
    .map((carName) => timeBoard[carName]);

  const costList = [];
  inOutTimeList.forEach((timeList) => {
    const totalTime = calcTotalTime(timeList);
    if (totalTime <= basicTime) {
      costList.push(basicCost);
      return;
    }
    const totalCost =
      basicCost + Math.ceil((totalTime - basicTime) / unitTime) * unitCost;
    costList.push(totalCost);
  });

  return costList;
}
