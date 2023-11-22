function solution(id_list, report, k) {
  const reportBoard = id_list.reduce((accBoard, id) => {
    return { ...accBoard, [id]: [] };
  }, {});
  const reportedBoard = id_list.reduce((accBoard, id) => {
    return { ...accBoard, [id]: 0 };
  }, {});
  const mailCountBoard = id_list.reduce((accBoard, id) => {
    return { ...accBoard, [id]: 0 };
  }, {});

  report.forEach((reportData) => {
    const [reportUser, reportedUser] = reportData.split(" ");

    if (reportBoard[reportUser].includes(reportedUser)) return;

    reportedBoard[reportedUser] += 1;
    reportBoard[reportUser].push(reportedUser);
  });

  id_list.forEach((id) => {
    mailCountBoard[id] += reportBoard[id].filter(
      (reportId) => reportedBoard[reportId] >= k
    ).length;
  });

  return Object.values(mailCountBoard);
}
