import { useState, useContext } from "react";
import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";
import ExpenseDataContext from "../../store/expenseData/expenseData--context";

function useExpenseDataList(date, type = "daily") {
  const [dailyExpenseList, setDailyExpenseList] = useState(date);
  const { expenseData } = useContext(ExpenseDataContext);

  const dayData = new Date(dailyExpenseList);
  const dateStr = createDateStringFormat(dayData);

  const newDayData = expenseData.filter((element) => element.time === dateStr);

  if (type === "daily") return [newDayData, setDailyExpenseList];
  else return [newDayData, dateStr, setDailyExpenseList];
}

export default useExpenseDataList;
