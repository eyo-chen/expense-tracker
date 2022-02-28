import { useState } from "react";
import CalendarTable from "./CalendarTable/CalendarTable";
import MonthlyInfo from "./MonthlyInfo/MonthlyInfo";
import timeObj from "../../../Others/TimeObj/timeObj";
import styles from "./Calendar.module.css";

const { TODAY } = timeObj;

function Calendar() {
  const [month, setMonth] = useState(TODAY);

  return (
    <div className={styles.calendar}>
      <CalendarTable month={month} setMonth={setMonth} />
      <MonthlyInfo month={month} />
    </div>
  );
}

export default Calendar;
