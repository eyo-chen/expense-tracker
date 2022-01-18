import Daily from "./DailyInfo/DailyInfo";
import WeeklyInfo from "./WeeklyInfo/WeeklyInfo";
import style from "./Home.module.css";

function Home(props) {
  return (
    <div className={style.home}>
      <Daily />
      <WeeklyInfo />
    </div>
  );
}

export default Home;
