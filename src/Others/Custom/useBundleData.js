import { useState, useContext } from "react";
import ExpenseDataContext from "../../store/expenseData/expenseData--context";
import createWeeklyData from "../CreateWeeklyData/createWeeklyData";
import CreateCalendarTable from "../../components/MainContent/Calendar/CalendarTable/CreateCalendarTable";
import createExpenseDataList from "../CreateExpenseDataList/createExpenseDataList";

function useBundleData(type, initialDate, fn = undefined) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [modalCard, setModalCard] = useState(false);

  const expenseDataList = createExpenseDataList(
    selectedDate,
    initialDate,
    expenseData
  );

  let mainContent;
  if (type === "month")
    mainContent = CreateCalendarTable(initialDate, fn, expenseData);
  else mainContent = createWeeklyData(initialDate);

  function modalCardToggler(e) {
    if (modalCard) setModalCard(false);


    else {
      const id = e.target.dataset.id;

      if (id) {
        setModalCard(id);
      }
    }
  }

  return [
    mainContent,
    expenseDataList,
    selectedDate,
    setSelectedDate,
    modalCard,
    modalCardToggler,
  ];
}

export default useBundleData;
