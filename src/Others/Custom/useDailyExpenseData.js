import { useState, useContext } from "react";
import ExpenseDataContext from "../../store/expenseData/expenseData--context";

function useDailyExpenseData(date) {
  const [dailyExpenseList, setDailyExpenseList] = useState(date);
  const { expenseData } = useContext(ExpenseDataContext);

  const dayData = new Date(dailyExpenseList);
  const day = dayData.getDate();
  const month = dayData.getMonth() + 1;
  const year = dayData.getFullYear();

  const newDayData = expenseData.filter(
    (element) =>
      element.year - 0 === year &&
      element.month - 0 === month &&
      element.day - 0 === day
  );

  return [newDayData, setDailyExpenseList];
}

export default useDailyExpenseData;
