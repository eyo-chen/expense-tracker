import { useState } from "react";
import DailyInfo from "./DailyInfo/DailyInfo";
import WeeklyInfo from "./WeeklyInfo/WeeklyInfo";
import timeObj from "../../../Others/TimeObj/timeObj";
import styles from "./Home.module.css";

const { TODAY } = timeObj;

function Home() {
  // addNewData is used to trigger the useEffect in DailyInfo and WeeklyInfo after adding new transaction
  const [addNewData, setAddNewData] = useState(false);
  const [week, setWeek] = useState(TODAY);

  // it's invoked after adding new transaction
  function addNewDataHandler() {
    setAddNewData((prev) => !prev);
  }

  return (
    <div className={styles.home}>
      <DailyInfo week={week} setWeek={setWeek} addNewData={addNewData} addNewDataHandler={addNewDataHandler} /> 
      <WeeklyInfo week={week} addNewData={addNewData} addNewDataHandler={addNewDataHandler} />
    </div>
  );
}

export default Home;
