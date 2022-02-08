import compareTimeWithRange from "../CompareTime/compareTimeWithRange";
import compareTime from "../CompareTime/compareTime";

function createAccAmount(
  expenseData,
  withRange,
  startDayObj,
  endDayObj,
  noRange
) {
  let accIncome = 0,
    accExpense = 0;

  /*
  If it's noRange, do NOT need to consider the range of date
  It it's withRange, need to consider starting data and ending date
  It's it's not withRange, only need to consider starting date
   */
  expenseData.forEach((expenseData) => {
    const validTimeIndex =
      noRange ||
      (withRange
        ? compareTimeWithRange(expenseData, startDayObj, endDayObj)
        : compareTime(expenseData, endDayObj));

    if (validTimeIndex) {
      if (expenseData.category === "expense")
        accExpense += Number(expenseData.price);
      else accIncome += Number(expenseData.price);
    }
  });

  return [accIncome, accExpense, accIncome - accExpense];
}

export default createAccAmount;
