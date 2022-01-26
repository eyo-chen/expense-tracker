import createYearMonthDay from "../CreateYearMonthDay/createYearMonthDay";

function createDateStringFormat(dateObj, year, month, day) {
  // if argement has dateObj
  if (dateObj) {
    const [year, month, day] = createYearMonthDay(dateObj);

    return `${year}-${month >= 10 ? month : `0${month}`}-${
      day >= 10 ? day : `0${day}`
    }`;
  } else {
    return `${year}-${month + 1 > 10 ? month + 1 : `0${month + 1}`}-${
      day + 1 > 10 ? day + 1 : `0${day + 1}`
    }`;
  }
}

export default createDateStringFormat;
