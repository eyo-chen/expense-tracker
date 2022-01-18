import CalendarTable from "./CalendarTable/CalendarTable";
import MonthlyInfo from "./MonthlyInfo/MonthlyInfo";
import style from "./Calendar.module.css";

function Calendar() {
  return (
    <div className={style.calendar}>
      <CalendarTable />
      <MonthlyInfo />
    </div>
  );
}

export default Calendar;
