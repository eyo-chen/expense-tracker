import compareTimeWithRange from "../compareTimeWithRange";
import compareTime from "../compareTime";

function createAccAmount(
  expenseData,
  withRange,
  startDayObj,
  endDayObj,
  noDate
) {
  let accIncome = 0,
    accExpense = 0;

  /*
  If it's noDate, do NOT need to consider the range of date
  It it's withRange, need to consider starting data and ending date
  It's it's not withRange, only need to consider starting date
   */
  expenseData.forEach((expenseData) => {
    const validTimeIndex =
      noDate ||
      (withRange
        ? compareTimeWithRange(expenseData, startDayObj, endDayObj)
        : compareTime(expenseData, startDayObj));

    if (validTimeIndex) {
      if (expenseData.category === "expense")
        accExpense += Number(expenseData.price);
      else accIncome += Number(expenseData.price);
    }
  });

  return [accIncome, accExpense];
}

export default createAccAmount;
