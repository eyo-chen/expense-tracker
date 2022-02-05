import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";

function createExpenseDataList(selectedDate, initialDate, expenseData) {
  const currentDate = new Date(selectedDate || initialDate);
  const currentDateStr = createDateStringFormat(currentDate);
  return expenseData.filter((element) => element.time === currentDateStr);
}

export default createExpenseDataList;
