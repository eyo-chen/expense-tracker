import styles from "./WeeklyCalendarList.module.css";
import formatDate from "../../../../Others/FormatDate/formatDate";

function WeeklyCalendarList(props) {
  function clickDateHandler(e) {
    const dateID = e.target.dataset.id;
    props.setSelectedDate(formatDate(dateID));
  }

  // NOTE: need white space to seprate differnt className
  let className = `${styles.date} center--flex transition--25 `;
  className += props.active
    ? `${styles.active} `
    : `${styles["date--others"]} `;
  className += props.selected ? `${styles.selected} ` : "";

  return (
    <div>
      <p className={styles.day}>{props.weekDay}</p>
      <div
        tabIndex="0"
        aria-label="change day"
        onClick={clickDateHandler}
        data-id={props.dateObj}
        className={className}
      >
        {props.monthDay}
      </div>
    </div>
  );
}

export default WeeklyCalendarList;
