/*
The logic is 
1. If the year of data is less than current year, we can guarantee this data is within the range, so immediately return true
2. If both year are the same, then need to compare month and day
*/
function compareTime(data, dateObj, curYear, curMonth, curDay) {
  const { year, month, day } = data;
  const yearNum = year - 0,
    curYearNum = curYear - 0;
  const monthNum = month - 0,
    curMonthNum = curMonth - 0;
  const dayNum = day - 0,
    curDayNum = curDay - 0;

  if (!dateObj)
    return (
      yearNum < curYearNum ||
      (yearNum === curYearNum && monthNum < curMonthNum) ||
      (yearNum === curYearNum &&
        monthNum === curMonthNum &&
        dayNum <= curDayNum)
    );
  else {
    const curYear1 = dateObj.getFullYear(),
      curMonth1 = dateObj.getMonth() + 1,
      curDay1 = dateObj.getDate();

    return (
      yearNum < curYear1 ||
      (yearNum === curYear1 && monthNum < curMonth1) ||
      (yearNum === curYear1 && monthNum === curMonth1 && dayNum <= curDay1)
    );
  }
}

export default compareTime;
