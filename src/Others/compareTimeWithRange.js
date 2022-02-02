import createYearMonthDay from "./CreateYearMonthDay/createYearMonthDay";
import coerceNumber from "./CoerceNumber/coerceNumber";

function compareTimeWithRange(data, startDateObj, endDateObj) {
  const { year: curYear, month: curMonth, day: curDay } = data;
  const [year, month, day] = coerceNumber(curYear, curMonth, curDay);

  const [startingYear, startingMonth, startingDate] =
    createYearMonthDay(startDateObj);

  const [endingYear, endingMonth, endingDate] = createYearMonthDay(endDateObj);

  const startingIndex =
    year > startingYear ||
    (year === startingYear && month > startingMonth) ||
    (year === startingYear && month === startingMonth && day >= startingDate);

  const endingIndex =
    year < endingYear ||
    (year === endingYear && month < endingMonth) ||
    (year === endingYear && month === endingMonth && day <= endingDate);

  return startingIndex && endingIndex;
}

export default compareTimeWithRange;
