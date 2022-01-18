import { useState, useContext } from "react";
import ExpenseDataContext from "../../store/expenseData/expenseData--context";

function useDailyExpenseList(date) {
  const [dayState, setDayState] = useState(date);
  const { expenseData } = useContext(ExpenseDataContext);

  const dayData = new Date(dayState);
  const day = dayData.getDate();
  const month = dayData.getMonth() + 1;
  const year = dayData.getFullYear();

  const newDayData = expenseData.filter(
    (element) =>
      Number(element.time.slice(0, 4)) === year &&
      Number(element.time.slice(5, 7)) === month &&
      Number(element.time.slice(8)) === day
  );

  return [newDayData, setDayState];
}

export default useDailyExpenseList;
