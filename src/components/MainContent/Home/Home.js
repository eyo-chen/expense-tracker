import DailyInfo from "./DailyInfo/DailyInfo";
import WeeklyInfo from "./WeeklyInfo/WeeklyInfo";
import style from "./Home.module.css";

function Home() {
  return (
    <div className={style.home}>
      <DailyInfo />
      <WeeklyInfo />
    </div>
  );
}

export default Home;
