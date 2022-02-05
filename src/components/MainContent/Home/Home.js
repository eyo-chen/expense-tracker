import { useState } from "react";
import DailyInfo from "./DailyInfo/DailyInfo";
import WeeklyInfo from "./WeeklyInfo/WeeklyInfo";
import timeObj from "../../assets/timeObj/timeObj";
import style from "./Home.module.css";

const { TODAY } = timeObj;

function Home() {
  const [week, setWeek] = useState(TODAY);

  return (
    <div className={style.home}>
      <DailyInfo week={week} setWeek={setWeek} />
      <WeeklyInfo week={week} />
    </div>
  );
}

export default Home;
