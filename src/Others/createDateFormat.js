function createDateFormat(dateObj) {
  const year = dateObj.getFullYear();
  const month =
    Number(dateObj.getMonth()) + 1 < 10
      ? `0${Number(dateObj.getMonth()) + 1}`
      : Number(dateObj.getMonth()) + 1 + "";

  const date =
    Number(dateObj.getDate()) < 10
      ? `0${Number(dateObj.getDate())}`
      : dateObj.getDate();

  return `${year}-${month}-${date}`;
}

export default createDateFormat;
