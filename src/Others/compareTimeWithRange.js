function compareTimeWithRange(data, startDateObj, endDateObj) {
  const { year, month, day } = data;
  const yearNum = year - 0;
  const monthNum = month - 0;
  const dayNum = day - 0;

  const startYear = startDateObj.getFullYear(),
    startMonth = startDateObj.getMonth() + 1,
    startDay = startDateObj.getDate();

  const endYear = endDateObj.getFullYear(),
    endMonth = endDateObj.getMonth() + 1,
    endDay = endDateObj.getDate();

  const startingIndex =
    (yearNum === startYear && monthNum > startMonth) ||
    (yearNum === startYear && monthNum === startMonth && dayNum >= startDay);

  const endingIndex =
    (yearNum === endYear && monthNum < endMonth) ||
    (yearNum === endYear && monthNum === endMonth && dayNum <= endDay);

  return startingIndex && endingIndex;
}

export default compareTimeWithRange;
