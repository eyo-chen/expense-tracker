function compareTimeWithRange(data, startDateObj, endDateObj) {
  const { year, month, day } = data;

  const startYear = startDateObj.getFullYear(),
    startMonth = startDateObj.getMonth() + 1,
    startDay = startDateObj.getDate();

  const endYear = endDateObj.getFullYear(),
    endMonth = endDateObj.getMonth() + 1,
    endDay = endDateObj.getDate();

  const startingIndex =
    (year - 0 === startYear && month - 0 > startMonth) ||
    (year - 0 === startYear && month - 0 === startMonth && day - 0 >= startDay);

  const endingIndex =
    (year - 0 === endYear && month - 0 < endMonth) ||
    (year - 0 === endYear && month - 0 === endMonth && day - 0 <= endDay);

  return startingIndex && endingIndex;
}

export default compareTimeWithRange;
