import coerceNumber from "./CoerceNumber/coerceNumber";
import createYearMonthDay from "./CreateYearMonthDay/createYearMonthDay";
/*
The logic is 
1. If the year of data is less than current year, we can guarantee this data is within the range, so immediately return true
2. If both year are the same, then need to compare month and day
*/
function compareTime(data, dateObj, endingYear, endingMonth, endingDay) {
  const { year: dataYear, month: dataMonth, day: dataDay } = data;
  const [year, month, day, endingYearNum, endingMonthNum, endingDayNum] =
    coerceNumber(
      dataYear,
      dataMonth,
      dataDay,
      endingYear,
      endingMonth,
      endingDay
    );

  if (!dateObj)
    return (
      year < endingYearNum ||
      (year === endingYearNum && month < endingMonthNum) ||
      (year === endingYearNum &&
        month === endingMonthNum &&
        day <= endingDayNum)
    );
  else {
    const [endingYear, endingMonth, endingDay] = createYearMonthDay(dateObj);

    return (
      year < endingYear ||
      (year === endingYear && month < endingMonth) ||
      (year === endingYear && month === endingMonth && day <= endingDay)
    );
  }
}

export default compareTime;
