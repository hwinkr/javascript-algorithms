const IN = "IN";
const OUT = "OUT";
const FULL_TIME = 1439;

const convertTime = (time) => {
  const [hour, minute] = time.split(":");
  return Number(hour) * 60 + Number(minute);
};

function solution(fees, records) {
  const [basicTime, basicCost, unitTime, unitCost] = fees;

  const parkingLog = {};
  records.forEach((parkingData) => {
    const [time, carNumber, state] = parkingData.split(" ");
    const convertedTime = convertTime(time);
    if (state === IN) {
      parkingLog.hasOwnProperty(carNumber)
        ? (parkingLog[carNumber] += FULL_TIME - convertedTime)
        : (parkingLog[carNumber] = FULL_TIME - convertedTime);
    } else {
      parkingLog[carNumber] -= FULL_TIME - convertedTime;
    }
  });

  const costList = [];
  Object.entries(parkingLog).forEach(([carNumber, parkingTime]) => {
    if (parkingTime <= basicTime) {
      costList.push([carNumber, basicCost]);
      return;
    }
    const totalCost =
      basicCost + Math.ceil((parkingTime - basicTime) / unitTime) * unitCost;
    costList.push([carNumber, totalCost]);
  });

  return costList.sort((c1, c2) => c1[0] - c2[0]).map((v) => v[1]);
}
