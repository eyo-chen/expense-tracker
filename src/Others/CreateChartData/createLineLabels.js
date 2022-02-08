import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";

function createLineLabels(startDate, endDate) {
  const labels = [];

  // caculate the difference between two dates
  const diff = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );

  // Reference 1
  let eachDiffAmount;
  let lastDiffAmount = 0;
  if (diff % 7 === 0) eachDiffAmount = diff / 7;
  else {
    eachDiffAmount = (diff - (diff % 7)) / 7;
    lastDiffAmount = diff - eachDiffAmount * 6;
  }

  // Referecne 2
  let tmpDate;
  for (let i = 0; i < 6; i++) {
    tmpDate = new Date(startDate.setDate(startDate.getDate() + eachDiffAmount));
    labels.push(createDateStringFormat(tmpDate));
  }

  if (lastDiffAmount === 0)
    tmpDate = new Date(startDate.setDate(startDate.getDate() + eachDiffAmount));
  else
    tmpDate = new Date(startDate.setDate(startDate.getDate() + lastDiffAmount));

  labels.push(createDateStringFormat(tmpDate));

  return labels;
}

export default createLineLabels;

/*
Reference 1
there are always seven labels which means it can only have seven timestamp
so have to first know whether the difference can be divided by 7
*/

/*
Reference 2
loop through first six timestamp cuz it could possibly has last difference

note that .setDate() will return the number of milliseconds
so use tmpDate variable to wrap it back to new Date format
*/
