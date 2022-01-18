function createDateStringFormat(dateObj, year, month, day) {
  // if input has dateObj
  if (dateObj) {
    return `${dateObj.getFullYear()}-${
      dateObj.getMonth() + 1 >= 10
        ? dateObj.getMonth() + 1
        : `0${dateObj.getMonth() + 1}`
    }-${dateObj.getDate() >= 10 ? dateObj.getDate() : `0${dateObj.getDate()}`}`;
  } else {
    return `${year}-${month + 1 > 10 ? month + 1 : `0${month + 1}`}-${
      day + 1 > 10 ? day + 1 : `0${day + 1}`
    }`;
  }
}

export default createDateStringFormat;
