import { useState } from "react";
import DailyInfo from "./DailyInfo/DailyInfo";
import WeeklyInfo from "./WeeklyInfo/WeeklyInfo";
import timeObj from "../../../Others/TimeObj/timeObj";
import styles from "./Home.module.css";

const { TODAY } = timeObj;

function Home() {
  // changeData is used to trigger the useEffect in DailyInfo and WeeklyInfo after adding, deleting, modifying transaction
  const [changeData, setChangeData] = useState(false);
  const [week, setWeek] = useState(TODAY);

  // it's invoked after adding new transaction
  function changeDataHandler() {
    setChangeData((prev) => !prev);
  }

  return (
    <div className={styles.home}>
      <DailyInfo week={week} setWeek={setWeek} changeData={changeData} changeDataHandler={changeDataHandler} /> 
      <WeeklyInfo week={week} changeData={changeData} changeDataHandler={changeDataHandler} />
    </div>
  );
}

export default Home;
