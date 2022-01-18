import compareTimeWithRange from "../compareTimeWithRange";
import compareTime from "../compareTime";

function createAccAmount(expenseData, withRange, startDayObj, endDayObj) {
  let accIncome = 0,
    accExpense = 0;

  expenseData.forEach((expenseData) => {
    const validTimeIndex = withRange
      ? compareTimeWithRange(expenseData, startDayObj, endDayObj)
      : compareTime(expenseData, startDayObj);

    if (validTimeIndex) {
      if (expenseData.category === "expense")
        accExpense += Number(expenseData.price);
      else accIncome += Number(expenseData.price);
    }
  });

  return [accIncome, accExpense];
}

export default createAccAmount;
